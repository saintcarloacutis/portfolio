// Initialize Lucide Icons
lucide.createIcons();

// Web Audio Crystalline UI Synth (Zero external dependencies)
let soundEnabled = true;
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function playGlassChime(freq = 680, duration = 0.08) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new AudioCtx();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.35, audioCtx.currentTime + duration);
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

document.getElementById('soundToggle').addEventListener('click', (e) => {
  soundEnabled = !soundEnabled;
  e.currentTarget.style.opacity = soundEnabled ? '1' : '0.45';
  if (soundEnabled) playGlassChime(820, 0.1);
});

// Cursor Follower Orb & Specular Card Tracking
const cursorOrb = document.getElementById('cursorOrb');
window.addEventListener('mousemove', (e) => {
  cursorOrb.style.left = `${e.clientX}px`;
  cursorOrb.style.top = `${e.clientY}px`;
});

const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    const rotateY = ((x / rect.width) - 0.5) * 7;
    const rotateX = ((y / rect.height) - 0.5) * -7;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
});

// Dynamic Island Theme Switcher
const themeDots = document.querySelectorAll('.theme-dot');
themeDots.forEach((dot) => {
  dot.addEventListener('click', () => {
    playGlassChime(740, 0.11);
    themeDots.forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
    const choice = dot.getAttribute('data-theme-choice');
    if (choice === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', choice);
    }
  });
});

// Interactive 3D Hero Prism Mode Cycling
const prismModes = [
  {
    badge: 'Node 01 / 04',
    title: '3D Open-World Game Dev',
    desc: 'Unity • Unreal Engine • Low-Poly Floating Realms',
    icon: 'cpu'
  },
  {
    badge: 'Node 02 / 04',
    title: 'System Analyst & Architect',
    desc: 'ERD Schemas • Data Flow Diagrams • Capstone Evaluation',
    icon: 'git-branch'
  },
  {
    badge: 'Node 03 / 04',
    title: 'Full-Stack Web Engineering',
    desc: 'Django • Python • PHP • Relational MySQL Databases',
    icon: 'database'
  },
  {
    badge: 'Node 04 / 04',
    title: 'Network Recon & Combat Logic',
    desc: 'WHOIS / DNSDumpster • ZZZ Disorder Theorycrafting',
    icon: 'shield'
  }
];

let currentPrismIndex = 0;
document.getElementById('prismTrigger').addEventListener('click', () => {
  playGlassChime(920, 0.12);
  currentPrismIndex = (currentPrismIndex + 1) % prismModes.length;
  const mode = prismModes[currentPrismIndex];
  document.getElementById('prismModeBadge').textContent = mode.badge;
  document.getElementById('prismTitle').textContent = mode.title;
  document.getElementById('prismDesc').textContent = mode.desc;
  const iconContainer = document.getElementById('prismIcon');
  iconContainer.setAttribute('data-lucide', mode.icon);
  lucide.createIcons();
});

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    playGlassChime(620, 0.08);
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    projectCards.forEach((card) => {
      const cat = card.getAttribute('data-category');
      if (filter === 'all' || filter === cat) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// iOS 27 Sheet Project Modal Data
const projectDetails = {
  csfrontier: {
    title: 'CSFRONTIER — 3D Educational Capstone',
    tags: ['Unity 3D', 'C#', 'System Analyst', 'ERD & DFD', 'Blender Low-Poly'],
    summary: 'A 3D open-world educational game designed at STI West Negros University to gamify core computer science concepts across stylized floating island biomes.',
    bullets: [
      'Served as Lead System Analyst authoring complete Entity Relationship Diagrams (ERD), Data Flow Diagrams (DFD), and evaluation instruments.',
      'Designed 3D low-poly floating island arenas featuring medieval wizard towers, Python-themed castles, and hollowed giant trees.',
      'Engineered interactive coding challenges and quest progression state persistence.'
    ]
  },
  cavefsm: {
    title: '3D Cave Finite State Machine Puzzle',
    tags: ['Unity 3D', 'C#', 'CaveFSM.cs', 'RuneTrigger.cs', 'OreTrap.cs'],
    summary: 'An atmospheric 3D subterranean puzzle level demonstrating clean Finite State Machine architecture and modular trigger interaction.',
    bullets: [
      'Architected deterministic state transitions inside CaveFSM.cs and centralized level state inside GameManager.cs.',
      'Implemented interactive proximity and collision scripts including RuneTrigger.cs and OreTrap.cs.',
      'Optimized visual feedback loops for player puzzle solving.'
    ]
  },
  morphdash: {
    title: 'Morph Dash — 2D Scale-Shifting Game',
    tags: ['Unity 2D', 'C#', 'itch.io Release', 'Academic Game Jam'],
    summary: 'Created and published for an academic game jam centered on the theme of growing and shrinking.',
    bullets: [
      'Built dynamic character scale transformation mechanics affecting jump arcs, mass, and tight corridor navigation.',
      'Packaged, compiled, and deployed the standalone executable archive to itch.io with live playtesting feedback.'
    ]
  },
  velocity: {
    title: 'Velocity Elite Rentals — Full-Stack Platform',
    tags: ['Django', 'Python', 'PHP', 'MySQL (XAMPP)', 'Git / GitHub'],
    summary: 'End-to-end vehicle fleet and rental management system backed by relational database schemas.',
    bullets: [
      'Engineered backend views and ORM models in Django alongside MySQL database tables via XAMPP.',
      'Built administrative dashboards for fleet status monitoring, customer reservations, and rental history.',
      'Maintained clean version control and repository workflows on GitHub.'
    ]
  }
};

const modal = document.getElementById('projectModal');
projectCards.forEach((card) => {
  card.addEventListener('click', () => {
    playGlassChime(780, 0.1);
    const key = card.getAttribute('data-project');
    const data = projectDetails[key];
    if (!data) return;

    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalSummary').textContent = data.summary;
    document.getElementById('modalTags').innerHTML = data.tags
      .map(t => `<span class="glass-tag">${t}</span>`)
      .join('');
    document.getElementById('modalBullets').innerHTML = data.bullets
      .map(b => `<li>${b}</li>`)
      .join('');

    modal.classList.add('open');
  });
});

document.getElementById('closeModalBtn').addEventListener('click', () => {
  playGlassChime(520, 0.08);
  modal.classList.remove('open');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('open');
});

// Contact Form Feedback
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  playGlassChime(880, 0.15);
  const btn = e.target.querySelector('button[type="submit"] span');
  btn.textContent = 'Transmission Received ✓';
  e.target.reset();
  setTimeout(() => {
    btn.textContent = 'Send Spatial Ping';
  }, 3200);
});