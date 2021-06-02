import { ExelComponent } from '@core/ExelComponent'
import { createTable } from '@/components/table/table.template'
import { tableResizeHandler } from '@/components/table/table.resize'
import { shouldResize } from '@/components/table/table.function'

export class Table extends ExelComponent {
  static className = 'exel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    })
  }

  toHtml() {
    return createTable()
  }

  onClick() {
    console.log('click');
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResizeHandler(this.$root, event)
    }
  }
}
