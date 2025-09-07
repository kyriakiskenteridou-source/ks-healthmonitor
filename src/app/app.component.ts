import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { PatientCardComponent } from './shared/components/components/patient-card/patient-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  dropdownOpen = signal(false);
  isLoggedIn = false;
  private router = inject(Router);
  
  constructor(private authService: AuthService) {}

  loginOrLogout() {
    if (this.isLoggedIn) {
      this.authService.logout();
      this.isLoggedIn = false;
      this.router.navigate(['/']);
    } else {
      this.authService.login('customer_admin', 'healthmonitoring2021').subscribe({
        next: (data) => {
          console.log('Login successful!', data);
          this.isLoggedIn = true;
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          console.error('Login error:', err);
        }
      });
    }
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.dropdownOpen.update(open => !open);
  }

  @HostListener('document:click')
  closeDropdown() {
    this.dropdownOpen.set(false);
  }

  onLogin(event: MouseEvent) {
    event.stopPropagation();
    this.dropdownOpen.set(false);
    console.log('Login clicked');
  }
}
