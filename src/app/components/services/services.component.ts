import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  services = [
    {
      img: 'assets/images/services/wed.jpg',
      title: 'Свадьба',
      desc: 'Чувственные свадебные фотосессии'
    },
    {
      img: 'assets/images/services/port.jpg',
      title: 'Портрет',
      desc: 'Простота и элегантность восхищают'
    },
    {
      img: 'assets/images/services/event.jpg',
      title: 'Репортаж',
      desc: 'Запечатлим любые события'
    },
    {
      img: 'assets/images/services/lookbook.jpg',
      title: 'Лукбук',
      desc: 'Подготовим любой образ'
    }
  ];
}
