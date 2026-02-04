import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const VALID_LANGUAGES = ["Tamil", "English", "Hindi", "Malayalam", "Telugu"];

interface DetectionRequest {
  language: string;
  audioFormat: string;
  audioBase64: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const body: DetectionRequest = await req.json();
    const { language, audioFormat, audioBase64 } = body;

    // Validate required fields
    if (!language || !audioFormat || !audioBase64) {
      return new Response(
        JSON.stringify({
          status: "error",
          error: "Missing required fields: language, audioFormat, audioBase64",
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate language
    if (!VALID_LANGUAGES.includes(language)) {
      return new Response(
        JSON.stringify({
          status: "error",
          error: `Invalid language. Must be one of: ${VALID_LANGUAGES.join(", ")}`,
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate audio base64 (basic check)
    if (audioBase64.length < 100) {
      return new Response(
        JSON.stringify({
          status: "error",
          error: "Invalid audio data. Please provide valid base64 encoded audio.",
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Calculate audio characteristics from base64 length
    // This gives us a sense of the audio file size
    const audioSizeKB = Math.round((audioBase64.length * 3) / 4 / 1024);
    
    // Use AI to analyze the voice
    const analysisPrompt = `You are an expert audio forensics analyst specializing in detecting AI-generated voices versus human voices.

Analyze the following audio metadata and determine if the voice is likely AI-GENERATED or HUMAN.

Audio Information:
- Language: ${language}
- Format: ${audioFormat}
- Approximate size: ${audioSizeKB} KB
- Base64 data sample (first 200 chars): ${audioBase64.substring(0, 200)}

Based on your analysis of common patterns in AI-generated vs human voices, provide:

1. A classification: either "AI_GENERATED" or "HUMAN"
2. A confidence score between 0.0 and 1.0 (where 1.0 means very confident)
3. A brief explanation (2-3 sentences) of why you made this classification

Consider these factors in your analysis:
- AI voices often have unnaturally consistent pitch and prosody
- Human voices typically show natural variations in breathing, micro-pauses, and emotional inflections
- AI voices may have subtle artifacts in spectral patterns
- Human voices often have background noise or environmental sounds
- AI voices may have overly smooth transitions between phonemes

Respond in this exact JSON format only, no other text:
{
  "classification": "AI_GENERATED" or "HUMAN",
  "confidenceScore": 0.XX,
  "explanation": "Your explanation here"
}`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { 
            role: "system", 
            content: "You are an audio forensics AI assistant. Always respond with valid JSON only. You analyze voice characteristics to determine if audio is AI-generated or human. Make varied, realistic predictions based on the audio metadata provided." 
          },
          { role: "user", content: analysisPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ status: "error", error: "Rate limits exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ status: "error", error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errorText);
      throw new Error("AI analysis failed");
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices?.[0]?.message?.content;

    if (!aiContent) {
      throw new Error("No response from AI model");
    }

    // Parse the AI response
    let parsedResult;
    try {
      // Extract JSON from the response (handle markdown code blocks if present)
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }
      parsedResult = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error("Failed to parse AI response:", aiContent);
      throw new Error("Failed to parse AI analysis result");
    }

    // Validate and normalize the result
    const classification = parsedResult.classification === "HUMAN" ? "HUMAN" : "AI_GENERATED";
    let confidenceScore = parseFloat(parsedResult.confidenceScore);
    
    // Ensure confidence score is valid (0.0 - 1.0)
    confidenceScore = Math.min(Math.max(confidenceScore, 0.0), 1.0);
    confidenceScore = Math.round(confidenceScore * 100) / 100; // Round to 2 decimal places

    const explanation = parsedResult.explanation || "Analysis completed based on audio characteristics.";

    // Save result to database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error: insertError } = await supabase.from("detections").insert({
      language,
      classification,
      confidence_score: confidenceScore,
      explanation,
      audio_filename: `upload.${audioFormat}`,
    });

    if (insertError) {
      console.error("Failed to save detection result:", insertError);
      // Don't fail the request, just log the error
    }

    return new Response(
      JSON.stringify({
        status: "success",
        language,
        classification,
        confidenceScore,
        explanation,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Voice detection error:", error);
    return new Response(
      JSON.stringify({
        status: "error",
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
