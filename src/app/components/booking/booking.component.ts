import { Component } from '@angular/core';
import { FormGroup, FormsModule, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PhoneMaskDirective } from '../../directives/phone-mask';

@Component({
  selector: 'app-booking',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  form = new FormGroup({
    type: new FormControl('', Validators.required),
    address: new FormControl(''),
    date: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    phone: new FormControl('+7', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    contact: new FormControl('', Validators.required),
    agree: new FormControl(false, Validators.required),
  });

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

    if (!this.form.invalid) {
      alert('Ваша заявка отправлена! Валерия свяжется с вами в ближайшее время.');
    } else {
      alert('Заполните все обязательные поля!');
    }

  }
}
