import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QrCode, MapPin, Clock, Users, CheckCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const QueueDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booth, voterInfo, tokenNumber } = location.state || {};
  
  const [currentPosition, setCurrentPosition] = useState(tokenNumber ? Math.floor(Math.random() * 15) + 5 : 8);
  const [estimatedTime, setEstimatedTime] = useState(12);

  useEffect(() => {
    if (!booth || !tokenNumber) {
      navigate("/verify");
      return;
    }

    // Simulate real-time queue updates
    const interval = setInterval(() => {
      setCurrentPosition((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 1;
        }
        return prev - 1;
      });
      
      setEstimatedTime((prev) => Math.max(0, prev - 1.5));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [booth, tokenNumber, navigate]);

  if (!booth || !tokenNumber) {
    return null;
  }

  const progress = ((booth.queueLength - currentPosition) / booth.queueLength) * 100;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 bg-secondary/10 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-secondary" />
            </div>
            <h1 className="text-3xl font-bold text-navy mb-2">You're in the Queue!</h1>
            <p className="text-muted-foreground">
              Track your position and estimated wait time below
            </p>
          </div>

          {/* Token Number Card */}
          <Card className="mb-8 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white border-0 shadow-xl">
            <CardContent className="pt-8 pb-8">
              <div className="text-center">
                <p className="text-sm opacity-90 mb-2">Your Token Number</p>
                <div className="text-7xl font-bold mb-4">{tokenNumber}</div>
                <div className="flex items-center justify-center gap-2 text-sm opacity-90">
                  <QrCode className="h-4 w-4" />
                  <span>Show this at the booth entrance</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Queue Status */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Queue Status</CardTitle>
              <CardDescription>Real-time updates on your position</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Your Position</span>
                  <span className="text-sm text-muted-foreground">
                    {currentPosition} of {booth.queueLength}
                  </span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">People Ahead</p>
                    <p className="text-2xl font-bold text-navy">{currentPosition}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Est. Wait Time</p>
                    <p className="text-2xl font-bold text-navy">{Math.ceil(estimatedTime)} min</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Queue Speed</p>
                    <p className="text-2xl font-bold text-navy">Normal</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booth Details */}
          <Card>
            <CardHeader>
              <CardTitle>Booth Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold text-navy mb-1">{booth.name}</p>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{booth.address}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-3">
                  Please arrive at the booth when your position is under 5. You'll receive a notification.
                </p>
                <Button variant="outline" className="w-full">
                  Get Directions
                </Button>
              </div>
            </CardContent>
          </Card>

          {currentPosition <= 5 && (
            <Card className="mt-6 border-secondary bg-secondary/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-secondary" />
                  <div>
                    <p className="font-semibold text-secondary">Your turn is coming soon!</p>
                    <p className="text-sm text-muted-foreground">
                      Please make your way to the booth entrance
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default QueueDashboard;
