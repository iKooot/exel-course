import { ExelComponent } from '@core/ExelComponent';

export class Header extends ExelComponent {
  static className = 'exel__header'

  constructor($root, option) {
    super($root, {
      name: 'Header',
      //набор опций, которые мы принимаем вторым параметром и раскрываем их для род. элемента
      ...option,
    })
  }

  toHtml() {
    return `
    <input type="text" class="input" value="Новая таблица" />
        <div>

          <div class="button">
            <i class="material-icons">delete</i>
          </div>

          <div class="button">
            <i class="material-icons">exit_to_app</i>
          </div>
    `
  }
}
