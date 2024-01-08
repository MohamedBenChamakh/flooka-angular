import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ContentsComponent } from './components/contents/contents.component';
import { NavbarComponent } from './templates/navbar/navbar.component';
import { ContentService } from './services/content/content.service';
import { HttpClientModule } from '@angular/common/http'
import { CategoryService } from './services/category/category.service';
import { CardComponent } from './templates/card/card.component';
import { MenuComponent } from './templates/menu/menu.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ContentsComponent,
    NavbarComponent,
    CardComponent,
    MenuComponent,
    CreatePostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [ContentService, CategoryService,{provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
