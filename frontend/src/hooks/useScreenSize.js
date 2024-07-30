// Custom hook used to check the size of the screen (width) to help with styling across different devices.
// Breakpoint is 1024 pixels for small devices
import { useState, useEffect } from "react";

const useScreenSize = () => {

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1024);

  useEffect(() => {

    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);

  }, []);

  return isSmallScreen;
};

export default useScreenSize;