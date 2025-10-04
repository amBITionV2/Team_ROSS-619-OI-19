import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b border-border bg-background shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-12 w-1 bg-gradient-to-b from-saffron via-background to-india-green rounded-full" />
            <div>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-navy" />
                <h1 className="text-xl font-bold text-navy">DigiVoter</h1>
              </div>
              <p className="text-xs text-muted-foreground">Degitalise voting queue</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/verify" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Verify ID
            </Link>
            <Link to="/booths" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Find Booths
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
