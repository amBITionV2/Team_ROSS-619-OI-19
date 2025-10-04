import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const VoterVerification = () => {
  const navigate = useNavigate();
  const [voterId, setVoterId] = useState("");
  const [name, setName] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "success" | "failed" | "unregistered">("idle");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock verification logic
      if (voterId.length >= 8 && name.length >= 3) {
        // Simulate 80% success rate
        const isRegistered = Math.random() > 0.2;
        
        if (isRegistered) {
          setVerificationStatus("success");
          toast.success("Voter ID verified successfully!");
          
          // Redirect to booths page after short delay
          setTimeout(() => {
            navigate("/booths", { state: { verified: true, voterId, name } });
          }, 2000);
        } else {
          setVerificationStatus("unregistered");
          toast.error("Voter ID not found. Please register at your nearest booth.");
        }
      } else {
        setVerificationStatus("failed");
        toast.error("Invalid Voter ID or Name. Please check your details.");
      }
      
      setIsVerifying(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 bg-primary/10 rounded-full mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-navy mb-2">Verify Your Voter ID</h1>
            <p className="text-muted-foreground">
              Enter your voter ID details to proceed with the digital queue system
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Voter Information</CardTitle>
              <CardDescription>
                Please provide accurate information as per your voter ID card
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerify} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="voterId">Voter ID Number</Label>
                  <Input
                    id="voterId"
                    placeholder="e.g., ABC1234567"
                    value={voterId}
                    onChange={(e) => setVoterId(e.target.value.toUpperCase())}
                    required
                    className="font-mono"
                    disabled={isVerifying}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter your 10-character Voter ID number
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="As per Voter ID card"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isVerifying}
                  />
                </div>

                {verificationStatus === "success" && (
                  <div className="flex items-center gap-2 p-4 bg-secondary/10 border border-secondary/20 rounded-lg text-secondary">
                    <CheckCircle className="h-5 w-5" />
                    <p className="text-sm font-medium">Verification successful! Redirecting...</p>
                  </div>
                )}

                {verificationStatus === "failed" && (
                  <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm font-medium">Verification failed. Please check your details.</p>
                  </div>
                )}

                {verificationStatus === "unregistered" && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-2 mb-3">
                      <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-900 mb-1">Voter ID Not Registered</p>
                        <p className="text-sm text-amber-700">
                          Please visit the registration desk at your nearest voting booth to complete registration.
                        </p>
                      </div>
                    </div>
                    <Button 
                      type="button"
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate("/booths")}
                      className="w-full"
                    >
                      Find Nearest Booth for Registration
                    </Button>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isVerifying || verificationStatus === "success"}
                >
                  {isVerifying ? "Verifying..." : "Verify Voter ID"}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold text-sm text-navy mb-2">Don't have a Voter ID?</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  You can register at the registration desk available at all voting booths.
                </p>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="p-0 h-auto"
                  onClick={() => navigate("/booths")}
                >
                  Find Registration Desk
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VoterVerification;
