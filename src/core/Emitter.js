//это слой новой абстракции, который нуден для того чтобы связать разные компоненты нашего приложения. При изменении одного непосредственно через эмитер изменяется и другой
export class Emiter {
  constructor() {
    this.listeners = {}
  }
  //создаем некое ведомление  слушателей, если она есть
  //formula.emit('select', {a:1})
  emit(eventName, ...args) {
    //проверяем наш аргумент вообще массив или нет
    if (!Array.isArray(this.listeners[eventName])) {
      //если нет выходим из функции
      return false
    }
    //если да, то пробегаемся по массиву и вызываем функцию
    this.listeners[eventName].forEach( listener => {
      listener(...args)
    });
    return true
  }
  //подписка на события и уведомления или добавляем нового слушателя
  //formula.subscribe('select', () => {})
  subscribe(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || []
    this.listeners[eventName].push(fn)
    //отписываемся от событий
    return () => {
      this.listeners[eventName] = this.listeners[eventName]
          //фильтруем массив и если элемент не функция то мы ее удаляем
          .filter( listener => listener !== fn)
    }
  }
}
