export default class domManipulation {

  static createElement(objectDom) {
    if (Array.isArray(objectDom)) {
      return objectDom.map((object) => createElement(object));
    }

    const element = document.createElement(objectDom.tag)

    if (objectDom.text) {
      element.textContent = objectDom.text
    }
    if (objectDom.attributes) {
      Object.entries(objectDom.attributes).forEach(([attribute, attributeContent]) => element.setAttribute(attribute, attributeContent))
    }
    if (objectDom.events) {
      Object.entries(objectDom.events).forEach(([event, eventFunction]) => element.addEventListener(event, eventFunction))
    }

    return element
  }

  static select(selector) {
    const selectedElements = document.querySelectorAll(selector)
    if (selectedElements.length) {
      return (selectedElements.length === 1) ? selectedElements[0] : selectedElements
    }

    else {
      console.log('Element inexistent')
    }
  }

  static append(parent, child) {
    parent.appendChild(child)
  }

  static innerHTML(element, html) {
    element.innerHTML = html
  }
}