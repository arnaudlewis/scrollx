import { Json } from './utils/json'
import { DOM } from './utils/dom'
import { Frame } from './utils/frame'

/* Transition functions
-------------------------------------------------- */
//t : currentTime
//b: start value
//c: change in value
//d: duration

function easeInOutQuad (t, b, c, d) {
  t /= d/2
  if (t < 1) return c/2*t*t + b
  t--
  return -c/2 * (t*(t-2) - 1) + b
}

function linear (t, b, c, d) {
  return c*t/d + b
}

function easeInQuad (t, b, c, d) {
  t /= d
  return c*t*t + b
}

function easeOutQuad (t, b, c, d) {
  t /= d
  return -c * t*(t-2) + b
}

/*  Globals
-------------------------------------------------- */
const Axis = { Y: 'y', X: 'x'}
const Property = {
  TranslateY: 'translateY',
  TranslateX: 'translateX',
  Opacity: 'opacity',
  Scale: 'scale',
  Color: 'color',
  Fill: 'fill',
  Width: 'width',
  Top: 'top',
  Left: 'left',
  Bottom: 'bottom',
  Right: 'right'
}

const Timing = {
  EASE_IN_OUT: easeInOutQuad,
  EASE_IN: easeInQuad,
  EASE_OUT: easeOutQuad,
  LINEAR: linear
}
const defaultTransition = Timing.EASE_IN_OUT

let animOffset = 0
let animHeight = 0
const scrollTop = () => window.scrollY - animOffset

const Color = (red, green, blue, opacity = 1) => {
  return {r: parseInt(red), g: parseInt(green), b: parseInt(blue), a: opacity}
}

function filmDuration(convertedScenes, animationNode) { //in PX
  return convertedScenes.reduce((acc, scene) => {
    const sceneHeight = DOM.querySelector(scene.wrapper, animationNode).clientHeight
    return acc + scene.timeFactor * sceneHeight
  }, 0)
}

function getIndex(scenes, scene) {
  return scenes.indexOf(scene)
}

function sceneStart(scenes, scene) { //in PX
  const startIndex = getIndex(scenes, scene)
  const previousScenes = scenes.slice(0, startIndex)

  return previousScenes.reduce((acc, s) => {
    return acc + (s.timeFactor * window.innerHeight)
  }, 0)
}

function sceneDuration(scene) { //in PX
  return scene.timeFactor * window.innerHeight
}

function sceneEnd(scenes, scene) {
  return sceneStart(scenes, scene) + sceneDuration(scene)
}

function animationStepStart(scenes, scene, step, animTimeFactor) { // in px
  const start = sceneStart(scenes, scene)
  return start + pixelsOfScene(step.start, animTimeFactor, Axis.Y)
}

function animationStepDuration(scene, step, animTimeFactor) { // in px
  return pixelsOfScene(step.duration, animTimeFactor, Axis.Y)
}

function negativePercent(value) {
  return (/^-.+\%$/).test(value)
}

function pixelsOfScene(value, timeFactor, axis) { //in px
  if(typeof value === "string" && value.match(/%/g)) {
    if(axis === 'y') return (parseFloat(value) / 100) * window.innerHeight * timeFactor
    if(axis === 'x') return (parseFloat(value) / 100) * window.innerWidth * timeFactor
  }
}

function convertedValueOfAnimatedElement(elem, value, axis) {
  if(typeof value === "string" && value.match(/%/g)) {
    if(axis === 'y') return (parseFloat(value) / 100) * elem.clientHeight
    if(axis === 'x') return (parseFloat(value) / 100) * elem.clientWidth
  } else {
    return value
  }
}

function convertScenes(scenes, computed) {
  return scenes.map((scene, index) => {
    const animations = convertAnimations(scenes, computed, scene, index)
    return Json.merge(scene, {'animations': animations})
  })
}

function convertAnimations(scenes, computed, scene, sceneIndex) {
  return scene.animations.map((a, index) => {
    const steps = convertAnimationSteps(scenes, computed, scene, sceneIndex, a)
    return Json.merge(a, {'steps': steps})
  })
}

function convertAnimationSteps(scenes, computed, scene, sceneIndex, animation) {
  return animation.steps.map((step, index) => {
    const timeF = negativePercent(step.start) ? scenes[sceneIndex - 1].timeFactor : scene.timeFactor
    const animStartHeight = animationStepStart(scenes, scene, step, timeF)
    const animDurationHeight = animationStepDuration(scene, step, scene.timeFactor)
    const updatedAnimation = Json.merge(animation, {'start': animStartHeight, 'duration': animDurationHeight})
    const properties = convertProperties(computed, scene, animation, step)
    return Json.merge(updatedAnimation, {'properties': properties})
  })
}

function convertProperties(computed, scene, animation, step) {
  return Json.map(step.properties, (key, value) => {
    const node = computed[scene.key].animations[animation.key].node
    let axis = null
    switch(key) {
      case Property.TranslateX: case Property.Top: case Property.Bottom: case Property.GrowthX:
        axis = Axis.X
      case Property.TranslateY: case Property.Left: case Property.Right: case Property.GrowthY:
        axis = Axis.Y
    }

    const animFrom = convertedValueOfAnimatedElement(node, value.from, axis)
    const animTo = convertedValueOfAnimatedElement(node, value.to, axis)
    return buildProp(animFrom, animTo)
  })
}

function buildProp(from, to) {
  return {'from': from, 'to': to}
}

function compute(scenes, animationNode) {
  //computedValue With Dom Ref
  const computed = analyseDOM(scenes, animationNode)
  //convert relative percents with px value of the total film
  const convertedScenes = convertScenes(scenes, computed)

  const animBounds = animationNode.getBoundingClientRect()
  const duration = filmDuration(convertedScenes, animationNode)
  animationNode.style.height = `${String(duration)}px`
  animOffset = animBounds.top
  animHeight = duration

  //change height property of the film in the DOM
  run(convertedScenes, computed)
}

function setup(animationNode, options) {
  //one time actions
  //~~~~~~~~~~~~~~~~~~~
  const scenes = options
  compute(scenes, animationNode)
  //reset calculations if window size has changed
  window.addEventListener('resize', compute)
}

function analyseDOM(scenes, animationNode) {
  return scenes.reduce((sceneAcc, s) => {
    const scene = DOM.querySelector(s.wrapper, animationNode)
    const animations = s.animations.reduce((animAcc, a) => {
      const animation = DOM.querySelector(a.selector, scene)
      let computedAnim = {}
      computedAnim[a.key] = {'node': animation}
      return Json.merge(animAcc, computedAnim)
    }, {})
    let computedScene = {}
    computedScene[s.key] = {'node': scene, 'start': sceneStart(scenes, s), 'animations': animations}
    return Json.merge(sceneAcc, computedScene)
  }, {})
}

function computeProperty(step, propValue) {
  const transitionFunc = step.transition || defaultTransition
  if(scrollTop() <= step.start) return propValue.from
  else if (scrollTop() >= (step.start + step.duration)) return propValue.to
  else return transitionFunc(scrollTop() - step.start, propValue.from, propValue.to - propValue.from, step.duration)
}

function computeColor(step, colorValue) {
  const colorAsValues = [
    {from: colorValue.from.r, to: colorValue.to.r},
    {from: colorValue.from.g, to: colorValue.to.g},
    {from: colorValue.from.b, to: colorValue.to.b},
    {from: colorValue.from.a, to: colorValue.to.a}
  ]
  return colorAsValues.map((c) => computeProperty(step, c))
}

function getDefaultPropertyValue(property) {
  switch (property) {
    case Property.TranslateX:
      return 0
    case Property.TranslateY:
      return 0
    case Property.Scale:
      return 1
    case Property.Opacity:
      return 1
    default:
      return null
  }
}

function calcPropValue(step, property) {
  const propValue = step.properties[property]
  if(propValue) {
    switch(property) {
      case Property.Opacity :
        return Math.abs(computeProperty(step, propValue))
      case Property.Color: case Property.Fill:
        const c = computeColor(step, propValue)
        return Color(c[0], c[1], c[2], c[3])
      default :
        return computeProperty(step, propValue)
    }
  } else {
    return getDefaultPropertyValue(property)
  }
}

function getCurrentStep(steps) {
  const matchedStep = steps.find((step) => {
    return (
      (scrollTop() >= step.start && scrollTop() <= (step.start + step.duration))
      || step.start >= scrollTop()
    )
  })
  const matchedIndexOf = steps.indexOf(matchedStep)
  const matchedIndex = matchedIndexOf > -1 ? matchedIndexOf : steps.length - 1
  return steps[matchedIndex]
}

function computeAnimationProperties(steps) {
  const currentStep = getCurrentStep(steps)
  const computed = Object.keys(Property).reduce((acc, propKey) => {
    const obj = {}
    obj[Property[propKey]] = calcPropValue(currentStep, Property[propKey])
    return Json.merge(acc, obj)
  }, {})

  return Json.filter((p) => p !== null, computed)
}

function setCssProperties(node, properties) {
  node.style.transform = `translate3d(${properties[Property.TranslateX]}px, ${properties[Property.TranslateY]}px, 0) scale(${properties[Property.Scale]})`
  node.style.opacity = properties[Property.Opacity]
  if(properties[Property.Color]) node.style.color = `rgba(${properties[Property.Color].r}, ${properties[Property.Color].g}, ${properties[Property.Color].b}, ${properties[Property.Color].a})`
  if(properties[Property.Fill]) node.style.fill = `rgba(${properties[Property.Fill].r}, ${properties[Property.Fill].g}, ${properties[Property.Fill].b}, ${properties[Property.Fill].a})`
  if(properties[Property.Width]) node.style.width = `${properties[Property.Width]}px`
  if(properties[Property.Top]) node.style.top = `${properties[Property.Top]}px`
  if(properties[Property.Left]) node.style.left = `${properties[Property.Left]}px`
  if(properties[Property.Bottom]) node.style.bottom = `${properties[Property.Bottom]}px`
  if(properties[Property.Right]) node.style.right = `${properties[Property.Right]}px`
}

function animateElements(convertedScenes, computed) {
  convertedScenes.map((s) => {
    s.animations.map((a) => {
      const node = computed[s.key].animations[a.key].node
      const properties = computeAnimationProperties(a.steps)
      setCssProperties(node, properties)
    })
  })
}

function run(convertedScenes, computed) {
  Frame.requestAnimationFrame()(function() {
    if(scrollTop() >= 0 && scrollTop() <= animHeight) {
      animateElements(convertedScenes, computed)
      run(convertedScenes, computed)
    }
  })
}

export default setup
export { Color }
