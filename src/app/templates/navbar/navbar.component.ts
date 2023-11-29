import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isDark!: boolean;

  darkMode() {
    this.isDark= document.documentElement.getAttribute('data-bs-theme') === 'dark'
    if (this.isDark)
      document.documentElement.setAttribute('data-bs-theme', 'light')
    else
      document.documentElement.setAttribute('data-bs-theme', 'dark')
  }
}
