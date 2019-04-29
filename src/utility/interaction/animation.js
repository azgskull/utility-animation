export const easingFunctions = {
  // no easing, no acceleration
  linear: function (t) { return t },
  // accelerating from zero velocity
  easeInQuad: function (t) { return t*t },
  // decelerating to zero velocity
  easeOutQuad: function (t) { return t*(2-t) },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
  // accelerating from zero velocity 
  easeInCubic: function (t) { return t*t*t },
  // decelerating to zero velocity 
  easeOutCubic: function (t) { return (--t)*t*t+1 },
  // acceleration until halfway, then deceleration 
  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
  // accelerating from zero velocity 
  easeInQuart: function (t) { return t*t*t*t },
  // decelerating to zero velocity 
  easeOutQuart: function (t) { return 1-(--t)*t*t*t },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
  // accelerating from zero velocity
  easeInQuint: function (t) { return t*t*t*t*t },
  // decelerating to zero velocity
  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
  // acceleration until halfway, then deceleration 
  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
}

/**
 * 
 */
export const animation = ({duration = .3, easing = easingFunctions.linear}) => {
  let animationStart = performance.now();
  duration *= 1000; //to ms

  return {
    perform : callBack => {
      requestAnimationFrame(function loopAnimation (animationNow) {
        let progressTime = (animationNow - animationStart) / duration;
            progressTime = progressTime > 1 ? 1 : progressTime;
    
        callBack(easing(progressTime));
  
        if(progressTime < 1){
          requestAnimationFrame(loopAnimation);
        } 
      });
    }
  }
}

animation({duration: 1, easing: easingFunctions.easeInQuad}).perform(p => {
  let rgba = [
    255,
    100,
    50
  ];
  
  let newRgba = [
    105,
    0,
    0
  ]

  let diff = [
    newRgba[0] - rgba[0],
    newRgba[1] - rgba[1],
    newRgba[2] - rgba[2],
  ]

  let curr = [
    rgba[0] + p * diff[0],
    rgba[1] + p * diff[1],
    rgba[2] + p * diff[2],
  ]
  document.querySelector('body').style.backgroundColor = `rgba(${curr.join()})`;
})






