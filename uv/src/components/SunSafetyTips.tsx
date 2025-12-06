import { ArrowLeft, Shield, Droplets, Shirt, Glasses, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SunSafetyTipsProps {
  onBack: () => void;
}

const SunSafetyTips = ({ onBack }: SunSafetyTipsProps) => {
  const tips = [
    {
      icon: Shield,
      title: "Sunscreen Usage",
      description: "Apply broad-spectrum SPF 30+ sunscreen",
      tips: [
        "Apply 15-30 minutes before sun exposure",
        "Use about 1 ounce (a shot glass full) for full body",
        "Reapply every 2 hours or after swimming/sweating",
        "Don't forget ears, neck, feet, and hands",
        "Use water-resistant formulas for swimming",
      ],
    },
    {
      icon: Clock,
      title: "Peak Hours Awareness",
      description: "UV rays are strongest between 10 AM - 4 PM",
      tips: [
        "Seek shade during midday hours",
        "Plan outdoor activities before 10 AM or after 4 PM",
        "Watch for your shadow - shorter shadow means higher UV",
        "UV can reflect off water, sand, and concrete",
        "Cloudy days still have 80% of UV radiation",
      ],
    },
    {
      icon: Shirt,
      title: "Protective Clothing",
      description: "Cover up with sun-protective fabrics",
      tips: [
        "Wear tightly woven, dark-colored clothing",
        "Choose UPF-rated clothing when possible",
        "Long sleeves and pants provide best protection",
        "Wet clothing offers less protection",
        "Cover shoulders and back thoroughly",
      ],
    },
    {
      icon: Glasses,
      title: "Eye Protection",
      description: "Protect your eyes from UV damage",
      tips: [
        "Wear sunglasses that block 99-100% of UVA and UVB rays",
        "Wraparound styles provide best protection",
        "Larger lenses protect more of the eye area",
        "Polarized lenses reduce glare but don't increase UV protection",
        "Children need eye protection too",
      ],
    },
    {
      icon: Droplets,
      title: "Stay Hydrated",
      description: "Maintain proper hydration in the sun",
      tips: [
        "Drink water before, during, and after sun exposure",
        "Avoid alcohol and caffeine which can dehydrate",
        "Increase fluid intake in hot weather",
        "Watch for signs of dehydration: dizziness, dry mouth",
        "Children and elderly need extra attention to hydration",
      ],
    },
    {
      icon: Heart,
      title: "Know Your Skin",
      description: "Understand your skin type and risks",
      tips: [
        "Fair skin burns more easily - take extra precautions",
        "Check skin regularly for new or changing moles",
        "People with many moles or freckles are at higher risk",
        "Family history of skin cancer increases risk",
        "All skin types can get skin cancer - protection is universal",
      ],
    },
  ];

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
              <Shield className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-sun bg-clip-text text-transparent">
              Sun Safety Tips
            </h1>
            <p className="text-muted-foreground text-lg">
              Expert guidance for comprehensive sun protection
            </p>
          </div>

          {/* Tips Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <Card 
                  key={index} 
                  className="backdrop-blur-glass bg-card/80 border-2 shadow-card hover:shadow-glow transition-all animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      {tip.title}
                    </CardTitle>
                    <CardDescription>{tip.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tip.tips.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Educational Resources */}
          <Card className="backdrop-blur-glass bg-card/80 border-2 shadow-card">
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
              <CardDescription>Trusted organizations for more information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <a 
                  href="https://www.who.int/news-room/fact-sheets/detail/ultraviolet-radiation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                >
                  <div>
                    <div className="font-semibold group-hover:text-primary transition-colors">World Health Organization</div>
                    <div className="text-sm text-muted-foreground">UV radiation guidelines and health effects</div>
                  </div>
                  <ArrowLeft className="rotate-180 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
                <a 
                  href="https://www.epa.gov/sunsafety"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                >
                  <div>
                    <div className="font-semibold group-hover:text-primary transition-colors">EPA - SunWise Program</div>
                    <div className="text-sm text-muted-foreground">Sun safety resources and UV index information</div>
                  </div>
                  <ArrowLeft className="rotate-180 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
                <a 
                  href="https://www.skincancer.org/skin-cancer-prevention/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                >
                  <div>
                    <div className="font-semibold group-hover:text-primary transition-colors">Skin Cancer Foundation</div>
                    <div className="text-sm text-muted-foreground">Prevention tips and early detection information</div>
                  </div>
                  <ArrowLeft className="rotate-180 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SunSafetyTips;
