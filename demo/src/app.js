import scrollx from '../../lib/scrollx'

const options = [
  {
    'key': 'first-step',
    'wrapper' : '#first-step',
    'timeFactor' : 1,
    'animations' :  [
      { // title
        'key': 'titleFadeOut',
        'selector': '.title',
        'steps': [
          {
            'start': '0%',
            'duration': '100%',
            'properties': {
              'translateY': {'from': '0%', 'to': '-100%'},
              'opacity': {'from': 1, 'to': 0}
            }
          }
        ]
      }
    ]
  }
]

const animationNode = document.querySelector('#my-animation')
scrollx(animationNode, options)
