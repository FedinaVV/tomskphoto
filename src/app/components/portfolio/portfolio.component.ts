import { Component } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  items = [
    { url: 'assets/images/portfolio/1.jpg', wide: true, alt: 'Парная фотосессия — портфолио Валерии Фединой' },
    { url: 'assets/images/portfolio/2.jpg', wide: false, alt: 'Портретная фотосессия — портфолио Валерии Фединой' },
    { url: 'assets/images/portfolio/3.jpg', wide: false, alt: 'Творческий портрет — портфолио Валерии Фединой' },
    { url: 'assets/images/portfolio/4.jpg', wide: true, alt: 'Портретная съёмка — портфолио Валерии Фединой' },
    { url: 'assets/images/portfolio/5.jpg', wide: true, alt: 'Фотография из портфолио Валерии Фединой' },
    { url: 'assets/images/portfolio/6.jpg', wide: false, alt: 'Портрет из портфолио Валерии Фединой' },
  ];
}
