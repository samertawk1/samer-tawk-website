(()=>{
const menu=document.querySelector('.menu'),nav=document.querySelector('header nav');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
const dialog=document.getElementById('mtv-dialog'),mtv=document.getElementById('mtv-video');
document.querySelector('[data-open-mtv]').addEventListener('click',()=>{dialog.showModal();mtv.play().catch(()=>{})});
document.querySelector('.close-video').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>mtv.pause());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}});
// Keep the supplied poster until the viewer starts the talk.
const tedx=document.getElementById('tedx-video'),play=document.getElementById('tedx-play'),status=document.getElementById('tedx-status');
play.addEventListener('click',()=>{tedx.play().catch(()=>{status.textContent='Unable to play this video. Please try again.'})});

tedx.addEventListener('play',()=>{play.hidden=true;tedx.controls=true;tedx.classList.add('playing-video');status.textContent=''});
for(const event of ['pause','ended'])tedx.addEventListener(event,()=>{play.hidden=false;});
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.body.classList.add('has-motion');
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.15});document.querySelectorAll('.reveal,.speaking-beyond').forEach(el=>observer.observe(el));const beyond=document.querySelector('.speaking-beyond');let pending=false;function update(){pending=false;const r=beyond.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)beyond.style.setProperty('--cloud-shift',Math.max(-30,Math.min(30,-r.top*.06))+'px')}addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(update)}},{passive:true});update()}
})();
