import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/Layout";
import { ClassificationBadge } from "@/components/voice/ClassificationBadge";
import { LanguageBadge } from "@/components/voice/LanguageBadge";
import { ConfidenceMeter } from "@/components/voice/ConfidenceMeter";
import { History as HistoryIcon, RefreshCw, AlertCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Detection {
  id: string;
  language: string;
  classification: string;
  confidence_score: number;
  explanation: string;
  audio_filename: string | null;
  created_at: string;
}

export default function History() {
  const { data: detections, isLoading, error, refetch } = useQuery({
    queryKey: ["detections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("detections")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      return data as Detection[];
    },
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                <HistoryIcon className="w-8 h-8 text-primary" />
                Detection <span className="text-gradient">History</span>
              </h1>
              <p className="text-muted-foreground">
                View the latest 20 voice detection results.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => refetch()}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading history...</p>
            </div>
          ) : error ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <p className="text-destructive font-medium mb-2">Failed to load history</p>
              <p className="text-sm text-muted-foreground">
                {error instanceof Error ? error.message : "An error occurred"}
              </p>
            </div>
          ) : !detections || detections.length === 0 ? (
            <div className="glass-card rounded-2xl p-12 text-center">
              <HistoryIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-medium mb-2">No detection history yet</p>
              <p className="text-sm text-muted-foreground">
                Analyze your first audio file to see results here.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block glass-card rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Date & Time
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Language
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Classification
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Confidence
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Explanation
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {detections.map((detection) => (
                      <tr
                        key={detection.id}
                        className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>{format(new Date(detection.created_at), "MMM d, yyyy")}</span>
                            <span className="text-muted-foreground">
                              {format(new Date(detection.created_at), "HH:mm")}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <LanguageBadge language={detection.language} size="sm" />
                        </td>
                        <td className="p-4">
                          <ClassificationBadge
                            classification={detection.classification as "AI_GENERATED" | "HUMAN"}
                            size="sm"
                          />
                        </td>
                        <td className="p-4 w-40">
                          <ConfidenceMeter
                            score={detection.confidence_score}
                            size="sm"
                            showLabel={false}
                          />
                          <span className="text-xs font-mono text-muted-foreground">
                            {detection.confidence_score.toFixed(2)}
                          </span>
                        </td>
                        <td className="p-4">
                          <p className="text-sm text-muted-foreground line-clamp-2 max-w-xs">
                            {detection.explanation}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden space-y-4">
                {detections.map((detection) => (
                  <div
                    key={detection.id}
                    className="glass-card rounded-xl p-4 glow-hover"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(detection.created_at), "MMM d, yyyy HH:mm")}
                      </div>
                      <LanguageBadge language={detection.language} size="sm" />
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <ClassificationBadge
                        classification={detection.classification as "AI_GENERATED" | "HUMAN"}
                        size="md"
                      />
                      <span className="font-mono text-sm">
                        {detection.confidence_score.toFixed(2)}
                      </span>
                    </div>

                    <ConfidenceMeter
                      score={detection.confidence_score}
                      size="sm"
                      showLabel={false}
                      className="mb-4"
                    />

                    <p className="text-sm text-muted-foreground">
                      {detection.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
