import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isDark!: boolean;
  socialUser!: SocialUser;
  isLoggedin?: boolean;

  
  ngOnInit(): void {
    this.isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
    });
  }

  constructor(private socialAuthService: SocialAuthService){}

  darkMode() {
    if (this.isDark)
      document.documentElement.setAttribute('data-bs-theme', 'light');
    else
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    this.isDark = !this.isDark;
  }

  signIn() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
}
