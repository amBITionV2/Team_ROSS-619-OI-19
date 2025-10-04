import { ArrowRight, CheckCircle, MapPin, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-voting.jpg";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-background via-muted/20 to-background py-20 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-saffron via-background to-india-green" />
          
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary">
                  <Shield className="h-4 w-4" />
                  Secure & Verified
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-navy leading-tight">
                  Digital Queue Management for Voting Booths
                </h1>
                
                <p className="text-lg text-muted-foreground">
                  Join digital queues, track wait times, and exercise your democratic right efficiently. 
                  A modern solution for seamless voting experience.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="shadow-lg">
                    <Link to="/verify">
                      Verify Voter ID <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" size="lg">
                    <Link to="/booths">
                      Find Nearby Booths
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="Digital Voting System" 
                  className="rounded-lg shadow-2xl w-full"
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-saffron to-primary rounded-lg opacity-20" />
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-india-green to-secondary rounded-lg opacity-20" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Follow these simple steps to join the digital queue and vote efficiently
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>1. Verify Your ID</CardTitle>
                  <CardDescription>
                    Enter your Voter ID details to verify your registration status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="link" className="p-0">
                    <Link to="/verify">
                      Start Verification <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-secondary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>2. Find Your Booth</CardTitle>
                  <CardDescription>
                    View nearby voting booths with real-time queue information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="link" className="p-0 text-secondary hover:text-secondary/80">
                    <Link to="/booths">
                      View Booths <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-accent/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>3. Join Digital Queue</CardTitle>
                  <CardDescription>
                    Get a digital token and track your position in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Available after verification
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-navy mb-4">Why Use Digital Queue?</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Clock, title: "Save Time", desc: "No physical waiting in long queues" },
                { icon: Shield, title: "Secure", desc: "Verified and authenticated process" },
                { icon: CheckCircle, title: "Real-time Updates", desc: "Track your queue position live" },
                { icon: MapPin, title: "Convenience", desc: "Choose booth with shortest wait" },
              ].map((benefit, index) => (
                <div key={index} className="text-center p-6 bg-background rounded-lg shadow-sm">
                  <div className="h-12 w-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-6 w-6 text-navy" />
                  </div>
                  <h3 className="font-semibold text-navy mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
