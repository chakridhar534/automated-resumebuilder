import { forwardRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone } from "lucide-react";
import type { ResumeData, TailoredResult } from "@/types/resume";

interface ResumePreviewProps {
  data: ResumeData;
  tailored: TailoredResult | null;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ data, tailored }, ref) => {
    if (!tailored) {
      return (
        <div className="flex items-center justify-center h-full min-h-[400px] text-muted-foreground text-center p-8">
          <div>
            <p className="text-lg font-medium mb-2">Your tailored resume will appear here</p>
            <p className="text-sm">Fill in your details and paste a job description, then click "Tailor My Resume with AI"</p>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className="bg-background p-8 max-w-[800px] mx-auto"
        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
      >
        {/* Header */}
        <div className="text-center border-b-2 border-foreground pb-4 mb-6">
          <h1 className="text-2xl font-bold tracking-wide text-foreground uppercase">
            {data.fullName || "Your Name"}
          </h1>
          <div className="flex items-center justify-center gap-4 mt-2 text-sm text-muted-foreground">
            {data.email && (
              <span className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {data.email}
              </span>
            )}
            {data.phone && (
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {data.phone}
              </span>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest text-foreground border-b border-border pb-1 mb-3">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-foreground/90">
            {tailored.professionalSummary}
          </p>
        </section>

        {/* Experience */}
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest text-foreground border-b border-border pb-1 mb-3">
            Experience
          </h2>
          <ul className="space-y-1.5">
            {tailored.optimizedBulletPoints.map((point, i) => (
              <li key={i} className="text-sm leading-relaxed text-foreground/90 flex gap-2">
                <span className="text-foreground mt-0.5">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Education */}
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest text-foreground border-b border-border pb-1 mb-3">
            Education
          </h2>
          <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
            {data.education}
          </p>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-foreground border-b border-border pb-1 mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {tailored.suggestedSkills.map((skill, i) => (
              <Badge key={i} variant="secondary" className="text-xs font-normal">
                {skill}
              </Badge>
            ))}
          </div>
        </section>
      </div>
    );
  }
);

ResumePreview.displayName = "ResumePreview";

export default ResumePreview;
