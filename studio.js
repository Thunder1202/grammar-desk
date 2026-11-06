/* Practice Studio: shared helpers (storage, validation, engine conversion, dialogs), the hub page and the player page.
   A practice = {v,id,rev,kind:'quiz'|'exam',title,desc,level,author,at,groups:[{h,tip,items:[...]}]}.
   quiz item = {q,a:[answers],n?,ru?,uz?}   exam item = {q,o:[2-4 options],c:right index,w:[why per option]}. */
(function(){
var D=document,R=D.documentElement,W=window;
var KEY='gd-my',MAXQ=200,MAXS=20,MAXP=60,LEVELS=['Any','A1','A2','B1','B2','C1/C2'];
var UI={
 mineH:{en:"My practices",ru:"Мои тренировки",uz:"Mening mashqlarim"},
 teachH:{en:"Teacher's practices",ru:"Тренировки учителя",uz:"O'qituvchi mashqlari"},
 newB:{en:"Create a practice",ru:"Создать тренировку",uz:"Mashq yaratish"},
 impB:{en:"Import a file",ru:"Загрузить файл",uz:"Fayl yuklash"},
 local:{en:"Your practices are saved in this browser, on this device only. Use Export to keep a backup file.",ru:"Ваши тренировки сохраняются в этом браузере, только на этом устройстве. Кнопка «Экспорт» создаёт файл-копию.",uz:"Mashqlaringiz shu brauzerda, faqat shu qurilmada saqlanadi. Nusxa fayl olish uchun «Eksport» tugmasidan foydalaning."},
 noMine:{en:"You have no practices yet. Create your first one!",ru:"Пока нет тренировок. Создайте первую!",uz:"Hozircha mashqlar yo'q. Birinchisini yarating!"},
 noTeach:{en:"The teacher has not added practices yet. Check back soon.",ru:"Учитель пока не добавил тренировки. Загляните позже.",uz:"O'qituvchi hali mashq qo'shmagan. Keyinroq qaytib ko'ring."},
 noFound:{en:"Nothing found.",ru:"Ничего не найдено.",uz:"Hech narsa topilmadi."},
 sr:{en:"Search practices...",ru:"Поиск тренировок...",uz:"Mashqlarni qidirish..."},
 fType:{en:"All types",ru:"Все типы",uz:"Hamma turlar"},
 fLvl:{en:"All levels",ru:"Все уровни",uz:"Hamma darajalar"},
 lvAny:{en:"Any level",ru:"Любой уровень",uz:"Istalgan daraja"},
 kQuiz:{en:"Quiz",ru:"Квиз",uz:"Test"},
 kExam:{en:"Exam",ru:"Экзамен",uz:"Imtihon"},
 kQuizL:{en:"Typed-answer quiz",ru:"Квиз с вводом ответа",uz:"Yozma javobli test"},
 kExamL:{en:"Multiple-choice exam",ru:"Экзамен с выбором ответа",uz:"Variantli imtihon"},
 qs:{en:"{n} questions",ru:"вопросов: {n}",uz:"{n} ta savol"},
 q1:{en:"1 question",ru:"вопросов: 1",uz:"1 ta savol"},
 by:{en:"by {a}",ru:"автор: {a}",uz:"muallif: {a}"},
 edit:{en:"Edit",ru:"Изменить",uz:"Tahrirlash"},
 exp:{en:"Export",ru:"Экспорт",uz:"Eksport"},
 del:{en:"Delete",ru:"Удалить",uz:"O'chirish"},
 delT:{en:"Delete this practice?",ru:"Удалить эту тренировку?",uz:"Bu mashq o'chirilsinmi?"},
 delQ:{en:"It will be removed from this device. You cannot undo this.",ru:"Она будет удалена с этого устройства. Это нельзя отменить.",uz:"U shu qurilmadan o'chiriladi. Buni qaytarib bo'lmaydi."},
 delY:{en:"Yes, delete",ru:"Да, удалить",uz:"Ha, o'chirish"},
 delN:{en:"No, keep it",ru:"Нет, оставить",uz:"Yo'q, qolsin"},
 impOk:{en:"Imported: {a}",ru:"Загружено: {a}",uz:"Yuklandi: {a}"},
 impBad:{en:"This file is not a Grammar Desk practice.",ru:"Этот файл — не тренировка Grammar Desk.",uz:"Bu fayl Grammar Desk mashqi emas."},
 full:{en:"Your browser could not save this. Export your practices, then delete some.",ru:"Браузер не смог сохранить. Сделайте экспорт и удалите старые тренировки.",uz:"Brauzer saqlay olmadi. Eksport qiling va eskilarini o'chiring."},
 nf:{en:"This practice was not found. It may have been deleted, or it is saved on another device.",ru:"Тренировка не найдена. Возможно, она удалена или сохранена на другом устройстве.",uz:"Mashq topilmadi. U o'chirilgan yoki boshqa qurilmada saqlangan bo'lishi mumkin."},
 back:{en:"Back to the Studio",ru:"Назад в Студию",uz:"Studiyaga qaytish"},
 editB:{en:"Edit this practice",ru:"Изменить эту тренировку",uz:"Bu mashqni tahrirlash"},
 defI:{en:"Type the answer.",ru:"Введите ответ.",uz:"Javobni yozing."},
 okW:{en:"This is the right answer.",ru:"Это правильный ответ.",uz:"Bu to'g'ri javob."},
 noW:{en:"This option is not correct.",ru:"Этот вариант неверный.",uz:"Bu variant noto'g'ri."}
};
function lg(){return R.dataset.lang||'en'}
function t(k,v){var o=UI[k],s=o?(o[lg()]||o.en):k;if(v)for(var x in v)s=s.split('{'+x+'}').join(v[x]);return s}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
function str(v,n){return typeof v==='string'?v.replace(/\r/g,'').trim().slice(0,n):''}
function count(p){var n=0;p.groups.forEach(function(g){n+=g.items.length});return n}

function clean(p){
 if(!p||typeof p!=='object')return null;
 var kind=p.kind==='exam'?'exam':p.kind==='quiz'?'quiz':null,title=str(p.title,80);
 if(!kind||!title)return null;
 var out={v:1,id:str(p.id,24).replace(/[^a-z0-9-]/gi,'')||uid(),rev:Math.max(1,parseInt(p.rev,10)||1),kind:kind,title:title,desc:str(p.desc,240),level:LEVELS.indexOf(p.level)>-1?p.level:'Any',author:str(p.author,40),at:parseInt(p.at,10)||Date.now(),groups:[]},total=0;
 (Array.isArray(p.groups)?p.groups.slice(0,MAXS):[]).forEach(function(g){
  if(!g||!Array.isArray(g.items))return;
  var G={h:str(g.h,200),tip:str(g.tip,600),items:[]};
  g.items.forEach(function(it){
   if(total>=MAXQ||!it)return;
   var q=str(it.q,400);if(!q)return;
   if(kind==='quiz'){
    var a=(Array.isArray(it.a)?it.a:[]).map(function(x){return str(x,200)}).filter(Boolean).slice(0,10);
    if(!a.length)return;
    var I={q:q,a:a},n=str(it.n,300),ru=str(it.ru,400),uz=str(it.uz,400);
    if(n)I.n=n;if(ru)I.ru=ru;if(uz)I.uz=uz;
    G.items.push(I);
   }else{
    var o=(Array.isArray(it.o)?it.o:[]).slice(0,4).map(function(x){return str(x,200)}),c=parseInt(it.c,10);
    if(o.length<2||o.some(function(x){return !x})||!(c>=0&&c<o.length))return;
    G.items.push({q:q,o:o,c:c,w:o.map(function(x,k){return str(Array.isArray(it.w)?it.w[k]:'',300)})});
   }
   total++;
  });
  if(G.items.length)out.groups.push(G);
 });
 return total?out:null;
}

var store={
 all:function(){
  try{var a=JSON.parse(W.localStorage.getItem(KEY)||'[]');return (Array.isArray(a)?a:[]).map(clean).filter(Boolean)}catch(e){return []}
 },
 get:function(id){var a=this.all();for(var i=0;i<a.length;i++)if(a[i].id===id)return a[i];return null},
 put:function(p){
  var a=this.all(),done=false;
  for(var i=0;i<a.length;i++)if(a[i].id===p.id){a[i]=p;done=true}
  if(!done)a.push(p);
  if(a.length>MAXP)return false;
  try{W.localStorage.setItem(KEY,JSON.stringify(a));return true}catch(e){return false}
 },
 del:function(id){
  var a=this.all().filter(function(p){return p.id!==id});
  try{W.localStorage.setItem(KEY,JSON.stringify(a));return true}catch(e){return false}
 }
};

function fmt(s){return esc(s).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>')}
function tri(s){return {en:s,ru:s,uz:s}}
function toEngine(p,id){
 var i,Z;
 if(p.kind==='quiz'){
  Z={id:id,rules:{},ex:[],q:[]};
  p.groups.forEach(function(g,i){
   Z.rules['g'+i]=tri(fmt(g.tip));
   Z.ex.push({h:g.h?tri(g.h):UI.defI});
   g.items.forEach(function(it){
    var o={e:i,q:it.q,a:it.a,r:'g'+i};
    if(it.n)o.n=it.n;if(it.ru)o.ru=it.ru;if(it.uz)o.uz=it.uz;
    Z.q.push(o);
   });
  });
  return Z;
 }
 Z={id:id,level:'studio.html',lvl:'Practice Studio',topics:{},nolink:true,q:[]};
 p.groups.forEach(function(g,i){
  Z.topics['g'+i]=g.h||p.title;
  g.items.forEach(function(it){
   Z.q.push({s:'g'+i,q:it.q,o:it.o,a:it.c,w:it.o.map(function(x,k){
    var w=it.w[k];if(w)return [w,w,w];
    var d=UI[k===it.c?'okW':'noW'];return [d.en,d.ru,d.uz];
   })});
  });
 });
 return Z;
}

function ask(o){
 var m=D.createElement('div'),opener=D.activeElement;
 m.className='qmod';
 m.innerHTML='<div class="qdlg" role="alertdialog" aria-modal="true" aria-labelledby="qmt" aria-describedby="qmd"><h3 id="qmt">'+esc(o.title)+'</h3><p id="qmd">'+esc(o.text)+'</p><div class="qrow"><button class="go" data-m="no">'+esc(o.no)+'</button><button class="ab qdanger" data-m="yes">'+esc(o.yes)+'</button></div></div>';
 D.body.appendChild(m);
 var no=m.querySelector('[data-m=no]'),yes=m.querySelector('[data-m=yes]');
 function close(){D.removeEventListener('keydown',key,true);m.remove();if(opener&&D.contains(opener)&&opener.focus)opener.focus({preventScroll:true})}
 function key(e){
  if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close()}
  else if(e.key==='Tab'){e.preventDefault();(D.activeElement===no?yes:no).focus()}
 }
 D.addEventListener('keydown',key,true);
 m.addEventListener('click',function(e){
  if(e.target===m){close();return}
  var b=e.target.closest('[data-m]');if(!b)return;
  if(b.dataset.m==='yes'){D.removeEventListener('keydown',key,true);m.remove();o.onYes()}else close();
 });
 no.focus();
}
function download(name,text){
 var a=D.createElement('a'),u=URL.createObjectURL(new Blob([text],{type:'application/json'}));
 a.href=u;a.download=name;D.body.appendChild(a);a.click();a.remove();
 setTimeout(function(){URL.revokeObjectURL(u)},1500);
}
function fname(p){return (p.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'practice')+'.json'}
function onLang(fn){new MutationObserver(fn).observe(R,{attributes:true,attributeFilter:['data-lang']})}
W.GDS={t:t,esc:esc,uid:uid,clean:clean,count:count,store:store,toEngine:toEngine,ask:ask,download:download,fname:fname,onLang:onLang,LEVELS:LEVELS,MAXQ:MAXQ,MAXS:MAXS,UI:UI};

var root=D.getElementById('st');
if(!root)return;
var mode=root.dataset.mode;

/* ---------- hub ---------- */
function teacher(){return (Array.isArray(W.GD_Teacher)?W.GD_Teacher:[]).map(clean).filter(Boolean)}
function meta(p){
 var lv=p.level==='Any'?t('lvAny'):p.level;
 return t(p.kind==='quiz'?'kQuiz':'kExam')+' · '+lv+' · '+(count(p)===1?t('q1'):t('qs',{n:count(p)}));
}
function card(p,src){
 var sub=p.desc||'';if(p.author)sub+=(sub?' ':'')+'('+t('by',{a:p.author})+')';
 var h='<li><a class="lv" href="play.html?'+src+'='+esc(p.id)+'"><b>'+esc(p.title)+'</b><span>'+esc(meta(p))+'</span></a>';
 if(sub)h+='<em class="tp">'+esc(sub)+'</em>';
 if(src==='m')h+='<div class="stact"><a class="ab" href="make.html?e='+esc(p.id)+'">'+esc(t('edit'))+'</a><button class="ab" data-s="exp" data-id="'+esc(p.id)+'">'+esc(t('exp'))+'</button><button class="ab qdanger" data-s="del" data-id="'+esc(p.id)+'">'+esc(t('del'))+'</button></div>';
 return h+'</li>';
}
var F={s:'',k:'',l:''},note='';
function match(p){
 if(F.k&&p.kind!==F.k)return false;
 if(F.l&&p.level!==F.l)return false;
 if(F.s){var hay=(p.title+' '+p.desc+' '+p.author).toLowerCase();if(hay.indexOf(F.s.toLowerCase())<0)return false}
 return true;
}
function list(arr,src,empty){
 if(!arr.length)return '<p class="stempty">'+esc(empty)+'</p>';
 var f=arr.filter(match);
 return f.length?'<ul class="menu">'+f.map(function(p){return card(p,src)}).join('')+'</ul>':'<p class="stempty">'+esc(t('noFound'))+'</p>';
}
function hub(){
 var T=teacher(),M=store.all().sort(function(a,b){return b.at-a.at});
 var h='<div class="stbar"><a class="go" href="make.html">+ '+esc(t('newB'))+'</a><button class="ab" data-s="imp">'+esc(t('impB'))+'</button><input type="file" id="stfile" accept=".json,application/json" hidden></div>';
 h+='<p class="stnote" role="status" id="stmsg">'+esc(note)+'</p>';
 h+='<div class="stflt"><input class="sti" id="stq" type="search" autocomplete="off" aria-label="'+esc(t('sr'))+'" placeholder="'+esc(t('sr'))+'" value="'+esc(F.s)+'">';
 h+='<select class="sti sts" id="stk" aria-label="'+esc(t('fType'))+'"><option value="">'+esc(t('fType'))+'</option><option value="quiz"'+(F.k==='quiz'?' selected':'')+'>'+esc(t('kQuizL'))+'</option><option value="exam"'+(F.k==='exam'?' selected':'')+'>'+esc(t('kExamL'))+'</option></select>';
 h+='<select class="sti sts" id="stl" aria-label="'+esc(t('fLvl'))+'"><option value="">'+esc(t('fLvl'))+'</option>'+LEVELS.map(function(l){return '<option value="'+esc(l)+'"'+(F.l===l?' selected':'')+'>'+esc(l==='Any'?t('lvAny'):l)+'</option>'}).join('')+'</select></div>';
 h+='<h2>'+esc(t('teachH'))+'</h2>'+list(T,'t',t('noTeach'));
 h+='<h2>'+esc(t('mineH'))+'</h2>'+list(M,'m',t('noMine'));
 h+='<p class="tag">'+esc(t('local'))+'</p>';
 var keep=D.activeElement&&D.activeElement.id,pos=D.activeElement&&D.activeElement.selectionStart;
 root.innerHTML=h;
 if(keep&&/^st[qkl]$/.test(keep)){var q=D.getElementById(keep);q.focus();try{q.setSelectionRange(pos,pos)}catch(e){}}
}
function importFile(file){
 var r=new FileReader();
 r.onload=function(){
  var ok=[],data;
  try{data=JSON.parse(r.result)}catch(e){data=null}
  (Array.isArray(data)?data:[data]).forEach(function(x){
   var p=clean(x);if(!p)return;
   p.id=uid();p.rev=1;p.at=Date.now();
   if(store.put(p))ok.push(p.title);
  });
  note=ok.length?t('impOk',{a:ok.join(', ')}):t('impBad');
  hub();
 };
 r.readAsText(file);
}
function hubEvents(){
 root.addEventListener('input',function(e){
  if(e.target.id==='stq'){F.s=e.target.value;hub()}
 });
 root.addEventListener('change',function(e){
  if(e.target.id==='stk'){F.k=e.target.value;hub()}
  else if(e.target.id==='stl'){F.l=e.target.value;hub()}
  else if(e.target.id==='stfile'&&e.target.files[0])importFile(e.target.files[0]);
 });
 root.addEventListener('click',function(e){
  var b=e.target.closest('[data-s]');if(!b)return;
  var a=b.dataset.s,id=b.dataset.id;
  if(a==='imp')D.getElementById('stfile').click();
  else if(a==='exp'){var p=store.get(id);if(p)download(fname(p),JSON.stringify(p,null,1))}
  else if(a==='del')ask({title:t('delT'),text:t('delQ'),yes:t('delY'),no:t('delN'),onYes:function(){store.del(id);hub()}});
 });
 onLang(hub);
}

/* ---------- player ---------- */
function play(){
 var q=new URLSearchParams(W.location.search),src=q.get('t')?'t':'m',id=q.get(src)||'',p=null;
 if(src==='t'){var T=teacher();for(var i=0;i<T.length;i++)if(T[i].id===id)p=T[i]}else p=store.get(id);
 var h1=D.getElementById('pt'),sub=D.getElementById('ps'),cr=D.getElementById('cr');
 if(!p){
  var nf=function(){root.innerHTML='<section class="card"><p>'+esc(t('nf'))+'</p><div class="qrow"><a class="go" href="studio.html">'+esc(t('back'))+'</a></div></section>'};
  nf();onLang(nf);
  return;
 }
 D.title=p.title+' - Grammar Desk';
 if(h1)h1.textContent=p.title;
 if(cr)cr.textContent=p.title;
 if(sub){
  var s=p.desc||'';if(p.author)s+=(s?' ':'')+'('+t('by',{a:p.author})+')';
  sub.textContent=s;sub.hidden=!s;
 }
 root.id='qz';
 W[p.kind==='quiz'?'GD_QUIZ':'GD_EXAM']=toEngine(p,src+'-'+p.id+'-'+p.rev);
 var sc=D.createElement('script');sc.src=p.kind==='quiz'?'practice.js':'exam.js';D.body.appendChild(sc);
 if(src==='m'){
  var ed=D.getElementById('pe');
  if(ed){ed.hidden=false;ed.href='make.html?e='+encodeURIComponent(p.id);ed.textContent=t('editB')}
 }
 var bk=D.getElementById('pb');if(bk){bk.hidden=false;bk.textContent=t('back')}
 onLang(function(){var ed=D.getElementById('pe'),bk=D.getElementById('pb');if(ed&&!ed.hidden)ed.textContent=t('editB');if(bk)bk.textContent=t('back')});
}

if(mode==='hub'){hub();hubEvents()}
else if(mode==='play')play();
})();
