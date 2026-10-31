/* Big Practice quiz engine. Reads window.GD_QUIZ = {id, rules, ex, q}. Text is trilingual {en,ru,uz}. */
(function(){
var Z=window.GD_QUIZ,D=document,R=D.documentElement,box=D.getElementById('qz');
if(!Z||!box)return;
var UI={
 ok:{en:"Correct",ru:"Верно",uz:"To'g'ri"},
 bad:{en:"Mistakes",ru:"Ошибки",uz:"Xato"},
 left:{en:"Left",ru:"Осталось",uz:"Qoldi"},
 ex:{en:"Exercise {n}",ru:"Упражнение {n}",uz:"{n}-mashq"},
 ph:{en:"Type your answer...",ru:"Введите ответ...",uz:"Javobingizni yozing..."},
 chk:{en:"Check",ru:"Проверить",uz:"Tekshirish"},
 nx:{en:"Next",ru:"Дальше",uz:"Keyingisi"},
 tr:{en:"Translation",ru:"Перевод",uz:"Tarjima"},
 again1:{en:"Try this one again",ru:"Попробуйте ещё раз",uz:"Yana bir marta urinib ko'ring"},
 good:{en:"Correct! Well done!",ru:"Верно! Молодец!",uz:"To'g'ri! Barakalla!"},
 wrong:{en:"Not quite",ru:"Не совсем",uz:"Xato"},
 ans:{en:"Correct answer:",ru:"Правильный ответ:",uz:"To'g'ri javob:"},
 back:{en:"This question will come back later.",ru:"Этот вопрос вернётся позже.",uz:"Bu savol keyinroq yana chiqadi."},
 exdone:{en:"Exercise {n} finished!",ru:"Упражнение {n} завершено!",uz:"{n}-mashq tugadi!"},
 all:{en:"All done! Great work!",ru:"Всё готово! Отличная работа!",uz:"Hammasi tugadi! Zo'r!"},
 tot:{en:"Correct: {a}. Mistakes: {b}.",ru:"Верно: {a}. Ошибки: {b}.",uz:"To'g'ri: {a}. Xato: {b}."},
 hard:{en:"These were hard:",ru:"Сложные вопросы:",uz:"Qiyin bo'lgan savollar:"},
 clean:{en:"No mistakes in this exercise!",ru:"В этом упражнении нет ни одной ошибки!",uz:"Bu mashqda birorta ham xato yo'q!"},
 restart:{en:"Start this exercise again",ru:"Начать упражнение заново",uz:"Mashqni qaytadan boshlash"},
 reset:{en:"Reset all progress",ru:"Сбросить весь прогресс",uz:"Barcha natijani o'chirish"},
 nav:{en:"Exercises",ru:"Упражнения",uz:"Mashqlar"}
};
function lg(){return R.dataset.lang||'en'}
function t(o,v){var s=typeof o==='string'?o:(o[lg()]||o.en);if(v)for(var k in v)s=s.split('{'+k+'}').join(v[k]);return s}
function u(k,v){return t(UI[k],v)}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function norm(s){return s.toLowerCase().replace(/[’‘`´]/g,"'").replace(/\bdoesn'?t\b/g,'does not').replace(/\bdon'?t\b/g,'do not').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim()}
function right(q,v){v=norm(v);return !!v&&q.a.concat(q.alt||[]).some(function(a){return norm(a)===v})}

var KEY='gd-prac-'+Z.id,mastered={},wrongN={},nOk=0,nBad=0,cur=0,queue=[],pos=0,st=null,val='';
try{var sv=JSON.parse(localStorage.getItem(KEY)||'{}');(sv.m||[]).forEach(function(i){mastered[i]=1});nOk=sv.o||0;nBad=sv.b||0;cur=Math.min(sv.e||0,Z.ex.length-1)}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify({m:Object.keys(mastered).map(Number),o:nOk,b:nBad,e:cur}))}catch(e){}}
function cnt(){return Object.keys(mastered).length}
function inEx(e){return Z.q.map(function(q,i){return i}).filter(function(i){return Z.q[i].e===e})}
function done(e){return inEx(e).every(function(i){return mastered[i]})}

function start(e){
 cur=e;var all=inEx(e);queue=all.filter(function(i){return !mastered[i]});
 if(!queue.length)queue=all.slice();
 pos=0;st=null;val='';save();draw(true);
}

function head(){
 var h='<div class="qst"><div class="k1"><b>'+nOk+'</b><span>'+u('ok')+'</span></div><div class="k2"><b>'+nBad+'</b><span>'+u('bad')+'</span></div><div class="k3"><b>'+(Z.q.length-cnt())+'</b><span>'+u('left')+'</span></div></div>';
 h+='<div class="qbar" role="progressbar" aria-valuemin="0" aria-valuemax="'+Z.q.length+'" aria-valuenow="'+cnt()+'"><i style="width:'+(cnt()/Z.q.length*100).toFixed(1)+'%"></i></div>';
 h+='<div class="qch" role="group" aria-label="'+esc(u('nav'))+'">';
 Z.ex.forEach(function(x,i){h+='<button class="lt'+(done(i)?' dn':'')+'" data-q="ex" data-i="'+i+'" aria-pressed="'+(i===cur)+'" aria-label="'+esc(u('ex',{n:i+1}))+'">'+(done(i)?'✓':i+1)+'</button>'});
 return h+'</div>';
}

function draw(focus){
 var ex=Z.ex[cur],L=lg(),h=head(),all=inEx(cur);
 if(pos>=queue.length){h+=end();box.innerHTML=h;wire();var b=box.querySelector('.qend .go');if(focus&&b)b.focus();return}
 var i=queue[pos],q=Z.q[i],m=all.filter(function(j){return mastered[j]}).length,trn=L==='en'?'':q[L];
 h+='<section class="card" aria-live="polite"><h3>'+esc(u('ex',{n:cur+1}))+'<span class="qn">'+m+' / '+all.length+'</span></h3>';
 h+='<p class="qhelp">'+esc(t(ex.h))+'</p>';
 if(ex.box)h+='<div class="qbox">'+esc(ex.box)+'</div>';
 if(wrongN[i]&&!st)h+='<span class="qre">'+esc(u('again1'))+'</span>';
 h+='<div class="qq" id="qqt">'+esc(q.q).replace(/___/g,'<span class="bl">_____</span>')+'</div>';
 h+='<input class="qin'+(st?' '+st:'')+'" id="qin" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-labelledby="qqt" placeholder="'+esc(u('ph'))+'" value="'+esc(val)+'"'+(st?' readonly':'')+'>';
 h+='<div class="qrow"><button class="go" data-q="main">'+esc(st?u('nx')+' →':u('chk'))+'</button>';
 if(trn&&!st)h+='<button class="ab" data-q="tr" aria-expanded="false" aria-controls="qtr">'+esc(u('tr'))+'</button>';
 h+='</div>';
 if(trn&&!st)h+='<p class="qtr" id="qtr" hidden>'+esc(trn)+'</p>';
 if(st){
  var rule=t(Z.rules[q.r]),note=q.n?'<p>'+esc(t(q.n))+'</p>':'';
  if(st==='ok')h+='<div class="qfb"><div class="big">'+esc(u('good'))+'</div><p>'+rule+'</p>'+note+'</div>';
  else h+='<div class="qfb bad"><div class="big">'+esc(u('wrong'))+'</div><p>'+esc(u('ans'))+' <span class="an">'+esc(q.a[0])+'</span></p><p>'+rule+'</p>'+note+(trn?'<p>'+esc(trn)+'</p>':'')+'<p class="tag">'+esc(u('back'))+'</p></div>';
 }
 h+='</section>';
 box.innerHTML=h;wire();
 if(focus){var f=st?box.querySelector('[data-q=main]'):D.getElementById('qin');if(f)f.focus({preventScroll:true})}
}

function end(){
 var all=inEx(cur),hard=all.filter(function(i){return wrongN[i]}),fin=cnt()===Z.q.length,last=cur===Z.ex.length-1,h='<section class="card qend"><h3>'+esc(fin?u('all'):u('exdone',{n:cur+1}))+'</h3><p>'+esc(u('tot',{a:nOk,b:nBad}))+'</p>';
 if(hard.length){h+='<p><b>'+esc(u('hard'))+'</b></p><ul class="qhard">';hard.forEach(function(i){h+='<li>'+esc(Z.q[i].q)+' → <b>'+esc(Z.q[i].a[0])+'</b></li>'});h+='</ul>'}
 else h+='<p>'+esc(u('clean'))+'</p>';
 h+='<div class="qrow">';
 if(!last)h+='<button class="go" data-q="ex" data-i="'+(cur+1)+'">'+esc(u('ex',{n:cur+2}))+' →</button>';
 h+='<button class="ab" data-q="redo">'+esc(u('restart'))+'</button>';
 if(fin)h+='<button class="ab" data-q="reset">'+esc(u('reset'))+'</button>';
 return h+'</div></section>';
}

function check(){
 var inp=D.getElementById('qin');if(!inp)return;
 if(!inp.value.trim()){inp.classList.remove('sh');void inp.offsetWidth;inp.classList.add('sh');inp.focus();return}
 var i=queue[pos],q=Z.q[i];val=inp.value;
 if(right(q,val)){st='ok';mastered[i]=1;nOk++}
 else{st='bad';nBad++;wrongN[i]=(wrongN[i]||0)+1;queue.splice(Math.min(pos+4,queue.length),0,i)}
 save();draw(true);
}
function next(){pos++;st=null;val='';draw(true)}

function wire(){
 var inp=D.getElementById('qin');
 if(inp){inp.addEventListener('input',function(){val=inp.value});inp.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();st?next():check()}})}
}
box.addEventListener('click',function(e){
 var b=e.target.closest('[data-q]');if(!b)return;var a=b.dataset.q;
 if(a==='main')st?next():check();
 else if(a==='ex')start(+b.dataset.i);
 else if(a==='tr'){var p=D.getElementById('qtr'),o=p.hidden;p.hidden=!o;b.setAttribute('aria-expanded',String(o))}
 else if(a==='redo'){inEx(cur).forEach(function(i){delete mastered[i];delete wrongN[i]});start(cur)}
 else if(a==='reset'){mastered={};wrongN={};nOk=0;nBad=0;start(0)}
});
new MutationObserver(function(){draw(false)}).observe(R,{attributes:true,attributeFilter:['data-lang']});
start(cur);
})();
