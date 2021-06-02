import { DOMListener } from '@core/DOMListener';

export class ExelComponent extends DOMListener {
  //принимаем в себя набор элементов и опций от детей например formula
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
  }
  //возвращает шаблон компонента
  toHtml() {
    return ''
  }
  //прописываем метод init для вызова прослушки событий для каждого элемента документа
  init() {
    this.initDOMListeners()
  }
  //метод для удаление прослушек
  destroy() {
    this.removeDOMListeners()
  }
}
