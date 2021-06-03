export class TableSelection {
  //определяем константу через статическое поле
  static className = 'selected'

  constructor() {
    //это обьект в котором бум хранить выделеные ячейки
    this.group = []
    //это переменная для выбора одной ячейки
    this.current = null
  }
  //$el instanceof Dom === true
  //метод выделяющий одну ячейку
  select($el) {
    //пушим в мессив выделеную ячейку
    this.clear()
    this.group.push($el)
    $el.focus().addClass(TableSelection.className)
    this.current = $el
  }
  //очищаем массив
  clear() {
    this.group.forEach( $el => $el.removeClass(TableSelection.className))
    this.group = []
  }
  //метод выделяющий много ячеек
  selectGroup($group = []) {
    this.clear()

    this.group = $group
    this.group.forEach( $el => $el.addClass(TableSelection.className))
  }
}


