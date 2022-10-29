import React, { useEffect, useMemo, useRef, useState } from "react";

const Login = () => {
  const ref = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        console.log(ref.current);
      }
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, []);

  return (
    <div
      style={{
        border: "1px solid red",
        width: "500px",
        marginInline: "auto",
        marginBlock: "50px",
      }}
    >
      <div ref={ref} style={{ height: "1000px", background: "green" }}>
        top
      </div>
      <div ref={ref2} style={{ height: "1000px", background: "blue" }}>
        middle
      </div>
      <div ref={ref3} style={{ height: "1000px", background: "red" }}>
        Bottom
      </div>
    </div>
  );
};

export default Login;
