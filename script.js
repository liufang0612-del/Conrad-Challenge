// 简单的平滑滚动（小交互）
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href.length>1){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
    }
  })
});

// Timeline reveal using IntersectionObserver
function initTimelineObserver(){
  const items = document.querySelectorAll('.timeline-item');
  if(!items.length) return;
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
      }
    });
  },{root:null,rootMargin:'0px 0px -10% 0px',threshold:0.15});
  items.forEach(i=>obs.observe(i));
}

// Image carousel: show 4 images, auto-advance left every 5s and loop by one slide (25%)
function initImageCarousel(){
  const track = document.querySelector('.carousel-track');
  if(!track) return;
  let isTransitioning = false;
  function next(){
    if(isTransitioning) return;
    isTransitioning = true;
    track.style.transition = 'transform 600ms ease';
    track.style.transform = 'translateX(-25%)';
  }
  track.addEventListener('transitionend', ()=>{
    // move first slide to end and reset transform
    track.style.transition = 'none';
    track.appendChild(track.firstElementChild);
    track.style.transform = 'translateX(0)';
    // force reflow to clear transition style
    void track.offsetWidth;
    isTransitioning = false;
  });
  let timer = setInterval(next, 3000);
  // pause on hover
  const wrapper = track.parentElement;
  wrapper.addEventListener('mouseenter', ()=> clearInterval(timer));
  wrapper.addEventListener('mouseleave', ()=> timer = setInterval(next, 3000));

  // quick health-check: mark slides with missing images
  function checkCarouselImages(){
    const slides = track.querySelectorAll('.slide');
    slides.forEach(s=>{
      const img = s.querySelector('img');
      if(!img) return;
      // if not yet loaded, attach error handler
      if(!img.complete){
        img.addEventListener('error', ()=> s.classList.add('missing'));
        img.addEventListener('load', ()=> s.classList.remove('missing'));
      } else {
        if(img.naturalWidth === 0) s.classList.add('missing');
      }
    });
    const missing = track.querySelectorAll('.slide.missing');
    if(missing.length) console.warn('Missing carousel images:', missing.length);
  }
  // run once at init and after any rotation
  checkCarouselImages();
  track.addEventListener('transitionend', checkCarouselImages);
}

document.addEventListener('DOMContentLoaded', ()=>{
  initTimelineObserver();
  initImageCarousel();
});
