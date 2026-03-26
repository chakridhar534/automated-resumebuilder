import { Card } from "@/components/ui/card";
import { Brain, TrendingUp, Users, Shield, FileBarChart, Lightbulb } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Predictions",
    description: "Advanced machine learning algorithms analyze multiple factors to predict student performance with 85%+ accuracy.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: TrendingUp,
    title: "Performance Analytics",
    description: "Visualize trends, compare metrics, and track progress with intuitive charts and comprehensive dashboards.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Users,
    title: "At-Risk Identification",
    description: "Automatically identify struggling students early with confidence scores and priority recommendations.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: FileBarChart,
    title: "Bulk Data Processing",
    description: "Upload CSV/Excel files to analyze entire classes instantly. Process hundreds of records in seconds.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Lightbulb,
    title: "Actionable Insights",
    description: "Get personalized study plans, intervention strategies, and improvement recommendations for each student.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "Bank-level encryption and FERPA compliance ensure student data remains confidential and protected.",
    gradient: "from-indigo-500 to-blue-500",
  },
];

const Features = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Powerful Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need to
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Transform Student Outcomes
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools designed for educators who want to make data-driven decisions and improve student success rates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border bg-card group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-2.5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
