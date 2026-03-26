import { Upload, Brain, BarChart3, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Upload,
    number: "01",
    title: "Upload Student Data",
    description: "Input data manually or upload CSV/Excel files with student information including grades, attendance, and demographics.",
  },
  {
    icon: Brain,
    number: "02",
    title: "AI Analysis",
    description: "Our machine learning algorithms process the data using KNN, Decision Tree, Random Forest, and Naive Bayes models.",
  },
  {
    icon: BarChart3,
    number: "03",
    title: "View Predictions",
    description: "Receive detailed performance predictions with confidence scores, visualizations, and trend analysis.",
  },
  {
    icon: CheckCircle,
    number: "04",
    title: "Take Action",
    description: "Get personalized recommendations and intervention strategies to help at-risk students improve their performance.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Simple Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From data upload to actionable insights in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Lines - Hidden on mobile */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-success" style={{ width: 'calc(100% - 8rem)', left: '4rem' }} />

          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-card rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border">
                {/* Step Number */}
                <div className="text-6xl font-bold text-primary/10 absolute top-4 right-4">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent p-3 mb-4 relative z-10 shadow-lg">
                  <step.icon className="w-full h-full text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Mobile Connector */}
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center my-4">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-accent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
