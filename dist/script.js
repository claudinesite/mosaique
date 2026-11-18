const form=document.getElementById('brief-form');
const formStatus=document.getElementById('form-status');
const submitButton=form.querySelector('button[type="submit"]');

form.addEventListener('submit',async event=>{
  event.preventDefault();
  if(submitButton.disabled)return;

  const data=new FormData(form);
  const payload={
    access_key:data.get('access_key'),
    botcheck:data.get('botcheck')||'',
    name:String(data.get('name')||'').trim(),
    email:String(data.get('email')||'').trim(),
    company:String(data.get('company')||'').trim(),
    website:String(data.get('website')||'').trim(),
    service:data.getAll('service').join(', ')||'À définir',
    message:String(data.get('message')||'').trim()
  };

  submitButton.disabled=true;
  formStatus.dataset.state='pending';
  formStatus.textContent='Envoi en cours…';

  try{
    const response=await fetch(form.action,{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify(payload)
    });
    const result=await response.json();
    if(!response.ok||!result.success)throw new Error(result.message||'Envoi impossible');
    form.reset();
    formStatus.dataset.state='success';
    formStatus.textContent='Merci ! Votre demande a bien été envoyée. Je vous répondrai par courriel.';
  }catch{
    formStatus.dataset.state='error';
    formStatus.textContent='Votre demande n’a pas pu être envoyée. Veuillez réessayer.';
  }finally{
    submitButton.disabled=false;
  }
});
const mission=document.querySelector('.mission h2');
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const words=mission.textContent.trim().split(/\s+/);mission.textContent='';words.forEach(word=>{const span=document.createElement('span');span.textContent=word+' ';mission.append(span)});let pending=false;function paint(){const box=mission.getBoundingClientRect();const progress=Math.max(0,Math.min(1,(innerHeight*.85-box.top)/(innerHeight*.65)));[...mission.children].forEach((word,index)=>word.classList.toggle('revealed',index/words.length<progress));pending=false}addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(paint)}},{passive:true});addEventListener('resize',paint);paint()}const gallery=document.getElementById('project-gallery');
const galleryPause=document.querySelector('.gallery-pause');
galleryPause.addEventListener('click',()=>{const paused=gallery.classList.toggle('is-paused');galleryPause.setAttribute('aria-pressed',String(paused));galleryPause.innerHTML=paused?'Reprendre le défilement <span aria-hidden="true">▶</span>':'Mettre en pause <span aria-hidden="true">Ⅱ</span>'});// Tool names appear on hover, keyboard focus, or touch; Escape dismisses them.
document.querySelectorAll('.tool-hover').forEach(tool=>{tool.addEventListener('keydown',event=>{if(event.key==='Escape'){tool.classList.add('tooltip-dismissed')}});tool.addEventListener('pointerenter',()=>tool.classList.remove('tooltip-dismissed'));tool.addEventListener('focus',()=>tool.classList.remove('tooltip-dismissed'));tool.addEventListener('pointerdown',()=>tool.classList.remove('tooltip-dismissed'))});
const customCursor=document.querySelector('.site-cursor');
if(customCursor&&matchMedia('(hover:hover) and (pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
  document.documentElement.classList.add('has-custom-cursor');
  let pointerX=-100,pointerY=-100,frame=0;
  const hideCursor=()=>customCursor.classList.remove('is-visible');
  document.addEventListener('pointermove',event=>{
    if(event.pointerType!=='mouse')return;
    const overText=event.target instanceof Element&&event.target.closest('input:not([type=checkbox]):not([type=radio]),textarea,[contenteditable=true]');
    customCursor.classList.toggle('is-visible',!overText);
    pointerX=event.clientX;pointerY=event.clientY;
    if(!frame)frame=requestAnimationFrame(()=>{customCursor.style.transform=`translate3d(${pointerX-10}px,${pointerY-10}px,0)`;frame=0});
  },{passive:true});
  document.addEventListener('mouseout',event=>{if(!event.relatedTarget)hideCursor()});
  document.addEventListener('keydown',hideCursor);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)hideCursor()});
  window.addEventListener('blur',hideCursor);
}
