import { Route, Routes } from 'react-router-dom';
import General from './pages/General';
import VibeMatchingWheel from './pages/VibeMatchingWheel';
import Recommendations from './pages/Recommendations';
import About from './pages/About';
import { Analytics } from "@vercel/analytics/react"

export default function App() {
  // Handle stale chunk/cache issues after deployments
  window.addEventListener('unhandledrejection', (event) => {
    const message = event.reason?.message || '';

    const isChunkError =
      message.includes('Failed to fetch dynamically imported module') ||
      message.includes('Importing a module script failed');

    if (isChunkError) {
      const hasReloaded = sessionStorage.getItem('chunk-reload');

      if (!hasReloaded) {
        sessionStorage.setItem('chunk-reload', 'true');
        window.location.reload();
      }
    }
  });

  return (
    <>
      <Routes>
        <Route path="/" element={<VibeMatchingWheel />} />
        <Route path="/browse" element={<General />} />
        <Route path="/recommendations" element={<Recommendations onSave={() => { }} onMoreLikeThis={() => { }} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      {<Analytics />}
    </>
  );
}
