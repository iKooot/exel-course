import { Exel } from '@/components/exel/Exel'
import { Header } from '@/components/header/Header'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'
import './module'
import './scss/index.scss'

//в новом подклассе глобального класса Эксель мы создаем компоненты, которые будем отрисовывать
const exel = new Exel('#app', {
  components: [Header, Toolbar, Formula, Table],
})

exel.render()
