(()=>{
 const menu=document.querySelector('.menu'),nav=document.querySelector('nav');
 menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',open);nav.classList.toggle('open',open)});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}});
 const form=document.getElementById('enquiry-form');
 const interest=new URLSearchParams(location.search).get('interest');
 const choice=interest==='speaking'?'Customized keynote':null;
 if(choice){[...form.querySelectorAll('[name="Interest"]')].find(input=>input.value===choice)?.setAttribute('checked','');}
 form.addEventListener('submit',event=>{
  if(!form.checkValidity())return;
  if(location.protocol==='file:'){event.preventDefault();document.getElementById('form-status').textContent='Online submission is not available in this local file preview. Please use the email link below to contact Samer.';return;}
  const first=form.elements.namedItem('First Name').value.trim(),last=form.elements.namedItem('Last Name').value.trim();
  form.elements.namedItem('_subject').value=`Book Samer — ${first} ${last}`;
  document.getElementById('form-status').textContent='Continuing to secure submission…';
 });
})();

