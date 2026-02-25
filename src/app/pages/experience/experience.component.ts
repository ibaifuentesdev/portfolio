import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer, DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { ExperienceItem } from '../../shared/models';
import { EXPERIENCE_DATA } from '../../shared/services/experience-data.service';

interface JsonLdJobPosting {
  readonly '@context': string;
  readonly '@type': string;
  readonly title: string;
  readonly description: string;
  readonly hiringOrganization: {
    readonly '@type': string;
    readonly name: string;
  };
  readonly jobLocation?: {
    readonly '@type': string;
    readonly address: {
      readonly '@type': string;
      readonly addressLocality: string;
      readonly addressRegion: string;
      readonly addressCountry: string;
    };
  };
  readonly employmentType?: string;
  readonly datePosted: string;
  readonly validThrough?: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements OnInit {
  protected selectedSkill: string | null = null;
  protected readonly experience: readonly ExperienceItem[] = EXPERIENCE_DATA;

  constructor(
    private readonly titleService: Title,
    private readonly metaService: Meta,
    @Inject(PLATFORM_ID) private readonly platformId: object,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  ngOnInit(): void {
    // SEO: Meta tags
    this.titleService.setTitle('Experiencia Profesional | Ibai Fuentes - Desarrollador Fullstack');
    
    this.metaService.updateTag({ 
      name: 'description', 
      content: '3+ años de experiencia como desarrollador fullstack. Especializado en Spring Boot, Angular, TypeScript, PostgreSQL y MongoDB. Trabajo en LKS NEXT, EXENTIA y más empresas.' 
    });
    
    this.metaService.updateTag({ property: 'og:title', content: 'Experiencia Profesional | Ibai Fuentes' });
    this.metaService.updateTag({ property: 'og:description', content: 'Desarrollador fullstack con experiencia en Spring Boot, Angular y más tecnologías modernas.' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://ibaifuentes.dev/experiencia' });
    
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: 'Experiencia Profesional | Ibai Fuentes' });
    this.metaService.updateTag({ name: 'twitter:description', content: 'Desarrollador fullstack con experiencia en Spring Boot, Angular y más tecnologías modernas.' });

    // Structured Data para SEO
    if (isPlatformServer(this.platformId)) {
      this.injectJsonLd();
    }
  }

  protected get filteredExperience(): readonly ExperienceItem[] {
    if (!this.selectedSkill) {
      return this.experience;
    }
    return this.experience.filter(item => 
      item.skills.some(skill => 
        skill.toLowerCase().includes(this.selectedSkill!.toLowerCase())
      )
    );
  }

  protected get topFilterSkills(): readonly string[] {
    const allSkills = this.experience.flatMap(item => item.skills);
    const skillCount = new Map<string, number>();
    
    allSkills.forEach(skill => {
      skillCount.set(skill, (skillCount.get(skill) || 0) + 1);
    });
    
    return Array.from(skillCount.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([skill]) => skill);
  }

  protected toggleSkillFilter(skill: string): void {
    this.selectedSkill = this.selectedSkill === skill ? null : skill;
  }

  protected clearFilter(): void {
    this.selectedSkill = null;
  }

  private injectJsonLd(): void {
    const jobPostings = this.experience
      .filter(exp => !exp.isCurrent)
      .map(exp => this.createJobPostingJsonLd(exp));

    const profileStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Ibai Fuentes',
      jobTitle: 'Full-stack Developer',
      description: 'Desarrollador fullstack con más de 3 años de experiencia en Spring Boot, Angular, TypeScript y tecnologías modernas.',
      url: 'https://ibaifuentes.dev',
      knowsAbout: this.experience.flatMap(exp => exp.skills),
      worksFor: this.experience.map(exp => ({
        '@type': 'Organization',
        name: exp.company
      })),
      hasOccupation: jobPostings
    };

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(profileStructuredData);
    this.document.head.appendChild(script);
  }

  private createJobPostingJsonLd(exp: ExperienceItem): JsonLdJobPosting {
    return {
      '@context': 'https://schema.org',
      '@type': 'EmployeeRole',
      title: exp.title,
      description: exp.description,
      hiringOrganization: {
        '@type': 'Organization',
        name: exp.company
      },
      ...(exp.location && {
        jobLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressLocality: exp.location.split(',')[0] || '',
            addressRegion: 'País Vasco',
            addressCountry: 'España'
          }
        }
      }),
      ...(exp.employmentType && {
        employmentType: this.mapEmploymentType(exp.employmentType)
      }),
      datePosted: exp.startDate,
      ...(exp.endDate && { validThrough: exp.endDate })
    };
  }

  private mapEmploymentType(type: string): string {
    const typeMap: Record<string, string> = {
      'Jornada completa': 'FULL_TIME',
      'Contrato de prácticas': 'INTERN',
      'Media jornada': 'PART_TIME',
      'Freelance': 'CONTRACTOR'
    };
    return typeMap[type] || 'FULL_TIME';
  }
}
