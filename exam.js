/* Mini exam engine. Reads window.GD_EXAM = {id, level, lvl, topics, next, q}.
   q = [{s:topic slug, q:question, o:[options], a:right index, w:[[en,ru,uz] one per option]}]. */
(function(){
var Z=window.GD_EXAM,D=document,R=D.documentElement,box=D.getElementById('qz');
if(!Z||!box)return;
var UI={
 ok:{en:"Correct",ru:"Верно",uz:"To'g'ri"},
 bad:{en:"Mistakes",ru:"Ошибки",uz:"Xato"},
 left:{en:"Left",ru:"Осталось",uz:"Qoldi"},
 qn:{en:"Question {a} of {b}",ru:"Вопрос {a} из {b}",uz:"{a}-savol, jami {b}"},
 help:{en:"Choose the right answer.",ru:"Выберите правильный ответ.",uz:"To'g'ri javobni tanlang."},
 good:{en:"Correct! Well done!",ru:"Верно! Молодец!",uz:"To'g'ri! Barakalla!"},
 wrong:{en:"Not quite",ru:"Не совсем",uz:"Xato"},
 nx:{en:"Next",ru:"Дальше",uz:"Keyingisi"},
 fin:{en:"See my result",ru:"Посмотреть результат",uz:"Natijani ko'rish"},
 res:{en:"Your result: {a} of {b}",ru:"Ваш результат: {a} из {b}",uz:"Natijangiz: {a} / {b}"},
 best:{en:"Your best: {a} of {b}",ru:"Ваш рекорд: {a} из {b}",uz:"Eng yaxshi natija: {a} / {b}"},
 v3:{en:"Great work! You are ready to move on.",ru:"Отличная работа! Можно идти дальше.",uz:"Zo'r! Davom etishingiz mumkin."},
 v2:{en:"Good try. Review the topics below, then try again.",ru:"Хорошая попытка. Повторите темы ниже и попробуйте ещё раз.",uz:"Yaxshi urinish. Quyidagi mavzularni takrorlang va yana urinib ko'ring."},
 v1:{en:"Keep going! Read the topics below again, then try again.",ru:"Не сдавайтесь! Перечитайте темы ниже и попробуйте ещё раз.",uz:"Taslim bo'lmang! Quyidagi mavzularni qayta o'qing va yana urinib ko'ring."},
 rev:{en:"Topics to review:",ru:"Темы для повторения:",uz:"Takrorlash kerak bo'lgan mavzular:"},
 miss:{en:"Your mistakes:",ru:"Ваши ошибки:",uz:"Xatolaringiz:"},
 redo:{en:"Try again",ru:"Пройти ещё раз",uz:"Qaytadan boshlash"},
 lvl:{en:"Back to {a}",ru:"Назад к {a}",uz:"{a} ga qaytish"},
 nxt:{en:"Next topic",ru:"Следующая тема",uz:"Keyingi mavzu"},
 nlv:{en:"Next level",ru:"Следующий уровень",uz:"Keyingi daraja"},
 home:{en:"Home",ru:"Главная",uz:"Bosh sahifa"}
};
var LI={en:0,ru:1,uz:2},N=Z.q.length,KEY='gd-exam-'+Z.id;
function lg(){return R.dataset.lang||'en'}
function u(k,v){var o=UI[k],s=o[lg()]||o.en;if(v)for(var x in v)s=s.split('{'+x+'}').join(v[x]);return s}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function tr(a){return a[LI[lg()]]||a[0]}
function mix(n){var a=[],i,j,x;for(i=0;i<n;i++)a.push(i);for(i=n-1;i>0;i--){j=Math.floor(Math.random()*(i+1));x=a[i];a[i]=a[j];a[j]=x}return a}
function best(){try{return parseInt(localStorage.getItem(KEY)||'0',10)||0}catch(e){return 0}}
function saveBest(v){try{if(v>best())localStorage.setItem(KEY,String(v))}catch(e){}}

var order,opts,pick,pos;
function start(){
 order=mix(N);opts=order.map(function(i){return mix(Z.q[i].o.length)});pick=[];pos=0;draw(true);
}
function score(){return pick.filter(function(c,k){return c===Z.q[order[k]].a}).length}
function head(){
 var ok=score(),bad=pick.length-ok;
 return '<div class="qst"><div class="k1"><b>'+ok+'</b><span>'+esc(u('ok'))+'</span></div><div class="k2"><b>'+bad+'</b><span>'+esc(u('bad'))+'</span></div><div class="k3"><b>'+(N-pick.length)+'</b><span>'+esc(u('left'))+'</span></div></div>'+
  '<div class="qbar" role="progressbar" aria-valuemin="0" aria-valuemax="'+N+'" aria-valuenow="'+pick.length+'"><i style="width:'+(pick.length/N*100).toFixed(1)+'%"></i></div>';
}
function draw(focus){
 if(pos>=N){box.innerHTML=head()+end();if(focus){var b=box.querySelector('.qend .go,.qend .ab');if(b)b.focus({preventScroll:true})}return}
 var q=Z.q[order[pos]],seq=opts[pos],ch=pick[pos],done=ch!==undefined,h=head();
 h+='<section class="card" aria-live="polite"><h3>'+esc(u('qn',{a:pos+1,b:N}))+'</h3><p class="qhelp">'+esc(Z.topics[q.s])+'</p>';
 h+='<div class="qq" id="qqt">'+esc(q.q).replace(/___/g,'<span class="bl">_____</span>')+'</div>';
 if(!done)h+='<p class="qhelp">'+esc(u('help'))+'</p>';
 h+='<div class="eo" role="group" aria-labelledby="qqt">';
 seq.forEach(function(o,k){
  var c=done?(o===q.a?' ok':(o===ch?' bad':' dim')):'';
  h+='<button class="eb'+c+'" data-q="pick" data-o="'+o+'"'+(done?' disabled':'')+'><span class="el">'+'ABCD'.charAt(k)+'</span><span>'+esc(q.o[o])+'</span></button>';
 });
 h+='</div>';
 if(done){
  var ok=ch===q.a;
  h+='<div class="qfb'+(ok?'':' bad')+'"><div class="big">'+esc(u(ok?'good':'wrong'))+'</div><ul class="ewhy">';
  seq.forEach(function(o){h+='<li class="'+(o===q.a?'y':'n')+'"><b>'+(o===q.a?'✓':'✗')+' '+esc(q.o[o])+'</b><span>'+esc(tr(q.w[o]))+'</span></li>'});
  h+='</ul></div><div class="qrow"><button class="go" data-q="next">'+esc(u(pos===N-1?'fin':'nx'))+' →</button></div>';
 }
 box.innerHTML=h+'</section>';
 if(focus){var f=box.querySelector(done?'[data-q=next]':'.eb');if(f)f.focus({preventScroll:true})}
}
function end(){
 var s=score(),wrong={},list=[],ks=[];
 pick.forEach(function(c,k){var q=Z.q[order[k]];if(c!==q.a){wrong[q.s]=(wrong[q.s]||0)+1;list.push(q)}});
 Object.keys(Z.topics).forEach(function(k){if(wrong[k])ks.push(k)});
 saveBest(s);
 var pct=s/N,h='<section class="card qend"><h3>'+esc(u('res',{a:s,b:N}))+'</h3><p>'+esc(u(pct>=.8?'v3':pct>=.5?'v2':'v1'))+'</p><p class="qhelp">'+esc(u('best',{a:best(),b:N}))+'</p>';
 if(ks.length){
  h+='<p><b>'+esc(u('rev'))+'</b></p><ul class="qhard">';
  ks.forEach(function(k){h+='<li>'+(Z.nolink?esc(Z.topics[k]):'<a href="'+esc(k)+'.html">'+esc(Z.topics[k])+'</a>')+' ('+wrong[k]+')</li>'});
  h+='</ul><p><b>'+esc(u('miss'))+'</b></p><ul class="qhard">';
  list.forEach(function(q){h+='<li>'+esc(q.q)+' → <b>'+esc(q.o[q.a])+'</b></li>'});
  h+='</ul>';
 }
 h+='<div class="qrow">';
 if(Z.next)h+='<a class="go" href="'+esc(Z.next.u)+'">'+esc(u(Z.next.k))+(Z.next.t?': '+esc(Z.next.t):'')+' →</a>';
 h+='<button class="ab" data-q="redo">'+esc(u('redo'))+'</button><a class="ab" href="'+esc(Z.level)+'">'+esc(u('lvl',{a:Z.lvl}))+'</a></div></section>';
 return h;
}
box.addEventListener('click',function(e){
 var b=e.target.closest('[data-q]');if(!b)return;var a=b.dataset.q;
 if(a==='pick'){if(pick[pos]===undefined){pick[pos]=+b.dataset.o;draw(true)}}
 else if(a==='next'){pos++;draw(true)}
 else if(a==='redo')start();
});
new MutationObserver(function(){draw(false)}).observe(R,{attributes:true,attributeFilter:['data-lang']});
start();
})();
