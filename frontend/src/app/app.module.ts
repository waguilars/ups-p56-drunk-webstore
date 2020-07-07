import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Components
import { LicoresComponent } from './components/licores/licores.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { FooterHomeComponent } from './shared/footer-home/footer-home.component';
import { SliderComponent } from './components/slider/slider.component';
import { NavbarHomeComponent } from './shared/navbar-home/navbar-home.component';
import { ProductListComponent } from './components/product-list/product-list.component';

// Routing
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
    LicoresComponent,
    SliderComponent,
    ProductListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
