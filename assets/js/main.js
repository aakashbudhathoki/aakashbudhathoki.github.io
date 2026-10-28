/* main.js — Navigation, mobile menu, scroll animations, theme toggle, terminal */

/* ── Navigation scroll effect ── */
const nav        = document.querySelector('.nav');
const navToggle  = document.querySelector('.nav__toggle');
const navLinks   = document.querySelector('.nav__links');
const allLinks   = document.querySelectorAll('.nav__links a');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  highlightActiveSection();
}, { passive: true });

/* ── Mobile menu toggle ── */
navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

/* Close mobile menu when a link is clicked */
allLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle?.classList.remove('open');
    navLinks?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

/* ── Active section highlighting ── */
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    const id   = section.getAttribute('id');
    const link = document.querySelector(`.nav__links a[href="#${id}"]`);
    if (!link) return;
    const top  = section.offsetTop;
    const bot  = top + section.offsetHeight;
    link.classList.toggle('active', scrollPos >= top && scrollPos < bot);
  });
}

/* ── Intersection Observer for scroll-in animations ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 55);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll(
  '.fade-in, .timeline-item, .project-card, .cert-card'
).forEach(el => observer.observe(el));

/* ── Current year in footer ── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Initial active-link check on load ── */
highlightActiveSection();


/* ============================================================
   DARK / LIGHT MODE TOGGLE
   ============================================================ */
const themeToggle = document.getElementById('theme-toggle');

function getStoredTheme() {
  try { return localStorage.getItem('theme'); } catch { return null; }
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem('theme', theme); } catch {}
}

(function initTheme() {
  const stored = getStoredTheme();
  if (stored) {
    setTheme(stored);
  }
})();

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'light' ? 'dark' : 'light');
});


/* ============================================================
   INTERACTIVE TERMINAL
   ============================================================ */
const terminalInput  = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const terminalBody   = document.getElementById('terminal-body');

if (terminalInput) {
  const commandHistory = [];
  let historyIndex = -1;

  const commands = {
    help: () => [
      { type: 'heading', text: 'Available commands:' },
      { text: '  whoami      — Who is Aakash?' },
      { text: '  skills      — Technical skills' },
      { text: '  experience  — Work experience' },
      { text: '  education   — Academic background' },
      { text: '  projects    — Things I\'ve built' },
      { text: '  certs       — Certifications' },
      { text: '  contact     — Get in touch' },
      { text: '  blog        — Read my blog' },
      { text: '  clear       — Clear the terminal' },
      { text: '  date        — Current date' },
      { text: '  uptime      — How long I\'ve been at this' },
      { text: '  neofetch    — System info, sysadmin style' },
    ],

    whoami: () => [
      { type: 'heading', text: 'Aakash Budhathoki' },
      { type: 'accent', text: 'Junior Systems Administrator' },
      { text: '' },
      { text: 'Passionate about Linux environments and automation.' },
      { text: 'I transform academic theory into efficient IT operations —' },
      { text: 'writing Python scripts, securing systems, and ensuring uptime.' },
      { text: '' },
      { text: 'Location: Pepsicola, Kathmandu, Nepal' },
      { type: 'accent', text: 'Status: Available for opportunities' },
    ],

    skills: () => [
      { type: 'heading', text: 'Technical Skills' },
      { text: '' },
      { type: 'accent', text: '  OS            Linux (Ubuntu, CentOS), macOS, Windows Server' },
      { type: 'accent', text: '  Languages     Python, Bash, Shell Scripting' },
      { type: 'accent', text: '  Cloud         AWS EC2, NinjaOne RMM' },
      { type: 'accent', text: '  Networking    TCP/IP, DNS/BIND9, DNSSEC, Firewalls, Wireshark' },
      { type: 'accent', text: '  Data          Pandas, NumPy, Matplotlib, Scikit-learn' },
      { type: 'accent', text: '  Security      CIA Triad, IDS/IPS, MFA, Patch Management' },
      { type: 'accent', text: '  Tools         Let\'s Encrypt, Google Workspace, Zoho, cron, systemd' },
    ],

    experience: () => [
      { type: 'heading', text: 'Work Experience' },
      { text: '' },
      { type: 'accent', text: '  [Jun 2025 – Sep 2025]  Junior System Administrator' },
      { text: '  Genese Solutions — Lalitpur, Nepal' },
      { text: '  - Supported Linux, macOS, Windows environments' },
      { text: '  - Real-time monitoring via NinjaOne RMM' },
      { text: '  - Led IT onboarding & security awareness training' },
      { text: '' },
      { type: 'accent', text: '  [Jan 2024 – Apr 2024]  STEM Tutor' },
      { text: '  Self-Employed — Pepsicola, Kathmandu' },
      { text: '  - One-on-one tutoring in STEM subjects' },
    ],

    education: () => [
      { type: 'heading', text: 'Education' },
      { text: '' },
      { type: 'accent', text: '  [Apr 2021 – Apr 2025]  B.E. Computer Engineering' },
      { text: '  Kantipur Engineering College — Lalitpur, Nepal' },
      { text: '  - Linux systems, Python automation, TCP/IP networking' },
      { text: '  - Security principles, risk management, incident response' },
    ],

    projects: () => [
      { type: 'heading', text: 'Projects' },
      { text: '' },
      { type: 'accent', text: '  Linux System Health Monitor' },
      { text: '  Bash script for CPU, memory, disk, and service monitoring' },
      { text: '' },
      { type: 'accent', text: '  Automated Backup System' },
      { text: '  Shell-based backup with configurable retention & rotation' },
      { text: '' },
      { type: 'accent', text: '  DNS Lab with BIND9' },
      { text: '  Authoritative DNS server with DNSSEC on Ubuntu' },
      { text: '' },
      { type: 'accent', text: '  Python Data Analysis Pipeline' },
      { text: '  Pandas + NumPy pipeline with Matplotlib visualizations' },
    ],

    certs: () => [
      { type: 'heading', text: 'Certifications' },
      { text: '' },
      { type: 'accent', text: '  Certified in Cybersecurity (CC) — ISC2' },
      { type: 'accent', text: '  Linux Foundation Certified System Administrator (LFCS)' },
      { type: 'accent', text: '  Demystifying DNS — KodeKloud' },
      { type: 'accent', text: '  Network and Communications — KodeKloud' },
      { type: 'accent', text: '  Shell Scripts for Beginners — KodeKloud' },
      { type: 'accent', text: '  Learning Linux Basics Course and Labs — KodeKloud' },
    ],

    contact: () => [
      { type: 'heading', text: 'Get in Touch' },
      { text: '' },
      { type: 'accent', text: '  Email     aakashbudhathoki10@gmail.com' },
      { type: 'accent', text: '  GitHub    github.com/aakashbudhathoki' },
      { type: 'accent', text: '  LinkedIn  linkedin.com/in/aakash-budhathoki' },
      { type: 'accent', text: '  Phone     +977 9863800583' },
    ],

    blog: () => {
      window.location.href = '/blog/';
      return [{ type: 'system', text: 'Redirecting to blog...' }];
    },

    date: () => [
      { text: '  ' + new Date().toString() },
    ],

    uptime: () => {
      const start = new Date('2021-04-01');
      const now = new Date();
      const years = now.getFullYear() - start.getFullYear();
      const months = now.getMonth() - start.getMonth();
      const totalMonths = years * 12 + months;
      return [
        { text: '  Learning & building for ' + Math.floor(totalMonths / 12) + ' years, ' + (totalMonths % 12) + ' months' },
        { text: '  ...and counting.' },
      ];
    },

    neofetch: () => [
      { type: 'accent', text: '        .--.         aakash@portfolio' },
      { type: 'accent', text: '       |o_o |        -----------------' },
      { type: 'accent', text: '       |:_/ |        OS: Linux Enthusiast' },
      { type: 'accent', text: '      //   \\ \\       Host: Kathmandu, Nepal' },
      { type: 'accent', text: '     (|     | )      Kernel: Computer Engineering' },
      { type: 'accent', text: '    /\'\\_   _/`\\      Shell: Bash/Python' },
      { type: 'accent', text: '    \\___)=(___/      DE: Terminal > GUI' },
      { text: '' },
      { text: '  Role:    Junior Systems Administrator' },
      { text: '  Focus:   Linux, Automation, Security' },
      { text: '  Editor:  vim (obviously)' },
      { text: '  Status:  Available for opportunities' },
    ],

    clear: () => 'clear',
  };

  function addLine(text, type) {
    const p = document.createElement('p');
    p.classList.add('terminal__line');
    if (type === 'heading') p.classList.add('terminal__line--heading');
    else if (type === 'accent') p.classList.add('terminal__line--accent');
    else if (type === 'error') p.classList.add('terminal__line--error');
    else if (type === 'system') p.classList.add('terminal__line--system');
    p.textContent = text;
    terminalOutput.appendChild(p);
  }

  function addPromptLine(cmd) {
    const p = document.createElement('p');
    p.classList.add('terminal__line', 'terminal__line--prompt');
    p.innerHTML = '<span class="terminal__user">visitor</span>@<span class="terminal__host">portfolio</span>:~$ ' + escapeHtml(cmd);
    terminalOutput.appendChild(p);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function processCommand(input) {
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    commandHistory.unshift(cmd);
    historyIndex = -1;

    addPromptLine(input.trim());

    if (cmd === 'clear') {
      terminalOutput.innerHTML = '';
      return;
    }

    const handler = commands[cmd];
    if (handler) {
      const result = handler();
      if (result !== 'clear') {
        result.forEach(line => addLine(line.text, line.type));
      }
    } else {
      addLine('bash: ' + cmd + ': command not found. Type "help" for available commands.', 'error');
    }

    addLine('', null);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      processCommand(terminalInput.value);
      terminalInput.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = -1;
        terminalInput.value = '';
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      terminalOutput.innerHTML = '';
    }
  });

  terminalBody.addEventListener('click', () => {
    terminalInput.focus();
  });
}
