import { Layout } from "@/components/layout/Layout";
import { 
  Shield, 
  Lightbulb, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight,
  Activity,
  Brain,
  Globe
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const useCases = [
  {
    title: "Verify Call Center Interactions",
    description: "Ensure customer service calls are handled by real humans, not AI bots.",
  },
  {
    title: "Combat Voice-Based Fraud",
    description: "Detect synthetic voices used in phishing and social engineering attacks.",
  },
  {
    title: "Content Authenticity",
    description: "Verify the authenticity of audio content in journalism and media.",
  },
  {
    title: "Academic Integrity",
    description: "Ensure voice submissions in education are genuine student recordings.",
  },
];

const ethicalPrinciples = [
  {
    icon: Shield,
    title: "Privacy First",
    description: "Audio files are processed in real-time and not stored permanently. Only analysis results are saved for your history.",
  },
  {
    icon: Lightbulb,
    title: "Transparency",
    description: "We provide clear explanations for each detection result, helping users understand our analysis methodology.",
  },
  {
    icon: Users,
    title: "Responsible Use",
    description: "Our technology is designed to protect against deception, not to enable surveillance or discrimination.",
  },
];

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Activity className="w-4 h-4" />
              About VoiceDetect
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Protecting Trust in the
              <br />
              <span className="text-gradient">Age of AI</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              As AI-generated voices become increasingly realistic, the ability to
              distinguish between human and synthetic audio has never been more critical.
            </p>
          </div>

          {/* The Problem */}
          <section className="mb-16">
            <div className="glass-card rounded-3xl p-8 md:p-12 gradient-border">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">The Problem</h2>
                  <p className="text-muted-foreground">
                    Why AI voice detection matters now more than ever.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-foreground/90">
                <p>
                  Recent advances in AI voice synthesis have made it possible to generate
                  incredibly realistic human-sounding speech. While this technology has
                  legitimate applications, it also poses significant risks:
                </p>
                <ul className="space-y-3 ml-6">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                    <span>
                      <strong>Voice cloning fraud</strong> - Criminals can clone voices to
                      impersonate executives, family members, or officials
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                    <span>
                      <strong>Misinformation</strong> - Fake audio recordings can be used
                      to spread false statements attributed to public figures
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                    <span>
                      <strong>Identity theft</strong> - Voice biometrics can be bypassed
                      using synthesized voices
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                    <span>
                      <strong>Scam calls</strong> - AI voices power automated robocall
                      scams that sound increasingly human
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Our Solution */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Our <span className="text-gradient">Solution</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Advanced AI-powered analysis to detect synthetic voices with high accuracy.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card rounded-2xl p-6 glow-hover">
                <Brain className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Deep Learning Models</h3>
                <p className="text-muted-foreground text-sm">
                  Our system uses state-of-the-art neural networks trained on diverse
                  datasets of human and AI-generated voices to identify subtle patterns.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-6 glow-hover">
                <Activity className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Audio Feature Analysis</h3>
                <p className="text-muted-foreground text-sm">
                  We analyze multiple audio characteristics including spectral features,
                  prosody patterns, and temporal dynamics to make accurate predictions.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-6 glow-hover">
                <Globe className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Multi-Language Support</h3>
                <p className="text-muted-foreground text-sm">
                  Purpose-built models for Tamil, English, Hindi, Malayalam, and Telugu
                  with language-specific acoustic analysis.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-6 glow-hover">
                <Shield className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Confidence Scoring</h3>
                <p className="text-muted-foreground text-sm">
                  Every result includes a precise confidence score (0.0-1.0) and
                  human-readable explanation of the analysis findings.
                </p>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Real-World <span className="text-gradient">Applications</span>
              </h2>
            </div>

            <div className="space-y-4">
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="glass-card rounded-xl p-5 flex items-start gap-4 glow-hover"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{useCase.title}</h3>
                    <p className="text-sm text-muted-foreground">{useCase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Ethical Principles */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ethical <span className="text-gradient">AI Usage</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're committed to building technology that serves humanity responsibly.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {ethicalPrinciples.map((principle, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-6 text-center glow-hover"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <principle.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{principle.title}</h3>
                  <p className="text-sm text-muted-foreground">{principle.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center glass-card rounded-3xl p-12 gradient-border">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Detecting?
            </h2>
            <p className="text-muted-foreground mb-8">
              Try our voice detection technology now - it's free and requires no sign-up.
            </p>
            <Link to="/detect">
              <Button variant="hero" size="xl">
                Try Voice Detection
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
          </section>
        </div>
      </div>
    </Layout>
  );
}
