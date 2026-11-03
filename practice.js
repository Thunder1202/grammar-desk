/* Practice Arena quiz engine. Reads window.GD_QUIZ = {id, rules, ex, q}. Text is trilingual {en,ru,uz}. */
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
 tot:{en:"Correct: {a}. Mistakes: {b}.",ru:"Верно: {a}. Ошибки: {b}.",uz:"To'g'ri: {a}. Xato: {b}."},
 hard:{en:"These were hard:",ru:"Сложные вопросы:",uz:"Qiyin bo'lgan savollar:"},
 clean:{en:"No mistakes in this exercise!",ru:"В этом упражнении нет ни одной ошибки!",uz:"Bu mashqda birorta ham xato yo'q!"},
 restart:{en:"Start this exercise again",ru:"Начать упражнение заново",uz:"Mashqni qaytadan boshlash"},
 over:{en:"Start all over",ru:"Начать всё сначала",uz:"Hammasini boshidan boshlash"},
 nav:{en:"Exercises",ru:"Упражнения",uz:"Mashqlar"},
 tipT:{en:"How your answers are checked",ru:"Как проверяются ответы",uz:"Javoblar qanday tekshiriladi"},
 tipP:{en:"Write full sentences the way you would in a real text: a capital letter at the start, commas where needed and a full stop or question mark at the end. Do not worry if you forget one: the checker looks at your words, not at capitals or punctuation. Short forms are fine too (don't = do not, I'm = I am). Spelling, word order and the verb form must be exact.",ru:"Пишите полные предложения, как в настоящем тексте: заглавная буква в начале, запятые где нужно, точка или вопросительный знак в конце. Если что-то забудете — не страшно: проверяется слова, а не заглавные буквы и знаки препинания. Краткие формы тоже подходят (don't = do not, I'm = I am). Правописание, порядок слов и форма глагола должны быть точными.",uz:"To'liq gaplar yozing, xuddi haqiqiy matndagidek: boshida bosh harf, kerakli joyda vergul, oxirida nuqta yoki so'roq belgisi. Unutib qo'ysangiz, xafa bo'lmang: tekshiruv so'zlaringizga qaraydi, bosh harf va tinish belgilariga emas. Qisqa shakllar ham to'g'ri (don't = do not, I'm = I am). Imlo, so'zlar tartibi va fe'l shakli aniq bo'lishi kerak."},
 res:{en:"Your result",ru:"Ваш результат",uz:"Natijangiz"},
 first:{en:"{a} of {b} right on the first try",ru:"{a} из {b} с первой попытки",uz:"{b} tadan {a} tasi birinchi urinishda to'g'ri"},
 g1:{en:"Excellent! You know this topic very well.",ru:"Отлично! Вы очень хорошо знаете эту тему.",uz:"Ajoyib! Bu mavzuni juda yaxshi bilasiz."},
 g2:{en:"Great job! Repeat a few rules and it will be perfect.",ru:"Отличная работа! Повторите несколько правил, и будет идеально.",uz:"Barakalla! Bir necha qoidani takrorlang, mukammal bo'ladi."},
 g3:{en:"Good start. Practise the hard questions once more.",ru:"Хорошее начало. Потренируйте сложные вопросы ещё раз.",uz:"Yaxshi boshlanish. Qiyin savollarni yana bir bor mashq qiling."},
 g4:{en:"Keep practising. Every mistake helps you learn. Read the lesson again and try once more.",ru:"Продолжайте тренироваться. Каждая ошибка помогает учиться. Перечитайте урок и попробуйте ещё раз.",uz:"Mashq qilishda davom eting. Har bir xato o'rganishga yordam beradi. Darsni qayta o'qing va yana urinib ko'ring."},
 mist:{en:"Total mistakes: {b}",ru:"Всего ошибок: {b}",uz:"Jami xatolar: {b}"},
 byex:{en:"Result by exercise",ru:"Результат по упражнениям",uz:"Mashqlar bo'yicha natija"},
 rev:{en:"Questions to review",ru:"Вопросы для повторения",uz:"Takrorlash kerak bo'lgan savollar"},
 retry:{en:"Practise the hard ones again ({n})",ru:"Потренировать сложные вопросы ({n})",uz:"Qiyin savollarni qayta mashq qilish ({n})"},
 revdone:{en:"Review finished!",ru:"Повторение завершено!",uz:"Takrorlash tugadi!"},
 revh:{en:"Review",ru:"Повторение",uz:"Takrorlash"},
 seeres:{en:"See my result",ru:"Посмотреть результат",uz:"Natijamni ko'rish"},
 overT:{en:"Start all over?",ru:"Начать всё сначала?",uz:"Hammasini boshidan boshlaymizmi?"},
 overQ:{en:"All your answers and your score in this quiz will be deleted. You cannot undo this.",ru:"Все ваши ответы и результат в этом тесте будут удалены. Это нельзя отменить.",uz:"Bu testdagi barcha javoblaringiz va natijangiz o'chiriladi. Buni qaytarib bo'lmaydi."},
 overYes:{en:"Yes, start over",ru:"Да, начать сначала",uz:"Ha, boshidan boshlash"},
 overNo:{en:"No, keep my progress",ru:"Нет, сохранить прогресс",uz:"Yo'q, natijam qolsin"}
};
function lg(){return R.dataset.lang||'en'}
function t(o,v){var s=typeof o==='string'?o:(o[lg()]||o.en);if(v)for(var k in v)s=s.split('{'+k+'}').join(v[k]);return s}
function u(k,v){return t(UI[k],v)}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}

var CON=[
 [/\bwon't\b/,["will not"]],[/\b(?:can't|cannot)\b/,["can not"]],[/\bshan't\b/,["shall not"]],[/\blet's\b/,["let us"]],
 [/n't\b/,[" not"]],[/'m\b/,[" am"]],[/'re\b/,[" are"]],[/'ve\b/,[" have"]],[/'ll\b/,[" will"]],
 [/'d\b/,[" would"," had"]],[/'s\b/,[" is"," has","s"]]
];
function clean(s){return s.replace(/'/g,'').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim()}
function vars(s){
 s=String(s).toLowerCase().replace(/[’‘`´]/g,"'");
 var list=[s],out={};
 CON.forEach(function(c){
  var nx=[];
  list.forEach(function(x){
   if(!c[0].test(x)||nx.length>64){nx.push(x);return}
   c[1].forEach(function(r){nx.push(x.replace(new RegExp(c[0].source,'g'),r))})
  });
  list=nx;
 });
 list.push(s);
 list.forEach(function(x){x=clean(x);if(x)out[x]=1});
 return Object.keys(out);
}
function right(q,v){
 var vs=vars(v);if(!vs.length)return false;
 return q.a.concat(q.alt||[]).some(function(a){return vars(a).some(function(x){return vs.indexOf(x)>-1})})
}

var KEY='gd-prac-'+Z.id,mastered={},wrongN={},nOk=0,nBad=0,cur=0,queue=[],pos=0,st=null,val='',rev=false,revOk={},revN=0,tipOpen=null;
try{var sv=JSON.parse(localStorage.getItem(KEY)||'{}');(sv.m||[]).forEach(function(i){mastered[i]=1});wrongN=sv.w||{};nOk=sv.o||0;nBad=sv.b||0;cur=Math.min(sv.e||0,Z.ex.length-1)}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify({m:Object.keys(mastered).map(Number),w:wrongN,o:nOk,b:nBad,e:cur}))}catch(e){}}
function cnt(){return Object.keys(mastered).length}
function inEx(e){return Z.q.map(function(q,i){return i}).filter(function(i){return Z.q[i].e===e})}
function done(e){return inEx(e).every(function(i){return mastered[i]})}
function hardIds(){return Z.q.map(function(q,i){return i}).filter(function(i){return wrongN[i]})}

function start(e){
 rev=false;cur=e;var all=inEx(e);queue=all.filter(function(i){return !mastered[i]});
 if(!queue.length)queue=all.slice();
 pos=0;st=null;val='';save();draw(true);
}
function startReview(){
 var h=hardIds();if(!h.length)return;
 rev=true;revOk={};revN=h.length;queue=h;pos=0;st=null;val='';draw(true);
}

function head(){
 var h='<details class="qtip"'+((tipOpen===null?nOk+nBad===0:tipOpen)?' open':'')+'><summary>'+esc(u('tipT'))+'</summary><p>'+esc(u('tipP'))+'</p></details>';
 h+='<div class="qst"><div class="k1"><b>'+nOk+'</b><span>'+u('ok')+'</span></div><div class="k2"><b>'+nBad+'</b><span>'+u('bad')+'</span></div><div class="k3"><b>'+(Z.q.length-cnt())+'</b><span>'+u('left')+'</span></div></div>';
 h+='<div class="qbar" role="progressbar" aria-valuemin="0" aria-valuemax="'+Z.q.length+'" aria-valuenow="'+cnt()+'"><i style="width:'+(cnt()/Z.q.length*100).toFixed(1)+'%"></i></div>';
 h+='<div class="qch" role="group" aria-label="'+esc(u('nav'))+'">';
 Z.ex.forEach(function(x,i){h+='<button class="lt'+(done(i)?' dn':'')+'" data-q="ex" data-i="'+i+'" aria-pressed="'+(!rev&&i===cur)+'" aria-label="'+esc(u('ex',{n:i+1}))+'">'+(done(i)?'✓':i+1)+'</button>'});
 return h+'</div><div class="qrow qover"><button class="ab" data-q="over">↻ '+esc(u('over'))+'</button></div>';
}

function draw(focus){
 var L=lg(),h=head();
 if(pos>=queue.length){h+=end();box.innerHTML=h;wire();var b=box.querySelector('.qend .go');if(focus&&b)b.focus({preventScroll:true});if(focus){var s=box.querySelector('.qend');if(s&&s.scrollIntoView)s.scrollIntoView({block:'nearest'})}return}
 var i=queue[pos],q=Z.q[i],e=rev?q.e:cur,ex=Z.ex[e],all=inEx(e),m=rev?Object.keys(revOk).length:all.filter(function(j){return mastered[j]}).length,tot=rev?revN:all.length,trn=L==='en'?'':q[L];
 h+='<section class="card" aria-live="polite"><h3>'+esc(rev?u('revh'):u('ex',{n:e+1}))+'<span class="qn">'+m+' / '+tot+'</span></h3>';
 h+='<p class="qhelp">'+esc(t(ex.h))+'</p>';
 if(ex.box)h+='<div class="qbox">'+esc(ex.box)+'</div>';
 if(wrongN[i]&&!st&&!rev)h+='<span class="qre">'+esc(u('again1'))+'</span>';
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

function hardList(ids){
 var h='<ul class="qhard">';
 ids.forEach(function(i){h+='<li>'+esc(Z.q[i].q)+' → <b>'+esc(Z.q[i].a[0])+'</b></li>'});
 return h+'</ul>';
}

function end(){
 if(rev){
  return '<section class="card qend"><h3>'+esc(u('revdone'))+'</h3><div class="qrow"><button class="go" data-q="res">'+esc(u('seeres'))+'</button></div></section>';
 }
 if(cnt()===Z.q.length)return results();
 var all=inEx(cur),hard=all.filter(function(i){return wrongN[i]}),last=cur===Z.ex.length-1,h='<section class="card qend"><h3>'+esc(u('exdone',{n:cur+1}))+'</h3><p>'+esc(u('tot',{a:nOk,b:nBad}))+'</p>';
 if(hard.length){h+='<p><b>'+esc(u('hard'))+'</b></p>'+hardList(hard)}
 else h+='<p>'+esc(u('clean'))+'</p>';
 h+='<div class="qrow">';
 if(!last)h+='<button class="go" data-q="ex" data-i="'+(cur+1)+'">'+esc(u('ex',{n:cur+2}))+' →</button>';
 h+='<button class="ab" data-q="redo">'+esc(u('restart'))+'</button>';
 return h+'</div></section>';
}

function results(){
 var n=Z.q.length,hard=hardIds(),first=n-hard.length,pct=Math.round(first/n*100);
 var g=pct>=90?'g1':pct>=75?'g2':pct>=50?'g3':'g4';
 var h='<section class="card qend qres"><h3>'+esc(u('res'))+'</h3>';
 h+='<div class="qpct '+g+'" role="img" aria-label="'+pct+'%"><b>'+pct+'%</b></div>';
 h+='<p class="qgr">'+esc(u(g))+'</p>';
 h+='<p>'+esc(u('first',{a:first,b:n}))+'</p><p class="qsub">'+esc(u('mist',{b:nBad}))+'</p>';
 h+='<h4>'+esc(u('byex'))+'</h4><ul class="qbyx">';
 Z.ex.forEach(function(x,e){
  var ids=inEx(e),ok=ids.filter(function(i){return !wrongN[i]}).length,p=ids.length?Math.round(ok/ids.length*100):0;
  h+='<li><span class="qxn">'+esc(u('ex',{n:e+1}))+'</span><span class="qxb"><i style="width:'+p+'%"></i></span><b>'+ok+'/'+ids.length+'</b></li>';
 });
 h+='</ul>';
 if(hard.length){h+='<h4>'+esc(u('rev'))+'</h4>'+hardList(hard)}
 h+='<div class="qrow">';
 if(hard.length)h+='<button class="go" data-q="rev">'+esc(u('retry',{n:hard.length}))+'</button>';
 h+='<button class="ab" data-q="over">↻ '+esc(u('over'))+'</button>';
 return h+'</div></section>';
}

function check(){
 var inp=D.getElementById('qin');if(!inp)return;
 if(!inp.value.trim()){inp.classList.remove('sh');void inp.offsetWidth;inp.classList.add('sh');inp.focus();return}
 var i=queue[pos],q=Z.q[i];val=inp.value;
 if(right(q,val)){st='ok';mastered[i]=1;nOk++;if(rev)revOk[i]=1}
 else{st='bad';nBad++;wrongN[i]=(wrongN[i]||0)+1;queue.splice(Math.min(pos+4,queue.length),0,i)}
 save();draw(true);
}
function next(){pos++;st=null;val='';draw(true)}
function reset(){mastered={};wrongN={};nOk=0;nBad=0;tipOpen=null;start(0);window.scrollTo(0,0)}

function ask(opener){
 var m=D.createElement('div');m.className='qmod';
 m.innerHTML='<div class="qdlg" role="alertdialog" aria-modal="true" aria-labelledby="qmt" aria-describedby="qmd"><h3 id="qmt">'+esc(u('overT'))+'</h3><p id="qmd">'+esc(u('overQ'))+'</p><div class="qrow"><button class="go" data-m="no">'+esc(u('overNo'))+'</button><button class="ab qdanger" data-m="yes">'+esc(u('overYes'))+'</button></div></div>';
 D.body.appendChild(m);
 var no=m.querySelector('[data-m=no]'),yes=m.querySelector('[data-m=yes]');
 function close(){D.removeEventListener('keydown',key,true);m.remove();if(opener&&D.contains(opener))opener.focus({preventScroll:true})}
 function key(e){
  if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close()}
  else if(e.key==='Tab'){e.preventDefault();(D.activeElement===no?yes:no).focus()}
 }
 D.addEventListener('keydown',key,true);
 m.addEventListener('click',function(e){
  if(e.target===m){close();return}
  var b=e.target.closest('[data-m]');if(!b)return;
  if(b.dataset.m==='yes'){D.removeEventListener('keydown',key,true);m.remove();reset()}else close();
 });
 no.focus();
}

function wire(){
 var inp=D.getElementById('qin');
 if(inp){inp.addEventListener('input',function(){val=inp.value});inp.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();st?next():check()}})}
}
box.addEventListener('click',function(e){
 var sm=e.target.closest('.qtip summary');if(sm){tipOpen=!sm.parentNode.open;return}
 var b=e.target.closest('[data-q]');if(!b)return;var a=b.dataset.q;
 if(a==='main')st?next():check();
 else if(a==='ex')start(+b.dataset.i);
 else if(a==='tr'){var p=D.getElementById('qtr'),o=p.hidden;p.hidden=!o;b.setAttribute('aria-expanded',String(o))}
 else if(a==='redo'){inEx(cur).forEach(function(i){delete mastered[i];delete wrongN[i]});start(cur)}
 else if(a==='rev')startReview();
 else if(a==='res'){rev=false;queue=[];pos=0;draw(true)}
 else if(a==='over')ask(b);
});
new MutationObserver(function(){draw(false)}).observe(R,{attributes:true,attributeFilter:['data-lang']});
if(cnt()===Z.q.length){queue=[];pos=0;draw(false)}else start(cur);
})();
