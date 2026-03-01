import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  created_at: string;
  size: number;
  private: boolean;
  fork: boolean;
  topics: string[];
}

@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  private readonly apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = environment.githubToken;

    if (!token) {
      console.warn('GitHub token no configurado - usando modo sin autenticación');
      return new HttpHeaders({
        'Accept': 'application/vnd.github.v3+json'
      });
    }

    return new HttpHeaders({
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json'
    });
  }

  getAllRepos(): Observable<GitHubRepo[]> {
    return this.http.get<GitHubRepo[]>(`${this.apiUrl}/user/repos`, {
      headers: this.getHeaders(),
      params: {
        type: 'all',
        sort: 'updated',
        per_page: '100'
      }
    });
  }

  getRepoDetails(repoName: string): Observable<GitHubRepo> {
    return this.http.get<GitHubRepo>(`${this.apiUrl}/repos/ibaifuentesdev/${repoName}`, {
      headers: this.getHeaders()
    });
  }

  getRepoLanguages(repoName: string): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.apiUrl}/repos/ibaifuentesdev/${repoName}/languages`, {
      headers: this.getHeaders()
    });
  }

  getReposWithLanguages(): Observable<GitHubRepo[]> {
    return this.getAllRepos().pipe(
      map((repos: GitHubRepo[]) => repos.filter((repo: GitHubRepo) => !repo.fork))
    );
  }
}
