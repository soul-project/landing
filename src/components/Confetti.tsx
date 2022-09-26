import { useEffect } from "react";
import CanvasConfetti from "canvas-confetti";
import { useSession } from "next-auth/react";

const COUNT = 200;
const DEFAULTS: CanvasConfetti.Options = {
  origin: { y: 0.7 },
  disableForReducedMotion: true,
};

function fire(particleRatio: number, opts: CanvasConfetti.Options) {
  CanvasConfetti(
    Object.assign({}, DEFAULTS, opts, {
      particleCount: Math.floor(COUNT * particleRatio),
    })
  );
}

const fireConfetti = () => {
  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

export default function Confetti() {
  const { status } = useSession();
  const firedConfetti = localStorage.getItem("fired-confetti");

  useEffect(() => {
    if (firedConfetti !== "true" && status === "authenticated") {
      localStorage.setItem("fired-confetti", "true");
      fireConfetti();
    }

    if (status === "unauthenticated") {
      localStorage.setItem("fired-confetti", "false");
    }
  }, [firedConfetti, status]);

  return null;
}
