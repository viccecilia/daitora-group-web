import {
  EXPANSION_BRAND_LOCKS,
  EXPANSION_PAGE_OVERRIDES,
  EXPANSION_SEO_DESCRIPTIONS
} from './i18n-business-expansion.mjs';

export const LANGUAGE_CODES = ['ja', 'zh-CN', 'en', 'ko', 'zh-TW'];

const t = (ja, zhCN, en, ko, zhTW) => ({ ja, 'zh-CN': zhCN, en, ko, 'zh-TW': zhTW });

// Shared controls use semantic keys so the same Japanese word can have a
// different translation in navigation and form contexts.
export const SEMANTIC_LOCKS = {
  'nav.home': t('ホーム', '首页', 'Home', '홈', '首頁'),
  'nav.about': t('大寅について', '关于大寅', 'About Daitora', 'Daitora 소개', '關於大寅'),
  'nav.business': t('事業紹介', '业务介绍', 'Business', '사업 소개', '事業介紹'),
  'nav.quality': t('安全・品質', '安全・品质', 'Safety & Quality', '안전・품질', '安全・品質'),
  'nav.works': t('実績紹介', '实绩介绍', 'Track Record', '실적 소개', '實績介紹'),
  'nav.company': t('会社概要', '公司概要', 'Company Profile', '회사 개요', '公司概要'),
  'nav.news': t('ニュース', '新闻', 'News', '뉴스', '最新消息'),
  'nav.contact': t('お問い合わせ', '联系我们', 'Contact', '문의', '聯絡我們'),
  'contact.inquiry': t('お問い合わせ', '咨询', 'Inquiry', '문의', '洽詢'),
  'contact.inquiry_type': t('お問い合わせ種別', '咨询类型', 'Inquiry Type', '문의 유형', '洽詢類型'),
  'contact.inquiry_items': t('お問い合わせ項目', '咨询项目', 'Inquiry Options', '문의 항목', '洽詢項目'),
  'contact.submit': t('内容を送信する', '发送咨询内容', 'Send Inquiry', '문의 내용 보내기', '送出洽詢內容'),
  'contact.email': t('メールアドレス', '电子邮箱', 'Email Address', '이메일 주소', '電子郵件地址'),
  'contact.phone': t('電話番号', '电话号码', 'Phone Number', '전화번호', '電話號碼'),
  'news.notice': t('お知らせ', '通知', 'Notice', '공지', '公告'),
  'news.business': t('事業情報', '业务信息', 'Business Update', '사업 정보', '事業資訊'),
  'news.training': t('研修・社内活動', '培训・内部活动', 'Training & Internal Activities', '교육・사내 활동', '培訓・內部活動'),
  'news.achievement': t('実績', '实绩', 'Track Record', '실적', '實績'),
  'business.hire': t('ハイヤー', '包车接送', 'Chauffeur Service', '전용 차량 서비스', '包車接送'),
  'business.taxi': t('タクシー', '出租车', 'Taxi', '택시', '計程車'),
  'business.auto': t('中古車販売', '二手车销售', 'Used Car Sales', '중고차 판매', '中古車銷售')
};

// Exact shared UI phrases. These are final locks and may not be overridden by
// the general translation catalogue.
export const UI_LOCKS = {
  'ホーム': SEMANTIC_LOCKS['nav.home'],
  'ニュース': SEMANTIC_LOCKS['nav.news'],
  'お問い合わせ種別': SEMANTIC_LOCKS['contact.inquiry_type'],
  'お問い合わせ項目': SEMANTIC_LOCKS['contact.inquiry_items'],
  '内容を送信する': SEMANTIC_LOCKS['contact.submit'],
  'メールアドレス': SEMANTIC_LOCKS['contact.email'],
  '電話番号': SEMANTIC_LOCKS['contact.phone'],
  'お知らせ': SEMANTIC_LOCKS['news.notice'],
  '事業情報': SEMANTIC_LOCKS['news.business'],
  '研修・社内活動': SEMANTIC_LOCKS['news.training'],
  '実績': SEMANTIC_LOCKS['news.achievement'],
  'ハイヤー': SEMANTIC_LOCKS['business.hire'],
  'タクシー': SEMANTIC_LOCKS['business.taxi'],
  '中古車販売': SEMANTIC_LOCKS['business.auto'],
  '車両ネットワーク': t('車両ネットワーク', '车辆网络', 'Vehicle Network', '차량 네트워크', '車輛網絡'),
  '主要空港対応': t('主要空港対応', '支持主要机场', 'Major Airport Coverage', '주요 공항 대응', '支援主要機場'),
  '利用予定エリア': t('利用予定エリア', '预计使用区域', 'Service Area', '이용 예정 지역', '預計使用區域'),
  '乗車地': t('乗車地', '上车地点', 'Pickup Location', '승차 장소', '上車地點'),
  '実績紹介': SEMANTIC_LOCKS['nav.works'],
  '品質ポイント': t('品質ポイント', '服务重点', 'Service Quality Focus', '품질 관리 항목', '服務重點'),
  '団体移動': t('団体移動', '团体出行', 'Group Transportation', '단체 이동', '團體移動'),
  '電話をかける': t('電話をかける', '拨打电话', 'Call Us', '전화하기', '撥打電話'),
  'メールを送る': t('メールを送る', '发送邮件', 'Send an Email', '이메일 보내기', '傳送電子郵件'),
  '連絡先': t('連絡先', '联系方式', 'Contact Information', '연락처', '聯絡資訊')
};

export const BRAND_LOCKS = {
  '大寅グループ': t('大寅グループ', 'Daitora Group', 'Daitora Group', 'Daitora Group', 'Daitora Group'),
  '株式会社大寅': t('株式会社大寅', 'Daitora Co., Ltd.', 'Daitora Co., Ltd.', 'Daitora Co., Ltd.', 'Daitora Co., Ltd.'),
  '大寅ハイヤー': t('大寅ハイヤー', 'Daitora Chauffeur & Private Transportation', 'Daitora Chauffeur & Private Transportation', 'Daitora Chauffeur & Private Transportation', 'Daitora Chauffeur & Private Transportation'),
  '寅丸タクシー': t('寅丸タクシー', 'Toramaru Taxi', 'Toramaru Taxi', 'Toramaru Taxi', 'Toramaru Taxi'),
  '大寅中古車販売': t('大寅中古車販売', 'Daitora Auto / Used Car Sales', 'Daitora Auto / Used Car Sales', 'Daitora Auto / Used Car Sales', 'Daitora Auto / Used Car Sales'),
  ...EXPANSION_BRAND_LOCKS
};

export const OFFICIAL_FACTS = {
  osakaAddress: '大阪府大阪市大正区小林西2丁目10-3',
  kyotoAddress: '京都府京都市伏見区竹田東小屋ノ内町95',
  postalCode: '〒551-0013',
  mainPhone: '06-6710-9861',
  fax: '06-6710-9862',
  kyotoPhone: '075-585-7429',
  email: 'info@daitora-jp.com',
  passengerLicense: '近運自ニ第990号',
  charterLicense: '近運自一第737号',
  travelRegistration: '第7068号',
  usedCarPermit: '古物商許可証 第321090181755号',
  established: '2018年3月8日',
  representative: '代表取締役 大野 創世',
  annualSales: '17.8億円',
  capital: '1,000万円'
};

const footerFacts = {
  ja: `大阪本社：${OFFICIAL_FACTS.osakaAddress} / 京都営業所：${OFFICIAL_FACTS.kyotoAddress} /`,
  'zh-CN': `大阪总部：${OFFICIAL_FACTS.osakaAddress} / 京都营业所：${OFFICIAL_FACTS.kyotoAddress} /`,
  en: `Osaka Head Office: ${OFFICIAL_FACTS.osakaAddress} / Kyoto Office: ${OFFICIAL_FACTS.kyotoAddress} /`,
  ko: `오사카 본사: ${OFFICIAL_FACTS.osakaAddress} / 교토 영업소: ${OFFICIAL_FACTS.kyotoAddress} /`,
  'zh-TW': `大阪總部：${OFFICIAL_FACTS.osakaAddress} / 京都營業所：${OFFICIAL_FACTS.kyotoAddress} /`
};

export const FACT_LOCKS = {
  [OFFICIAL_FACTS.osakaAddress]: t(OFFICIAL_FACTS.osakaAddress, OFFICIAL_FACTS.osakaAddress, OFFICIAL_FACTS.osakaAddress, OFFICIAL_FACTS.osakaAddress, OFFICIAL_FACTS.osakaAddress),
  [OFFICIAL_FACTS.kyotoAddress]: t(OFFICIAL_FACTS.kyotoAddress, OFFICIAL_FACTS.kyotoAddress, OFFICIAL_FACTS.kyotoAddress, OFFICIAL_FACTS.kyotoAddress, OFFICIAL_FACTS.kyotoAddress),
  [`大阪本社：${OFFICIAL_FACTS.osakaAddress} / 京都営業所：${OFFICIAL_FACTS.kyotoAddress} /`]: footerFacts,
  [`京都営業所：${OFFICIAL_FACTS.kyotoAddress}`]: t(
    `京都営業所：${OFFICIAL_FACTS.kyotoAddress}`,
    `京都营业所：${OFFICIAL_FACTS.kyotoAddress}`,
    `Kyoto Office: ${OFFICIAL_FACTS.kyotoAddress}`,
    `교토 영업소: ${OFFICIAL_FACTS.kyotoAddress}`,
    `京都營業所：${OFFICIAL_FACTS.kyotoAddress}`
  ),
  [OFFICIAL_FACTS.postalCode]: t(OFFICIAL_FACTS.postalCode, OFFICIAL_FACTS.postalCode, OFFICIAL_FACTS.postalCode, OFFICIAL_FACTS.postalCode, OFFICIAL_FACTS.postalCode),
  [OFFICIAL_FACTS.mainPhone]: t(OFFICIAL_FACTS.mainPhone, OFFICIAL_FACTS.mainPhone, OFFICIAL_FACTS.mainPhone, OFFICIAL_FACTS.mainPhone, OFFICIAL_FACTS.mainPhone),
  [OFFICIAL_FACTS.fax]: t(OFFICIAL_FACTS.fax, OFFICIAL_FACTS.fax, OFFICIAL_FACTS.fax, OFFICIAL_FACTS.fax, OFFICIAL_FACTS.fax),
  [OFFICIAL_FACTS.kyotoPhone]: t(OFFICIAL_FACTS.kyotoPhone, OFFICIAL_FACTS.kyotoPhone, OFFICIAL_FACTS.kyotoPhone, OFFICIAL_FACTS.kyotoPhone, OFFICIAL_FACTS.kyotoPhone),
  [OFFICIAL_FACTS.email]: t(OFFICIAL_FACTS.email, OFFICIAL_FACTS.email, OFFICIAL_FACTS.email, OFFICIAL_FACTS.email, OFFICIAL_FACTS.email),
  [OFFICIAL_FACTS.passengerLicense]: t(OFFICIAL_FACTS.passengerLicense, OFFICIAL_FACTS.passengerLicense, OFFICIAL_FACTS.passengerLicense, OFFICIAL_FACTS.passengerLicense, OFFICIAL_FACTS.passengerLicense),
  [OFFICIAL_FACTS.charterLicense]: t(OFFICIAL_FACTS.charterLicense, OFFICIAL_FACTS.charterLicense, OFFICIAL_FACTS.charterLicense, OFFICIAL_FACTS.charterLicense, OFFICIAL_FACTS.charterLicense),
  [OFFICIAL_FACTS.travelRegistration]: t(OFFICIAL_FACTS.travelRegistration, OFFICIAL_FACTS.travelRegistration, OFFICIAL_FACTS.travelRegistration, OFFICIAL_FACTS.travelRegistration, OFFICIAL_FACTS.travelRegistration),
  [OFFICIAL_FACTS.usedCarPermit]: t(OFFICIAL_FACTS.usedCarPermit, OFFICIAL_FACTS.usedCarPermit, OFFICIAL_FACTS.usedCarPermit, OFFICIAL_FACTS.usedCarPermit, OFFICIAL_FACTS.usedCarPermit),
  [OFFICIAL_FACTS.established]: t(OFFICIAL_FACTS.established, OFFICIAL_FACTS.established, OFFICIAL_FACTS.established, OFFICIAL_FACTS.established, OFFICIAL_FACTS.established),
  [OFFICIAL_FACTS.representative]: t(OFFICIAL_FACTS.representative, OFFICIAL_FACTS.representative, OFFICIAL_FACTS.representative, OFFICIAL_FACTS.representative, OFFICIAL_FACTS.representative),
  [OFFICIAL_FACTS.annualSales]: t(OFFICIAL_FACTS.annualSales, OFFICIAL_FACTS.annualSales, OFFICIAL_FACTS.annualSales, OFFICIAL_FACTS.annualSales, OFFICIAL_FACTS.annualSales),
  [OFFICIAL_FACTS.capital]: t(OFFICIAL_FACTS.capital, OFFICIAL_FACTS.capital, OFFICIAL_FACTS.capital, OFFICIAL_FACTS.capital, OFFICIAL_FACTS.capital)
};

// Page-specific wording has higher priority than the general catalogue and is
// reserved for genuine context differences.
export const PAGE_OVERRIDES = {
  'contact.html': {
    'お問い合わせ': SEMANTIC_LOCKS['contact.inquiry']
  },
  ...EXPANSION_PAGE_OVERRIDES
};

export const SEO_DESCRIPTIONS = {
  'index.html': t(
    '大阪・京都を拠点に、ハイヤー、タクシー、中古車販売を展開するDaitora Groupの公式サイトです。',
    'Daitora Group官方网站，介绍大阪、京都等关西地区的机场接送、包车接送、出租车与二手车销售业务。',
    'Official Daitora Group website for chauffeur transportation, airport transfers, taxi services and used car sales across Kansai.',
    '간사이 지역의 전용 차량 서비스, 공항 송영, 택시 및 중고차 판매 사업을 소개하는 Daitora Group 공식 웹사이트입니다.',
    'Daitora Group官方網站，介紹大阪、京都等關西地區的機場接送、包車接送、計程車與中古車銷售業務。'
  ),
  'about.html': t(
    '大寅グループの企業理念、社訓、会社概要、許認可、関西の拠点情報をご紹介します。',
    '介绍Daitora Group的企业理念、运营准则、公司规模、许可资质及关西地区营业据点。',
    'Learn about Daitora Group’s principles, company profile, operating licences, scale and office network across Kansai.',
    'Daitora Group의 기업 이념, 운영 원칙, 회사 규모, 인허가 및 간사이 지역 거점을 소개합니다.',
    '介紹Daitora Group的企業理念、營運準則、公司規模、許可資質及關西地區營業據點。'
  ),
  'business.html': t(
    '大寅ハイヤー、寅丸タクシー、大寅中古車販売の三つの事業をご紹介します。',
    '介绍Daitora Group旗下包车接送、Toramaru Taxi及Daitora Auto二手车销售三大业务。',
    'Explore Daitora Group’s three core businesses: chauffeur transportation, Toramaru Taxi and Daitora Auto used car sales.',
    'Daitora Group의 전용 차량 서비스, Toramaru Taxi, Daitora Auto 중고차 판매 등 세 가지 핵심 사업을 소개합니다.',
    '介紹Daitora Group旗下包車接送、Toramaru Taxi及Daitora Auto中古車銷售三大事業。'
  ),
  'business-hire.html': t(
    '空港送迎、観光貸切、企業・VIP送迎に対応する大寅ハイヤーをご紹介します。',
    '了解Daitora包车接送服务，包括关西机场接送、观光包车、企业团体及VIP接送。',
    'Daitora Chauffeur & Private Transportation provides airport transfers, private tours, corporate transportation and VIP service across Kansai.',
    'Daitora Chauffeur & Private Transportation의 공항 송영, 관광 전세, 기업 및 VIP 송영 서비스를 소개합니다.',
    '了解Daitora包車接送服務，包括關西機場接送、觀光包車、企業團體及VIP接送。'
  ),
  'business-taxi.html': t(
    '大阪・京都・堺・港区など関西エリアの地域移動を支える寅丸タクシーをご紹介します。',
    '了解Toramaru Taxi在大阪、京都、堺等关西地区提供的车站、酒店、医院、观光及商务出行服务。',
    'Toramaru Taxi supports everyday travel to stations, hotels, hospitals, sightseeing destinations and business appointments across Kansai.',
    'Toramaru Taxi가 간사이 지역의 역, 호텔, 병원, 관광지 및 비즈니스 목적지 이동을 지원합니다.',
    '了解Toramaru Taxi在大阪、京都、堺等關西地區提供的車站、飯店、醫院、觀光及商務移動服務。'
  ),
  'business-auto.html': t(
    '中古車販売、ローン相談、車両購入サポートを行う大寅中古車販売をご紹介します。',
    '了解Daitora Auto二手车销售、车辆选购支持、业务用车咨询及汽车贷款事前审查流程。',
    'Daitora Auto supports used car selection, business vehicles, purchase guidance and auto loan pre-screening.',
    'Daitora Auto의 중고차 선택, 사업용 차량, 구매 지원 및 자동차 대출 사전 심사 절차를 안내합니다.',
    '了解Daitora Auto中古車銷售、車輛選購支援、事業用車洽詢及汽車貸款事前審查流程。'
  ),
  'quality.html': t(
    '乗務員教育、車両管理、配車確認、GPS運行管理、法令遵守など安全品質体制をご紹介します。',
    '介绍Daitora Group在司机培训、车辆检查、调度确认、GPS运营管理、依法合规及紧急应对方面的安全品质体系。',
    'See how driver training, vehicle inspections, dispatch checks, GPS monitoring, compliance and contingency response support service quality.',
    '운전기사 교육, 차량 점검, 배차 확인, GPS 운행 관리, 법령 준수 및 긴급 대응으로 안전과 품질을 관리합니다.',
    '介紹Daitora Group在司機培訓、車輛檢查、派車確認、GPS營運管理、依法合規及緊急應對方面的安全品質體系。'
  ),
  'works.html': t(
    '公開できる範囲で、大寅グループの国際会議、企業視察、VIP送迎、大型案件の対応実績をご紹介します。',
    '在可公开范围内，介绍Daitora Group承接国际会议、企业考察、VIP接送及大型活动交通服务的实绩。',
    'Selected Daitora Group experience in international conferences, corporate visits, VIP transportation and large-scale assignments.',
    '공개 가능한 범위에서 국제회의, 기업 시찰, VIP 송영 및 대형 행사 관련 운행 실적을 소개합니다.',
    '在可公開範圍內，介紹Daitora Group承接國際會議、企業考察、VIP接送及大型活動交通服務的實績。'
  ),
  'company.html': t(
    '株式会社大寅の会社概要は「大寅について」ページに統合されました。',
    'Daitora公司概要已整合至“关于大寅”页面。',
    'The Daitora company profile is now part of the About Daitora page.',
    'Daitora 회사 개요는 Daitora 소개 페이지에 통합되었습니다.',
    'Daitora公司概要已整合至「關於大寅」頁面。'
  ),
  'news.html': t(
    '大寅グループからのお知らせ、事業情報、公開できる範囲での対応実績をご紹介します。',
    '查看Daitora Group的公告、业务动态、内部培训、安全品质信息及可公开的交通服务实绩。',
    'News, business updates, training, safety initiatives and selected operating experience from Daitora Group.',
    'Daitora Group의 공지, 사업 소식, 교육, 안전 활동 및 공개 가능한 운행 실적을 소개합니다.',
    '查看Daitora Group的公告、事業動態、內部培訓、安全品質資訊及可公開的交通服務實績。'
  ),
  'contact.html': t(
    '空港送迎、タクシー、中古車販売、法人相談、採用に関するお問い合わせ窓口をご案内します。',
    '按机场接送、出租车、二手车、企业合作、招聘等咨询类型，查看电话、邮件及所需准备信息。',
    'Contact Daitora Group about chauffeur transportation, taxi use, used cars, corporate transport, recruitment or other inquiries.',
    '전용 차량 서비스, 택시, 중고차, 법인 운송, 채용 및 기타 문의 방법을 안내합니다.',
    '依機場接送、計程車、中古車、企業合作、招募等洽詢類型，查看電話、電子郵件及所需準備資訊。'
  ),
  'privacy.html': t(
    '大寅グループが取得する個人情報、利用目的、管理方法、お問い合わせ窓口をご案内します。',
    '说明Daitora Group收集的个人信息、使用目的、保存与管理方式以及隐私咨询渠道。',
    'Learn what personal information Daitora Group collects, why it is used, how it is managed and how to contact us about privacy.',
    'Daitora Group이 수집하는 개인정보, 이용 목적, 보관 및 관리 방법과 개인정보 문의처를 안내합니다.',
    '說明Daitora Group蒐集的個人資料、使用目的、保存與管理方式以及隱私洽詢管道。'
  ),
  '404.html': t(
    'お探しのページが見つかりません。',
    '您访问的页面不存在或已移动。',
    'The page you requested could not be found or may have moved.',
    '요청하신 페이지를 찾을 수 없거나 이동되었습니다.',
    '您瀏覽的頁面不存在或已移動。'
  ),
  ...EXPANSION_SEO_DESCRIPTIONS
};

export function finalLockEntries() {
  return [
    ...Object.entries(UI_LOCKS).map(([source, translations]) => ({ group: 'UI_LOCKS', source, translations })),
    ...Object.entries(BRAND_LOCKS).map(([source, translations]) => ({ group: 'BRAND_LOCKS', source, translations })),
    ...Object.entries(FACT_LOCKS).map(([source, translations]) => ({ group: 'FACT_LOCKS', source, translations }))
  ];
}
