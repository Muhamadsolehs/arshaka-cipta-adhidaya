const body=document.body;
const loader=document.querySelector('.loader');
window.addEventListener('load',()=>{setTimeout(()=>{loader?.classList.add('done');body.classList.remove('no-scroll')},500)});
body.classList.add('no-scroll');

const progress=document.querySelector('.scroll-progress');
const header=document.querySelector('.site-header');
let lastY=0;
function onScroll(){
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=`${max>0?(scrollY/max)*100:0}%`;
  header.classList.toggle('scrolled',scrollY>35);
  if(scrollY>180 && scrollY>lastY) header.classList.add('hide'); else header.classList.remove('hide');
  lastY=scrollY;
}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();

const menu=document.querySelector('.menu-toggle'), mobile=document.querySelector('.mobile-nav');
menu?.addEventListener('click',()=>{const open=mobile.classList.toggle('open');menu.setAttribute('aria-expanded',open);mobile.setAttribute('aria-hidden',!open)});
mobile?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('open');menu.setAttribute('aria-expanded','false')}));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.13});
document.querySelectorAll('.reveal-up,.reveal-left').forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i%5,4)*70}ms`;observer.observe(el)});

const counters=document.querySelectorAll('[data-count]');
const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target;const target=Number(el.dataset.count);const start=performance.now();const duration=1100;function tick(now){const p=Math.min((now-start)/duration,1);const eased=1-Math.pow(1-p,4);el.textContent=Math.floor(target*eased);if(p<1)requestAnimationFrame(tick);else el.textContent=target}requestAnimationFrame(tick);counterObserver.unobserve(el)}),{threshold:.7});
counters.forEach(c=>counterObserver.observe(c));

const filterButtons=document.querySelectorAll('.filters button');const projects=document.querySelectorAll('.project');
filterButtons.forEach(btn=>btn.addEventListener('click',()=>{filterButtons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const filter=btn.dataset.filter;projects.forEach((p,i)=>{const show=filter==='all'||p.dataset.category===filter;if(show){p.classList.remove('is-hidden');p.animate([{opacity:.15,transform:'translateY(15px)'},{opacity:1,transform:'translateY(0)'}],{duration:450,delay:i*45,easing:'cubic-bezier(.2,.7,.2,1)'})}else p.classList.add('is-hidden')})}));

const cursor=document.querySelector('.cursor');
if(cursor && matchMedia('(pointer:fine)').matches){let mx=0,my=0,cx=0,cy=0;window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.left=`${mx}px`;cursor.style.top=`${my}px`});document.querySelectorAll('a,button,.project,.service').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('active'));el.addEventListener('mouseleave',()=>cursor.classList.remove('active'))})}

if(matchMedia('(pointer:fine)').matches){document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)*.12;const y=(e.clientY-r.top-r.height/2)*.12;el.style.transform=`translate(${x}px,${y}px)`});el.addEventListener('mouseleave',()=>el.style.transform='')})}

const heroMedia=document.querySelector('.hero-media');
window.addEventListener('scroll',()=>{if(heroMedia && scrollY<innerHeight) heroMedia.style.transform=`scale(1.08) translateY(${scrollY*.045}px)`},{passive:true});

const reduce=matchMedia('(prefers-reduced-motion: reduce)');if(reduce.matches)body.classList.add('reduced-motion');
