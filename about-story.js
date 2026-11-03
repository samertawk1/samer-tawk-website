(()=>{
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('shown');observer.unobserve(entry.target)}}),{threshold:.12});
 document.querySelectorAll('.story-reveal').forEach(el=>observer.observe(el));
 const story=document.querySelector('.life-story'),photo=document.querySelector('.recovery-visual'),beyond=document.querySelector('.beyond-section');
 const slides=[...photo.querySelectorAll('img')];let current=0;
 slides.forEach((slide,i)=>{slide.classList.toggle('active',i===0);slide.setAttribute('aria-hidden',String(i!==0))});
 setInterval(()=>{if(document.hidden||slides.length<2)return;slides[current].classList.remove('active');slides[current].setAttribute('aria-hidden','true');current=(current+1)%slides.length;slides[current].classList.add('active');slides[current].setAttribute('aria-hidden','false')},5500);
 const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){beyond.classList.add('revealed');reveal.disconnect()}}),{threshold:.5});reveal.observe(document.querySelector('.beyond-title'));
 let pending=false;function update(){pending=false;if(reduce.matches)return;story.style.setProperty('--cloud-shift',Math.max(-65,Math.min(65,story.getBoundingClientRect().top*.075))+'px');beyond.style.setProperty('--beyond-cloud-shift',Math.max(-35,Math.min(35,beyond.getBoundingClientRect().top*.05))+'px')}
 addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(update)}},{passive:true});addEventListener('resize',update);update();
})();
(()=>{const section=document.querySelector('.media-story');if(!section)return;const watcher=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){section.classList.add('in-view');watcher.disconnect()}},{threshold:.12});watcher.observe(section)})();
(()=>{
 const section=document.querySelector('.media-story');if(!section)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const layers=[['.media-echo',.035],['.media-ski',.07],['.media-radio',.045],['.media-interview',.025]].map(([selector,speed])=>[section.querySelector(selector),speed]);
 let queued=false;
 function render(){queued=false;const rect=section.getBoundingClientRect();if(rect.bottom<0||rect.top>innerHeight)return;const distance=innerHeight*.6-rect.top;layers.forEach(([el,speed])=>el.style.setProperty('--photo-shift',reduced.matches?'0px':Math.max(-80,Math.min(20,-distance*speed))+'px'))}
 function schedule(){if(!queued){queued=true;requestAnimationFrame(render)}}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);reduced.addEventListener('change',schedule);render();
})();
(()=>{
 const section=document.querySelector('.beyond-section'),title=section?.querySelector('.beyond-title'),header=document.querySelector('header');if(!section)return;
 function fit(){const headerHeight=header.getBoundingClientRect().height;section.style.setProperty('--site-header-height',headerHeight+'px');const available=section.clientHeight-title.getBoundingClientRect().height-24;section.style.setProperty('--scene-max-height',Math.max(80,available)+'px')}
 const sizeObserver=new ResizeObserver(fit);sizeObserver.observe(header);sizeObserver.observe(title);addEventListener('resize',fit);document.fonts.ready.then(fit);fit();
})();
(()=>{const section=document.querySelector('.about-closing');if(!section)return;const slides=[...section.querySelectorAll('.mission-photo')];if(!slides.length)return;let current=0,visible=false;const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)section.classList.add('route-visible')},{threshold:.15});observer.observe(section);setInterval(()=>{if(!visible||document.hidden||matchMedia('(prefers-reduced-motion: reduce)').matches)return;slides[current].classList.remove('active');current=(current+1)%slides.length;slides[current].classList.add('active')},7000)})();
