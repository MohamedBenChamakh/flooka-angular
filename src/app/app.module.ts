import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ContentsComponent } from './components/contents/contents.component';
import { NavbarComponent } from './templates/navbar/navbar.component';
import { ContentComponent } from './components/content/content.component';
import { ContentService } from './services/content/content.service';
import { HttpClientModule } from '@angular/common/http'
import { CategoryService } from './services/category/category.service';
import { CardComponent } from './templates/card/card.component';
import { MenuComponent } from './templates/menu/menu.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    ContentsComponent,
    NavbarComponent,
    ContentComponent,
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
  providers: [ContentService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
