//функции хелперы для таблици
import { CODES_ROW_COL } from '@/components/table/table.template'

export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}
//получаем массив рядов
export function getRowsRange(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }
  return new Array((end - start) + 1).fill('').map( (el, index) => {
    const newEl = start + index
    return newEl
  })
}
//получаем массив ячеек
export function getColsRange(start, end) {
  const startCol = start.charCodeAt()
  const endCol = end.charCodeAt()
  const charArr = [startCol, endCol]
  const newArrChars =[]

  if (startCol > endCol) {
    charArr.reverse()
  }

  for (let i = charArr[0]; i <= charArr[1]; i++) {
    const char = String.fromCharCode(i)
    newArrChars.push(char)
  }

  return newArrChars
}

export function matrix(target, current) {
  const rows = getRowsRange(current.row, target.row)
  const cols = getColsRange(current.col, target.col)
  //формируем массив всех значений айдишников в диапозоне
  const ids = cols.reduce( (acc, col) => {
    rows.forEach( row => {
      acc.push(`${col}:${row}`)
    })
    return acc
  }, [])
  //обращаемся к дому и находим ячейки по айдишнику
  return ids
}

//функция определяющая движение выделенной ячейки. Она принимает в себя обьект с айдишниками из this.selection.current.id(true) и ключи нажатия кнопок из Массива и возвращает дата атрибут
export function nextSelector(key, {col, row}) {
  //получаем значение из родительского элемента в тэйбл темплэйт
  // обрабатываем возможные нажатые кнопки
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row = row + 1 > CODES_ROW_COL.maxRow ? CODES_ROW_COL.maxRow : row + 1
      break
    case 'Tab':
    case 'ArrowRight':
      col = nextCol(col, CODES_ROW_COL.maxCol)
      break
    case 'ArrowLeft':
      col = previousCol(col, CODES_ROW_COL.minCol)
      break
    case 'ArrowUp':
      //проверка нужна что бы мы не поднялись выше минимального ряда
      row = row - 1 < CODES_ROW_COL.minRow ? CODES_ROW_COL.minRow : row - 1
      break
  }

  return `[data-id="${col}:${row}"]`
}
// помошники парсеры, для того чтобы работать с колонками
function nextCol(columnId, maxValue) {
  let charNumber = columnId.charCodeAt()
  //проверка нужна что бы мы не сместились больше максимасльной колонки
  charNumber = charNumber + 1 > maxValue ? maxValue : charNumber + 1
  return String.fromCharCode(charNumber)
}

function previousCol(columnId, minValue) {
  let charNumber = columnId.charCodeAt()
  //проверка нужна что бы мы не сместились меньше минимальной колонки
  charNumber = charNumber - 1 < minValue ? minValue : charNumber - 1
  return String.fromCharCode(charNumber)
}
