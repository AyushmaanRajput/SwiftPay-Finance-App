import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

const AccountStatus = ({ flag }) => {
  const container = useRef(null);
  console.log(flag);
  useEffect(() => {
    if (container.current) {
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData:
          flag == "happy"
            ? require("../../animations/happy_face.json")
            : require("../../animations/sad_face.json"),
      });
    }
  }, []);

  return (
    <div
      className="container"
      style={{
        overflow: "hidden",
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        padding: "0",
      }}
    >
      <div ref={container} style={{ width: "120px", height: "120px" }}></div>
      {/* Adjust width and height as needed */}
      <h5
        style={{
          lineHeight: "1.18",
          color: "var(--primary-white)",
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontWeight: 400,
        }}
      >
        {flag == "happy"
          ? "Hurray! Your Income is more than your Expenses"
          : "Your Monthly Expenses exceeded your Income!"}
      </h5>
    </div>
  );
};

export default AccountStatus;
