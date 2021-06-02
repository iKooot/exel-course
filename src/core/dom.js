//утилита для взаимодействия с домом

class Dom {
  constructor(selector) {
    //selector string
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }
  //создаем свой метод html
  html(html) {
    //если мы в него передали строку то это сеттер(мы задаем обьекту значение)
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      //возвращаем сам инстанс, это обязательно что бы работала связка методов Chein
      return this
    }
    //если мы не передали в него строку это сеттер, он вернет то что находится в html сущности
    return this.$el.outerHTML.trim()
  }
  //создаем метод очистки содержимого хтмл
  clear() {
    this.html('')
    return this
  }
  //создаем свой метод addEventlistener on click для наших инстансов Dom
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }
  //сщздаем свой метод удаление слушателей
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }
  //создаем полифил с собственным методом append
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this
  }
  // пишем вой квери селектор олл
  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  // ищем ближайшего родителя
  closest(selector) {
    //метод клосест вернет нативный элемент а мы хотим работать в обертке нашего ДОМА поэтому this  мы оборачиваем в конструктор $()
    return $(this.$el.closest(selector))
  }
  //создаем у нашего ДОМА функцию поиска координат
  getCoords() {
    return this.$el.getBoundingClientRect()
  }
  //создаем метод для получения дата атрибутов. Создаем геттер
  get data() {
    return this.$el.dataset
  }
  //создаем свой стайл
  css(styles = {}) {
    //получаем ключи обьекта и назначаем новые инлайновые стили через фор ич. Так как свойств может быть много
    Object.keys(styles).forEach(key => {
      return this.$el.style[key] = styles[key]
    })
  }
}

export function $(selector) {
  return new Dom(selector)
}

//создаем функцию, которая будет возвращать дом элементы
$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)

  if (classes) {
    el.classList.add(classes)
  }

  return $(el)
}
