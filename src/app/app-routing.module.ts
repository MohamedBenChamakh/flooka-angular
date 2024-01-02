import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { ContentsComponent } from './components/contents/contents.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'contents', component: ContentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
