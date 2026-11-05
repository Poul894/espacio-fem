import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollManager = () => {
  const { pathname, hash, state } = useLocation();

  useEffect(() => {
    const target = state?.scrollTo || (hash ? hash.replace("#", "") : "");

    if (target) {
      const timer = window.setTimeout(() => {
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 60);
      return () => window.clearTimeout(timer);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash, state]);

  return null;
};

export default ScrollManager;
