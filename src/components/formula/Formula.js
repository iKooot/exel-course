import { ExelComponent } from '@core/ExelComponent';

export class Formula extends ExelComponent {
  static className = 'exel__formula'
  //создаем наследование от родителя ExelComponent и передаем в него элемент и набор параметров
  constructor($root) {
    super($root, {
      name: 'Formula',
      //определяем, какие слушатели мы будем навешивать на данный элемент
      listeners: ['input', 'click'],
    })
  }

  toHtml() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable="true" spellcheck="false"></div>
    `
  }

  onInput(event) {
    console.log('Formula: onInput', event.target.textContent.trim())
    console.log('this root', this.$root)
  }

  onClick(event) {
    console.log('click');
  }
}
