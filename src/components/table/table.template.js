const CODES = {
  A: 65,
  Z: 90,
}

function toCell(content = '') {
  return `
    <div class="cell" contenteditable="true">
      ${content}
    </div>`
}

function toColumn(col) {
  return `<div class="column">${col}</div>`
}

function createRow(content, index) {
  return `
    <div class="row">
      <div class="row-info">${index ? index : ''}</div>
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

  const cols = new Array(colsCount).fill('').map(toChar).map(element => {
    //снова разбираем на массив и с помощью функции криейт солс формируем html колонки
    return toColumn(element)
  }).join('')

  //создаем контент строк
  rows.push(createRow(cols))
  //отрисовываем базовое коллисечтво строк
  for (let i = 0; i < rowsCount; i++) {
    //создаем ячейки
    const cells = new Array(colsCount).fill('').map(element => toCell()).join('')
    //пушим в массив строк
    rows.push(createRow(cells, i + 1))
  }
  //возвращаем html строку
  return rows.join('')
}
