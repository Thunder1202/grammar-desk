(function(){
var TH=['light','dark','p3','p4','p5'],NM={light:'Light',dark:'Dark',p3:'Persona 3',p4:'Persona 4',p5:'Persona 5'},R=document.documentElement,D=document,TM=null,TMR=0,TMT=0,TMF=0,TMI=0,TMV=0,TMD=false;
var RM=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
var DUR={p3:540,p4:560,p5:500,basic:260},busy=false,PT=null,lastTrail=0;
function sv(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function ld(k){try{return localStorage.getItem(k)}catch(e){return null}}
function ss(k,v){try{if(v===null)sessionStorage.removeItem(k);else sessionStorage.setItem(k,v)}catch(e){}}
function sg(k){try{return sessionStorage.getItem(k)}catch(e){return null}}
function mk(tag,cls){var e=D.createElement(tag);if(cls)e.className=cls;return e}
function cur(){return R.dataset.skin==='basic'?(R.dataset.mode==='dark'?'dark':'light'):R.dataset.skin}
function applyTheme(n){if(n==='light'||n==='dark'){R.dataset.skin='basic';R.dataset.mode=n}else R.dataset.skin=n}
function sync(){
 var nm=L(NM[cur()]),bg=getComputedStyle(R).getPropertyValue('--bg').trim();
 R.style.setProperty('--tn','"'+nm+'"');
 D.querySelectorAll('[data-act=theme]').forEach(function(b){b.setAttribute('aria-label',L('Theme:')+' '+nm)});
 if(bg)D.querySelectorAll('meta[name=theme-color]').forEach(function(m){m.content=bg});
 D.querySelectorAll('[data-act=lang]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.l===R.dataset.lang))});
 D.querySelectorAll('[data-act=search] .tb').forEach(function(x){x.textContent=L('Search')});
}
/* interface translations (English text is the key and the fallback) */
var TR={
 "Choose your level":{ru:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0443\u0440\u043e\u0432\u0435\u043d\u044c",uz:"Darajani tanlang"},
 "English grammar from A1 to C1, in English, Russian and Uzbek.":{ru:"\u0410\u043d\u0433\u043b\u0438\u0439\u0441\u043a\u0430\u044f \u0433\u0440\u0430\u043c\u043c\u0430\u0442\u0438\u043a\u0430 \u043e\u0442 A1 \u0434\u043e C1 \u043d\u0430 \u0430\u043d\u0433\u043b\u0438\u0439\u0441\u043a\u043e\u043c, \u0440\u0443\u0441\u0441\u043a\u043e\u043c \u0438 \u0443\u0437\u0431\u0435\u043a\u0441\u043a\u043e\u043c.",uz:"Ingliz tili grammatikasi A1 dan C1 gacha - ingliz, rus va o'zbek tillarida."},
 "Beginner \u00b7 19 topics":{ru:"\u041d\u0430\u0447\u0430\u043b\u044c\u043d\u044b\u0439 \u00b7 19 \u0442\u0435\u043c",uz:"Boshlang'ich \u00b7 19 mavzu"},
 "Elementary \u00b7 16 topics":{ru:"\u042d\u043b\u0435\u043c\u0435\u043d\u0442\u0430\u0440\u043d\u044b\u0439 \u00b7 16 \u0442\u0435\u043c",uz:"Elementar \u00b7 16 mavzu"},
 "Intermediate \u00b7 18 topics":{ru:"\u0421\u0440\u0435\u0434\u043d\u0438\u0439 \u00b7 18 \u0442\u0435\u043c",uz:"O'rta \u00b7 18 mavzu"},
 "Upper-intermediate \u00b7 14 topics":{ru:"\u0412\u044b\u0448\u0435 \u0441\u0440\u0435\u0434\u043d\u0435\u0433\u043e \u00b7 14 \u0442\u0435\u043c",uz:"O'rtadan yuqori \u00b7 14 mavzu"},
 "Advanced \u00b7 10 topics":{ru:"\u041f\u0440\u043e\u0434\u0432\u0438\u043d\u0443\u0442\u044b\u0439 \u00b7 10 \u0442\u0435\u043c",uz:"Yuqori \u00b7 10 mavzu"},
 "Beginner. 19 topics. Choose one.":{ru:"\u041d\u0430\u0447\u0430\u043b\u044c\u043d\u044b\u0439. 19 \u0442\u0435\u043c. \u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043e\u0434\u043d\u0443.",uz:"Boshlang'ich. 19 mavzu. Birini tanlang."},
 "Elementary. 16 topics. Choose one.":{ru:"\u042d\u043b\u0435\u043c\u0435\u043d\u0442\u0430\u0440\u043d\u044b\u0439. 16 \u0442\u0435\u043c. \u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043e\u0434\u043d\u0443.",uz:"Elementar. 16 mavzu. Birini tanlang."},
 "Intermediate. 18 topics. Choose one.":{ru:"\u0421\u0440\u0435\u0434\u043d\u0438\u0439. 18 \u0442\u0435\u043c. \u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043e\u0434\u043d\u0443.",uz:"O'rta. 18 mavzu. Birini tanlang."},
 "Upper-intermediate. 14 topics. Choose one.":{ru:"\u0412\u044b\u0448\u0435 \u0441\u0440\u0435\u0434\u043d\u0435\u0433\u043e. 14 \u0442\u0435\u043c. \u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043e\u0434\u043d\u0443.",uz:"O'rtadan yuqori. 14 mavzu. Birini tanlang."},
 "Advanced. 10 topics. Choose one.":{ru:"\u041f\u0440\u043e\u0434\u0432\u0438\u043d\u0443\u0442\u044b\u0439. 10 \u0442\u0435\u043c. \u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043e\u0434\u043d\u0443.",uz:"Yuqori. 10 mavzu. Birini tanlang."},
 "Open topic":{ru:"\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0442\u0435\u043c\u0443",uz:"Mavzuni ochish"},
 "Home":{ru:"\u0413\u043b\u0430\u0432\u043d\u0430\u044f",uz:"Bosh sahifa"},
 "Theme:":{ru:"\u0422\u0435\u043c\u0430:",uz:"Mavzu:"},
 "1 General info":{ru:"1 \u041e\u0431\u0449\u0430\u044f \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f",uz:"1 Umumiy ma'lumot"},
 "2 Teacher's rule":{ru:"2 \u041f\u0440\u0430\u0432\u0438\u043b\u043e \u0443\u0447\u0438\u0442\u0435\u043b\u044f",uz:"2 O'qituvchi qoidasi"},
 "3 Student explanation":{ru:"3 \u041e\u0431\u044a\u044f\u0441\u043d\u0435\u043d\u0438\u0435",uz:"3 Tushuntirish"},
 "4 Real-life use":{ru:"4 \u0412 \u0440\u0435\u0430\u043b\u044c\u043d\u043e\u0439 \u0436\u0438\u0437\u043d\u0438",uz:"4 Hayotda qo'llanishi"},
 "5 Examples and drill":{ru:"5 \u041f\u0440\u0438\u043c\u0435\u0440\u044b \u0438 \u0443\u043f\u0440\u0430\u0436\u043d\u0435\u043d\u0438\u044f",uz:"5 Misollar va mashqlar"},
 "General info":{ru:"\u041e\u0431\u0449\u0430\u044f \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f",uz:"Umumiy ma'lumot"},
 "Teacher's rule":{ru:"\u041f\u0440\u0430\u0432\u0438\u043b\u043e \u0443\u0447\u0438\u0442\u0435\u043b\u044f",uz:"O'qituvchi qoidasi"},
 "Student explanation":{ru:"\u041e\u0431\u044a\u044f\u0441\u043d\u0435\u043d\u0438\u0435",uz:"Tushuntirish"},
 "Real-life use":{ru:"\u0412 \u0440\u0435\u0430\u043b\u044c\u043d\u043e\u0439 \u0436\u0438\u0437\u043d\u0438",uz:"Hayotda qo'llanishi"},
 "Examples and drill":{ru:"\u041f\u0440\u0438\u043c\u0435\u0440\u044b \u0438 \u0443\u043f\u0440\u0430\u0436\u043d\u0435\u043d\u0438\u044f",uz:"Misollar va mashqlar"},
 "Next: rule":{ru:"\u0414\u0430\u043b\u0435\u0435: \u043f\u0440\u0430\u0432\u0438\u043b\u043e",uz:"Keyingi: qoida"},
 "Next: explanation":{ru:"\u0414\u0430\u043b\u0435\u0435: \u043e\u0431\u044a\u044f\u0441\u043d\u0435\u043d\u0438\u0435",uz:"Keyingi: tushuntirish"},
 "Next: real life":{ru:"\u0414\u0430\u043b\u0435\u0435: \u0432 \u0436\u0438\u0437\u043d\u0438",uz:"Keyingi: hayotda"},
 "Next: examples":{ru:"\u0414\u0430\u043b\u0435\u0435: \u043f\u0440\u0438\u043c\u0435\u0440\u044b",uz:"Keyingi: misollar"},
 "English only":{ru:"\u0422\u043e\u043b\u044c\u043a\u043e \u0430\u043d\u0433\u043b\u0438\u0439\u0441\u043a\u0438\u0439",uz:"Faqat inglizcha"},
 "Answer":{ru:"\u041e\u0442\u0432\u0435\u0442",uz:"Javob"},
 "Hide":{ru:"\u0421\u043a\u0440\u044b\u0442\u044c",uz:"Yashirish"},
 "Search":{ru:"\u041f\u043e\u0438\u0441\u043a",uz:"Qidiruv"},
 "Type to search...":{ru:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0434\u043b\u044f \u043f\u043e\u0438\u0441\u043a\u0430...",uz:"Qidirish uchun yozing..."},
 "Spin the wheel or tap a theme":{ru:"Крутите колесо или нажмите на тему",uz:"G'ildirakni aylantiring yoki mavzuni bosing"},
 "Choose a theme":{ru:"Выберите тему",uz:"Mavzuni tanlang"},
 "Light":{ru:"Светлая",uz:"Yorug'"},
 "Dark":{ru:"Тёмная",uz:"Qorong'i"},
 "Practice Arena":{ru:"Арена практики",uz:"Amaliyot arenasi"},
 "Topics 1–6 · 12 questions":{ru:"Темы 1–6 · 12 вопросов",uz:"1–6-mavzular · 12 savol"},
 "Topics 7–12 · 12 questions":{ru:"Темы 7–12 · 12 вопросов",uz:"7–12-mavzular · 12 savol"},
 "Topics 13–19 · 14 questions":{ru:"Темы 13–19 · 14 вопросов",uz:"13–19-mavzular · 14 savol"},
 "Topics 13–16 · 8 questions":{ru:"Темы 13–16 · 8 вопросов",uz:"13–16-mavzular · 8 savol"},
 "Topics 13–18 · 12 questions":{ru:"Темы 13–18 · 12 вопросов",uz:"13–18-mavzular · 12 savol"},
 "Topics 7–14 · 16 questions":{ru:"Темы 7–14 · 16 вопросов",uz:"7–14-mavzular · 16 savol"},
 "Topics 7–10 · 8 questions":{ru:"Темы 7–10 · 8 вопросов",uz:"7–10-mavzular · 8 savol"},
 "Mini exam 1":{ru:"Мини-экзамен 1",uz:"Mini imtihon 1"},
 "Mini exam 2":{ru:"Мини-экзамен 2",uz:"Mini imtihon 2"},
 "Mini exam 3":{ru:"Мини-экзамен 3",uz:"Mini imtihon 3"},
 "Mini exams":{ru:"Мини-экзамены",uz:"Mini imtihonlar"},
 "Time for a mini exam!":{ru:"Время для мини-экзамена!",uz:"Mini imtihon vaqti!"},
 "Choose the right answer. See why it is right and why the others are wrong.":{ru:"Выберите правильный ответ. Узнайте, почему он верный, а другие неверные.",uz:"To'g'ri javobni tanlang. Nega u to'g'ri, boshqalari esa xato ekanini biling."},
 "Your best score is saved on this device.":{ru:"Ваш лучший результат сохраняется на этом устройстве.",uz:"Eng yaxshi natijangiz shu qurilmada saqlanadi."},
 "Next topic":{ru:"Следующая тема",uz:"Keyingi mavzu"},
 "Next level":{ru:"Следующий уровень",uz:"Keyingi daraja"},
 "You finished the last topic!":{ru:"Вы прошли последнюю тему!",uz:"Siz oxirgi mavzuni tugatdingiz!"},
 "For everyone · 15 quizzes · 13 mini exams":{ru:"Для всех · 15 тестов · 13 мини-экзаменов",uz:"Hamma uchun · 15 ta test · 13 ta mini imtihon"},
 "A1 · 77 questions":{ru:"A1 · 77 вопросов",uz:"A1 · 77 savol"},
 "Practice for everyone. Pick a quiz and start.":{ru:"Практика для всех. Выберите тест и начните.",uz:"Hamma uchun amaliyot. Testni tanlang va boshlang."},
 "A1 \u00b7 111 questions":{ru:"A1 \u00b7 111 вопросов",uz:"A1 \u00b7 111 savol"},
 "A1 · 84 questions":{ru:"A1 · 84 вопроса",uz:"A1 · 84 savol"},
 "A1 · 94 questions":{ru:"A1 · 94 вопроса",uz:"A1 · 94 savol"},
 "A2 · 80 questions":{ru:"A2 · 80 вопросов",uz:"A2 · 80 savol"},
 "A2 · 86 questions":{ru:"A2 · 86 вопросов",uz:"A2 · 86 savol"},
 "A2 · 74 questions":{ru:"A2 · 74 вопроса",uz:"A2 · 74 savol"},
 "A2 · 77 questions":{ru:"A2 · 77 вопросов",uz:"A2 · 77 savol"},
 "B1 · 78 questions":{ru:"B1 · 78 вопросов",uz:"B1 · 78 savol"},
 "B1 · 75 questions":{ru:"B1 · 75 вопросов",uz:"B1 · 75 savol"},
 "B2 · 76 questions":{ru:"B2 · 76 вопросов",uz:"B2 · 76 savol"},
 "B2 · 73 questions":{ru:"B2 · 73 вопроса",uz:"B2 · 73 savol"},
 "B2 · 72 questions":{ru:"B2 · 72 вопроса",uz:"B2 · 72 savol"},
 "Practice Studio":{ru:"Студия практики",uz:"Mashq studiyasi"},
 "Make your own quizzes and mini exams, or try the teacher's practices.":{ru:"Создавайте свои тесты и мини-экзамены или пробуйте тренировки учителя.",uz:"O'z testlaringiz va mini imtihonlaringizni yarating yoki o'qituvchi mashqlarini sinab ko'ring."},
 "Create a practice":{ru:"Создать тренировку",uz:"Mashq yaratish"},
 "Build a quiz or a mini exam. It is saved on this device.":{ru:"Составьте квиз или мини-экзамен. Он сохранится на этом устройстве.",uz:"Test yoki mini imtihon tuzing. U shu qurilmada saqlanadi."},
 "Create your own · Teacher's practices":{ru:"Создавайте свои · Тренировки учителя",uz:"O'zingiz yarating · O'qituvchi mashqlari"},
 "Your own practices":{ru:"Ваши тренировки",uz:"Sizning mashqlaringiz"},
 "A1 · 78 questions":{ru:"A1 · 78 вопросов",uz:"A1 · 78 savol"},
 "More quizzes are coming soon.":{ru:"Скоро появятся новые тесты.",uz:"Tez orada yangi testlar qo'shiladi."},
 "Type your answer and check it. Wrong answers come back later.":{ru:"Напишите ответ и проверьте. Вопросы с ошибками вернутся позже.",uz:"Javobni yozing va tekshiring. Xato javoblar keyinroq yana chiqadi."},
 "Your progress is saved on this device.":{ru:"Ваш прогресс сохраняется на этом устройстве.",uz:"Natijangiz shu qurilmada saqlanadi."},
 "No results":{ru:"\u041d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e",uz:"Natija topilmadi"},
 "Practice":{ru:"\u041f\u0440\u0430\u043a\u0442\u0438\u043a\u0430",uz:"Mashq"},
 "Want to practice this topic?":{ru:"\u0425\u043e\u0442\u0438\u0442\u0435 \u043f\u043e\u0442\u0440\u0435\u043d\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f \u0441 \u044d\u0442\u043e\u0439 \u0442\u0435\u043c\u043e\u0439?",uz:"Ushbu mavzuda mashq qilmoqchimisiz?"}
};
function L(k,lang){lang=lang||R.dataset.lang||'en';var e=TR[k];return(e&&(lang==='en'||e[lang]))?(lang==='en'?k:e[lang]):k}
var ORIG=null,HK=[];
function i18nInit(){
 if(ORIG)return;ORIG=[];
 var w=D.querySelector('.wrap');if(!w)return;
 var tw=D.createTreeWalker(w,NodeFilter.SHOW_TEXT,null),n;
 while(n=tw.nextNode()){
  if(n.parentNode&&n.parentNode.classList&&n.parentNode.classList.contains('ab'))continue;
  var raw=n.nodeValue,key=raw.replace(/\s+/g,' ').trim();
  if(!key||!TR[key])continue;
  ORIG.push({n:n,lead:raw.match(/^\s*/)[0],trail:raw.match(/\s*$/)[0],key:key});
 }
}
function i18nApply(){
 var lang=R.dataset.lang||'en';
 if(ORIG)ORIG.forEach(function(o){o.n.nodeValue=o.lead+L(o.key,lang)+o.trail});
 HK.forEach(function(o){o.h.textContent=L(o.k,lang);delete o.h.dataset.sp;split(o.h)});
 D.querySelectorAll('.ab').forEach(function(b){b.textContent=L(b.getAttribute('aria-expanded')==='true'?'Hide':'Answer',lang)});
}

/* topic search */
var SR=null,srReq=[],srBox=null,srIn=null,srList=null,srMsg=null,srAnchors=[],srAct=-1;
function srLoad(cb){
 if(SR){cb();return}
 srReq.push(cb);
 if(srReq.length>1)return;
 var s=mk('script');s.src='search-data.js';
 s.onload=function(){SR=(window.GD_Search||[]);var q=srReq.slice();srReq=[];q.forEach(function(f){f()})};
 s.onerror=function(){SR=[];var q=srReq.slice();srReq=[];q.forEach(function(f){f()})};
 D.body.appendChild(s);
}
function srButton(){
 var h=D.querySelector('.hctl');if(!h||h.querySelector('[data-act=search]'))return;
 var b=mk('button','chip se');b.setAttribute('data-act','search');b.setAttribute('aria-label','Search');
 b.innerHTML='<b class="tb" aria-hidden="true"></b>';
 h.appendChild(b);
}
function srBuild(){
 if(srBox)return;
 var ov=mk('div','sch');ov.hidden=true;ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');ov.setAttribute('aria-label','Search');
 var box=mk('div','schbox');
 var inp=mk('input','schin');inp.type='search';inp.autocomplete='off';inp.setAttribute('aria-label','Search');
 var ul=mk('ul','schres');var msg=mk('div','schmsg');
 box.appendChild(inp);box.appendChild(ul);box.appendChild(msg);ov.appendChild(box);
 ov.addEventListener('click',function(e){if(e.target===ov)srClose()});
 inp.addEventListener('input',function(){srRun(inp.value)});
 inp.addEventListener('keydown',srKey);
 D.body.appendChild(ov);
 srBox=ov;srIn=inp;srList=ul;srMsg=msg;
}
function srOpen(){
 if(busy)return;
 srBuild();
 var ph=L('Type to search...');
 srIn.value='';srIn.placeholder=ph;srMsg.textContent=ph;srMsg.style.display='';
 srList.innerHTML='';srAnchors=[];srAct=-1;
 srBox.hidden=false;
 requestAnimationFrame(function(){if(srBox)srBox.classList.add('on')});
 try{srIn.focus()}catch(e){}
 srLoad(function(){if(srIn.value.trim())srRun(srIn.value)});
}
function srClose(){
 if(!srBox)return;
 srBox.classList.remove('on');
 try{srIn.blur()}catch(e){}
 setTimeout(function(){if(srBox)srBox.hidden=true},180);
}
function srEsc(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}
function srHas(hay,tok){
 var i=0;
 while((i=hay.indexOf(tok,i))>=0){
  var prev=(i===0)?'':hay[i-1];
  if(!/[a-zа-яё]/.test(prev))return true;
  i++;
 }
 return false;
}
function srHi(text,toks){
 var frag=D.createDocumentFragment();
 if(!toks.length){frag.appendChild(D.createTextNode(text));return frag}
 var re=new RegExp('('+toks.map(srEsc).join('|')+')','ig'),last=0,m;
 while((m=re.exec(text))){
  if(!m[0]){re.lastIndex++;continue}
  if(m.index>last)frag.appendChild(D.createTextNode(text.slice(last,m.index)));
  var prev=(m.index>0)?text[m.index-1]:'';
  if(prev&&/[a-zA-Zа-яёА-ЯЁ]/.test(prev)){
   frag.appendChild(D.createTextNode(m[0]));last=m.index+m[0].length;continue;
  }
  var b=mk('b','hl');b.textContent=m[0];frag.appendChild(b);
  last=m.index+m[0].length;
 }
 if(last<text.length)frag.appendChild(D.createTextNode(text.slice(last)));
 return frag;
}
function srRun(q){
 q=(q||'').replace(/\s+/g,' ').trim().toLowerCase();
 srList.innerHTML='';srAnchors=[];srAct=-1;
 if(!q||!SR){srMsg.style.display='';srMsg.textContent=L('Type to search...');return}
 var toks=q.split(' '),i,j,res=[];
 for(i=0;i<SR.length;i++){
  var it=SR[i],lt=it.t.toLowerCase(),lc=(it.c||'').toLowerCase(),lk=it.k.toLowerCase(),ll=it.l.toLowerCase();
  var mc=0,sc=0;
  for(j=0;j<toks.length;j++){
   var tk=toks[j];
   if(srHas(lt,tk)){mc++;sc+=100}
   else if(srHas(lc,tk)){mc++;sc+=40}
   else if(srHas(lk,tk)){mc++;sc+=5}
   else if(ll.indexOf(tk)>=0){mc++;sc+=3}
  }
  if(mc)res.push({it:it,mc:mc,sc:sc});
 }
 if(!res.length){srMsg.style.display='';srMsg.textContent=L('No results');return}
 srMsg.style.display='none';
 res.sort(function(a,b){return b.mc-a.mc||b.sc-a.sc||(a.it.l<b.it.l?-1:a.it.l>b.it.l?1:0)||a.it.t.localeCompare(b.it.t)});
 res=res.slice(0,40);
 for(i=0;i<res.length;i++){
  var it2=res[i].it,a=mk('a');a.href=it2.u;
  var col=mk('span','scol');
  var tt=mk('span','st');tt.appendChild(srHi(it2.t,toks));col.appendChild(tt);
  var sn=(it2.c||it2.k).replace(/^(We cover:|Разбираем:|Ko'ramiz:)\s*/i,'').replace(/\s+/g,' ').trim();
  if(sn.length>110)sn=sn.slice(0,110).replace(/\s\S*$/,'')+'\u2026';
  var sd=mk('span','sd');sd.appendChild(srHi(sn,toks));col.appendChild(sd);
  a.appendChild(col);
  var lb=mk('span','sb');lb.textContent=it2.l;a.appendChild(lb);
  var li=mk('li');li.appendChild(a);srList.appendChild(li);srAnchors.push(a);
 }
}
function srSel(){
 for(var i=0;i<srAnchors.length;i++)srAnchors[i].classList.toggle('sel',i===srAct);
 if(srAct>-1&&srAnchors[srAct])srAnchors[srAct].scrollIntoView({block:'nearest'});
}
function srKey(e){
 if(e.key==='Escape'){e.preventDefault();srClose();return}
 if(e.key==='ArrowDown'||e.key==='ArrowUp'){
  if(!srAnchors.length)return;e.preventDefault();
  if(srAct<0)srAct=(e.key==='ArrowDown')?0:srAnchors.length-1;
  else srAct=(srAct+(e.key==='ArrowDown'?1:-1)+srAnchors.length)%srAnchors.length;
  srSel();return;
 }
 if(e.key==='Enter'){if(!srAnchors.length)return;e.preventDefault();srAnchors[srAct>-1?srAct:0].click()}
}
var t=ld('gd-theme'),l=ld('gd-lang');
if(t==='light'||t==='dark')applyTheme(t);else{R.dataset.mode=window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';R.dataset.skin=['p3','p4','p5'].indexOf(t)>-1?t:'basic'}
if(l==='ru'||l==='uz')R.dataset.lang=l;
R.lang=R.dataset.lang;
window.gdInit=sync;

/* page transition overlay */
function mkPT(){PT=mk('div','fx-pt');PT.setAttribute('aria-hidden','true');for(var i=0;i<6;i++){var s=mk('i');s.style.setProperty('--n',i);PT.appendChild(s)}var mm=mk('b','mk');mm.textContent='Grammar Desk';PT.appendChild(mm);D.body.appendChild(PT)}
function cover(cb){if(RM||!PT){cb();return}busy=true;PT.className='fx-pt cv';setTimeout(cb,DUR[R.dataset.skin]||500)}
function uncover(){if(!PT)return;PT.className='fx-pt rev';setTimeout(function(){PT.className='fx-pt';busy=false},950)}
function setTheme(n,x,y){
 tmClose(true);
 var go=function(){applyTheme(n);sv('gd-theme',n);sync()};
 if(RM||!D.startViewTransition){go();return}
 var w=innerWidth,h=innerHeight;
 R.style.setProperty('--vx',x+'px');R.style.setProperty('--vy',y+'px');
 R.style.setProperty('--vr',Math.ceil(Math.hypot(Math.max(x,w-x),Math.max(y,h-y)))+'px');
 R.dataset.vt=n==='light'||n==='dark'?'wave':n;
 D.startViewTransition(go).finished.then(function(){delete R.dataset.vt},function(){delete R.dataset.vt});
}
function tmBtn(){return D.querySelector('[data-act=theme]')}
function tmBuild(){
 var b=tmBtn();if(!b)return;
 TM=mk('div','thm');TM.hidden=true;TM.setAttribute('role','dialog');TM.setAttribute('aria-modal','true');D.body.appendChild(TM);
 b.setAttribute('aria-haspopup','dialog');b.setAttribute('aria-expanded','false');
}
function tmHub(n){var h=TM.querySelector('.twc');if(h)h.textContent=L(NM[n])}
function tmSet(){TM.querySelector('.twb').style.setProperty('--rot',TMR+'deg')}
function tmIdx(){return (Math.round(-TMR/72)%5+5)%5}
function tmTick(){
 var i=tmIdx(),b;if(i===TMI)return;TMI=i;tmHub(TH[i]);
 b=TM.querySelector('.twp');if(b&&b.animate)b.animate([{rotate:(TMV>0?'-13deg':'13deg')},{rotate:'0deg'}],{duration:130,easing:'ease-out'});
}
function tmAngle(e,box){var r=box.getBoundingClientRect();return Math.atan2(e.clientY-r.top-r.height/2,e.clientX-r.left-r.width/2)*180/Math.PI}
function tmLand(){
 var k=Math.round(TMR/72),n,box=TM.querySelector('.twb');
 box.classList.remove('dr');TMR=k*72;tmSet();n=TH[tmIdx()];TMI=tmIdx();tmHub(n);
 clearTimeout(TMT);if(n===cur())return;
 TMT=setTimeout(function(){setTheme(n,innerWidth/2,innerHeight/2)},RM?0:340);
}
function tmGlide(v){
 var t=0;TMV=Math.max(-1.6,Math.min(1.6,v));
 if(RM||Math.abs(TMV)<.06){tmLand();return}
 function step(n){
  var dt=t?n-t:16;t=n;TMR+=TMV*dt;TMV*=Math.exp(-dt/430);tmSet();tmTick();
  if(Math.abs(TMV)>.04)TMF=requestAnimationFrame(step);else{TMF=0;tmLand()}
 }
 TMF=requestAnimationFrame(step);
}
function tmDragBind(box){
 var on=false,moved=0,last=0,lastT=0,x0=0,y0=0;
 box.addEventListener('pointerdown',function(e){
  if(e.button)return;
  TMD=false;cancelAnimationFrame(TMF);TMF=0;clearTimeout(TMT);
  on=true;moved=0;TMV=0;last=tmAngle(e,box);lastT=performance.now();x0=e.clientX;y0=e.clientY;
 });
 box.addEventListener('pointermove',function(e){
  if(!on)return;
  if(!moved){
   if(Math.hypot(e.clientX-x0,e.clientY-y0)<7)return;
   moved=1;box.classList.add('dr');TMR=parseFloat(box.style.getPropertyValue('--rot'))||TMR;
   try{box.setPointerCapture(e.pointerId)}catch(x){}
  }
  var a=tmAngle(e,box),d=(a-last+540)%360-180,n=performance.now(),dt=Math.max(n-lastT,1);
  TMR+=d;TMV=TMV*.6+d/dt*.4;last=a;lastT=n;tmSet();tmTick();
 });
 function up(){
  if(!on)return;on=false;if(!moved)return;
  TMD=true;tmGlide(performance.now()-lastT>90?0:TMV);
 }
 box.addEventListener('pointerup',up);box.addEventListener('pointercancel',up);
}
function tmOpen(){
 var c=cur(),box=mk('div','twb'),w=mk('div','twh'),hub=mk('div','twc'),blade=mk('i','twp'),ra=mk('i','twr'),rb=mk('i','twr twr2'),ttl=mk('div','twt'),hint=mk('div','twi');
 TMR=-TH.indexOf(c)*72;TMI=TH.indexOf(c);TMV=0;TMD=false;
 TM.innerHTML='';TM.setAttribute('aria-label',L('Choose a theme'));
 ttl.textContent=L('Choose a theme');hint.textContent=L('Spin the wheel or tap a theme');
 w.setAttribute('role','radiogroup');w.setAttribute('aria-label',L('Choose a theme'));box.style.setProperty('--rot',TMR+'deg');
 TH.forEach(function(n,i){
  var s=mk('button','twd twd-'+n),t=mk('span');
  s.type='button';s.setAttribute('role','radio');s.setAttribute('aria-checked',String(n===c));s.dataset.act='pick';s.dataset.t=n;
  s.style.setProperty('--a',(i*72)+'deg');t.textContent=L(NM[n]);s.appendChild(t);w.appendChild(s);
  s.addEventListener('pointerenter',function(){if(!box.classList.contains('dr')&&!TMF)tmHub(n)});s.addEventListener('focus',function(){tmHub(n)});
 });
 box.appendChild(ra);box.appendChild(rb);box.appendChild(w);box.appendChild(hub);box.appendChild(blade);
 TM.appendChild(ttl);TM.appendChild(box);TM.appendChild(hint);tmDragBind(box);
 TM.hidden=false;tmBtn().setAttribute('aria-expanded','true');tmHub(c);
 TM.querySelector('[aria-checked=true]').focus({preventScroll:true});
}
function tmClose(f){
 if(!TM||TM.hidden)return;
 clearTimeout(TMT);cancelAnimationFrame(TMF);TMF=0;TM.hidden=true;TM.innerHTML='';tmBtn().setAttribute('aria-expanded','false');if(f)tmBtn().focus();
}
function tmSpin(n){
 var d=((-TH.indexOf(n)*72-TMR)%360+540)%360-180;
 if(RM){setTheme(n,innerWidth/2,innerHeight/2);return}
 clearTimeout(TMT);cancelAnimationFrame(TMF);TMF=0;TMR+=d+360;TMI=TH.indexOf(n);tmSet();tmHub(n);
 TMT=setTimeout(function(){setTheme(n,innerWidth/2,innerHeight/2)},340);
}
function setLang(x){R.dataset.lang=x;R.lang=x;sv('gd-lang',x);sync();i18nApply()}

/* click burst and pointer trail */
function burst(x,y){
 if(RM)return;
 var b=mk('div','bz');b.style.left=x+'px';b.style.top=y+'px';
 for(var i=0;i<8;i++){var s=mk('i');s.style.setProperty('--a',(i*45+Math.random()*30).toFixed(0)+'deg');s.style.setProperty('--r',(38+Math.random()*44).toFixed(0)+'px');b.appendChild(s)}
 D.body.appendChild(b);setTimeout(function(){b.remove()},700);
}
function trail(e){
 if(RM||e.pointerType!=='mouse'||R.dataset.skin==='basic')return;
 var n=performance.now();if(n-lastTrail<45)return;lastTrail=n;
 var d=mk('i','tr');d.style.left=e.clientX+'px';d.style.top=e.clientY+'px';d.style.setProperty('--a',(Math.random()*360).toFixed(0)+'deg');
 D.body.appendChild(d);setTimeout(function(){d.remove()},680);
}

/* ambient layer and scroll progress */
function layers(){
 var bg=mk('div','fx-bg');bg.setAttribute('aria-hidden','true');
 var n=innerWidth<600?9:16;
 for(var i=0;i<n;i++){
  var p=mk('i','pt');
  p.style.setProperty('--x',(Math.random()*100).toFixed(1)+'%');
  p.style.setProperty('--y',(8+Math.random()*84).toFixed(1)+'%');
  p.style.setProperty('--s',(6+Math.random()*16).toFixed(1));
  p.style.setProperty('--d',(10+Math.random()*14).toFixed(1)+'s');
  p.style.setProperty('--dl','-'+(Math.random()*20).toFixed(1)+'s');
  p.style.setProperty('--dr',((Math.random()-.5)*160).toFixed(0)+'px');
  p.style.setProperty('--rot',((Math.random()-.5)*80).toFixed(0)+'deg');
  bg.appendChild(p);
 }
 D.body.insertBefore(bg,D.body.firstChild);
 var bar=mk('div','fx-bar'),bi=mk('i');bar.setAttribute('aria-hidden','true');bar.appendChild(bi);D.body.appendChild(bar);
 var tk=false;
 function pg(){tk=false;var m=R.scrollHeight-innerHeight;bi.style.transform='scaleX('+(m>8?Math.min(1,Math.max(0,scrollY/m)):0).toFixed(3)+')'}
 function rq(){if(!tk){tk=true;requestAnimationFrame(pg)}}
 addEventListener('scroll',rq,{passive:true});addEventListener('resize',rq);pg();
}

/* kinetic headings */
function split(h){
 if(h.dataset.sp)return;
 var label=h.textContent.replace(/\s+/g,' ').trim(),c=0,frag=D.createDocumentFragment();
 h.dataset.sp='1';h.setAttribute('aria-label',label);
 [].slice.call(h.childNodes).forEach(function(n){
  if(n.nodeType===3){
   n.textContent.split(/(\s+)/).forEach(function(w){
    if(!w)return;
    if(/^\s+$/.test(w)){frag.appendChild(D.createTextNode(' '));return}
    var s=mk('span','wd');s.setAttribute('aria-hidden','true');
    w.split('').forEach(function(ch){var i=mk('span','ch');i.style.setProperty('--c',c++);i.textContent=ch;s.appendChild(i)});
    frag.appendChild(s);
   });
  }else frag.appendChild(n.cloneNode(true));
 });
 h.textContent='';h.appendChild(frag);
}
function stag(){
 [].forEach.call(D.querySelectorAll('.menu li'),function(li,i){li.style.setProperty('--i',Math.min(i,16))});
 [].forEach.call(D.querySelectorAll('.card,.lg'),function(p){[].forEach.call(p.children,function(c,i){c.style.setProperty('--k',Math.min(i,8))})});
 [].forEach.call(D.querySelectorAll('.card ol,.card ul'),function(L){[].forEach.call(L.children,function(c,i){c.style.setProperty('--k',Math.min(i+1,10))})});
}

/* events */
D.addEventListener('click',function(e){
 var tg=e.target.closest?e.target:e.target.parentElement;if(!tg)return;
 if(TMD){TMD=false;return}
 if(TM&&!TM.hidden&&!tg.closest('.twd,[data-act=theme]'))tmClose(true);
 var r=tg.getBoundingClientRect(),x=e.clientX||r.left+r.width/2,y=e.clientY||r.top+r.height/2;
 burst(x,y);
 var a=tg.closest('a[href]');
 if(a&&!RM&&PT&&!busy&&!e.defaultPrevented&&e.button===0&&!(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)&&!a.target&&!a.hasAttribute('download')&&a.protocol===location.protocol&&a.host===location.host&&(a.pathname!==location.pathname||a.search!==location.search)){
  e.preventDefault();ss('gd-pt','1');var u=a.href;cover(function(){location.href=u});return;
 }
 var b=tg.closest('[data-act]');if(!b)return;
 var act=b.dataset.act;
 if(act==='theme'){if(TM){if(TM.hidden)tmOpen();else tmClose(true)}}
 else if(act==='pick')tmSpin(b.dataset.t);
 else if(act==='lang')setLang(b.dataset.l);
 else if(act==='search')srOpen();
 else if(act==='sec'){
  var to=b.dataset.to;
  D.querySelectorAll('.pane').forEach(function(p){p.hidden=p.id!==to});
  D.querySelectorAll('.sn').forEach(function(s){s.setAttribute('aria-selected',String(s.dataset.to===to))});
  var lay=D.querySelector('.lay');if(lay)lay.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'});
 }else if(act==='ans'){
  var p=D.getElementById(b.getAttribute('aria-controls')),o=p.hidden;
  p.hidden=!o;b.setAttribute('aria-expanded',String(o));b.textContent=L(o?'Hide':'Answer');
 }
});
D.addEventListener('pointermove',trail,{passive:true});
D.addEventListener('keydown',function(e){
 if(TM&&!TM.hidden){
  if(e.key==='Escape'){tmClose(true);return}
  if(/^Arrow/.test(e.key)||e.key==='Tab'){e.preventDefault();var it=[].slice.call(TM.querySelectorAll('.twd')),n=it.indexOf(D.activeElement)+(e.key==='ArrowRight'||e.key==='ArrowDown'||(e.key==='Tab'&&!e.shiftKey)?1:-1);it[(n+it.length)%it.length].focus();return}
 }
 if((e.ctrlKey||e.metaKey)&&(e.key==='k'||e.key==='K')){e.preventDefault();srOpen();return}
 if(e.key==='Escape'&&srBox&&!srBox.hidden){srClose();return}
 if(e.key==='/'&&!(srBox&&!srBox.hidden)){
  var tg=e.target,tag=(tg&&tg.tagName||'').toUpperCase();
  if(tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT'||(tg&&tg.isContentEditable))return;
  e.preventDefault();srOpen();
 }
});
addEventListener('pageshow',function(e){if(e.persisted&&PT){PT.className='fx-pt';busy=false}R.classList.remove('pt-hold')});

/* boot */
srButton();tmBuild();
if(RM){R.classList.remove('pt-hold');i18nInit();i18nApply();sync();return}
[].forEach.call(D.querySelectorAll('h1'),function(h){var k=h.textContent.replace(/\s+/g,' ').trim();if(TR[k])HK.push({h:h,k:k});split(h)});
stag();layers();mkPT();
if(sg('gd-pt')){
 ss('gd-pt',null);R.classList.add('pt-came');PT.className='fx-pt hold';R.classList.remove('pt-hold');
 setTimeout(uncover,90);setTimeout(function(){R.classList.remove('pt-came')},1800);
}else R.classList.remove('pt-hold');
i18nInit();i18nApply();
sync();
})();
