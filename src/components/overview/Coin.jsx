import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

const Coin = () => {
  const container = useRef(null);
  useEffect(() => {
    if (container.current) {
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: require("../../animations/coin.json"),
      });
    }
  }, []);

  return (
    <div
      className="container"
      style={{
        overflow: "hidden",
        marginRight: "0.5rem",
      }}
    >
      <div ref={container} style={{ width: "100px", height: "100px" }}></div>
      {/* Adjust width and height as needed */}
    </div>
  );
};

export default Coin;
