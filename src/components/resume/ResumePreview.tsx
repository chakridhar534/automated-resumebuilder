import { forwardRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone } from "lucide-react";
import type { ResumeData, TailoredResult } from "@/types/resume";

export type ResumeTemplate = "modern" | "classic" | "minimal";

interface ResumePreviewProps {
  data: ResumeData;
  tailored: TailoredResult | null;
  template?: ResumeTemplate;
}

const templateStyles: Record<ResumeTemplate, {
  container: string;
  fontFamily: string;
  headerClass: string;
  nameClass: string;
  sectionTitle: string;
  bodyText: string;
  bulletIcon: string;
  badgeVariant: "secondary" | "outline" | "default";
}> = {
  modern: {
    container: "bg-background p-8 max-w-[800px] mx-auto",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    headerClass: "border-b-4 border-primary pb-4 mb-6",
    nameClass: "text-3xl font-extrabold tracking-tight text-primary",
    sectionTitle: "text-xs font-bold uppercase tracking-[0.2em] text-primary border-b-2 border-primary/30 pb-1 mb-3",
    bodyText: "text-sm leading-relaxed text-foreground/85",
    bulletIcon: "▸",
    badgeVariant: "default",
  },
  classic: {
    container: "bg-background p-8 max-w-[800px] mx-auto",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    headerClass: "text-center border-b-2 border-foreground pb-4 mb-6",
    nameClass: "text-2xl font-bold tracking-wide text-foreground uppercase",
    sectionTitle: "text-sm font-bold uppercase tracking-widest text-foreground border-b border-border pb-1 mb-3",
    bodyText: "text-sm leading-relaxed text-foreground/90",
    bulletIcon: "•",
    badgeVariant: "secondary",
  },
  minimal: {
    container: "bg-background p-8 max-w-[800px] mx-auto",
    fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
    headerClass: "pb-4 mb-6",
    nameClass: "text-2xl font-light tracking-wide text-foreground",
    sectionTitle: "text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground mb-3",
    bodyText: "text-sm leading-relaxed text-foreground/80",
    bulletIcon: "–",
    badgeVariant: "outline",
  },
};

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ data, tailored, template = "classic" }, ref) => {
    const styles = templateStyles[template];

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
        className={styles.container}
        style={{ fontFamily: styles.fontFamily }}
      >
        {/* Header */}
        <div className={styles.headerClass}>
          <h1 className={styles.nameClass}>
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
          <h2 className={styles.sectionTitle}>Professional Summary</h2>
          <p className={styles.bodyText}>{tailored.professionalSummary}</p>
        </section>

        {/* Experience */}
        <section className="mb-5">
          <h2 className={styles.sectionTitle}>Experience</h2>
          <ul className="space-y-1.5">
            {tailored.optimizedBulletPoints.map((point, i) => (
              <li key={i} className={`${styles.bodyText} flex gap-2`}>
                <span className="text-foreground mt-0.5">{styles.bulletIcon}</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Education */}
        <section className="mb-5">
          <h2 className={styles.sectionTitle}>Education</h2>
          <p className={`${styles.bodyText} whitespace-pre-line`}>{data.education}</p>
        </section>

        {/* Skills */}
        <section>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {tailored.suggestedSkills.map((skill, i) => (
              <Badge key={i} variant={styles.badgeVariant} className="text-xs font-normal">
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
