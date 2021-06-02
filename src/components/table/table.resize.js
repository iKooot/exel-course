import { $ } from '@core/dom'

export function tableResizeHandler($root, event) {
  const $resizer = $(event.target)
  // у инстанса класса ДОМ нету никого парента, но мы перезаписали метод клозест и теперь он есть у нашего инстанса ищи клосест в ДОМЕ
  const $parent = $resizer.closest('[data-type="resizeble"]')
  const coords = $parent.getCoords()
  const resizeType = event.target.dataset.resize
  //ищем не от документа а от родительского элемента нашего Фреймворкаю Конечноже нашим самописным методом для элементов ДОМА

  //проверяем ресайзер, на колонку или строку
  const sideProp = resizeType === 'col' ? 'bottom' : 'right'
  const valueProp = resizeType === 'col' ? 'vh' : 'vw'

  $resizer.css({
    [sideProp]: -100 + valueProp,
    opacity: 1,
    userSelect: 'none',
  })

  let value;

  //вешаем событие моусе мов на документ
  document.onmousemove = e => {
    if (resizeType === 'col') {
      //из положения мыши мы отнимаем положение края обьекта и округляем. Тут реализован принцип замыкания где есть статическая фупеременная с координатой обьекта и динамическая с положением мыши
      const delta = Math.floor(e.pageX - coords.right)
      value = Math.floor(coords.width + delta)
      $resizer.css({
        right: -delta + 'px',
      })
    } else {
      const delta = Math.floor(e.pageY - coords.bottom)
      value = Math.floor(coords.height + delta)
      $resizer.css({
        bottom: -delta + 'px',
      })
    }

    //когда отпускаем мыш событие удаляется
    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null

      if (resizeType === 'col') {
        $parent.css({ width: value + 'px' })
        //получаем массив с одинаковыми датаатрибутами и изменяем его ширину
        $root.findAll(`[data-column="${$parent.data.column}"]`).forEach(element => element.style.width = value + 'px')
      } else {
        $parent.css({ height: value + 'px' })
      }

      $resizer.css({
        opacity: 0,
        userSelect: 'auto',
        bottom: 0,
        right: 0,
      })
    }
  }
}
