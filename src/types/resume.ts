export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  education: string;
  skills: string;
  jobDescription: string;
}

export interface TailoredResult {
  professionalSummary: string;
  optimizedBulletPoints: string[];
  suggestedSkills: string[];
}
