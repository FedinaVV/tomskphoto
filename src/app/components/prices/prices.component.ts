import { Component } from '@angular/core';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.scss'
})
export class PricesComponent {
  plans = [
    {
      img: 'assets/images/prices/wed.jpg',
      title: 'Свадьба',
      features: ['Полный день съёмки', 'Репортаж + постановочные кадры', 'Онлайн-галерея 300+ фото', 'Ретушь всех фотографий'],
      price: 'от 30 000 ₽'
    },
    {
      img: 'assets/images/prices/fam.jpg',
      title: 'Семья',
      features: ['Съёмка 1–2 часа', 'Любая локация', 'Галерея 80+ фото', 'Ретушь и цветокоррекция'],
      price: 'от 3 000 ₽'
    },
    {
      img: 'assets/images/prices/port.jpg',
      title: 'Портрет',
      features: ['Съёмка 1 час', 'Студия или улица', 'Галерея 40+ фото', 'Ретушь 10 фото на выбор'],
      price: 'от 2 000 ₽'
    }
  ];
}
