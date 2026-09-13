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
      title: 'Свадебная фотосессия',
      desc: 'Чувственная съёмка вашей истории'
    },
    {
      img: 'assets/images/services/port.jpg',
      title: 'Портретная фотосессия',
      desc: 'Простота и элегантность в каждом кадре'
    },
    {
      img: 'assets/images/services/event.jpg',
      title: 'Репортажная съёмка',
      desc: 'Запечатлим любые события'
    },
    {
      img: 'assets/images/services/lookbook.jpg',
      title: 'Лукбук и контент',
      desc: 'Подготовим любой образ'
    }
  ];
}
