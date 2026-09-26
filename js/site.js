(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = matchMedia('(max-width: 640px)').matches;
  const finePointer = matchMedia('(pointer: fine)').matches;
  const safePlay = (v) => { try { const p = v && v.play(); if (p && p.catch) p.catch(() => {}); } catch (e) {} };

  /* ---------- data ---------- */
  const REELS = [
    { t: 'Excelsior', c: '', d: 'A longer-form edit — pacing sustained across a full narrative arc.', v: 'excelsior', g: 'Editing,Long-form' },
    { t: 'Kollectibles Reel', c: 'Kollectibles', d: 'A product showcase edit for Kollectibles, cut for short-form reach.', v: 'car-reel-01', g: 'Editing,Short-form' },
    { t: 'Farm Life', c: '', d: 'Slice-of-life farm footage, edited for short-form storytelling.', v: 'cow-stall', g: 'Editing' },
    { t: 'Innovative — Explainer I', c: 'Innovative', d: 'A talking-head explainer for Innovative, captioned for silent viewing.', v: 'innovative-talk-01', g: 'Editing,Captions' },
    { t: 'Lotus Growing', c: '', d: 'Part of an educational gardening series — clear, engaging how-to editing.', v: 'lotus-growing', g: 'Editing,Series' },
    { t: 'Kollectibles — BDC Event', c: 'Kollectibles', d: 'Event coverage from a Bengaluru diecast meet — Kollectibles’ stall, cut into a fast, on-location brand reel.', v: 'kollectibles-event', g: 'Editing,Event,Short-form' },
    { t: 'Silk Growing', c: '', d: 'Educational content on silk cultivation, edited for clarity and retention.', v: 'silk-growing', g: 'Editing,Series' },
    { t: 'Ayudha Pooje — Kollection Sale', c: 'Kollectibles', d: 'A festive motion poster for Kollectibles’ Ayudha Pooje sale — diecast collection styled with traditional pooja elements for a seasonal push.', v: 'ayudha-pooje-motion', g: 'Editing,Motion Graphics,Festive' },
    { t: 'Gardening Tips', c: '', d: 'Gardening tips edited for an easy-to-follow, binge-friendly series.', v: 'tares-gardening', g: 'Editing,Series' },
    { t: 'Goma — Asian Experience', c: 'Goma', d: 'A restaurant ad edit for Goma, an Asian dining brand — mood, food styling and pacing built for the feed.', v: 'restaurant-ad', g: 'Editing,Ad' },
    { t: 'Garbh Sanskar', c: '', d: 'A captioned pregnancy-health explainer — talking head cut together with data cards and motion type for silent-scroll retention.', v: 'garbh-sanskar', g: 'Editing,Captions,Motion Graphics' },
    { t: 'Innovative — Explainer II', c: 'Innovative', d: 'A second talking-head cut for Innovative — same format, different message.', v: 'innovative-talk-02', g: 'Editing,Captions' },
    { t: 'Baby Bonding', c: '', d: 'A prenatal-bonding explainer — interview footage layered with soft-toned title cards and animated text.', v: 'baby-bonding', g: 'Editing,Captions,Motion Graphics' },
    { t: 'Kollectibles — Rapid Reveal', c: 'Kollectibles', d: 'A quick-cut showcase cycling through the diecast lineup — one car after another, each with its own beat.', v: 'car-reveal-concept', g: 'Editing,Short-form' }
  ];
  const CAMPAIGNS = [
    { t: 'Republic Drop — Teaser', c: 'Kollectibles', cat: 'Campaign · Kollectibles', d: 'Slide 1 of 4 — the announcement teaser for Kollectibles’ Republic Day drop. Composited hero cars on a red-carpet boulevard, flags lining the frame.', i: 'kollectibles-01', w: 1080, h: 1350, g: 'Graphic Design,AI-Assisted Production' },
    { t: 'Republic Drop — India Gate', c: 'Kollectibles', cat: 'Campaign · Kollectibles', d: 'Slide 2 of 4 — the India Gate backdrop variant of the same Republic Day announcement.', i: 'kollectibles-02', w: 1080, h: 1350, g: 'Graphic Design,AI-Assisted Production' },
    { t: 'Republic Drop — Sovereign Sale', c: 'Kollectibles', cat: 'Campaign · Kollectibles', d: 'Slide 3 of 4 — the sale-reveal creative: “Buy ₹4,999+ and get ₹500 OFF” layered onto the India Gate hero visual.', i: 'kollectibles-03', w: 1080, h: 1350, g: 'Graphic Design,Campaign Strategy' },
    { t: 'Republic Drop — Convoy', c: 'Kollectibles', cat: 'Campaign · Kollectibles', d: 'Slide 4 of 4 — a full parade convoy of collectibles on trailers, closing with the top sale tier: “Buy ₹9,999+ and get ₹1,500 OFF”.', i: 'kollectibles-04', w: 1080, h: 1350, g: 'Graphic Design,AI-Assisted Production' },
    { t: 'Kids Fitness Bootcamp', c: 'PAL Fitness Studio', cat: 'Social Graphics · PAL Fitness', d: 'Event promo design for a kids’ fitness bootcamp — a five-panel action collage and bold neon-on-black typography built to drive local registrations.', i: 'pal-fitness-bootcamp', w: 1280, h: 1600, g: 'Graphic Design,Brand Communication' },
    { t: 'Zumba Party', c: 'PAL Fitness Studio', cat: 'Social Graphics · PAL Fitness', d: 'A neon-on-black event flyer for a community Zumba party, built on PAL Fitness Studio’s brand system to drive WhatsApp sign-ups.', i: 'pal-fitness-zumba', w: 1600, h: 1600, g: 'Graphic Design,Event Promotion' },
    { t: 'National Farmers’ Day', c: 'Innovative', cat: 'Festive Post · Innovative', d: 'A Rashtriya Kisan Diwas greeting built to feel personal, not corporate — real field imagery over a manufactured stock-photo look.', i: 'innovative-farmers-day', w: 1080, h: 1350, g: 'Graphic Design,Festive Post' },
    { t: 'i-Power NPK — Product Launch', c: 'Innovative', cat: 'Product Ad · Innovative', d: 'Launch creative for i-Power NPK 24:10:10 — a mascot-led concept built to stop the scroll in a crowded agri-input feed.', i: 'innovative-ipower-npk', w: 1080, h: 1350, g: 'Graphic Design,Product Ad,AI-Assisted Production' },
    { t: 'Karna Bio-NPK — All Vegetables', c: 'Innovative', cat: 'Product Ad · Innovative', d: 'Launch creative for Karna Bio-NPK’s vegetable line — a cast of mascot characters carrying the brand’s mythic packaging into the field.', i: 'innovative-karna-veggies', w: 1080, h: 1350, g: 'Graphic Design,Product Ad,AI-Assisted Production' },
    { t: 'Karna Bio-NPK — Sugarcane', c: 'Innovative', cat: 'Product Ad · Innovative', d: 'The same Karna mascot system reworked for sugarcane growers — a new crop, a new character, the same brand world.', i: 'innovative-karna-sugarcane', w: 1080, h: 1350, g: 'Graphic Design,Product Ad,AI-Assisted Production' },
    { t: 'Innovative India Agrify — Company Profile', c: 'Innovative', cat: 'Brand Collateral · Innovative', d: 'A one-pager introducing the company — manufacturing, R&D and leadership — built for distribution to partners and buyers.', i: 'innovative-company-profile', w: 1080, h: 1350, g: 'Graphic Design,Brand Collateral' },
    { t: 'Ayudha Pooje — Kollection Sale', c: 'Kollectibles', cat: 'Festive Post · Kollectibles', d: 'A festive Ayudha Pooje sale graphic — the diecast collection staged with traditional pooja elements, announcing the sale date.', i: 'ayudha-pooje-sale', w: 1080, h: 1080, g: 'Graphic Design,Festive Post' }
  ];
  const NOTES = [
    { q: 'Sent him raw footage I was genuinely embarrassed by. Got back a reel that made my mom text me asking if I “went viral.”', by: 'A relieved business owner', tag: 'Instagram Reels' },
    { q: 'I said “just make it pop” and gave zero other direction. He read my mind. Genuinely unsettling how well that worked.', by: 'Someone who now trusts the process', tag: 'Brand Campaign' },
    { q: 'Our engagement doubled and I still don’t fully understand what he did. I just know I stopped worrying about our page.', by: 'A client sleeping better at night', tag: 'Social Strategy' },
    { q: 'Asked more questions about my business in one call than my last three marketing hires combined. Then actually used the answers.', by: 'A pleasantly surprised founder', tag: 'Content Strategy' },
    { q: 'Every deadline hit, every revision handled without the usual back-and-forth drama. Almost suspicious how easy it was.', by: 'Someone who expected more chaos', tag: 'Video Editing' },
    { q: 'Turned four hours of my rambling into a reel that made total strangers stop scrolling. I’ve rewatched it more than I’d admit.', by: 'A proud, slightly obsessed client', tag: 'Short-Form Content' }
  ];
  const PLAY_SVG = '<svg viewBox="0 0 24 24" fill="none"><path d="M9 7.5 16 12 9 16.5V7.5Z" fill="currentColor"/></svg>';

  /* ---------- render cards ---------- */
  const reelHTML = (r, clone) => `
    <button class="reel"${clone ? ' tabindex="-1" aria-hidden="true"' : ''} data-kind="video"
      aria-label="Watch: ${r.t}"
      data-title="${r.t}" data-cat="${[r.c, 'Reel'].filter(Boolean).join(' · ')}" data-desc="${r.d}"
      data-video="assets/reels/${r.v}.mp4" data-poster="assets/reels/${r.v}-poster.jpg" data-tags="${r.g}">
      <video class="reel__video" width="1080" height="1920" muted loop playsinline preload="none" poster="assets/reels/${r.v}-poster.jpg" src="assets/reels/${r.v}.mp4" aria-hidden="true"></video>
      <span class="reel__play" aria-hidden="true">${PLAY_SVG}</span>
    </button>`;
  const campHTML = (c, clone) => `
    <button class="campaign"${clone ? ' tabindex="-1" aria-hidden="true"' : ''} data-kind="image"
      aria-label="View campaign: ${c.t}"
      data-title="${c.t}" data-cat="${c.cat}" data-desc="${c.d}" data-images="assets/work/${c.i}.jpg" data-tags="${c.g}">
      <img class="campaign__img" src="assets/work/${c.i}.jpg" alt="${c.t} — ${c.c}" width="${c.w}" height="${c.h}" loading="lazy">
      <span class="campaign__cap"><span class="campaign__cat">${c.cat}</span><span class="campaign__name">${c.t}</span></span>
    </button>`;
  const noteHTML = (n) => `
    <figure class="note"><p>${n.q}</p><figcaption class="note__by">${n.by}<em>${n.tag}</em></figcaption></figure>`;

  const fill = (id, cloneId, arr, fn) => {
    const a = $(id), b = $(cloneId);
    if (a) a.innerHTML = arr.map(x => fn(x, false)).join('');
    if (b) b.innerHTML = arr.map(x => fn(x, true)).join('');
  };
  fill('#reelGroup', '#reelGroupClone', REELS, reelHTML);
  fill('#campGroup', '#campGroupClone', CAMPAIGNS, campHTML);
  fill('#noteGroup', '#noteGroupClone', NOTES, noteHTML);

  /* ---------- endless marquee: enough copies for any viewport width + optional drag ---------- */
  function initMarquee(strip, track, { draggable = false } = {}) {
    if (!strip || !track || track.children.length < 2) return;
    const cloneTemplate = track.children[1];

    let groupW = 0;
    const sync = () => {
      // left-edge-to-left-edge delta, not children[0]'s own .width — the true repeat
      // period includes the group's trailing margin (the folded-in seam gap), which
      // .width alone omits
      groupW = track.children[1].getBoundingClientRect().left - track.children[0].getBoundingClientRect().left;
      if (!groupW) return;
      const need = Math.max(2, Math.ceil(strip.getBoundingClientRect().width / groupW) + 2);
      while (track.children.length < need) track.appendChild(cloneTemplate.cloneNode(true));
      track.style.setProperty('--marquee-to', `${-100 / track.children.length}%`);
    };
    sync();
    if (!groupW) return;

    let resizeT;
    addEventListener('resize', () => { clearTimeout(resizeT); resizeT = setTimeout(sync, 150); }, { passive: true });

    if (!draggable) return;

    let dragging = false, dragged = false, startX = 0, downX = 0, baseTx = 0;
    const txNow = () => {
      const m = getComputedStyle(track).transform.match(/matrix\(([^)]+)\)/);
      return m ? parseFloat(m[1].split(',')[4]) : 0;
    };
    const wrap = (tx) => { tx %= groupW; return tx > 0 ? tx - groupW : tx; };

    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      dragging = true; dragged = false;
      track.classList.add('is-dragging');
      const a = track.getAnimations()[0]; if (a) a.pause();
      baseTx = txNow();
      startX = downX = e.clientX;
      try { track.setPointerCapture(e.pointerId); } catch (err) {}
    });
    track.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(e.clientX - downX) > 10) dragged = true;
      baseTx = wrap(baseTx + dx);
      track.style.setProperty('transform', `translateX(${baseTx}px)`, 'important');
      startX = e.clientX;
    });
    const reversed = getComputedStyle(track).animationDirection === 'reverse';
    const endDrag = () => {
      if (!dragging) return;
      dragging = false;
      track.classList.remove('is-dragging');
      track.style.transform = '';
      const a = track.getAnimations()[0];
      if (a) {
        const duration = a.effect.getTiming().duration;
        const progress = -baseTx / groupW; // 0..1, matches the forward tx range regardless of playback direction
        a.currentTime = (reversed ? 1 - progress : progress) * duration;
        if (!reduce) a.play();
      }
    };
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);
    track.addEventListener('click', (e) => { if (dragged) { dragged = false; e.stopPropagation(); } }, true);
  }
  initMarquee($('.brands__strip'), $('.brands__track'), { draggable: true });
  $$('.strip').forEach(s => initMarquee(s, $('.strip__track', s), { draggable: true }));

  /* ---------- preloader (bulletproof) ---------- */
  const pre = $('#preloader');
  const done = () => pre && pre.classList.add('is-done');
  addEventListener('load', done);
  setTimeout(done, 1400);
  if (document.readyState === 'complete') done();

  /* ---------- footer year ---------- */
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();

  /* ---------- nav + mobile menu ---------- */
  const nav = $('#nav');
  const onScrollNav = () => nav && nav.classList.toggle('is-stuck', scrollY > 8);
  const toggle = $('#menuToggle'), mMenu = $('#mMenu');
  const closeMenu = () => { mMenu.classList.remove('is-open'); document.body.classList.remove('menu-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open menu'); };
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = mMenu.classList.toggle('is-open');
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    $$('a', mMenu).forEach(a => a.addEventListener('click', closeMenu));
  }

  const fmt = (sec) => `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(Math.floor(sec % 60)).padStart(2, '0')}`;

  // nav "stuck" shadow, rAF-throttled to avoid running on every raw scroll event
  let navTicking = false;
  const reqNavUpdate = () => { if (!navTicking) { navTicking = true; requestAnimationFrame(() => { navTicking = false; onScrollNav(); }); } };
  addEventListener('scroll', reqNavUpdate, { passive: true });
  reqNavUpdate();

  /* ---------- reveal ---------- */
  const revO = new IntersectionObserver((es) => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); revO.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -40px' });
  $$('[data-reveal]').forEach(el => revO.observe(el));

  /* ---------- showreel phone ---------- */
  const sr = $('#showreel'), srTc = $('#showreelTc'), srNow = $('#showreelNow');
  if (sr) {
    const LIST = [
      { f: 'excelsior', n: 'Excelsior' }, { f: 'car-reel-01', n: 'Kollectibles' },
      { f: 'restaurant-ad', n: 'Goma' }
    ];
    let idx = 0, swapT = 0;
    const swap = (i) => {
      idx = i;
      sr.style.opacity = '0';
      clearTimeout(swapT);
      swapT = setTimeout(() => {
        sr.src = `assets/reels/${LIST[i].f}.mp4`;
        sr.load();
        if (srNow) srNow.textContent = LIST[i].n;
        sr.style.opacity = '1';
        safePlay(sr);
      }, 320);
    };
    sr.addEventListener('timeupdate', () => { if (srTc) srTc.textContent = fmt(sr.currentTime || 0); });
    sr.addEventListener('canplay', () => safePlay(sr));
    if (reduce) {
      // reduced motion: stay on the poster frame, no playback, no cycling
      sr.removeAttribute('loop');
      if (srNow) srNow.textContent = LIST[0].n;
    } else {
      swap(0);
      if (!small) setInterval(() => swap((idx + 1) % LIST.length), 6500);
    }
  }

  /* ---------- reel autoplay-when-visible (lazy load once) ---------- */
  const playO = new IntersectionObserver((es) => es.forEach(e => {
    const v = e.target;
    if (e.isIntersecting) {
      if (!v.dataset.loaded) { v.dataset.loaded = '1'; v.preload = 'auto'; v.load(); }
      if (!reduce) safePlay(v);
    } else v.pause();
  }), { threshold: 0.4 });
  if (!reduce) $$('.reel__video').forEach(v => playO.observe(v));
  $$('.reel').forEach(card => {
    const v = $('.reel__video', card);
    card.addEventListener('mouseenter', () => {
      card.classList.add('is-playing');
      if (reduce) return;
      if (!v.dataset.loaded) { v.dataset.loaded = '1'; v.preload = 'auto'; v.load(); }
      safePlay(v);
    });
    card.addEventListener('mouseleave', () => card.classList.remove('is-playing'));
  });

  // resume playback when the tab comes back into view
  document.addEventListener('visibilitychange', () => {
    if (document.hidden || reduce) return;
    safePlay(sr);
    $$('.reel__video, .phone__video').forEach(v => {
      const b = v.getBoundingClientRect();
      if (b.top < innerHeight && b.bottom > 0 && b.left < innerWidth && b.right > 0) safePlay(v);
    });
  });

  /* ---------- modal ---------- */
  const modal = $('#modal'), mImg = $('#mImg'), mVideo = $('#mVideo'), mPh = $('#mPh'),
    mCat = $('#mCat'), mTitle = $('#mTitle'), mDesc = $('#mDesc'), mTags = $('#mTags'),
    mPrev = $('#mPrev'), mNext = $('#mNext'), mDots = $('#mDots');
  let imgs = [], ix = 0, lastFocus = null;

  const renderImg = () => {
    if (!imgs.length) { mImg.hidden = true; mPh.hidden = false; mPrev.hidden = mNext.hidden = mDots.hidden = true; return; }
    mPh.hidden = true; mImg.hidden = false;
    mImg.src = imgs[ix]; mImg.alt = mTitle.textContent + ' — ' + (ix + 1);
    const multi = imgs.length > 1;
    mPrev.hidden = mNext.hidden = mDots.hidden = !multi;
    if (multi) mDots.innerHTML = imgs.map((_, i) => `<span class="${i === ix ? 'on' : ''}"></span>`).join('');
  };
  const step = (n) => { if (imgs.length < 2) return; ix = (ix + n + imgs.length) % imgs.length; renderImg(); };

  const open = (card) => {
    lastFocus = document.activeElement;
    const dd = card.dataset;
    mCat.textContent = dd.cat || '';
    mTitle.textContent = dd.title || '';
    mDesc.textContent = dd.desc || '';
    mTags.innerHTML = (dd.tags || '').split(',').filter(Boolean).map(t => `<span>${t.trim()}</span>`).join('');
    if (dd.kind === 'video' && dd.video) {
      mImg.hidden = true; mPh.hidden = true; mPrev.hidden = mNext.hidden = mDots.hidden = true;
      mVideo.hidden = false; mVideo.poster = dd.poster || ''; mVideo.src = dd.video;
      if (!reduce) safePlay(mVideo);
    } else {
      mVideo.hidden = true; mVideo.pause(); mVideo.removeAttribute('src'); mVideo.load();
      imgs = (dd.images || '').split(',').map(s => s.trim()).filter(Boolean); ix = 0; renderImg();
    }
    modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    $('.modal__close', modal).focus();
  };
  const close = () => {
    modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    mVideo.pause(); mVideo.removeAttribute('src'); mVideo.load();
    if (lastFocus) lastFocus.focus();
  };
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.reel, .campaign');
    if (card) { e.preventDefault(); open(card); }
  });
  $$('[data-close]', modal).forEach(el => el.addEventListener('click', close));
  mPrev.addEventListener('click', () => step(-1));
  mNext.addEventListener('click', () => step(1));
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'Tab') {
      const f = [...modal.querySelectorAll('button, [href], input, select, textarea, video[controls], [tabindex]:not([tabindex="-1"])')]
        .filter(el => !el.hidden && el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- cursor ---------- */
  if (finePointer && !reduce) {
    const cur = $('#cursor'), dot = $('.cursor__dot', cur), ring = $('.cursor__ring', cur);
    let mx = 0, my = 0, rx = 0, ry = 0;
    addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
    const loop = () => {
      rx += (mx - rx) * 0.2; ry += (my - ry) * 0.2;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    document.addEventListener('mouseover', (e) => {
      const media = e.target.closest('.reel, .campaign');
      const hot = e.target.closest('[data-hot]');
      if (media) { cur.classList.add('is-hot'); ring.textContent = 'PLAY'; }
      else if (hot) { cur.classList.add('is-hot'); ring.textContent = ''; }
    });
    document.addEventListener('mouseout', (e) => {
      if (!e.relatedTarget || !e.relatedTarget.closest('.reel, .campaign, [data-hot]')) cur.classList.remove('is-hot');
    });
  } else {
    const c = $('#cursor'); if (c) c.style.display = 'none';
  }

  /* ---------- contact form guard ---------- */
  const form = $('#contactForm'), note = $('#formNote');
  if (form) form.addEventListener('submit', (e) => {
    if ((form.getAttribute('action') || '').includes('YOUR_FORM_ID')) {
      e.preventDefault();
      note.textContent = 'Form isn’t wired up yet — email hello@chetanbiradar.com and I’ll get back to you fast.';
      note.className = 'form__note is-warn';
    }
  });
})();
