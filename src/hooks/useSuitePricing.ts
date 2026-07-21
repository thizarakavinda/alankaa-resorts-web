import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../config/firebaseConfig"; 

const SLUG_MAP: Record<number, string> = { 1: "sunrise", 2: "sunset", 3: "garden" };

export function useSuitePricing() {
  const [prices, setPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    const catRef = ref(database, "categoryPricing");
    const unsub = onValue(catRef, (snap) => {
      const data = snap.val() || {};
      const flattened: Record<string, number> = {};
      Object.entries(data).forEach(([slug, val]: [string, any]) => {
        flattened[slug] = val.price;
      });
      setPrices(flattened);
    });
    return () => unsub();
  }, []);

  return prices;
}

export { SLUG_MAP };