const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-navy mb-3">Digital Voting System</h3>
            <p className="text-sm text-muted-foreground">
              A modern solution for efficient and transparent voting management.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-navy mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Help & Support</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-navy mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: support@digitalvoting.gov.in</li>
              <li>Helpline: 1800-XXX-XXXX</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 Government of India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
