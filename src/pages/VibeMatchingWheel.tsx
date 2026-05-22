import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { VibeHomeScreen } from '../components/vibe-matching-wheel/VibeHomeScreen';
import { VibeWheelScreen } from '../components/vibe-matching-wheel/VibeWheelScreen';
import { MOODS, SPIN_DURATION } from '../components/vibe-matching-wheel/moodConstants';
import { updateFilter } from '../store/filterStore';
import { VibeMood, VibeScreen } from '../types';

export default function VibeMatchingWheel() {
  const [screen, setScreen] = useState<VibeScreen>('home');
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<VibeMood | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectMood = (moodId: string) => {
    dispatch(updateFilter('mood', moodId));
  };

  const showDramas = (moodId?: string) => {
    if (moodId) {
      selectMood(moodId);
    }

    navigate('/recommendations');
  };

  function spinWheel() {
    if (spinning) return;

    setResult(null);
    setSpinning(true);

    const extraSpins = 5 + Math.floor(Math.random() * 5);
    const slice = 360 / MOODS.length;
    const targetIndex = Math.floor(Math.random() * MOODS.length);
    const targetDeg = extraSpins * 360 + (360 - targetIndex * slice - slice / 2);
    const newRotation = rotation + targetDeg;

    setRotation(newRotation);

    window.setTimeout(() => {
      const mood = MOODS[targetIndex];

      setSpinning(false);
      setResult(mood);
      selectMood(mood.id);
    }, SPIN_DURATION + 200);
  }

  if (screen === 'wheel') {
    return (
      <VibeWheelScreen
        rotation={rotation}
        spinning={spinning}
        result={result}
        onBack={() => setScreen('home')}
        onSpin={spinWheel}
        onShowDramas={() => showDramas(result?.id)}
      />
    );
  }

  return (
    <VibeHomeScreen
      onBrowseAll={() => showDramas()}
      onSpinWheel={() => setScreen('wheel')}
    />
  );
}
