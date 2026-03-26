import { Card } from "@/components/ui/card";
import { Sparkles, Target, FileText, Zap, Shield, Download } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Tailoring",
    description: "Our AI analyzes the job description and rewrites your bullet points with the exact keywords recruiters are looking for.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Target,
    title: "ATS-Optimized Output",
    description: "Resumes are structured to pass Applicant Tracking Systems with proper formatting, keywords, and section hierarchy.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: FileText,
    title: "Professional Summary",
    description: "Get a compelling 2-3 sentence summary automatically generated to match the target role and company.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "No waiting around. Paste your JD and get your tailored resume in under 30 seconds.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data is processed securely and never stored. We don't keep copies of your resume or personal information.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Download,
    title: "PDF Export",
    description: "Download your finished resume as a clean, professional PDF ready to submit to any employer.",
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
              Land More Interviews
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stop sending generic resumes. Our AI tailors every detail to match what the hiring manager is looking for.
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
