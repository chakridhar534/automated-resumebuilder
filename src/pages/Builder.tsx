import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ResumeForm from "@/components/resume/ResumeForm";
import ResumePreview from "@/components/resume/ResumePreview";
import type { ResumeData, TailoredResult } from "@/types/resume";

const Builder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [tailored, setTailored] = useState<TailoredResult | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleSubmit = async (data: ResumeData) => {
    setIsLoading(true);
    setResumeData(data);

    try {
      const { data: result, error } = await supabase.functions.invoke(
        "tailor-resume",
        {
          body: {
            experience: data.experience,
            education: data.education,
            skills: data.skills,
            jobDescription: data.jobDescription,
          },
        }
      );

      if (error) throw error;

      if (result?.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
        return;
      }

      setTailored(result as TailoredResult);
      toast({
        title: "Resume tailored!",
        description: "Your resume has been optimized for the target role.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Something went wrong",
        description: "Could not tailor your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;

    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData?.fullName || "resume"}_tailored.pdf`);

      toast({ title: "PDF downloaded!", description: "Your resume has been saved." });
    } catch {
      toast({
        title: "PDF export failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex items-center justify-between h-14 px-4">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <h1 className="font-semibold text-foreground">Resume Builder</h1>
          {tailored && (
            <Button size="sm" onClick={handleDownloadPDF}>
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
          )}
          {!tailored && <div className="w-[100px]" />}
        </div>
      </header>

      {/* Main Content */}
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Form */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-foreground">Your Details</h2>
              <p className="text-sm text-muted-foreground">
                Enter your information and paste the target job description.
              </p>
            </div>
            <ResumeForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>

          {/* Right: Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Preview</h2>
                <p className="text-sm text-muted-foreground">
                  AI-tailored resume preview
                </p>
              </div>
            </div>
            <Card className="overflow-hidden">
              <ResumePreview
                ref={previewRef}
                data={resumeData || { fullName: "", email: "", phone: "", experience: "", education: "", skills: "", jobDescription: "" }}
                tailored={tailored}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
