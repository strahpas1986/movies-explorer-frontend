import { useEffect, useCallback, useState } from "react";

function useResize() {

  const getWindowWidth = useCallback(() => window.innerWidth, []);
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {

    let timer;

    function handleWindowResize() {
      setWindowWidth(getWindowWidth());
    }

    function handleSetTimeout() {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          handleWindowResize();
        }, 1000);
      }
    }

    window.addEventListener("resize", handleSetTimeout);
    return () => window.removeEventListener("resize", handleSetTimeout);
  }, [getWindowWidth]);

  return windowWidth;
}

export default useResize;
