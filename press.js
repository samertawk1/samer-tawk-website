(()=>{
const videoLinks=document.querySelectorAll('[data-featured-video]');
if(videoLinks.length){
 const dialog=document.createElement('dialog');
 dialog.className='featured-video-dialog';
 dialog.setAttribute('aria-label','Featured interview');
 dialog.innerHTML='<button class="featured-video-close" type="button" aria-label="Close video">Close ×</button><div class="featured-video-player"></div><a class="featured-youtube-link" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>';
 document.body.append(dialog);
 const player=dialog.querySelector('.featured-video-player');
 let trigger;
 videoLinks.forEach(link=>link.addEventListener('click',event=>{
  if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  event.preventDefault();trigger=link;
  const iframe=document.createElement('iframe');
  iframe.src='https://www.youtube.com/embed/'+link.dataset.featuredVideo+'?autoplay=1&playsinline=1';
  iframe.title=link.querySelector('img').alt;
  iframe.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';
  iframe.allowFullscreen=true;
  iframe.referrerPolicy='strict-origin-when-cross-origin';
  player.replaceChildren(iframe);
  dialog.querySelector('.featured-youtube-link').href=link.href;
  dialog.showModal();
 }));
 dialog.querySelector('button').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
 dialog.addEventListener('close',()=>{player.replaceChildren();trigger?.focus({preventScroll:true})});
}
const menu=document.querySelector('.menu'),nav=document.querySelector('#nav');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',open);nav.classList.toggle('open',open)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}});
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
if(reduced.matches||!('IntersectionObserver' in window))return;
document.body.classList.add('press-motion');
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
function revealOnce(selector,offset){
 const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');reveal.unobserve(entry.target)}}),{rootMargin:'0px 0px -'+Math.round(innerHeight*offset/100)+'px 0px',threshold:0});
 document.querySelectorAll(selector).forEach(el=>reveal.observe(el));
}
revealOnce('#media-story',50);
revealOnce('.press-mountain-transition',30);
let frame=0;const hero=document.querySelector('.press-hero');
function update(){frame=0;if(reduced.matches)return;const box=hero.getBoundingClientRect();if(box.bottom>0)hero.style.setProperty('--drift',Math.min(40,Math.max(0,-box.top*.08))+'px')}
addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(update)},{passive:true});
})();
