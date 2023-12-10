import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { ContentsComponent } from './components/contents/contents.component';
import { ContentComponent } from './components/content/content.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'contents', component: ContentsComponent },
  { path: 'content/:contentId', component: ContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
