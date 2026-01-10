import { useEffect, useState } from "react";

export default function useNetworkQuality() {
  const [quality, setQuality] = useState("good"); 
  // good | medium | poor

  useEffect(() => {
    // Mock network changes (demo purpose)
    const interval = setInterval(() => {
      const values = ["good", "medium", "poor"];
      setQuality(values[Math.floor(Math.random() * values.length)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return quality;
}
