import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component'
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { PostViewComponent } from './components/pages/post-view/post-view.component';
import { CreatePostComponent } from './components/pages/create-post/create-post.component';
import { UserViewComponent } from './components/pages/user-view/user-view.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'posts/:pid',
    component: LandingPageComponent,
    pathMatch: 'prefix'
  },
  {
    path: 'post/:pid',
    component: PostViewComponent,
    pathMatch: 'prefix'
  },
  {
    path: 'create',
    component: CreatePostComponent,
    pathMatch: 'full'
  },
  {
    path: 'create/:path',
    component: CreatePostComponent,
    pathMatch: 'full'
  },
  {
    path: 'user/:ualiastag',
    component: UserViewComponent,
    pathMatch: 'prefix'
  },
  {
    path: 'user',
    component: UserViewComponent,
    pathMatch: 'prefix'
  },
  {
    path: 'login',
    component: LoginPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
