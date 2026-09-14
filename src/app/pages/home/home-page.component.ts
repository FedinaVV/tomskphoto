import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AboutComponent } from '../../components/about/about.component';
import { BookingComponent } from '../../components/booking/booking.component';
import { ContactsComponent } from '../../components/contacts/contacts.component';
import { PortfolioComponent } from '../../components/portfolio/portfolio.component';
import { PricesComponent } from '../../components/prices/prices.component';
import { ReviewsComponent } from '../../components/reviews/reviews.component';
import { ServicesComponent } from '../../components/services/services.component';

@Component({
  selector: 'app-home-page',
  imports: [
    ServicesComponent,
    ReviewsComponent,
    AboutComponent,
    PortfolioComponent,
    PricesComponent,
    BookingComponent,
    ContactsComponent
  ],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {
    const title = 'Фотограф в Томске — фотосессии и фото | Валерия Федина';
    const description = 'Фотограф в Томске Валерия Федина. Портретные, семейные и свадебные фотосессии, фото для личных историй и бизнеса. Запишитесь на фотосессию в Томске.';

    this.titleService.setTitle(title);
    this.metaService.updateTag({
      name: 'description',
      content: description
    });
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:url', content: 'https://tomskphoto.ru/' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://tomskphoto.ru/assets/images/about/fedina.jpg' });
    this.metaService.updateTag({ property: 'og:image:alt', content: 'Валерия Федина — фотограф в Томске' });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
    this.metaService.updateTag({ name: 'twitter:image', content: 'https://tomskphoto.ru/assets/images/about/fedina.jpg' });
    this.setCanonical('https://tomskphoto.ru/');
  }

  private setCanonical(url: string): void {
    let canonical = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }

    canonical.setAttribute('href', url);
  }
}
