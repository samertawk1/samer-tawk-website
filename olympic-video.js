(()=>{
 const trigger=document.getElementById('watch');
 const modal=document.getElementById('olympic-video-dialog');
 const video=document.getElementById('olympic-video');
 let previousOverflow='';
 trigger.addEventListener('click',()=>{
  previousOverflow=document.body.style.overflow;
  modal.showModal();
  document.body.style.overflow='hidden';
  video.play().catch(()=>{/* Native controls remain available if autoplay is blocked. */});
 });
 modal.querySelector('.video-close').addEventListener('click',()=>modal.close());
 modal.addEventListener('click',event=>{
  if(event.target!==modal)return;
  const box=modal.getBoundingClientRect();
  if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)modal.close();
 });
 modal.addEventListener('close',()=>{
  video.pause();
  document.body.style.overflow=previousOverflow;
  trigger.focus({preventScroll:true});
 });
})();
