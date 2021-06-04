//создаем прослойку типа редакса, которая будет управлять состоянием приложения и запоминать состояние приложения
export function createStore(rootReduser, initialState = {}) {
  //стэйт - это состояние
  let state = rootReduser({...initialState}, {type: '__INIT__'})
  //это слушатели, которые будут фиксировать изменения
  let listeners =[]
  // возвращаем публичные функции
  return {
    //подписка
    subscribe(fn) {
      listeners.push(fn)
      //вариан отписки на функции
      // return () => {
      //   listeners = listeners.filter( listener => listener !== fn)
      // }
      //вариант отписки на обьекте(расширенный функционал)
      return {
        unsubscribe() {
          listeners = listeners.filter( listener => listener !== fn)
        },
      }
    },
    //сообщаем стору о изменении
    deispatch(action) {
      //переопределяем стэйт
      state = rootReduser(state, action)
      //пробегаемся по массиву подписчиков и вызваем их передавая новые данные
      listeners.forEach( listener => {
        listener(state)
      })
    },
    //получаем наш стэйт
    getState() {
      return state
    },
  }
}
