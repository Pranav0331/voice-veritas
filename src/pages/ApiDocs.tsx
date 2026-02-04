import { Layout } from "@/components/layout/Layout";
import { FileText, Copy, Check, Terminal, ArrowRight, Key, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const API_BASE = import.meta.env.VITE_SUPABASE_URL;

export default function ApiDocs() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const codeBlocks = [
    {
      title: "POST Request Body",
      language: "json",
      code: `{
  "language": "Tamil | English | Hindi | Malayalam | Telugu",
  "audioFormat": "mp3",
  "audioBase64": "<base64 encoded audio string>"
}`,
    },
    {
      title: "Success Response",
      language: "json",
      code: `{
  "status": "success",
  "language": "English",
  "classification": "AI_GENERATED | HUMAN",
  "confidenceScore": 0.87,
  "explanation": "The audio shows characteristics consistent with AI synthesis including uniform prosody patterns and subtle artifacts in spectral analysis."
}`,
    },
    {
      title: "Error Response",
      language: "json",
      code: `{
  "status": "error",
  "error": "Invalid audio format. Please provide a valid base64 encoded audio."
}`,
    },
    {
      title: "cURL Example",
      language: "bash",
      code: `curl -X POST "${API_BASE}/functions/v1/voice-detection" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_ANON_KEY" \\
  -d '{
    "language": "English",
    "audioFormat": "mp3",
    "audioBase64": "UklGRi..."
  }'`,
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <FileText className="w-4 h-4" />
              API Documentation
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Voice Detection <span className="text-gradient">API</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Integrate AI voice detection into your applications with our simple REST API.
            </p>
          </div>

          {/* Endpoint */}
          <div className="glass-card rounded-2xl p-6 mb-8 glow-hover">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-primary" />
              Endpoint
            </h2>
            <div className="bg-muted rounded-xl p-4 font-mono text-sm overflow-x-auto">
              <span className="text-success">POST</span>
              <span className="text-muted-foreground ml-2">
                {API_BASE}/functions/v1/voice-detection
              </span>
            </div>
          </div>

          {/* Headers */}
          <div className="glass-card rounded-2xl p-6 mb-8 glow-hover">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Key className="w-5 h-5 text-primary" />
              Headers
            </h2>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-muted rounded-xl p-4">
                <span className="font-mono text-sm text-primary">Content-Type:</span>
                <span className="font-mono text-sm">application/json</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-muted rounded-xl p-4">
                <span className="font-mono text-sm text-primary">Authorization:</span>
                <span className="font-mono text-sm">Bearer YOUR_ANON_KEY</span>
              </div>
            </div>
          </div>

          {/* Parameters */}
          <div className="glass-card rounded-2xl p-6 mb-8 glow-hover">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              Request Parameters
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Parameter
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Type
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Required
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-mono text-sm text-primary">language</td>
                    <td className="p-3 text-sm text-muted-foreground">string</td>
                    <td className="p-3 text-sm text-success">Yes</td>
                    <td className="p-3 text-sm text-muted-foreground">
                      One of: Tamil, English, Hindi, Malayalam, Telugu
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-mono text-sm text-primary">audioFormat</td>
                    <td className="p-3 text-sm text-muted-foreground">string</td>
                    <td className="p-3 text-sm text-success">Yes</td>
                    <td className="p-3 text-sm text-muted-foreground">
                      Audio format (e.g., "mp3", "wav")
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-sm text-primary">audioBase64</td>
                    <td className="p-3 text-sm text-muted-foreground">string</td>
                    <td className="p-3 text-sm text-success">Yes</td>
                    <td className="p-3 text-sm text-muted-foreground">
                      Base64 encoded audio data
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Response Fields */}
          <div className="glass-card rounded-2xl p-6 mb-8 glow-hover">
            <h2 className="text-lg font-semibold mb-4">Response Fields</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Field
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Type
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-mono text-sm text-primary">status</td>
                    <td className="p-3 text-sm text-muted-foreground">string</td>
                    <td className="p-3 text-sm text-muted-foreground">"success" or "error"</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-mono text-sm text-primary">classification</td>
                    <td className="p-3 text-sm text-muted-foreground">string</td>
                    <td className="p-3 text-sm text-muted-foreground">
                      "AI_GENERATED" or "HUMAN"
                    </td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-mono text-sm text-primary">confidenceScore</td>
                    <td className="p-3 text-sm text-muted-foreground">number</td>
                    <td className="p-3 text-sm text-muted-foreground">
                      Float between 0.0 and 1.0 (2 decimal places)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-sm text-primary">explanation</td>
                    <td className="p-3 text-sm text-muted-foreground">string</td>
                    <td className="p-3 text-sm text-muted-foreground">
                      Human-readable explanation of the detection result
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Code Blocks */}
          <div className="space-y-6">
            {codeBlocks.map((block, index) => (
              <div key={index} className="glass-card rounded-2xl overflow-hidden glow-hover">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <span className="text-sm font-medium">{block.title}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(block.code, index)}
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <pre className="p-4 overflow-x-auto font-mono text-sm">
                  <code className="text-foreground">{block.code}</code>
                </pre>
              </div>
            ))}
          </div>

          {/* Rate Limits */}
          <div className="glass-card rounded-2xl p-6 mt-8 glow-hover">
            <h2 className="text-lg font-semibold mb-4">Rate Limits & Notes</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                Maximum audio file size: 10MB
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                Confidence score is always between 0.0 and 1.0 (not percentage)
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                Supported languages: Tamil, English, Hindi, Malayalam, Telugu
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                Results are automatically saved to the detection history
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
