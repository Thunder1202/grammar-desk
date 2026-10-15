const fs = require('fs');
const dir = process.argv[2];
const levels = { a1: 'A1', a2: 'A2', b1: 'B1', b2: 'B2', c1: 'C1/C2' };
function decode(s) {
  return s
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'").replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ').trim();
}
function coverOf(s) {
  return s.split(/You will be able to:|Вы сможете:|Siz qila olasiz:/)[0].trim();
}
const out = [];
for (const f in levels) {
  const html = fs.readFileSync(dir + '/' + f + '.html', 'utf8');
  const re = /<li><a class="lv" href="([^"]+\.html)"><b>([\s\S]*?)<\/b><span>Open topic<\/span><\/a><em class="tp">([\s\S]*?)<\/em><\/li>/g;
  let m;
  while ((m = re.exec(html))) {
    const u = m[1];
    const t = decode(m[2]);
    const tp = m[3];
    const tls = {};
    const tre = /<span class="tl" data-l="(en|ru|uz)"[^>]*>([\s\S]*?)<\/span>/g;
    let tm;
    while ((tm = tre.exec(tp))) tls[tm[1]] = decode(tm[2]);
    const langs = ['en', 'ru', 'uz'];
    const k = langs.map(function (x) { return tls[x]; }).filter(Boolean).join(' | ');
    const c = langs.map(function (x) { return tls[x] ? coverOf(tls[x]) : ''; }).filter(Boolean).join(' | ');
    out.push({ u: u, t: t, l: levels[f], c: c, k: k });
  }
}
out.sort(function (a, b) { return a.l < b.l ? -1 : a.l > b.l ? 1 : a.t.localeCompare(b.t); });
fs.writeFileSync(dir + '/search-data.js', 'window.GD_Search=' + JSON.stringify(out) + ';\n', 'utf8');
console.log('topics:', out.length);
