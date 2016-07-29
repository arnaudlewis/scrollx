import R from 'ramda'

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
  Right: 'right',
  GrowthX: 'growthX',
  GrowthY: 'growthY'
}

const Timing = {
  EASE_IN_OUT: easeInOutQuad,
  EASE_IN: easeInQuad,
  EASE_OUT: easeOutQuad,
  LINEAR: linear
}

const Color = (red, green, blue, opacity = 1) => {
  return {r: parseInt(red), g: parseInt(green), b: parseInt(blue), a: opacity}
}

var $film =                   document.querySelector('#prismic_film'),
  animatedFrame =             null,
  scenes =                    [],
  computed =                  [],
  filmHeight =                0,
  windowHeight =              0,
  windowWidth =               0,
  prevKeyframesDurations =    0,
  scrollTop =                 0,
  currentSceneIndex =         0,
  defaultTransition =         Timing.EASE_IN_OUT,
  convertedScenes =           null,
  scenes = [
    {
      'key': 'scene1',
      'wrapper' : '#scene1',
      'timeFactor' : 0.4,
      'animations' :  [
        { // title
          'key': 'titleFadeOut',
          'selector'    : '.title',
          'steps': [
            {
              'start': '0%',
              'duration': '100%',
              'properties': {
                'translateY'  : {'from': '0%', 'to': '-100%'},
                'opacity'     : {'from': 1, 'to': 0}
              }
            }
          ]
        },
        { // explosion
          'key': 'explosion',
          'selector' : '.decor',
          'steps': [
            {
              'start': '0%',
              'duration': '100%',
              'properties': {
                'scale'  : {'from': 1, 'to': 3}
              }
            }
          ]
        }
      ]
    },
    {
      'key': 'scene2',
      'wrapper' : '#scene2',
      'timeFactor' : 4,
      'animations' :  [
        { // card intro
          'key': 'cardIntro',
          'selector' : '#card--intro',
          'steps': [
            {
              'start': '-50%',
              'duration': '10%',
              'properties': {
                'translateY'  : {'from': '110%', 'to': '10%'},
                'scale': {'from': 1.1, 'to': 1.1}
              }
            },
            {
              'start': '10%',
              'duration': '10%',
              'properties': {
                'translateY'  : {'from': '10%', 'to': '110%'},
                'scale': {'from': 1.1, 'to': 1.1}
              }
            }
          ]
        },
        { // card content
          'key': 'cardContent',
          'selector' : '#card--content',
          'steps': [
            {
              'start': '-50%',
              'duration': '10%',
              'properties': {
                'translateY'  : {'from': '105%', 'to': '5%'},
                'scale': {'from': 1.05, 'to': 1.05}
              }
            },
            {
              'start': '10%',
              'duration': '10%',
              'properties': {
                'translateY'  : {'from': '5%', 'to': '10%'},
                'scale': {'from': 1.05, 'to': 1.1}
              }
            },
            {
              'start': '90%',
              'duration': '10%',
              'properties': {
                'translateY'  : {'from': '10%', 'to': '110%'},
                'scale': {'from': 1.1, 'to': 1.1}
              }
            }
          ]
        },
        { // card content header title
          'key': 'cardContentTitleWriting',
          'selector' : '#card--content .header > span',
          'steps': [
            {
              'start': '20.6%',
              'duration': '0.1%',
              'transition': Timing.LINEAR,
              'properties': {
                'opacity': {'from': 0, 'to': 1},
                'width': {'from': 0, 'to': 14}
              }
            },
            {
              'start': '21.2%',
              'duration': '0.1%',
              'transition': Timing.LINEAR,
              'properties': {
                'width': {'from': 14, 'to': 23}
              }
            },
            {
              'start': '21.8%',
              'duration': '0.1%',
              'transition': Timing.LINEAR,
              'properties': {
                'width': {'from': 23, 'to': 37}
              }
            },
            {
              'start': '22.4%',
              'duration': '0.1%',
              'transition': Timing.LINEAR,
              'properties': {
                'width': {'from': 37, 'to': 40}
              }
            },
            {
              'start': '23%',
              'duration': '0.1%',
              'transition': Timing.LINEAR,
              'properties': {
                'width': {'from': 40, 'to': 53}
              }
            },
            {
              'start': '23.6%',
              'duration': '0.1%',
              'transition': Timing.LINEAR,
              'properties': {
                'width': {'from': 53, 'to': 62}
              }
            },
            {
              'start': '24.2%',
              'duration': '0.1%',
              'transition': Timing.LINEAR,
              'properties': {
                'width': {'from': 62, 'to': 70}
              }
            },
            {
              'start': '24.8%',
              'duration': '0.1%',
              'transition': Timing.LINEAR,
              'properties': {
                'width': {'from': 70, 'to': 77}
              }
            },
            {
              'start': '25.4%',
              'duration': '0.1%',
              'transition': Timing.LINEAR,
              'properties': {
                'width': {'from': 77, 'to': 88}
              }
            },
            {
              'start': '26%',
              'duration': '0.1%',
              'transition': Timing.LINEAR,
              'properties': {
                'width': {'from': 88, 'to': 101}
              }
            },
            {
              'start': '26.6%',
              'duration': '0.1%',
              'transition': Timing.LINEAR,
              'properties': {
                'width': {'from': 101, 'to': 105}
              }
            },
            {
              'start': '27.2%',
              'duration': '0.1%',
              'transition': Timing.LINEAR,
              'properties': {
                'width': {'from': 105, 'to': 115}
              }
            },
            {
              'start': '27.8%',
              'duration': '0.1%',
              'transition': Timing.LINEAR,
              'properties': {
                'width': {'from': 115, 'to': 124}
              }
            },
            {
              'start': '28.4%',
              'duration': '0.1%',
              'transition': Timing.LINEAR,
              'properties': {
                'width': {'from': 124, 'to': 134}
              }
            },
            {
              'start': '29%',
              'duration': '0.1%',
              'transition': Timing.LINEAR,
              'properties': {
                'width': {'from': 134, 'to': 144}
              }
            }
          ]
        },
        { //cardDecor
          'key': 'cardDecor',
          'selector' : '#card--decor',
          'steps': [
            {
              'start': '-50%',
              'duration': '10%',
              'properties': {
                'translateY'  : {'from': '100%', 'to': '0%'}
              }
            },
            {
              'start': '10%',
              'duration': '10%',
              'properties': {
                'translateY'  : {'from': '0%', 'to': '5%'},
                'scale': {'from': 1, 'to': 1.05}
              }
            },
            {
              'start': '90%',
              'duration': '10%',
              'properties': {
                'translateY'  : {'from': '5%', 'to': '105%'},
                'scale': {'from': 1.05, 'to': 1.05}
              }
            }
          ]
        },
        { //card code
          'key': 'cardCode',
          'selector' : '#card--code',
          'steps': [
            {
              'start': '65%',
              'duration': '4%',
              'properties': {
                'translateY'  : {'from': '100%', 'to': '30%'}
              }
            },
            {
              'start': '90%',
              'duration': '7%',
              'properties': {
                'translateY'  : {'from': '30%', 'to': '100%'}
              }
            }
          ]
        },
        { // title content
          'selector' : '.title.content',
          'key': 'titleContent',
          'steps': [
            {
              'start': '-50%',
              'duration': '10%',
              'properties': {
                'translateY'  : {'from': '100%', 'to': '0%'},
                'opacity'     : {'from': 0, 'to': 1}
              }
            },
            {
              'start': '45%',
              'duration': '10%',
              transition: Timing.EASE_OUT,
              'properties': {
                'translateY'  : {'from': '0%', 'to': '-100%'},
                'opacity'     : {'from': 1, 'to': 0}
              }
            }
          ]
        },
        { // title language
          'selector' : '.title.language',
          'key': 'titleLanguage',
          'steps': [
            {
              'start': '48%',
              'duration': '7%',
              transition: Timing.EASE_IN,
              'properties': {
                'translateY'  : {'from': '100%', 'to': '0%'},
                'opacity'     : {'from': 0, 'to': 1}
              }
            },
            {
              'start': '90%',
              'duration': '10%',
              'properties': {
                'translateY'  : {'from': '0%', 'to': '-100%'},
                'opacity'     : {'from': 1, 'to': 0},
                'color'  : {'from': Color(255, 255, 255), 'to': Color(255, 255, 255)}
              }
            }
          ]
        },
        { // item title
          'selector' : '.prismic-item.title-field',
          'key': 'titleFieldFadeIn',
          'steps': [
            {
              'start': '30%',
              'duration': '4%',
              'properties': {
                'translateY'  : {'from': '100%', 'to': '0%'},
                'opacity'     : {'from': 0, 'to': 1}
              }
            }
          ]
        },
        { // title img
          'selector' : '.prismic-item.img',
          'key': 'imgFieldFadeIn',
          'steps': [
            {
              'start': '34%',
              'duration': '4%',
              'properties': {
                'translateY'  : {'from': '100%', 'to': '0%'},
                'opacity'     : {'from': 0, 'to': 1}
              }
            }
          ]
        },
        { // item paragraph
          'selector' : '.prismic-item.paragraph',
          'key': 'paragraphFieldFadeIn',
          'steps': [
            {
              'start': '38%',
              'duration': '4%',
              'properties': {
                'translateY'  : {'from': '100%', 'to': '0%'},
                'opacity'     : {'from': 0, 'to': 1}
              }
            }
          ]
        },
        {// item title picto
          'selector' : '.prismic-item.title-field #picto-type-title',
          'key': 'titlePictoFade',
          'steps': [
            {
              'start': '72%',
              'duration': '1%',
              'properties': {
                'fill'  : {'from': Color(217, 227, 227), 'to': Color(243, 184, 98)}
              }
            }
          ]
        },
        {// item title picto border
          'selector' : '.prismic-item.title-field #picto-type-title-border',
          'key': 'titlePictoBorderFade',
          'steps': [
            {
              'start': '72%',
              'duration': '1%',
              'properties': {
                'fill'  : {'from': Color(217, 227, 227), 'to': Color(243, 184, 98)}
              }
            }
          ]
        },
        {// item img picto
          'selector' : '.prismic-item.img #picto-type-img',
          'key': 'imgPictoFade',
          'steps': [
            {
              'start': '76%',
              'duration': '1%',
              'properties': {
                'fill'  : {'from': Color(217, 227, 227), 'to': Color(250, 111, 72)}
              }
            }
          ]
        },
        {// item img picto border
          'selector' : '.prismic-item.img #picto-type-img-border',
          'key': 'imgPictoBorderFade',
          'steps': [
            {
              'start': '76%',
              'duration': '1%',
              'properties': {
                'fill'  : {'from': Color(217, 227, 227), 'to': Color(250, 111, 72)}
              }
            }
          ]
        },
        {//item img picto point
          'selector' : '.prismic-item.img #picto-type-img-point',
          'key': 'imgPictoPointFade',
          'steps': [
            {
              'start': '76%',
              'duration': '1%',
              'properties': {
                'fill'  : {'from': Color(217, 227, 227), 'to': Color(250, 111, 72)}
              }
            }
          ]
        },
        {// item paragraph picto
          'selector' : '.prismic-item.paragraph #picto-type-text',
          'key': 'pagragraphPictoFade',
          'steps': [
            {
              'start': '80%',
              'duration': '1%',
              'properties': {
                'fill'  : {'from': Color(217, 227, 227), 'to': Color(113, 131, 235)}
              }
            }
          ]
        },
        { // item paragraph picto border
          'selector' : '.prismic-item.paragraph #picto-type-text-border',
          'key': 'pagragraphPictoBorderFade',
          'steps': [
            {
              'start': '80%',
              'duration': '1%',
              'properties': {
                'fill'  : {'from': Color(217, 227, 227), 'to': Color(113, 131, 235)}
              }
            }
          ]
        },
        { // code title
          'selector' : '.code-element.title-field',
          'key': 'titleCodeFadeIn',
          'steps': [
            {
              'start': '73%',
              'duration': '4%',
              'properties': {
                'translateX'  : {'from': '-100%', 'to': '0%'},
                'opacity'     : {'from': 0, 'to': 1}
              }
            }
          ]
        },
        { // code img
          'selector' : '.code-element.img',
          'key': 'imgCodeFadeIn',
          'steps': [
            {
              'start': '77%',
              'duration': '4%',
              'properties': {
                'translateX'  : {'from': '-100%', 'to': '0%'},
                'opacity'     : {'from': 0, 'to': 1}
              }
            }
          ]
        },
        { // code paragraph
          'selector' : '.code-element.paragraph',
          'key': 'paragraphCodeFadeIn',
          'steps': [
            {
              'start': '81%',
              'duration': '4%',
              'properties': {
                'translateX'  : {'from': '-100%', 'to': '0%'},
                'opacity'     : {'from': 0, 'to': 1}
              }
            }
          ]
        },
        { // explosion types
          'key': 'explosionTypes',
          'selector' : '.decor.types',
          'steps': [
            {
              'start': '-50%',
              'duration': '10%',
              'properties': {
                'scale'  : {'from': 3, 'to': 1},
                'opacity' : {'from': 1, 'to': 1}
              }
            },
            {
              'start': '45%',
              'duration': '10%',
              'properties': {
                'scale'  : {'from': 1, 'to': 3}
              }
            }
          ]
        },
        { //explosion languages
          'key': 'explosionLanguages',
          'selector' : '.decor.languages',
          'steps': [
            {
              'start': '50%',
              'duration': '10%',
              'properties': {
                'scale'  : {'from': 3, 'to': 1},
                'opacity' : {'from': 1, 'to': 1}
              }
            }
          ]
        },
        { // circle
          'key': 'circleGrowth',
          'selector' : '.circle',
          'steps': [
            {
              'start': '45%',
              'duration': '15%',
              'properties': {
                'scale'  : {'from': 0, 'to': 1.415},
                'opacity'  : {'from': 1, 'to': 1}
              }
            }
          ]
        }
      ]
    },
    {
      'key': 'scene3',
      'wrapper' : '#scene3',
      'timeFactor' : 0.7,
      'animations' :  [
        { //title
          'selector' : '.title',
          'key': 'titleFadeIn',
          'steps': [
            {
              'start': '0%',
              'duration': '15%',
              'properties': {
                'translateY'  : {'from': '100%', 'to': '0%'},
                'opacity'     : {'from': 0, 'to': 1}
              }
            }
          ]
        }
      ]
    }
  ]

function filmDuration() { //in PX
  const outro = windowHeight
  return scenes.reduce((acc, scene) => {
    return acc + scene.timeFactor * windowHeight
  }, outro)
}

function getIndex(scene) {
  return scenes.indexOf(scene)
}

function sceneStart(scene) { //in PX
  const startIndex = getIndex(scene)
  const previousScenes = scenes.slice(0, startIndex)

  return previousScenes.reduce((acc, s) => {
    return acc + (s.timeFactor * windowHeight)
  }, 0)
}

function sceneDuration(scene) { //in PX
  return scene.timeFactor * windowHeight
}

function sceneEnd(scene) {
  return sceneStart(scene) + sceneDuration(scene)
}

function animationStepStart(scene, step, animTimeFactor) { // in px
  const start = sceneStart(scene, scene.timeFactor)
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
    if(axis === 'y') return (parseFloat(value) / 100) * windowHeight * timeFactor
    if(axis === 'x') return (parseFloat(value) / 100) * windowWidth * timeFactor
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

function convertScenes() {
  return scenes.map((scene, index) => {
    const animations = convertAnimations(scene, index)
    return R.merge(scene, {'animations': animations})
  })
}

function convertAnimations(scene, sceneIndex) {
  return scene.animations.map((a, index) => {
    const steps = convertAnimationSteps(scene, sceneIndex, a)
    return R.merge(a, {'steps': steps})
  })
}

function convertAnimationSteps(scene, sceneIndex, animation) {
  return animation.steps.map((step, index) => {
    const timeF = negativePercent(step.start) ? scenes[sceneIndex - 1].timeFactor : scene.timeFactor
    const animStartHeight = animationStepStart(scene, step, timeF)
    const animDurationHeight = animationStepDuration(scene, step, scene.timeFactor)
    const updatedAnimation = R.merge(a, {'start': animStartHeight, 'duration': animDurationHeight})
    const properties = convertProperties(scene, animation, step)
    return R.merge(updatedAnimation, {'properties': properties})
  })
}

function convertProperties(scene, animation, step) {
  return R.mapObjIndexed((value, key, obj) => {
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
    const convertedProp = buildProp(animFrom, animTo)
    return R.merge(value, convertedProp)
  }, step.properties)
}

function buildProp(from, to) {
  return {'from': from, 'to': to}
}

function compute() {
  scrollTop = window.scrollY
  windowHeight = window.innerHeight
  windowWidth = window.innerWidth
  filmHeight = filmDuration()
  if(windowWidth > 425) { //mobile size
    //computedValue With Dom Ref
    computed = analyseDOM()
    //convert relative percents with px value of the total film
    convertedScenes = convertScenes()
    //change height property of the film in the DOM
    $film.style.height = `${String(filmHeight)}px`
    run()
  } else {
    console.log("animeted Frame cancel " + animatedFrame)
    window.cancelAnimationFrame(animatedFrame)
  }
}

function setup() {
  //one time actions
  //~~~~~~~~~~~~~~~~~~~
  currentSceneIndex = 0
  compute()
  //reset calculations if window size has changed
  window.addEventListener('resize', compute)
  //random moves for decor items
  randomMoves()
}

function analyseDOM() {
  return scenes.reduce((sceneAcc, s) => {
    const scene = document.querySelector(s.wrapper)
    const animations = s.animations.reduce((animAcc, a) => {
      const animation = scene.querySelector(a.selector)
      let computedAnim = {}
      computedAnim[a.key] = {'node': animation}
      return R.merge(animAcc, computedAnim)
    }, {})
    let computedScene = {}
    computedScene[s.key] = {'node': scene, 'start': sceneStart(s), 'animations': animations}
    return R.merge(sceneAcc, computedScene)
  }, {})
}

function computeProperty(step, propValue) {
  const transitionFunc = step.transition || defaultTransition
  if(scrollTop <= step.start) return propValue.from
  else if (scrollTop >= (step.start + step.duration)) return propValue.to
  else return transitionFunc(scrollTop - step.start, propValue.from, propValue.to - propValue.from, step.duration)
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

function setScene() {
  const startPoints = Object.keys(computed).map((sceneKey, index) => {
    return computed[sceneKey].start
  })
  const startPoint = startPoints.find((start) => start >= scrollTop)
  currentSceneIndex = startPoint ? startPoints.indexOf(startPoint) - 1 : startPoints.length - 1
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
      (scrollTop >= step.start && scrollTop <= (step.start + step.duration))
      || step.start >= scrollTop
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
    return R.merge(acc, obj)
  }, {})

  return R.filter((p) => p !== null, computed)
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
  if(properties[Property.GrowthX]) {
    node.style.left = `${properties[Property.GrowthX]}px`
    node.style.right = `${properties[Property.GrowthX]}px`
  }
  if(properties[Property.GrowthY]) {
    node.style.top = `${properties[Property.GrowthY]}px`
    node.style.bottom = `${properties[Property.GrowthY]}px`
  }
}

function animateElements() {
  convertedScenes.map((s) => {
    s.animations.map((a) => {
      const node = computed[s.key].animations[a.key].node
      const properties = computeAnimationProperties(a.steps)
      setCssProperties(node, properties)
    })
  })
}

function run() {
  animatedFrame = window.requestAnimationFrame(function() {
    scrollTop = window.scrollY
    if(scrollTop <= filmHeight) {
      setScene()
      animateElements()
    }
    run()
  })
}

function randomMoves() {
  const shapes = Array.from(document.querySelectorAll('#prismic_film .box .shape'))
  const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

  const randomStyleContent = shapes.reduce((acc, shape, index) => {
    const random = randomNumber(70, 100) / 100
    shape.style.animationName = 'moveAround' + (index+1)
    shape.style.animationDuration = `${60 * random}s`
    const originX = randomNumber(-100, 100)
    const originY = randomNumber(-100, 100)
    const transX = randomNumber(-200, 200) * random
    const transY = randomNumber(-200, 200) * random
    const origin = `translate3d(${originX}%, ${originY}%, 0)`
    const translate = `translate3d(${transX}%, ${transY}%, 0)`
    return acc +=
      `@keyframes moveAround${index + 1} {
        0%, 100% {
          transform: ${origin}
        }
        50% {
          transform: ${translate}
        }
      }`
  }, '')
  document.querySelector('#prismic_film #random-moves').innerHTML = randomStyleContent
}

export default {
  init: setup,
  duration: filmDuration
}
