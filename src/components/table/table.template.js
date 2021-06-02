const CODES = {
  A: 65,
  Z: 90,
}

function toCell(content = '', column) {
  return `
    <div class="cell" data-column="${column + 1}" contenteditable>
      ${content}
    </div>`
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizeble" data-column="${index + 1}">
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
  return String.fromCharCode(CODES.A + index)
}

//формируем таблицу
export function createTable(rowsCount = 33) {
  //находим буквы по чаркоду
  const colsCount = CODES.Z - CODES.A + 1
  //создаем массив со строками
  const rows = []
  //формируем колонки первой строки и заполняем их буквами

  const cols = new Array(colsCount).fill('').map(toChar).map((element, index) => {
    //снова разбираем на массив и с помощью функции криейт солс формируем html колонки
    return toColumn(element, index)
  }).join('')

  //создаем контент строк
  rows.push(createRow(cols, null))
  //отрисовываем базовое коллисечтво строк
  for (let i = 0; i < rowsCount; i++) {
    //создаем ячейки
    const cells = new Array(colsCount).fill('').map((element, index) => toCell('', index)).join('')
    //пушим в массив строк
    rows.push(createRow(cells, i + 1))
  }
  //возвращаем html строку
  return rows.join('')
}
