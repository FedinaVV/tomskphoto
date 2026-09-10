import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

function russianPhoneValidator(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value ?? '').replace(/[\s()-]/g, '');

  if (!value || /^\+7\d{10}$/.test(value)) {
    return null;
  }

  return { phoneFormat: true };
}

@Component({
  selector: 'app-booking',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  private readonly shootTypeLabels: Record<string, string> = {
    wedding: 'Свадьба',
    family: 'Семейная съёмка',
    portrait: 'Портретная съёмка',
    other: 'Другое',
  };

  private readonly contactLabels: Record<string, string> = {
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    call: 'звонок',
  };

  submitError = '';
  submitMessage = '';

  form = new FormGroup({
    type: new FormControl('', Validators.required),
    address: new FormControl(''),
    date: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    phone: new FormControl('+7', [Validators.required, russianPhoneValidator]),
    contact: new FormControl('', Validators.required),
    agree: new FormControl(false, Validators.requiredTrue),
  });

  get submitButtonLabel(): string {
    const contact = this.form.controls.contact.value;

    if (contact === 'whatsapp') {
      return 'Открыть WhatsApp';
    }

    if (contact === 'telegram') {
      return 'Открыть Telegram';
    }

    if (contact === 'call') {
      return 'Позвонить';
    }

    return 'Забронировать дату';
  }

  ngOnInit() {
    this.subscribeToFields();
  }

  subscribeToFields() {
    this.form.controls.type.valueChanges.subscribe((type) => {
      if (type == 'family' || type == 'portrait') {
        this.form.controls.address.setValidators([Validators.required]);
      } else {
        this.form.controls.address.clearValidators();
      }
      this.form.controls.address.updateValueAndValidity()
    })


  }

  submit() {
    this.form.markAllAsTouched();
    this.submitError = '';
    this.submitMessage = '';

    if (this.form.invalid) {
      const invalidFields: string[] = [];

      if (this.form.controls.type.invalid) invalidFields.push('тип съёмки');
      if (this.form.controls.address.invalid) invalidFields.push('место проведения');
      if (this.form.controls.date.invalid) invalidFields.push('желаемая дата');
      if (this.form.controls.city.invalid) invalidFields.push('город');
      if (this.form.controls.name.invalid) invalidFields.push('имя');
      if (this.form.controls.phone.invalid) invalidFields.push('телефон в формате +7 и 10 цифр');
      if (this.form.controls.contact.invalid) invalidFields.push('способ связи');
      if (this.form.controls.agree.invalid) invalidFields.push('согласие на обработку данных');

      this.submitError = `Проверьте поля: ${invalidFields.join(', ')}.`;
      return;
    }

    const value = this.form.getRawValue();
    const message = this.createMessage(value);

    if (value.contact === 'call') {
      this.submitMessage = 'Открываем приложение для звонка на номер +7 923 427-42-08.';
      window.location.href = 'tel:+79234274208';
      return;
    }

    const contactUrl = this.createContactUrl(value.contact, message);

    if (!contactUrl) {
      this.submitError = 'Выберите WhatsApp или Telegram.';
      return;
    }

    window.open(contactUrl, '_blank', 'noopener,noreferrer');
    this.submitMessage = `Открылся ${this.contactLabels[value.contact ?? '']}. Проверьте сообщение и нажмите «Отправить».`;
  }

  private createMessage(value: ReturnType<typeof this.form.getRawValue>): string {
    const shootType = this.shootTypeLabels[value.type ?? ''] ?? value.type ?? 'Не указан';
    const lines = [
      'Здравствуйте! Хочу забронировать дату для фотосессии.',
      `Тип съёмки: ${shootType}`,
      `Желаемая дата: ${this.formatDate(value.date)}`,
      `Город: ${value.city ?? 'Не указан'}`,
      `Имя: ${value.name ?? 'Не указано'}`,
      `Телефон: ${value.phone ?? 'Не указан'}`,
    ];

    if (value.address?.trim()) {
      lines.push(`Место проведения: ${value.address.trim()}`);
    }

    return lines.join('\n');
  }

  private createContactUrl(contact: string | null, message: string): string | null {
    const encodedMessage = encodeURIComponent(message);

    if (contact === 'whatsapp') {
      return `https://wa.me/79234274208?text=${encodedMessage}`;
    }

    if (contact === 'telegram') {
      return `https://t.me/ValeriaVF7?text=${encodedMessage}`;
    }

    return null;
  }

  private formatDate(date: string | null): string {
    if (!date) {
      return 'Не указана';
    }

    const [year, month, day] = date.split('-');
    return year && month && day ? `${day}.${month}.${year}` : date;
  }
}
