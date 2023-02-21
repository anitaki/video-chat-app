import React, { useRef, useEffect } from "react";

const DivRef = (chat) => {
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  return <div ref={divRef} /> ;
};

export default DivRef;
