import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Sparkles, CheckCircle2 } from "lucide-react";

const Dashboard = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-success/10 text-success text-sm font-semibold mb-4">
            See It In Action
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Before & After
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how AI transforms a generic resume into a job-winning one
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Before */}
          <Card className="p-6 border-destructive/20">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-destructive" />
              <h3 className="text-lg font-semibold text-card-foreground">Before — Generic</h3>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Professional Summary:</p>
              <p className="italic">"Experienced developer looking for new opportunities."</p>
              <p className="font-medium text-foreground mt-4">Bullet Points:</p>
              <ul className="space-y-2">
                <li className="flex gap-2"><span>•</span>Worked on web applications</li>
                <li className="flex gap-2"><span>•</span>Used various programming languages</li>
                <li className="flex gap-2"><span>•</span>Collaborated with team members</li>
              </ul>
            </div>
          </Card>

          {/* After */}
          <Card className="p-6 border-success/20 bg-success/5">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-success" />
              <h3 className="text-lg font-semibold text-card-foreground">After — AI-Tailored</h3>
              <Badge className="bg-success/20 text-success border-0 ml-auto">Optimized</Badge>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Professional Summary:</p>
              <p className="italic">"Full-stack engineer with 4+ years building scalable React and Node.js applications. Proven track record of reducing page load times by 40% and leading agile teams of 5+ developers."</p>
              <p className="font-medium text-foreground mt-4">Bullet Points:</p>
              <ul className="space-y-2">
                {[
                  "Architected and deployed 3 production React/TypeScript apps serving 50K+ monthly users",
                  "Reduced API response times by 60% through database query optimization and Redis caching",
                  "Led cross-functional team of 5 engineers using Agile/Scrum methodology",
                ].map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
