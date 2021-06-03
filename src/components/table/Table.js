import { ExelComponent } from '@core/ExelComponent'
import { $ } from '@core/dom'
import { createTable } from '@/components/table/table.template'
import { tableResizeHandler } from '@/components/table/table.resize'
import { shouldResize, isCell, matrix, nextSelector } from '@/components/table/table.function'
import { TableSelection } from '@/components/table/TableSelection'

export class Table extends ExelComponent {
  static className = 'exel__table'

  constructor($root, option) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      //набор опций, которые мы принимаем вторым параметром и раскрываем их для род. элемента
      ...option,
    })
  }
  toHtml() {
    return createTable()
  }
  //назначаем селекшон из таблСелекшон инстансом класса тейблСелекшон
  prepare() {
    //делаем это до инита, для декомпозиции
    this.selection = new TableSelection()
  }
  //создаем собственный метод инит, для того чтобы инициировать выделение ячеек. Метод инит вызывается в Exel на моменте рендеринга
  init() {
    //передаем в него родительский инит, что бы не потерять функционал
    super.init()
    //определеням переменную, которая будет новым инстансом класса Тэйбл селект
    const $cell = this.$root.find('[data-id="A:1"]')
    this.selectCell($cell)
    //соеденияем через эмитер ввод текста в ячейку и функцию. Функция он прописана в нашем фреймворке эксель компонент
    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })
    //переносим фокус на быьраную ячейку, когда нажимаем энтер в формуле
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    //при загрузке страницы учитываем дефолтное значение в ячейке
    this.$emit('table:select', $cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        //получаем выбраную ячейку через рукописный метод в ДОМе по клику
        const target = $target.id(true)
        //получаем выбранную ячйку
        const current = this.selection.current.id(true)
        //получаем массив с рядами от текущей до выбранной
        const $cells = matrix(target, current)
            .map( id => this.$root.find(`[data-id="${id}"]`))
        //подсвечиваем выбранные
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'Enter',
      'Tab',
    ]
    //данная запись тоже самое что и event.key
    const {key} = event
    if (keys.includes(key) && !event.shiftKey) {
      //обнуляем поведение кнопок
      event.preventDefault()
      //находим текущую выбранную ячейку
      const id = this.selection.current.id(true)
      //напускам функцию обработки нажатия кнопок
      const $next = this.$root.find(nextSelector(key, id))
      //навешиваем селект на следующую ячейку
      this.selectCell($next)
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}


