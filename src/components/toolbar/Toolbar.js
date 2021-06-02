import { ExelComponent } from '@core/ExelComponent';

export class Toolbar extends ExelComponent {
  static className = 'exel__toolbar'

  //создаем наследование от родителя ExelComponent и передаем в него элемент и набор параметров
  constructor($root) {
    super($root, {
      name: 'Toolbar',
      //определяем, какие слушатели мы будем навешивать на данный элемент
      listeners: ['click'],
    })
  }

  onClick(event) {
    console.log('click toolbar, e.target =', event.target);
  }

  toHtml() {
    return `
      <div class="button">
        <i class="material-icons">format_align_left</i>
      </div>

      <div class="button">
        <i class="material-icons">format_align_center</i>
      </div>

      <div class="button">
        <i class="material-icons">format_align_right</i>
      </div>

      <div class="button">
        <i class="material-icons">format_bold</i>
      </div>

      <div class="button">
        <i class="material-icons">format_italic</i>
      </div>

      <div class="button">
        <i class="material-icons">format_underlined</i>
      </div>
    `
  }
}
