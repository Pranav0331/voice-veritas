import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { WaveformVisualizer } from "@/components/voice/WaveformVisualizer";
import { LanguageBadge } from "@/components/voice/LanguageBadge";
import { Activity, Shield, Zap, Globe, ArrowRight, CheckCircle } from "lucide-react";

const languages = ["Tamil", "English", "Hindi", "Malayalam", "Telugu"];

const features = [
  {
    icon: Shield,
    title: "High Accuracy",
    description: "Advanced AI-powered detection with state-of-the-art accuracy for identifying synthetic voices.",
  },
  {
    icon: Zap,
    title: "Real-time Analysis",
    description: "Get instant results with our optimized detection pipeline processing audio in seconds.",
  },
  {
    icon: Globe,
    title: "Multi-language",
    description: "Support for 5 major languages: Tamil, English, Hindi, Malayalam, and Telugu.",
  },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-in">
              <Activity className="w-4 h-4" />
              <span>AI Voice Detection Platform</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
              Detect{" "}
              <span className="text-gradient">AI-Generated</span>
              <br />
              Voices Instantly
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              Advanced deep learning technology to distinguish between human and
              AI-generated voices across multiple languages with high precision.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <Link to="/detect">
                <Button variant="hero" size="xl">
                  Try Voice Detection
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
              <Link to="/api-docs">
                <Button variant="outline" size="lg">
                  View API Docs
                </Button>
              </Link>
            </div>

            {/* Waveform Animation */}
            <div className="flex justify-center mb-12 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
              <div className="glass-card rounded-2xl p-8 glow-hover">
                <WaveformVisualizer isActive barCount={20} className="h-16" />
              </div>
            </div>

            {/* Supported Languages */}
            <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
              <p className="text-sm text-muted-foreground mb-4">Supported Languages</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {languages.map((lang) => (
                  <LanguageBadge key={lang} language={lang} size="lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-gradient">VoiceDetect</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powered by cutting-edge machine learning models trained on diverse voice datasets.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card rounded-2xl p-8 glow-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple three-step process to analyze any audio file.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Upload Audio", desc: "Upload your MP3 audio file" },
                { step: "02", title: "Select Language", desc: "Choose from 5 supported languages" },
                { step: "03", title: "Get Results", desc: "Receive AI vs Human classification" },
              ].map((item, index) => (
                <div key={item.step} className="text-center">
                  <div className="text-6xl font-bold text-primary/20 mb-4">{item.step}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                  {index < 2 && (
                    <ArrowRight className="w-6 h-6 text-primary/40 mx-auto mt-6 hidden md:block rotate-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center glass-card rounded-3xl p-12 gradient-border">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Detect AI Voices?
            </h2>
            <p className="text-muted-foreground mb-8">
              Start analyzing audio files for free. No sign-up required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/detect">
                <Button variant="hero" size="xl">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                Free to use
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                No sign-up
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                Instant results
              </span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
