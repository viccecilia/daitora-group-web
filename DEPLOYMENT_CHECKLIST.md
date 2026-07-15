# Daitora Group Deployment Checklist

## Publish Scope

蜈ｬ髢句ｯｾ雎｡縺ｯ縲∝次蜑・→縺励※莉･荳九・縺ｿ縺ｧ縺吶・
- `*.html`
- `assets/css/`
- `assets/js/`
- `assets/images/`
- `assets/thumbs/`
- `assets/videos/selected/` 縺ｮ縺・■螳滄圀縺ｫ蜿ら・縺励※縺・ｋ蜍慕判
- `CONTENT_VERIFICATION.md` 縺ｯ遉ｾ蜀・｢ｺ隱咲畑縲ょ・髢九し繝ｼ繝舌・縺ｸ鄂ｮ縺丞ｴ蜷医・繧｢繧ｯ繧ｻ繧ｹ蛻ｶ髯舌ｒ謗ｨ螂ｨ縲・
## Do Not Publish

莉･荳九・蛻ｶ菴懊・逶｣譟ｻ逕ｨ繝輔ぃ繧､繝ｫ縺ｮ縺溘ａ縲∵悽逡ｪ蜈ｬ髢九ヱ繝・こ繝ｼ繧ｸ縺九ｉ髯､螟悶＠縺ｦ縺上□縺輔＞縲・
- `crop_logo.py`
- `daitora_ppt_extract_script.py`
- `daitora_ppt_extract/`
- `media_audit/`
- `GEO_鬘ｹ逶ｮ遏ｩ髦ｵ霑帛ｺｦ陦ｨ.html`
- `GEO_鬘ｹ逶ｮ霑帛ｺｦ陦ｨ.md`
- `*.pptx`
- `*.zip`
- 荳譎ら噪縺ｪ繧ｭ繝｣繝励メ繝｣縲√し繝繝阪う繝ｫ逕滓・邏譚舌∵悴謗｡逕ｨ蜍慕判

## Media Size Notes

迴ｾ迥ｶ縺ｮ `assets/videos/` 縺ｯ 35 繝輔ぃ繧､繝ｫ縲∝粋險育ｴ・372.69MB 縺ゅｊ縺ｾ縺吶・
蜈ｬ髢句燕縺ｫ莉･荳九ｒ螳滓命縺励※縺上□縺輔＞縲・
- Hero 縺ｧ菴ｿ逕ｨ縺吶ｋ蜍慕判縺縺代ｒ谿九☆縲・- 譛ｪ蜿ら・縺ｮ `assets/videos/curated/` 縺ｾ縺溘・螟ｧ蝙狗ｴ譚舌ｒ蜈ｬ髢九ヱ繝・こ繝ｼ繧ｸ縺九ｉ螟悶☆縲・- 蜿ｯ閭ｽ縺ｪ繧・1080p 縺ｮ遏ｭ蟆ｺ WebM / MP4 縺ｫ蜀榊悸邵ｮ縺吶ｋ縲・- Poster 逕ｻ蜒上ｒ險ｭ螳壹＠縲∝虚逕ｻ隱ｭ縺ｿ霎ｼ縺ｿ蜑阪・轣ｰ濶ｲ陦ｨ遉ｺ繧帝∩縺代ｋ縲・
## Link / Route Checks

- `/autoloan/` 縺梧悽逡ｪ繝峨Γ繧､繝ｳ縺ｧ髢九￠繧九％縺ｨ縲・- `contact.html?type=hire#contact-form` 縺ｪ縺ｩ縺ｮ繝励Μ繧ｻ繝・ヨ蟆守ｷ壹′蜍輔￥縺薙→縲・- `tel:` 繝ｪ繝ｳ繧ｯ縺後せ繝槭・繝医ヵ繧ｩ繝ｳ縺ｧ莉｣陦ｨ逡ｪ蜿ｷ縺ｫ逋ｺ菫｡縺ｧ縺阪ｋ縺薙→縲・- `mailto:info@daitora-jp.com` 縺梧ｭ｣縺励＞蜿嶺ｻ伜・縺ｧ縺ゅｋ縺薙→縲・- DiDi / Uber 縺ｮ豁｣蠑・URL 縺檎｢ｺ隱阪〒縺阪ｋ縺ｾ縺ｧ縺ｯ繝ｪ繝ｳ繧ｯ蛹悶＠縺ｪ縺・％縺ｨ縲・
## Form Setup

`contact.html` 縺ｮ繝輔か繝ｼ繝縺ｯ髱咏噪繝・Δ迥ｶ諷九〒縺吶ょ・髢区凾縺ｯ荳玖ｨ倥ｒ險ｭ螳壹＠縺ｦ縺上□縺輔＞縲・
1. 蜿嶺ｻ・API 繧堤畑諢上☆繧九・2. `window.DAITORA_CONTACT_FORM_URL` 縺ｫ豁｣蠑上↑蜿嶺ｻ・API URL 繧定ｨｭ螳壹☆繧九・3. CORS縲，SRF縲√せ繝代Β蟇ｾ遲悶∝・蜉帑ｿ晏ｭ伜・縲・夂衍蜈医Γ繝ｼ繝ｫ繧堤｢ｺ隱阪☆繧九・4. 騾∽ｿ｡繝・せ繝医ｒ陦後＞縲∵・蜉滓凾繝ｻ螟ｱ謨玲凾縺ｮ陦ｨ遉ｺ繧堤｢ｺ隱阪☆繧九・
## Preflight Commands

```powershell
node --check assets\js\site.js
rg -n 'href="#"|TODO|FIXME|譛ｪ險ｭ螳嘶荳頑ｵｷ' -g '*.html' -g 'assets/js/*.js' -g 'assets/css/*.css'
rg -n '/autoloan/|contact-form|DAITORA_CONTACT_FORM_URL|DiDi|Uber' -g '*.html' -g 'assets/js/*.js'
```

## Final Review

- 莨夂､ｾ諠・ｱ縲∬ｨｱ隱榊庄縲∬ｻ贋ｸ｡蜿ｰ謨ｰ縲∝霧讌ｭ諡轤ｹ縲∝ｮ溽ｸｾ陦ｨ迴ｾ繧・`CONTENT_VERIFICATION.md` 縺ｨ辣ｧ蜷医☆繧九・- 蜈ｬ髢九〒縺阪↑縺・｡ｧ螳｢蜷阪・譯井ｻｶ隧ｳ邏ｰ縺梧ｮ九▲縺ｦ縺・↑縺・％縺ｨ繧堤｢ｺ隱阪☆繧九・- 繝医ャ繝励・繝ｼ繧ｸ縲∝推莠区･ｭ繝壹・繧ｸ縲√ル繝･繝ｼ繧ｹ縲∝撫縺・粋繧上○繝壹・繧ｸ繧偵せ繝槭・繝医ヵ繧ｩ繝ｳ蟷・〒遒ｺ隱阪☆繧九・- 譛ｬ逡ｪ繧ｵ繝ｼ繝舌・縺ｸ繧｢繝・・繝ｭ繝ｼ繝峨☆繧句燕縺ｫ縲・勁螟門ｯｾ雎｡繝輔ぃ繧､繝ｫ縺悟・縺｣縺ｦ縺・↑縺・％縺ｨ繧堤｢ｺ隱阪☆繧九・