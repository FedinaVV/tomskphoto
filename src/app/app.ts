import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ServicesComponent } from './components/services/services.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { AboutComponent } from './components/about/about.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { PricesComponent } from './components/prices/prices.component';
import { BookingComponent } from './components/booking/booking.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { FooterComponent } from './components/footer/footer.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    ServicesComponent,
    ReviewsComponent,
    AboutComponent,
    PortfolioComponent,
    PricesComponent,
    BookingComponent,
    ContactsComponent,
    FooterComponent,
  ],
  template: `
    <app-header />
    <app-services />
    <app-reviews />
    <app-about />
    <app-portfolio />
    <app-prices />
    <app-booking />
    <app-contacts />
    <app-footer />
  `
})
export class App {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Фотограф в Томске — фото и фотосессии | Валерия Федина');
  }

}
