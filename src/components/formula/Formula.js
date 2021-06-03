import { ExelComponent } from '@core/ExelComponent'
import { $ } from '@core/dom'

export class Formula extends ExelComponent {
  static className = 'exel__formula'
  //создаем наследование от родителя ExelComponent и передаем в него элемент и набор параметров
  constructor($root, option) {
    super($root, {
      name: 'Formula',
      //определяем, какие слушатели мы будем навешивать на данный элемент
      listeners: ['input', 'keydown'],
      //набор опций, которые мы принимаем вторым параметром и раскрываем их для род. элемента
      ...option,
    })
  }

  toHtml() {
    return `
      <div class="info">fx</div>
      <div class="input" id="formula" contenteditable spellcheck="false"></div>
    `
  }

  init() {
    super.init()

    this.$formula = this.$root.find('#formula')

    this.$on('table:select', $cell => {
      this.$formula.text($cell.text())
    })

    this.$on('table:input', $cell => {
      this.$formula.text($cell.text())
    })
  }

  onInput(event) {
    //эта функция прописана в нашем фреймворке Эксель компонент
    //она вешает прослушку события вода текста в инпут текста
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const keys =[
      'Enter',
      'Tab,',
    ]
    if (keys.includes(event.key)) {
      event.preventDefault()

      this.$emit('formula:done')
    }
  }
}
