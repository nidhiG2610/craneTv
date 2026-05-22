import { Link } from 'react-router-dom';
import Page from './Page';
import { MOODS } from '../components/vibe-matching-wheel/moodConstants';

type Step = {
  title: string;
  body: string;
};

type WeatherPreview = {
  emoji: string;
  title: string;
  body: string;
  tags: string[];
};

type FanPick = {
  emoji: string;
  country: string;
  title: string;
  meta: string;
  note: string;
  gradient: string;
};

const steps: Step[] = [
  {
    title: 'Tell us how you feel',
    body: 'Choose a mood from the wheel, pick a weather vibe, or just browse if you already know what you want.',
  },
  {
    title: 'Get fan-curated picks',
    body: 'Every drama on CraneTV is handpicked by a real fan, with honest descriptions, fan notes, and watch info.',
  },
  {
    title: 'Save and discover more',
    body: 'Add dramas to your watchlist, explore similar picks, and come back when you need your next watch.',
  },
];

const moodPreviews = MOODS.map((mood) => ({
  ...mood,
  softColor: `${mood.color}3d`,
}));


const weather: WeatherPreview[] = [
  { emoji: '☀️', title: 'Sunny & Bright', body: 'Light, feel-good romance for your afternoon.', tags: ['Fluffy', 'Campus', 'Comedy'] },
  { emoji: '🌧️', title: 'Rainy Day', body: 'Emotional slow-burn dramas under a blanket.', tags: ['Emotional', 'Slow Burn', 'Healing'] },
  { emoji: '⛈️', title: 'Stormy Night', body: 'Suspense and thrillers that match the chaos outside.', tags: ['Thriller', 'Crime', 'Intense'] },
  { emoji: '🌸', title: 'Spring Morning', body: 'New beginnings, first love, and fresh-start romance.', tags: ['First Love', 'Youth', 'Sweet'] },
  { emoji: '🍂', title: 'Autumn Afternoon', body: 'Bittersweet stories that feel like falling leaves.', tags: ['Nostalgic', 'Coming of Age'] },
  { emoji: '❄️', title: 'Cold Winter', body: 'Epic fantasy and historical dramas to get lost in.', tags: ['Fantasy', 'Historical', 'Epic'] },
];

const fanPicks: FanPick[] = [
  {
    emoji: '🏮',
    country: 'C',
    title: 'Hidden Love',
    meta: '2023 · Netflix · 25 eps',
    note: 'One of the most beloved C-drama couples in recent years.',
    gradient: 'linear-gradient(135deg,#F4A7B9,#F87171)',
  },
  {
    emoji: '🔐',
    country: 'C',
    title: 'Our Secret',
    meta: '2021 · Viki · 24 eps',
    note: 'Stars Chen Zheyuan, the same lead as Hidden Love.',
    gradient: 'linear-gradient(135deg,#A78BFA,#818CF8)',
  },
  {
    emoji: '🧚',
    country: 'C',
    title: 'Exclusive Fairytale',
    meta: '2023 · iQIYI · 24 eps',
    note: 'Stars Wen Junhui from SEVENTEEN.',
    gradient: 'linear-gradient(135deg,#6EE7B7,#7EB8D4)',
  },
  {
    emoji: '🏡',
    country: 'C',
    title: 'Always Home',
    meta: '2025 · WeTV · 30 eps',
    note: 'Keep tissues nearby for the later episodes.',
    gradient: 'linear-gradient(135deg,#FCA552,#F4C842)',
  },
];

function SectionIntro({
  tag,
  title,
  body,
}: {
  tag: string;
  title: string;
  body: string;
}) {
  return (
    <div className="mb-8">
      <p className="pill mb-4 w-fit text-xs font-bold uppercase tracking-wide text-primary">{tag}</p>
      <h2 className="m-0 max-w-[18ch] text-2xl font-bold leading-tight text-ink">
        {title}
      </h2>
      <p className="mt-4 max-w-[56ch] text-muted">{body}</p>
    </div>
  );
}

function MoodWheelPreview() {
  return (
    <div className="relative mx-auto size-[300px]">
      <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 text-3xl drop-shadow">▼</div>
      <svg
        className="size-[300px] rounded-full shadow-soft"
        viewBox="0 0 300 300"
        aria-label="Mood wheel preview"
      >
        <path d="M150,150 L150,5 A145,145 0 0,1 252,47 Z" fill="#F4A7B9" />
        <path d="M150,150 L252,47 A145,145 0 0,1 295,150 Z" fill="#7EB8D4" />
        <path d="M150,150 L295,150 A145,145 0 0,1 252,253 Z" fill="#F4C842" />
        <path d="M150,150 L252,253 A145,145 0 0,1 150,295 Z" fill="#A78BFA" />
        <path d="M150,150 L150,295 A145,145 0 0,1 48,253 Z" fill="#6EE7B7" />
        <path d="M150,150 L48,253 A145,145 0 0,1 5,150 Z" fill="#818CF8" />
        <path d="M150,150 L5,150 A145,145 0 0,1 48,47 Z" fill="#FCA552" />
        <path d="M150,150 L48,47 A145,145 0 0,1 150,5 Z" fill="#F87171" />
        <circle cx="150" cy="150" r="145" fill="none" stroke="white" strokeWidth="2" />
        <text x="175" y="68" textAnchor="middle" fontSize="22">🌸</text>
        <text x="240" y="115" textAnchor="middle" fontSize="22">🌧️</text>
        <text x="248" y="195" textAnchor="middle" fontSize="22">⚡</text>
        <text x="195" y="252" textAnchor="middle" fontSize="22">🏰</text>
        <text x="110" y="258" textAnchor="middle" fontSize="22">😂</text>
        <text x="58" y="200" textAnchor="middle" fontSize="22">🌙</text>
        <text x="54" y="118" textAnchor="middle" fontSize="22">🍂</text>
        <text x="108" y="60" textAnchor="middle" fontSize="22">💔</text>
      </svg>
      <div className="absolute left-1/2 top-1/2 grid size-[60px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[3px] border-primary bg-white text-2xl shadow-soft">
        🦢
      </div>
    </div>
  );
}

export default function About() {
  return (
    <Page showHero={false}>
      <div className="flex flex-col gap-12">
        <section className="panel grid gap-10 p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="pill mb-5 w-fit">Fan-built · Free · No algorithms</p>
            <h1 className="m-0 max-w-[12ch] text-2xl font-black leading-tight text-ink">
              Find your next <span className="text-primary">drama obsession</span>
            </h1>
            <p className="mt-6 max-w-[52ch] text-lg text-muted">
              CraneTV matches you with K-dramas and C-dramas based on your mood,
              the weather, and what real fans actually love.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="primary rounded-full px-7 py-4 font-bold" to="/browse">
                🎬 I feel like watching something
              </Link>
              <Link className="secondary rounded-full px-7 py-4 font-semibold" to="/">
                🎡 Spin the mood wheel
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[320px]">
            <div className="rounded-[2rem] border bg-surface p-4 shadow-soft" style={{ borderColor: 'var(--color-border)' }}>
              <div className="mb-3 flex justify-between px-2 text-xs text-muted">
                <span>9:41</span>
                <span>●●●</span>
              </div>
              <div className="rounded-[1.6rem] bg-[#F7F4EE] p-5">
                <div className="mb-3 text-sm font-bold text-primary">🦢 CraneTV</div>
                <div className="font-bold">What brings you here?</div>
                <div className="mb-4 text-xs text-muted">Let us find your next obsession.</div>
                <div className="mb-2 rounded-xl bg-primary p-3 text-center text-sm font-bold text-white">
                  🎬 I feel like watching something
                </div>
                <div className="rounded-xl border bg-white p-3 text-center text-sm font-semibold" style={{ borderColor: 'var(--color-border)' }}>
                  🎡 I'm not sure — spin the wheel!
                </div>
                <div className="card mt-4">
                  <div className="flex gap-3">
                    <div className="grid h-[65px] w-[46px] shrink-0 place-items-center rounded-lg bg-surface2 text-2xl">🏮</div>
                    <div>
                      <div className="text-sm font-bold">Hidden Love</div>
                      <div className="text-xs text-muted">C-Drama · 2023 · Netflix</div>
                      <div className="text-xs text-muted">⭐ 8.9 · 25 episodes</div>
                      <div className="mt-1 w-fit rounded-full bg-[#e8f3f4] px-2 py-1 text-xs font-semibold text-primary">
                        Secret Crush
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="flex flex-col gap-6">
          <SectionIntro
            tag="How It Works"
            title="Simple as picking your mood"
            body="No sign-up needed. No endless scrolling. Just three steps to your next favourite drama."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <article className="card" key={step.title}>
                <div className="mb-4 grid size-10 place-items-center rounded-full bg-gradient-to-br from-primary to-[#148c95] text-sm font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="m-0 mb-3 text-lg">{step.title}</h3>
                <p className="m-0 text-sm text-muted">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="mood-wheel" className="panel p-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionIntro
                tag="Vibe Matching Wheel"
                title="Not sure what you're in the mood for?"
                body="Spin the wheel and let fate decide. Each mood maps to a curated list of dramas that match that feeling."
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {moodPreviews.map((mood) => (
                  <div className="rounded-panel border bg-white p-4" key={mood.id} style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex items-center gap-3">
                      <div className="grid size-10 shrink-0 place-items-center rounded-xl text-xl" style={{ background: mood.softColor }}>
                        {mood.emoji}
                      </div>
                      <div>
                        <h3 className="m-0 text-sm">{mood.label}</h3>
                        <p className="m-0 text-xs text-muted">{mood.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <MoodWheelPreview />
              <p className="mt-6 text-center text-sm text-muted">Spin the real wheel from the landing page.</p>
            </div>
          </div>
        </section>

        <section id="weather" className="flex flex-col gap-6">
          <SectionIntro
            tag="Weather × Drama Sync"
            title="Your weather sets the mood"
            body="CraneTV maps real-world weather vibes to drama moods, from rainy-day emotional watches to sunny comfort picks."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {weather.map((item) => (
              <article className="card text-center" key={item.title}>
                <div className="mb-3 text-4xl">{item.emoji}</div>
                <h3 className="m-0 mb-2 text-base">{item.title}</h3>
                <p className="m-0 mb-4 text-sm text-muted">{item.body}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {item.tags.map((tag) => (
                    <span className="tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="picks" className="flex flex-col gap-6">
          <SectionIntro
            tag="Fan Picks"
            title="Picked with obsession"
            body="Every drama here has been watched, loved, and recommended by a real fan. No bots. No sponsored placements."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {fanPicks.map((pick) => (
              <article className="card overflow-hidden p-0" key={pick.title}>
                <div className="relative grid h-[200px] place-items-center text-5xl" style={{ background: pick.gradient }}>
                  {pick.emoji}
                  <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                    {pick.country}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="m-0 mb-1 text-sm">{pick.title}</h3>
                  <p className="m-0 mb-3 text-xs text-muted">{pick.meta}</p>
                  <p className="m-0 text-xs italic text-primary">{pick.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-panel bg-gradient-to-br from-primary to-[#0A575D] p-8 text-center text-white shadow-soft">
          <h2 className="m-0 mb-4 text-2xl font-bold">Ready for your next obsession?</h2>
          <p className="mx-auto mb-8 max-w-[48ch] opacity-90">
            Join fans who trust CraneTV for their next watch. Free, no sign-up, always fan-first.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link className="rounded-full bg-white px-8 py-4 font-bold text-primary" to="/browse">
              🎬 Open CraneTV
            </Link>
            <Link className="rounded-full border-2 border-white/40 px-8 py-4 font-semibold text-white" to="/">
              🎡 Try the Mood Wheel
            </Link>
          </div>
        </section>

        <footer className="border-t py-8 text-center text-sm text-muted" style={{ borderColor: 'var(--color-border)' }}>
          Made with care by a fan, for fans · <span className="text-primary">🦢 CraneTV</span> · Real picks from real fans.
        </footer>
      </div>
    </Page>
  );
}
