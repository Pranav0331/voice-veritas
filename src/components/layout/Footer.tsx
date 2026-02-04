import { Activity } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Activity className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold">
              <span className="text-gradient">Voice</span>
              <span className="text-foreground">Detect</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/detect" className="hover:text-primary transition-colors">
              Detect Voice
            </Link>
            <Link to="/history" className="hover:text-primary transition-colors">
              History
            </Link>
            <Link to="/api-docs" className="hover:text-primary transition-colors">
              API
            </Link>
            <Link to="/about" className="hover:text-primary transition-colors">
              About
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} VoiceDetect. AI Voice Analysis.
          </p>
        </div>
      </div>
    </footer>
  );
}
