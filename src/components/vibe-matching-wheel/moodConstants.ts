import type { VibeMood } from '../../types';

export const MOODS: VibeMood[] = [
  { id: 'M001', emoji: '🌸', label: 'Fluffy & Warm', color: '#F4A7B9', desc: 'Sweet romance, feel-good vibes' },
  { id: 'M002', emoji: '🌧️', label: 'Emotional', color: '#7EB8D4', desc: 'Cry it out, deep feelings' },
  { id: 'M003', emoji: '⚡', label: 'Edge of My Seat', color: '#F4C842', desc: 'Thriller, suspense, can\'t stop' },
  { id: 'M004', emoji: '🏰', label: 'Another World', color: '#A78BFA', desc: 'Fantasy, historical, epic' },
  { id: 'M005', emoji: '😂', label: 'Laugh Out Loud', color: '#6EE7B7', desc: 'Comedy, light, breezy' },
  { id: 'M006', emoji: '🌙', label: 'Late Night Feel', color: '#818CF8', desc: 'Deep, romantic, can\'t sleep' },
  { id: 'M007', emoji: '🍂', label: 'Nostalgic', color: '#FCA552', desc: 'Bittersweet, memories, healing' },
  { id: 'M008', emoji: '💔', label: 'Heal My Heart', color: '#F87171', desc: 'After a breakup, comfort dramas' },
];

export const SPIN_DURATION = 4000;
