const fs = require('fs');
const path = require('path');

const root = __dirname;
const phone = '0533 408 7596';
const tel = 'tel:+905334087596';
const email = 'bahadirhankarakoc163@icloud.com';
const address = 'Avcılar Mahallesi, Fener Sokak No: 4, Edremit/Balıkesir';

const variants = [
  ['vakumlu', 'Vakumlu'],
  ['krom_kilifli', 'Krom Kılıflı'],
  ['tamboy_vakumlu', 'Tam Boy Vakumlu'],
  ['tamboy_krom_kilifli', 'Tam Boy Krom Kılıflı'],
  ['uzunsoguksulu_vakumlu', 'Uzun Soğuk Sulu Vakumlu'],
  ['uzunsoguksulu_krom_kilifli', 'Uzun Soğuk Sulu Krom Kılıflı'],
];
const names = {
  24: variants.slice(0, 4),
  30: variants.slice(0, 5),
  36: variants,
};
const products = Object.entries(names).flatMap(([count, list]) => list.map(([variant, label]) => {
  const slug = `${count}_${variant}`.replace('36_tamboy_krom_kilifli', '36_tamboy_kromkilifli').replace('36_uzunsoguksulu_krom_kilifli', '36_uzunsoguksulu_kromkilifli');
  const full = variant.startsWith('tamboy_');
  const long = variant.startsWith('uzunsoguksulu_');
  const hot = count === '24' ? ['340 x 1540', '440 x 1600', '140 + 50 = 190'] : count === '30' ? ['340 x 1920', '440 x 1980', '175 + 60 = 235'] : ['340 x 2300', '440 x 2360', '210 + 72 = 282'];
  const cold = full ? (count === '24' ? ['300 x 1540', '370 x 1600', '110'] : ['300 x 1920', '370 x 1980', '140']) : long ? ['300 x 1540', '370 x 1600', '110'] : ['300 x 540', '370 x 600', '40'];
  return {
    slug, count, label, title: `${count}'${count === '24' ? 'lü' : count === '30' ? 'lu' : 'lı'} ${label}`,
    photo: `${slug}.png`, hot, cold, total: hot[2].split('=')[1].trim(),
    people: count === '24' ? '4 - 5' : count === '30' ? '6 - 7' : full || long ? '8 - 10' : '6 - 7',
  };
}));

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}

function shell(title, main, depth = 0, active = '') {
  const up = '../'.repeat(depth);
  const home = `${up}index.html`;
  const nav = [
    ['Ana Sayfa', home, 'home'],
    ['Ürünler', `${up}urunler.html`, 'products'],
    ['Referanslar', `${up}referanslar.html`, 'references'],
    ['Ücretsiz Keşif', `${home}#kesif`, 'discovery'],
    ['İletişim', `${home}#iletisim`, 'contact'],
  ];
  return `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} | Karakoç Güneş Enerjisi Sistemleri</title>
  <meta name="description" content="Karakoç güneş enerjisi sistemleri, doğalgaz ve tesisat hizmetleri. Altınoluk ve Edremit'de ücretsiz keşif için ${phone}.">
  <link rel="icon" href="${up}assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${up}assets/styles-v2.css">
</head>
<body>
  <div class="topbar"><div class="container"><span>Altınoluk • Edremit · Güneş enerjisi ve tesisat</span><a href="${tel}">Bizi arayın: ${phone}</a></div></div>
  <header class="site-header"><div class="container nav">
    <a class="brand" href="${home}" aria-label="Karakoç ana sayfa"><img src="${up}img/karakoclogo.png" alt="Karakoç İnşaat" width="710" height="116"></a>
    <button class="menu-toggle" type="button" aria-label="Menüyü aç" aria-expanded="false">☰</button>
    <nav class="menu" aria-label="Ana menü">${nav.map(([name, href, key]) => `<a${active === key ? ' class="active"' : ''} href="${href}">${name}</a>`).join('')}</nav>
    <a class="header-call" href="${tel}">Hemen Ara <span aria-hidden="true">↗</span></a>
  </div></header>
  <main>${main}</main>
  <footer class="site-footer"><div class="container footer-grid">
    <div><h3>Karakoç Güneş Enerjisi Sistemleri ve Doğal Gaz</h3><p>Altınoluk ve Edremit'de güneş enerjisi, doğalgaz, su tesisatı, ısı pompası, kombi servis ve montaj.</p></div>
    <div><h4>Bağlantılar</h4><div class="footer-links"><a href="${up}urunler.html">Ürünler</a><a href="${up}referanslar.html">Referanslar</a><a href="${home}#kesif">Ücretsiz Keşif</a><a href="${home}#iletisim">İletişim</a></div></div>
    <div><h4>İletişim</h4><p><a href="${tel}">Telefon: ${phone}</a><br><span>Adres: ${address}</span><br><a class="footer-email" href="mailto:${email}">E-posta: ${email}</a></p></div>
  </div><div class="container footer-bottom">© 2026 Karakoç. Tüm hakları saklıdır.</div></footer>
  <script src="${up}assets/main.js"></script>
</body></html>`;
}

function pageHero(kicker, title, copy) {
  return `<section class="page-hero"><div class="container"><p class="eyebrow">${kicker}</p><h1>${title}</h1><p>${copy}</p></div></section>`;
}

function cta() {
  return `<section class="cta-band" id="kesif"><div class="container cta-inner"><div><p class="eyebrow">ÜCRETSİZ KEŞİF</p><h2>Doğru sistemi yerinde belirleyelim.</h2><p>Güneş enerjisi ve doğalgaz işleriniz için Altınoluk ve Edremit'de ücretsiz keşif.</p></div><a class="btn btn-primary" href="${tel}">Keşif İçin Ara <span aria-hidden="true">↗</span></a></div></section>`;
}

function homePage() {
  const featured = ['24_vakumlu', '30_vakumlu', '36_vakumlu'].map(slug => products.find(p => p.slug === slug));
  const main = `<section class="hero">
    <img src="assets/karakoc-hero.png" alt="Çatıda güneş enerjisi sistemi ve montaj çalışması">
    <div class="hero-shade"></div>
    <div class="container hero-content"><p class="eyebrow">ALTINOLUK'TA GÜNEŞ ENERJİSİ SİSTEMLERİ</p><h1>Karakoç Güneş Enerjisi ve Doğalgaz Sistemleri</h1><p>Doğalgaz, su tesisatı, ısı pompası, kombi servis ve montaj. Eviniz ve iş yeriniz için keşiften kuruluma yanınızdayız.</p><div class="hero-actions"><a class="btn btn-primary" href="index.html#kesif">Ücretsiz Keşif <span aria-hidden="true">↗</span></a><a class="btn btn-light" href="urunler.html">Ürünleri İncele</a></div></div>
  </section>
  <div class="hero-under"><div class="container"><span>Altınoluk / Edremit</span><strong>Güneş enerjisi · Doğalgaz · Tesisat</strong><a href="${tel}">${phone} <span aria-hidden="true">↗</span></a></div></div>
  <section class="service-section" id="hizmetler"><div class="container"><div class="section-head"><div><p class="section-kicker">HİZMETLER</p><h2>Enerji ve tesisatta tek adres.</h2></div><p>Yerinde keşif, uygun ürün seçimi, temiz montaj ve servis desteği.</p></div><div class="service-grid"><article><span class="service-no">01</span><h3>Güneş Enerjisi Sistemleri</h3><p>Sıcak su ihtiyacınıza ve çatınıza uygun vakum tüplü sistemler.</p></article><article><span class="service-no">02</span><h3>Doğalgaz ve Su Tesisatı</h3><p>Ev, apartman ve iş yeri tesisatı için keşif ve uygulama.</p></article><article><span class="service-no">03</span><h3>Kombi ve Isı Pompası</h3><p>Kombi servis ve montajı ile ısı pompası kurulum desteği.</p></article></div></div></section>
  <section class="products-preview"><div class="container"><div class="section-head"><div><p class="section-kicker">ÜRÜNLER</p><h2>Güneş enerjisi modelleri</h2></div><a class="text-link" href="urunler.html">Tüm 15 Ürün <span aria-hidden="true">↗</span></a></div><div class="preview-grid">${featured.map(p => `<article><a href="urun-${p.slug}.html"><img src="img/${p.photo}" alt="${p.title}" loading="lazy"><span>${p.count} TÜP · VAKUMLU</span><h3>${p.title}</h3><small>${p.total} L sıcak su · ${p.people} kişi</small></a></article>`).join('')}</div></div></section>
  <section class="reference-link-band"><div class="container reference-home-head"><div><p class="section-kicker">REFERANSLAR</p><h2>Uygulamalarımız</h2></div><a class="text-link" href="referanslar.html">Referanslar Sayfası <span aria-hidden="true">↗</span></a></div><div class="container reference-home-grid"><div class="reference-item"><img src="img/referanslar/referans-009.jpeg" alt="Çatıda güneş enerjisi sistemi" loading="lazy" decoding="async"></div><div class="reference-item"><img src="img/referanslar/referans-022.jpeg" alt="Güneş enerjisi tankı ve tüpleri" loading="lazy" decoding="async"></div><div class="reference-item"><img src="img/referanslar/referans-032.jpeg" alt="Çatıda üç güneş enerjisi sistemi" loading="lazy" decoding="async"></div></div></section>
  ${cta()}
  <section class="contact-section" id="iletisim"><div class="container contact-inline"><div><p class="section-kicker">İLETİŞİM</p><h2>Karakoç ile görüşün.</h2><p>Keşif, ürün ve servis talepleriniz için doğrudan arayın.</p></div><div class="contact-details"><a class="contact-phone" href="${tel}">${phone} <span aria-hidden="true">↗</span></a><p>${address}</p></div></div></section>`;
  return shell('Ana Sayfa', main, 0, 'home');
}

function catalogCard(p) {
  return `<article class="catalog-card"><a class="catalog-image" href="urun-${p.slug}.html"><img src="img/${p.photo}" alt="${p.title} güneş enerjisi sistemi" loading="lazy"></a><div class="catalog-info"><span class="product-tag">${p.count} tüp · ${p.label}</span><h2><a href="urun-${p.slug}.html">${p.title}</a></h2><p>${p.total} L sıcak su kapasitesi · ${p.people} kişi</p><a class="text-link" href="urun-${p.slug}.html">Ürünü İncele <span aria-hidden="true">↗</span></a></div></article>`;
}

function catalogPage() {
  const main = `${pageHero('KARAKOÇ ÜRÜNLERİ', 'Güneş Enerjisi Sistemleri', '24, 30 ve 36 tüplü modeller. Her ürünün fotoğrafını ve teknik özelliklerini inceleyin.')}
    <section class="catalog-section"><div class="container"><div class="catalog-intro"><strong>15 MODEL</strong><span>Vakumlu ve krom kılıflı sistemler</span></div><div class="catalog-grid">${products.map(catalogCard).join('')}</div></div></section>`;
  return shell('Ürünler', main, 0, 'products');
}

function specRows(p) {
  const steel = '0,60 mm · 304 kalite paslanmaz krom nikel';
  return [
    ['Sıcak su iç depo sac kalınlığı', steel],
    ['Sıcak su iç depo ölçüleri', `${p.hot[0]} mm`],
    ['Sıcak su dış depo ölçüleri', `${p.hot[1]} mm`],
    ['Sıcak su deposu + vakumlu tüpler', `${p.hot[2]} L`],
    ['Sıcak ve soğuk su depo izolasyonu', 'Polüretan'],
    ['Soğuk su iç depo sac kalınlığı', steel],
    ['Soğuk su iç depo ölçüleri', `${p.cold[0]} mm`],
    ['Soğuk su dış depo ölçüleri', `${p.cold[1]} mm`],
    ['Soğuk su deposu net hacmi', `${p.cold[2]} L`],
    ['Tüp ölçüleri', '470 x 1800 mm'],
    ['Kullanıcı kişi sayısı', p.people],
  ].map(([key, value]) => `<tr><th scope="row">${key}</th><td>${value}</td></tr>`).join('');
}

function detailPage(p) {
  const main = `<section class="detail-heading"><div class="container"><nav class="breadcrumb" aria-label="Sayfa yolu"><a href="index.html">Ana Sayfa</a><span>/</span><a href="urunler.html">Ürünler</a><span>/</span><span>${p.title}</span></nav><p class="section-kicker">GÜNEŞ ENERJİSİ SİSTEMİ</p><h1>${p.title}</h1><p>${p.count} tüplü ${p.label.toLocaleLowerCase('tr')} model</p></div></section>
  <section class="detail-section"><div class="container detail-grid"><div class="detail-image"><img src="img/${p.photo}" alt="${p.title} güneş enerjisi sistemi"></div><div class="detail-summary"><span class="product-tag">${p.count} tüp · ${p.label}</span><h2>Ürüne Genel Bakış</h2><p>Vakum tüplü sıcak su sistemi. Kapasite ve depo ölçüleri aşağıdaki teknik tabloda yer alır. Montaj koşulları yerinde keşifte değerlendirilir.</p><div class="stat-grid"><div><strong>${p.total} L</strong><span>Toplam sıcak su</span></div><div><strong>${p.cold[2]} L</strong><span>Soğuk su deposu</span></div><div><strong>${p.people}</strong><span>Kişi sayısı</span></div></div><a class="btn btn-primary" href="${tel}">Bu Ürün İçin Ara <span aria-hidden="true">↗</span></a><a class="text-link" href="urunler.html">Tüm Ürünler <span aria-hidden="true">↗</span></a></div></div></section>
  <section class="spec-section"><div class="container"><div class="section-head"><div><p class="section-kicker">ÜRÜN BİLGİSİ</p><h2>Teknik Özellikler</h2></div></div><div class="spec-wrap"><table class="spec-table"><tbody>${specRows(p)}</tbody></table></div></div></section>`;
  return shell(p.title, main, 0, 'products');
}

const referenceDir = path.join(root, 'img', 'referanslar');
const references = fs.existsSync(referenceDir)
  ? fs.readdirSync(referenceDir).filter(name => /^referans-\d{3}\.jpeg$/.test(name)).sort()
  : [];
const referencePageSize = 15;
const referencePageCount = Math.ceil(references.length / referencePageSize);
const referenceHref = page => page === 1 ? 'referanslar.html' : `referanslar-${page}.html`;

function referencesPage(page) {
  const first = (page - 1) * referencePageSize;
  const photos = references.slice(first, first + referencePageSize);
  const gallery = photos.map((name, index) => {
    const number = first + index + 1;
    return `<div class="reference-item"><img src="img/referanslar/${name}" alt="Karakoç güneş enerjisi uygulaması, fotoğraf ${number}" loading="lazy" decoding="async"></div>`;
  }).join('');
  const pagination = Array.from({ length: referencePageCount }, (_, index) => {
    const number = index + 1;
    return `<a href="${referenceHref(number)}"${number === page ? ' aria-current="page"' : ''} aria-label="${number}. sayfa">${number}</a>`;
  }).join('');
  const main = `<section class="reference-heading"><div class="container"><p class="section-kicker">KARAKOÇ</p><h1>Referanslar</h1><p>Güneş enerjisi uygulamalarımızdan fotoğraflar.</p></div></section>
  <section class="reference-gallery"><div class="container"><div class="reference-gallery-top"><strong>${references.length} fotoğraf</strong><span>${page} / ${referencePageCount} sayfa</span></div><div class="reference-grid">${gallery}</div>
  <nav class="reference-pagination" aria-label="Referans sayfaları">${page > 1 ? `<a class="page-step" href="${referenceHref(page - 1)}" aria-label="Önceki sayfa">‹ <span>Önceki</span></a>` : ''}${pagination}${page < referencePageCount ? `<a class="page-step" href="${referenceHref(page + 1)}" aria-label="Sonraki sayfa"><span>Sonraki</span> ›</a>` : ''}</nav></div></section>
  `;
  return shell(page === 1 ? 'Referanslar' : `Referanslar - Sayfa ${page}`, main, 0, 'references');
}

function write(file, content) {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, 'utf8');
}

write('index.html', homePage());
write('urunler.html', catalogPage());
for (let page = 1; page <= referencePageCount; page++) {
  write(referenceHref(page), referencesPage(page));
}
products.forEach(p => write(`urun-${p.slug}.html`, detailPage(p)));
console.log(`Generated ${products.length} product detail pages and ${referencePageCount} reference pages.`);
