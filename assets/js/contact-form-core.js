(function initDaitoraContactFormCore(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.DaitoraContactFormCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createCore() {
  'use strict';

  function resolveEndpoint(value, baseUrl) {
    if (typeof value !== 'string' || !value.trim()) return '';
    try {
      const url = new URL(value.trim(), baseUrl);
      if (url.protocol !== 'https:' || url.username || url.password) return '';
      return url.href;
    } catch (error) {
      return '';
    }
  }

  async function responseIsSuccess(response) {
    if (!response || typeof response.status !== 'number') return false;
    if (response.status < 200 || response.status >= 300) return false;
    const contentType = response.headers?.get?.('content-type') || '';
    if (!/application\/(?:[\w.+-]*\+)?json/i.test(contentType)) return false;
    try {
      const body = await response.json();
      return body?.success === true;
    } catch (error) {
      return false;
    }
  }

  function createSubmitter(fetchImpl) {
    let inFlight = false;
    return async function submit({ endpoint, baseUrl, payload, timeoutMs = 15000 }) {
      if (inFlight) return { ok: false, reason: 'duplicate' };
      const safeEndpoint = resolveEndpoint(endpoint, baseUrl);
      if (!safeEndpoint || typeof fetchImpl !== 'function') return { ok: false, reason: 'unavailable' };

      inFlight = true;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const response = await fetchImpl(safeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal
        });
        return await responseIsSuccess(response)
          ? { ok: true, reason: 'success' }
          : { ok: false, reason: 'failed' };
      } catch (error) {
        return { ok: false, reason: error?.name === 'AbortError' ? 'timeout' : 'network' };
      } finally {
        clearTimeout(timeoutId);
        inFlight = false;
      }
    };
  }

  return { resolveEndpoint, responseIsSuccess, createSubmitter };
});
