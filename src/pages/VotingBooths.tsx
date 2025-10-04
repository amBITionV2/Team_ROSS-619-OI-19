import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MapPin, Clock, Users, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

interface Booth {
  id: string;
  name: string;
  address: string;
  distance: string;
  queueLength: number;
  estimatedWait: string;
  status: "low" | "medium" | "high";
}

const mockBooths: Booth[] = [
  {
    id: "1",
    name: "Municipal School - Sector 12",
    address: "123 Main Road, Sector 12, City Name - 110001",
    distance: "0.8 km",
    queueLength: 12,
    estimatedWait: "15-20 min",
    status: "low"
  },
  {
    id: "2",
    name: "Community Center - Block A",
    address: "456 Park Avenue, Block A, City Name - 110002",
    distance: "1.2 km",
    queueLength: 28,
    estimatedWait: "30-40 min",
    status: "medium"
  },
  {
    id: "3",
    name: "Government College - North Wing",
    address: "789 College Road, North Campus, City Name - 110003",
    distance: "2.1 km",
    queueLength: 45,
    estimatedWait: "50-60 min",
    status: "high"
  },
  {
    id: "4",
    name: "District Office - Main Building",
    address: "321 Government Street, Central District, City Name - 110004",
    distance: "2.8 km",
    queueLength: 8,
    estimatedWait: "10-15 min",
    status: "low"
  }
];

const VotingBooths = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isVerified = location.state?.verified || false;
  const voterInfo = location.state || {};
  
  const [selectedBooth, setSelectedBooth] = useState<string | null>(null);

  const getStatusColor = (status: Booth["status"]) => {
    switch (status) {
      case "low": return "bg-secondary text-secondary-foreground";
      case "medium": return "bg-amber-500 text-white";
      case "high": return "bg-destructive text-destructive-foreground";
    }
  };

  const getStatusLabel = (status: Booth["status"]) => {
    switch (status) {
      case "low": return "Low Wait";
      case "medium": return "Moderate Wait";
      case "high": return "High Wait";
    }
  };

  const handleJoinQueue = (booth: Booth) => {
    if (!isVerified) {
      toast.error("Please verify your Voter ID first");
      navigate("/verify");
      return;
    }

    setSelectedBooth(booth.id);
    toast.success(`Joining queue at ${booth.name}`);
    
    setTimeout(() => {
      navigate("/queue", { 
        state: { 
          booth, 
          voterInfo,
          tokenNumber: Math.floor(Math.random() * 900) + 100 
        } 
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-navy mb-2">Find Voting Booths Near You</h1>
            <p className="text-muted-foreground">
              Select a booth based on distance and current queue status
            </p>
          </div>

          {!isVerified && (
            <Card className="mb-8 border-amber-200 bg-amber-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Navigation className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-amber-900 mb-1">Verification Required</p>
                    <p className="text-sm text-amber-700 mb-3">
                      Please verify your Voter ID to join the digital queue
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate("/verify")}
                      className="bg-white"
                    >
                      Verify Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-6">
            {mockBooths.map((booth) => (
              <Card 
                key={booth.id} 
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{booth.name}</CardTitle>
                      <CardDescription className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>{booth.address}</span>
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(booth.status)}>
                      {getStatusLabel(booth.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Navigation className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Distance</p>
                        <p className="font-semibold text-navy">{booth.distance}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Queue Length</p>
                        <p className="font-semibold text-navy">{booth.queueLength} people</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <Clock className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Est. Wait Time</p>
                        <p className="font-semibold text-navy">{booth.estimatedWait}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleJoinQueue(booth)}
                      disabled={selectedBooth === booth.id}
                      className="flex-1"
                    >
                      {selectedBooth === booth.id ? "Joining..." : "Join Digital Queue"}
                    </Button>
                    <Button variant="outline">
                      View on Map
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VotingBooths;
