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

  // Night Owl color helpers
  const c = {
    green:  '#addb67',
    blue:   '#82aaff',
    cyan:   '#7fdbca',
    purple: '#c792ea',
    yellow: '#ecc48d',
    orange: '#f78c6c',
    red:    '#ef5350',
    fg:     '#d6deeb',
    dim:    '#637777',
    white:  '#ffffff',
  };

  function span(color, text) {
    return '<span style="color:' + color + '">' + esc(text) + '</span>';
  }

  function esc(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  const commands = {
    help: () => [
      { html: span(c.purple, 'Available commands:') },
      { html: '  ' + span(c.cyan, 'whoami') + span(c.dim, '      — ') + span(c.fg, 'Who is Aakash?') },
      { html: '  ' + span(c.cyan, 'skills') + span(c.dim, '      — ') + span(c.fg, 'Technical skills') },
      { html: '  ' + span(c.cyan, 'experience') + span(c.dim, '  — ') + span(c.fg, 'Work experience') },
      { html: '  ' + span(c.cyan, 'education') + span(c.dim, '   — ') + span(c.fg, 'Academic background') },
      { html: '  ' + span(c.cyan, 'projects') + span(c.dim, '    — ') + span(c.fg, 'Things I\'ve built') },
      { html: '  ' + span(c.cyan, 'certs') + span(c.dim, '       — ') + span(c.fg, 'Certifications') },
      { html: '  ' + span(c.cyan, 'contact') + span(c.dim, '     — ') + span(c.fg, 'Get in touch') },
      { html: '  ' + span(c.cyan, 'blog') + span(c.dim, '        — ') + span(c.fg, 'Read my blog') },
      { html: '  ' + span(c.cyan, 'neofetch') + span(c.dim, '    — ') + span(c.fg, 'System info, sysadmin style') },
      { html: '  ' + span(c.cyan, 'date') + span(c.dim, '        — ') + span(c.fg, 'Current date') },
      { html: '  ' + span(c.cyan, 'uptime') + span(c.dim, '      — ') + span(c.fg, 'How long I\'ve been at this') },
      { html: '  ' + span(c.cyan, 'clear') + span(c.dim, '       — ') + span(c.fg, 'Clear the terminal') },
    ],

    whoami: () => [
      { html: '' },
      { html: span(c.green, '  Aakash Budhathoki') },
      { html: span(c.purple, '  Junior Systems Administrator') },
      { html: '' },
      { html: span(c.fg, '  Passionate about Linux environments and automation.') },
      { html: span(c.fg, '  I transform academic theory into efficient IT operations \u2014') },
      { html: span(c.fg, '  writing Python scripts, securing systems, and ensuring uptime.') },
      { html: '' },
      { html: span(c.yellow, '  Location') + span(c.dim, ': ') + span(c.fg, 'Pepsicola, Kathmandu, Nepal') },
      { html: span(c.yellow, '  Status') + span(c.dim, ':   ') + span(c.green, 'Available for opportunities') },
    ],

    skills: () => [
      { html: '' },
      { html: span(c.purple, '  Technical Skills') },
      { html: span(c.dim, '  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500') },
      { html: span(c.yellow, '  OS') + span(c.dim, ' ............. ') + span(c.fg, 'Linux (Ubuntu, CentOS), macOS, Windows Server') },
      { html: span(c.yellow, '  Languages') + span(c.dim, ' .... ') + span(c.fg, 'Python, Bash, Shell Scripting') },
      { html: span(c.yellow, '  Cloud') + span(c.dim, ' ........ ') + span(c.fg, 'AWS EC2, NinjaOne RMM') },
      { html: span(c.yellow, '  Networking') + span(c.dim, ' ... ') + span(c.fg, 'TCP/IP, DNS/BIND9, DNSSEC, Firewalls') },
      { html: span(c.yellow, '  Data') + span(c.dim, ' ......... ') + span(c.fg, 'Pandas, NumPy, Matplotlib, Scikit-learn') },
      { html: span(c.yellow, '  Security') + span(c.dim, ' ..... ') + span(c.fg, 'CIA Triad, IDS/IPS, MFA, Patch Management') },
      { html: span(c.yellow, '  Tools') + span(c.dim, ' ........ ') + span(c.fg, 'Let\'s Encrypt, Google Workspace, Zoho, systemd') },
    ],

    experience: () => [
      { html: '' },
      { html: span(c.purple, '  Work Experience') },
      { html: span(c.dim, '  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500') },
      { html: span(c.orange, '  Jun 2025 \u2013 Sep 2025') },
      { html: span(c.green, '  Junior System Administrator') + span(c.dim, ' @ ') + span(c.blue, 'Genese Solutions') },
      { html: span(c.dim, '  \u25b8 ') + span(c.fg, 'Supported Linux, macOS, Windows environments') },
      { html: span(c.dim, '  \u25b8 ') + span(c.fg, 'Real-time monitoring via NinjaOne RMM') },
      { html: span(c.dim, '  \u25b8 ') + span(c.fg, 'Led IT onboarding & security awareness training') },
      { html: '' },
      { html: span(c.orange, '  Jan 2024 \u2013 Apr 2024') },
      { html: span(c.green, '  STEM Tutor') + span(c.dim, ' @ ') + span(c.blue, 'Self-Employed, Kathmandu') },
      { html: span(c.dim, '  \u25b8 ') + span(c.fg, 'One-on-one tutoring in STEM subjects') },
    ],

    education: () => [
      { html: '' },
      { html: span(c.purple, '  Education') },
      { html: span(c.dim, '  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500') },
      { html: span(c.orange, '  Apr 2021 \u2013 Apr 2025') },
      { html: span(c.green, '  B.E. Computer Engineering') },
      { html: span(c.blue, '  Kantipur Engineering College') + span(c.dim, ' \u2014 Lalitpur, Nepal') },
      { html: span(c.dim, '  \u25b8 ') + span(c.fg, 'Linux systems, Python automation, TCP/IP networking') },
      { html: span(c.dim, '  \u25b8 ') + span(c.fg, 'Security principles, risk management, incident response') },
    ],

    projects: () => [
      { html: '' },
      { html: span(c.purple, '  Projects') },
      { html: span(c.dim, '  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500') },
      { html: span(c.green, '  \u25cf ') + span(c.cyan, 'Linux System Health Monitor') },
      { html: span(c.fg, '    Bash script for CPU, memory, disk, and service monitoring') },
      { html: '' },
      { html: span(c.green, '  \u25cf ') + span(c.cyan, 'Automated Backup System') },
      { html: span(c.fg, '    Shell-based backup with configurable retention & rotation') },
      { html: '' },
      { html: span(c.green, '  \u25cf ') + span(c.cyan, 'DNS Lab with BIND9') },
      { html: span(c.fg, '    Authoritative DNS server with DNSSEC on Ubuntu') },
      { html: '' },
      { html: span(c.green, '  \u25cf ') + span(c.cyan, 'Python Data Analysis Pipeline') },
      { html: span(c.fg, '    Pandas + NumPy pipeline with Matplotlib visualizations') },
    ],

    certs: () => [
      { html: '' },
      { html: span(c.purple, '  Certifications') },
      { html: span(c.dim, '  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500') },
      { html: span(c.green, '  \u2713 ') + span(c.fg, 'Certified in Cybersecurity (CC)') + span(c.dim, ' \u2014 ') + span(c.blue, 'ISC2') },
      { html: span(c.green, '  \u2713 ') + span(c.fg, 'Linux Foundation Certified Sys Admin (LFCS)') + span(c.dim, ' \u2014 ') + span(c.blue, 'Linux Foundation') },
      { html: span(c.green, '  \u2713 ') + span(c.fg, 'Demystifying DNS') + span(c.dim, ' \u2014 ') + span(c.blue, 'KodeKloud') },
      { html: span(c.green, '  \u2713 ') + span(c.fg, 'Network and Communications') + span(c.dim, ' \u2014 ') + span(c.blue, 'KodeKloud') },
      { html: span(c.green, '  \u2713 ') + span(c.fg, 'Shell Scripts for Beginners') + span(c.dim, ' \u2014 ') + span(c.blue, 'KodeKloud') },
      { html: span(c.green, '  \u2713 ') + span(c.fg, 'Learning Linux Basics Course and Labs') + span(c.dim, ' \u2014 ') + span(c.blue, 'KodeKloud') },
    ],

    contact: () => [
      { html: '' },
      { html: span(c.purple, '  Get in Touch') },
      { html: span(c.dim, '  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500') },
      { html: span(c.yellow, '  Email') + span(c.dim, ' ..... ') + span(c.cyan, 'aakashbudhathoki10@gmail.com') },
      { html: span(c.yellow, '  GitHub') + span(c.dim, ' .... ') + span(c.cyan, 'github.com/aakashbudhathoki') },
      { html: span(c.yellow, '  LinkedIn') + span(c.dim, ' .. ') + span(c.cyan, 'linkedin.com/in/aakash-budhathoki') },
      { html: span(c.yellow, '  Phone') + span(c.dim, ' ..... ') + span(c.cyan, '+977 9863800583') },
    ],

    blog: () => {
      window.location.href = '/blog/';
      return [{ html: span(c.dim, '  Redirecting to blog...') }];
    },

    date: () => [
      { html: span(c.fg, '  ' + new Date().toString()) },
    ],

    uptime: () => {
      const start = new Date('2021-04-01');
      const now = new Date();
      const years = now.getFullYear() - start.getFullYear();
      const months = now.getMonth() - start.getMonth();
      const totalMonths = years * 12 + months;
      return [
        { html: span(c.fg, '  Learning & building for ') + span(c.green, Math.floor(totalMonths / 12) + ' years, ' + (totalMonths % 12) + ' months') },
        { html: span(c.dim, '  ...and counting.') },
      ];
    },

    neofetch: () => [
      { html: span(c.cyan, '        .--.       ') + span(c.green, 'aakash') + span(c.dim, '@') + span(c.blue, 'portfolio') },
      { html: span(c.cyan, '       |o_o |      ') + span(c.dim, '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500') },
      { html: span(c.cyan, '       |:_/ |      ') + span(c.yellow, 'OS') + span(c.dim, ': ') + span(c.fg, 'Linux Enthusiast') },
      { html: span(c.cyan, '      //   \\ \\     ') + span(c.yellow, 'Host') + span(c.dim, ': ') + span(c.fg, 'Kathmandu, Nepal') },
      { html: span(c.cyan, '     (|     | )    ') + span(c.yellow, 'Kernel') + span(c.dim, ': ') + span(c.fg, 'Computer Engineering') },
      { html: span(c.cyan, '    /\'\\_   _/`\\    ') + span(c.yellow, 'Shell') + span(c.dim, ': ') + span(c.fg, 'Bash/Python') },
      { html: span(c.cyan, '    \\___)=(___/    ') + span(c.yellow, 'DE') + span(c.dim, ': ') + span(c.fg, 'Terminal > GUI') },
      { html: '' },
      { html: '  ' + span(c.yellow, 'Role') + span(c.dim, ':    ') + span(c.fg, 'Junior Systems Administrator') },
      { html: '  ' + span(c.yellow, 'Focus') + span(c.dim, ':   ') + span(c.fg, 'Linux, Automation, Security') },
      { html: '  ' + span(c.yellow, 'Editor') + span(c.dim, ':  ') + span(c.fg, 'vim ') + span(c.dim, '(obviously)') },
      { html: '  ' + span(c.yellow, 'Status') + span(c.dim, ':  ') + span(c.green, 'Available for opportunities') },
      { html: '' },
      { html: '  ' + ['#011627','#1d3b53','#637777','#7fdbca','#82aaff','#addb67','#c792ea','#ecc48d'].map(cl => '<span style="background:' + cl + '">\u00a0\u00a0</span>').join('') },
    ],

    clear: () => 'clear',
  };

  function addHtmlLine(html) {
    const p = document.createElement('p');
    p.classList.add('terminal__line');
    p.innerHTML = html;
    terminalOutput.appendChild(p);
  }

  function addPromptLine(cmd) {
    const p = document.createElement('p');
    p.classList.add('terminal__line');
    p.innerHTML = '<span style="color:#addb67;font-weight:500">visitor</span><span style="color:#637777">@</span><span style="color:#82aaff;font-weight:500">portfolio</span><span style="color:#637777">:</span><span style="color:#c792ea">~</span><span style="color:#637777">$ </span><span style="color:#d6deeb">' + esc(cmd) + '</span>';
    terminalOutput.appendChild(p);
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
        result.forEach(line => addHtmlLine(line.html));
      }
    } else {
      addHtmlLine(span(c.red, 'bash: ' + cmd + ': command not found.') + ' ' + span(c.dim, 'Type "help" for available commands.'));
    }

    addHtmlLine('');
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
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = terminalInput.value.trim().toLowerCase();
      if (partial) {
        const match = Object.keys(commands).find(k => k.startsWith(partial));
        if (match) terminalInput.value = match;
      }
    }
  });

  terminalBody.addEventListener('click', () => {
    terminalInput.focus();
  });
}
