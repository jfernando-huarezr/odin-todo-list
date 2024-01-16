import domManipulation from "./domManipulation";

const row = {
  tag: 'div',
  attributes: {
    class: 'row'
  }
}

const col = {
  tag: 'div',
  attributes: {
    class: 'col'
  }
}
const element = {
  tag: 'button', // tag name
  text: 'Hello', // text
  attributes: { class: 'btn btn-primary', style: 'background: #F00' }, // attributes
  events: { click: (e) => alert('YO') }, // events
}

// const body = domManipulation.select('body')
// const main = domManipulation.createElement(element)
// const rowContainer = domManipulation.createElement(row)
// const colContainer = domManipulation.createElement(col)

// domManipulation.append(colContainer, main)
// domManipulation.append(rowContainer, colContainer)
// domManipulation.append(body, rowContainer)

const headerHeight = document.querySelector('header').offsetHeight
const main = document.querySelector('main')
const mainRow = document.querySelector('main .container .row')

main.style.minHeight = `calc(100vh - ${headerHeight}px)`
mainRow.style.minHeight = `calc(100vh - ${headerHeight}px - 200px)`
main.classList.add('d-flex', 'align-items-center')


