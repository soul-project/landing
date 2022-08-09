import { useState, useEffect } from "react";

export default function useHeadingsObserver({ anchorIds }: Args) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleObsever = (entries: IntersectionObserverEntry[]) => {
      const entry = entries.find((entry) => entry.isIntersecting);
      if (entry?.isIntersecting) {
        setActiveId(entry.target.id);
      }
    };

    const observer = new IntersectionObserver(handleObsever, {
      rootMargin: "-104px 0px -75% 0px",
    });

    const elements = document.querySelectorAll(
      anchorIds.map((anchorId) => `#${anchorId}`).join(", ")
    );
    elements.forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, [anchorIds]);

  return { activeId };
}

type Args = {
  anchorIds: string[];
};
