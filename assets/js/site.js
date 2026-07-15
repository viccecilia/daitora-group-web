(() => {
  const current = location.pathname.split("/").pop() || "index.html";
  const nav = document.querySelector(".nav");
  const header = document.querySelector(".site-header");
  const headerInner = document.querySelector(".header-inner");
  document.querySelectorAll(".nav a").forEach((a) => {
    if (a.getAttribute("href") === current) a.classList.add("active");
  });

  if (nav && headerInner) {
    const menuButton = document.createElement("button");
    menuButton.className = "menu-toggle";
    menuButton.type = "button";
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-controls", "site-nav");
    menuButton.innerHTML = "<span></span><span></span><span></span><em>メニュー</em>";
    nav.id = "site-nav";
    headerInner.insertBefore(menuButton, nav);

    const closeMenu = () => {
      header?.classList.remove("is-menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    };
    const openMenu = () => {
      header?.classList.add("is-menu-open");
      menuButton.setAttribute("aria-expanded", "true");
      const firstLink = nav.querySelector("a");
      firstLink?.focus({ preventScroll: true });
    };
    menuButton.addEventListener("click", () => {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      expanded ? closeMenu() : openMenu();
    });
    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        if (document.activeElement && nav.contains(document.activeElement)) menuButton.focus();
      }
      if (event.key !== "Tab" || menuButton.getAttribute("aria-expanded") !== "true") return;
      const focusables = [menuButton, ...nav.querySelectorAll("a"), document.querySelector(".header-cta")].filter(Boolean);
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

  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    const typeSelect = contactForm.querySelector('select[name="type"]');
    const groups = [...contactForm.querySelectorAll("[data-type-field]")];
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const status = contactForm.querySelector("[data-form-status]");
    const serviceUrl = window.DAITORA_CONTACT_FORM_URL || "";

    const setStatus = (message, state = "") => {
      if (!status) return;
      status.textContent = message;
      status.className = `form-status${state ? ` is-${state}` : ""}`;
    };
    const setSubmitReady = () => {
      if (!submitButton) return;
      if (serviceUrl) {
        submitButton.disabled = false;
        submitButton.textContent = "内容を送信する";
        setStatus("");
      } else {
        submitButton.disabled = true;
        submitButton.textContent = "フォーム送信準備中";
        setStatus("現在フォーム送信の準備中です。お急ぎの場合は電話またはメールでご連絡ください。", "notice");
      }
    };
    const updateFields = () => {
      const value = typeSelect?.value || "";
      groups.forEach((group) => {
        const allowed = group.dataset.typeField.split(/\s+/).includes(value);
        group.hidden = !allowed;
        group.querySelectorAll("input, select, textarea, button").forEach((field) => {
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
    typeSelect?.addEventListener("change", () => {
      updateFields();
      setSubmitReady();
    });
    const queryType = new URLSearchParams(location.search).get("type");
    setType(queryType || typeSelect?.value);
    document.querySelectorAll("[data-contact-type]").forEach((trigger) => {
      trigger.addEventListener("click", () => setType(trigger.dataset.contactType));
    });
    updateFields();
    setSubmitReady();

    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!serviceUrl) {
        setSubmitReady();
        return;
      }
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        setStatus("必須項目をご確認ください。", "error");
        return;
      }
      const formData = new FormData(contactForm);
      const payload = {};
      formData.forEach((value, key) => {
        payload[key] = value;
      });
      submitButton.disabled = true;
      submitButton.textContent = "送信中";
      setStatus("送信しています。しばらくお待ちください。", "notice");
      try {
        const response = await fetch(serviceUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!response.ok) {
          setStatus("送信できませんでした。入力内容をご確認のうえ、時間をおいて再度お試しください。", "error");
          return;
        }
        setStatus("送信しました。担当者より確認のうえご連絡いたします。", "success");
        contactForm.reset();
        updateFields();
      } catch (error) {
        setStatus("通信状況により送信できませんでした。電話またはメールでご連絡ください。", "error");
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "内容を送信する";
      }
    });
  }

  const stage = document.querySelector("[data-hero-videos]");
  if (!stage) return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 640px)").matches;
  const sourceList = mobile ? stage.dataset.mobileVideos : stage.dataset.desktopVideos;
  const clips = (sourceList || "").split(",").map((item) => item.trim()).filter(Boolean);
  if (stage.dataset.poster) stage.style.backgroundImage = `url("${stage.dataset.poster}")`;
  if (reducedMotion || clips.length === 0) return;

  const videos = clips.map((src, index) => {
    const video = document.createElement("video");
    video.src = src;
    video.poster = stage.dataset.poster || "";
    video.autoplay = true;
    video.defaultMuted = true;
    video.muted = true;
    video.loop = clips.length === 1;
    video.playsInline = true;
    video.preload = index === 0 ? "auto" : "metadata";
    video.playbackRate = 0.45;
    if (index === 0) video.classList.add("active");
    stage.appendChild(video);
    return video;
  });

  let currentIndex = 0;
  let timerId = null;
  const activate = (next) => {
    currentIndex = next % videos.length;
    videos.forEach((video, index) => {
      const active = index === currentIndex;
      video.classList.toggle("active", active);
      if (active && document.visibilityState === "visible") {
        video.playbackRate = 0.45;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  };
  activate(0);
  if (videos.length > 1) timerId = setInterval(() => activate(currentIndex + 1), 9000);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      videos.forEach((video) => video.pause());
      return;
    }
    activate(currentIndex);
  });
  window.addEventListener("pagehide", () => {
    videos.forEach((video) => video.pause());
    if (timerId) clearInterval(timerId);
  });
})();
