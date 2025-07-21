import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(true);

  public user$ = this.userSubject.asObservable();
  public token$ = this.tokenSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  private readonly USER_STORAGE_KEY = 'portfolio_user';
  private readonly TOKEN_STORAGE_KEY = 'portfolio_token';

  constructor(private apiService: ApiService) {
    this.initializeAuth();
  }

  private async initializeAuth() {
    const savedUser = this.getFromStorage<User>(this.USER_STORAGE_KEY);
    const savedToken = this.getFromStorage<string>(this.TOKEN_STORAGE_KEY);

    if (savedUser && savedToken) {
      // Verify token with backend
      this.apiService.verifyToken(savedToken).subscribe(response => {
        if (response.success && response.data) {
          this.userSubject.next(response.data.user);
          this.tokenSubject.next(savedToken);
        } else {
          // Token is invalid, clear storage
          this.clearStorage();
        }
        this.loadingSubject.next(false);
      });
    } else {
      this.loadingSubject.next(false);
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    this.loadingSubject.next(true);

    try {
      const response = await this.apiService.login(email, password).toPromise();
      
      if (response?.success && response.data) {
        const { user, token } = response.data;
        this.userSubject.next(user);
        this.tokenSubject.next(token);
        this.setInStorage(this.USER_STORAGE_KEY, user);
        this.setInStorage(this.TOKEN_STORAGE_KEY, token);
        return true;
      } else {
        // Fallback to demo credentials for development
        if (email === 'admin@portfolio.com' && password === 'admin123') {
          const demoUser = {
            id: '1',
            email: 'admin@portfolio.com',
            name: 'John Doe',
          };
          const demoToken = 'demo-token-' + Date.now();
          
          this.userSubject.next(demoUser);
          this.tokenSubject.next(demoToken);
          this.setInStorage(this.USER_STORAGE_KEY, demoUser);
          this.setInStorage(this.TOKEN_STORAGE_KEY, demoToken);
          return true;
        }
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Fallback to demo credentials for development
      if (email === 'admin@portfolio.com' && password === 'admin123') {
        const demoUser = {
          id: '1',
          email: 'admin@portfolio.com',
          name: 'John Doe',
        };
        const demoToken = 'demo-token-' + Date.now();
        
        this.userSubject.next(demoUser);
        this.tokenSubject.next(demoToken);
        this.setInStorage(this.USER_STORAGE_KEY, demoUser);
        this.setInStorage(this.TOKEN_STORAGE_KEY, demoToken);
        return true;
      }
      
      return false;
    } finally {
      this.loadingSubject.next(false);
    }
  }

  async logout() {
    const token = this.tokenSubject.value;
    
    try {
      if (token && !token.startsWith('demo-token-')) {
        await this.apiService.logout(token).toPromise();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.userSubject.next(null);
      this.tokenSubject.next(null);
      this.clearStorage();
    }
  }

  get isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }

  get currentUser(): User | null {
    return this.userSubject.value;
  }

  get currentToken(): string | null {
    return this.tokenSubject.value;
  }

  private getFromStorage<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error getting item from localStorage:', error);
      return null;
    }
  }

  private setInStorage<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting item in localStorage:', error);
    }
  }

  private clearStorage(): void {
    try {
      localStorage.removeItem(this.USER_STORAGE_KEY);
      localStorage.removeItem(this.TOKEN_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
}