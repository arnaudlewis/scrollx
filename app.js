import scrollX from 'engine'

const options = [
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

const animationNode = document.querySelector('#my-animation')
scrollX.init(animationNode, options)
