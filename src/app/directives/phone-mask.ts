import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPhoneMask]',
  standalone: true
})

export class PhoneMaskDirective {
  // Позиции разделителей относительно ЧИСТЫХ ЦИФР (после какой цифры ставить символ)
  private readonly maskStructure = [
    { index: 0, char: '(' },   // После 1-й цифры кода
    { index: 3, char: ') ' },  // После 4-й цифры (закрывает код)
    { index: 6, char: '-' },   // После 7-й цифры
    { index: 8, char: '-' }    // После 9-й цифры
  ];

  // Максимальная длина чистой части номера (без знака + и кода страны)
  private readonly maxDigits = 10;

  constructor(private el: ElementRef<HTMLInputElement>, private control: NgControl) {
  }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.value.startsWith('+7 ') && /^\+7[\s(]*\d/.test(input.value)) {
      // Если текущее значение уже выглядит как маска, не даем нижестоящим обработчикам его сбросить
      return;
    }

    // Сохраняем позицию курсора ДО изменений
    const cursorPosition = input.selectionStart!;
    const isCursorAtEnd = cursorPosition === input.value.length;
    const hasSelection = input.selectionStart !== input.selectionEnd;

    // Получаем только цифры из текущего значения
    let digits = input.value.replace(/\D/g, '');

    // Ограничиваем длину ввода строго 10 цифрами
    if (digits.length > this.maxDigits) {
      digits = digits.substring(0, this.maxDigits);
    }

    // Собираем новую форматированную строку
    let formatted = '';
    for (let i = 0; i < digits.length; i++) {
      // Добавляем саму цифру
      formatted += digits[i];

      // Проверяем, нужно ли добавить разделитель ПОСЛЕ текущей цифры
      const separator = this.maskStructure.find(s => s.index === i)?.char;
      if (separator) {
        formatted += separator;
      }
    }

    // Фиксируем российский префикс (можно заменить на переменную, если нужна поддержка других стран)
    const finalValue = '+' + '7 ' + formatted;

    // Обновляем DOM
    input.value = finalValue;

    // Восстанавливаем позицию курсора, чтобы Backspace работал корректно
    // Учитываем разницу в длине старой и новой строкой в районе курсора
    let newPos = cursorPosition;
    if (!hasSelection) {
      // Если удаляли символы перед курсором, позиция могла сдвинуться назад
      const oldSlice = input.value.substring(0, cursorPosition);
      const newSlice = finalValue.substring(0, cursorPosition);

      // Считаем количество удаленных не-цифр (скобок, дефисов, пробелов)
      const diff = oldSlice.replace(/\D/g, '').length - newSlice.replace(/\D/g, '').length;
      newPos -= diff;

      // Корректируем положение, если курсор оказался сразу после введенной цифры,
      // где автоматически добавился разделитель (нужно перепрыгнуть через него)
      if (
        newPos > 0 &&
        !/\d/.test(finalValue[newPos - 1]) &&
        /\d/.test(finalValue[newPos])
      ) {
        newPos++;
      }
    } else {
      // Если было выделение — ставим курсор в конец
      newPos = finalValue.length;
    }

    // Принудительно выставляем границы, чтобы не выйти за пределы строки
    newPos = Math.min(Math.max(newPos, 1), finalValue.length);

    // Задержка обязательна, иначе браузер сбросит фокус или проигнорирует setSelectionRange
    setTimeout(() => {
      input.setSelectionRange(newPos, newPos);
    }, 0);

    // Синхронизируем FormControl. Передаем чистые 10 цифр.
    // Если используете валидатор MinLength(11), добавьте '+7' программно в компоненте при сабмите.
    this.control?.control?.setValue(digits || null);
  }

  @HostListener('focus', ['$event'])
  onFocus(event: FocusEvent): void {
    const input = event.target as HTMLInputElement;
    // Проверяем именно длину чистых цифр, игнорируя любые скрытые символы
    if (input.value.replace(/\D/g, '').length === 0) {
      input.value = '+7 ';
      setTimeout(() => input.setSelectionRange(3, 3), 0);
    }
  }

  @HostListener('blur', ['$event'])
  onBlur(event: FocusEvent): void {
    const input = event.target as HTMLInputElement;
    // Если остались только префиксы — полностью очищаем поле
    const clean = input.value.replace(/\D/g, '');
    if (clean.length === 0) {
      input.value = '';
      this.control?.control?.setValue(null);
    }
  }

}
