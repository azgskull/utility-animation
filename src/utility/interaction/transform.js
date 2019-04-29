import { TweenLite } from 'gsap';

/**
 */
export const translateBlockBy = (b, { x, y }) => {
  TweenLite.killTweensOf(b);
  return TweenLite.to(b, 0.2, { x: x, y: y });
};

export const incrementranslateBlockBy = (b, { x, y }) => {
  TweenLite.killTweensOf(b);
  return TweenLite.to(b, 0.1, { x: "+=" + x, y: "+=" + y });
};

/**
 * 
 */
export const transformMatrixToObject = (matrix) => {
  return {
    scaleX : matrix.match(/\d+/g)[0],
    skewY : matrix.match(/\d+/g)[1],
    skewX : matrix.match(/\d+/g)[2],
    scaleY : matrix.match(/\d+/g)[3],
    translateX : matrix.match(/\d+/g)[4],
    translateY : matrix.match(/\d+/g)[5],
  }
}

/**
 * 
 */
export const transformObjectToMatrix = (object) => {
  return `matrix(${object.scaleX}, ${object.skewY}, ${object.skewX}, ${object.scaleY}, ${object.translateX}, ${object.translateY})`;
}

/**
 * 
 */
export const getComputedStyle = (target) => {
  return window.getComputedStyle(target);
}

/**
 * 
 */
export const propsToCss = (target, props) => {
  let oldStyle = getComputedStyle(target);
  //matrix(scaleX(),skewY(),skewX(),scaleY(),translateX(),translateY())
  let transformObj = transformMatrixToObject(oldStyle.transform)

  Object.entries(props).map((prop) => {
    if(transformObj[prop[0]]){
      transformObj["translateX"] = prop[1];
    }  
  });

  return {
    transform : transformObjectToMatrix(transformObj)
  }
}