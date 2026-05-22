import { Route, Routes } from 'react-router-dom';
import General from './pages/General';
import VibeMatchingWheel from './pages/VibeMatchingWheel';
import Recommendations from './pages/Recommendations';
import About from './pages/About';
import { Analytics } from "@vercel/analytics/react"

export default function App() {
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
