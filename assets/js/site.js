(() => {
  const LANGS = {
    ja: { label: '日本語', menu: 'メニュー', send: '内容を送信する', preparing: 'フォーム送信準備中', unavailable: '現在フォーム送信の準備中です。お急ぎの場合は電話またはメールでご連絡ください。', required: '必須項目をご確認ください。', sending: '送信しています。しばらくお待ちください。', success: '送信しました。担当者より確認のうえご連絡いたします。', failed: '送信できませんでした。入力内容をご確認のうえ、時間をおいて再度お試しください。', network: '通信状況により送信できませんでした。電話またはメールでご連絡ください。', timeout: '送信がタイムアウトしました。時間をおいて再度お試しいただくか、電話またはメールでご連絡ください。' },
    'zh-CN': { label: '简体中文', menu: '菜单', send: '发送内容', preparing: '表单准备中', unavailable: '表单发送功能正在准备中。如有急事，请通过电话或邮件联系我们。', required: '请确认必填项目。', sending: '正在发送，请稍候。', success: '已发送。负责人确认后会与您联系。', failed: '发送失败。请确认填写内容后稍后再试。', network: '因网络状态未能发送。请通过电话或邮件联系我们。', timeout: '发送超时。请稍后重试，或通过电话、邮件联系我们。' },
    en: { label: 'English', menu: 'Menu', send: 'Send request', preparing: 'Form unavailable', unavailable: 'Online form submission is being prepared. Please contact us by phone or email for urgent inquiries.', required: 'Please check the required fields.', sending: 'Sending. Please wait.', success: 'Your request has been sent. Our team will review it and contact you.', failed: 'Unable to send. Please check your input and try again later.', network: 'Unable to send due to a network issue. Please contact us by phone or email.', timeout: 'The request timed out. Please try again later or contact us by phone or email.' },
    ko: { label: '한국어', menu: '메뉴', send: '내용 보내기', preparing: '폼 준비 중', unavailable: '현재 온라인 문의 발송 기능을 준비 중입니다. 급한 경우 전화 또는 이메일로 문의해 주세요.', required: '필수 항목을 확인해 주세요.', sending: '전송 중입니다. 잠시만 기다려 주세요.', success: '전송되었습니다. 담당자가 확인 후 연락드리겠습니다.', failed: '전송하지 못했습니다. 입력 내용을 확인한 뒤 다시 시도해 주세요.', network: '네트워크 문제로 전송하지 못했습니다. 전화 또는 이메일로 문의해 주세요.', timeout: '전송 시간이 초과되었습니다. 잠시 후 다시 시도하거나 전화 또는 이메일로 문의해 주세요.' },
    'zh-TW': { label: '繁體中文', menu: '選單', send: '送出內容', preparing: '表單準備中', unavailable: '目前表單送出功能正在準備中。如有急件，請以電話或電子郵件聯絡。', required: '請確認必填項目。', sending: '正在送出，請稍候。', success: '已送出。負責人確認後會與您聯絡。', failed: '無法送出。請確認填寫內容後稍後再試。', network: '因網路狀況無法送出。請以電話或電子郵件聯絡。', timeout: '送出逾時。請稍後再試，或以電話、電子郵件聯絡。' }
  };

  const normalizeLang = (value) => {
    const lang = (value || 'ja').toLowerCase();
    if (lang.startsWith('zh-cn')) return 'zh-CN';
    if (lang.startsWith('zh-tw')) return 'zh-TW';
    if (lang.startsWith('en')) return 'en';
    if (lang.startsWith('ko')) return 'ko';
    return 'ja';
  };
  const currentLang = normalizeLang(document.documentElement.lang);
  const i18n = LANGS[currentLang] || LANGS.ja;
  const current = location.pathname.split('/').pop() || 'index.html';
  const nav = document.querySelector('.nav');
  const header = document.querySelector('.site-header');
  const headerInner = document.querySelector('.header-inner');

  document.querySelectorAll('.nav a').forEach((a) => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });

  document.querySelectorAll('[data-language-switcher]').forEach((switcher) => {
    const button = switcher.querySelector('[data-language-button]');
    const menu = switcher.querySelector('[data-language-menu]');
    if (!button || !menu) return;
    const close = (returnFocus = false) => {
      switcher.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
      if (returnFocus) button.focus({ preventScroll: true });
    };
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const open = button.getAttribute('aria-expanded') === 'true';
      switcher.classList.toggle('is-open', !open);
      button.setAttribute('aria-expanded', String(!open));
    });
    switcher.querySelectorAll('a[hreflang]').forEach((link) => {
      link.addEventListener('click', () => {
        try {
          localStorage.setItem('daitoraLanguage', link.getAttribute('hreflang') || currentLang);
          document.cookie = `daitoraLanguage=${encodeURIComponent(link.getAttribute('hreflang') || currentLang)}; path=/; max-age=31536000`;
        } catch (error) {}
      });
    });
    document.addEventListener('click', (event) => {
      if (!switcher.contains(event.target)) close();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
        event.preventDefault();
        event.stopImmediatePropagation();
        close(true);
      }
    });
  });

  if (nav && headerInner) {
    const menuButton = document.createElement('button');
    menuButton.className = 'menu-toggle';
    menuButton.type = 'button';
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-controls', 'site-nav');
    menuButton.innerHTML = `<span></span><span></span><span></span><em>${i18n.menu}</em>`;
    nav.id = 'site-nav';
    headerInner.insertBefore(menuButton, nav);

    const getFocusables = () => [menuButton, ...nav.querySelectorAll('button, a'), document.querySelector('.header-cta')].filter(Boolean);
    let focusTimer = 0;
    const closeMenu = () => {
      window.clearTimeout(focusTimer);
      header?.classList.remove('is-menu-open');
      menuButton.setAttribute('aria-expanded', 'false');
    };
    const openMenu = () => {
      header?.classList.add('is-menu-open');
      menuButton.setAttribute('aria-expanded', 'true');
      const first = nav.querySelector('button, a');
      focusTimer = window.setTimeout(() => {
        if (menuButton.getAttribute('aria-expanded') === 'true') first?.focus({ preventScroll: true });
      }, 220);
    };
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      expanded ? closeMenu() : openMenu();
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        const wasOpen = menuButton.getAttribute('aria-expanded') === 'true';
        closeMenu();
        if (wasOpen && document.activeElement && nav.contains(document.activeElement)) menuButton.focus();
      }
      if (event.key !== 'Tab' || menuButton.getAttribute('aria-expanded') !== 'true') return;
      const focusables = getFocusables();
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    const langField = contactForm.querySelector('input[name="site_language"]');
    if (langField) langField.value = currentLang;
    const typeSelect = contactForm.querySelector('select[name="type"]');
    const groups = [...contactForm.querySelectorAll('[data-type-field]')];
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const fieldset = contactForm.querySelector('[data-contact-fieldset]');
    const status = contactForm.querySelector('[data-form-status]');
    const formCore = window.DaitoraContactFormCore;
    const configuredEndpoint = contactForm.dataset.submitEndpoint || window.DAITORA_CONTACT_FORM_URL || '';
    const serviceUrl = formCore?.resolveEndpoint(configuredEndpoint, location.href) || '';
    const submitRequest = formCore?.createSubmitter(window.fetch.bind(window));

    const setStatus = (message, state = '') => {
      if (!status) return;
      status.textContent = message;
      status.className = `form-status${state ? ` is-${state}` : ''}`;
    };
    const setSubmitReady = () => {
      if (!submitButton) return;
      if (serviceUrl && submitRequest) {
        if (fieldset) fieldset.disabled = false;
        submitButton.disabled = false;
        submitButton.setAttribute('aria-disabled', 'false');
        submitButton.textContent = i18n.send;
        setStatus('');
      } else {
        if (fieldset) fieldset.disabled = true;
        submitButton.disabled = true;
        submitButton.setAttribute('aria-disabled', 'true');
        submitButton.textContent = i18n.preparing;
        setStatus(i18n.unavailable, 'notice');
      }
    };
    const updateFields = () => {
      const value = typeSelect?.value || '';
      groups.forEach((group) => {
        const allowed = group.dataset.typeField.split(/\s+/).includes(value);
        group.hidden = !allowed;
        group.querySelectorAll('input, select, textarea, button').forEach((field) => {
          field.disabled = !allowed;
        });
      });
    };
    const setType = (type) => {
      if (!typeSelect || !type) return;
      const option = [...typeSelect.options].find((item) => item.value === type);
      if (option) {
        typeSelect.value = type;
        updateFields();
        setSubmitReady();
      }
    };
    typeSelect?.addEventListener('change', () => {
      updateFields();
      setSubmitReady();
    });
    const queryType = new URLSearchParams(location.search).get('type');
    setType(queryType || typeSelect?.value);
    document.querySelectorAll('[data-contact-type]').forEach((trigger) => {
      trigger.addEventListener('click', () => setType(trigger.dataset.contactType));
    });
    updateFields();
    setSubmitReady();

    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!serviceUrl) {
        setSubmitReady();
        return;
      }
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        setStatus(i18n.required, 'error');
        return;
      }
      const formData = new FormData(contactForm);
      const payload = {};
      formData.forEach((value, key) => {
        payload[key] = value;
      });
      payload.source_page = location.href;
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.setAttribute('aria-disabled', 'true');
        submitButton.textContent = i18n.sending;
      }
      setStatus(i18n.sending, 'notice');
      const result = await submitRequest({
        endpoint: serviceUrl,
        baseUrl: location.href,
        payload,
        timeoutMs: 15000
      });
      if (result.reason === 'duplicate') return;
      if (result.ok) {
        setStatus(i18n.success, 'success');
        contactForm.reset();
        if (langField) langField.value = currentLang;
        updateFields();
      } else if (result.reason === 'timeout') {
        setStatus(i18n.timeout, 'error');
      } else if (result.reason === 'network') {
        setStatus(i18n.network, 'error');
      } else {
        setStatus(i18n.failed, 'error');
      }
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.setAttribute('aria-disabled', 'false');
        submitButton.textContent = i18n.send;
      }
    });
  }

  const stage = document.querySelector('[data-hero-videos]');
  if (!stage) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = window.matchMedia('(max-width: 640px)').matches;
  const sourceList = mobile ? stage.dataset.mobileVideos : stage.dataset.desktopVideos;
  const clips = (sourceList || '').split(',').map((item) => item.trim()).filter(Boolean);
  if (stage.dataset.poster) stage.style.backgroundImage = `url("${stage.dataset.poster}")`;
  if (reducedMotion || clips.length === 0) return;

  const videos = clips.map((src, index) => {
    const video = document.createElement('video');
    video.src = src;
    video.poster = stage.dataset.poster || '';
    video.autoplay = true;
    video.defaultMuted = true;
    video.muted = true;
    video.loop = clips.length === 1;
    video.playsInline = true;
    video.preload = index === 0 ? 'auto' : 'metadata';
    video.playbackRate = 0.45;
    if (index === 0) video.classList.add('active');
    stage.appendChild(video);
    return video;
  });

  let currentIndex = 0;
  let timerId = null;
  const activate = (next) => {
    currentIndex = next % videos.length;
    videos.forEach((video, index) => {
      const active = index === currentIndex;
      video.classList.toggle('active', active);
      if (active && document.visibilityState === 'visible') {
        video.playbackRate = 0.45;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  };
  activate(0);
  if (videos.length > 1) timerId = setInterval(() => activate(currentIndex + 1), 9000);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      videos.forEach((video) => video.pause());
      return;
    }
    activate(currentIndex);
  });
  window.addEventListener('pagehide', () => {
    videos.forEach((video) => video.pause());
    if (timerId) clearInterval(timerId);
  });
})();
