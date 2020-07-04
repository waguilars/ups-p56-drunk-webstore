import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTING } from './app.route';

// Components
import { AppComponent } from './app.component';
import { NavbarHomeComponent } from './components/shared/navbar-home/navbar-home.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { FooterHomeComponent } from './components/shared/footer-home/footer-home.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { LoginComponent } from './components/pages/login/login.component';
import { LicoresComponent } from './components/pages/licores/licores.component';

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
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
