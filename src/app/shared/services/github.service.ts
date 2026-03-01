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
  private readonly headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Authorization': `token ${environment.githubToken}`,
      'Accept': 'application/vnd.github.v3+json'
    });
  }

  getAllRepos(): Observable<GitHubRepo[]> {
    return this.http.get<GitHubRepo[]>(`${this.apiUrl}/user/repos`, { 
      headers: this.headers,
      params: {
        type: 'all',
        sort: 'updated',
        per_page: '100'
      }
    });
  }

  getRepoDetails(repoName: string): Observable<GitHubRepo> {
    return this.http.get<GitHubRepo>(`${this.apiUrl}/repos/ibaifuentesdev/${repoName}`, {
      headers: this.headers
    });
  }

  getRepoLanguages(repoName: string): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.apiUrl}/repos/ibaifuentesdev/${repoName}/languages`, {
      headers: this.headers
    });
  }

  getReposWithLanguages(): Observable<GitHubRepo[]> {
    return this.getAllRepos().pipe(
      map((repos: GitHubRepo[]) => repos.filter((repo: GitHubRepo) => !repo.fork))
    );
  }
}
