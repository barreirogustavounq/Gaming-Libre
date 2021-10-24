import { useEffect, useState } from "react";

const WindowSize = () => {
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    console.log(size);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [size]);

  return size;
};

export default WindowSize;
