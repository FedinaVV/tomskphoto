import { Component, computed, signal } from '@angular/core';
import { Slide } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
  imports: [
    CommonModule
  ]
})
export class ReviewsComponent {
  //public isMobile = signal(false);

  items = signal<Slide[]>([
    { id: 1, name: 'Анна К.', text: 'Валерия — настоящий профессионал. Я очень волновалась перед съёмкой, но она сразу создала такую атмосферу, что я расслабилась и получила удовольствие. Фотографии — просто невероятные, не могу выбрать любимую!' },
    { id: 2, name: 'Михаил и Дарья', text: 'Свадебная фотосессия с Валерией — это было что-то особенное. Она незаметно присутствовала рядом, ловила каждый момент. Когда мы получили фотографии, плакали от счастья.' },
    { id: 3, name: 'Семья Петровых', text: 'Снимали семейную фотосессию с тремя детьми — казалось, это невозможно. Но Валерия справилась на ура! Дети смеялись, играли, а она поймала все самые тёплые моменты.' },
    { id: 4, name: 'Женя Д.', text: 'Это терапия — смотреть на свои фотографии и не узнавать себя в хорошем смысле. Я всегда была недовольна своими фото, а здесь каждый кадр — шедевр. Спасибо огромное!' },
    { id: 5, name: 'Катерина С.', text: 'Валерия очень внимательна к деталям. Она заранее уточнила наши пожелания, предложила несколько локаций. Результат превзошёл все ожидания. Ни одного кадра, который бы разочаровал.' },
    { id: 6, name: 'Олег и Марина', text: 'Лав стори получилась живой и настоящей. Валерия умеет создавать нужное настроение — мы почти забыли, что нас снимают. На фото видна наша настоящая любовь.' },
    { id: 7, name: 'Ирина Л.', text: 'Профессионализм, теплота и безграничный талант. Фотосессия прошла легко и комфортно. Рекомендую всем, кто хочет получить по-настоящему красивые и живые фотографии.' },
    { id: 8, name: 'Максим Т.', text: 'Делали портретную съёмку для деловых целей. Результат — строго, красиво, стильно. Коллеги удивились, насколько хорошо получилось. Однозначно буду обращаться снова.' },
    { id: 9, name: 'Наталья В.', text: 'Спасибо Валерии за невероятную работу! Детский и семейный портрет — это всегда непредсказуемо, но она нашла подход к каждому. Фото стоят на стене и радуют каждый день.' },
  ]);

  /*@HostListener('window:resize', ['$event'])
  onResize(event?: Event): void {
    const width = event ? (event.target as Window).innerWidth : window.innerWidth;
    this.isMobile.set(width < 768);
  }*/

  constructor() {
    //this.isMobile.set(window.innerWidth < 768);
  }

  readonly step = 3;

  currentOffset = signal(0);

  totalItems = computed(() => this.items().length);

  maxOffset = computed(() => Math.max(0, this.totalItems() - this.step));

  next(): void {
    this.currentOffset.update(offset => Math.min(offset + this.step, this.maxOffset()));
  }

  prev(): void {
    this.currentOffset.update(offset => Math.max(offset - this.step, 0));
  }

  trackById(index: number, item: Slide): number {
    return item.id;
  }

}


