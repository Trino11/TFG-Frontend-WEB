import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptorInterceptor } from './interceptors/jwt-interceptor.interceptor';
import { QuillModule } from 'ngx-quill'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { NavbarComponent } from './components/recycle/navbar/navbar.component';
import { FooterComponent } from './components/recycle/footer/footer.component';
import { PostViewComponent } from './components/pages/post-view/post-view.component';
import { UserViewComponent } from './components/pages/user-view/user-view.component';
import { CreatePostComponent } from './components/pages/create-post/create-post.component';
import { ChatComponent } from './components/recycle/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NavbarComponent,
    FooterComponent,
    PostViewComponent,
    UserViewComponent,
    CreatePostComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    QuillModule.forRoot()
  ],
  providers: [CookieService, {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptorInterceptor,
    multi: true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
