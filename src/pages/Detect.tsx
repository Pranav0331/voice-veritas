import { useState, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { WaveformVisualizer } from "@/components/voice/WaveformVisualizer";
import { LanguageBadge } from "@/components/voice/LanguageBadge";
import { ClassificationBadge } from "@/components/voice/ClassificationBadge";
import { ConfidenceMeter } from "@/components/voice/ConfidenceMeter";
import { Upload, X, AlertCircle, Loader2, CheckCircle, Info } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const LANGUAGES = ["Tamil", "English", "Hindi", "Malayalam", "Telugu"] as const;
type Language = typeof LANGUAGES[number];

interface DetectionResult {
  classification: "AI_GENERATED" | "HUMAN";
  confidenceScore: number;
  explanation: string;
  language: string;
}

export default function Detect() {
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState<Language>("English");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.includes("audio")) {
        toast.error("Please upload an audio file (MP3, WAV, etc.)");
        return;
      }
      setFile(selectedFile);
      setResult(null);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (!droppedFile.type.includes("audio")) {
        toast.error("Please upload an audio file (MP3, WAV, etc.)");
        return;
      }
      setFile(droppedFile);
      setResult(null);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeFile = () => {
    setFile(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = (reader.result as string).split(",")[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Please upload an audio file first");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const audioBase64 = await fileToBase64(file);

      const { data, error: fnError } = await supabase.functions.invoke("voice-detection", {
        body: {
          language,
          audioFormat: file.name.split(".").pop() || "mp3",
          audioBase64,
        },
      });

      if (fnError) {
        throw new Error(fnError.message || "Detection failed");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResult({
        classification: data.classification,
        confidenceScore: data.confidenceScore,
        explanation: data.explanation,
        language: data.language,
      });

      toast.success("Analysis complete!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">Voice</span> Detection
            </h1>
            <p className="text-muted-foreground">
              Upload an audio file to analyze whether it's AI-generated or human.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              {/* File Upload */}
              <div className="glass-card rounded-2xl p-6 glow-hover">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  Upload Audio
                </h2>

                {!file ? (
                  <div
                    className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-foreground font-medium mb-2">
                      Drop your audio file here
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports MP3, WAV, and other audio formats
                    </p>
                  </div>
                ) : (
                  <div className="bg-muted/50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                          <WaveformVisualizer isActive={isLoading} barCount={5} className="h-6" />
                        </div>
                        <div>
                          <p className="font-medium text-sm truncate max-w-[200px]">
                            {file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={removeFile}
                        disabled={isLoading}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Language Selection */}
              <div className="glass-card rounded-2xl p-6 glow-hover">
                <h2 className="text-lg font-semibold mb-4">Select Language</h2>
                <div className="flex flex-wrap gap-3">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`transition-all ${
                        language === lang
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-background rounded-full"
                          : ""
                      }`}
                    >
                      <LanguageBadge language={lang} size="lg" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                variant="hero"
                size="xl"
                className="w-full"
                onClick={handleSubmit}
                disabled={!file || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>Analyze Voice</>
                )}
              </Button>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6 min-h-[400px] flex flex-col">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  Analysis Result
                </h2>

                {isLoading ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                    </div>
                    <p className="text-muted-foreground animate-pulse">
                      Analyzing audio patterns...
                    </p>
                    <WaveformVisualizer isActive barCount={16} className="h-12 mt-4" />
                  </div>
                ) : error ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
                      <AlertCircle className="w-8 h-8 text-destructive" />
                    </div>
                    <p className="text-destructive font-medium">Analysis Failed</p>
                    <p className="text-sm text-muted-foreground max-w-[300px]">{error}</p>
                  </div>
                ) : result ? (
                  <div className="flex-1 flex flex-col gap-6">
                    {/* Classification */}
                    <div className="text-center py-6">
                      <p className="text-sm text-muted-foreground mb-3">Classification</p>
                      <ClassificationBadge
                        classification={result.classification}
                        size="lg"
                      />
                    </div>

                    {/* Confidence Score */}
                    <div className="bg-muted/50 rounded-xl p-4">
                      <ConfidenceMeter
                        score={result.confidenceScore}
                        size="lg"
                        showLabel
                      />
                    </div>

                    {/* Language */}
                    <div className="flex items-center justify-between bg-muted/50 rounded-xl p-4">
                      <span className="text-sm text-muted-foreground">Language</span>
                      <LanguageBadge language={result.language} size="md" />
                    </div>

                    {/* Explanation */}
                    <div className="bg-muted/50 rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-2">Explanation</p>
                      <p className="text-foreground">{result.explanation}</p>
                    </div>

                    {/* Success indicator */}
                    <div className="flex items-center justify-center gap-2 text-success text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Result saved to history
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                      <WaveformVisualizer barCount={8} className="h-8" />
                    </div>
                    <p className="text-muted-foreground">
                      Upload an audio file and click analyze to see results
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
