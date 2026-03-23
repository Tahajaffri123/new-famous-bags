import { Injectable, signal } from '@angular/core';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSignal = signal<User | null>(null);

  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = signal<boolean>(false).asReadonly(); // Simplified for now

  login(email: string) {
    // Mock login
    const user: User = {
      id: 'u1',
      name: email.split('@')[0],
      email
    };
    this.currentUserSignal.set(user);
    // In a real app, we'd set a token and update isAuthenticated
  }

  logout() {
    this.currentUserSignal.set(null);
  }
}
