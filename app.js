(function(){
var TH=['p3','p4','p5','basic'],NM={p3:'Persona 3',p4:'Persona 4',p5:'Persona 5',basic:'Basic'},R=document.documentElement,D=document;
var RM=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
var DUR={p3:540,p4:560,p5:500,basic:260},busy=false,PT=null,lastTrail=0;
function sv(k,v){try{localStorage.setItem(k,v)}catch(e){}}
function ld(k){try{return localStorage.getItem(k)}catch(e){return null}}
function ss(k,v){try{if(v===null)sessionStorage.removeItem(k);else sessionStorage.setItem(k,v)}catch(e){}}
function sg(k){try{return sessionStorage.getItem(k)}catch(e){return null}}
function mk(tag,cls){var e=D.createElement(tag);if(cls)e.className=cls;return e}
function sync(){
 R.style.setProperty('--tn','"'+NM[R.dataset.skin]+'"');
 D.querySelectorAll('[data-act=theme]').forEach(function(b){b.setAttribute('aria-label','Theme: '+NM[R.dataset.skin]+'. Click to change.')});
 D.querySelectorAll('[data-act=lang]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.l===R.dataset.lang))});
}
/* interface translations (English text is the key and the fallback) */
var TR={
 "Choose your level":{ru:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0443\u0440\u043e\u0432\u0435\u043d\u044c",uz:"Darajani tanlang"},
 "English grammar from A1 to C1, in English, Russian and Uzbek.":{ru:"\u0410\u043d\u0433\u043b\u0438\u0439\u0441\u043a\u0430\u044f \u0433\u0440\u0430\u043c\u043c\u0430\u0442\u0438\u043a\u0430 \u043e\u0442 A1 \u0434\u043e C1 \u043d\u0430 \u0430\u043d\u0433\u043b\u0438\u0439\u0441\u043a\u043e\u043c, \u0440\u0443\u0441\u0441\u043a\u043e\u043c \u0438 \u0443\u0437\u0431\u0435\u043a\u0441\u043a\u043e\u043c.",uz:"Ingliz tili grammatikasi A1 dan C1 gacha - ingliz, rus va o'zbek tillarida."},
 "Beginner \u00b7 14 topics":{ru:"\u041d\u0430\u0447\u0430\u043b\u044c\u043d\u044b\u0439 \u00b7 14 \u0442\u0435\u043c",uz:"Boshlang'ich \u00b7 14 mavzu"},
 "Elementary \u00b7 11 topics":{ru:"\u042d\u043b\u0435\u043c\u0435\u043d\u0442\u0430\u0440\u043d\u044b\u0439 \u00b7 11 \u0442\u0435\u043c",uz:"Elementar \u00b7 11 mavzu"},
 "Intermediate \u00b7 14 topics":{ru:"\u0421\u0440\u0435\u0434\u043d\u0438\u0439 \u00b7 14 \u0442\u0435\u043c",uz:"O'rta \u00b7 14 mavzu"},
 "Upper-intermediate \u00b7 13 topics":{ru:"\u0412\u044b\u0448\u0435 \u0441\u0440\u0435\u0434\u043d\u0435\u0433\u043e \u00b7 13 \u0442\u0435\u043c",uz:"O'rtadan yuqori \u00b7 13 mavzu"},
 "Advanced \u00b7 9 topics":{ru:"\u041f\u0440\u043e\u0434\u0432\u0438\u043d\u0443\u0442\u044b\u0439 \u00b7 9 \u0442\u0435\u043c",uz:"Yuqori \u00b7 9 mavzu"},
 "Beginner. 14 topics. Choose one.":{ru:"\u041d\u0430\u0447\u0430\u043b\u044c\u043d\u044b\u0439. 14 \u0442\u0435\u043c. \u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043e\u0434\u043d\u0443.",uz:"Boshlang'ich. 14 mavzu. Birini tanlang."},
 "Elementary. 11 topics. Choose one.":{ru:"\u042d\u043b\u0435\u043c\u0435\u043d\u0442\u0430\u0440\u043d\u044b\u0439. 11 \u0442\u0435\u043c. \u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043e\u0434\u043d\u0443.",uz:"Elementar. 11 mavzu. Birini tanlang."},
 "Intermediate. 14 topics. Choose one.":{ru:"\u0421\u0440\u0435\u0434\u043d\u0438\u0439. 14 \u0442\u0435\u043c. \u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043e\u0434\u043d\u0443.",uz:"O'rta. 14 mavzu. Birini tanlang."},
 "Upper-intermediate. 13 topics. Choose one.":{ru:"\u0412\u044b\u0448\u0435 \u0441\u0440\u0435\u0434\u043d\u0435\u0433\u043e. 13 \u0442\u0435\u043c. \u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043e\u0434\u043d\u0443.",uz:"O'rtadan yuqori. 13 mavzu. Birini tanlang."},
 "Advanced. 9 topics. Choose one.":{ru:"\u041f\u0440\u043e\u0434\u0432\u0438\u043d\u0443\u0442\u044b\u0439. 9 \u0442\u0435\u043c. \u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043e\u0434\u043d\u0443.",uz:"Yuqori. 9 mavzu. Birini tanlang."},
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
 "Hide":{ru:"\u0421\u043a\u0440\u044b\u0442\u044c",uz:"Yashirish"}
};
function L(k,lang){lang=lang||R.dataset.lang||'en';var e=TR[k];return(e&&(lang==='en'||e[lang]))?(lang==='en'?k:e[lang]):k}
var ORIG=null;
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
 D.querySelectorAll('.ab').forEach(function(b){b.textContent=L(b.getAttribute('aria-expanded')==='true'?'Hide':'Answer',lang)});
}
var t=ld('gd-theme'),l=ld('gd-lang');
if(TH.indexOf(t)>-1)R.dataset.skin=t;else if(TH.indexOf(R.dataset.skin)<0)R.dataset.skin='p3';
if(l==='ru'||l==='uz')R.dataset.lang=l;
R.lang=R.dataset.lang;
window.gdInit=sync;

/* page transition overlay */
function mkPT(){PT=mk('div','fx-pt');PT.setAttribute('aria-hidden','true');for(var i=0;i<6;i++){var s=mk('i');s.style.setProperty('--n',i);PT.appendChild(s)}var mm=mk('b','mk');mm.textContent='Grammar Desk';PT.appendChild(mm);D.body.appendChild(PT)}
function cover(cb){if(RM||!PT){cb();return}busy=true;PT.className='fx-pt cv';setTimeout(cb,DUR[R.dataset.skin]||500)}
function uncover(){if(!PT)return;PT.className='fx-pt rev';setTimeout(function(){PT.className='fx-pt';busy=false},950)}
function setTheme(n){
 if(busy)return;
 cover(function(){if(PT)PT.className='fx-pt hold';R.dataset.skin=n;sv('gd-theme',n);sync();setTimeout(uncover,RM?0:110)});
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
 var r=tg.getBoundingClientRect(),x=e.clientX||r.left+r.width/2,y=e.clientY||r.top+r.height/2;
 burst(x,y);
 var a=tg.closest('a[href]');
 if(a&&!RM&&PT&&!busy&&!e.defaultPrevented&&e.button===0&&!(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)&&!a.target&&!a.hasAttribute('download')&&a.protocol===location.protocol&&a.host===location.host&&(a.pathname!==location.pathname||a.search!==location.search)){
  e.preventDefault();ss('gd-pt','1');var u=a.href;cover(function(){location.href=u});return;
 }
 var b=tg.closest('[data-act]');if(!b)return;
 var act=b.dataset.act;
 if(act==='theme')setTheme(TH[(TH.indexOf(R.dataset.skin)+1)%TH.length]);
 else if(act==='lang')setLang(b.dataset.l);
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
addEventListener('pageshow',function(e){if(e.persisted&&PT){PT.className='fx-pt';busy=false}R.classList.remove('pt-hold')});

/* boot */
if(RM){R.classList.remove('pt-hold');i18nInit();i18nApply();sync();return}
[].forEach.call(D.querySelectorAll('h1'),split);
stag();layers();mkPT();
if(sg('gd-pt')){
 ss('gd-pt',null);R.classList.add('pt-came');PT.className='fx-pt hold';R.classList.remove('pt-hold');
 setTimeout(uncover,90);setTimeout(function(){R.classList.remove('pt-came')},1800);
}else R.classList.remove('pt-hold');
i18nInit();i18nApply();
sync();
})();
