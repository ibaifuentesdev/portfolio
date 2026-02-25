export interface ExperienceItem {
  readonly isCurrent: boolean;
  readonly title: string;
  readonly company: string;
  readonly employmentType?: string;
  readonly location?: string;
  readonly period: string;
  readonly startDate: string;
  readonly endDate?: string;
  readonly icon?: string;
  readonly iconColor?: string;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly skills: readonly string[];
}

export interface ProjectItem {
  readonly title: string;
  readonly description: string;
  readonly technologies: readonly string[];
  readonly link?: string;
  readonly github?: string;
  readonly image?: string;
  readonly featured?: boolean;
}

export interface ServiceItem {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly stack: readonly string[];
}

export interface StatItem {
  readonly value: string;
  readonly label: string;
}
