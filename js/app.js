/* ---- Navbar scroll effect ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

/* ---- Active nav link ---- */
function updateActiveNav() {
  const sections = ['home', 'sobre', 'portfolio', 'contato'];
  const scrollY = window.scrollY + 100;
  sections.forEach(id => {
    const el = document.getElementById(id);
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!el || !link) return;
    const top = el.offsetTop;
    const bottom = top + el.offsetHeight;
    link.classList.toggle('active', scrollY >= top && scrollY < bottom);
  });
}

/* ---- Hamburger / Mobile menu ---- */
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

hamburgerBtn.addEventListener('click', () => {
  hamburgerBtn.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

function closeMobile() {
  hamburgerBtn.classList.remove('open');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

/* ---- Scroll reveal ---- */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

/* ---- Portfolio filters ---- */
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.portfolio-item').forEach(item => {
      const cat = item.dataset.category;
      const show = filter === 'all' || cat === filter;
      item.style.display = show ? 'block' : 'none';
    });
  });
});

/* ---- Portfolio modal ---- */
const modalOverlay = document.getElementById('modalOverlay');

document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('click', () => {
    const title = item.dataset.title || 'Trabalho';
    const desc = item.dataset.desc || 'Descrição do trabalho.';
    const tags = item.dataset.tags || '';
    const cat = item.dataset.category || '';
    const emojiMap = {
      social: '📲',
      branding: '✏️',
      eventos: '🎉',
    };
    document.getElementById('modalTag').textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDesc').textContent = desc;
    document.getElementById('modalImgEmoji').textContent = emojiMap[cat] || '🎨';

    // Chips de tags
    const metaEl = document.getElementById('modalMeta');
    metaEl.innerHTML = '';
    tags.split(',').forEach(tag => {
      if (!tag.trim()) return;
      const chip = document.createElement('span');
      chip.className = 'modal-chip';
      chip.textContent = tag.trim();
      metaEl.appendChild(chip);
    });

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal(e) {
  if (e && e.target !== modalOverlay) return;
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ESC fecha modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    modalOverlay.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ---- Formulário ---- */
function handleFormSubmit(btn) {
  const inputs = btn.closest('.contato-form').querySelectorAll('.form-input, .form-textarea');
  let valid = true;
  inputs.forEach(i => {
    if (!i.value.trim()) { i.style.borderColor = 'rgba(255,100,100,0.5)'; valid = false; }
    else i.style.borderColor = '';
  });
  if (!valid) return;
  btn.textContent = 'Enviado! ✓';
  btn.style.background = '#25a56a';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Enviar mensagem →';
    btn.style.background = '';
    btn.disabled = false;
    inputs.forEach(i => i.value = '');
  }, 3000);
}