const body = document.body; const loader = document.querySelector('.loader'); window.addEventListener('load', () => setTimeout(() => { loader?.classList.add('done'); body.classList.remove('no-scroll') }, 450)); body.classList.add('no-scroll');
const progress = document.querySelector('.scroll-progress'), header = document.querySelector('.site-header'); function onScroll() { const max = document.documentElement.scrollHeight - innerHeight; progress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`; header.classList.toggle('scrolled', scrollY > 35); header.classList.remove('hide') } addEventListener('scroll', onScroll, { passive: true }); onScroll();
const menu = document.querySelector('.menu-toggle'), mobile = document.querySelector('.mobile-nav'); menu?.addEventListener('click', () => { const open = mobile.classList.toggle('open'); menu.setAttribute('aria-expanded', open); mobile.setAttribute('aria-hidden', !open) }); mobile?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { mobile.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); mobile.setAttribute('aria-hidden', 'true') }));
const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }), { threshold: .12 }); document.querySelectorAll('.reveal-up,.reveal-left').forEach((el, i) => { el.style.transitionDelay = `${Math.min(i % 5, 4) * 70}ms`; observer.observe(el) });
const cursor = document.querySelector('.cursor'); if (cursor && matchMedia('(pointer:fine)').matches) { addEventListener('mousemove', e => { cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px` }); document.querySelectorAll('a,button,.service-panel,.commitment-card').forEach(el => { el.addEventListener('mouseenter', () => cursor.classList.add('active')); el.addEventListener('mouseleave', () => cursor.classList.remove('active')) }) }
if (matchMedia('(pointer:fine)').matches) { document.querySelectorAll('.magnetic').forEach(el => { el.addEventListener('mousemove', e => { const r = el.getBoundingClientRect(), x = (e.clientX - r.left - r.width / 2) * .1, y = (e.clientY - r.top - r.height / 2) * .1; el.style.transform = `translate(${x}px,${y}px)` }); el.addEventListener('mouseleave', () => el.style.transform = '') }) }
const heroMedia = document.querySelector('.hero-media'); addEventListener('scroll', () => { if (heroMedia && scrollY < innerHeight) heroMedia.style.transform = `scale(1.08) translateY(${scrollY * .045}px)` }, { passive: true }); if (matchMedia('(prefers-reduced-motion: reduce)').matches) body.classList.add('reduced-motion');

// Project filters + documentation lightbox
const projectCards = [...document.querySelectorAll('.project-card')];
const projectFilters = [...document.querySelectorAll('.project-filter')];
projectFilters.forEach(btn => btn.addEventListener('click', () => {
  const filter = btn.dataset.filter;
  projectFilters.forEach(b => b.classList.toggle('active', b === btn));
  projectCards.forEach((card, i) => {
    const show = filter === 'all' || card.dataset.category === filter;
    card.classList.toggle('is-hidden', !show);
    if (show) { card.style.animation = `projectIn .55s ${Math.min(i, 5) * 45}ms both` }
  });
}));

const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-image');
const lightboxTitle = document.querySelector('.lightbox-title');
const lightboxCounter = document.querySelector('.lightbox-counter');
const lightboxThumbs = document.querySelector('.lightbox-thumbs');
let currentGallery = [], currentIndex = 0;
function renderLightbox() {
  if (!currentGallery.length) return;
  lightboxImg.src = currentGallery[currentIndex];
  lightboxImg.alt = `Dokumentasi ${lightboxTitle.textContent} ${currentIndex + 1}`;
  lightboxCounter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(currentGallery.length).padStart(2, '0')}`;
  lightboxThumbs.innerHTML = currentGallery.map((src, i) => `<button type="button" class="${i === currentIndex ? 'active' : ''}" data-index="${i}" aria-label="Lihat foto ${i + 1}"><img src="${src}" alt="" loading="lazy"></button>`).join('');
  lightboxThumbs.querySelectorAll('button').forEach(b => b.addEventListener('click', () => { currentIndex = Number(b.dataset.index); renderLightbox() }));
}
function openLightbox(card) {
  currentGallery = card.dataset.gallery.split('|').filter(Boolean);
  currentIndex = 0;
  lightboxTitle.textContent = card.dataset.title;
  renderLightbox();
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
}
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
  setTimeout(() => { lightboxImg.src = '' }, 300);
}
projectCards.forEach(card => card.querySelector('.project-image')?.addEventListener('click', () => openLightbox(card)));
document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
document.querySelector('.lightbox-backdrop')?.addEventListener('click', closeLightbox);
document.querySelector('.lightbox-prev')?.addEventListener('click', () => { if (currentGallery.length) { currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length; renderLightbox() } });
document.querySelector('.lightbox-next')?.addEventListener('click', () => { if (currentGallery.length) { currentIndex = (currentIndex + 1) % currentGallery.length; renderLightbox() } });
addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft' && currentGallery.length) { currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length; renderLightbox() }
  if (e.key === 'ArrowRight' && currentGallery.length) { currentIndex = (currentIndex + 1) % currentGallery.length; renderLightbox() }
});
