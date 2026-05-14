/**
 * CraneTV — Drama Data Fetcher
 * Run: npm run fetch-dramas
 * Requires: VITE_TMDB_TOKEN in .env or as env variable
 * Output: public/data/kdramas.json, public/data/cdramas.json, public/data/genres.json
 */

import fs from 'fs/promises';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'data');

function loadEnvFile(filepath) {
  try {
    const env = readFileSync(filepath, 'utf-8');

    env.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;

      const match = trimmed.match(/^(?:export\s+)?([\w.-]+)\s*=\s*(.*)$/);
      if (!match) return;

      const [, key, rawValue] = match;
      const value = rawValue.trim().replace(/^['"]|['"]$/g, '');
      process.env[key] ??= value;
    });
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }
}

loadEnvFile(path.join(__dirname, '..', '.env'));

// ── Config ──────────────────────────────────────────────────────────────────
const TOKEN = process.env.VITE_TMDB_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p';

const MAX_PAGES = 10;  // 10 pages × 20 results = up to 200 dramas per country
const MIN_VOTES = 50;  // filter out no-name entries
const DELAY_MS = 250;  // polite delay between requests (TMDB rate limit is 40 req/s)

if (!TOKEN) {
  console.error('❌  VITE_TMDB_TOKEN is not set. Add it to your .env file.');
  process.exit(1);
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function tmdbFetch(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    headers: {
      Authorization:  `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error(`TMDB ${res.status} on ${endpoint}`);
  return res.json();
}

function normalize(item, country) {
  return {
    id:            item.id,
    title:         item.name,
    originalTitle: item.original_name,
    overview:      item.overview ?? '',
    poster:        item.poster_path
                     ? `${IMG_BASE}/w500${item.poster_path}`
                     : null,
    posterSmall:   item.poster_path
                     ? `${IMG_BASE}/w185${item.poster_path}`
                     : null,
    backdrop:      item.backdrop_path
                     ? `${IMG_BASE}/w1280${item.backdrop_path}`
                     : null,
    rating:        item.vote_average
                     ? parseFloat(item.vote_average.toFixed(1))
                     : null,
    voteCount:     item.vote_count  ?? 0,
    firstAired:    item.first_air_date ?? null,
    year:          item.first_air_date?.split('-')[0] ?? null,
    genreIds:      item.genre_ids   ?? [],
    popularity:    item.popularity  ?? 0,
    language:      item.original_language ?? null,
    country,
  };
}

// ── Core fetcher: all pages for one country ───────────────────────────────────
async function fetchCountry(countryCode) {
  const label  = countryCode === 'KR' ? 'K-Drama' : 'C-Drama';
  const dramas = [];
  let   page   = 1;
  let   total  = 1;

  console.log(`\n📺  Fetching ${label}s...`);

  while (page <= total && page <= MAX_PAGES) {
    process.stdout.write(`  page ${page}/${Math.min(total, MAX_PAGES)}...`);

    const data = await tmdbFetch('/discover/tv', {
      with_origin_country: countryCode,
      sort_by:             'popularity.desc',
      'vote_count.gte':    MIN_VOTES,
      page,
    });

    total = data.total_pages ?? 1;
    const normalized = (data.results ?? []).map(d => normalize(d, countryCode));
    dramas.push(...normalized);

    console.log(` ✓ ${normalized.length} dramas`);
    page++;
    if (page <= Math.min(total, MAX_PAGES)) await sleep(DELAY_MS);
  }

  console.log(`  ✅  Total ${label}s fetched: ${dramas.length}`);
  return dramas;
}

// ── Fetch genre list ──────────────────────────────────────────────────────────
async function fetchGenres() {
  console.log('\n🎭  Fetching genre list...');
  const data = await tmdbFetch('/genre/tv/list', { language: 'en' });
  const map  = {};
  (data.genres ?? []).forEach(g => { map[g.id] = g.name; });
  console.log(`  ✅  ${Object.keys(map).length} genres loaded`);
  return map;
}

// ── Write JSON ────────────────────────────────────────────────────────────────
async function writeJSON(filename, data) {
  const filepath = path.join(OUT_DIR, filename);
  await fs.writeFile(filepath, JSON.stringify(data, null, 2), 'utf-8');
  const kb = ((await fs.stat(filepath)).size / 1024).toFixed(1);
  console.log(`  💾  Saved ${filename} (${kb} KB)`);
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🦢  CraneTV Drama Fetcher starting...');
  console.log(`    Max pages per country : ${MAX_PAGES}`);
  console.log(`    Min vote count        : ${MIN_VOTES}`);

  await fs.mkdir(OUT_DIR, { recursive: true });

  const [kdramas, cdramas, genres] = await Promise.all([
    fetchCountry('KR'),
    fetchCountry('CN'),
    fetchGenres(),
  ]);

  // Enrich dramas with genre names
  const enrich = list => list.map(d => ({
    ...d,
    genres: d.genreIds.map(id => genres[id]).filter(Boolean),
  }));

  const meta = {
    fetchedAt:    new Date().toISOString(),
    kdramaCount:  kdramas.length,
    cdramaCount:  cdramas.length,
    totalCount:   kdramas.length + cdramas.length,
  };

  console.log('\n💾  Writing files...');
  await writeJSON('kdramas.json', enrich(kdramas));
  await writeJSON('cdramas.json', enrich(cdramas));
  await writeJSON('genres.json',  genres);
  await writeJSON('meta.json',    meta);

  console.log('\n✅  Done!');
  console.log(`    K-Dramas : ${kdramas.length}`);
  console.log(`    C-Dramas : ${cdramas.length}`);
  console.log(`    Total    : ${kdramas.length + cdramas.length}`);
  console.log(`    Fetched  : ${meta.fetchedAt}`);
}

main().catch(err => {
  console.error('❌  Fatal error:', err.message);
  process.exit(1);
});
