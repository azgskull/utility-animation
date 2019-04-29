import React, { useEffect } from "react";

import {
  checkIntersection,
  translateBlockBy,
  incrementranslateBlockBy,
  getClientPointerPosition,
  animate } from '../../utility/interaction';

const Scrollable = ({ children }) => {
  const container = React.createRef();
  const element = React.createRef();
  let elementAnimation;
  const pos = {
    last: { x: 0, y: 0 },
    start: { x: 0, y: 0 },
    current: { x: 0, y: 0 }
  };

  const moveStart = (e, block, container) => {
    pos.start = getClientPointerPosition(e);
    let fn = e => moving(e, block);
    document.addEventListener("mousemove", fn);
    document.addEventListener(
      "mouseup",
      e => {
        document.removeEventListener("mousemove", fn);
        pos.last = pos.current;
        updateIntersection(block, container);
      },
      { once: true }
    );
  };

  const moving = (e, block) => {
    pos.current = getClientPointerPosition(e);
    let diff = {
      x: pos.current.x - pos.start.x,
      y: pos.current.y - pos.start.y
    };

    translateBlockBy(block, diff);
  };

  const updateIntersection = (b, c) => {
    let intersection = checkIntersection(b, c);
    elementAnimation = incrementranslateBlockBy(b, {
      x: intersection.offsetX,
      y: intersection.offsetY
    });
  };

  useEffect(() => {
    let elm = element.current;
    let cnt = container.current;
    updateIntersection(elm, cnt);
    elm.addEventListener("mousedown", e => moveStart(e, elm, cnt));
  });

  return (
    <div
      ref={container}
      className="relative bg-grey-lighter overflow-hidden select-none"
      style={{ height: '50vh', width: '50vw' }}
    >
      <div
        ref={element}
        className="relative "
        style={{
          transform: "translateX(150px)",
          height: '120%',
          width: '120%',
          background: "radial-gradient(yellow, green)"
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Scrollable;
