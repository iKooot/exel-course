import { DOMListener } from '@core/DOMListener';

export class ExelComponent extends DOMListener {
  //принимаем в себя набор элементов и опций от детей например formula
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    //создаем инстанс эмитера
    this.emitter = options.emitter
    //создаем хранилище подписок на эмитер
    this.unsubscribers =[]
    //это хук который будет вызыватся до метода инит. Для того чтобы реализовать доп. функционал
    this.prepare()
  }
  //настраиваем наш компонент до init
  prepare() {}
  //возвращает шаблон компонента
  toHtml() {
    return ''
  }
  //метод из нашего фреймворка. Уведомляем слушателей про событие евент
  $emit(eventName, ...args) {
    this.emitter.emit(eventName, ...args)
  }
  //подписка
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    //pfyjcbv d vfccbd lkz jngbcjr
    this.unsubscribers.push(unsub)
  }
  //инициализируем компонент. Добавляем прослушку
  init() {
    this.initDOMListeners()
  }
  //метод для удаление прослушек и компонента
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach( unsub => {
      unsub()
    });
  }
}
