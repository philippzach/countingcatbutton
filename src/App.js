import React from 'react';
import './App.scss';
import mojs from 'mo-js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      countTotal: 0,//this._generateRandomNumber(500,10000),
      isClicked: false,
    }
    this._handleClick = this._handleClick.bind(this);
  }

  componentDidMount() {
    const tlDuration = 300
    const triangleBurst = new mojs.Burst({
      parent: '#clap',
      radius: {50:95},
      count: 10,
      angle: 30,
      children: {
        shape: 'line',
        radius: {6: 0},
        scale: 1,
        stroke: 'white',
        strokeWidth: 2,
        angle: 180,
        delay: 30,
        speed: 0.2,
        easing: mojs.easing.bezier(0.1, 1, 0.3 ,1),
        duration: tlDuration
      } 
    })
    const circleBurst = new mojs.Burst({
      parent: '#clap',
      radius: {50:75},
      angle: 25,
      duration: tlDuration,
      children: {
        shape: 'polygon',
        fill: 'rgba(149,165,166 ,0.5)',
        delay: 30,
        speed: 0.2,
        radius: {10: 3},
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
      }
    })
    const countAnimation = new mojs.Html({
      el: '#clap--count',
      isShowStart: false,
      isShowEnd: true,
      y: {0: -30},
      opacity: {0:1},
      duration: tlDuration,
    }).then({
      opacity: {1:0},
      y: -80,
      delay: tlDuration/2
    })
    const countTotalAnimation = new mojs.Html({
      el: '#clap--count-total',
      isShowStart: false,
      isShowEnd: true,
      opacity: {0:1},
      delay: 3*(tlDuration)/2,
      duration: tlDuration,
      y: {0: -3}
    })
    const scaleButton = new mojs.Html({
      el: '#clap',
      duration: tlDuration,
      scale: {1.3: 1},
      easing: mojs.easing.out
    })
    const clap = document.getElementById('clap')
    clap.style.transform = "scale(1, 1)"
    this._animationTimeline = new mojs.Timeline()
    this._animationTimeline.add([
      countAnimation,
      countTotalAnimation,
      scaleButton,
      circleBurst,
      triangleBurst
    ])
  }
  _generateRandomNumber (min, max) {
    return Math.floor(Math.random()*(max-min+1)+min)
  } 

  
  _handleClick () {
    this._animationTimeline.replay()
    this.setState(function(prevState, nextState) {
      return {
        count: Math.min(prevState.count + 1, 200),
        countTotal: prevState.countTotal + 1,
        isClicked: true
      }
    })
  }
  
  render() {
    const {count, countTotal, isClicked} = this.state;
    return getAppContent(count, countTotal, isClicked, this._handleClick)
  }
}

function getAppContent(count, countTotal, isClicked, handleClick) {
  return <div><button id="clap" className="clap" onClick={handleClick}>
  <span>
    {/*<!--  SVG Created by Luis Durazo from the Noun Project  -->*/}
    <svg version="1.1" id="Layer_1" width="50px" height="50px" viewBox="0 0 200 200">    <g>
	<path d="M87.557,70.684c0.806,4.925-2.29,8.575-6.946,9.337c-4.946,0.676-8.909-1.819-9.672-6.479
		c-0.762-4.659,2.155-8.552,7.08-9.358C82.674,63.422,86.795,66.03,87.557,70.684z M134.536,62.996
		c0.806,4.925-2.285,8.575-6.944,9.337c-4.947,0.677-8.907-1.819-9.67-6.479c-0.762-4.659,2.152-8.552,7.076-9.358
		C129.657,55.733,133.774,58.342,134.536,62.996z"/>
	<path d="M131.686,82.34c3.495,3.802,7.949,11.818,9.54,21.534c3.396,20.759-6.948,33.522-20.794,35.789
		c-12.111,1.982-21.507-5.365-25.381-15.666l-0.27,0.046c-2.116,11.279-8.83,17.846-17.75,19.305
		c-10.512,1.721-21.892-4.344-24.68-21.381c-1.524-9.314,0.365-18.643,2.952-23.713l9.019,1.67
		c-2.051,4.157-4.023,11.316-2.89,18.238c1.763,10.777,8.605,14.169,15.524,13.037c10.252-1.679,12.877-13.179,11.483-21.696
		l-1.067-6.521l8.784-1.438l1.067,6.52c1.852,11.314,8.827,21.378,20.959,19.531c7.212-1.046,16.032-7.269,13.569-22.312
		c-1.328-8.116-5.92-15.293-8.593-18.272L131.686,82.34z"/>
</g>
</svg>

  </span>
  <span
    id="clap--count" className="clap--count">+{count}</span>
    
  <span id="clap--count-total" className="clap--count-total">{/*countTotal*/}</span>
</button>
  </div>
}

export default App;
