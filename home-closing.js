(()=>{
 const section=document.querySelector('.mindset-section');
 if(!section||!('IntersectionObserver' in window))return;
 document.body.classList.add('closing-motion');
 const observer=new IntersectionObserver(entries=>{
  if(entries.some(entry=>entry.isIntersecting)){section.classList.add('entered');observer.disconnect();}
 },{threshold:.12});
 observer.observe(section);
})();

(()=>{
 const section=document.querySelector('.mindset-section');
 const track=section?.querySelector('.mindset-ski-track');
 const skier=track?.querySelector('.mindset-skier');
 if(!skier)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let queued=false;
 function render(){
  queued=false;
  const bounds=section.getBoundingClientRect();
  const progress=Math.max(0,Math.min(1,(innerHeight-bounds.top)/(innerHeight+bounds.height*.2)));
  const distance=Math.max(0,track.clientWidth-skier.getBoundingClientRect().width);
  skier.style.setProperty('--ski-x',(reduced.matches?distance:progress*distance).toFixed(2)+'px');
 }
 function schedule(){if(!queued){queued=true;requestAnimationFrame(render);}}
 addEventListener('scroll',schedule,{passive:true});
 addEventListener('resize',schedule);
 reduced.addEventListener('change',schedule);
 skier.addEventListener('load',schedule);
 if('ResizeObserver' in window){const observer=new ResizeObserver(schedule);observer.observe(track);}
 render();
})();
