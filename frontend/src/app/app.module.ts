import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from './app.component';
import { NavbarHomeComponent } from './components/shared/navbar-home/navbar-home.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { FooterHomeComponent } from './components/shared/footer-home/footer-home.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoginComponent } from './components/pages/login/login.component';
import { LicoresComponent } from './components/pages/licores/licores.component';
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    NavbarHomeComponent,
    HomeComponent,
    AboutComponent,
    FooterHomeComponent,
    RegisterComponent,
    LoginComponent,
    LicoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
