import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse, PersonalInfo, Project, Skill, ContactInfo } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(token?: string): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    
    return headers;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result as T);
    };
  }

  // Auth API calls
  login(email: string, password: string): Observable<ApiResponse<{ user: any; token: string }>> {
    return this.http.post<ApiResponse<{ user: any; token: string }>>(
      `${this.apiUrl}/auth/login`,
      { email, password }
    ).pipe(
      catchError(this.handleError<ApiResponse<{ user: any; token: string }>>('login', { success: false, error: 'Login failed' }))
    );
  }

  logout(token: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.apiUrl}/auth/logout`,
      {},
      { headers: this.getHeaders(token) }
    ).pipe(
      catchError(this.handleError<ApiResponse<any>>('logout', { success: false }))
    );
  }

  verifyToken(token: string): Observable<ApiResponse<{ user: any }>> {
    return this.http.get<ApiResponse<{ user: any }>>(
      `${this.apiUrl}/auth/verify`,
      { headers: this.getHeaders(token) }
    ).pipe(
      catchError(this.handleError<ApiResponse<{ user: any }>>('verifyToken', { success: false }))
    );
  }

  // Personal Info API calls
  getPersonalInfo(): Observable<ApiResponse<PersonalInfo>> {
    return this.http.get<ApiResponse<PersonalInfo>>(`${this.apiUrl}/personal-info`).pipe(
      catchError(this.handleError<ApiResponse<PersonalInfo>>('getPersonalInfo', { success: false }))
    );
  }

  updatePersonalInfo(data: PersonalInfo, token: string): Observable<ApiResponse<PersonalInfo>> {
    return this.http.put<ApiResponse<PersonalInfo>>(
      `${this.apiUrl}/personal-info`,
      data,
      { headers: this.getHeaders(token) }
    ).pipe(
      catchError(this.handleError<ApiResponse<PersonalInfo>>('updatePersonalInfo', { success: false }))
    );
  }

  // Projects API calls
  getProjects(): Observable<ApiResponse<Project[]>> {
    return this.http.get<ApiResponse<Project[]>>(`${this.apiUrl}/projects`).pipe(
      catchError(this.handleError<ApiResponse<Project[]>>('getProjects', { success: false }))
    );
  }

  createProject(data: Omit<Project, 'id'>, token: string): Observable<ApiResponse<Project>> {
    return this.http.post<ApiResponse<Project>>(
      `${this.apiUrl}/projects`,
      data,
      { headers: this.getHeaders(token) }
    ).pipe(
      catchError(this.handleError<ApiResponse<Project>>('createProject', { success: false }))
    );
  }

  updateProject(id: string, data: Omit<Project, 'id'>, token: string): Observable<ApiResponse<Project>> {
    return this.http.put<ApiResponse<Project>>(
      `${this.apiUrl}/projects/${id}`,
      data,
      { headers: this.getHeaders(token) }
    ).pipe(
      catchError(this.handleError<ApiResponse<Project>>('updateProject', { success: false }))
    );
  }

  deleteProject(id: string, token: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(
      `${this.apiUrl}/projects/${id}`,
      { headers: this.getHeaders(token) }
    ).pipe(
      catchError(this.handleError<ApiResponse<any>>('deleteProject', { success: false }))
    );
  }

  // Skills API calls
  getSkills(): Observable<ApiResponse<{ frontend: Skill[]; backend: Skill[] }>> {
    return this.http.get<ApiResponse<{ frontend: Skill[]; backend: Skill[] }>>(`${this.apiUrl}/skills`).pipe(
      catchError(this.handleError<ApiResponse<{ frontend: Skill[]; backend: Skill[] }>>('getSkills', { success: false }))
    );
  }

  updateSkills(data: { frontend: Skill[]; backend: Skill[] }, token: string): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(
      `${this.apiUrl}/skills`,
      data,
      { headers: this.getHeaders(token) }
    ).pipe(
      catchError(this.handleError<ApiResponse<any>>('updateSkills', { success: false }))
    );
  }

  // Contact Info API calls
  getContactInfo(): Observable<ApiResponse<ContactInfo>> {
    return this.http.get<ApiResponse<ContactInfo>>(`${this.apiUrl}/contact-info`).pipe(
      catchError(this.handleError<ApiResponse<ContactInfo>>('getContactInfo', { success: false }))
    );
  }

  updateContactInfo(data: ContactInfo, token: string): Observable<ApiResponse<ContactInfo>> {
    return this.http.put<ApiResponse<ContactInfo>>(
      `${this.apiUrl}/contact-info`,
      data,
      { headers: this.getHeaders(token) }
    ).pipe(
      catchError(this.handleError<ApiResponse<ContactInfo>>('updateContactInfo', { success: false }))
    );
  }

  // Contact Form API calls
  submitContactForm(data: { name: string; email: string; message: string }): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.apiUrl}/contact/submit`,
      data
    ).pipe(
      catchError(this.handleError<ApiResponse<any>>('submitContactForm', { success: false }))
    );
  }
}