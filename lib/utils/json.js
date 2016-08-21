export const Json = {

  /*
  * Merge a base object with all the key/values of another.
  */
  merge(obj, part) {
    let res = Object.assign({}, obj)
    Object.keys(part).forEach((key) => res[key] = part[key])
    return res
  },

  /*
  * Returns a new object with only the original object's keys that passed the predicate.
  */
  filter(predicate, obj) {
    return Object.keys(obj).reduce((acc, key) => {
      if(predicate(obj[key])) {
        let newElem = {}
        newElem[key] = obj[key]
        return this.merge(acc, newElem)
      } else {
        return acc
      }
    }, {})
  },

  /*
  * Returns a new object with all its key/values mapped.
  * A tuple (Array of size 2) must be returned from the map function.
  */
  map(obj, fn) {
    return Object.keys(obj).reduce((acc, key) => {
      let newElem = {}
      newElem[key] = fn(key, obj[key])
      return this.merge(acc, newElem)
    }, {})
  }
}
