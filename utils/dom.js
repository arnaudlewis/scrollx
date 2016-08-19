export const DOM = {
  querySelector(selector, parentNode) {
    const parent = parentNode || document
    if(selector) {
      const node = parent.querySelector(selector)
      if(!node) console.error(`Unable to find node with selector --> ${selector} <-- for the given parent node`)
      return node
    } else {
      console.error(`Invalid selector --> ${selector}`)
    }
    return selector ? parent.querySelector(selector) : null
  }
}
