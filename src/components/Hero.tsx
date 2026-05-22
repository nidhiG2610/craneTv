import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-start gap-4 p-12 bg-white rounded-lg">
      <h2>Your fan-to-fan watch guide</h2>
      <p>
        Pick a mood, choose a genre, and get simple recommendations across K-content and C-content.
        The page tint changes with genre to support your future idea of adaptive app colors.
      </p>
      <button className="primary" onClick={() => navigate('/recommendations')}>
        My recommendations
      </button>
    </section>
  );
}
