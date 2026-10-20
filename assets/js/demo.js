/* StarkForgeX LMS demo: sample data only, nothing is stored. */
(() => {
/* ---------- brand ---------- */
const LOGO_MARK = '../assets/images/logo-mark.png';
const LOGO_FULL = '../assets/images/logo-full.png';
const logoTile = (c = '') => `<span class="logo-tile ${c}"><img src="${LOGO_MARK}" alt="StarkForgeX"></span>`;
const CATALOG = '../courses/index.html';
/* ---------- utils ---------- */
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const TODAY = new Date();
const addDays = (n) => { const d = new Date(TODAY); d.setDate(d.getDate() + n); return d; };
const fmt = (d) => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
const wd = (d) => d.toLocaleDateString('en-IN', { weekday: 'short' });
const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
const avg = (a) => Math.round(a.reduce((x, y) => x + y, 0) / a.length);
const initials = (n) => n.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const R = rng(20261014);
const ri = (a, b) => Math.round(a + R() * (b - a));

const P = {
  home: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',
  book: 'M4 4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5zM4 19.5A1.5 1.5 0 0 0 5.5 21H20',
  test: 'M9 3h6v3H9zM7 4.5H5V21h14V4.5h-2M8.5 13l2.5 2.5 4.5-4.5',
  file: 'M14 3H6v18h12V7zM14 3v4h4M9 13h6M9 17h6',
  chart: 'M4 20V11M10 20V5M16 20v-6M21 20H3',
  route: 'M6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 16V9.5A3.5 3.5 0 0 1 9.5 6H16M18 8v6.5a3.5 3.5 0 0 1-3.5 3.5H8',
  users: 'M16 20v-1.5A3.5 3.5 0 0 0 12.5 15h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM20 20v-1.5a3.5 3.5 0 0 0-2.5-3.35M15.5 4.2a3.5 3.5 0 0 1 0 6.6',
  cal: 'M4 6h16v15H4zM4 10h16M8 3v4M16 3v4',
  calcheck: 'M4 6h16v15H4zM4 10h16M8 3v4M16 3v4M9 15l2 2 4-4',
  bell: 'M6 16v-5a6 6 0 1 1 12 0v5l1.5 2h-15zM10 21h4',
  out: 'M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-4.5-4.5',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  flame: 'M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5.3 2 1.3 3 2.5 3-1-3 0-6 .5-8.5z',
  plus: 'M12 5v14M5 12h14',
  x: 'M6 6l12 12M18 6 6 18',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  left: 'M19 12H5M11 6l-6 6 6 6',
  dl: 'M12 4v11M7 10l5 5 5-5M5 20h14',
  play: 'M8 5v14l11-7z',
  code: 'M8 7l-5 5 5 5M16 7l5 5-5 5',
  flag: 'M5 21V4M5 4h11l-2 4 2 4H5',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v5M12 8h.01',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  lock: 'M6 11h12v10H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
  dotc: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  send: 'M21 3 10 14M21 3l-7 18-4-7-7-4z',
  down: 'M6 9l6 6 6-6',
  brief: 'M4 8h16v12H4zM9 8V5h6v3M4 13h16',
  shield: 'M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z',
  db: 'M12 9c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  calc: 'M6 3h12v18H6zM9 7h6M9 11h.01M12 11h.01M15 11h.01M9 14h.01M12 14h.01M15 14h.01M9 17h.01M12 17h.01M15 17h.01',
  chat: 'M4 5h16v11H9l-5 4z',
  layers: 'M12 3 3 8l9 5 9-5zM3 13l9 5 9-5',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 21a7 7 0 0 1 14 0',
};
const ic = (n, s = 18, w = 1.8) => `<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${P[n]}"/></svg>`;

/* ---------- data ---------- */
const BIAS = { Percentages: 6, 'Time & work': -13, 'Number series': 4, 'Profit & loss': 2, Reasoning: 7, Arrays: 5, Recursion: -10, 'Linked lists': -5, 'SQL joins': -7, 'OOP in Java': 3 };
const TOPICS = ['Percentages', 'Time & work', 'Number series', 'Profit & loss', 'Reasoning', 'Arrays', 'Recursion', 'Linked lists', 'SQL joins', 'OOP in Java'];
const FIRST = ['Aarthi', 'Abinaya', 'Ajay', 'Akash', 'Anand', 'Anitha', 'Arun', 'Aswin', 'Bala', 'Bharath', 'Deepika', 'Dhanush', 'Divya', 'Gokul', 'Gowtham', 'Harini', 'Hariharan', 'Indhu', 'Janani', 'Jeeva', 'Kavya', 'Karthik', 'Keerthana', 'Kishore', 'Lavanya', 'Madhan', 'Meena', 'Mohan', 'Nandhini', 'Naveen', 'Nithya', 'Pooja', 'Pradeep', 'Priya', 'Rahul', 'Ramya', 'Sabari', 'Sandhiya', 'Sanjay', 'Santhosh', 'Saranya', 'Selvi', 'Shalini', 'Siva', 'Sneha', 'Sowmya', 'Subash', 'Swetha', 'Tharun', 'Vaishnavi', 'Varun', 'Vignesh', 'Vimal', 'Yamini', 'Yuvan', 'Pavithra', 'Revathi', 'Logesh'];
const LOW = new Set(['Karthik', 'Logesh', 'Madhan', 'Sabari', 'Subash', 'Yuvan', 'Indhu']);
const MID = new Set(['Meena', 'Gokul', 'Ajay', 'Sneha', 'Varun', 'Harini', 'Selvi', 'Tharun', 'Bala']);
const letters = 'ABCDEGHJKLMNPRSTV';
let students = FIRST.map((f) => {
  const low = LOW.has(f), mid = MID.has(f);
  const base = low ? ri(36, 48) : mid ? ri(52, 61) : ri(64, 88);
  const att = low ? ri(62, 78) : ri(84, 99);
  const trend = []; let v = base - ri(6, 14);
  for (let i = 0; i < 8; i++) { v += ri(-3, 5); trend.push(Math.max(25, Math.min(97, v))); }
  trend[7] = base;
  const topics = {}; TOPICS.forEach((t) => (topics[t] = Math.max(20, Math.min(98, base + BIAS[t] + ri(-9, 9)))));
  return { first: f, name: `${f} ${letters[ri(0, letters.length - 1)]}`, att, avg: base, coding: Math.max(20, base + ri(-15, 6)), roadmap: Math.max(25, Math.min(90, base - ri(0, 18))), trend, topics, tests: ri(38, 48) };
});
const priya = students.find((s) => s.first === 'Priya');
Object.assign(priya, { name: 'Priya S', att: 93, avg: 74, coding: 68, roadmap: 62, trend: [61, 63, 66, 64, 68, 70, 72, 74], tests: 46 });
Object.assign(priya.topics, { Percentages: 84, 'Time & work': 48, 'Number series': 79, 'Profit & loss': 76, Reasoning: 81, Arrays: 82, Recursion: 55, 'Linked lists': 69, 'SQL joins': 58, 'OOP in Java': 85 });
students.sort((a, b) => a.name.localeCompare(b.name));
students.forEach((s, i) => {
  s.roll = '23CSE' + String(i + 1).padStart(3, '0');
  s.status = (s.avg < 50 || s.att < 75) ? 'support' : s.avg < 62 ? 'improving' : 'ontrack';
  s.weak = Object.entries(s.topics).sort((a, b) => a[1] - b[1]).slice(0, 2);
});
const rank = [...students].sort((a, b) => b.avg - a.avg).indexOf(priya) + 1;
const STATUS = { ontrack: ['ok', 'On track'], improving: ['warn', 'Improving'], support: ['bad', 'Needs support'] };
const statusPill = (s) => `<span class="pill ${STATUS[s][0]}">${STATUS[s][1]}</span>`;

const COURSES = [
  { id: 'dsa', name: 'Data Structures & Algorithms', icon: 'code', tone: 't-notes', mods: [['Arrays & strings', 8, 'done'], ['Searching & sorting', 7, 'done'], ['Recursion', 6, 'done'], ['Linked lists', 9, 'current', 4, 'Insertion at any position'], ['Stacks & queues', 7], ['Trees', 9], ['Hashing', 5], ['Graphs', 8], ['Dynamic programming basics', 8]] },
  { id: 'java', name: 'Java & Object-Oriented Programming', icon: 'layers', tone: 't-exercise', mods: [['Classes & objects', 6, 'done'], ['Inheritance', 5, 'done'], ['Polymorphism', 5, 'done'], ['Exception handling', 4, 'done'], ['Collections framework', 6, 'current', 2, 'ArrayList vs LinkedList'], ['File I/O & streams', 5]] },
  { id: 'sql', name: 'Databases & SQL', icon: 'db', tone: 't-roadmap', mods: [['ER modelling', 4, 'done'], ['SELECT & filtering', 5, 'done'], ['Joins', 6, 'current', 3, 'LEFT and RIGHT joins'], ['GROUP BY & aggregates', 5], ['Subqueries', 4], ['Indexes & normalisation', 5]] },
  { id: 'apt', name: 'Aptitude & Reasoning', icon: 'calc', tone: 't-video', mods: [['Percentages', 4, 'done'], ['Profit & loss', 4, 'done'], ['Ratio & proportion', 3, 'done'], ['Number series', 3, 'done'], ['Time & work', 4, 'current', 2, 'Pipes and cisterns'], ['Time, speed & distance', 4], ['Coding-decoding', 3], ['Puzzles & arrangements', 5]] },
  { id: 'comm', name: 'Communication Skills', icon: 'chat', tone: 't-interview', mods: [['Self-introduction', 2, 'done'], ['Professional email writing', 3, 'done'], ['Group discussion', 4, 'current', 1, 'GD structure and roles'], ['Presentation basics', 3]] },
];
COURSES.forEach((c) => {
  let done = 0, total = 0;
  c.mods.forEach((m) => { total += m[1]; if (m[2] === 'done') done += m[1]; if (m[2] === 'current') done += m[3] - 1; });
  c.pct = Math.round((done / total) * 100); c.lessons = total;
  c.cur = c.mods.find((m) => m[2] === 'current');
});

const QUESTIONS = [
  { t: 'Number series', q: 'Find the next number: 2, 6, 12, 20, 30, ?', o: ['36', '40', '42', '48'], a: 2, e: 'Differences are 4, 6, 8, 10, so the next difference is 12. 30 + 12 = 42.' },
  { t: 'Percentages', q: 'If 20% of a number is 50, what is the number?', o: ['100', '200', '250', '500'], a: 2, e: '20% of x = 50, so x = 50 × 100 / 20 = 250.' },
  { t: 'Time & work', q: 'A can finish a job in 12 days and B in 18 days. Working together, how many days will they take?', o: ['6 days', '7.2 days', '7.5 days', '15 days'], a: 1, e: 'Together they do 1/12 + 1/18 = 5/36 of the job per day, so 36/5 = 7.2 days.' },
  { t: 'Speed & distance', q: 'A train 180 m long crosses a pole in 12 seconds. What is its speed in km/h?', o: ['45 km/h', '54 km/h', '60 km/h', '72 km/h'], a: 1, e: 'Speed = 180 / 12 = 15 m/s. Multiply by 18/5 to convert: 15 × 3.6 = 54 km/h.' },
  { t: 'Simple interest', q: 'What is the simple interest on ₹5,000 at 8% per annum for 3 years?', o: ['₹1,000', '₹1,200', '₹1,400', '₹1,600'], a: 1, e: 'SI = P × R × T / 100 = 5000 × 8 × 3 / 100 = ₹1,200.' },
  { t: 'Reasoning', q: 'Which number does not belong: 121, 144, 169, 196, 210?', o: ['144', '169', '196', '210'], a: 3, e: '121, 144, 169 and 196 are perfect squares (11² to 14²). 210 is not.' },
  { t: 'Ratio', q: 'Two numbers are in the ratio 3 : 5 and their sum is 64. What is the larger number?', o: ['24', '36', '40', '45'], a: 2, e: 'One part = 64 / 8 = 8. The larger number is 5 × 8 = 40.' },
  { t: 'Profit & loss', q: 'An item bought for ₹400 is sold for ₹500. What is the profit percentage?', o: ['20%', '25%', '30%', '33.3%'], a: 1, e: 'Profit = ₹100 on a cost of ₹400, so 100 / 400 × 100 = 25%.' },
  { t: 'Coding-decoding', q: 'If CODE is written as DPEF, how is BALL written?', o: ['CBMM', 'CBNN', 'ABKK', 'CCMM'], a: 0, e: 'Each letter moves one step forward: B→C, A→B, L→M, L→M.' },
  { t: 'Averages', q: 'What is the average of the first 10 natural numbers?', o: ['5', '5.5', '6', '10'], a: 1, e: 'Sum of 1 to 10 is 55. 55 / 10 = 5.5.' },
];

const MATERIALS = [
  { id: 'm1', type: 'notes', title: 'Linked lists: complete notes', course: 'DSA', meta: 'PDF · 12 pages', prev: 'll' },
  { id: 'm2', type: 'notes', title: 'OOP pillars with Java examples', course: 'Java', meta: 'PDF · 9 pages' },
  { id: 'm3', type: 'notes', title: 'SQL joins cheat sheet', course: 'SQL', meta: 'PDF · 2 pages', prev: 'joins' },
  { id: 'm4', type: 'notes', title: 'Time & work: shortcuts and solved examples', course: 'Aptitude', meta: 'PDF · 6 pages' },
  { id: 'm5', type: 'exercise', title: 'Linked list problem set', course: 'DSA', meta: '15 problems · auto-graded', prev: 'set' },
  { id: 'm6', type: 'exercise', title: 'SQL practice on a college database', course: 'SQL', meta: '20 queries · auto-graded' },
  { id: 'm7', type: 'exercise', title: 'Recursion warm-up', course: 'DSA', meta: '10 problems · auto-graded' },
  { id: 'm8', type: 'video', title: 'Reversing a linked list, step by step', course: 'DSA', meta: 'Video · 14 min' },
  { id: 'm9', type: 'video', title: 'Joins explained with diagrams', course: 'SQL', meta: 'Video · 11 min' },
  { id: 'm10', type: 'roadmap', title: 'Semester 3 roadmap', course: 'All courses', meta: '8 checkpoints' },
  { id: 'm11', type: 'roadmap', title: 'Four-year placement roadmap', course: 'All courses', meta: '8 semesters' },
  { id: 'm12', type: 'interview', title: 'Top 50 DSA interview questions', course: 'Placement', meta: 'PDF · with answers' },
  { id: 'm13', type: 'interview', title: 'HR interview question bank', course: 'Placement', meta: 'PDF · 60 questions' },
  { id: 'm14', type: 'interview', title: 'Resume template for freshers', course: 'Placement', meta: 'DOCX · 1 page' },
];
const MTYPE = { notes: ['Notes', 'file'], exercise: ['Exercise', 'code'], video: ['Video', 'play'], roadmap: ['Roadmap', 'route'], interview: ['Interview kit', 'brief'] };

const SEMS = [
  ['Semester 1', 'done', ['C programming', 'Logic building', 'Aptitude basics']],
  ['Semester 2', 'done', ['Python', 'Problem solving', 'Communication I']],
  ['Semester 3', 'current', ['DSA I: lists, stacks, queues', 'Java & OOP', 'Databases & SQL', 'Aptitude II'], 45],
  ['Semester 4', 'locked', ['DSA II: trees, graphs', 'HTML, CSS, JavaScript', 'Git & GitHub']],
  ['Semester 5', 'locked', ['React', 'Node.js or Spring Boot', 'REST APIs']],
  ['Semester 6', 'locked', ['Full-stack project', 'AI coding tools', 'Prompt engineering']],
  ['Semester 7', 'locked', ['Cloud & DevOps', 'CI/CD', 'Capstone project']],
  ['Semester 8', 'locked', ['Mock placement drives', 'Technical interviews', 'HR interviews']],
];

const S = {
  role: null, loginRole: 'student', page: 'home', openCourse: 'dsa',
  test: { status: 'intro', answers: {}, marked: {}, cur: 0, left: 600, taken: 0, confirm: false },
  matFilter: 'all', matQuery: '', drawer: null,
  stuFilter: 'all', stuQuery: '',
  tests: [
    { name: 'Aptitude daily test', topic: 'Aptitude', date: addDays(0), status: 'live', sub: 49, avg: 71, q: 10, dur: 10 },
    { name: 'Linked lists quiz', topic: 'DSA', date: addDays(-1), status: 'done', sub: 56, avg: 64, q: 15, dur: 20 },
    { name: 'SQL joins practice', topic: 'SQL', date: addDays(-2), status: 'done', sub: 55, avg: 69, q: 12, dur: 20 },
    { name: 'Aptitude daily test', topic: 'Aptitude', date: addDays(-1), status: 'done', sub: 54, avg: 68, q: 10, dur: 10 },
    { name: 'Java OOP weekly test', topic: 'Java', date: addDays(1), status: 'scheduled', sub: 0, avg: 0, q: 20, dur: 30 },
    { name: 'Mock coding round 2', topic: 'DSA', date: addDays(5), status: 'scheduled', sub: 0, avg: 0, q: 3, dur: 60 },
  ],
  att: {}, attSaved: false,
};
students.forEach((s) => (S.att[s.roll] = R() * 100 < s.att + 3));

/* ---------- charts ---------- */
function lineChart(vals, labels, o = {}) {
  const W = 600, H = o.h || 200, pl = 34, pr = 18, pt = 22, pb = 26;
  const min = o.min ?? 40, max = o.max ?? 90, step = o.step ?? 10;
  const x = (i) => pl + (i * (W - pl - pr)) / (vals.length - 1);
  const y = (v) => pt + ((max - v) * (H - pt - pb)) / (max - min);
  let g = '';
  for (let v = min; v <= max; v += step) g += `<line x1="${pl}" x2="${W - pr}" y1="${y(v)}" y2="${y(v)}" style="stroke:var(--line)" stroke-width="1"/><text x="${pl - 8}" y="${y(v) + 4}" text-anchor="end">${v}</text>`;
  const pts = vals.map((v, i) => `${x(i)},${y(v)}`).join(' ');
  const area = `M${x(0)},${y(min)} L${pts.split(' ').join(' L')} L${x(vals.length - 1)},${y(min)} Z`;
  const lab = labels.map((l, i) => `<text x="${x(i)}" y="${H - 6}" text-anchor="middle">${l}</text>`).join('');
  const dots = vals.map((v, i) => i === vals.length - 1 ? '' : `<circle cx="${x(i)}" cy="${y(v)}" r="3" style="fill:var(--surface);stroke:var(--brand)" stroke-width="2"/>`).join('');
  const L = vals.length - 1;
  let ref = '';
  if (o.ref) ref = `<polyline points="${o.ref.map((v, i) => `${x(i)},${y(v)}`).join(' ')}" fill="none" style="stroke:var(--ink-3)" stroke-width="1.5" stroke-dasharray="4 4"/>`;
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.label || 'Score trend')}">${g}<path d="${area}" style="fill:var(--brand)" fill-opacity=".09"/>${ref}<polyline points="${pts}" fill="none" style="stroke:var(--brand)" stroke-width="2.5" stroke-linejoin="round"/>${dots}<circle cx="${x(L)}" cy="${y(vals[L])}" r="5.5" style="fill:var(--brand);stroke:var(--surface)" stroke-width="2"/><text x="${x(L)}" y="${y(vals[L]) - 12}" text-anchor="middle" style="fill:var(--ink);font-weight:600;font-size:12px">${vals[L]}%</text>${lab}</svg>`;
}
const weeks = (n) => Array.from({ length: n }, (_, i) => 'W' + (i + 1));
const tone = (v) => (v < 50 ? 'bad' : v < 62 ? 'warn' : '');
const topicRow = (name, v) => `<div class="topic"><span>${esc(name)}</span><div class="bar ${tone(v)}"><i style="width:${v}%"></i></div><span>${v}%</span></div>`;
function ring(pct, label) {
  const r = 52, c = 2 * Math.PI * r;
  return `<div class="ring"><svg viewBox="0 0 120 120" width="100%" height="100%"><circle cx="60" cy="60" r="${r}" fill="none" style="stroke:var(--surface-2)" stroke-width="10"/><circle cx="60" cy="60" r="${r}" fill="none" style="stroke:${pct >= 60 ? 'var(--ok)' : 'var(--warn)'}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${(c * pct) / 100} ${c}" transform="rotate(-90 60 60)"/></svg><b>${label}</b></div>`;
}

/* ---------- shell ---------- */
const NAV = {
  student: [['home', 'Dashboard', 'home'], ['courses', 'My courses', 'book'], ['test', 'Daily test', 'test'], ['materials', 'Materials', 'file'], ['roadmap', 'Roadmap', 'route'], ['reports', 'Reports', 'chart']],
  faculty: [['home', 'Dashboard', 'home'], ['students', 'Students', 'users'], ['tests', 'Tests', 'test'], ['attendance', 'Attendance', 'calcheck'], ['reports', 'Reports', 'chart']],
};
const BNAV = { student: ['home', 'courses', 'test', 'materials', 'reports'], faculty: ['home', 'students', 'tests', 'attendance', 'reports'] };
const SHORT = { home: 'Home', courses: 'Courses', test: 'Test', materials: 'Materials', reports: 'Reports', students: 'Students', tests: 'Tests', attendance: 'Attendance' };

function strip() {
  return `<div class="demo-strip"><div class="in"><b>DEMO</b><span>Sample data only. Nothing you do here is saved.</span><span class="sp"></span>${S.role ? `<button data-a="switch">Switch to ${S.role === 'student' ? 'faculty' : 'student'} view</button>` : ''}</div></div>`;
}
function shell(inner) {
  const nav = NAV[S.role];
  const me = S.role === 'student' ? { n: 'Priya S', s: 'Student · ' + priya.roll } : { n: 'Dr. R. Lakshmi', s: 'Faculty · CSE' };
  const support = students.filter((s) => s.status === 'support').length;
  const title = nav.find((n) => n[0] === S.page)?.[1] || '';
  return `${strip()}<div class="app">
  <aside class="side" aria-label="Main navigation">
    <div class="mark">${logoTile()}<span>StarkForgeX LMS<small>Sample Engineering College</small></span></div>
    ${nav.map(([id, label, i]) => `<button class="nav-item" data-a="go" data-v="${id}" ${S.page === id ? 'aria-current="page"' : ''}>${ic(i)}${label}${S.role === 'faculty' && id === 'students' ? `<span class="count">${support}</span>` : ''}${S.role === 'student' && id === 'test' && S.test.status !== 'done' ? '<span class="count">1</span>' : ''}</button>`).join('')}
    <div class="who"><span class="avatar">${initials(me.n.replace('Dr. ', ''))}</span><span>${me.n}<small>${me.s}</small></span><button data-a="logout" aria-label="Sign out">${ic('out')}</button></div>
  </aside>
  <div class="main">
    <div class="topbar"><div class="in">
      <span class="m-mark">${logoTile('sm')}LMS</span>
      <span class="crumb">${S.role === 'student' ? 'Student' : 'Faculty'} ${ic('arrow', 12)} <b>${title}</b></span>
      <span class="sp"></span>
      <label class="searchbox top">${ic('search', 15)}<input id="global-search" placeholder="Search courses, materials" data-in="global"></label>
      <button class="icon-btn" data-a="toast" data-v="You have 2 new notifications in the full LMS." aria-label="Notifications">${ic('bell')}<span class="dot"></span></button>
      <button class="icon-btn m-only" data-a="logout" aria-label="Sign out">${ic('out')}</button>
    </div></div>
    <main class="content" id="content">${inner}</main>
  </div></div>
  <nav class="bnav" aria-label="Main navigation">${BNAV[S.role].map((id) => { const n = nav.find((x) => x[0] === id); return `<button data-a="go" data-v="${id}" ${S.page === id ? 'aria-current="page"' : ''}>${ic(n[2], 20)}${SHORT[id]}</button>`; }).join('')}</nav>`;
}

/* ---------- login ---------- */
function login() {
  const st = S.loginRole === 'student';
  return `${strip()}<div class="login">
  <section class="login-brand">
    <div class="mark">${logoTile()}StarkForgeX LMS</div>
    <h1>Training, daily tests and progress reports in one place.</h1>
    <p>This is a demo of the portal used by students and faculty at StarkForgeX partner colleges. Sign in as either role to look around.</p>
    <div class="facts">
      <div>${ic('test', 20)}<span>Take today's 10-question aptitude test and see your score with explanations.</span></div>
      <div>${ic('chart', 20)}<span>Track course progress, score trends and weak topics.</span></div>
      <div>${ic('users', 20)}<span>As faculty, see which students need support and assign tests.</span></div>
      <a href="${CATALOG}" target="_blank" rel="noopener" style="color:#9DB4FF;font-weight:600;display:flex;gap:8px;align-items:center;text-decoration:none">${ic('book', 18)}Browse the full course catalog ${ic('arrow', 16)}</a>
    </div>
  </section>
  <section class="login-form">
    <form class="form-card" id="login-form" autocomplete="off">
      <div class="logo-full"><img src="${LOGO_FULL}" alt="StarkForgeX Technologies: Innovate. Build. Transform."></div>
      <div><h1>Sign in</h1><p class="sub">Demo accounts are filled in for you.</p></div>
      <div class="seg" role="group" aria-label="Account type">
        <button type="button" data-a="loginRole" data-v="student" aria-pressed="${st}">Student</button>
        <button type="button" data-a="loginRole" data-v="faculty" aria-pressed="${!st}">Faculty</button>
      </div>
      <div class="field"><label for="lg-id">${st ? 'Roll number or email' : 'Faculty ID or email'}</label><input class="input" id="lg-id" value="${st ? priya.roll : 'FAC-CSE-014'}"></div>
      <div class="field"><label for="lg-pw">Password</label><input class="input" id="lg-pw" type="password" value="demo1234"></div>
      <button class="btn primary" type="submit" style="height:42px">Sign in as ${st ? 'student' : 'faculty'} ${ic('arrow', 16)}</button>
      <p class="hint">${ic('info', 16)}<span>Demo password: <b>demo1234</b>. Student: ${priya.roll} (Priya S). Faculty: FAC-CSE-014.</span></p>
    </form>
  </section></div>`;
}

/* ---------- student pages ---------- */
function greet() { const h = TODAY.getHours(); return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'; }
function sHome() {
  const t = S.test, done = t.status === 'done';
  const score = done ? QUESTIONS.filter((q, i) => t.answers[i] === q.a).length : 0;
  const streak = done ? 19 : 18;
  const cont = COURSES.slice(0, 3).map((c) => `<div class="rowi"><span class="course-ic ${c.tone}">${ic(c.icon, 20)}</span><div class="grow"><span class="t">${c.cur[0]}</span><span class="sub">${c.name} · Lesson ${c.cur[3]} of ${c.cur[1]}: ${c.cur[4]}</span><div class="bar"><i style="width:${Math.round(((c.cur[3] - 1) / c.cur[1]) * 100)}%"></i></div></div><button class="btn ghost sm" data-a="openCourse" data-v="${c.id}">Resume</button></div>`).join('');
  const week = [[addDays(0), '2:00 PM', 'DSA lab: linked lists', 'Lab 3, Block B'], [addDays(1), '10:00 AM', 'Java OOP weekly test', '20 questions · 30 min'], [addDays(3), '9:30 AM', 'Mock technical interview', 'Your slot: 9:30 to 9:50'], [addDays(5), '11:00 AM', 'Aptitude class: time & work', 'Seminar hall']];
  return `<div class="page-head"><div><h1>${greet()}, Priya</h1><p class="sub">B.E. Computer Science · 2nd year · Section A · ${priya.roll}</p></div><button class="btn ghost" data-a="go" data-v="roadmap">${ic('route', 16)} View roadmap</button></div>
  <div class="dash-top">
    <section class="today" aria-label="Today's mock test">
      <span class="label">Today's mock test · ${fmt(TODAY)}</span>
      <h2>Aptitude daily test</h2>
      ${done ? `<div class="done"><b class="num">${score}/10</b><span>${score * 10}% · batch average 71%</span></div><div class="row"><button class="btn on-dark" data-a="go" data-v="test">Review answers</button></div>`
        : `<div class="meta"><span>${ic('test', 15)}10 questions</span><span>${ic('clock', 15)}10 minutes</span><span>Closes 11:59 PM</span></div><div class="row"><button class="btn on-dark" data-a="startTest">Start test ${ic('arrow', 15)}</button></div>`}
    </section>
    <section class="panel stats" aria-label="My progress">
      <div class="stat"><span class="k">Roadmap complete</span><span class="v">62%</span><div class="bar"><i style="width:62%"></i></div></div>
      <div class="stat"><span class="k">Daily-test streak</span><span class="v">${streak} days</span><span class="d">Best: 21 days</span></div>
      <div class="stat"><span class="k">Average test score</span><span class="v">74%</span><span class="d">+6 in 4 weeks</span></div>
      <div class="stat"><span class="k">Attendance</span><span class="v">93%</span><span class="d">Above 75% minimum</span></div>
    </section>
  </div>
  <div class="grid g-2">
    <section class="panel"><header><h2>Continue learning</h2><button class="btn quiet" data-a="go" data-v="courses">All courses</button></header><div class="rows">${cont}</div></section>
    <section class="panel"><header><h2>Test score trend</h2><span class="sub">Last 8 weeks</span></header><div class="body">${lineChart(priya.trend, weeks(8), { min: 50, max: 80, step: 10 })}</div></section>
  </div>
  <div class="grid g-2e">
    <section class="panel"><header><h2>This week</h2></header><div class="rows">${week.map(([d, tm, t, s]) => `<div class="rowi"><div class="day"><small>${wd(d)}</small><b class="num">${d.getDate()}</b></div><div class="grow"><span class="t">${t}</span><span class="sub">${tm} · ${s}</span></div></div>`).join('')}</div></section>
    <section class="panel"><header><h2>Topics to work on</h2><button class="btn quiet" data-a="go" data-v="materials">Practice</button></header><div class="body">
      ${[['Time & work', 48], ['Recursion', 55], ['SQL joins', 58], ['Linked lists', 69]].map(([n, v]) => topicRow(n, v)).join('')}
      <p class="sub" style="margin-top:10px">Based on your last 10 tests. Scores under 62% are flagged.</p></div></section>
  </div>`;
}
function sCourses() {
  return `<div class="page-head"><div><h1>My courses</h1><p class="sub">Semester 3 · ${COURSES.length} courses · ${COURSES.reduce((a, c) => a + c.lessons, 0)} lessons</p></div><a class="btn ghost" href="${CATALOG}">${ic('book', 16)} Full syllabus and course catalog</a></div>
  <section class="panel">${COURSES.map((c) => {
    const open = S.openCourse === c.id;
    return `<div class="course ${open ? 'open' : ''}"><button class="course-h" data-a="toggleCourse" data-v="${c.id}" aria-expanded="${open}"><span class="course-ic ${c.tone}">${ic(c.icon, 20)}</span><span class="grow"><b>${c.name}</b><span class="bar"><i style="width:${c.pct}%"></i></span></span><span class="pct">${c.pct}%</span><span class="chev">${ic('down')}</span></button>
    ${open ? `<div class="mods">${c.mods.map((m) => { const s = m[2] || 'todo'; return `<div class="mod ${s}"><span class="st">${s === 'done' ? ic('check', 12, 3) : s === 'current' ? ic('dotc', 12, 3) : ic('lock', 11, 2)}</span><span class="grow">${m[0]}${s === 'current' ? `<br><small>Lesson ${m[3]}: ${m[4]}</small>` : ''}</span><small>${s === 'current' ? `${m[3] - 1}/${m[1]}` : s === 'done' ? `${m[1]}/${m[1]}` : `${m[1]} lessons`}</small>${s === 'current' ? `<button class="btn primary sm" data-a="toast" data-v="Lessons open in the full LMS. This demo shows the structure only.">Resume</button>` : ''}</div>`; }).join('')}</div>` : ''}</div>`;
  }).join('')}</section>`;
}
function sTest() {
  const t = S.test;
  if (t.status === 'intro') {
    return `<div class="page-head"><div><h1>Daily test</h1><p class="sub">A new 10-question test is released every morning at 6:00 AM.</p></div></div>
    <div class="grid g-side">
      <section class="panel"><header><h2>Aptitude daily test · ${fmt(TODAY)}</h2><span class="pill info">Open</span></header><div class="body" style="display:grid;gap:16px">
        <div class="kv"><div><b>10</b><span>Questions</span></div><div><b>10 min</b><span>Time limit</span></div><div><b>+1 / 0</b><span>Marking (no negative)</span></div><div><b>49 of 58</b><span>Classmates submitted</span></div></div>
        <div><h3 style="margin-bottom:6px">Topics</h3><div class="chips">${['Number series', 'Percentages', 'Time & work', 'Speed & distance', 'Interest', 'Reasoning', 'Ratio', 'Profit & loss', 'Coding-decoding', 'Averages'].map((x) => `<span class="tag">${x}</span>`).join('')}</div></div>
        <div><h3 style="margin-bottom:6px">Before you start</h3><ul class="plain"><li>The timer starts when you press Start and cannot be paused.</li><li>You can move between questions and mark any for review.</li><li>The test submits on its own when time runs out.</li></ul></div>
        <div><button class="btn primary" data-a="startTest" style="height:40px">Start test ${ic('arrow', 16)}</button></div>
      </div></section>
      <section class="panel"><header><h2>Recent tests</h2></header><div class="rows">${[[-1, 'Aptitude daily test', 7], [-2, 'Aptitude daily test', 8], [-1, 'Linked lists quiz', 11, 15], [-3, 'Aptitude daily test', 6], [-2, 'SQL joins practice', 8, 12]].map(([d, n, s, of = 10]) => `<div class="rowi"><div class="grow"><span class="t">${n}</span><span class="sub">${fmt(addDays(d))}</span></div><b class="num ${s / of < 0.62 ? 'wrong' : ''}">${s}/${of}</b></div>`).join('')}</div></section>
    </div>`;
  }
  if (t.status === 'running') {
    const q = QUESTIONS[t.cur], n = Object.keys(t.answers).length;
    return `<div class="page-head"><div><h1>Aptitude daily test</h1><p class="sub">${n} of 10 answered</p></div><span class="timer ${t.left <= 60 ? 'low' : ''}" id="timer">${ic('clock', 15)}<span>${mmss(t.left)}</span></span></div>
    <div class="test-wrap">
      <section class="panel"><div class="body" style="display:grid;gap:18px">
        <div class="q-head"><span class="label">Question ${t.cur + 1} of 10 · ${q.t}</span>${t.marked[t.cur] ? '<span class="pill warn">Marked for review</span>' : ''}</div>
        <div class="bar"><i style="width:${((t.cur + 1) / 10) * 100}%"></i></div>
        <p class="q-text">${esc(q.q)}</p>
        <div class="opts">${q.o.map((o, i) => `<button class="opt" data-a="answer" data-v="${i}" aria-pressed="${t.answers[t.cur] === i}"><span class="key">${'ABCD'[i]}</span>${esc(o)}</button>`).join('')}</div>
        <div class="q-foot">
          <button class="btn ghost" data-a="qnav" data-v="-1" ${t.cur === 0 ? 'disabled' : ''}>${ic('left', 16)} Previous</button>
          <span style="display:flex;gap:10px;flex-wrap:wrap">
            <button class="btn ghost" data-a="mark">${ic('flag', 15)} ${t.marked[t.cur] ? 'Unmark' : 'Mark for review'}</button>
            ${t.cur < 9 ? `<button class="btn primary" data-a="qnav" data-v="1">Next ${ic('arrow', 16)}</button>` : `<button class="btn primary" data-a="askSubmit">Submit test</button>`}
          </span>
        </div>
      </div></section>
      <section class="panel"><header><h2>Questions</h2></header><div class="body" style="display:grid;gap:14px">
        <div class="palette">${QUESTIONS.map((_, i) => `<button class="pal ${t.answers[i] !== undefined ? 'ans' : ''} ${t.marked[i] ? 'mark' : ''} ${i === t.cur ? 'cur' : ''}" data-a="jump" data-v="${i}" aria-label="Question ${i + 1}">${i + 1}</button>`).join('')}</div>
        <div class="pal-legend"><span><i style="background:var(--brand);border-color:var(--brand)"></i>Answered</span><span><i style="border:2px solid var(--orange)"></i>Marked for review</span><span><i></i>Not answered</span></div>
        <button class="btn ghost" data-a="askSubmit">Submit test</button>
      </div></section>
    </div>
    ${t.confirm ? `<div class="scrim center" data-a="closeConfirm"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="cf-t" data-stop="1"><h2 id="cf-t">Submit your test?</h2><p class="sub">You have answered ${n} of 10 questions.${n < 10 ? ` ${10 - n} unanswered question${10 - n > 1 ? 's' : ''} will be marked wrong.` : ''} You cannot change answers after submitting.</p><div class="acts"><button class="btn ghost" data-a="closeConfirm">Keep working</button><button class="btn primary" data-a="submit">Submit</button></div></div></div>` : ''}`;
  }
  // done
  const right = QUESTIONS.filter((q, i) => t.answers[i] === q.a).length;
  return `<div class="page-head"><div><h1>Your result</h1><p class="sub">Aptitude daily test · ${fmt(TODAY)}</p></div><button class="btn ghost" data-a="go" data-v="home">Back to dashboard</button></div>
  <section class="panel"><div class="body" style="display:flex;gap:24px;align-items:center;flex-wrap:wrap">
    ${ring(right * 10, `<span>${right}/10<small>score</small></span>`)}
    <div class="kv" style="flex:1;min-width:240px"><div><b>${right * 10}%</b><span>Accuracy</span></div><div><b>${mmss(t.taken)}</b><span>Time taken</span></div><div><b>71%</b><span>Batch average today</span></div><div><b>${right >= 8 ? 'Top 25%' : right >= 6 ? 'Middle 50%' : 'Bottom 25%'}</b><span>Your position today</span></div></div>
  </div></section>
  <section class="panel"><header><h2>Answer review</h2><span class="sub">${right} correct · ${10 - right} to revise</span></header><div>
  ${QUESTIONS.map((q, i) => { const a = t.answers[i], ok = a === q.a; return `<div class="review"><div style="display:flex;justify-content:space-between;gap:10px"><b>${i + 1}. ${esc(q.q)}</b><span class="pill ${ok ? 'ok' : 'bad'}">${ok ? 'Correct' : a === undefined ? 'Skipped' : 'Wrong'}</span></div><div class="ans"><span>Your answer: <span class="${ok ? 'right' : 'wrong'}">${a === undefined ? 'Not answered' : esc(q.o[a])}</span></span>${ok ? '' : `<span>Correct answer: <span class="right">${esc(q.o[q.a])}</span></span>`}</div><p class="exp">${esc(q.e)}</p></div>`; }).join('')}
  </div></section>`;
}
function sMaterials() {
  const types = ['all', 'notes', 'exercise', 'video', 'roadmap', 'interview'];
  return `<div class="page-head"><div><h1>Learning materials</h1><p class="sub">Notes, practice sets, videos and roadmaps for your current semester.</p></div></div>
  <section class="panel">
    <div class="toolbar"><label class="searchbox">${ic('search', 15)}<input id="mat-q" placeholder="Search materials" value="${esc(S.matQuery)}" data-in="mat"></label>
    <div class="chips">${types.map((k) => `<button class="chip" data-a="matFilter" data-v="${k}" aria-pressed="${S.matFilter === k}">${k === 'all' ? 'All' : MTYPE[k][0]}<span class="n">${k === 'all' ? MATERIALS.length : MATERIALS.filter((m) => m.type === k).length}</span></button>`).join('')}</div></div>
    <div id="mat-list">${matList()}</div>
  </section>`;
}
function matList() {
  const q = S.matQuery.toLowerCase();
  const list = MATERIALS.filter((m) => (S.matFilter === 'all' || m.type === S.matFilter) && (!q || (m.title + m.course).toLowerCase().includes(q)));
  if (!list.length) return `<div class="body"><p class="sub">No materials match “${esc(S.matQuery)}”. Try another word or clear the filter.</p></div>`;
  return list.map((m) => `<div class="mat"><span class="mat-ic t-${m.type}">${ic(MTYPE[m.type][1], 19)}</span><div class="grow"><span class="t">${esc(m.title)}</span><span class="meta"><span class="tag">${MTYPE[m.type][0]}</span><span>${m.course}</span><span>${m.meta}</span></span></div><button class="btn ghost sm" data-a="openMat" data-v="${m.id}">Open</button></div>`).join('');
}
function matPreview(m) {
  if (m.prev === 'll') return `<div class="doc" style="display:grid;gap:10px"><h3>1. What is a linked list?</h3><p>A linked list stores elements in nodes. Each node holds a value and a reference to the next node. Unlike an array, nodes are not stored next to each other in memory, so inserting or deleting does not shift other elements.</p><h3>2. The node class</h3><pre>class Node {
    int data;
    Node next;
    Node(int data) { this.data = data; }
}

// insert at the head: O(1)
Node insertAtHead(Node head, int value) {
    Node n = new Node(value);
    n.next = head;
    return n;
}</pre><h3>3. Time complexity</h3><div class="tbl-wrap"><table class="mini-tbl"><thead><tr><th>Operation</th><th>Array</th><th>Linked list</th></tr></thead><tbody><tr><td>Access by index</td><td>O(1)</td><td>O(n)</td></tr><tr><td>Insert at start</td><td>O(n)</td><td>O(1)</td></tr><tr><td>Search</td><td>O(n)</td><td>O(n)</td></tr></tbody></table></div><p class="muted">Page 1 of 12</p></div>`;
  if (m.prev === 'joins') return `<div class="doc" style="display:grid;gap:10px"><p>Tables used: <b>students</b>(id, name, dept_id) and <b>departments</b>(id, name).</p><div class="tbl-wrap"><table class="mini-tbl"><thead><tr><th>Join</th><th>Returns</th></tr></thead><tbody><tr><td>INNER JOIN</td><td>Only rows that match in both tables</td></tr><tr><td>LEFT JOIN</td><td>All students, with department if one exists</td></tr><tr><td>RIGHT JOIN</td><td>All departments, with students if any</td></tr><tr><td>FULL JOIN</td><td>Everything from both, matched where possible</td></tr></tbody></table></div><pre>SELECT s.name, d.name AS dept
FROM students s
LEFT JOIN departments d ON d.id = s.dept_id;</pre></div>`;
  if (m.prev === 'set') return `<div class="tbl-wrap"><table class="mini-tbl"><thead><tr><th>#</th><th>Problem</th><th>Level</th><th>Status</th></tr></thead><tbody>${[['Reverse a linked list', 'Easy', 'ok', 'Solved'], ['Find the middle node', 'Easy', 'ok', 'Solved'], ['Detect a cycle', 'Medium', 'ok', 'Solved'], ['Merge two sorted lists', 'Medium', 'warn', 'Attempted'], ['Remove Nth node from end', 'Medium', 'plain', 'Not started'], ['Add two numbers as lists', 'Medium', 'plain', 'Not started'], ['Reverse nodes in groups of k', 'Hard', 'plain', 'Not started']].map((r, i) => `<tr><td>${i + 1}</td><td>${r[0]}</td><td>${r[1]}</td><td><span class="pill ${r[2]}">${r[3]}</span></td></tr>`).join('')}</tbody></table></div><p class="sub" style="margin-top:8px">Showing 7 of 15 problems. Solutions are checked automatically against hidden test cases.</p>`;
  return `<div class="doc" style="display:grid;gap:10px"><p>${esc(m.title)} is part of your ${m.course} material for Semester 3 (${m.meta}).</p><p class="hint">${ic('info', 16)}<span>Full content opens in the live LMS. The demo includes complete previews for “Linked lists: complete notes”, “SQL joins cheat sheet” and “Linked list problem set”.</span></p></div>`;
}
function sRoadmap() {
  const years = [0, 1, 2, 3].map((y) => SEMS.slice(y * 2, y * 2 + 2));
  return `<div class="page-head"><div><h1>My roadmap</h1><p class="sub">Your path from first-year basics to placement. You are in Semester 3.</p></div><span class="pill info">62% of Year 2 goals met</span></div>
  <div class="sem-track">${years.map((ys, y) => `<div class="year"><span class="label">Year ${y + 1}${y === 1 ? ' <span class="pill info">Current</span>' : ''}</span>${ys.map(([n, st, items, pct]) => `<div class="sem ${st}"><div class="sem-h"><h3>${n}</h3>${st === 'done' ? '<span class="pill ok">Completed</span>' : st === 'current' ? `<span class="pill info">${pct}% done</span>` : `<span class="muted">${ic('lock', 14)}</span>`}</div>${st === 'current' ? `<div class="bar"><i style="width:${pct}%"></i></div>` : ''}<ul>${items.map((it, i) => `<li>${st === 'done' || (st === 'current' && i < 1) ? `<span class="right">${ic('check', 14, 2.5)}</span>` : st === 'current' ? `<span style="color:var(--brand)">${ic('dotc', 14, 2.5)}</span>` : `<span class="muted">${ic('dotc', 14, 1.5)}</span>`}<span>${it}</span></li>`).join('')}</ul></div>`).join('')}</div>`).join('')}</div>`;
}
function sReports() {
  const hist = [[0, 'Aptitude daily test', S.test.status === 'done' ? QUESTIONS.filter((q, i) => S.test.answers[i] === q.a).length * 10 : null, 71], [-1, 'Aptitude daily test', 70, 68], [-1, 'Linked lists quiz', 73, 64], [-2, 'SQL joins practice', 67, 69], [-2, 'Aptitude daily test', 80, 70], [-3, 'Aptitude daily test', 60, 66], [-4, 'Recursion practice', 55, 61]].filter((r) => r[2] !== null);
  const trend12 = [58, 60, 59, 61, ...priya.trend];
  const batch12 = [56, 57, 58, 58, 59, 61, 62, 62, 64, 65, 66, 68];
  return `<div class="page-head"><div><h1>My reports</h1><p class="sub">Updated after every test. Your faculty mentor sees the same report.</p></div></div>
  <section class="panel stats"><div class="stat"><span class="k">Rank in batch</span><span class="v">${rank} of ${students.length}</span></div><div class="stat"><span class="k">Tests taken</span><span class="v">${priya.tests + (S.test.status === 'done' ? 1 : 0)}</span></div><div class="stat"><span class="k">Average score</span><span class="v">74%</span><span class="d">Batch: 66%</span></div><div class="stat"><span class="k">Coding problems solved</span><span class="v">128</span><span class="d">+14 this month</span></div></section>
  <div class="grid g-2">
    <section class="panel"><header><h2>Score trend</h2><span class="legend"><span><i></i>You</span><span><i style="background:var(--ink-3)"></i>Batch average</span></span></header><div class="body">${lineChart(trend12, weeks(12), { min: 50, max: 80, step: 10, ref: batch12 })}</div></section>
    <section class="panel"><header><h2>Topic-wise scores</h2></header><div class="body">${Object.entries(priya.topics).sort((a, b) => b[1] - a[1]).map(([n, v]) => topicRow(n, v)).join('')}</div></section>
  </div>
  <section class="panel"><header><h2>Test history</h2></header><div class="tbl-wrap"><table><thead><tr><th>Date</th><th>Test</th><th>Your score</th><th>Batch average</th><th>Result</th></tr></thead><tbody>${hist.map(([d, n, s, b]) => `<tr><td>${fmt(addDays(d))}</td><td>${n}</td><td><b>${s}%</b></td><td>${b}%</td><td>${s >= b ? '<span class="pill ok">Above average</span>' : '<span class="pill warn">Below average</span>'}</td></tr>`).join('')}</tbody></table></div></section>`;
}

/* ---------- faculty pages ---------- */
const batchTrend = () => Array.from({ length: 8 }, (_, i) => avg(students.map((s) => s.trend[i])));
function fHome() {
  const sup = students.filter((s) => s.status === 'support');
  const live = S.tests.find((t) => t.status === 'live');
  const topicAvg = TOPICS.map((t) => [t, avg(students.map((s) => s.topics[t]))]).sort((a, b) => a[1] - b[1]).slice(0, 5);
  return `<div class="page-head"><div><h1>CSE · 2nd year · Section A</h1><p class="sub">Dr. R. Lakshmi · Class mentor · ${students.length} students</p></div><button class="btn primary" data-a="newTest">${ic('plus', 16)} New test</button></div>
  <section class="panel stats five">
    <div class="stat"><span class="k">Students</span><span class="v">${students.length}</span></div>
    <div class="stat"><span class="k">Attendance</span><span class="v">${avg(students.map((s) => s.att))}%</span><span class="d">This month</span></div>
    <div class="stat"><span class="k">Average test score</span><span class="v">${avg(students.map((s) => s.avg))}%</span><span class="d">+5 in 4 weeks</span></div>
    <div class="stat"><span class="k">Roadmap complete</span><span class="v">${avg(students.map((s) => s.roadmap))}%</span><span class="d">Target 60% by Nov</span></div>
    <div class="stat"><span class="k">Need support</span><span class="v" style="color:var(--bad)">${sup.length}</span><span class="d down">Score under 50% or attendance under 75%</span></div>
  </section>
  <div class="grid g-2">
    <section class="panel"><header><h2>Students who need support</h2><button class="btn quiet" data-a="stuFilterGo" data-v="support">View all</button></header><div class="rows">
      ${sup.slice(0, 6).map((s) => `<div class="rowi"><span class="avatar">${initials(s.name)}</span><div class="grow"><span class="t">${s.name}</span><span class="sub">${s.avg < 50 ? `Avg score ${s.avg}%` : ''}${s.avg < 50 && s.att < 75 ? ' · ' : ''}${s.att < 75 ? `Attendance ${s.att}%` : ''} · Weakest: ${s.weak[0][0]}</span></div><button class="btn ghost sm" data-a="openStu" data-v="${s.roll}">Review</button></div>`).join('')}
    </div></section>
    <section class="panel"><header><h2>Today's test</h2><span class="pill info">Live</span></header><div class="body" style="display:grid;gap:14px">
      <div><b>${live.name}</b><p class="sub">${live.q} questions · ${live.dur} min · closes 11:59 PM</p></div>
      <div style="display:grid;gap:6px"><div style="display:flex;justify-content:space-between" class="sub"><span>Submitted</span><b class="num" style="color:var(--ink)">${live.sub} of ${students.length}</b></div><div class="bar"><i style="width:${(live.sub / students.length) * 100}%"></i></div></div>
      <div class="kv"><div><b>${live.avg}%</b><span>Average so far</span></div><div><b>${students.length - live.sub}</b><span>Yet to attempt</span></div></div>
      <button class="btn ghost" data-a="toast" data-v="Reminder sent to ${students.length - live.sub} students who have not attempted today's test.">${ic('send', 15)} Remind ${students.length - live.sub} students</button>
    </div></section>
  </div>
  <div class="grid g-2">
    <section class="panel"><header><h2>Batch average score</h2><span class="sub">Last 8 weeks</span></header><div class="body">${lineChart(batchTrend(), weeks(8), { min: 40, max: 80, step: 10, label: 'Batch average score' })}</div></section>
    <section class="panel"><header><h2>Weakest topics</h2><span class="sub">Batch average</span></header><div class="body">${topicAvg.map(([n, v]) => topicRow(n, v)).join('')}<button class="btn ghost sm" style="margin-top:10px" data-a="newTest">Assign a practice test</button></div></section>
  </div>`;
}
function fStudents() {
  const cnt = (k) => students.filter((s) => k === 'all' || s.status === k).length;
  return `<div class="page-head"><div><h1>Students</h1><p class="sub">CSE · 2nd year · Section A. Select a student to see details.</p></div><button class="btn ghost" data-a="toast" data-v="Exports open as Excel in the full LMS.">${ic('dl', 16)} Export</button></div>
  <section class="panel">
    <div class="toolbar"><label class="searchbox">${ic('search', 15)}<input id="stu-q" placeholder="Search name or roll number" value="${esc(S.stuQuery)}" data-in="stu"></label>
    <div class="chips">${[['all', 'All'], ['ontrack', 'On track'], ['improving', 'Improving'], ['support', 'Needs support']].map(([k, l]) => `<button class="chip" data-a="stuFilter" data-v="${k}" aria-pressed="${S.stuFilter === k}">${l}<span class="n">${cnt(k)}</span></button>`).join('')}</div></div>
    <div class="tbl-wrap"><table><thead><tr><th>Student</th><th>Attendance</th><th>Avg score</th><th class="hide-s">Coding</th><th class="hide-s">Roadmap</th><th>Status</th></tr></thead><tbody id="stu-rows">${stuRows()}</tbody></table></div>
  </section>`;
}
function stuRows() {
  const q = S.stuQuery.toLowerCase();
  const list = students.filter((s) => (S.stuFilter === 'all' || s.status === S.stuFilter) && (!q || (s.name + s.roll).toLowerCase().includes(q)));
  if (!list.length) return `<tr><td colspan="6" class="muted">No students match “${esc(S.stuQuery)}”.</td></tr>`;
  return list.map((s) => `<tr class="click" data-a="openStu" data-v="${s.roll}" tabindex="0"><td><div class="who"><span class="avatar">${initials(s.name)}</span><span>${s.name}<small>${s.roll}</small></span></div></td><td class="${s.att < 75 ? 'lowv' : ''}">${s.att}%</td><td class="${s.avg < 50 ? 'lowv' : ''}">${s.avg}%</td><td class="hide-s">${s.coding}%</td><td class="hide-s">${s.roadmap}%</td><td>${statusPill(s.status)}</td></tr>`).join('');
}
function fTests() {
  const st = { live: ['info', 'Live'], done: ['plain', 'Completed'], scheduled: ['warn', 'Scheduled'] };
  const order = { live: 0, scheduled: 1, done: 2 };
  const list = [...S.tests].sort((a, b) => order[a.status] - order[b.status] || a.date - b.date);
  return `<div class="page-head"><div><h1>Tests</h1><p class="sub">Daily mock tests are released automatically. Add topic tests here.</p></div><button class="btn primary" data-a="newTest">${ic('plus', 16)} New test</button></div>
  <section class="panel"><div class="tbl-wrap"><table><thead><tr><th>Test</th><th>Date</th><th>Questions</th><th>Submitted</th><th>Average</th><th>Status</th></tr></thead><tbody>
  ${list.map((t) => `<tr><td><b>${esc(t.name)}</b><br><span class="sub">${esc(t.topic)} · ${t.dur} min${t.who ? ' · ' + esc(t.who) : ''}</span></td><td>${wd(t.date)}, ${fmt(t.date)}</td><td>${t.q}</td><td>${t.status === 'scheduled' ? '<span class="muted">Not started</span>' : `${t.sub} / ${t.to || students.length}`}</td><td>${t.status === 'scheduled' ? '<span class="muted">–</span>' : `<b>${t.avg}%</b>`}</td><td><span class="pill ${st[t.status][0]}">${st[t.status][1]}</span></td></tr>`).join('')}
  </tbody></table></div></section>`;
}
function fAttendance() {
  const present = students.filter((s) => S.att[s.roll]).length;
  return `<div class="page-head"><div><h1>Attendance</h1><p class="sub">DSA lab: linked lists · ${wd(TODAY)}, ${fmt(TODAY)} · 2:00 PM · Lab 3</p></div><button class="btn primary" data-a="saveAtt">${S.attSaved ? ic('check', 16, 2.5) + ' Saved' : 'Save attendance'}</button></div>
  <section class="panel stats"><div class="stat"><span class="k">Present</span><span class="v" style="color:var(--ok)" id="att-p">${present}</span></div><div class="stat"><span class="k">Absent</span><span class="v" style="color:var(--bad)" id="att-a">${students.length - present}</span></div><div class="stat"><span class="k">Class strength</span><span class="v">${students.length}</span></div><div class="stat"><span class="k">Month average</span><span class="v">${avg(students.map((s) => s.att))}%</span></div></section>
  <section class="panel"><header><h2>Mark attendance</h2><span style="display:flex;gap:6px"><button class="btn ghost sm" data-a="attAll" data-v="1">All present</button></span></header><div class="att-list">
  ${students.map((s) => `<div class="att-row"><span class="avatar">${initials(s.name)}</span><div class="grow"><b>${s.name}</b><div class="sub">${s.roll} · ${s.att}% this month</div></div><div class="toggle" role="group" aria-label="${s.name}"><button class="p" data-a="att" data-v="${s.roll}|1" aria-pressed="${S.att[s.roll]}">Present</button><button class="a" data-a="att" data-v="${s.roll}|0" aria-pressed="${!S.att[s.roll]}">Absent</button></div></div>`).join('')}
  </div></section>`;
}
function fReports() {
  const bins = [[0, 40], [40, 50], [50, 60], [60, 70], [70, 80], [80, 101]];
  const counts = bins.map(([a, b]) => students.filter((s) => s.avg >= a && s.avg < b).length);
  const mx = Math.max(...counts);
  const c = { ontrack: 0, improving: 0, support: 0 }; students.forEach((s) => c[s.status]++);
  const topicAvg = TOPICS.map((t) => [t, avg(students.map((s) => s.topics[t]))]).sort((a, b) => b[1] - a[1]);
  const pct = (n) => (n / students.length) * 100;
  return `<div class="page-head"><div><h1>Batch report</h1><p class="sub">CSE · 2nd year · Section A · shared monthly with the HOD and placement officer</p></div><button class="btn ghost" data-a="toast" data-v="Reports export as PDF in the full LMS.">${ic('dl', 16)} Download PDF</button></div>
  <div class="grid g-2e">
    <section class="panel"><header><h2>Score distribution</h2><span class="sub">Students by average test score</span></header><div class="body"><div class="hist">${counts.map((n, i) => `<div><b>${n}</b><i class="${i < 2 ? 'lowb' : ''}" style="height:${(n / mx) * 120}px"></i><small>${i === 0 ? '<40' : i === 5 ? '80+' : `${bins[i][0]}–${bins[i][1] - 1}`}</small></div>`).join('')}</div></div></section>
    <section class="panel"><header><h2>Placement readiness</h2><span class="sub">${students.length} students</span></header><div class="body" style="display:grid;gap:16px">
      <div class="stack"><i style="width:${pct(c.ontrack)}%;background:var(--ok)"></i><i style="width:${pct(c.improving)}%;background:var(--warn)"></i><i style="width:${pct(c.support)}%;background:var(--bad)"></i></div>
      <div class="rows">${[['ontrack', 'ok'], ['improving', 'warn'], ['support', 'bad']].map(([k, t]) => `<div class="rowi" style="padding:10px 0"><span class="pill ${t}">${STATUS[k][1]}</span><span class="grow"></span><b class="num">${c[k]} students</b><span class="muted num" style="width:44px;text-align:right">${Math.round(pct(c[k]))}%</span></div>`).join('')}</div>
    </div></section>
  </div>
  <div class="grid g-2">
    <section class="panel"><header><h2>Batch average over time</h2><span class="sub">Last 8 weeks</span></header><div class="body">${lineChart(batchTrend(), weeks(8), { min: 40, max: 80, step: 10, label: 'Batch average score' })}</div></section>
    <section class="panel"><header><h2>Topic-wise batch average</h2></header><div class="body">${topicAvg.map(([n, v]) => topicRow(n, v)).join('')}</div></section>
  </div>`;
}

/* ---------- overlays ---------- */
function drawer() {
  const d = S.drawer; if (!d) return '';
  if (d.kind === 'mat') {
    const m = MATERIALS.find((x) => x.id === d.id);
    return `<div class="scrim" data-a="closeDrawer"><aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="dr-t" data-stop="1"><header><div style="display:grid;gap:4px"><span class="tag" style="justify-self:start">${MTYPE[m.type][0]}</span><h2 id="dr-t">${esc(m.title)}</h2><p class="sub">${m.course} · ${m.meta}</p></div><button class="icon-btn" data-a="closeDrawer" aria-label="Close">${ic('x')}</button></header><div class="dbody">${matPreview(m)}</div><footer><button class="btn ghost" data-a="toast" data-v="Downloads work in the full LMS.">${ic('dl', 15)} Download</button><button class="btn primary" data-a="closeDrawer">Done</button></footer></aside></div>`;
  }
  if (d.kind === 'stu') {
    const s = students.find((x) => x.roll === d.id);
    return `<div class="scrim" data-a="closeDrawer"><aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="dr-t" data-stop="1"><header><div style="display:flex;gap:12px;align-items:center"><span class="avatar" style="width:42px;height:42px">${initials(s.name)}</span><div style="display:grid;gap:3px"><h2 id="dr-t">${s.name}</h2><span class="sub">${s.roll} · CSE 2nd year A</span></div></div><button class="icon-btn" data-a="closeDrawer" aria-label="Close">${ic('x')}</button></header>
    <div class="dbody">
      <div>${statusPill(s.status)}</div>
      <div class="kv"><div><b class="${s.att < 75 ? 'wrong' : ''}">${s.att}%</b><span>Attendance</span></div><div><b class="${s.avg < 50 ? 'wrong' : ''}">${s.avg}%</b><span>Average test score</span></div><div><b>${s.coding}%</b><span>Coding accuracy</span></div><div><b>${s.roadmap}%</b><span>Roadmap complete</span></div></div>
      <div><h3 style="margin-bottom:6px">Test scores, last 8 weeks</h3>${lineChart(s.trend, weeks(8), { min: 20, max: 100, step: 20, h: 180, label: 'Student score trend' })}</div>
      <div><h3 style="margin-bottom:4px">Weakest topics</h3>${s.weak.map(([n, v]) => topicRow(n, v)).join('')}</div>
      <div class="field"><label for="stu-note">Mentor note</label><input class="input" id="stu-note" placeholder="Add a note for this student"></div>
    </div>
    <footer><button class="btn ghost" data-a="toast" data-v="Message sent to ${esc(s.first)}.">${ic('chat', 15)} Message</button><button class="btn primary" data-a="toast" data-v="Remedial test on ${esc(s.weak[0][0])} assigned to ${esc(s.name)}.">Assign remedial test</button></footer></aside></div>`;
  }
  if (d.kind === 'newTest') {
    const tm = addDays(1).toISOString().slice(0, 10);
    const sup = students.filter((s) => s.status === 'support').length;
    return `<div class="scrim" data-a="closeDrawer"><aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="dr-t" data-stop="1"><header><div style="display:grid;gap:3px"><h2 id="dr-t">New test</h2><span class="sub">Questions are picked from the StarkForgeX question bank.</span></div><button class="icon-btn" data-a="closeDrawer" aria-label="Close">${ic('x')}</button></header>
    <form class="dbody" id="nt-form"><div class="form-grid">
      <div class="field full"><label for="nt-name">Test name</label><input class="input" id="nt-name" value="Time & work practice" required></div>
      <div class="field"><label for="nt-topic">Topic</label><select class="input" id="nt-topic">${['Aptitude', 'DSA', 'Java', 'SQL', 'Communication'].map((t) => `<option>${t}</option>`).join('')}</select></div>
      <div class="field"><label for="nt-date">Date</label><input class="input" id="nt-date" type="date" value="${tm}"></div>
      <div class="field"><label for="nt-q">Questions</label><input class="input" id="nt-q" type="number" min="5" max="50" value="15"></div>
      <div class="field"><label for="nt-dur">Duration (minutes)</label><input class="input" id="nt-dur" type="number" min="5" max="180" value="20"></div>
      <div class="field full"><label for="nt-who">Assign to</label><select class="input" id="nt-who"><option value="all">Whole section (${students.length} students)</option><option value="support">Students who need support (${sup})</option></select></div>
    </div></form>
    <footer><button class="btn ghost" data-a="closeDrawer">Cancel</button><button class="btn primary" data-a="createTest">Schedule test</button></footer></aside></div>`;
  }
  return '';
}

/* ---------- render ---------- */
const PAGES = { student: { home: sHome, courses: sCourses, test: sTest, materials: sMaterials, roadmap: sRoadmap, reports: sReports }, faculty: { home: fHome, students: fStudents, tests: fTests, attendance: fAttendance, reports: fReports } };
function render(scrollTop) {
  const root = $('#root');
  root.innerHTML = S.role ? shell(PAGES[S.role][S.page]()) + drawer() : login();
  if (scrollTop) window.scrollTo(0, 0);
  const f = $('#login-form'); if (f) f.addEventListener('submit', (e) => { e.preventDefault(); S.role = S.loginRole; S.page = 'home'; render(true); });
}
let toastT;
function toast(msg) {
  document.querySelectorAll('.toast').forEach((t) => t.remove());
  const el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status');
  el.innerHTML = `${ic('check', 16, 2.4)}<span>${esc(msg)}</span>`;
  document.body.appendChild(el); clearTimeout(toastT); toastT = setTimeout(() => el.remove(), 3200);
}

/* ---------- timer ---------- */
let tick = null;
function startTimer() {
  clearInterval(tick);
  tick = setInterval(() => {
    const t = S.test; if (t.status !== 'running') return clearInterval(tick);
    t.left--; t.taken++;
    const el = $('#timer');
    if (el) { el.querySelector('span').textContent = mmss(t.left); el.classList.toggle('low', t.left <= 60); }
    if (t.left <= 0) { submitTest(); toast('Time is up. Your test was submitted.'); }
  }, 1000);
}
function submitTest() { clearInterval(tick); S.test.status = 'done'; S.test.confirm = false; render(true); }

/* ---------- actions ---------- */
const A = {
  loginRole: (v) => { S.loginRole = v; render(); },
  logout: () => { clearInterval(tick); S.role = null; S.drawer = null; render(true); },
  switch: () => { S.role = S.role === 'student' ? 'faculty' : 'student'; S.loginRole = S.role; S.page = 'home'; S.drawer = null; render(true); },
  go: (v) => { S.page = v; S.drawer = null; render(true); },
  toast: (v) => toast(v),
  openCourse: (v) => { S.openCourse = v; S.page = 'courses'; render(true); },
  toggleCourse: (v) => { S.openCourse = S.openCourse === v ? null : v; render(); },
  startTest: () => { Object.assign(S.test, { status: 'running', answers: {}, marked: {}, cur: 0, left: 600, taken: 0, confirm: false }); S.page = 'test'; render(true); startTimer(); },
  answer: (v) => { S.test.answers[S.test.cur] = +v; render(); },
  qnav: (v) => { S.test.cur = Math.max(0, Math.min(9, S.test.cur + +v)); render(); },
  jump: (v) => { S.test.cur = +v; render(); },
  mark: () => { const t = S.test; t.marked[t.cur] = !t.marked[t.cur]; render(); },
  askSubmit: () => { S.test.confirm = true; render(); },
  closeConfirm: () => { S.test.confirm = false; render(); },
  submit: () => submitTest(),
  matFilter: (v) => { S.matFilter = v; render(); },
  openMat: (v) => { S.drawer = { kind: 'mat', id: v }; render(); },
  closeDrawer: () => { S.drawer = null; render(); },
  openStu: (v) => { S.drawer = { kind: 'stu', id: v }; render(); },
  stuFilter: (v) => { S.stuFilter = v; render(); },
  stuFilterGo: (v) => { S.stuFilter = v; S.page = 'students'; render(true); },
  newTest: () => { S.drawer = { kind: 'newTest' }; render(); },
  createTest: () => {
    const name = $('#nt-name').value.trim();
    if (!name) { $('#nt-name').focus(); toast('Give the test a name first.'); return; }
    const who = $('#nt-who').value, to = who === 'all' ? students.length : students.filter((s) => s.status === 'support').length;
    const date = new Date($('#nt-date').value + 'T09:00');
    S.tests.push({ name, topic: $('#nt-topic').value, date: isNaN(date) ? addDays(1) : date, status: 'scheduled', sub: 0, avg: 0, q: +$('#nt-q').value || 15, dur: +$('#nt-dur').value || 20, to, who: who === 'support' ? 'Needs-support group' : '' });
    S.drawer = null; S.page = 'tests'; render(true); toast(`${name} scheduled for ${to} students.`);
  },
  att: (v) => { const [r, p] = v.split('|'); S.att[r] = p === '1'; S.attSaved = false; render(); },
  attAll: () => { students.forEach((s) => (S.att[s.roll] = true)); S.attSaved = false; render(); },
  saveAtt: () => { S.attSaved = true; const p = students.filter((s) => S.att[s.roll]).length; render(); toast(`Attendance saved: ${p} present, ${students.length - p} absent.`); },
};
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-a]'); if (!t) return;
  if (t.classList.contains('scrim') && e.target.closest('[data-stop]')) return;
  e.preventDefault();
  A[t.dataset.a]?.(t.dataset.v, t, e);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && (S.drawer || S.test.confirm)) { S.drawer = null; S.test.confirm = false; render(); }
  if (e.key === 'Enter' && e.target.matches('tr[data-a]')) A[e.target.dataset.a](e.target.dataset.v);
});
document.addEventListener('input', (e) => {
  const k = e.target.dataset.in;
  if (k === 'mat') { S.matQuery = e.target.value; $('#mat-list').innerHTML = matList(); }
  if (k === 'stu') { S.stuQuery = e.target.value; $('#stu-rows').innerHTML = stuRows(); }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.dataset?.in === 'global') {
    const q = e.target.value.trim(); if (!q) return;
    if (S.role === 'student') { S.matQuery = q; S.matFilter = 'all'; S.page = 'materials'; } else { S.stuQuery = q; S.stuFilter = 'all'; S.page = 'students'; }
    render(true);
  }
});
render();
})();
