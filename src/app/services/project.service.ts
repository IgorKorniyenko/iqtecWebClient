import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASEURL, PROJECTENDPOINTS } from '../shared/api/endpoints';
import { Project } from '../shared/models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(BASEURL + PROJECTENDPOINTS.get('getall'));
  }

  getProject(name: string): Observable<Project>{
    return this.http.get<Project>(BASEURL + PROJECTENDPOINTS.get('getbyname') + name)
  }

  postProject(project: Project): Observable<Project>{
    return this.http.post<Project>(BASEURL + PROJECTENDPOINTS.get('create'), project);
  }

  putProject(project: Project): Observable<Project>{
    return this.http.put<Project>(BASEURL + PROJECTENDPOINTS.get('update'), project);
  }

  deleteProject(name: string): Observable<Project>{
    return this.http.delete<Project>(BASEURL + PROJECTENDPOINTS.get('delete') + name);
  }
}
