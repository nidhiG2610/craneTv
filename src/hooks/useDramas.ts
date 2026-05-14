import { useEffect, useState } from 'react';
import type { Drama } from '../types';

export function useDramas() {
  const [dramas, setDramas] = useState<Drama[]>([]);
  const [loadError, setLoadError] = useState(false);

  const loadDramas = async () => {
    try {
      const response1 = await fetch('/data/cdramas.json');
      const response2 = await fetch('/data/kdramas.json');
      if (!response1.ok) {
        throw new Error(`Failed with status ${response1.status}`);
      }
      if (!response2.ok) {
        throw new Error(`Failed with status ${response2.status}`);
      }
      const data1: Drama[] = await response1.json();
      const data2: Drama[] = await response2.json();
      setDramas([...data1, ...data2]);
      setLoadError(false);
    } catch (error) {
      console.error('Failed to load drama.json:', error);
      setLoadError(true);
    }
  }

  useEffect(() => {
    loadDramas();
  }, []);

  return { dramas, loadError };
}
