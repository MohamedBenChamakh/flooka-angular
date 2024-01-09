import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isDark!: boolean;
  isLoggedIn!: boolean;

  constructor(private keycloak: KeycloakService) { }

  ngOnInit(): void {
    this.isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
    this.isLoggedIn = this.keycloak.isLoggedIn();
    if (this.isLoggedIn)
      this.keycloak.loadUserProfile().then(console.log)
  }


  darkMode() {
    if (this.isDark)
      document.documentElement.setAttribute('data-bs-theme', 'light');
    else
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    this.isDark = !this.isDark;
  }

  logIn() {
    this.keycloak.login();
  }

  logOut() {
    this.keycloak.logout();
  }
}
