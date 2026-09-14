import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ServicePageData } from './service-page.data';

@Component({
  selector: 'app-service-page',
  imports: [RouterLink],
  templateUrl: './service-page.component.html',
  styleUrl: './service-page.component.scss'
})
export class ServicePageComponent {
  readonly service: ServicePageData;
  readonly canonicalUrl: string;
  readonly structuredData: string;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.service = this.route.snapshot.data['service'] as ServicePageData;
    this.canonicalUrl = `https://tomskphoto.ru/${this.service.path}/`;
    this.structuredData = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          '@id': `${this.canonicalUrl}#service`,
          'name': this.service.title,
          'url': this.canonicalUrl,
          'description': this.service.metaDescription,
          'image': `https://tomskphoto.ru/${this.service.image}`,
          'serviceType': this.service.title,
          'areaServed': {
            '@type': 'City',
            'name': 'Томск'
          },
          'provider': {
            '@id': 'https://tomskphoto.ru/#business'
          }
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Главная',
              'item': 'https://tomskphoto.ru/'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': this.service.title,
              'item': this.canonicalUrl
            }
          ]
        }
      ]
    });

    this.titleService.setTitle(this.service.metaTitle);
    this.metaService.updateTag({ name: 'description', content: this.service.metaDescription });
    this.metaService.updateTag({ property: 'og:title', content: this.service.metaTitle });
    this.metaService.updateTag({ property: 'og:description', content: this.service.metaDescription });
    this.metaService.updateTag({ property: 'og:url', content: this.canonicalUrl });
    this.metaService.updateTag({ property: 'og:image', content: `https://tomskphoto.ru/${this.service.image}` });
    this.metaService.updateTag({ property: 'og:image:alt', content: this.service.imageAlt });
    this.metaService.updateTag({ name: 'twitter:title', content: this.service.metaTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: this.service.metaDescription });
    this.metaService.updateTag({ name: 'twitter:image', content: `https://tomskphoto.ru/${this.service.image}` });
    this.setCanonical(this.canonicalUrl);
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
