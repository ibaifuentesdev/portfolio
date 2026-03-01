import { Injectable } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { ProjectsDataService } from './projects-data.service';
import { ExperienceService } from './experience.service';
import { ProjectItem, ExperienceItem } from '../models';

export interface HomeData {
  featuredProjects: ProjectItem[];
  recentExperience: ExperienceItem | undefined;
  stats: {
    totalProjects: number;
    totalCompanies: number;
    yearsExperience: number;
    totalTechnologies: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(
    private projectsDataService: ProjectsDataService,
    private experienceService: ExperienceService
  ) {}

  getHomeData(): Observable<HomeData> {
    return this.projectsDataService.getFeaturedProjects().pipe(
      map(projects => {
        const currentExperience = this.experienceService.getCurrentExperience();
        return this.buildHomeData(projects, currentExperience);
      })
    );
  }

  private buildHomeData(featuredProjects: ProjectItem[], currentExperience: ExperienceItem | undefined): HomeData {
    const allExperiences = this.experienceService.getExperienceData();
    const allTechnologies = this.extractAllTechnologies(featuredProjects, [...allExperiences]);

    return {
      featuredProjects: featuredProjects.slice(0, 2),
      recentExperience: currentExperience,
      stats: {
        totalProjects: featuredProjects.length,
        totalCompanies: allExperiences.length,
        yearsExperience: this.calculateYearsExperience([...allExperiences]),
        totalTechnologies: allTechnologies.length
      }
    };
  }

  private extractAllTechnologies(projects: ProjectItem[], experiences: ExperienceItem[]): string[] {
    const technologies = new Set<string>();

    projects.forEach(project => {
      project.technologies.forEach(tech => technologies.add(tech));
    });

    experiences.forEach(experience => {
      experience.skills.forEach(skill => technologies.add(skill));
    });

    return Array.from(technologies).sort();
  }

  private calculateYearsExperience(experiences: ExperienceItem[]): number {
    if (experiences.length === 0) return 0;

    const sortedExperiences = [...experiences].sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    const firstExperience = sortedExperiences[0];
    const startDate = new Date(firstExperience.startDate);
    const currentDate = new Date();

    return Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365));
  }
}
