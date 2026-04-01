import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles, Briefcase, GraduationCap, Wrench, FileText } from "lucide-react";
import type { ResumeData } from "@/types/resume";

interface ResumeFormProps {
  onSubmit: (data: ResumeData) => void;
  isLoading: boolean;
}

const ResumeForm = ({ onSubmit, isLoading }: ResumeFormProps) => {
  const [formData, setFormData] = useState<ResumeData>({
    experience: "",
    education: "",
    skills: "",
    jobDescription: "",
  });

  const update = (field: keyof ResumeData, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Experience */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Briefcase className="h-5 w-5 text-primary" />
            Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder={"Software Engineer at Acme Corp (2021-Present)\n• Built scalable APIs serving 1M+ requests/day\n• Led migration from monolith to microservices\n\nJunior Developer at StartupXYZ (2019-2021)\n• Developed React dashboards for analytics"}
            className="min-h-[160px]"
            value={formData.experience}
            onChange={(e) => update("experience", e.target.value)}
            required
          />
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <GraduationCap className="h-5 w-5 text-primary" />
            Education
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder={"B.S. Computer Science, MIT (2019)\nGPA: 3.8/4.0"}
            className="min-h-[100px]"
            value={formData.education}
            onChange={(e) => update("education", e.target.value)}
            required
          />
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Wrench className="h-5 w-5 text-primary" />
            Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="React, TypeScript, Node.js, Python, AWS, Docker, PostgreSQL"
            className="min-h-[80px]"
            value={formData.skills}
            onChange={(e) => update("skills", e.target.value)}
            required
          />
        </CardContent>
      </Card>

      {/* Job Description */}
      <Card className="border-accent/30 bg-accent/5">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-accent" />
            Target Job Description
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Paste the full job description here. The AI will analyze it and tailor your resume to match the required qualifications, keywords, and responsibilities."
            className="min-h-[180px]"
            value={formData.jobDescription}
            onChange={(e) => update("jobDescription", e.target.value)}
            required
          />
        </CardContent>
      </Card>

      <Button
        type="submit"
        size="lg"
        className="w-full text-base"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Tailoring your resume...
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            Tailor My Resume with AI
          </>
        )}
      </Button>
    </form>
  );
};

export default ResumeForm;
