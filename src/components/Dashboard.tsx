import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2 } from "lucide-react";

const Dashboard = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-success/10 text-success text-sm font-semibold mb-4">
            Powerful Analytics
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Dashboard Preview
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant insights into class performance with our intuitive analytics dashboard
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <Card className="p-6 bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">High Performers</p>
                <p className="text-3xl font-bold text-foreground">34</p>
              </div>
              <div className="p-2 rounded-lg bg-success/20">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-success/10 text-success border-0">
                +12% from last term
              </Badge>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">At Risk</p>
                <p className="text-3xl font-bold text-foreground">8</p>
              </div>
              <div className="p-2 rounded-lg bg-warning/20">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-warning/10 text-warning border-0">
                Needs attention
              </Badge>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg. Accuracy</p>
                <p className="text-3xl font-bold text-foreground">87%</p>
              </div>
              <div className="p-2 rounded-lg bg-accent/20">
                <CheckCircle2 className="w-6 h-6 text-accent" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-accent/10 text-accent border-0">
                High confidence
              </Badge>
            </div>
          </Card>

          {/* Performance Chart Preview */}
          <Card className="lg:col-span-2 p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">
              Performance Trends
            </h3>
            <div className="space-y-4">
              {[
                { name: "Mathematics", score: 85, trend: "up", color: "bg-primary" },
                { name: "Science", score: 78, trend: "up", color: "bg-accent" },
                { name: "English", score: 72, trend: "down", color: "bg-warning" },
                { name: "History", score: 90, trend: "up", color: "bg-success" },
              ].map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{subject.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{subject.score}%</span>
                      {subject.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-warning" />
                      )}
                    </div>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${subject.color} rounded-full transition-all duration-500`}
                      style={{ width: `${subject.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Student List Preview */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">
              Recent Predictions
            </h3>
            <div className="space-y-3">
              {[
                { name: "Sarah M.", status: "High", color: "text-success" },
                { name: "James K.", status: "Medium", color: "text-primary" },
                { name: "Emily R.", status: "At Risk", color: "text-warning" },
                { name: "Michael T.", status: "High", color: "text-success" },
              ].map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                  <span className="text-sm font-medium text-foreground">{student.name}</span>
                  <Badge variant="secondary" className={`${student.color} border-0`}>
                    {student.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
