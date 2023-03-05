import React, { useRef, useEffect } from "react";

// a reference point at the end of the displayed chat messages for the page to scroll down to
const DivRef = (chat) => {
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  return <div ref={divRef} />;
};

export default DivRef;
