import { useState, useEffect } from "react";
import { Sun, Shield, Clock, MapPin, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UVDashboard from "@/components/UVDashboard";
import SafeExposureCalculator from "@/components/SafeExposureCalculator";
import SunSafetyTips from "@/components/SunSafetyTips";

const Index = () => {
  const [currentUV, setCurrentUV] = useState<number | null>(null);
  const [location, setLocation] = useState<string>("Detecting...");
  const [activeSection, setActiveSection] = useState<
    "home" | "dashboard" | "calculator" | "tips"
  >("home");

const saveUVData = async (location: string, uvIndex: number) => {
  try {
    const res = await fetch("http://localhost:5000/api/uv/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location, uvIndex }),
    });

    const data = await res.json();
    console.log("Saved to Mongo:", data);
  } catch (error) {
    console.error("Error saving UV data:", error);
  }
};


  useEffect(() => {
    // Get user location and fetch UV data
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchUVData(latitude, longitude);
        },
        () => {
          setLocation("Location unavailable");
        }
      );
    }
  }, []);

   const fetchHistory = async () => {
  const res = await fetch("http://localhost:5000/api/uv/history");
  const data = await res.json();
  console.log("History from Mongo:", data);
  return data;
 };

  
  const fetchUVData = async (lat: number, lon: number) => {
  const uv = 7;
  const loc = `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`;

  setCurrentUV(uv);
  setLocation(loc);

  // 👉 ADD THIS LINE
  saveUVData(loc, uv);
 };


  const getUVRiskLevel = (uv: number | null) => {
    if (uv === null)
      return {
        level: "Unknown",
        color: "text-muted-foreground",
        bg: "bg-muted",
      };
    if (uv <= 2)
      return { level: "Low", color: "text-uv-low", bg: "bg-uv-low/20" };
    if (uv <= 5)
      return {
        level: "Moderate",
        color: "text-uv-moderate",
        bg: "bg-uv-moderate/20",
      };
    if (uv <= 7)
      return { level: "High", color: "text-uv-high", bg: "bg-uv-high/20" };
    if (uv <= 10)
      return {
        level: "Very High",
        color: "text-uv-very-high",
        bg: "bg-uv-very-high/20",
      };
    return {
      level: "Extreme",
      color: "text-uv-extreme",
      bg: "bg-uv-extreme/20",
    };
  };

  const risk = getUVRiskLevel(currentUV);

  if (activeSection === "dashboard") {
    return <UVDashboard onBack={() => setActiveSection("home")} />;
  }

  if (activeSection === "calculator") {
    return <SafeExposureCalculator onBack={() => setActiveSection("home")} />;
  }

  if (activeSection === "tips") {
    return <SunSafetyTips onBack={() => setActiveSection("home")} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-sun opacity-10 animate-pulse-glow" />
        <div className="container relative z-10 mx-auto max-w-6xl">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 shadow-glow mb-4">
              {/* UPDATED: Sun icon changed to brown */}
              <Sun className="w-16 h-16 text-[brown] animate-pulse-glow" />
            </div>

            {/* UPDATED TEXT COLOR TO BROWN */}
            <h1 className="text-5xl md:text-7xl font-bold text-[brown]">
              SunSafety
            </h1>

            <p className="text-xl md:text-2xl text-[brown] max-w-2xl mx-auto">
              Your personal UV awareness & protection platform. Stay safe under
              the sun with real-time monitoring.
            </p>
            {/* END UPDATE */}

            {/* Current UV Display */}
            <Card className="max-w-md mx-auto backdrop-blur-glass bg-card/80 border-2 shadow-card animate-slide-up">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                  {location}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-2">
                    {currentUV !== null ? currentUV : "--"}
                  </div>

                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${risk.bg} ${risk.color} font-semibold`}
                  >
                    <Shield className="w-4 h-4" />
                    {risk.level} Risk
                  </div>
                </div>

                <p className="text-sm text-muted-foreground text-center">
                  UV Index updated in real-time
                </p>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="shadow-glow"
                onClick={() => setActiveSection("dashboard")}
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                View Dashboard
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => setActiveSection("calculator")}
              >
                <Clock className="mr-2 h-5 w-5" />
                Safe Exposure Timer
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="px-4 py-16 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            <Card
              className="backdrop-blur-glass bg-card/80 border shadow-card hover:shadow-glow transition-shadow cursor-pointer"
              onClick={() => setActiveSection("dashboard")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  UV Insights
                </CardTitle>
                <CardDescription>
                  Real-time UV trends and forecasts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Track hourly and weekly UV patterns with interactive charts
                  and color-coded risk levels.
                </p>
              </CardContent>
            </Card>

            <Card
              className="backdrop-blur-glass bg-card/80 border shadow-card hover:shadow-glow transition-shadow cursor-pointer"
              onClick={() => setActiveSection("calculator")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Exposure Timer
                </CardTitle>
                <CardDescription>
                  Calculate safe sun exposure time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get personalized recommendations based on your skin type, UV
                  index, and SPF protection.
                </p>
              </CardContent>
            </Card>

            <Card
              className="backdrop-blur-glass bg-card/80 border shadow-card hover:shadow-glow transition-shadow cursor-pointer"
              onClick={() => setActiveSection("tips")}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Safety Tips
                </CardTitle>
                <CardDescription>Expert sun protection guidance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Learn best practices for sunscreen, clothing, shade, and
                  hydration to stay protected.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 border-t">
        <div className="container mx-auto max-w-6xl text-center text-sm text-muted-foreground">
          <p>© 2025 SunSafety. Stay protected under the sun.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
