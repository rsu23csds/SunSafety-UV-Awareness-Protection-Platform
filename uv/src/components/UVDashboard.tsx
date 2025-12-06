import { ArrowLeft, Sun, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
interface UVDashboardProps {
  onBack: () => void;
}

const UVDashboard = ({ onBack }: UVDashboardProps) => {
  // Mock hourly data
    const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/uv/history");
      const data = await res.json();
      setHistory(data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);


  const hourlyData = [
    { hour: "6 AM", uv: 0, risk: "low" },
    { hour: "8 AM", uv: 2, risk: "low" },
    { hour: "10 AM", uv: 5, risk: "moderate" },
    { hour: "12 PM", uv: 8, risk: "very-high" },
    { hour: "2 PM", uv: 9, risk: "very-high" },
    { hour: "4 PM", uv: 6, risk: "high" },
    { hour: "6 PM", uv: 3, risk: "moderate" },
    { hour: "8 PM", uv: 0, risk: "low" },
  ];

  // Mock weekly data
  const weeklyData = [
    { day: "Mon", avgUV: 6, peak: 8 },
    { day: "Tue", avgUV: 7, peak: 9 },
    { day: "Wed", avgUV: 5, peak: 7 },
    { day: "Thu", avgUV: 8, peak: 10 },
    { day: "Fri", avgUV: 7, peak: 9 },
    { day: "Sat", avgUV: 6, peak: 8 },
    { day: "Sun", avgUV: 7, peak: 9 },
  ];

  const getUVColor = (uv: number) => {
    if (uv <= 2) return "bg-uv-low";
    if (uv <= 5) return "bg-uv-moderate";
    if (uv <= 7) return "bg-uv-high";
    if (uv <= 10) return "bg-uv-very-high";
    return "bg-uv-extreme";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 shadow-glow">
              <TrendingUp className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-sun bg-clip-text text-transparent">
              UV Insights Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Real-time UV monitoring with hourly and weekly trends
            </p>
          </div>
              {/* MongoDB UV History */}
<Card className="backdrop-blur-glass bg-card/80 border-2 shadow-card">
  <CardHeader>
    <CardTitle>Saved UV History (MongoDB)</CardTitle>
    <CardDescription>Your recorded UV index readings</CardDescription>
  </CardHeader>
  <CardContent>
    {history.length === 0 ? (
      <p className="text-muted-foreground text-sm">No UV records stored yet.</p>
    ) : (
      <div className="space-y-3">
        {history.map((item: any) => (
          <div key={item._id} className="p-3 border rounded-lg flex justify-between">
            <span className="font-medium">{item.location}</span>
            <span className="font-bold">UV: {item.uvIndex}</span>
            <span className="text-muted-foreground text-sm">
              {new Date(item.timestamp).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    )}
  </CardContent>
</Card>

          {/* Hourly UV Chart */}
          <Card className="backdrop-blur-glass bg-card/80 border-2 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-primary" />
                Hourly UV Index
              </CardTitle>
              <CardDescription>UV levels throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-8 gap-2">
                  {hourlyData.map((data, index) => (
                    <div key={index} className="text-center space-y-2">
                      <div className="text-xs text-muted-foreground">{data.hour}</div>
                      <div className={`h-24 ${getUVColor(data.uv)} rounded-lg relative flex items-end justify-center transition-all hover:scale-105`} style={{ height: `${Math.max(data.uv * 10, 20)}px` }}>
                        <span className="text-white font-bold text-sm mb-1">{data.uv}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-6 pt-4 text-sm flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-uv-low" />
                    <span className="text-muted-foreground">Low (0-2)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-uv-moderate" />
                    <span className="text-muted-foreground">Moderate (3-5)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-uv-high" />
                    <span className="text-muted-foreground">High (6-7)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-uv-very-high" />
                    <span className="text-muted-foreground">Very High (8-10)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-uv-extreme" />
                    <span className="text-muted-foreground">Extreme (11+)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly UV Trends */}
          <Card className="backdrop-blur-glass bg-card/80 border-2 shadow-card">
            <CardHeader>
              <CardTitle>Weekly UV Trends</CardTitle>
              <CardDescription>Average and peak UV levels for the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((data, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium w-16">{data.day}</span>
                      <div className="flex-1 mx-4">
                        <div className="h-8 bg-muted rounded-lg overflow-hidden relative">
                          <div 
                            className={`h-full ${getUVColor(data.peak)} transition-all`}
                            style={{ width: `${(data.peak / 11) * 100}%` }}
                          />
                          <div className="absolute inset-0 flex items-center justify-between px-3 text-xs">
                            <span className="text-white font-semibold">Avg: {data.avgUV}</span>
                            <span className="text-white font-semibold">Peak: {data.peak}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* UV Risk Information */}
          <Card className="backdrop-blur-glass bg-card/80 border-2 shadow-card">
            <CardHeader>
              <CardTitle>Understanding UV Risk Levels</CardTitle>
              <CardDescription>What each UV index level means for your skin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-uv-low/20 border border-uv-low/30">
                  <h4 className="font-semibold text-uv-low mb-2">Low (0-2)</h4>
                  <p className="text-sm text-muted-foreground">Minimal protection needed. Safe for most people.</p>
                </div>
                <div className="p-4 rounded-lg bg-uv-moderate/20 border border-uv-moderate/30">
                  <h4 className="font-semibold text-uv-moderate mb-2">Moderate (3-5)</h4>
                  <p className="text-sm text-muted-foreground">Protection required. Wear sunscreen, hat, and sunglasses.</p>
                </div>
                <div className="p-4 rounded-lg bg-uv-high/20 border border-uv-high/30">
                  <h4 className="font-semibold text-uv-high mb-2">High (6-7)</h4>
                  <p className="text-sm text-muted-foreground">Extra protection essential. Seek shade during midday hours.</p>
                </div>
                <div className="p-4 rounded-lg bg-uv-very-high/20 border border-uv-very-high/30">
                  <h4 className="font-semibold text-uv-very-high mb-2">Very High (8-10)</h4>
                  <p className="text-sm text-muted-foreground">Take all precautions. Unprotected skin burns quickly.</p>
                </div>
                <div className="p-4 rounded-lg bg-uv-extreme/20 border border-uv-extreme/30">
                  <h4 className="font-semibold text-uv-extreme mb-2">Extreme (11+)</h4>
                  <p className="text-sm text-muted-foreground">Avoid sun exposure. Stay in shade between 10am-4pm.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UVDashboard;
