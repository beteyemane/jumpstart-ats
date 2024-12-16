export interface WorkExperience {
  role: string;
  company: string;
  description: string;
  timeSpent: string;
}

export interface Candidate {
  id: number;
  email: string;
  fullName: string;
  rawCV?: string;
  selectionStream?: string;
  rightToWork?: string;
  linkedIn?: string;
  undergradDegreeType?: string;
  undergradSubject?: string;
  undergradUniversity?: string;
  undergradGraduationYear?: number;
  undergradResult?: string;
  technologies?: string;
  cvRaw?: string;
  photo?: string;
  github?: string | null;
  workExperience?: WorkExperience[];
  codingLanguages?: string | null;
  topAchievement?: string;
  languages?: string | null;
  generalistRoles?: string;
  preferredWorkingStyle?: string;
  minSalary?: string;
  idealSalary: string;
  videoIntro?: string;
  roleAppliedFor: string;
  ranking?: string;
  matchType?: string;
  applicationRationale?: string;
  stage: string;
  stageLastModified?: string;
  notes?: string;
}

export enum Status {
  Applied = "Applied",
  Interviewing = "Interviewing",
  Offered = "Offered",
  Rejected = "Rejected",
}

export interface ColumnType {
  id: string;
  title: string;
  candidates: string[];
}

export interface ColumnProps {
  column: ColumnType;
  candidates: Record<string, Candidate>;
  updateNotes: (candidateId: string, newNotes: string) => void;
}

export type Column = {
  id: string;
  title: string;
  candidates: string[];
};

export type Data = {
  columns: Record<string, Column>;
  candidates: Record<string, Candidate>;
};

export interface ItemType {
  id: number;
  email: string;
  fullName: string;
}

export interface ItemProps {
  id: string;
  item: Candidate;
  columnId: string;
  updateNotes: (candidateId: string, newNotes: string) => void;
}

export interface NotesModalProps {
  id: string;
  handleClose: () => void;
  notes?: string;
  open: boolean;
  updateNotes: (candidateId: string, newNotes: string) => void;
}

export type ColumnKey = "applied" | "interviewing" | "offer" | "rejected";
