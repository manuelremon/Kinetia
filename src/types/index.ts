// ============================================
// TYPE DEFINITIONS
// ============================================

export interface TerminalCommand {
  type: 'command' | 'output' | 'success';
  text: string;
}

export interface FlipCardData {
  icon: string;
  label: string;
  title: string;
  description: string;
  backIcon: string;
  backTitle: string;
  backText: string;
  backButtonText: string;
}

export interface StepData {
  number: number;
  label: string;
  title: string;
  description: string;
  cardContent: React.ReactNode;
}

export interface StatData {
  target: number;
  suffix: string;
  label: string;
}

export interface NavLink {
  href: string;
  label: string;
  dropdown?: { href: string; label: string }[];
}

export interface FooterColumn {
  title: string;
  links: { href: string; label: string }[];
}

export interface SocialLink {
  href: string;
  icon: string;
  label: string;
}
