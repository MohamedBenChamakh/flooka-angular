import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isDark!: boolean;

  ngOnInit(): void {
    this.isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
  }

  darkMode() {
    if (this.isDark)
      document.documentElement.setAttribute('data-bs-theme', 'light');
    else
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    this.isDark = !this.isDark;
  }
}
