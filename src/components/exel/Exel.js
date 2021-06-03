import { $ } from '@core/dom'
import { Emiter } from '@core/Emitter'

export class Exel {
  //принимаем в класс 2 параметра селектор дом элемента и опции
  constructor(selector, option) {
    //находим элемент дома
    this.$el = $(selector)
    //определяем компоненты и опции(по дефолту это пустой массив)
    this.components = option.components || []
    //создаем обзервер
    this.emitter = new Emiter()
  }
  //создаем метод который будет создавать элементы
  getRoot() {
    //создаем див и даем ему класс. Функции находятся в core dom.js
    const $root = $.create('div', 'excel')
    //создаем компонент эмитера
    const componentOptions = {
      emitter: this.emitter,
    }
    //бежим по всем элементам конструктора Components взятые из ExelComponents.
    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions)

      $el.html(component.toHtml())
      $root.append($el)

      return component
    });
    return $root
  }

  // создаем метод который будет отрисовывать элементы
  render() {
    this.$el.append(this.getRoot())
    //инициализируем прослушку для каждого отдельного компонента после его отрисовки. Init мы берем у родителя
    this.components.forEach(component => {
      component.init()
    })
  }
  //уничтожение таблицы при отрисовке новой
  destroy() {
    this.components.forEach( component => component.destroy())
  }
}


