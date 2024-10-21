import { useState } from "react";

const usePasswordVisibility = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((isVisible) => !isVisible);

  const secureTextEntry = !isVisible;
  const rightIcon = isVisible ? "eye-off" : "eye";

  return { secureTextEntry, rightIcon, toggleVisibility };
};

export default usePasswordVisibility;
