import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles, Briefcase, GraduationCap, Wrench, FileText, Upload, X, FileUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
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
  const [isParsing, setIsParsing] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const update = (field: keyof ResumeData, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast({ title: "Invalid file", description: "Please upload a PDF file.", variant: "destructive" });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({ title: "File too large", description: "PDF must be under 10MB.", variant: "destructive" });
      return;
    }

    setIsParsing(true);
    setFileName(file.name);

    try {
      const formPayload = new FormData();
      formPayload.append("file", file);

      const { data: result, error } = await supabase.functions.invoke("parse-resume-pdf", {
        body: formPayload,
      });

      if (error) throw error;

      if (result?.error) {
        toast({ title: "Parse failed", description: result.error, variant: "destructive" });
        return;
      }

      setFormData((prev) => ({
        ...prev,
        experience: result.experience || prev.experience,
        education: result.education || prev.education,
        skills: result.skills || prev.skills,
      }));

      toast({ title: "PDF parsed!", description: "Your resume details have been extracted. Review and edit as needed." });
    } catch (err) {
      console.error("PDF parse error:", err);
      toast({ title: "Upload failed", description: "Could not extract text from PDF. Please try again or enter details manually.", variant: "destructive" });
    } finally {
      setIsParsing(false);
    }
  };

  const clearFile = () => {
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* PDF Upload */}
      <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
        <CardContent className="pt-6">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileUpload}
            className="hidden"
            disabled={isParsing}
          />

          {isParsing ? (
            <div className="flex flex-col items-center gap-3 py-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Extracting text from your resume...</p>
            </div>
          ) : fileName ? (
            <div className="flex items-center justify-between gap-3 py-2">
              <div className="flex items-center gap-2 text-sm">
                <FileUp className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">{fileName}</span>
                <span className="text-muted-foreground">— extracted</span>
              </div>
              <div className="flex items-center gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()}>
                  Replace
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={clearFile}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex flex-col items-center gap-3 py-6 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <Upload className="h-8 w-8 text-primary" />
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">Upload existing resume (PDF)</p>
                <p className="text-xs text-muted-foreground mt-1">We'll extract your experience, education, and skills automatically</p>
              </div>
            </button>
          )}
        </CardContent>
      </Card>

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
        disabled={isLoading || isParsing}
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
