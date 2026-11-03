(() => {
const preference=matchMedia('(prefers-reduced-motion: reduce)');
if(!preference.matches)document.body.classList.add('motion-enhanced');
const photo=document.querySelector('.speaking-portrait');
const divider=document.querySelector('.speaking-divider');
const heading=document.querySelector('#speaking-heading');
const paragraph=document.querySelector('.speaking-teaser p');
const language=document.querySelector('.speaking-language');
const link=document.querySelector('.speaking-link');
let headlineStarted=null;
const observer=new IntersectionObserver(entries=>{
 entries.filter(entry=>entry.isIntersecting).forEach(entry=>{
  const target=entry.target;
  if(target===heading){
   headlineStarted=performance.now();
   target.querySelectorAll('.reveal-part').forEach(part=>{part.style.transitionDelay='0ms';part.classList.add('is-visible')});
  }else{
   let delay=0;
   if(target===paragraph||target===language||target===link){
    if(headlineStarted===null)return;
    const stage=target===paragraph?1900:target===language?2600:2900;
    delay=Math.max(0,stage-(performance.now()-headlineStarted));
   }
   target.style.transitionDelay=delay+'ms';
   target.classList.add('is-visible');
  }
  observer.unobserve(target);
 });
},{threshold:.16,rootMargin:'0px 0px -45px 0px'});
[photo,divider,heading,paragraph,language,link].filter(Boolean).forEach(part=>observer.observe(part));
// Keep the section transition tied to native scrolling rather than intercepting it.
const section=document.querySelector('.speaking-intro');
let scheduled=false;
function updateTransition(){
 scheduled=false;
 if(preference.matches||document.body.classList.contains('motion-disabled')){section.style.setProperty('--entry','1');return;}
 const top=section.getBoundingClientRect().top;
 const progress=Math.max(0,Math.min(1,(innerHeight-top)/(innerHeight*.7)));
 section.style.setProperty('--entry',progress.toFixed(3));
}
addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateTransition)}},{passive:true});
addEventListener('resize',updateTransition);
updateTransition();
preference.addEventListener('change',event=>{document.body.classList.toggle('motion-disabled',event.matches)});
})();

