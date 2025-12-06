import { useState } from "react";
import { ArrowLeft, Calculator, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SafeExposureCalculatorProps {
  onBack: () => void;
}

const SafeExposureCalculator = ({ onBack }: SafeExposureCalculatorProps) => {
  const [skinType, setSkinType] = useState<string>("");
  const [uvIndex, setUvIndex] = useState<string>("");
  const [spf, setSpf] = useState<string>("");
  const [result, setResult] = useState<{
    safeTime: number;
    burnTime: number;
    recommendedSPF: number;
  } | null>(null);

  const calculateExposure = () => {
    if (!skinType || !uvIndex || !spf) return;

    // Base safe exposure time in minutes (varies by skin type)
    const baseTimes: { [key: string]: number } = {
      "1": 10, // Very fair
      "2": 15, // Fair
      "3": 20, // Medium
      "4": 30, // Olive
      "5": 45, // Brown
      "6": 60, // Dark brown/Black
    };

    const baseTime = baseTimes[skinType] || 20;
    const uv = parseInt(uvIndex);
    const spfValue = parseInt(spf);

    // Calculate safe exposure time
    const safeTime = Math.round((baseTime / uv) * spfValue);
    const burnTime = Math.round(baseTime / uv);
    const recommendedSPF = uv > 7 ? 50 : uv > 5 ? 30 : 15;

    setResult({ safeTime, burnTime, recommendedSPF });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-accent/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 shadow-glow">
              <Calculator className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-sun bg-clip-text text-transparent">
              Safe Exposure Calculator
            </h1>
            <p className="text-muted-foreground text-lg">
              Calculate your personalized safe sun exposure time
            </p>
          </div>

          {/* Calculator Form */}
          <Card className="backdrop-blur-glass bg-card/80 border-2 shadow-card">
            <CardHeader>
              <CardTitle>Enter Your Information</CardTitle>
              <CardDescription>We'll calculate safe exposure time based on your skin type and conditions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="skin-type">Skin Type (Fitzpatrick Scale)</Label>
                <Select value={skinType} onValueChange={setSkinType}>
                  <SelectTrigger id="skin-type">
                    <SelectValue placeholder="Select your skin type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Type I - Very Fair (Always burns, never tans)</SelectItem>
                    <SelectItem value="2">Type II - Fair (Usually burns, tans minimally)</SelectItem>
                    <SelectItem value="3">Type III - Medium (Sometimes burns, tans uniformly)</SelectItem>
                    <SelectItem value="4">Type IV - Olive (Rarely burns, tans easily)</SelectItem>
                    <SelectItem value="5">Type V - Brown (Very rarely burns, tans very easily)</SelectItem>
                    <SelectItem value="6">Type VI - Dark Brown/Black (Never burns)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="uv-index">Current UV Index</Label>
                <Select value={uvIndex} onValueChange={setUvIndex}>
                  <SelectTrigger id="uv-index">
                    <SelectValue placeholder="Select UV index" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Low</SelectItem>
                    <SelectItem value="2">2 - Low</SelectItem>
                    <SelectItem value="3">3 - Moderate</SelectItem>
                    <SelectItem value="4">4 - Moderate</SelectItem>
                    <SelectItem value="5">5 - Moderate</SelectItem>
                    <SelectItem value="6">6 - High</SelectItem>
                    <SelectItem value="7">7 - High</SelectItem>
                    <SelectItem value="8">8 - Very High</SelectItem>
                    <SelectItem value="9">9 - Very High</SelectItem>
                    <SelectItem value="10">10 - Very High</SelectItem>
                    <SelectItem value="11">11+ - Extreme</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="spf">SPF Protection</Label>
                <Select value={spf} onValueChange={setSpf}>
                  <SelectTrigger id="spf">
                    <SelectValue placeholder="Select SPF level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">SPF 15</SelectItem>
                    <SelectItem value="30">SPF 30</SelectItem>
                    <SelectItem value="50">SPF 50</SelectItem>
                    <SelectItem value="70">SPF 70+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={calculateExposure} 
                className="w-full shadow-glow"
                disabled={!skinType || !uvIndex || !spf}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Safe Exposure Time
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <Card className="backdrop-blur-glass bg-card/80 border-2 shadow-card animate-slide-up">
              <CardHeader>
                <CardTitle className="text-primary">Your Safe Exposure Time</CardTitle>
                <CardDescription>Personalized recommendations based on your inputs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-6 rounded-lg bg-gradient-sun text-white text-center space-y-2">
                    <div className="text-4xl font-bold">{result.safeTime}</div>
                    <div className="text-sm opacity-90">Minutes Safe Exposure</div>
                  </div>
                  <div className="p-6 rounded-lg bg-uv-very-high/20 border border-uv-very-high/30 text-center space-y-2">
                    <div className="text-4xl font-bold text-uv-very-high">{result.burnTime}</div>
                    <div className="text-sm text-muted-foreground">Minutes Until Burn Risk</div>
                  </div>
                  <div className="p-6 rounded-lg bg-primary/10 border border-primary/30 text-center space-y-2">
                    <div className="text-4xl font-bold text-primary">SPF {result.recommendedSPF}</div>
                    <div className="text-sm text-muted-foreground">Recommended Protection</div>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Remember to reapply sunscreen every 2 hours and after swimming or sweating. 
                    Seek shade during peak hours (10 AM - 4 PM) and wear protective clothing.
                  </AlertDescription>
                </Alert>

                <div className="space-y-3 text-sm">
                  <h4 className="font-semibold">Safety Tips:</h4>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                    <li>Apply sunscreen 15-30 minutes before going outdoors</li>
                    <li>Use approximately 1 ounce (shot glass full) for full body coverage</li>
                    <li>Don't forget often-missed areas: ears, neck, feet, and backs of hands</li>
                    <li>Wear UV-blocking sunglasses and a wide-brimmed hat</li>
                    <li>Stay hydrated, especially during prolonged sun exposure</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SafeExposureCalculator;
