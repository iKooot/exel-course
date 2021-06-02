import { capitalize } from '@core/utils'

export class DOMListener {
  //принимаем в себя элемент от потомка ExelComponent, а так же массив с названиями прослушек
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener`)
    }

    this.$root = $root
    this.listeners = listeners
  }
  //создаем свои классы прослушек
  initDOMListeners() {
    //тут мы пробегаемся по массиву с прослушками каждого элемента
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(`Method ${method} is not implemented in ${name} Component`)
      }
      //при создании функции лисенера через байн мы создаем всегда НОВУЮ функцию поэтому ремув не работает так как в новой функции новый контекст и removeListener не работает! Для этого мы переопределяем контекст для каждого метода
      this[method] = this[method].bind(this)
      //тоже самое что и addEventListener. Через this[method] мы обращаемся к инстансу
      this.$root.on(listener, this[method])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      //тоже самое что и removeEventListener. Через this[method] мы обращаемся к инстансу и удаляем прослушку. Конткст функции мы определеили ущу при создании
      this.$root.off(listener, this[method])
    })
  }
}

//создаем приватную функцию, которая будет сущ только тут input => onInput чреез утилитку
function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
