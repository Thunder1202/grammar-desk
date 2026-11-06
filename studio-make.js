/* Practice Studio: the practice editor (make.html). Needs studio.js (window.GDS). Practices are saved on this device only. */
(function(){
var G=window.GDS,D=document,W=window,root=D.getElementById('st');
if(!G||!root)return;
var MU={
 tType:{en:"What do you want to make?",ru:"Что вы хотите создать?",uz:"Nima yaratmoqchisiz?"},
 kQuizD:{en:"The student types the answer.",ru:"Ученик вводит ответ.",uz:"O'quvchi javobni yozadi."},
 kExamD:{en:"The student picks one of the options.",ru:"Ученик выбирает один из вариантов.",uz:"O'quvchi variantlardan birini tanlaydi."},
 fTitle:{en:"Title",ru:"Название",uz:"Nomi"},
 fTitleP:{en:"For example: Past Simple practice",ru:"Например: Практика Past Simple",uz:"Masalan: Past Simple mashqi"},
 fDesc:{en:"Short description (optional)",ru:"Короткое описание (необязательно)",uz:"Qisqa tavsif (majburiy emas)"},
 fLevel:{en:"Level",ru:"Уровень",uz:"Daraja"},
 fAuthor:{en:"Your name (optional)",ru:"Ваше имя (необязательно)",uz:"Ismingiz (majburiy emas)"},
 secH:{en:"Section {n}",ru:"Раздел {n}",uz:"{n}-bo'lim"},
 secT:{en:"Instruction for this section (optional)",ru:"Задание для этого раздела (необязательно)",uz:"Bu bo'lim uchun topshiriq (majburiy emas)"},
 secTP:{en:"For example: Write the verb in brackets in the Past Simple.",ru:"Например: Напишите глагол в скобках в Past Simple.",uz:"Masalan: Qavs ichidagi fe'lni Past Simple da yozing."},
 secTip:{en:"Rule or tip shown after each answer (optional)",ru:"Правило или подсказка после каждого ответа (необязательно)",uz:"Har bir javobdan keyin ko'rsatiladigan qoida yoki maslahat (majburiy emas)"},
 secTipP:{en:"For example: After did we use the base verb. Use **bold** for important words.",ru:"Например: После did глагол в начальной форме. Важные слова — **жирным**.",uz:"Masalan: did dan keyin fe'l asosiy shaklda bo'ladi. Muhim so'zlarni **qalin** qiling."},
 addSec:{en:"Add a section",ru:"Добавить раздел",uz:"Bo'lim qo'shish"},
 rmSec:{en:"Remove this section",ru:"Удалить этот раздел",uz:"Bu bo'limni o'chirish"},
 qL:{en:"Question",ru:"Вопрос",uz:"Savol"},
 qP:{en:"Use ___ for the gap. For example: She ___ (play) tennis.",ru:"___ — пропуск. Например: She ___ (play) tennis.",uz:"___ — bo'sh joy. Masalan: She ___ (play) tennis."},
 aL:{en:"Correct answers (one per line)",ru:"Правильные ответы (по одному в строке)",uz:"To'g'ri javoblar (har qatorda bittadan)"},
 aP:{en:"plays",ru:"plays",uz:"plays"},
 nL:{en:"Explanation after the answer (optional)",ru:"Пояснение после ответа (необязательно)",uz:"Javobdan keyingi izoh (majburiy emas)"},
 oL:{en:"Options (select the correct one)",ru:"Варианты (отметьте правильный)",uz:"Variantlar (to'g'risini belgilang)"},
 oP:{en:"Option {a}",ru:"Вариант {a}",uz:"{a}-variant"},
 wP:{en:"Why? (optional)",ru:"Почему? (необязательно)",uz:"Nega? (majburiy emas)"},
 corr:{en:"This is the correct option",ru:"Это правильный вариант",uz:"Bu to'g'ri variant"},
 addOpt:{en:"Add an option",ru:"Добавить вариант",uz:"Variant qo'shish"},
 rmOpt:{en:"Remove option",ru:"Удалить вариант",uz:"Variantni o'chirish"},
 addQ:{en:"Add a question",ru:"Добавить вопрос",uz:"Savol qo'shish"},
 up:{en:"Move up",ru:"Вверх",uz:"Yuqoriga"},
 dn:{en:"Move down",ru:"Вниз",uz:"Pastga"},
 dup:{en:"Duplicate",ru:"Дублировать",uz:"Nusxalash"},
 rm:{en:"Remove question",ru:"Удалить вопрос",uz:"Savolni o'chirish"},
 bulkT:{en:"Add many questions at once",ru:"Добавить много вопросов сразу",uz:"Ko'p savolni bir vaqtda qo'shish"},
 bulkQ:{en:"One question per line: question = answer | another accepted answer",ru:"Один вопрос в строке: вопрос = ответ | другой допустимый ответ",uz:"Har qatorda bitta savol: savol = javob | boshqa to'g'ri javob"},
 bulkE:{en:"One question per line: question | option | option | *correct option",ru:"Один вопрос в строке: вопрос | вариант | вариант | *правильный вариант",uz:"Har qatorda bitta savol: savol | variant | variant | *to'g'ri variant"},
 bulkB:{en:"Add these questions",ru:"Добавить эти вопросы",uz:"Bu savollarni qo'shish"},
 bulkErr:{en:"These lines could not be read: {a}",ru:"Не удалось прочитать строки: {a}",uz:"Bu qatorlarni o'qib bo'lmadi: {a}"},
 bulkOk:{en:"Questions added: {n}.",ru:"Добавлено вопросов: {n}.",uz:"Qo'shilgan savollar: {n}."},
 save:{en:"Save on this device",ru:"Сохранить на этом устройстве",uz:"Shu qurilmada saqlash"},
 saved:{en:"Saved! It is in your practices.",ru:"Сохранено! Она в ваших тренировках.",uz:"Saqlandi! U sizning mashqlaringiz orasida."},
 playB:{en:"Play it",ru:"Начать",uz:"Boshlash"},
 studioB:{en:"Open the Studio",ru:"Открыть Студию",uz:"Studiyani ochish"},
 expB:{en:"Export a file",ru:"Экспорт в файл",uz:"Faylga eksport"},
 fresh:{en:"Start a new practice",ru:"Начать новую тренировку",uz:"Yangi mashq boshlash"},
 freshT:{en:"Start a new practice?",ru:"Начать новую тренировку?",uz:"Yangi mashq boshlansinmi?"},
 freshQ:{en:"What you typed and did not save will be cleared.",ru:"Всё, что вы набрали и не сохранили, будет удалено.",uz:"Yozgan va saqlamagan narsangiz o'chadi."},
 freshY:{en:"Yes, start new",ru:"Да, начать новую",uz:"Ha, yangisini boshlash"},
 freshN:{en:"No, keep editing",ru:"Нет, продолжить",uz:"Yo'q, davom etish"},
 kindT:{en:"Change the type?",ru:"Сменить тип?",uz:"Turi o'zgartirilsinmi?"},
 kindQ:{en:"The questions you wrote will be cleared.",ru:"Написанные вопросы будут удалены.",uz:"Yozgan savollaringiz o'chadi."},
 kindY:{en:"Yes, change",ru:"Да, сменить",uz:"Ha, o'zgartirish"},
 kindN:{en:"No, keep it",ru:"Нет, оставить",uz:"Yo'q, qolsin"},
 secDelT:{en:"Remove this section?",ru:"Удалить этот раздел?",uz:"Bu bo'lim o'chirilsinmi?"},
 secDelQ:{en:"All its questions will be removed.",ru:"Все его вопросы будут удалены.",uz:"Uning barcha savollari o'chadi."},
 draft:{en:"Your unsaved draft was restored.",ru:"Ваш несохранённый черновик восстановлен.",uz:"Saqlanmagan qoralamangiz tiklandi."},
 errH:{en:"Please fix this first:",ru:"Сначала исправьте:",uz:"Avval buni tuzating:"},
 eTitle:{en:"Add a title.",ru:"Добавьте название.",uz:"Nom qo'shing."},
 eNone:{en:"Add at least one complete question.",ru:"Добавьте хотя бы один полный вопрос.",uz:"Kamida bitta to'liq savol qo'shing."},
 eQ:{en:"Section {s}, question {q}: write the question.",ru:"Раздел {s}, вопрос {q}: напишите вопрос.",uz:"{s}-bo'lim, {q}-savol: savolni yozing."},
 eA:{en:"Section {s}, question {q}: add at least one correct answer.",ru:"Раздел {s}, вопрос {q}: добавьте хотя бы один правильный ответ.",uz:"{s}-bo'lim, {q}-savol: kamida bitta to'g'ri javob qo'shing."},
 eO:{en:"Section {s}, question {q}: write at least 2 options.",ru:"Раздел {s}, вопрос {q}: напишите минимум 2 варианта.",uz:"{s}-bo'lim, {q}-savol: kamida 2 ta variant yozing."},
 eC:{en:"Section {s}, question {q}: select the correct option.",ru:"Раздел {s}, вопрос {q}: отметьте правильный вариант.",uz:"{s}-bo'lim, {q}-savol: to'g'ri variantni belgilang."},
 many:{en:"You can add up to {n} questions.",ru:"Можно добавить не более {n} вопросов.",uz:"Eng ko'pi bilan {n} ta savol qo'shish mumkin."},
 cnt:{en:"Questions: {n}",ru:"Вопросов: {n}",uz:"Savollar: {n}"}
};
for(var k in MU)G.UI[k]=MU[k];
var t=G.t,esc=G.esc,DKEY='gd-make-draft',E,msg=null,bulkOpen=false,timer=0,params=new URLSearchParams(W.location.search),editId=params.get('e');

function blankItem(kind){return kind==='quiz'?{q:'',a:'',n:''}:{q:'',o:['','',''],c:-1,w:['','','']}}
function blank(){return {id:'',rev:0,at:0,kind:'quiz',title:'',desc:'',level:'Any',author:'',groups:[{h:'',tip:'',items:[blankItem('quiz')]}]}}
function s(v){return typeof v==='string'?v:''}
function norm(e){
 var kind=e&&e.kind==='exam'?'exam':'quiz',o={id:s(e&&e.id),rev:parseInt(e&&e.rev,10)||0,at:parseInt(e&&e.at,10)||0,kind:kind,title:s(e&&e.title),desc:s(e&&e.desc),level:G.LEVELS.indexOf(e&&e.level)>-1?e.level:'Any',author:s(e&&e.author),groups:[]};
 (e&&Array.isArray(e.groups)?e.groups:[]).slice(0,G.MAXS).forEach(function(g){
  var gg={h:s(g&&g.h),tip:s(g&&g.tip),items:[]};
  (g&&Array.isArray(g.items)?g.items:[]).slice(0,G.MAXQ).forEach(function(it){
   if(!it)return;
   if(kind==='quiz')gg.items.push({q:s(it.q),a:Array.isArray(it.a)?it.a.map(s).join('\n'):s(it.a),n:s(it.n)});
   else{
    var op=(Array.isArray(it.o)?it.o:[]).slice(0,4).map(s);while(op.length<2)op.push('');
    var c=parseInt(it.c,10);
    gg.items.push({q:s(it.q),o:op,c:(c>=0&&c<op.length)?c:-1,w:op.map(function(x,i){return s(Array.isArray(it.w)?it.w[i]:'')})});
   }
  });
  if(!gg.items.length)gg.items.push(blankItem(kind));
  o.groups.push(gg);
 });
 if(!o.groups.length)o.groups.push({h:'',tip:'',items:[blankItem(kind)]});
 return o;
}
function isBlank(it){
 if(!it.q.trim())return E.kind==='quiz'?!it.a.trim()&&!it.n.trim():it.o.every(function(x){return !x.trim()});
 return false;
}
function total(){var n=0;E.groups.forEach(function(g){g.items.forEach(function(it){if(!isBlank(it))n++})});return n}
function hasContent(e){return !!(e.title.trim()||e.desc.trim()||e.groups.some(function(g){return g.h.trim()||g.tip.trim()||g.items.some(function(it){return it.q.trim()||(e.kind==='quiz'?it.a.trim():it.o.some(function(x){return x.trim()}))})}))}

function draft(){
 if(editId)return;
 clearTimeout(timer);
 timer=setTimeout(function(){try{W.localStorage.setItem(DKEY,JSON.stringify(E))}catch(e){}},400);
}

function build(){
 var errs=[],groups=[],any=false;
 if(!E.title.trim())errs.push(t('eTitle'));
 E.groups.forEach(function(g,gi){
  var items=[];
  g.items.forEach(function(it,ii){
   var L={s:gi+1,q:ii+1};
   if(E.kind==='quiz'){
    var a=it.a.split('\n').map(function(x){return x.trim()}).filter(Boolean);
    if(!it.q.trim()&&!a.length&&!it.n.trim())return;
    if(!it.q.trim()){errs.push(t('eQ',L));return}
    if(!a.length){errs.push(t('eA',L));return}
    items.push({q:it.q,a:a,n:it.n});
   }else{
    if(isBlank(it))return;
    if(!it.q.trim()){errs.push(t('eQ',L));return}
    var o=[],w=[],c=-1;
    it.o.forEach(function(x,k){if(!x.trim())return;if(k===it.c)c=o.length;o.push(x);w.push(it.w[k]||'')});
    if(o.length<2){errs.push(t('eO',L));return}
    if(c<0){errs.push(t('eC',L));return}
    items.push({q:it.q,o:o,c:c,w:w});
   }
  });
  if(items.length){any=true;groups.push({h:g.h,tip:g.tip,items:items})}
 });
 if(!any&&!errs.length)errs.push(t('eNone'));
 var p=errs.length?null:G.clean({id:E.id,rev:E.rev,at:E.at,kind:E.kind,title:E.title,desc:E.desc,level:E.level,author:E.author,groups:groups});
 if(!errs.length&&!p)errs.push(t('eNone'));
 return {p:p,errs:errs};
}

function lbl(text,inner,cls){return '<label class="stl'+(cls?' '+cls:'')+'"><span>'+esc(text)+'</span>'+inner+'</label>'}
function inp(f,v,ph){return '<input class="sti" type="text" data-f="'+f+'" value="'+esc(v)+'" placeholder="'+esc(ph||'')+'">'}
function area(f,v,ph,rows){return '<textarea class="sti sta" rows="'+(rows||2)+'" data-f="'+f+'" placeholder="'+esc(ph||'')+'">'+esc(v)+'</textarea>'}
function btn(m,g,i,k,text,sym,cls){return '<button class="ab stmini'+(cls?' '+cls:'')+'" type="button" data-m="'+m+'" data-g="'+g+'" data-i="'+i+'"'+(k!==undefined?' data-k="'+k+'"':'')+' aria-label="'+esc(text)+'" title="'+esc(text)+'">'+sym+'</button>'}

function itemHtml(it,gi,ii,n){
 var h='<div class="stit" data-i="'+ii+'"><div class="sthd"><b>'+(ii+1)+'.</b><span class="stbtn">'+btn('up',gi,ii,undefined,t('up'),'↑')+btn('dn',gi,ii,undefined,t('dn'),'↓')+btn('dup',gi,ii,undefined,t('dup'),'⧉')+btn('rmq',gi,ii,undefined,t('rm'),'✕','qdanger')+'</span></div>';
 h+=lbl(t('qL'),area('q',it.q,t('qP'),2));
 if(E.kind==='quiz'){
  h+=lbl(t('aL'),area('a',it.a,t('aP'),2));
  h+=lbl(t('nL'),inp('n',it.n,''));
 }else{
  h+='<fieldset class="stopts"><legend>'+esc(t('oL'))+'</legend>';
  it.o.forEach(function(o,k){
   h+='<div class="stopt"><input type="radio" name="c-'+gi+'-'+ii+'" data-f="c" data-k="'+k+'"'+(it.c===k?' checked':'')+' aria-label="'+esc(t('corr'))+' ('+'ABCD'.charAt(k)+')">';
   h+='<input class="sti" type="text" data-f="o" data-k="'+k+'" value="'+esc(o)+'" placeholder="'+esc(t('oP',{a:'ABCD'.charAt(k)}))+'" aria-label="'+esc(t('oP',{a:'ABCD'.charAt(k)}))+'">';
   h+=(it.o.length>2?btn('rmopt',gi,ii,k,t('rmOpt'),'✕','qdanger'):'')+'<input class="sti stwhy" type="text" data-f="w" data-k="'+k+'" value="'+esc(it.w[k]||'')+'" placeholder="'+esc(t('wP'))+'" aria-label="'+esc(t('wP'))+' ('+'ABCD'.charAt(k)+')"></div>';
  });
  if(it.o.length<4)h+='<button class="ab" type="button" data-m="addopt" data-g="'+gi+'" data-i="'+ii+'">+ '+esc(t('addOpt'))+'</button>';
  h+='</fieldset>';
 }
 return h+'</div>';
}
function html(){
 var h='<div id="stmsg" role="status" aria-live="polite">'+(msg?'<div class="'+msg.cls+'">'+msg.html+'</div>':'')+'</div>';
 h+='<section class="card stcard"><fieldset class="stkind"><legend>'+esc(t('tType'))+'</legend>';
 ['quiz','exam'].forEach(function(k){
  h+='<label class="stkd'+(E.kind===k?' on':'')+'"><input type="radio" name="kind" value="'+k+'"'+(E.kind===k?' checked':'')+'><b>'+esc(t(k==='quiz'?'kQuizL':'kExamL'))+'</b><small>'+esc(t(k==='quiz'?'kQuizD':'kExamD'))+'</small></label>';
 });
 h+='</fieldset>'+lbl(t('fTitle'),inp('title',E.title,t('fTitleP')))+lbl(t('fDesc'),inp('desc',E.desc,''));
 h+='<div class="stpair">'+lbl(t('fLevel'),'<select class="sti sts" data-f="level">'+G.LEVELS.map(function(l){return '<option value="'+esc(l)+'"'+(E.level===l?' selected':'')+'>'+esc(l==='Any'?t('lvAny'):l)+'</option>'}).join('')+'</select>')+lbl(t('fAuthor'),inp('author',E.author,''))+'</div></section>';
 E.groups.forEach(function(g,gi){
  h+='<section class="card stcard" data-sec="'+gi+'"><div class="sthd"><h3>'+esc(t('secH',{n:gi+1}))+'</h3>'+(E.groups.length>1?'<button class="ab qdanger" type="button" data-m="rmsec" data-g="'+gi+'">'+esc(t('rmSec'))+'</button>':'')+'</div>';
  h+=lbl(t('secT'),inp('gh',g.h,t('secTP')));
  h+=lbl(t('secTip'),area('gt',g.tip,t('secTipP'),2));
  g.items.forEach(function(it,ii){h+=itemHtml(it,gi,ii)});
  h+='<div class="stbar"><button class="ab" type="button" data-m="addq" data-g="'+gi+'">+ '+esc(t('addQ'))+'</button></div></section>';
 });
 h+='<div class="stbar"><button class="ab" type="button" data-m="addsec">+ '+esc(t('addSec'))+'</button></div>';
 h+='<details class="qtip stbulk"'+(bulkOpen?' open':'')+'><summary>'+esc(t('bulkT'))+'</summary><p>'+esc(t(E.kind==='quiz'?'bulkQ':'bulkE'))+'</p><textarea class="sti sta" id="stbulk" rows="6" aria-label="'+esc(t('bulkT'))+'"></textarea><div class="qrow"><button class="ab" type="button" data-m="bulk">'+esc(t('bulkB'))+'</button></div></details>';
 h+='<div class="stsave"><span class="stcount" id="stcnt">'+esc(t('cnt',{n:total()}))+'</span><button class="go" type="button" data-m="save">'+esc(t('save'))+'</button><button class="ab" type="button" data-m="export">'+esc(t('expB'))+'</button><button class="ab" type="button" data-m="fresh">'+esc(t('fresh'))+'</button></div>';
 return h;
}
function render(focus){
 var y=W.scrollY;root.innerHTML=html();W.scrollTo(0,y);
 if(focus){var n=root.querySelector(focus);if(n)n.focus()}
}
function say(cls,h,scroll){
 msg={cls:cls,html:h};render();
 if(scroll){var m=D.getElementById('stmsg');if(m&&m.scrollIntoView)m.scrollIntoView({block:'center'})}
}
function showErr(list){say('sterr','<b>'+esc(t('errH'))+'</b><ul>'+list.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul>',true)}

function setField(el){
 var f=el.dataset.f,v=el.value,sec,it;
 if(f==='title'||f==='desc'||f==='level'||f==='author')E[f]=v;
 else{
  sec=el.closest('[data-sec]');if(!sec)return;
  var g=E.groups[+sec.dataset.sec];
  if(f==='gh')g.h=v;
  else if(f==='gt')g.tip=v;
  else{
   var box=el.closest('[data-i]');if(!box)return;
   it=g.items[+box.dataset.i];var k=+el.dataset.k;
   if(f==='q'||f==='a'||f==='n')it[f]=v;
   else if(f==='o')it.o[k]=v;
   else if(f==='w')it.w[k]=v;
   else if(f==='c')it.c=k;
  }
 }
 var c=D.getElementById('stcnt');if(c)c.textContent=t('cnt',{n:total()});
 draft();
}
function item(gi,ii){return E.groups[gi].items[ii]}
function focusItem(gi,ii){return '[data-sec="'+gi+'"] [data-i="'+ii+'"] [data-f=q]'}

function bulk(){
 bulkOpen=true;
 var ta=D.getElementById('stbulk'),lines=ta.value.split('\n'),ok=0,bad=[],g=E.groups[E.groups.length-1];
 if(g.items.every(isBlank))g.items=[];
 lines.forEach(function(ln,ix){
  if(!ln.trim())return;
  if(total()+ok>=G.MAXQ){if(bad.indexOf('…')<0)bad.push('…');return}
  var p;
  if(E.kind==='quiz'){
   var cut=ln.lastIndexOf(' = ');
   if(cut<1){bad.push(ix+1);return}
   var a=ln.slice(cut+3).split('|').map(function(x){return x.trim()}).filter(Boolean),q=ln.slice(0,cut).trim();
   if(!q||!a.length){bad.push(ix+1);return}
   p={q:q,a:a.join('\n'),n:''};
  }else{
   var parts=ln.split('|').map(function(x){return x.trim()}),q2=parts.shift(),o=[],c=-1;
   parts.forEach(function(x){if(x.charAt(0)==='*'){c=o.length;x=x.slice(1).trim()}if(x)o.push(x)});
   if(!q2||o.length<2||o.length>4||c<0){bad.push(ix+1);return}
   p={q:q2,o:o,c:c,w:o.map(function(){return ''})};
  }
  g.items.push(p);ok++;
 });
 if(!g.items.length)g.items.push(blankItem(E.kind));
 draft();
 var h=ok?esc(t('bulkOk',{n:ok})):'';
 if(bad.length)h+=(h?' ':'')+esc(t('bulkErr',{a:bad.join(', ')}));
 if(ok)ta.value='';
 say(bad.length?'sterr':'stok',h,true);
 if(bad.length){var nt=D.getElementById('stbulk');if(nt){nt.value=lines.join('\n')}}
}

function save(){
 var r=build();if(r.errs.length){showErr(r.errs);return null}
 var p=r.p;p.rev=(E.rev||0)+1;p.at=E.at||Date.now();
 if(!G.store.put(p)){say('sterr',esc(G.t('full')),true);return null}
 E.id=p.id;E.rev=p.rev;E.at=p.at;
 if(!editId)try{W.localStorage.removeItem(DKEY)}catch(e){}
 editId=p.id;
 try{W.history.replaceState(null,'','make.html?e='+encodeURIComponent(p.id))}catch(e){}
 say('stok',esc(t('saved'))+' <a class="go" href="play.html?m='+esc(p.id)+'">'+esc(t('playB'))+'</a> <a class="ab" href="studio.html">'+esc(t('studioB'))+'</a>',true);
 return p;
}

root.addEventListener('input',function(e){if(e.target.dataset&&e.target.dataset.f)setField(e.target)});
root.addEventListener('change',function(e){
 var x=e.target;
 if(x.name==='kind'){
  if(x.value===E.kind)return;
  var go=function(){E.kind=x.value;E.groups.forEach(function(g){g.items=[blankItem(E.kind)]});draft();render()};
  if(total()===0)go();
  else{render();G.ask({title:t('kindT'),text:t('kindQ'),yes:t('kindY'),no:t('kindN'),onYes:go})}
  return;
 }
 if(x.dataset&&x.dataset.f)setField(x);
});
root.addEventListener('click',function(e){
 var b=e.target.closest('[data-m]');if(!b)return;
 var m=b.dataset.m,gi=+b.dataset.g,ii=+b.dataset.i,k=+b.dataset.k,g=E.groups[gi],it;
 if(m==='addq'){
  if(total()>=G.MAXQ){say('sterr',esc(t('many',{n:G.MAXQ})));return}
  g.items.push(blankItem(E.kind));draft();render(focusItem(gi,g.items.length-1));
 }else if(m==='rmq'){
  if(g.items.length===1)g.items[0]=blankItem(E.kind);else g.items.splice(ii,1);
  draft();render(focusItem(gi,Math.max(0,Math.min(ii,g.items.length-1))));
 }else if(m==='up'&&ii>0){it=g.items.splice(ii,1)[0];g.items.splice(ii-1,0,it);draft();render(focusItem(gi,ii-1))}
 else if(m==='dn'&&ii<g.items.length-1){it=g.items.splice(ii,1)[0];g.items.splice(ii+1,0,it);draft();render(focusItem(gi,ii+1))}
 else if(m==='dup'){
  if(total()>=G.MAXQ){say('sterr',esc(t('many',{n:G.MAXQ})));return}
  g.items.splice(ii+1,0,JSON.parse(JSON.stringify(g.items[ii])));draft();render(focusItem(gi,ii+1));
 }else if(m==='addsec'){
  if(E.groups.length>=G.MAXS)return;
  E.groups.push({h:'',tip:'',items:[blankItem(E.kind)]});draft();render('[data-sec="'+(E.groups.length-1)+'"] [data-f=gh]');
 }else if(m==='rmsec'){
  G.ask({title:t('secDelT'),text:t('secDelQ'),yes:t('delY'),no:t('delN'),onYes:function(){E.groups.splice(gi,1);draft();render()}});
 }else if(m==='addopt'){
  it=item(gi,ii);if(it.o.length<4){it.o.push('');it.w.push('');draft();render('[data-sec="'+gi+'"] [data-i="'+ii+'"] [data-f=o][data-k="'+(it.o.length-1)+'"]')}
 }else if(m==='rmopt'){
  it=item(gi,ii);
  if(it.o.length>2){it.o.splice(k,1);it.w.splice(k,1);if(k<it.c)it.c--;else if(k===it.c)it.c=-1;draft();render(focusItem(gi,ii))}
 }else if(m==='bulk')bulk();
 else if(m==='save')save();
 else if(m==='export'){var r=build();if(r.errs.length)showErr(r.errs);else G.download(G.fname(r.p),JSON.stringify(r.p,null,1))}
 else if(m==='fresh'){
  G.ask({title:t('freshT'),text:t('freshQ'),yes:t('freshY'),no:t('freshN'),onYes:function(){
   try{W.localStorage.removeItem(DKEY)}catch(e){}
   editId=null;E=blank();msg=null;
   try{W.history.replaceState(null,'','make.html')}catch(e){}
   render();W.scrollTo(0,0);
  }});
 }
});

(function init(){
 var p=editId?G.store.get(editId):null;
 if(p){E=norm(p)}
 else{
  editId=null;E=blank();
  try{
   var d=JSON.parse(W.localStorage.getItem(DKEY)||'null');
   if(d&&typeof d==='object'){var n=norm(d);if(hasContent(n)){E=n;msg={cls:'stok',html:esc(t('draft'))}}}
  }catch(e){}
 }
 render();
 G.onLang(function(){render()});
})();
})();
