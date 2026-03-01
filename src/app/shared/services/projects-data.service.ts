import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GitHubService, GitHubRepo } from './github.service';
import { ProjectItem } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProjectsDataService {
  constructor(private githubService: GitHubService) {}

  getProjectsData(): Observable<ProjectItem[]> {
    return this.githubService.getReposWithLanguages().pipe(
      map(repos => this.transformGitHubReposToProjects(repos))
    );
  }

  getFeaturedProjects(): Observable<ProjectItem[]> {
    return this.getProjectsData().pipe(
      map(projects => projects.filter(project => project.featured).slice(0, 6))
    );
  }

  private transformGitHubReposToProjects(repos: GitHubRepo[]): ProjectItem[] {
    return repos.map(repo => ({
      title: this.formatRepoName(repo.name),
      description: repo.description || this.generateDescription(repo),
      technologies: this.extractTechnologies(repo),
      github: repo.html_url,
      featured: this.isFeaturedRepo(repo),
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      updatedAt: repo.updated_at
    }));
  }

  private generateDescription(repo: GitHubRepo): string {
    const techKeywords = this.extractTechnologies(repo).slice(0, 3).join(', ');
    return `Proyecto desarrollado con ${techKeywords || 'diversas tecnologías'}. Repositorio privado con código fuente y documentación.`;
  }

  private formatRepoName(name: string): string {
    return name.replace(/-/g, ' ').replace(/_/g, ' ').split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private extractTechnologies(repo: GitHubRepo): string[] {
    const technologies: string[] = [];
    
    if (repo.language) {
      technologies.push(repo.language);
    }
    
    const techKeywords: Record<string, string[]> = {
      'angular': ['Angular', 'TypeScript', 'HTML', 'CSS'],
      'react': ['React', 'JavaScript', 'TypeScript'],
      'spring': ['Spring Boot', 'Java', 'Maven'],
      'node': ['Node.js', 'JavaScript', 'Express'],
      'python': ['Python', 'Django', 'Flask'],
      'php': ['PHP', 'Laravel', 'Symfony'],
      'docker': ['Docker', 'Docker Compose'],
      'api': ['REST API', 'API'],
      'web': ['HTML', 'CSS', 'JavaScript']
    };

    const repoNameLower = repo.name.toLowerCase();
    const descriptionLower = (repo.description || '').toLowerCase();
    
    Object.entries(techKeywords).forEach(([key, techs]) => {
      if (repoNameLower.includes(key) || descriptionLower.includes(key)) {
        techs.forEach(tech => {
          if (!technologies.includes(tech)) {
            technologies.push(tech);
          }
        });
      }
    });

    return technologies.slice(0, 6);
  }

  private isFeaturedRepo(repo: GitHubRepo): boolean {
    const featuredKeywords = ['portfolio', 'api', 'web', 'app', 'system', 'project', 'demo'];
    const repoNameLower = repo.name.toLowerCase();
    
    const hasKeyword = featuredKeywords.some(keyword => repoNameLower.includes(keyword));
    const hasStars = repo.stargazers_count > 0;
    const hasForks = repo.forks_count > 0;
    const isFeatured = repo.topics.includes('featured') || repo.topics.includes('showcase');
    const isRecent = repo.updated_at ? this.isRecentRepo(repo.updated_at) : false;
    
    return hasKeyword || hasStars || hasForks || isFeatured || isRecent;
  }

  private isRecentRepo(updatedAt: string): boolean {
    const updateDate = new Date(updatedAt);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return updateDate > threeMonthsAgo;
  }
}
