import type { Metadata } from 'next';
import { resume } from '@/lib/resume';
import { ResumeContent } from './resume-content';

export const metadata: Metadata = {
  title: 'Resume',
  description: `${resume.name} — resume / CV.`,
};

export default function ResumePage() {
  return <ResumeContent />;
}
