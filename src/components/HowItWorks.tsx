import { ClipboardList, Sparkles, Eye, Download } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "Enter Your Details",
    description: "Fill in your experience, education, and skills. No formatting needed — just paste your content.",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "Paste the Job Description",
    description: "Copy the target job posting. The AI will analyze required skills, keywords, and qualifications.",
  },
  {
    icon: Eye,
    number: "03",
    title: "Review Tailored Resume",
    description: "Get an optimized professional summary, rewritten bullet points, and highlighted skills in seconds.",
  },
  {
    icon: Download,
    number: "04",
    title: "Export & Apply",
    description: "Download your polished resume as a clean PDF and submit it with confidence.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Simple Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From raw details to a tailored resume in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-success" style={{ width: 'calc(100% - 8rem)', left: '4rem' }} />

          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-card rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border">
                <div className="text-6xl font-bold text-primary/10 absolute top-4 right-4">
                  {step.number}
                </div>
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent p-3 mb-4 relative z-10 shadow-lg">
                  <step.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
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
