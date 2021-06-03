export const CODES_ROW_COL = {
  minCol: 65,
  maxCol: 90,
  minRow: 1,
  maxRow: 20,
}

// function toCell(row, column) {
//   return `
//     <div class="cell" data-column="${parseIndex(column)}" data-id="${toChar('', column)}:${parseIndex(row)}" contenteditable>
//     </div>`
// }
//пример с замыканием
function toCell(row) {
  return function(content = '', column) {
    return `
    <div
      class="cell"
      data-column="${toChar('', column)}"
      data-type="cell"
      data-id="${toChar('', column)}:${parseIndex(row)}"
      contenteditable></div>
    `
  }
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizeble" data-column="${toChar('', index)}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(content, index) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''

  return `
    <div class="row" data-type="resizeble">
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

//создаем функцию приведения массива к символам
function toChar(element, index) {
  //возвращаем строку и заполняем ее буквами
  return String.fromCharCode(CODES_ROW_COL.minCol + index)
}

//формируем таблицу
export function createTable(rowsCount = CODES_ROW_COL.maxRow) {
  //находим буквы по чаркоду
  const colsCount = CODES_ROW_COL.maxCol - CODES_ROW_COL.minCol + 1
  //создаем массив со строками
  const rows = []
  //формируем колонки первой строки и заполняем их буквами

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map((element, index) => {
        //снова разбираем на массив и с помощью функции криейт солс формируем html колонки
        return toColumn(element, index)
      })
      .join('')

  //создаем контент строк
  rows.push(createRow(cols, null))
  //отрисовываем базовое коллисечтво строк
  for (let row = 0; row < rowsCount; row++) {
    //создаем ячейки
    const cells = new Array(colsCount)
        .fill('')
        // .map((element, index) => toCell(row, index))
        //пример с замыканием
        .map(toCell(row))
        .join('')
    //пушим в массив строк
    rows.push(createRow(cells, parseIndex(row)))
  }
  //возвращаем html строку
  return rows.join('')
}

function parseIndex(number) {
  return number + 1
}
