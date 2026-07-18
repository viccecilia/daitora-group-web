import fs from 'node:fs';
import path from 'node:path';
import { finalLockEntries } from './i18n-config.mjs';

const root = process.cwd();
const contentPath = path.join(root, 'scripts', 'i18n-content.json');
const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));

// Human-edited copy overrides. This file is intentionally deterministic and
// must never call a translation API.
const overrides = {
  '中古車販売、ローン相談、車両購入サポート。用途に合った一台を、運行現場を知る視点で支援します。': {
    ko: '중고차 판매부터 대출 상담, 차량 구매 지원까지. 실제 차량 운영 경험을 바탕으로 용도에 맞는 차량을 함께 찾습니다.',
    en: 'Used car sales, loan consultation and purchase support, informed by our first-hand vehicle operations experience.',
    'zh-CN': '提供二手车销售、贷款咨询与购车支持。凭借实际车辆运营经验，协助您选择符合实际用途的车辆。',
    'zh-TW': '提供中古車銷售、貸款諮詢與購車支援。憑藉實際車輛營運經驗，協助您選擇符合實際用途的車輛。'
  },
  '用途と維持管理まで考えた車両選び。': {
    ko: '용도와 유지관리까지 고려한 차량 선택.',
    en: 'Choose a vehicle with its purpose and upkeep in mind.',
    'zh-CN': '从实际用途到维护管理，全面考虑车辆选择。',
    'zh-TW': '從實際用途到維護管理，全面考量車輛選擇。'
  },
  '株式会社大寅では、中古車販売事業として、厳選した車両の販売と購入サポートを提供しています。ハイヤー・タクシー運行の現場を知る会社だからこそ、用途、状態、維持管理、乗り出し後の使いやすさまで考えた車両選びをサポートします。': {
    ko: 'Daitora Auto / Used Car Sales는 엄선한 중고차 판매와 구매 지원을 제공합니다. 전용 차량과 택시를 직접 운영해 온 경험을 바탕으로 용도, 차량 상태, 유지관리, 출고 후의 실용성까지 고려해 차량 선택을 지원합니다.',
    en: 'Daitora Auto / Used Car Sales offers carefully selected used vehicles and practical purchase support. Drawing on our experience operating chauffeur and taxi fleets, we consider intended use, condition, maintenance and day-to-day usability after handover.',
    'zh-CN': 'Daitora Auto / Used Car Sales 提供严选二手车与购车支持。凭借包车接送和出租车的实际运营经验，我们会综合考虑用途、车辆状况、维护管理以及交车后的日常使用便利性。',
    'zh-TW': 'Daitora Auto / Used Car Sales 提供嚴選中古車與購車支援。憑藉包車接送與計程車的實際營運經驗，我們會綜合考量用途、車況、維護管理以及交車後的日常使用便利性。'
  },
  '車両仕入ネットワーク': {
    ko: '차량 조달 네트워크',
    en: 'Vehicle sourcing network',
    'zh-CN': '车辆采购网络',
    'zh-TW': '車輛採購網絡'
  },
  '運行会社が考える、実用的な車両選び。': {
    ko: '운영회사의 경험으로 제안하는 실용적인 차량 선택.',
    en: 'Practical vehicle selection, informed by real operations.',
    'zh-CN': '从实际运营出发，选择真正实用的车辆。',
    'zh-TW': '從實際營運出發，選擇真正實用的車輛。'
  },
  '大寅グループは、ハイヤー、タクシー、送迎車両を日々運行している会社です。そのため、車両を単なる商品としてではなく、実際に使う場面、乗りやすさ、荷物の積みやすさ、維持管理、納車後の使いやすさまで含めて考えています。': {
    ko: 'Daitora Group은 전용 차량, 택시, 송영 차량을 매일 직접 운영합니다. 그래서 차량을 단순한 상품으로 보지 않고 실제 사용 환경, 승하차 편의성, 적재 공간, 유지관리, 차량 인도 후의 사용 편의성까지 함께 고려합니다.',
    en: 'Daitora Group operates chauffeur, taxi and transfer vehicles every day. We therefore assess a vehicle not simply as a product, but in terms of real-world use, ease of access, luggage capacity, maintenance and usability after handover.',
    'zh-CN': 'Daitora Group 每天实际运营包车接送、出租车及接送车辆。因此，我们不会只把车辆视为商品，而会综合考虑实际使用场景、上下车便利性、行李装载、维护管理以及交车后的日常使用体验。',
    'zh-TW': 'Daitora Group 每天實際營運包車接送、計程車及接送車輛。因此，我們不會只把車輛視為商品，而會綜合考量實際使用情境、上下車便利性、行李裝載、維護管理以及交車後的日常使用體驗。'
  },
  '個人利用、家族利用、事業用車両、送迎関連車両まで。用途に合った一台を、無理なく選べるようサポートします。': {
    ko: '개인용과 가족용부터 사업용·송영용 차량까지, 용도와 상황에 맞는 차량을 차분히 선택할 수 있도록 지원합니다.',
    en: 'From personal and family use to business and passenger-transfer vehicles, we help you identify a practical choice for your needs.',
    'zh-CN': '从个人及家庭用车，到业务车辆和接送车辆，我们会根据实际用途协助您梳理合适的选择。',
    'zh-TW': '從個人及家庭用車，到事業用與接送車輛，我們會依實際用途協助您整理合適的選擇。'
  },
  '用途を見る': {
    ko: '용도를 확인합니다',
    en: 'Understand the intended use',
    'zh-CN': '明确用车需求',
    'zh-TW': '確認用車需求'
  },
  '通勤、家族利用、送迎、事業利用など、実際の使い方に合わせて車両を整理します。': {
    ko: '출퇴근, 가족 이용, 송영, 사업용 등 실제 사용 방식에 맞춰 차량 후보를 정리합니다.',
    en: 'We narrow the options around how the vehicle will actually be used, whether for commuting, family travel, passenger transfers or business.',
    'zh-CN': '根据通勤、家庭使用、接送或业务用途等实际用车需求，梳理车辆选择。',
    'zh-TW': '依通勤、家庭使用、接送或事業用途等實際用車需求，整理車輛選擇。'
  },
  '状態を見る': {
    ko: '차량 상태를 확인합니다',
    en: 'Review the vehicle condition',
    'zh-CN': '确认车辆状况',
    'zh-TW': '確認車輛狀況'
  },
  '使い続けることを考える': {
    ko: '장기적인 사용까지 고려합니다',
    en: 'Plan for long-term use',
    'zh-CN': '考虑长期使用',
    'zh-TW': '考量長期使用'
  },
  '維持管理、乗り降り、荷物、日々の使いやすさまで含めてご提案します。': {
    ko: '유지관리, 승하차, 적재 공간, 일상적인 사용 편의성까지 고려해 제안합니다.',
    en: 'Our recommendations consider upkeep, access, luggage and everyday usability.',
    'zh-CN': '从维护管理、上下车、行李装载到日常使用便利性，提出综合建议。',
    'zh-TW': '從維護管理、上下車、行李裝載到日常使用便利性，提出綜合建議。'
  },
  '車両選びから、申込手続き、納車まで。': {
    ko: '차량 선택부터 신청 절차와 차량 인도까지.',
    en: 'From vehicle selection and application to vehicle handover.',
    'zh-CN': '从选车、申请手续到车辆交付。',
    'zh-TW': '從選車、申請手續到車輛交付。'
  },
  '用途に合った一台を、安心して進められるようサポートします。': {
    ko: '용도에 맞는 차량을 선택하고 안심하며 절차를 진행할 수 있도록 지원합니다.',
    en: 'We help you choose the right vehicle and move through each step with confidence.',
    'zh-CN': '协助您选择符合实际用途的车辆，并安心推进各项手续。',
    'zh-TW': '協助您選擇符合實際用途的車輛，安心完成各項手續。'
  },
  '大寅中古車販売では、個人利用から事業用車両まで、使用目的、乗車人数、走行距離、維持管理まで考えた車両選びをお手伝いしています。': {
    ko: 'Daitora Auto / Used Car Sales는 개인용부터 사업용 차량까지 사용 목적, 승차 인원, 예상 주행거리, 유지관리를 고려한 차량 선택을 돕습니다.',
    en: 'Daitora Auto / Used Car Sales helps customers choose vehicles for personal or business use by considering purpose, passenger capacity, expected mileage and maintenance.',
    'zh-CN': 'Daitora Auto / Used Car Sales 面向个人及业务用车需求，综合使用目的、乘车人数、行驶里程和维护管理，协助选择车辆。',
    'zh-TW': 'Daitora Auto / Used Car Sales 面向個人及事業用車需求，綜合使用目的、乘車人數、行駛里程與維護管理，協助選擇車輛。'
  },
  'ローンをご希望の場合も、必要書類や申込の流れをわかりやすくご案内し、安心して手続きを進められるようサポートします。': {
    ko: '자동차 대출을 원하시는 경우에도 필요 서류와 신청 절차를 알기 쉽게 안내해 안심하고 진행하실 수 있도록 지원합니다.',
    en: 'If you are considering vehicle financing, we explain the required documents and application process clearly so you can proceed with confidence.',
    'zh-CN': '如需办理汽车贷款，我们会清晰说明所需资料与申请流程，协助您安心完成手续。',
    'zh-TW': '如需辦理汽車貸款，我們會清楚說明所需文件與申請流程，協助您安心完成手續。'
  },
  'オートローン事前審査へ': {
    ko: '자동차 대출 사전 심사 신청',
    en: 'Start Auto Loan Pre-Screening',
    'zh-CN': '申请汽车贷款预审',
    'zh-TW': '申請汽車貸款預審'
  },
  '申込前に、確認できること。': {
    ko: '신청 전에 확인할 사항.',
    en: 'What to confirm before applying.',
    'zh-CN': '申请前可先确认的事项。',
    'zh-TW': '申請前可先確認的事項。'
  },
  'オートローン事前審査へ進む前に、車両の用途、申込区分、必要書類、購入希望時期などを整理しておくと、手続きをよりスムーズに進められます。大寅中古車販売では、状況に合わせて確認事項をご案内します。': {
    ko: '자동차 대출 사전 심사를 신청하기 전에 차량 용도, 신청자 구분, 필요 서류, 구매 희망 시기 등을 정리하면 절차를 보다 원활하게 진행할 수 있습니다. Daitora Auto / Used Car Sales가 고객 상황에 맞춰 확인 사항을 안내합니다.',
    en: 'Before applying for auto loan pre-screening, it helps to clarify the vehicle’s purpose, applicant type, required documents and preferred purchase timing. We guide you through the relevant points for your circumstances.',
    'zh-CN': '申请汽车贷款预审前，可先整理车辆用途、申请人类型、所需资料和计划购车时间，以便更顺畅地推进手续。我们会根据您的情况说明需要确认的事项。',
    'zh-TW': '申請汽車貸款預審前，可先整理車輛用途、申請人類型、所需文件與預計購車時間，以便更順暢地完成手續。我們會依您的情況說明需要確認的事項。'
  },
  '申込区分': {
    ko: '신청자 구분',
    en: 'Applicant type',
    'zh-CN': '申请人类型',
    'zh-TW': '申請人類型'
  },
  'ご相談いただける内容': {
    ko: '상담 가능한 내용',
    en: 'How we can help',
    'zh-CN': '可咨询的内容',
    'zh-TW': '可諮詢的內容'
  },
  '運行現場を知る会社として、乗車人数、荷物、維持管理まで考えた車両相談に対応します。': {
    ko: '차량 운영 현장을 아는 회사로서 승차 인원, 적재 공간, 유지관리까지 고려한 차량 상담을 제공합니다.',
    en: 'Our operations experience allows us to advise on passenger capacity, luggage needs and ongoing maintenance.',
    'zh-CN': '凭借实际车辆运营经验，我们会综合乘车人数、行李需求和维护管理提供车辆咨询。',
    'zh-TW': '憑藉實際車輛營運經驗，我們會綜合乘車人數、行李需求與維護管理提供車輛諮詢。'
  },
  'ご相談から納車までの流れ': {
    ko: '상담부터 차량 인도까지',
    en: 'From consultation to vehicle handover',
    'zh-CN': '从咨询到车辆交付',
    'zh-TW': '從諮詢到車輛交付'
  },
  'ヒアリング': {
    ko: '상담 및 요구사항 확인',
    en: 'Needs assessment',
    'zh-CN': '了解用车需求',
    'zh-TW': '了解用車需求'
  },
  '車両提案': {
    ko: '차량 제안',
    en: 'Vehicle recommendation',
    'zh-CN': '车辆方案',
    'zh-TW': '車輛方案'
  },
  '納車': {
    ko: '차량 인도',
    en: 'Vehicle handover',
    'zh-CN': '车辆交付',
    'zh-TW': '車輛交付'
  },
  'まだ車種が決まっていませんが、相談できますか？': {
    ko: '아직 차종을 정하지 못했는데 상담할 수 있나요?',
    en: 'Can I contact you before deciding on a model?',
    'zh-CN': '尚未确定车型，也可以咨询吗？',
    'zh-TW': '尚未確定車型，也可以諮詢嗎？'
  },
  'はい。用途やご希望をお聞きした上で、候補車両を一緒に整理します。': {
    ko: '네. 용도와 희망 조건을 확인한 뒤 적합한 후보 차량을 함께 정리해 드립니다.',
    en: 'Yes. We first understand your intended use and preferences, then help you narrow down suitable options.',
    'zh-CN': '可以。我们会先了解您的用车需求和期望，再一起梳理合适的候选车辆。',
    'zh-TW': '可以。我們會先了解您的用車需求與期望，再一起整理合適的候選車輛。'
  },
  '事業用車両も相談できますか？': {
    ko: '사업용 차량도 상담할 수 있나요?',
    en: 'Can you advise on business vehicles?',
    'zh-CN': '可以咨询业务用车吗？',
    'zh-TW': '可以諮詢事業用車輛嗎？'
  },
  '在日外国人でも相談できますか？': {
    ko: '일본에 거주하는 외국인도 상담할 수 있나요?',
    en: 'Can foreign residents in Japan also inquire?',
    'zh-CN': '在日外国人也可以咨询吗？',
    'zh-TW': '在日外國人也可以諮詢嗎？'
  },
  '審査結果は希望通りになりますか？': {
    ko: '심사 결과가 반드시 희망 조건대로 나오나요?',
    en: 'Is approval or a preferred loan condition guaranteed?',
    'zh-CN': '审查结果一定会符合预期吗？',
    'zh-TW': '審查結果一定會符合預期嗎？'
  },
  'ローンのご利用には所定の審査がございます。審査結果やご利用条件は、お客様の状況および提携先の基準により異なります。': {
    ko: '자동차 대출 이용에는 소정의 심사가 필요합니다. 심사 결과와 이용 조건은 고객의 상황 및 제휴 금융사의 기준에 따라 달라질 수 있습니다.',
    en: 'Vehicle financing is subject to screening. Results and available terms vary according to the applicant’s circumstances and the finance provider’s criteria.',
    'zh-CN': '汽车贷款需经过规定审查。审查结果及适用条件会根据客户情况和合作金融机构的标准而有所不同。',
    'zh-TW': '汽車貸款需經過規定審查。審查結果及適用條件會依客戶情況與合作金融機構的標準而有所不同。'
  },
  '大寅中古車販売が選ばれる理由': {
    ko: 'Daitora Auto / Used Car Sales를 선택하는 이유',
    en: 'Why Choose Daitora Auto / Used Car Sales',
    'zh-CN': '选择 Daitora Auto / Used Car Sales 的理由',
    'zh-TW': '選擇 Daitora Auto / Used Car Sales 的理由'
  },
  '運行現場を知る車両提案': {
    ko: '운영 경험을 바탕으로 한 차량 제안',
    en: 'Recommendations grounded in operations experience',
    'zh-CN': '基于实际运营经验的车辆建议',
    'zh-TW': '基於實際營運經驗的車輛建議'
  },
  'ハイヤー・タクシー運行で培った車両管理の視点から、用途に合う一台を考えます。': {
    ko: '전용 차량과 택시 운영으로 축적한 차량 관리 경험을 바탕으로 용도에 맞는 차량을 함께 검토합니다.',
    en: 'We draw on fleet-management experience from chauffeur and taxi operations to identify a vehicle suited to your needs.',
    'zh-CN': '凭借包车接送与出租车运营中积累的车辆管理经验，协助您选择符合实际用途的车辆。',
    'zh-TW': '憑藉包車接送與計程車營運中累積的車輛管理經驗，協助您選擇符合實際用途的車輛。'
  },
  '事業用車両にも対応': {
    ko: '사업용 차량 상담',
    en: 'Support for business vehicles',
    'zh-CN': '支持业务用车咨询',
    'zh-TW': '支援事業用車輛諮詢'
  },
  '乗り出し後の使いやすさ、維持管理、事業での活用まで現場目線で相談できます。': {
    ko: '차량 인도 후의 사용 편의성, 유지관리, 사업 활용까지 실제 운영 관점에서 상담해 드립니다.',
    en: 'We can advise on usability after handover, ongoing maintenance and business use from an operator’s perspective.',
    'zh-CN': '从实际运营角度，为交车后的使用便利性、维护管理及业务应用提供咨询。',
    'zh-TW': '從實際營運角度，為交車後的使用便利性、維護管理及事業應用提供諮詢。'
  },
  '車両購入・ローン相談はこちら': {
    ko: '차량 구매 및 대출 상담',
    en: 'Vehicle Purchase and Loan Consultation',
    'zh-CN': '车辆购买与贷款咨询',
    'zh-TW': '車輛購買與貸款諮詢'
  },
  '中古車販売について相談する': {
    ko: '중고차 구매 상담',
    en: 'Discuss a Used Vehicle Purchase',
    'zh-CN': '咨询二手车购买',
    'zh-TW': '諮詢中古車購買'
  },

  'EXPO2025 大阪・関西万博 要人送迎業務を請負しました': {
    ko: '2025 오사카·간사이 엑스포 주요 인사 송영 업무를 수행했습니다',
    en: 'Provided Executive Transportation for Expo 2025 Osaka, Kansai',
    'zh-CN': '承接 EXPO 2025 大阪·关西世博会重要来宾接送服务',
    'zh-TW': '承接 EXPO 2025 大阪・關西世博會重要來賓接送服務'
  },
  '大寅グループは、EXPO2025 大阪・関西万博に関連する要人送迎業務を請け負いました。国内外の来賓・関係者の移動に対応し、空港到着時の受け入れから会場・ホテル間の移動まで、一貫した送迎体制を整備しました。': {
    ko: 'Daitora Group은 2025 오사카·간사이 엑스포 관련 주요 인사 송영 업무를 수행했습니다. 국내외 귀빈과 관계자의 이동을 위해 공항 도착 지원부터 행사장과 호텔 간 이동까지 일관된 운행 체계를 구축했습니다.',
    en: 'Daitora Group provided executive transportation related to Expo 2025 Osaka, Kansai. We established an integrated operating plan for domestic and international guests, from airport arrival support to transfers between hotels and venues.',
    'zh-CN': 'Daitora Group 承接了 EXPO 2025 大阪·关西世博会相关的重要来宾接送服务。针对国内外来宾及相关人员，从机场抵达到会场、酒店之间的移动，建立一体化接送体系。',
    'zh-TW': 'Daitora Group 承接了 EXPO 2025 大阪・關西世博會相關的重要來賓接送服務。針對國內外來賓及相關人員，從機場抵達到會場、飯店之間的移動，建立一體化接送體系。'
  },
  '要人送迎': {
    ko: '주요 인사 송영',
    en: 'Executive transportation',
    'zh-CN': '重要来宾接送',
    'zh-TW': '重要來賓接送'
  },
  '大型イベントに関連する関係者送迎に対応し、複数台運行・現場連携を行いました。': {
    ko: '대형 행사 관계자 송영을 위해 여러 대의 차량을 운행하고 현장 담당자와 긴밀히 협업했습니다.',
    en: 'Coordinated multi-vehicle transportation and on-site communication for a large-scale event.',
    'zh-CN': '为大型活动相关人员提供接送服务，并实施多车协同与现场联络。',
    'zh-TW': '為大型活動相關人員提供接送服務，並執行多車協同與現場聯絡。'
  },
  '複数都市・複数日程にわたる団体移動に対応し、行程に合わせた送迎手配を実施しました。': {
    ko: '여러 도시와 일정에 걸친 단체 이동을 위해 전체 일정에 맞춘 차량과 운행 계획을 준비했습니다.',
    en: 'Arranged group transportation across multiple cities and dates in line with the full itinerary.',
    'zh-CN': '承接跨多个城市和日期的团体移动，并根据整体行程安排接送。',
    'zh-TW': '承接跨多個城市與日期的團體移動，並依整體行程安排接送。'
  },
  '行程管理': {
    ko: '일정 관리',
    en: 'Itinerary management',
    'zh-CN': '行程管理',
    'zh-TW': '行程管理'
  },
  '現場連携': {
    ko: '현장 협업',
    en: 'On-site coordination',
    'zh-CN': '现场协同',
    'zh-TW': '現場協同'
  },
  '守秘意識': {
    ko: '기밀 유지 의식',
    en: 'Confidentiality awareness',
    'zh-CN': '保密意识',
    'zh-TW': '保密意識'
  },
  'VIP顧客・関係者送迎に対応。複数台・複数日にわたる運行管理を行い、車両美観、乗務員の所作、待機中の対応まで品質を重視しました。': {
    ko: 'VIP 고객과 관계자 송영을 위해 여러 대의 차량을 여러 일정에 걸쳐 운영했습니다. 차량 청결과 운전기사의 응대 태도, 대기 중 지원까지 세심하게 관리했습니다.',
    en: 'Provided VIP and stakeholder transportation across multiple vehicles and dates, with close attention to vehicle presentation, chauffeur conduct and standby support.',
    'zh-CN': '为 VIP 客户及相关人员提供多车、多日接送服务，并重视车辆形象、司机礼仪和待命期间的现场配合。',
    'zh-TW': '為 VIP 客戶及相關人員提供多車、多日接送服務，並重視車輛形象、司機禮儀與待命期間的現場配合。'
  },
  '京都エリアを中心に、VIP顧客・関係者の送迎を担当。車両美観、乗務員の所作、待機中の対応まで重視しています。': {
    ko: '교토 지역을 중심으로 VIP 고객과 관계자 송영을 담당했습니다. 차량 청결, 운전기사의 응대 태도, 대기 중 지원까지 세심하게 관리했습니다.',
    en: 'Provided VIP and stakeholder transportation primarily in Kyoto, with careful attention to vehicle presentation, chauffeur conduct and standby support.',
    'zh-CN': '以京都地区为主，为 VIP 客户及相关人员提供接送，并重视车辆形象、司机礼仪和待命期间的现场配合。',
    'zh-TW': '以京都地區為主，為 VIP 客戶及相關人員提供接送，並重視車輛形象、司機禮儀與待命期間的現場配合。'
  },
  '京都エリアを中心に、VIP顧客・関係者の送迎を担当。車両美観、乗務員の所作、待機対応まで重視しています。': {
    ko: '교토 지역을 중심으로 VIP 고객과 관계자 송영을 담당했습니다. 차량 청결, 운전기사의 응대 태도, 대기 지원까지 세심하게 관리했습니다.',
    en: 'Provided VIP and stakeholder transportation primarily in Kyoto, with careful attention to vehicle presentation, chauffeur conduct and standby support.',
    'zh-CN': '以京都地区为主，为 VIP 客户及相关人员提供接送，并重视车辆形象、司机礼仪和待命配合。',
    'zh-TW': '以京都地區為主，為 VIP 客戶及相關人員提供接送，並重視車輛形象、司機禮儀與待命配合。'
  },
  '大寅グループでは、中古車販売事業の拡大に伴い、車両仕入体制を強化しました。ハイヤー・タクシー運行の現場で日々車両を扱う会社として、見た目や年式だけでなく、走行状態、維持管理、用途、乗り出し後の使いやすさまで含めた車両提案を行います。': {
    ko: 'Daitora Group은 중고차 판매 사업 확대에 맞춰 차량 조달 체계를 강화했습니다. 전용 차량과 택시를 매일 운영하는 회사로서 외관과 연식뿐 아니라 주행 상태, 유지관리, 사용 목적, 차량 인도 후의 실용성까지 고려해 차량을 제안합니다.',
    en: 'As its used vehicle business expands, Daitora Group has strengthened its sourcing process. Because we operate chauffeur and taxi vehicles every day, our recommendations consider not only appearance and model year, but also driving condition, maintenance, intended use and usability after handover.',
    'zh-CN': '随着二手车销售业务扩大，Daitora Group 强化了车辆采购体系。作为日常运营包车接送和出租车的企业，我们不仅关注外观和年款，也会综合行驶状况、维护管理、实际用途及交车后的使用便利性提出车辆建议。',
    'zh-TW': '隨著中古車銷售事業擴大，Daitora Group 強化了車輛採購體系。作為日常營運包車接送與計程車的企業，我們不僅關注外觀與年式，也會綜合行駛狀況、維護管理、實際用途及交車後的使用便利性提出車輛建議。'
  },
  '企業団体の視察・研修に伴う送迎業務に対応しました。複数都市・複数日程にわたる行程に合わせて、人数、荷物、移動時間、待機場所を事前に確認し、必要な車両と乗務員を手配しました。': {
    ko: '기업 단체의 시찰과 연수 이동을 지원했습니다. 여러 도시와 일정으로 구성된 여정에 맞춰 인원, 수하물, 이동 시간, 대기 장소를 사전에 확인하고 필요한 차량과 운전기사를 배정했습니다.',
    en: 'Supported corporate inspection and training travel across multiple cities and dates. We confirmed passenger numbers, luggage, travel times and waiting locations in advance, then assigned the required vehicles and drivers.',
    'zh-CN': '为企业团体视察及研修提供接送服务。针对跨多个城市和日期的行程，提前确认人数、行李、移动时间和待命地点，并安排所需车辆与司机。',
    'zh-TW': '為企業團體視察及研修提供接送服務。針對跨多個城市與日期的行程，提前確認人數、行李、移動時間與待命地點，並安排所需車輛與司機。'
  },

  'ハイヤー': {
    en: 'Chauffeur Service'
  },
  'ハイヤーを相談する': {
    en: 'Request Chauffeur Service'
  },
  '実績紹介を見る': {
    en: 'View Our Track Record'
  },
  '対応内容': {
    en: 'Scope of Service'
  },
  '乗務員教育': {
    en: 'Driver Training'
  },
  '乗務員採用': {
    en: 'Driver Recruitment'
  },
  '乗務員共有': {
    en: 'Driver Briefing'
  },
  '人数・荷物・用途に合わせて、車両と乗務員を手配。': {
    en: 'Assign the appropriate vehicle and driver based on passenger numbers, luggage and purpose.'
  },
  '車両、乗務員、配車、現場対応を一体で整える。': {
    en: 'Vehicles, chauffeurs, dispatch and on-site coordination, managed as one operation.'
  },
  '関西空港、伊丹空港、神戸空港の送迎から、京都・奈良・神戸方面の観光貸切、企業視察、国際会議、ブランドイベント、VIP接待まで。大寅ハイヤーは、関西での上質な移動を現場から支えます。': {
    en: 'From Kansai, Itami and Kobe airport transfers to private tours in Kyoto, Nara and Kobe, corporate visits, international conferences, brand events and VIP transportation, Daitora Chauffeur & Private Transportation delivers dependable service throughout Kansai.'
  },
  '関西空港・伊丹空港・神戸空港の送迎から、京都・奈良・神戸方面の観光貸切、企業視察、VIP接待まで対応。人数・荷物・接待規格に合わせて、Alphard、Hiace、Mercedes-Benz S-Class などの車両と乗務員を手配します。': {
    en: 'We provide transfers from Kansai, Itami and Kobe airports, private tours to Kyoto, Nara and Kobe, corporate visits and VIP transportation. Alphard, Hiace and Mercedes-Benz S-Class vehicles are assigned with professional chauffeurs according to passenger count, luggage and service requirements.'
  },
  'お客様5名まで。空港送迎、VIP接待、家族旅行、企業送迎など、快適な車内空間が求められる場面に適しています。': {
    en: 'For up to five passengers. Well suited to airport transfers, VIP transportation, family travel and corporate use where a comfortable cabin matters.'
  },
  '落ち着いた移動空間と高い接遇品質が求められる、高規格なビジネス送迎やVIP接待に対応します。': {
    en: 'For executive and VIP transportation requiring a calm cabin and a high standard of chauffeur service.'
  },
  '空港送迎 / VIP接待 / 観光貸切': {
    en: 'Airport Transfer / VIP Transportation / Private Tour'
  },
  'View achievements': {
    en: 'View Our Track Record'
  },
  '乗務員教育、車両管理、配車確認、GPS運行管理、法令遵守、緊急時対応まで。大寅グループの安全と品質を支える運行体制を紹介します。': {
    en: 'Learn how driver training, vehicle management, dispatch checks, GPS monitoring, legal compliance and emergency response work together to support Daitora Group’s safety and service quality.'
  },
  '大寅グループでは、乗務員教育、車両管理、配車確認、GPS運行管理、法令遵守、緊急時対応を一体で運用し、一件一件の送迎を安全かつ安定して実行できる体制を整えています。': {
    en: 'Daitora Group integrates driver training, vehicle management, dispatch verification, GPS monitoring, legal compliance and contingency response to deliver each journey safely and consistently.'
  },
  '大寅の品質は、一度の特別な対応ではなく、毎日の確認と共有によって支えられています。乗務員、配車担当、車両管理担当が連携し、一件一件の送迎を安定して運行できる体制を整えています。': {
    en: 'Daitora’s service quality is built through daily checks and communication. Drivers, dispatchers and vehicle management staff work together to support consistent operation for every journey.'
  },
  'VIP接待': {
    en: 'VIP Transportation'
  },
  '採用・乗務員応募': {
    en: 'Driver Recruitment'
  },
  'ドライバー採用、乗務員応募、勤務条件に関するお問い合わせ。': {
    en: 'Inquiries about driver recruitment, applications and working conditions.'
  },
  '空港送迎、観光貸切、企業送迎、VIP接待、大型案件に関するご相談。': {
    en: 'Inquiries about airport transfers, private tours, corporate and VIP transportation, and large-scale assignments.'
  },
  '空港送迎・観光貸切・企業送迎・VIP接待・地域タクシー・中古車販売': {
    en: 'Airport Transfers ・ Private Tours ・ Corporate Transportation ・ VIP Transportation ・ Local Taxi ・ Used Car Sales'
  },
  '乗務員への事前共有': {
    en: 'Advance Driver Briefing'
  },
  '乗務員への接遇方針と運行情報の共有': {
    en: 'Briefing drivers on service standards and operating information'
  },
  '乗務員と車両管理担当の確認項目共有': {
    en: 'Sharing inspection points between drivers and vehicle management staff'
  },
  '配車担当と乗務員間の情報共有手順の確認': {
    en: 'Reviewing information-sharing procedures between dispatchers and drivers'
  },
  '乗務員向け接遇・安全研修を実施しました': {
    en: 'Conducted Service and Safety Training for Drivers'
  },
  '接遇、安全意識、時間管理、情報共有をテーマに、乗務員向け研修を実施しました。': {
    en: 'Conducted driver training focused on service, safety awareness, time management and information sharing.'
  },
  '車両、乗務員、時間の調整': {
    en: 'Coordination of vehicles, drivers and schedules'
  },

  '行程、人数、荷物に合わせた運行管理': {
    ko: '일정, 인원, 수하물에 맞춘 운행 관리'
  },
  '行程、待ち合わせ場所、車両台数、配慮事項など': {
    ko: '일정, 미팅 장소, 차량 대수, 요청 사항 등'
  },
  '行程表': {
    ko: '일정표'
  },
  '行程表、資料送付、法人相談など': {
    ko: '일정표 및 자료 송부, 법인 상담 등'
  },
  '複数都市、複数日程の行程対応': {
    ko: '여러 도시와 일정에 걸친 여정 대응'
  },
  '複数都市、複数日程の行程確認': {
    ko: '여러 도시와 일정에 대한 사전 확인'
  },
  '企業視察、研修行程に合わせた送迎手配': {
    ko: '기업 시찰 및 연수 일정에 맞춘 송영 준비'
  },
  '京都、奈良、神戸、USJ、富士山方面など、行程に合わせた貸切送迎に対応します。': {
    ko: '교토, 나라, 고베, USJ, 후지산 방면 등 일정에 맞춘 전용 차량 서비스를 제공합니다.'
  },
  '単発送迎、時間貸切、複数日運行、複数台運行など、行程に合わせて調整します。': {
    ko: '편도 송영, 시간제 전세, 여러 날짜 또는 여러 대의 차량 운행 등 일정에 맞춰 조정합니다.'
  },
  '団体や荷物の多い行程に。': {
    ko: '단체 이동이나 수하물이 많은 일정에.'
  },
  '旅行会社・行政団体・企業団体案件': {
    ko: '여행사·공공기관·기업 단체 프로젝트'
  },
  '大手旅行会社、行政団体、企業団体からの依頼案件にも多数対応経験があります。公開できる範囲に限り、今後も実績情報を整理して掲載していきます。': {
    ko: '대형 여행사, 공공기관, 기업 단체의 의뢰에도 다수 대응해 왔습니다. 공개 가능한 범위에서 관련 실적을 지속적으로 정리해 소개하겠습니다.'
  },
  '行政団体対応': {
    ko: '공공기관 대응'
  },
  '約50名規模の企業視察・遊学行程に対応。東京、大阪、鹿児島、熊本、京都、滋賀など複数都市を含む行程で、車両手配と運行管理を実施しました。': {
    ko: '약 50명 규모의 기업 시찰 및 연수 일정에 대응했습니다. 도쿄, 오사카, 가고시마, 구마모토, 교토, 시가 등 여러 도시를 포함한 여정에서 차량 배정과 운행 관리를 수행했습니다.'
  },
  '国際会議関連の関係者送迎に対応し、時間管理、守秘意識、複数車両の運行調整を経験しました。': {
    ko: '국제회의 관계자 송영을 수행하며 시간 관리, 기밀 유지, 여러 차량의 운행 조정 경험을 쌓았습니다.'
  },
  '大阪で開催された国際会議関連送迎に対応。要人・関係者の移動に求められる時間管理、守秘意識、現場判断を経験しました。': {
    ko: '오사카에서 열린 국제회의 관련 송영을 수행했습니다. 주요 인사와 관계자 이동에 필요한 시간 관리, 기밀 유지, 현장 판단 역량을 축적했습니다.'
  },
  '訪日中の移動に必要な車両手配、ホテル・会場間移動、空港送迎などに対応しました。守秘意識と時間管理を前提に、落ち着いた運行を支援しました。': {
    ko: '방일 기간 중 필요한 차량 배정, 호텔과 행사장 간 이동, 공항 송영을 지원했습니다. 기밀 유지와 정확한 시간 관리를 바탕으로 안정적인 운행을 제공했습니다.'
  },
  '大寅が大切にしているのは、運転技術だけではありません。接遇、安全意識、時間管理、地理知識、守秘意識まで含めて、安心して任せられるドライバーを育成しています。': {
    ko: 'Daitora가 중요하게 생각하는 것은 운전 기술만이 아닙니다. 서비스 태도, 안전 의식, 시간 관리, 지리 지식, 기밀 유지까지 갖춘 신뢰할 수 있는 운전기사를 양성합니다.'
  },
  '接遇、安全意識、地理知識、時間管理を継続的に確認。お客様への言葉遣い、乗降時の配慮、守秘意識まで含めて教育しています。': {
    ko: '서비스 태도, 안전 의식, 지리 지식, 시간 관리를 지속적으로 점검합니다. 고객 응대 언어, 승하차 배려, 기밀 유지까지 포함해 교육합니다.'
  },
  'フライト変更、道路渋滞、集合時間変更、急な行程変更にも対応。配車担当と現場が連携し、素早く正確な調整を行います。': {
    ko: '항공편 변경, 도로 정체, 집합 시간 변경, 갑작스러운 일정 변경에도 대응합니다. 배차 담당자와 현장이 협업해 신속하고 정확하게 조정합니다.'
  },
  'お問い合わせ内容に応じて、行程、車両、料金、当日の連絡体制を確認し、移動に不安が残らないよう手配します。': {
    ko: '문의 내용에 따라 일정, 차량, 이용 조건, 당일 연락 체계를 확인하고 안심할 수 있도록 준비합니다.'
  },

  '中古車販売、事業用車両、ローン相談に対応。運行現場を知る会社だからこそ、用途、状態、維持管理、乗り出し後の使いやすさまで考えた車両選びを支援します。': {
    'zh-CN': '提供二手车销售、业务用车及贷款咨询。凭借实际车辆运营经验，我们会综合用途、车况、维护管理和交车后的使用便利性，协助选择合适车辆。',
    'zh-TW': '提供中古車銷售、事業用車輛及貸款諮詢。憑藉實際車輛營運經驗，我們會綜合用途、車況、維護管理與交車後的使用便利性，協助選擇合適車輛。'
  },
  '車両管理の知見を活かし、用途に合った車両提案と購入支援を強化しました。': {
    'zh-CN': '运用车辆管理经验，强化符合实际用途的车辆建议与购车支持。',
    'zh-TW': '運用車輛管理經驗，強化符合實際用途的車輛建議與購車支援。'
  },
  '中古車購入、事業用車両、ローン相談、オートローン事前審査に関するご相談。': {
    ko: '중고차 구매, 사업용 차량, 대출 상담, 자동차 대출 사전 심사에 관한 문의입니다.'
  },
  '中古車販売、事業用車両、ローン相談に対応。運行現場を知る会社だからこそ、用途、状態、維持管理、乗り出し後の使いやすさまで考えた車両選びを支援します。': {
    ko: '중고차 판매, 사업용 차량, 대출 상담을 지원합니다. 실제 차량 운영 경험을 바탕으로 용도, 차량 상태, 유지관리, 차량 인도 후의 사용 편의성까지 고려해 차량 선택을 돕습니다.',
    'zh-CN': '提供二手车销售、业务用车及贷款咨询。凭借实际车辆运营经验，我们会综合用途、车况、维护管理和交车后的使用便利性，协助选择合适车辆。',
    'zh-TW': '提供中古車銷售、事業用車輛及貸款諮詢。憑藉實際車輛營運經驗，我們會綜合用途、車況、維護管理與交車後的使用便利性，協助選擇合適車輛。'
  },
  'ハイヤー相談へ': {
    ko: '전용 차량 서비스 상담'
  },
  'タクシー相談へ': {
    ko: '택시 이용 상담'
  },
  '中古車相談へ': {
    ko: '중고차 구매 상담'
  },
  '法人相談へ': {
    ko: '법인 상담'
  },
  '採用相談へ': {
    ko: '채용 상담'
  },
  'その他の相談へ': {
    ko: '기타 문의'
  },
  '法人・旅行会社・ホテル様の送迎相談': {
    ko: '법인·여행사·호텔 송영 상담'
  },
  '法人・旅行会社・ホテル様': {
    ko: '법인·여행사·호텔'
  },
  '電話をかける': {
    ko: '전화하기'
  },
  '採用応募': {
    ko: '채용 문의'
  },
  'ご相談内容を送る': {
    ko: '문의 내용 보내기'
  },
  '日時、人数、荷物、行程を確認し、利用目的に合ったプランをご案内します。': {
    ko: '일시, 인원, 수하물, 전체 일정을 확인한 뒤 이용 목적에 맞는 운행 계획을 안내합니다.'
  },
  '日本語・英語・中国語に対応できる乗務員体制で、訪日のお客様にも配慮します。': {
    ko: '일본어, 영어, 중국어 응대가 가능한 운전기사 체계를 갖추어 방일 고객의 이동을 세심하게 지원합니다.',
    en: 'Japanese-, English- and Chinese-speaking chauffeurs are available to support international visitors.'
  },
  'お客様のご利用相談、ホテル・法人様からの配車相談、乗務員採用のお問い合わせを、それぞれ確認しやすい形で受け付けています。': {
    en: 'We provide clear inquiry routes for passengers, hotel and corporate dispatch requests, and driver recruitment.'
  },
  '空港送迎、観光貸切、企業・VIP送迎、地域タクシー、中古車販売まで、車両・乗務員・配車・現場対応を一体で支えています。': {
    en: 'From airport transfers and private tours to corporate and VIP transportation, local taxi service and used car sales, we coordinate vehicles, drivers, dispatch and on-site support as one operation.'
  },
  '運転技術だけでなく、接遇、安全意識、時間管理を重視した乗務員教育を行っています。': {
    en: 'Driver training covers not only driving technique, but also service standards, safety awareness and time management.'
  },
  'フライト変更、道路状況、現場要望に応じて、配車担当と乗務員が連携します。': {
    en: 'Dispatchers and drivers coordinate in response to flight changes, road conditions and on-site requests.'
  },
  '日時、便名、人数、荷物、行き先、待ち合わせ場所を事前確認。人数や用途に合わせて、適切な車両と乗務員を手配します。': {
    en: 'We confirm the date, flight number, passenger count, luggage, destination and meeting point in advance, then assign the appropriate vehicle and driver.'
  },
  '大寅グループでは、乗務員向けに接遇・安全研修を実施しました。空港送迎、企業送迎、VIP接待、地域交通など、利用シーンに応じた言葉遣い、乗降時の配慮、時間管理、情報共有をテーマに確認を行いました。': {
    en: 'Daitora Group conducted service and safety training for drivers. The program covered professional communication, boarding assistance, time management and information sharing across airport, corporate, VIP and local transportation scenarios.'
  },
  'アルファード、ハイエース、シエンタ、普通車、事業用車両など。': {
    ko: '알파드, 하이에이스, 시엔타, 일반 승용차, 사업용 차량 등.'
  },
  '個人、法人、個人事業主、在日外国人のお客様など。': {
    ko: '개인, 법인, 개인사업자, 일본 거주 외국인 고객 등.'
  },
  '法人・個人事業主': {
    ko: '법인·개인사업자'
  },
  '営業車、送迎車、事業用車両など、用途に合わせた車両選びをサポートします。': {
    ko: '영업용, 송영용, 사업용 차량 등 실제 용도에 맞는 차량 선택을 지원합니다.'
  },
  '在日外国人のお客様': {
    ko: '일본 거주 외국인 고객'
  },
  '日本での車両購入が初めての方にも、必要な確認事項や流れをわかりやすくご案内します。': {
    ko: '일본에서 처음 차량을 구매하는 분께도 필요한 확인 사항과 절차를 알기 쉽게 안내합니다.'
  },
  'よくあるご相談': {
    ko: '자주 묻는 질문'
  },
  'はい。営業車、送迎車、業務利用を想定した車両のご相談にも対応しています。': {
    ko: '네. 영업용, 송영용 등 사업 목적에 맞는 차량 상담도 가능합니다.'
  },
  'はい。日本での車両購入が初めての方にも、必要な確認事項や流れをご案内します。': {
    ko: '네. 일본에서 처음 차량을 구매하는 분께도 필요한 확인 사항과 절차를 안내합니다.'
  },
  'ローンを利用したい場合はどうすればよいですか？': {
    ko: '자동차 대출을 이용하려면 어떻게 해야 하나요?'
  },
  'まずは車両や用途を確認し、必要書類や申込の流れをご案内します。その後、オートローン事前審査フォームへ進んでいただけます。': {
    ko: '먼저 희망 차량과 용도를 확인한 뒤 필요 서류와 신청 절차를 안내합니다. 이후 자동차 대출 사전 심사 신청서로 진행하실 수 있습니다.'
  },
  '営業車、送迎車、業務利用など、利用目的に合わせた相談に対応します。': {
    ko: '영업용, 송영용 등 실제 사업 목적에 맞춰 상담해 드립니다.'
  },
  'ローン相談の流れを案内': {
    ko: '대출 상담 절차 안내'
  },
  '必要書類や申込手続きの流れを整理し、確認しながら進められるよう支援します。': {
    ko: '필요 서류와 신청 절차를 정리해 각 단계를 확인하며 진행할 수 있도록 돕습니다.'
  },
  '購入後の車両活用まで相談可能': {
    ko: '구매 후 차량 활용 상담'
  },
  'ローン相談に関するご案内': {
    ko: '자동차 대출 상담 안내'
  },
  'ローンのご利用には、所定の審査がございます。審査結果やご利用条件は、お客様の状況および提携先の基準により異なります。': {
    ko: '자동차 대출 이용에는 소정의 심사가 필요합니다. 심사 결과와 이용 조건은 고객의 상황 및 제휴 금융사의 기준에 따라 달라질 수 있습니다.'
  },
  '大寅中古車販売では、車両購入をご検討のお客様に対し、必要書類や申込の流れをわかりやすくご案内し、安心して手続きを進められるようサポートいたします。': {
    ko: 'Daitora Auto / Used Car Sales는 차량 구매를 검토하는 고객에게 필요 서류와 신청 절차를 알기 쉽게 안내해 안심하고 진행할 수 있도록 지원합니다.'
  },
  '審査結果によっては、ご希望に添えない場合がございます。': {
    ko: '심사 결과에 따라 희망하시는 조건을 제공하지 못할 수 있습니다.'
  },
  'ご利用条件は提携先の審査基準に基づきます。': {
    ko: '이용 조건은 제휴 금융사의 심사 기준에 따릅니다.'
  },
  'ご入力内容に不備がある場合、確認のご連絡を差し上げる場合がございます。': {
    ko: '입력 내용이 불충분한 경우 확인을 위해 연락드릴 수 있습니다.'
  }
};

Object.assign(overrides, {
  '事業紹介': {
    en: 'Businesses'
  },
  '事業紹介 | 大寅グループ': {
    en: 'Businesses | Daitora Group'
  },
  '/ 事業紹介': {
    en: '/ Businesses'
  },
  '/ 事業紹介 / 大寅ハイヤー': {
    en: '/ Businesses / Daitora Chauffeur & Private Transportation'
  },
  '/ 事業紹介 / 寅丸タクシー': {
    en: '/ Businesses / Toramaru Taxi'
  },
  '安全・品質': {
    en: 'Safety & Quality'
  },
  '実績紹介': {
    en: 'Track Record'
  },
  'ニュース': {
    en: 'News'
  },
  'お問い合わせ': {
    en: 'Contact'
  },
  '/ お問い合わせ': {
    en: '/ Contact'
  },
  'ハイヤー': {
    en: 'Chauffeur Service'
  },
  'タクシー': {
    en: 'Taxi'
  },
  '中古車販売': {
    en: 'Used Car Sales'
  },
  '関西で動かせる、': {
    en: 'Built to move Kansai,'
  },
  '確かな運行基盤。': {
    en: 'with a dependable operating network.'
  },
  '空港送迎・企業送迎・大型案件対応': {
    en: 'Airport Transfers ・ Corporate Transportation ・ Large-Scale Assignments'
  },
  '大阪・京都・堺・港区など関西複数拠点を軸に、グループ全体で約100台規模の車両ネットワークを運用。': {
    en: 'Across locations in Osaka, Kyoto, Sakai and Minato, our group operates a network of approximately 100 vehicles.'
  },
  '約100台': {
    en: 'Approx. 100 vehicles'
  },
  '車両ネットワーク': {
    en: 'Group vehicle network'
  },
  '関西複数拠点': {
    en: 'Multiple Kansai bases'
  },
  '大阪・京都・堺・港区': {
    en: 'Osaka, Kyoto, Sakai & Minato'
  },
  '主要空港対応': {
    en: 'Major airport coverage'
  },
  '用途別車両': {
    en: 'Vehicles for every requirement'
  },
  '企業・VIP・大型案件対応': {
    en: 'Corporate, VIP and large-scale assignments'
  },
  '許認可に基づく合法運行体制': {
    en: 'Licensed and compliant operations'
  },
  '三つの事業で、': {
    en: 'Three business divisions,'
  },
  '関西の移動と車両活用を支える。': {
    en: 'supporting mobility and vehicle use across Kansai.'
  },
  '大寅グループは、ハイヤー、タクシー、中古車販売を軸に、空港送迎、観光貸切、企業送迎、地域交通、車両活用までを一体で支えています。': {
    en: 'Through chauffeur services, taxis and used car sales, Daitora Group supports airport transfers, private tours, corporate transportation, local mobility and practical vehicle use across Kansai.'
  },
  '地域交通・日常移動・観光利用': {
    en: 'Local mobility ・ Daily travel ・ Sightseeing'
  },
  '大阪・京都を中心に、駅、ホテル、空港周辺、観光地、ビジネス先への日常移動を支えるタクシー事業。地域を知る乗務員と安定した運行管理により、短距離移動から観光利用まで対応します。': {
    en: 'Toramaru Taxi supports everyday journeys to stations, hotels, airports, sightseeing destinations and business appointments across Osaka and Kyoto. Local knowledge and disciplined operations support both short trips and visitor travel.'
  },
  '地域交通': {
    en: 'Local mobility'
  },
  '観光利用': {
    en: 'Sightseeing travel'
  },
  '中古車販売・事業用車両・ローン相談': {
    en: 'Used vehicles ・ Business vehicles ・ Loan guidance'
  },
  '中古車販売、事業用車両、ローン相談に対応。運行現場を知る会社だからこそ、用途、状態、維持管理、乗り出し後の使いやすさまで考えた車両選びを支援します。': {
    en: 'We support used vehicle purchases, business vehicles and loan consultations. Our first-hand operations experience helps us assess intended use, condition, maintenance and everyday practicality after vehicle handover.'
  },
  '事業用車両': {
    en: 'Business vehicles'
  },
  'ローン相談': {
    en: 'Loan guidance'
  },
  '購入後サポート': {
    en: 'Post-purchase support'
  },
  '車両だけではない。': {
    en: 'More than a fleet.'
  },
  '人と運行体制で支える。': {
    en: 'People and disciplined operations make every journey work.'
  },
  '大寅グループの強みは、車両数だけではありません。多言語対応、乗務員教育、整えられた車両環境、複数拠点での運行管理により、安心して任せられる移動を支えています。': {
    en: 'Our strength is not measured by fleet size alone. Multilingual support, chauffeur training, careful vehicle preparation and coordinated operations across multiple bases make each journey dependable.'
  },
  'プロの乗務員': {
    en: 'Professional chauffeurs'
  },
  '整えられた車両環境': {
    en: 'Prepared and maintained vehicles'
  },
  '複数拠点・複数台対応': {
    en: 'Multi-base, multi-vehicle coordination'
  },
  '法令遵守': {
    en: 'Compliance'
  },
  '国際会議関連の関係者送迎に対応。時間管理、待機場所確認、複数車両の運行調整を経験しました。': {
    en: 'Supported transportation for an international conference, including schedule control, standby-point checks and coordination across multiple vehicles.'
  },
  'G20大阪サミット関連送迎': {
    en: 'G20 Osaka Summit-related transportation'
  },
  '企業団体・視察送迎': {
    en: 'Corporate delegation and inspection tours'
  },
  '万博関連送迎': {
    en: 'Expo-related transportation'
  },
  'フランス大手ブランドメーカーの日本イベント送迎業務を担当しました': {
    en: 'Provided transportation for a major French brand event in Japan'
  },
  'ハイヤー相談': {
    en: 'Request Chauffeur Service'
  },
  'タクシー利用': {
    en: 'Request Taxi Service'
  },
  '中古車相談': {
    en: 'Discuss a Vehicle Purchase'
  },
  '採用応募': {
    en: 'Driver Recruitment'
  },
  '総合お問い合わせ': {
    en: 'General Enquiries'
  },
  'サービスに関するご相談はこちら': {
    en: 'Talk to us about your transportation or vehicle needs'
  },
  'ニュース一覧へ': {
    en: 'View All News'
  }
});

Object.assign(overrides, {
  'お問い合わせ内容に応じて、行程、車両、料金、当日の連絡体制を確認し、移動に不安が残らないよう手配します。': {
    en: 'We confirm the itinerary, vehicle requirements and day-of-service contact plan, then prepare each detail so your journey can proceed with confidence.'
  },
  'お客様9名まで。企業視察、団体送迎、観光貸切、荷物の多い移動に対応できる大型ワゴンです。': {
    en: 'A spacious wagon for up to nine passengers, suited to corporate visits, group transportation, private tours and journeys with substantial luggage.'
  },
  'お急ぎの確認や、直接相談したい内容がある場合はこちら。': {
    en: 'Call us when your request is time-sensitive or easier to discuss directly.'
  },
  'ドライバー応募、勤務条件、面談に関するご相談はこちら。': {
    en: 'For driver applications, working conditions and interview enquiries.'
  },
  'フランス大手ブランドメーカーによる日本国内イベントにおいて、関係者送迎業務を担当しました。来日ゲスト、イベント関係者、VIP顧客などの移動に対応し、会場・宿泊先・主要訪問先を結ぶ送迎手配を行いました。': {
    en: 'Daitora Group provided transportation for a major French brand event in Japan. We coordinated travel for international guests, event personnel and VIP clients between venues, accommodation and key destinations.'
  },
  '企業団体・視察送迎に対応しました': {
    en: 'Provided transportation for a corporate delegation and inspection tour'
  },
  '企業団体対応': {
    en: 'Corporate group transportation'
  },
  '企業視察、商談、会食、会議会場への移動など、時間管理が求められる移動を支えます。': {
    en: 'We support time-sensitive transportation for corporate visits, meetings, business dinners and conference venues.'
  },
  '企業視察、研修旅行、工場見学など、複数名・複数台での移動を伴う案件に対応しています。': {
    en: 'We coordinate multi-passenger and multi-vehicle assignments for corporate visits, training programmes and factory tours.'
  },
  '出庫前の点検、車内清掃、外装確認を実施。お客様に安心してご乗車いただける車両状態を維持します。': {
    en: 'Before dispatch, we inspect each vehicle, clean the cabin and check the exterior to maintain a safe, presentable operating condition.'
  },
  '出庫前の点検、車内清掃、車両状態の確認を行い、快適で安全な移動空間を維持します。': {
    en: 'Pre-dispatch inspection, cabin cleaning and vehicle-condition checks help maintain a safe and comfortable environment.'
  },
  '出庫前の車両状態確認': {
    en: 'Pre-dispatch vehicle-condition check'
  },
  '出庫前確認、車内清掃、車両状態確認を徹底し、快適な移動空間づくりを進めています。': {
    en: 'We strengthened pre-dispatch checks, cabin cleaning and vehicle-condition inspections to maintain a comfortable passenger environment.'
  },
  '品質ポイント': {
    en: 'Quality Focus'
  },
  '培った力': {
    en: 'Capabilities Demonstrated'
  },
  '大型案件・企業送迎のご相談はこちら': {
    en: 'Discuss a large-scale or corporate transportation assignment'
  },
  '大寅グループでは、出庫前確認、車内清掃、車両状態確認を徹底し、快適な移動空間づくりを進めています。安全な運行だけでなく、お客様が乗車した瞬間に安心できる車内環境を整えることを重視しています。': {
    en: 'Daitora Group has strengthened pre-dispatch checks, cabin cleaning and vehicle-condition inspections. Alongside safe operation, we focus on preparing a clean, reassuring environment from the moment each passenger boards.'
  },
  '大寅ハイヤーに関するご相談はこちら': {
    en: 'Discuss your chauffeur transportation requirements'
  },
  '大阪で開催された国際会議関連送迎に対応。要人・関係者の移動に求められる時間管理、守秘意識、現場判断を経験しました。': {
    en: 'Supported transportation for an international conference in Osaka, applying the schedule control, confidentiality and on-site judgement required for executive and stakeholder movement.'
  },
  '寅丸タクシーに関するご相談はこちら': {
    en: 'Talk to us about Toramaru Taxi'
  },
  '旅行会社・行政団体・企業団体案件': {
    en: 'Travel agency, public-sector and corporate assignments'
  },
  '旅行会社対応': {
    en: 'Travel agency coordination'
  },
  '行政団体対応': {
    en: 'Public-sector coordination'
  },
  '訪日中の移動に必要な車両手配、ホテル・会場間移動、空港送迎などに対応しました。守秘意識と時間管理を前提に、落ち着いた運行を支援しました。': {
    en: 'Coordinated vehicles, airport transfers and travel between hotels and venues for an overseas delegation visiting Japan, with disciplined schedule control and confidentiality.'
  },
  '送迎、タクシー、中古車販売、法人相談、採用まで。ご希望の内容に合わせて担当者が確認いたします。': {
    en: 'For chauffeur services, taxis, used vehicles, corporate enquiries or recruitment, the appropriate team will review your request and respond.'
  },
  '駅、ホテル、観光地、病院、ビジネス先への移動相談はこちら。': {
    en: 'For journeys to stations, hotels, sightseeing destinations, hospitals and business appointments.'
  },
  '京都市内ホテル、観光地、企業訪問先への配車': {
    en: 'Vehicle dispatch to hotels, sightseeing destinations and corporate locations in Kyoto'
  },
  '用途確認': {
    en: 'Needs assessment'
  },
  '車両美観': {
    en: 'Vehicle presentation'
  },
  '待機調整': {
    en: 'Standby coordination'
  },
  'VIP対応': {
    en: 'VIP transportation'
  },
  '複数台運行': {
    en: 'Multi-vehicle operations'
  },
  '時間管理': {
    en: 'Schedule control'
  },
  '守秘意識': {
    en: 'Confidentiality'
  },
  '現場判断力': {
    en: 'On-site judgement'
  },
  'ハイヤー相談へ': {
    en: 'Request Chauffeur Service'
  },
  '送迎・ハイヤー相談': {
    en: 'Chauffeur & Private Transportation'
  },
  '大阪・京都・堺・港区など関西複数拠点・約100台規模の車両ネットワーク': {
    en: 'Multiple Kansai bases across Osaka, Kyoto, Sakai and Minato ・ An approximately 100-vehicle network'
  }
});

Object.assign(overrides, {
  '国際会議関連の関係者送迎に対応し、時間管理、守秘意識、複数車両の運行調整を経験しました。': {
    en: 'Supported stakeholder transportation for an international conference, with disciplined schedule control, confidentiality and multi-vehicle coordination.'
  },
  '大阪・京都・堺・港区など関西エリアの移動を支える。': {
    en: 'Supporting everyday mobility across Osaka, Kyoto, Sakai and Minato.'
  },
  'タクシー利用と採用相談を、分けてご案内します。': {
    en: 'Choose the appropriate route for a taxi request or a driver recruitment enquiry.'
  },
  'タクシー利用を相談する': {
    en: 'Request Taxi Service'
  },
  '見つけやすく、乗りやすい。': {
    en: 'Easy to recognise. Easy to board.'
  },
  'TORAMARU TAXI の車両。': {
    en: 'The Toramaru Taxi fleet.'
  },
  '寅丸タクシーでは、トヨタ・シエンタを中心とした車両を運用しています。コンパクトで乗り降りしやすく、街中や住宅地、駅周辺でも使いやすい車両です。車両には TORAMARU TAXI のサインと緑ナンバーを装着し、地域で安心してご利用いただけるタクシーを目指しています。': {
    en: 'Toramaru Taxi operates primarily Toyota Sienta vehicles. Their compact size and accessible doors suit city streets, residential areas and station pickups. Each vehicle carries Toramaru Taxi identification and a commercial green licence plate.'
  },
  '寅丸タクシーは、駅やホテルからの移動、空港アクセス、観光、お出かけ、ビジネス利用まで、関西でのさまざまな移動シーンに対応しています。': {
    en: 'Toramaru Taxi supports station and hotel transfers, airport access, sightseeing, everyday outings and business travel throughout Kansai.'
  },
  '荷物がある日や、時間に余裕を持ちたい移動でも安心してご利用いただけるよう、関西エリアの移動を支えます。': {
    en: 'We support reliable travel across Kansai when you have luggage or need additional time for your journey.'
  },
  'グループで支える、安定した運行管理。': {
    en: 'Stable operations backed by the wider group.'
  },
  '寅丸タクシーでは、乗務員一人ひとりの安全意識と接遇姿勢を大切にしています。言葉遣い、乗降時の配慮、車内の清潔さ、時間への意識。小さな基本を積み重ねることが、地域で選ばれるタクシーにつながると考えています。': {
    en: 'Every Toramaru Taxi driver is expected to uphold safe driving, courteous communication, thoughtful boarding assistance, cabin cleanliness and reliable timekeeping. Consistent attention to these fundamentals earns trust in the communities we serve.'
  },
  '安全と品質を支える、': {
    en: 'The operating system behind'
  },
  '大寅の運行管理体制。': {
    en: 'Daitora safety and service quality.'
  },
  'GPS運行管理': {
    en: 'GPS Operations Monitoring'
  },
  '各国政府関係者、来賓、VVIPの移動に関連する送迎案件に対応。混雑時の運行管理、複数台調整、待機場所確認などを実施しました。': {
    en: 'Supported transportation for government representatives, guests and VVIPs from multiple countries, including congestion management, multi-vehicle coordination and standby-point checks.'
  },
  '関係者移動': {
    en: 'Stakeholder transportation'
  },
  '関係者移動における車両手配、時間管理、会場間移動に対応しました。移動予定の確認と当日の連絡体制を整え、関係者のスムーズな移動を支援しました。': {
    en: 'Coordinated vehicles, schedules and travel between venues for event stakeholders. Advance itinerary checks and a day-of-service communication plan supported smooth movement throughout the assignment.'
  },
  '大寅グループからのお知らせ、事業情報、公開できる範囲での主な対応実績をご紹介します。': {
    en: 'News, business updates and selected transportation assignments from Daitora Group, shared within the scope that can be disclosed.'
  },
  '大寅グループからのお知らせ、事業情報、公開可能な範囲での対応実績をご紹介します。': {
    en: 'News, business updates and selected transportation assignments from Daitora Group, shared within the scope that can be disclosed.'
  },
  '大寅グループは、大阪・京都・堺・港区を軸とした関西複数拠点での運行体制を強化しました。空港送迎、観光貸切、企業送迎、地域タクシーなど、利用目的に応じた車両手配と現場対応をより安定して行えるよう、拠点間の連携を進めています。': {
    en: 'Daitora Group strengthened coordination across its Osaka, Kyoto, Sakai and Minato bases. Closer communication between locations supports more consistent vehicle allocation and on-site response for airport transfers, private tours, corporate transportation and local taxi service.'
  },
  '希望車種': {
    en: 'Preferred vehicle'
  },
  'アルファード、ハイエース、シエンタ、普通車、事業用車両など。': {
    en: 'Alphard, Hiace, Sienta, passenger cars and business vehicles.'
  },
  '営業車、送迎車、業務利用など、利用目的に合わせた相談に対応します。': {
    en: 'We advise on commercial, passenger-transfer and other business-use vehicles according to the intended purpose.'
  }
});

// Final launch review: human-edited news copy and shared operations terms.
Object.assign(overrides, {
  '大阪・京都間の送迎案件への対応': {
    en: 'Transportation services between Osaka and Kyoto',
    ko: '오사카와 교토 간 송영 서비스',
    'zh-CN': '承接大阪与京都之间的交通服务项目',
    'zh-TW': '承接大阪與京都之間的交通服務項目'
  },
  '対応内容': {
    en: 'Scope of Service',
    ko: '운행 내용',
    'zh-CN': '服务内容',
    'zh-TW': '服務內容'
  },
  '複数台運行': {
    en: 'Multi-Vehicle Operations',
    ko: '복수 차량 운행',
    'zh-CN': '多车协同',
    'zh-TW': '多車協同'
  },
  '接遇': {
    en: 'Service Standards',
    ko: '고객 응대',
    'zh-CN': '接待服务',
    'zh-TW': '接待服務'
  },
  '接遇品質': {
    en: 'Service Quality',
    ko: '고객 응대 품질',
    'zh-CN': '接待品质',
    'zh-TW': '接待品質'
  },
  '乗務員教育': {
    en: 'Driver Training',
    ko: '운전기사 교육',
    'zh-CN': '司机培训',
    'zh-TW': '司機培訓'
  },
  '乗務員への事前共有': {
    en: 'Advance driver briefing',
    ko: '운전기사 사전 브리핑',
    'zh-CN': '提前向司机说明运营安排',
    'zh-TW': '提前向司機說明營運安排'
  },
  'フランス大手ブランドメーカーの日本イベント送迎業務を担当しました': {
    en: 'Provided Transportation for a Major French Brand Event in Japan',
    ko: '프랑스 대형 브랜드의 일본 행사 송영을 담당했습니다',
    'zh-CN': '承接法国大型品牌日本活动接送服务',
    'zh-TW': '承接法國大型品牌日本活動接送服務'
  },
  'イベント関係者・VIPゲストの移動に対応し、複数日程・複数台運行を含む送迎業務を実施しました。': {
    en: 'Provided transportation for event personnel and VIP guests across multiple schedules with coordinated multi-vehicle operations.',
    ko: '행사 관계자와 VIP 게스트를 위해 여러 일정에 걸쳐 복수 차량 송영을 운영했습니다.',
    'zh-CN': '为活动相关人员及 VIP 来宾提供多日程、多车辆协同接送服务。',
    'zh-TW': '為活動相關人員及 VIP 來賓提供多日程、多車輛協同接送服務。'
  },
  'フランス大手ブランドメーカーによる日本国内イベントにおいて、関係者送迎業務を担当しました。来日ゲスト、イベント関係者、VIP顧客などの移動に対応し、会場・宿泊先・主要訪問先を結ぶ送迎手配を行いました。': {
    en: 'Daitora Group provided transportation for a major French brand event in Japan. We coordinated travel for international guests, event personnel and VIP clients between venues, accommodation and key destinations.',
    ko: 'Daitora Group은 프랑스 대형 브랜드의 일본 행사에서 관계자 송영을 담당했습니다. 해외 게스트, 행사 관계자, VIP 고객이 행사장, 숙박지, 주요 방문지를 원활히 이동할 수 있도록 차량을 배정했습니다.',
    'zh-CN': 'Daitora Group 承接法国大型品牌在日本举办活动期间的相关人员接送，为访日嘉宾、活动人员及 VIP 客户安排会场、住宿地与主要访问地点之间的交通。',
    'zh-TW': 'Daitora Group 承接法國大型品牌在日本舉辦活動期間的相關人員接送，為訪日嘉賓、活動人員及 VIP 客戶安排會場、住宿地與主要訪問地點之間的交通。'
  },
  '乗務員への接遇方針と運行情報の共有': {
    en: 'Briefing drivers on service standards and operating information',
    ko: '운전기사에게 고객 응대 기준과 운행 정보 공유',
    'zh-CN': '向司机说明接待标准与运营信息',
    'zh-TW': '向司機說明接待標準與營運資訊'
  },
  '京都エリアでの対応力強化を目的に営業所を開設し、空港送迎・観光送迎・法人利用への体制を拡充しました。': {
    en: 'Opened a Kyoto office to strengthen airport transfers, private sightseeing transportation and corporate service in the area.',
    ko: '교토 지역의 공항 송영, 관광 전세, 법인 이용 대응을 강화하기 위해 영업소를 개설했습니다.',
    'zh-CN': '为加强京都地区的服务能力，开设京都营业所，进一步完善机场接送、观光包车及企业用车服务体系。',
    'zh-TW': '為加強京都地區的服務能力，開設京都營業所，進一步完善機場接送、觀光包車及企業用車服務體系。'
  },
  '繁忙期や大型案件における待機調整': {
    en: 'Standby coordination during peak periods and large-scale assignments',
    ko: '성수기 및 대형 프로젝트의 대기 차량 조정',
    'zh-CN': '旺季及大型项目的车辆待命协调',
    'zh-TW': '旺季及大型專案的車輛待命協調'
  },
  '中古車販売事業の体制を強化しました': {
    en: 'Strengthened Our Used Car Sales Operations',
    ko: '중고차 판매 운영 체제를 강화했습니다',
    'zh-CN': '进一步完善二手车销售业务体系',
    'zh-TW': '進一步完善中古車銷售業務體系'
  },
  '中古車販売・仕入体制を強化し、業務用車両から一般向け車両まで、より幅広いご提案が可能になりました。': {
    en: 'Expanded our sales and sourcing capabilities to support a broader range of business and personal vehicle requirements.',
    ko: '판매 및 차량 조달 체제를 강화해 사업용 차량부터 개인용 차량까지 폭넓게 제안할 수 있게 되었습니다.',
    'zh-CN': '强化二手车销售与车辆采购体系，可为业务用车及个人用车提供更广泛的车辆建议。',
    'zh-TW': '強化中古車銷售與車輛採購體系，可為事業用車及個人用車提供更廣泛的車輛建議。'
  },
  '業務用車両、一般向け車両の提案': {
    en: 'Vehicle recommendations for business and personal use',
    ko: '사업용 및 개인용 차량 제안',
    'zh-CN': '业务用车与个人用车建议',
    'zh-TW': '事業用車與個人用車建議'
  },
  '乗務員向け接遇・安全研修を実施しました': {
    en: 'Conducted Service and Safety Training for Drivers',
    ko: '운전기사 대상 고객 응대 및 안전 교육을 실시했습니다',
    'zh-CN': '开展司机接待服务与安全培训',
    'zh-TW': '舉辦司機接待服務與安全培訓'
  },
  '接遇、安全意識、時間管理、情報共有をテーマに、乗務員向け研修を実施しました。': {
    en: 'Conducted driver training focused on service, safety awareness, time management and information sharing.',
    ko: '고객 응대, 안전 의식, 시간 관리, 정보 공유를 주제로 운전기사 교육을 실시했습니다.',
    'zh-CN': '围绕接待服务、安全意识、时间管理与信息共享开展司机培训。',
    'zh-TW': '圍繞接待服務、安全意識、時間管理與資訊共享舉辦司機培訓。'
  },
  '大寅グループでは、乗務員向けに接遇・安全研修を実施しました。空港送迎、企業送迎、VIP接待、地域交通など、利用シーンに応じた言葉遣い、乗降時の配慮、時間管理、情報共有をテーマに確認を行いました。': {
    en: 'Daitora Group conducted service and safety training for drivers. The program covered professional communication, boarding assistance, time management and information sharing across airport, corporate, VIP and local transportation scenarios.',
    ko: 'Daitora Group은 운전기사를 대상으로 고객 응대 및 안전 교육을 실시했습니다. 공항 송영, 기업 송영, VIP 이동, 지역 교통 등 이용 상황에 맞는 말투와 승하차 배려, 시간 관리, 정보 공유 절차를 점검했습니다.',
    'zh-CN': 'Daitora Group 面向司机开展接待服务与安全培训，围绕机场接送、企业接送、VIP 接待和地区交通等场景，确认服务用语、乘客上下车时的协助、时间管理及信息共享流程。',
    'zh-TW': 'Daitora Group 面向司機舉辦接待服務與安全培訓，圍繞機場接送、企業接送、VIP 接待及地區交通等情境，確認服務用語、乘客上下車時的協助、時間管理及資訊共享流程。'
  },
  '接遇姿勢、言葉遣い、乗降時対応の確認': {
    en: 'Reviewing service conduct, professional language and boarding assistance',
    ko: '고객 응대 태도, 서비스 언어, 승하차 지원 점검',
    'zh-CN': '确认接待态度、服务用语及上下车协助',
    'zh-TW': '確認接待態度、服務用語及上下車協助'
  },
  '配車担当と乗務員間の情報共有手順の確認': {
    en: 'Reviewing information-sharing procedures between dispatchers and drivers',
    ko: '배차 담당자와 운전기사 간 정보 공유 절차 점검',
    'zh-CN': '确认调度人员与司机之间的信息共享流程',
    'zh-TW': '確認調度人員與司機之間的資訊共享流程'
  },
  '企業団体・視察送迎に対応しました': {
    en: 'Provided Transportation for a Corporate Delegation and Inspection Tour',
    ko: '기업 단체 및 시찰단 송영을 수행했습니다',
    'zh-CN': '承接企业团体及视察接送服务',
    'zh-TW': '承接企業團體及視察接送服務'
  },
  '複数都市・複数日程にわたる団体移動に対応し、行程に合わせた送迎手配を実施しました。': {
    en: 'Arranged group transportation across multiple cities and dates in line with the full itinerary.',
    ko: '여러 도시와 일정에 걸친 단체 이동을 위해 전체 일정에 맞춰 차량을 배정했습니다.',
    'zh-CN': '为跨多个城市及日期的团体行程安排相应接送服务。',
    'zh-TW': '為跨多個城市及日期的團體行程安排相應接送服務。'
  },
  '運行後の気づきと改善点の共有': {
    en: 'Sharing observations and improvement points after each operation',
    ko: '운행 후 확인 사항과 개선점 공유',
    'zh-CN': '共享运营后的发现与改进事项',
    'zh-TW': '共享營運後的發現與改善事項'
  },
  '乗務員と車両管理担当の確認項目共有': {
    en: 'Sharing inspection points between drivers and vehicle management staff',
    ko: '운전기사와 차량 관리 담당자 간 점검 항목 공유',
    'zh-CN': '司机与车辆管理人员共享检查项目',
    'zh-TW': '司機與車輛管理人員共享檢查項目'
  },
  '関西複数拠点の運行体制を強化しました': {
    en: 'Strengthened Our Multi-Base Operations Across Kansai',
    ko: '간사이 복수 거점의 운행 체제를 강화했습니다',
    'zh-CN': '进一步强化关西多据点运营体系',
    'zh-TW': '進一步強化關西多據點營運體系'
  },
  '空港、ホテル、観光地、会場間の車両配置': {
    en: 'Vehicle allocation between airports, hotels, sightseeing destinations and venues',
    ko: '공항, 호텔, 관광지, 행사장 간 차량 배치',
    'zh-CN': '协调机场、酒店、观光地及会场之间的车辆安排',
    'zh-TW': '協調機場、飯店、觀光地及會場之間的車輛安排'
  }
});

Object.assign(overrides, {
  'ハイヤー・空港送迎': {
    en: 'Chauffeur Service / Airport Transfer',
    ko: '전용 차량・공항 송영',
    'zh-CN': '包车接送 / 机场接送',
    'zh-TW': '包車接送 / 機場接送'
  },
  '採用・乗務員応募': {
    en: 'Driver Recruitment',
    ko: '운전기사 채용・지원',
    'zh-CN': '司机招聘与应聘',
    'zh-TW': '司機招聘與應徵'
  },
  'ドライバー採用、乗務員応募、勤務条件に関するお問い合わせ。': {
    en: 'Inquiries about driver recruitment, applications and working conditions.',
    ko: '운전기사 채용, 지원 및 근무 조건에 관한 문의입니다.',
    'zh-CN': '有关司机招聘、应聘及工作条件的咨询。',
    'zh-TW': '有關司機招聘、應徵及工作條件的洽詢。'
  },
  '送迎・ハイヤー相談': {
    en: 'Chauffeur & Private Transportation',
    ko: '전용 차량・송영 상담',
    'zh-CN': '包车接送咨询',
    'zh-TW': '包車接送洽詢'
  },
  'ハイヤー相談': {
    en: 'Request Chauffeur Service',
    ko: '전용 차량 서비스 상담',
    'zh-CN': '包车接送咨询',
    'zh-TW': '包車接送洽詢'
  },
  'ハイヤー相談へ': {
    en: 'Request Chauffeur Service',
    ko: '전용 차량 서비스 상담',
    'zh-CN': '前往包车接送咨询',
    'zh-TW': '前往包車接送洽詢'
  },
  'その他': {
    en: 'Other',
    ko: '기타',
    'zh-CN': '其他',
    'zh-TW': '其他'
  }
});

Object.assign(overrides, {
  '空港送迎・観光貸切・企業送迎・VIP接待・地域タクシー・中古車販売': {
    en: 'Airport Transfers / Private Tours / Corporate Transportation / VIP Transportation / Local Taxi / Used Car Sales',
    ko: '공항 송영・관광 전세・기업 송영・VIP 송영・지역 택시・중고차 판매',
    'zh-CN': '机场接送・观光包车・企业接送・VIP接送・区域出租车・二手车销售',
    'zh-TW': '機場接送・觀光包車・企業接送・VIP接送・區域計程車・中古車銷售'
  },
  '空港送迎、観光貸切、企業・VIP送迎、地域タクシー、中古車販売まで、車両・乗務員・配車・現場対応を一体で支えています。': {
    en: 'We support airport transfers, private tours, corporate and VIP transportation, local taxi services and used car sales through coordinated vehicles, drivers, dispatch and on-site operations.',
    ko: '공항 송영, 관광 전세, 기업・VIP 송영, 지역 택시, 중고차 판매까지 차량・운전기사・배차・현장 대응을 통합적으로 지원합니다.',
    'zh-CN': '从机场接送、观光包车、企业与VIP接送、区域出租车到二手车销售，由车辆、司机、调度与现场团队协同提供支持。',
    'zh-TW': '從機場接送、觀光包車、企業與VIP接送、區域計程車到中古車銷售，由車輛、司機、調度與現場團隊協同提供支援。'
  },
  '関西空港・伊丹空港・神戸空港の送迎から、京都・奈良・神戸方面の観光貸切、企業視察、VIP接待まで対応。人数・荷物・接待規格に合わせて、Alphard、Hiace、Mercedes-Benz S-Class などの車両と乗務員を手配します。': {
    en: 'We handle transfers from Kansai, Itami and Kobe airports, private tours in Kyoto, Nara and Kobe, corporate visits and VIP transportation. Vehicles such as the Alphard, Hiace and Mercedes-Benz S-Class are assigned with professional drivers according to passenger count, luggage and service requirements.',
    ko: '간사이・이타미・고베 공항 송영부터 교토・나라・고베 관광 전세, 기업 시찰, VIP 송영까지 대응합니다. 인원수, 수하물, 서비스 요건에 맞춰 Alphard, Hiace, Mercedes-Benz S-Class와 전문 운전기사를 배정합니다.',
    'zh-CN': '承接关西、伊丹及神户机场接送，以及京都、奈良、神户方向的观光包车、企业考察和VIP接送。根据人数、行李与服务要求，安排Alphard、Hiace、Mercedes-Benz S-Class等车辆及专业司机。',
    'zh-TW': '承接關西、伊丹及神戶機場接送，以及京都、奈良、神戶方向的觀光包車、企業考察與VIP接送。依人數、行李與服務需求，安排Alphard、Hiace、Mercedes-Benz S-Class等車輛及專業司機。'
  },
  '運転技術だけでなく、接遇、安全意識、時間管理を重視した乗務員教育を行っています。': {
    en: 'Driver training covers not only driving skills, but also professional service, safety awareness and time management.',
    ko: '운전 기술뿐 아니라 고객 응대, 안전 의식, 시간 관리를 중시한 운전기사 교육을 실시합니다.',
    'zh-CN': '司机培训不仅重视驾驶技术，也重视服务礼仪、安全意识与时间管理。',
    'zh-TW': '司機培訓不僅重視駕駛技術，也重視服務禮儀、安全意識與時間管理。'
  },
  '乗務員共有': {
    en: 'Driver Briefing',
    ko: '운전기사 공유',
    'zh-CN': '司机信息共享',
    'zh-TW': '司機資訊共享'
  },
  '日々の基本動作': {
    en: 'Daily Operating Routine',
    ko: '매일의 기본 운행 절차',
    'zh-CN': '每日基本运营流程',
    'zh-TW': '每日基本營運流程'
  },
  '当日運行': {
    en: 'Day-of-Service Operations',
    ko: '당일 운행',
    'zh-CN': '当日运营',
    'zh-TW': '當日營運'
  },
  '完了後共有': {
    en: 'Post-Service Review',
    ko: '운행 완료 후 공유',
    'zh-CN': '完成后复盘共享',
    'zh-TW': '完成後複盤共享'
  },
  '人数・荷物・用途に合わせて、車両と乗務員を手配。': {
    en: 'Assign the appropriate vehicle and driver for the passenger count, luggage and purpose.',
    ko: '인원수, 수하물, 용도에 맞춰 차량과 운전기사를 배정합니다.',
    'zh-CN': '根据人数、行李与用途安排车辆及司机。',
    'zh-TW': '依人數、行李與用途安排車輛及司機。'
  },
  'お客様のご利用相談、ホテル・法人様からの配車相談、乗務員採用のお問い合わせを、それぞれ確認しやすい形で受け付けています。': {
    en: 'We provide clear inquiry routes for passengers, hotel and corporate dispatch requests, and driver recruitment.',
    ko: '택시 이용, 호텔・법인 배차, 운전기사 채용 문의를 목적별로 알기 쉽게 접수합니다.',
    'zh-CN': '我们按用途清晰受理乘客用车、酒店与企业配车以及司机招聘咨询。',
    'zh-TW': '我們依用途清楚受理乘客用車、飯店與企業派車以及司機招聘洽詢。'
  },
  '乗務員採用': {
    en: 'Driver Recruitment',
    ko: '운전기사 채용',
    'zh-CN': '司机招聘',
    'zh-TW': '司機招聘'
  },
  '寅丸タクシーでは、乗務員一人ひとりの安全意識と接遇姿勢を大切にしています。言葉遣い、乗降時の配慮、車内の清潔さ、時間への意識。小さな基本を積み重ねることが、地域で選ばれるタクシーにつながると考えています。': {
    en: 'Toramaru Taxi values every driver’s safety awareness and service standards. Professional communication, considerate boarding assistance, a clean cabin and punctuality are the everyday basics behind a taxi service trusted by the community.',
    ko: 'Toramaru Taxi는 운전기사 한 사람 한 사람의 안전 의식과 고객 응대 자세를 중요하게 생각합니다. 정중한 말투, 승하차 배려, 청결한 차내, 시간 준수라는 기본을 꾸준히 지켜 지역에서 신뢰받는 택시를 지향합니다.',
    'zh-CN': 'Toramaru Taxi重视每位司机的安全意识与服务态度。礼貌用语、上下车照顾、车内清洁与时间观念，这些日常基本动作共同构成值得当地乘客信赖的出租车服务。',
    'zh-TW': 'Toramaru Taxi重視每位司機的安全意識與服務態度。禮貌用語、上下車照顧、車內清潔與時間觀念，這些日常基本動作共同構成值得在地乘客信賴的計程車服務。'
  },
  '車両、乗務員、配車、現場対応を一体で整える。': {
    en: 'Vehicles, drivers, dispatch and on-site coordination, managed as one operation.',
    ko: '차량, 운전기사, 배차, 현장 대응을 하나의 운행 체계로 관리합니다.',
    'zh-CN': '统筹车辆、司机、调度与现场应对。',
    'zh-TW': '統籌車輛、司機、調度與現場應對。'
  },
  '関西空港、伊丹空港、神戸空港の送迎から、京都・奈良・神戸方面の観光貸切、企業視察、国際会議、ブランドイベント、VIP接待まで。大寅ハイヤーは、関西での上質な移動を現場から支えます。': {
    en: 'From Kansai, Itami and Kobe airport transfers to private tours in Kyoto, Nara and Kobe, corporate visits, international conferences, brand events and VIP transportation, Daitora Chauffeur & Private Transportation delivers dependable service throughout Kansai.',
    ko: '간사이・이타미・고베 공항 송영부터 교토・나라・고베 관광 전세, 기업 시찰, 국제회의, 브랜드 행사, VIP 송영까지 Daitora Chauffeur & Private Transportation이 간사이 현장에서 안정적인 이동을 지원합니다.',
    'zh-CN': '从关西、伊丹、神户机场接送，到京都、奈良、神户方向的观光包车、企业考察、国际会议、品牌活动与VIP接送，Daitora Chauffeur & Private Transportation以现场运营能力保障关西地区的高品质出行。',
    'zh-TW': '從關西、伊丹、神戶機場接送，到京都、奈良、神戶方向的觀光包車、企業考察、國際會議、品牌活動與VIP接送，Daitora Chauffeur & Private Transportation以現場營運能力支援關西地區的高品質移動。'
  },
  'お客様5名まで。空港送迎、VIP接待、家族旅行、企業送迎など、快適な車内空間が求められる場面に適しています。': {
    en: 'For up to five passengers. Well suited to airport transfers, VIP transportation, family travel and corporate use where a comfortable cabin matters.',
    ko: '최대 5명까지 탑승할 수 있으며 공항 송영, VIP 송영, 가족 여행, 기업 송영 등 쾌적한 실내 공간이 필요한 상황에 적합합니다.',
    'zh-CN': '最多可乘坐5位乘客，适合机场接送、VIP接送、家庭出行及企业接送等重视舒适乘坐空间的场景。',
    'zh-TW': '最多可乘坐5位乘客，適合機場接送、VIP接送、家庭出行及企業接送等重視舒適乘坐空間的場景。'
  },
  'VIP・役員・要人接待に。': {
    en: 'For VIPs, executives and distinguished guests.',
    ko: 'VIP・임원・주요 인사 송영에.',
    'zh-CN': '适用于VIP、高管及重要来宾接送。',
    'zh-TW': '適用於VIP、高階主管及重要來賓接送。'
  },
  '落ち着いた移動空間と高い接遇品質が求められる、高規格なビジネス送迎やVIP接待に対応します。': {
    en: 'Designed for executive and VIP transportation that calls for a calm cabin and a high standard of chauffeur service.',
    ko: '차분한 실내와 높은 수준의 서비스가 필요한 임원 및 VIP 송영에 대응합니다.',
    'zh-CN': '适用于重视安静乘坐空间与高标准服务礼仪的商务及VIP接送。',
    'zh-TW': '適用於重視安靜乘坐空間與高標準服務禮儀的商務及VIP接送。'
  },
  'VIP / 役員 / 要人': {
    en: 'VIP / Executive / Distinguished Guest',
    ko: 'VIP / 임원 / 주요 인사',
    'zh-CN': 'VIP / 高管 / 重要来宾',
    'zh-TW': 'VIP / 高階主管 / 重要來賓'
  },
  '高規格送迎 / 接待 / 重要案件': {
    en: 'Executive Transportation / VIP Service / Priority Assignments',
    ko: '고급 송영 / VIP 서비스 / 주요 업무',
    'zh-CN': '高标准接送 / VIP服务 / 重要项目',
    'zh-TW': '高標準接送 / VIP服務 / 重要專案'
  },
  '空港送迎、観光貸切、企業送迎、VIP接待、大型案件に関するご相談。': {
    en: 'Inquiries about airport transfers, private tours, corporate and VIP transportation, and large-scale assignments.',
    ko: '공항 송영, 관광 전세, 기업・VIP 송영, 대형 업무에 관한 상담입니다.',
    'zh-CN': '有关机场接送、观光包车、企业与VIP接送以及大型项目的咨询。',
    'zh-TW': '有關機場接送、觀光包車、企業與VIP接送以及大型專案的洽詢。'
  },
  '乗務員教育、車両管理、配車確認、GPS運行管理、法令遵守、緊急時対応まで。大寅グループの安全と品質を支える運行体制を紹介します。': {
    en: 'Learn how driver training, vehicle management, dispatch checks, GPS monitoring, legal compliance and emergency response support Daitora Group’s safety and service quality.',
    ko: '운전기사 교육, 차량 관리, 배차 확인, GPS 운행 관리, 법령 준수, 긴급 대응으로 Daitora Group의 안전과 품질을 지키는 운행 체계를 소개합니다.',
    'zh-CN': '介绍Daitora Group通过司机培训、车辆管理、配车确认、GPS运营管理、依法合规及紧急应对保障安全与品质的运营体系。',
    'zh-TW': '介紹Daitora Group透過司機培訓、車輛管理、派車確認、GPS營運管理、依法合規及緊急應對保障安全與品質的營運體系。'
  },
  '大寅グループでは、乗務員教育、車両管理、配車確認、GPS運行管理、法令遵守、緊急時対応を一体で運用し、一件一件の送迎を安全かつ安定して実行できる体制を整えています。': {
    en: 'Daitora Group integrates driver training, vehicle management, dispatch verification, GPS monitoring, legal compliance and contingency response to deliver every journey safely and consistently.',
    ko: 'Daitora Group은 운전기사 교육, 차량 관리, 배차 확인, GPS 운행 관리, 법령 준수, 긴급 대응을 통합해 모든 송영을 안전하고 안정적으로 수행할 수 있는 체계를 갖추고 있습니다.',
    'zh-CN': 'Daitora Group将司机培训、车辆管理、配车确认、GPS运营管理、依法合规与紧急应对整合运行，确保每一次接送安全稳定地完成。',
    'zh-TW': 'Daitora Group將司機培訓、車輛管理、派車確認、GPS營運管理、依法合規與緊急應對整合運行，確保每一次接送安全穩定地完成。'
  },
  '乗務員教育': {
    en: 'Driver Training',
    ko: '운전기사 교육',
    'zh-CN': '司机培训',
    'zh-TW': '司機培訓'
  },
  '日時、便名、人数、荷物、行き先、待ち合わせ場所を事前確認。人数や用途に合わせて、適切な車両と乗務員を手配します。': {
    en: 'We confirm the date, flight, passenger count, luggage, destination and meeting point in advance, then assign the appropriate vehicle and driver.',
    ko: '일시, 항공편명, 인원수, 수하물, 목적지, 미팅 장소를 사전에 확인한 뒤 용도에 맞는 차량과 운전기사를 배정합니다.',
    'zh-CN': '事先确认日期、航班、人数、行李、目的地与会合地点，并根据用途安排合适的车辆及司机。',
    'zh-TW': '事先確認日期、航班、人數、行李、目的地與會合地點，並依用途安排合適的車輛及司機。'
  },
  'フライト変更、道路状況、現場要望に応じて、配車担当と乗務員が連携します。': {
    en: 'Dispatchers and drivers coordinate in response to flight changes, road conditions and on-site requests.',
    ko: '항공편 변경, 도로 상황, 현장 요청에 따라 배차 담당자와 운전기사가 연계합니다.',
    'zh-CN': '根据航班变更、道路状况与现场需求，由调度人员和司机协同应对。',
    'zh-TW': '依航班變更、道路狀況與現場需求，由調度人員和司機協同應對。'
  },
  '大寅の品質は、一度の特別な対応ではなく、毎日の確認と共有によって支えられています。乗務員、配車担当、車両管理担当が連携し、一件一件の送迎を安定して運行できる体制を整えています。': {
    en: 'Daitora’s quality is built through daily checks and communication. Drivers, dispatchers and vehicle management staff work together to support consistent operation for every journey.',
    ko: 'Daitora의 품질은 일회성 특별 대응이 아니라 매일의 확인과 공유로 유지됩니다. 운전기사, 배차 담당자, 차량 관리 담당자가 연계해 모든 송영을 안정적으로 운행합니다.',
    'zh-CN': 'Daitora的服务品质来自每日确认与信息共享，而不是一次性的特殊应对。司机、调度人员与车辆管理人员协同工作，确保每一次接送稳定运行。',
    'zh-TW': 'Daitora的服務品質來自每日確認與資訊共享，而不是一次性的特殊應對。司機、調度人員與車輛管理人員協同工作，確保每一次接送穩定運行。'
  },
  '車両、乗務員、時間の調整': {
    en: 'Coordination of vehicles, drivers and schedules',
    ko: '차량, 운전기사, 일정 조정',
    'zh-CN': '车辆、司机与时间协调',
    'zh-TW': '車輛、司機與時間協調'
  },
  '空港送迎 / VIP接待 / 観光貸切': {
    en: 'Airport Transfer / VIP Transportation / Private Tour',
    ko: '공항 송영 / VIP 송영 / 관광 전세',
    'zh-CN': '机场接送 / VIP接送 / 观光包车',
    'zh-TW': '機場接送 / VIP接送 / 觀光包車'
  },
  '接遇と気配り': {
    en: 'Professional Service and Consideration',
    ko: '고객 응대와 세심한 배려',
    'zh-CN': '服务礼仪与细致关怀',
    'zh-TW': '服務禮儀與細緻關懷'
  },
  '安全意識、接遇、乗降時の配慮、時間意識を基本として教育します。': {
    en: 'Training covers safety awareness, professional service, considerate boarding assistance and punctuality.',
    ko: '안전 의식, 고객 응대, 승하차 배려, 시간 준수를 기본으로 교육합니다.',
    'zh-CN': '以安全意识、服务礼仪、上下车照顾与时间观念为基础开展培训。',
    'zh-TW': '以安全意識、服務禮儀、上下車照顧與時間觀念為基礎進行培訓。'
  },
  'ハイヤーを相談する': {
    en: 'Request Chauffeur Service',
    ko: '전용 차량 서비스 상담',
    'zh-CN': '咨询包车接送服务',
    'zh-TW': '洽詢包車接送服務'
  },
  '大寅グループは、ハイヤー、タクシー、中古車販売を軸に、空港送迎、観光貸切、企業送迎、地域交通、車両活用までを一体で支えています。': {
    en: 'Through chauffeur services, taxis and used car sales, Daitora Group supports airport transfers, private tours, corporate transportation, local mobility and practical vehicle use across Kansai.',
    ko: 'Daitora Group은 전용 차량 서비스, 택시, 중고차 판매를 중심으로 공항 송영, 관광 전세, 기업 송영, 지역 교통과 차량 활용을 통합적으로 지원합니다.',
    'zh-CN': 'Daitora Group以包车接送、出租车与二手车销售为核心，综合支持机场接送、观光包车、企业接送、区域交通及车辆使用。',
    'zh-TW': 'Daitora Group以包車接送、計程車與中古車銷售為核心，綜合支援機場接送、觀光包車、企業接送、區域交通及車輛使用。'
  },
  '私たちは、社訓である「安全・謙遜・迅敏」を大切にしています。安全をすべての判断基準とし、謙虚な姿勢でお客様と向き合い、迅敏な対応力で期待を超えるサービスを提供すること。この姿勢を、日々の運行、接遇、車両管理、現場対応の一つひとつに反映しています。': {
    en: 'We value our company principles of Safety, Humility and Agility. Safety guides every decision, humility shapes how we serve each customer, and prompt, accurate action helps us respond beyond expectations. These principles are reflected in daily operations, professional service, vehicle management and on-site coordination.',
    ko: 'Daitora Group은 사훈인 안전・겸손・신속을 중요하게 생각합니다. 안전을 모든 판단의 기준으로 삼고, 겸손한 자세로 고객을 대하며, 신속하고 정확한 대응으로 기대에 부응합니다. 이러한 자세를 매일의 운행, 고객 응대, 차량 관리와 현장 대응에 반영합니다.',
    'zh-CN': '我们重视“安全、谦逊、迅敏”的企业准则。以安全作为所有判断的基础，以谦逊态度面对客户，并通过迅速准确的应对超越期待。这一准则落实在每日运营、服务礼仪、车辆管理与现场应对的每个环节。',
    'zh-TW': '我們重視「安全、謙遜、迅敏」的企業準則。以安全作為所有判斷的基礎，以謙遜態度面對客戶，並透過迅速準確的應對超越期待。這項準則落實在每日營運、服務禮儀、車輛管理與現場應對的每個環節。'
  },
  'VIPゲストとイベント関係者の移動に対応し、接遇品質と運行管理を重視しました。': {
    en: 'We coordinated transportation for VIP guests and event personnel with close attention to chauffeur service and operational control.',
    ko: 'VIP 게스트와 행사 관계자의 이동을 지원하며 고객 응대 품질과 운행 관리를 중시했습니다.',
    'zh-CN': '承接VIP嘉宾与活动相关人员的接送，并重视服务礼仪与运营管理。',
    'zh-TW': '承接VIP嘉賓與活動相關人員的接送，並重視服務禮儀與營運管理。'
  },
  '接遇品質': {
    en: 'Service Quality',
    ko: '고객 응대 품질',
    'zh-CN': '服务礼仪品质',
    'zh-TW': '服務禮儀品質'
  },
  '安全管理は、社内だけの仕組みではありません。時間に正確な運行、清潔な車内、丁寧な接遇、落ち着いた運転。お客様が実際に感じる一つひとつの品質を大切にしています。': {
    en: 'Safety management is reflected in the customer experience: punctual operation, a clean cabin, professional service and calm driving. We value each detail customers can see and feel.',
    ko: '안전 관리는 사내 절차에만 머물지 않습니다. 정확한 시간 관리, 청결한 차내, 정중한 고객 응대, 안정적인 운전 등 고객이 직접 느끼는 모든 품질을 중요하게 생각합니다.',
    'zh-CN': '安全管理不仅是内部制度，也体现在准时运营、整洁车厢、礼貌服务与平稳驾驶中。我们重视客户能够切身感受到的每一项品质。',
    'zh-TW': '安全管理不僅是內部制度，也體現在準時營運、整潔車廂、禮貌服務與平穩駕駛中。我們重視客戶能夠切身感受到的每一項品質。'
  },
  '丁寧な接遇': {
    en: 'Professional Service',
    ko: '정중한 고객 응대',
    'zh-CN': '礼貌周到的服务',
    'zh-TW': '禮貌周到的服務'
  },
  '接遇確認': {
    en: 'Service Standards Check',
    ko: '고객 응대 확인',
    'zh-CN': '服务礼仪确认',
    'zh-TW': '服務禮儀確認'
  },
  'VIP接待': {
    en: 'VIP Transportation',
    ko: 'VIP 송영',
    'zh-CN': 'VIP接送',
    'zh-TW': 'VIP接送'
  },
  '国際会議、ブランドイベント、万博関連送迎など、複数台運行や高い接遇品質が求められる案件にも対応します。': {
    en: 'We also support international conferences, brand events and Expo-related transportation requiring coordinated multi-vehicle operations and high service standards.',
    ko: '국제회의, 브랜드 행사, 엑스포 관련 송영 등 여러 대의 차량 운행과 높은 수준의 고객 응대가 필요한 업무에도 대응합니다.',
    'zh-CN': '亦可承接国际会议、品牌活动及世博会相关接送等需要多车协同与高标准服务礼仪的项目。',
    'zh-TW': '亦可承接國際會議、品牌活動及世博會相關接送等需要多車協同與高標準服務禮儀的專案。'
  },
  '公開できる範囲の主なハイヤー実績。': {
    en: 'Selected chauffeur service experience we can share publicly.',
    ko: '공개 가능한 주요 전용 차량 서비스 실적.',
    'zh-CN': '可公开的主要包车接送服务案例。',
    'zh-TW': '可公開的主要包車接送服務案例。'
  },
  '利用シーンに合わせたハイヤーサービス。': {
    en: 'Chauffeur service tailored to each journey.',
    ko: '이용 목적에 맞춘 전용 차량 서비스.',
    'zh-CN': '根据不同场景提供包车接送服务。',
    'zh-TW': '依不同場景提供包車接送服務。'
  },
  '国際会議関連の関係者送迎に対応し、時間管理、守秘意識、複数車両の運行調整を経験しました。': {
    en: 'We supported stakeholder transportation for an international conference, gaining experience in schedule control, confidentiality and multi-vehicle coordination.',
    ko: '국제회의 관계자 송영을 수행하며 시간 관리, 기밀 유지, 여러 차량의 운행 조정 경험을 쌓았습니다.',
    'zh-CN': '承接国际会议相关人员接送，积累了时间管理、保密意识与多车运营协调经验。',
    'zh-TW': '承接國際會議相關人員接送，累積了時間管理、保密意識與多車營運協調經驗。'
  },
  '駅、ホテル、観光地、ビジネス先への日常移動を支えるタクシーサービスです。見つけやすい車両、乗りやすいシエンタ、グループの運行管理を通じて、毎日の移動を安心できる快適な時間に整えます。': {
    en: 'A taxi service supporting everyday journeys to stations, hotels, sightseeing destinations and business appointments. Recognisable vehicles, easy-access Toyota Sienta models and group-wide operating standards help make each trip comfortable and dependable.',
    ko: '역, 호텔, 관광지, 비즈니스 목적지로의 일상 이동을 지원하는 택시 서비스입니다. 알아보기 쉬운 차량, 승하차가 편리한 Toyota Sienta, 그룹 운행 관리를 통해 편안하고 안심할 수 있는 이동을 제공합니다.',
    'zh-CN': '为前往车站、酒店、观光景点及商务目的地的日常出行提供出租车服务。清晰易识别的车辆、便于上下车的Toyota Sienta以及集团运营管理，共同保障安心舒适的乘车体验。',
    'zh-TW': '為前往車站、飯店、觀光景點及商務目的地的日常移動提供計程車服務。清楚易辨識的車輛、便於上下車的Toyota Sienta以及集團營運管理，共同保障安心舒適的乘車體驗。'
  },
  '商談先、オフィス、会食会場などへの移動にも対応。時間を意識した運行と落ち着いた車内空間で支えます。': {
    en: 'We also support travel to business meetings, offices and dining venues with punctual operation and a calm cabin environment.',
    ko: '상담처, 사무실, 회식 장소 등으로의 이동도 지원하며 시간 관리와 차분한 차내 환경을 중요하게 생각합니다.',
    'zh-CN': '亦可前往洽谈地点、办公室及会餐场所，并通过准时运营与安静舒适的车内环境保障商务出行。',
    'zh-TW': '亦可前往洽談地點、辦公室及會餐場所，並透過準時營運與安靜舒適的車內環境保障商務移動。'
  },
  '緑ナンバー、許認可、運行ルールを遵守し、地域交通を担う事業として運行します。': {
    en: 'We operate as a licensed local transport provider in compliance with commercial registration, permits and operating rules.',
    ko: '영업용 등록, 허가 및 운행 규정을 준수하며 지역 교통을 책임지는 사업자로서 운행합니다.',
    'zh-CN': '遵守营运车辆登记、许可资质与运营规则，以依法合规的方式承担区域交通服务。',
    'zh-TW': '遵守營運車輛登記、許可資質與營運規則，以依法合規的方式承擔區域交通服務。'
  },
  '購入後の車両活用まで相談可能': {
    en: 'Advice on practical vehicle use after purchase',
    ko: '구매 후 차량 활용까지 상담 가능',
    'zh-CN': '购车后车辆使用也可咨询',
    'zh-TW': '購車後車輛使用亦可洽詢'
  },
  '納車後の使いやすさ、維持管理、事業活用まで、運行現場の視点から相談できます。': {
    en: 'We can advise on day-to-day usability, maintenance and business use after vehicle handover from an operator’s perspective.',
    ko: '차량 인도 후의 사용 편의성, 유지관리, 사업 활용까지 실제 운영 관점에서 상담해 드립니다.',
    'zh-CN': '从实际车辆运营角度，就交车后的使用便利性、维护管理及业务用途提供咨询。',
    'zh-TW': '從實際車輛營運角度，就交車後的使用便利性、維護管理及事業用途提供洽詢。'
  },
  '手続き・予約へ': {
    en: 'Proceed to Booking or Application',
    ko: '예약・신청 절차로 진행',
    'zh-CN': '进入预约或申请流程',
    'zh-TW': '進入預約或申請流程'
  },
  '関西で動かせる、': {
    en: 'A dependable operating network',
    ko: '간사이 전역을 움직이는,',
    'zh-CN': '关西地区可灵活调度，',
    'zh-TW': '關西地區可靈活調度，'
  },
  '大阪・京都・堺・港区など関西エリアを中心に、駅、ホテル、空港周辺、観光地、ビジネス先への日常移動を支えるタクシー事業。見つけやすい車両と安定した運行管理で、短距離移動から観光利用まで対応します。': {
    en: 'Toramaru Taxi supports everyday travel to stations, hotels, airport areas, sightseeing destinations and business appointments across Osaka, Kyoto, Sakai, Minato and the wider Kansai region. Recognisable vehicles and consistent operating standards support both short local trips and sightseeing use.',
    ko: 'Toramaru Taxi는 오사카, 교토, 사카이, 미나토구 등 간사이 지역에서 역, 호텔, 공항 주변, 관광지, 비즈니스 목적지로의 일상 이동을 지원합니다. 알아보기 쉬운 차량과 안정적인 운행 관리로 단거리 이동부터 관광 이용까지 대응합니다.',
    'zh-CN': 'Toramaru Taxi以大阪、京都、堺、港区等关西地区为中心，为前往车站、酒店、机场周边、观光景点及商务地点的日常出行提供服务。易于识别的车辆与稳定的运营管理，可满足短途出行及观光用车需求。',
    'zh-TW': 'Toramaru Taxi以大阪、京都、堺、港區等關西地區為中心，為前往車站、飯店、機場周邊、觀光景點及商務地點的日常移動提供服務。易於辨識的車輛與穩定的營運管理，可滿足短程移動及觀光用車需求。'
  },
  '複数拠点・複数台対応': {
    en: 'Multi-location, Multi-vehicle Coordination',
    ko: '복수 거점・복수 차량 대응',
    'zh-CN': '多据点・多车辆协同',
    'zh-TW': '多據點・多車輛協同'
  },
  '一件の送迎を、確実に運行するために。': {
    en: 'For dependable operation on every journey.',
    ko: '한 건의 송영도 정확하게 운행하기 위해.',
    'zh-CN': '确保每一次接送稳定运行。',
    'zh-TW': '確保每一次接送穩定運行。'
  },
  '予約確認、配車設計、当日運行、完了後の共有まで。送迎の前後にある確認作業を重ねることで、一件ずつ確実な運行につなげています。': {
    en: 'From reservation checks and dispatch planning to day-of operation and post-service reporting, repeated checks before and after each journey help us deliver dependable transportation.',
    ko: '예약 확인과 배차 설계부터 당일 운행, 완료 후 공유까지 송영 전후의 확인 절차를 반복해 한 건 한 건 안정적인 운행으로 이어갑니다.',
    'zh-CN': '从预约确认、调度规划、当日运行到完成后的信息共享，我们通过接送前后的逐项确认，确保每一次服务稳定执行。',
    'zh-TW': '從預約確認、派車規劃、當日運行到完成後的資訊共享，我們透過接送前後的逐項確認，確保每一次服務穩定執行。'
  },
  '国際会議関連の関係者送迎に対応。時間管理、待機場所確認、複数車両の運行調整を経験しました。': {
    en: 'We supported transportation for international conference stakeholders, gaining experience in schedule control, waiting-area verification and multi-vehicle coordination.',
    ko: '국제회의 관계자 송영을 수행하며 시간 관리, 대기 장소 확인, 복수 차량 운행 조정 경험을 쌓았습니다.',
    'zh-CN': '承接国际会议相关人员接送，积累了时间管理、等候地点确认及多车辆运营协调经验。',
    'zh-TW': '承接國際會議相關人員接送，累積了時間管理、等候地點確認及多車輛營運協調經驗。'
  },
  'ご相談前にご用意いただくとスムーズな情報': {
    en: 'Information to Prepare Before Contacting Us',
    ko: '상담 전에 준비하시면 좋은 정보',
    'zh-CN': '咨询前建议准备的信息',
    'zh-TW': '洽詢前建議準備的資訊'
  },
  'タクシー相談へ': {
    en: 'Request Taxi Service',
    ko: '택시 이용 상담',
    'zh-CN': '咨询出租车服务',
    'zh-TW': '洽詢計程車服務'
  },
  '法人相談へ': {
    en: 'Corporate Transportation Inquiry',
    ko: '법인 운송 상담',
    'zh-CN': '企业用车咨询',
    'zh-TW': '企業用車洽詢'
  },
  'その他の相談へ': {
    en: 'Other Inquiries',
    ko: '기타 문의',
    'zh-CN': '其他咨询',
    'zh-TW': '其他洽詢'
  },
  '担当者よりご連絡': {
    en: 'A Member of Our Team Will Contact You',
    ko: '담당자 연락',
    'zh-CN': '负责人联系',
    'zh-TW': '負責人聯絡'
  },
  '必要事項を入力いただくと、担当者が内容を確認し、メールまたはお電話でご連絡します。現在フォーム送信の準備中です。お急ぎの場合は電話またはメールでご連絡ください。': {
    en: 'Our online form is currently unavailable. Please contact us by phone or email, and a member of our team will review your inquiry.',
    ko: '현재 온라인 문의 양식을 준비 중입니다. 전화 또는 이메일로 문의해 주시면 담당자가 내용을 확인합니다.',
    'zh-CN': '在线咨询表单目前尚未启用。请通过电话或邮件联系我们，负责人将确认您的咨询内容。',
    'zh-TW': '線上洽詢表單目前尚未啟用。請透過電話或電子郵件聯絡我們，負責人將確認您的洽詢內容。'
  },
  'まずはご希望の内容をお聞かせください。': {
    en: 'Tell Us About Your Requirements',
    ko: '필요하신 내용을 알려 주세요',
    'zh-CN': '请告诉我们您的具体需求',
    'zh-TW': '請告訴我們您的具體需求'
  },
  '空港送迎、企業送迎、団体移動、車両相談まで。まずはご希望の内容をお聞かせください。': {
    en: 'Tell us about your requirements for airport transfers, corporate transportation, group travel or vehicle consultation.',
    ko: '공항 송영, 기업 송영, 단체 이동, 차량 상담 등 필요하신 내용을 알려 주세요.',
    'zh-CN': '无论机场接送、企业接送、团体出行或车辆咨询，请告诉我们您的具体需求。',
    'zh-TW': '無論機場接送、企業接送、團體移動或車輛洽詢，請告訴我們您的具體需求。'
  },
  '大寅グループからのお知らせ、事業情報、公開できる範囲での主な対応実績をご紹介します。': {
    en: 'News, business updates and selected operating experience that Daitora Group can share publicly.',
    ko: 'Daitora Group의 공지, 사업 정보와 공개 가능한 주요 운행 실적을 소개합니다.',
    'zh-CN': '介绍Daitora Group的通知、业务信息及可公开的主要服务实绩。',
    'zh-TW': '介紹Daitora Group的公告、事業資訊及可公開的主要服務實績。'
  },
  'ホテル、会場、空港間の移動': {
    en: 'Transportation between hotels, venues and airports',
    ko: '호텔, 행사장, 공항 간 이동',
    'zh-CN': '酒店、会场与机场之间的接送',
    'zh-TW': '飯店、會場與機場之間的接送'
  },
  'ホテル、会場、観光地など': {
    en: 'Hotel, venue or sightseeing destination',
    ko: '호텔, 행사장, 관광지 등',
    'zh-CN': '酒店、会场、观光景点等',
    'zh-TW': '飯店、會場、觀光景點等'
  },
  '会場、宿泊先、主要訪問先間の移動': {
    en: 'Transportation between the venue, accommodation and key destinations',
    ko: '행사장, 숙소, 주요 방문지 간 이동',
    'zh-CN': '会场、住宿地与主要访问地点之间的接送',
    'zh-TW': '會場、住宿地與主要拜訪地點之間的接送'
  },
  '関係者の会場間移動': {
    en: 'Stakeholder transportation between venues',
    ko: '관계자의 행사장 간 이동',
    'zh-CN': '相关人员的会场间接送',
    'zh-TW': '相關人員的會場間接送'
  },
  '関係者移動における車両手配、時間管理、会場間移動に対応しました。移動予定の確認と当日の連絡体制を整え、関係者のスムーズな移動を支援しました。': {
    en: 'We coordinated vehicles, schedules and travel between venues for event stakeholders. Advance itinerary checks and a day-of communication plan supported smooth transportation.',
    ko: '관계자 이동을 위한 차량 배정, 시간 관리, 행사장 간 이동에 대응했습니다. 이동 일정을 사전에 확인하고 당일 연락 체계를 갖춰 원활한 이동을 지원했습니다.',
    'zh-CN': '我们为相关人员安排车辆、管理时间并承接会场间接送，通过事先确认行程及建立当日联络机制，保障人员顺畅移动。',
    'zh-TW': '我們為相關人員安排車輛、管理時間並承接會場間接送，透過事先確認行程及建立當日聯絡機制，保障人員順暢移動。'
  },
  '整備された車両環境': {
    en: 'Well-maintained Vehicles',
    ko: '정비・관리된 차량 환경',
    'zh-CN': '规范维护的车辆环境',
    'zh-TW': '妥善維護的車輛環境'
  },
  '安全・謙遜・迅敏': {
    en: 'Safety, Humility and Agility',
    ko: '안전・겸손・신속',
    'zh-CN': '安全・谦逊・迅敏',
    'zh-TW': '安全・謙遜・迅敏'
  },
  '安全・謙遜・迅敏。': {
    en: 'Safety, Humility and Agility.',
    ko: '안전・겸손・신속.',
    'zh-CN': '安全・谦逊・迅敏。',
    'zh-TW': '安全・謙遜・迅敏。'
  },
  '迅敏 / Agility': {
    en: 'Agility',
    ko: '신속 / Agility',
    'zh-CN': '迅敏 / Agility',
    'zh-TW': '迅敏 / Agility'
  },
  '私たちは、社訓である「安全・謙遜・迅敏」を大切にしております。': {
    en: 'We value our company principles of Safety, Humility and Agility.',
    ko: '저희는 사훈인 「안전・겸손・신속」을 소중히 합니다.',
    'zh-CN': '我们重视“安全・谦逊・迅敏”的企业准则。',
    'zh-TW': '我們重視「安全・謙遜・迅敏」的企業準則。'
  },
  '安全をすべての判断基準とし、謙虚な姿勢でお客様と向き合い、迅敏な対応力で期待を超えるサービスを提供すること。': {
    en: 'Safety guides every decision, humility shapes how we serve customers, and prompt, accurate action helps us exceed expectations.',
    ko: '안전을 모든 판단 기준으로 삼고 겸손한 자세로 고객을 대하며 신속한 대응으로 기대를 뛰어넘는 서비스를 제공합니다.',
    'zh-CN': '以安全作为所有判断标准，以谦逊态度面对客户，并以迅速准确的应对提供超越期待的服务。',
    'zh-TW': '以安全作為所有判斷標準，以謙遜態度面對客戶，並以迅速準確的應對提供超越期待的服務。'
  },
  '安全を判断基準に、謙虚にお客様と向き合い、迅敏な対応力で期待を超えるサービスを提供します。': {
    en: 'We place safety at the centre of every decision, serve customers with humility and respond promptly and accurately.',
    ko: '안전을 판단 기준으로 삼고 겸손하게 고객을 대하며 신속한 대응으로 기대에 부응합니다.',
    'zh-CN': '以安全作为判断标准，以谦逊态度面对客户，并通过迅速准确的应对超越期待。',
    'zh-TW': '以安全作為判斷標準，以謙遜態度面對客戶，並透過迅速準確的應對超越期待。'
  },
  'オンラインフォームは現在ご利用いただけません。お電話またはメールでお問い合わせください。': {
    en: 'The online form is currently unavailable. Please contact us by phone or email.',
    ko: '현재 온라인 문의 양식을 이용할 수 없습니다. 전화 또는 이메일로 문의해 주세요.',
    'zh-CN': '在线表单目前不可用，请通过电话或电子邮件联系我们。',
    'zh-TW': '線上表單目前無法使用，請以電話或電子郵件聯絡我們。'
  },
  '大阪で開催された国際会議関連送迎に対応。要人・関係者の移動に求められる時間管理、守秘意識、現場判断を経験しました。': {
    en: 'We provided transportation for an international conference held in Osaka, gaining experience in the schedule control, confidentiality and on-site judgement required for VIP and delegate travel.',
    ko: '오사카에서 열린 국제회의 관련 송영을 수행하며 주요 인사와 관계자 이동에 필요한 시간 관리, 보안 유지 및 현장 대응 경험을 축적했습니다.',
    'zh-CN': '我们曾为在大阪举办的国际会议提供接送服务，并积累了 VIP 及相关人员出行所需的时间管理、保密管理与现场应变经验。',
    'zh-TW': '我們曾為在大阪舉辦的國際會議提供接送服務，並累積了 VIP 及相關人員移動所需的時間管理、保密管理與現場應變經驗。'
  },
  '団体送迎 / 企業視察 / 複数名移動': {
    en: 'Group Transportation / Corporate Visits / Multi-Passenger Travel',
    ko: '단체 송영 / 기업 시찰 / 다인 이동',
    'zh-CN': '团体接送 / 企业考察 / 多人出行',
    'zh-TW': '團體接送 / 企業考察 / 多人移動'
  },
  '教育システム': {
    en: 'Training Programme',
    ko: '교육 체계',
    'zh-CN': '培训体系',
    'zh-TW': '培訓體系'
  },
  'お名前': {
    en: 'Name'
  },
  '会社名・団体名': {
    en: 'Company / Organisation'
  },
  '中古車販売・ローン相談': {
    en: 'Used Car Sales / Loan Consultation'
  },
  '法人・旅行会社・ホテル様': {
    en: 'Corporate / Travel Agency / Hotel Enquiries'
  },
  '希望言語': {
    en: 'Preferred Language'
  },
  'ご利用日': {
    en: 'Service Date'
  },
  'ご利用時間': {
    en: 'Pickup Time'
  },
  '出発地': {
    en: 'Pickup Location'
  },
  '目的地': {
    en: 'Destination'
  },
  '航空便名': {
    en: 'Flight Number',
    'zh-CN': '航班号',
    'zh-TW': '航班號碼'
  },
  '人数': {
    en: 'Number of Passengers'
  },
  '手荷物数': {
    en: 'Number of Luggage Items'
  },
  '希望車種': {
    en: 'Preferred Vehicle',
    'zh-CN': '希望车型',
    'zh-TW': '希望車型'
  },
  '未定': {
    en: 'To be discussed',
    'zh-CN': '待沟通',
    'zh-TW': '待討論'
  },
  '用途に合わせて相談': {
    en: 'Discuss Based on Requirements',
    ko: '용도에 맞춰 상담',
    'zh-CN': '根据用途沟通',
    'zh-TW': '依用途討論'
  },
  '用途': {
    en: 'Service Type',
    'zh-CN': '服务用途',
    'zh-TW': '服務用途'
  },
  '空港送迎': {
    en: 'Airport Transfer',
    ko: '공항 송영'
  },
  '観光貸切': {
    en: 'Private Sightseeing Charter',
    'zh-CN': '观光包车',
    'zh-TW': '觀光包車'
  },
  '企業送迎': {
    en: 'Corporate Transportation',
    ko: '기업 송영',
    'zh-CN': '企业接送',
    'zh-TW': '企業接送'
  },
  'VIP接待': {
    en: 'VIP Transportation'
  },
  '大型案件・複数台運行': {
    en: 'Large-Scale / Multi-Vehicle Transportation',
    ko: '대형 프로젝트·복수 차량 운행',
    'zh-CN': '大型项目 / 多车协同',
    'zh-TW': '大型專案 / 多車協同'
  },
  '送迎に関する備考': {
    en: 'Transportation Notes',
    ko: '송영 관련 요청사항',
    'zh-CN': '接送备注',
    'zh-TW': '接送備註'
  },
  '行程、待ち合わせ場所、車両台数、配慮事項など': {
    en: 'Itinerary, meeting point, number of vehicles and any special requirements'
  },
  '利用予定エリア': {
    en: 'Service Area'
  },
  '利用予定日時': {
    en: 'Preferred Date and Time',
    'zh-CN': '预计使用日期与时间',
    'zh-TW': '預計使用日期與時間'
  },
  '乗車地': {
    en: 'Pickup Location'
  },
  'タクシー利用に関する備考': {
    en: 'Taxi Service Notes',
    'zh-CN': '出租车使用备注',
    'zh-TW': '計程車使用備註'
  },
  '荷物、人数、ホテル・法人利用、その他確認事項': {
    en: 'Luggage, passenger count, hotel or corporate use, and other requirements'
  },
  '利用目的': {
    en: 'Intended Use'
  },
  '個人利用': {
    en: 'Personal Use'
  },
  '家族利用': {
    en: 'Family Use'
  },
  '法人利用': {
    en: 'Corporate Use'
  },
  '送迎用': {
    en: 'Passenger Transportation',
    ko: '송영용',
    'zh-CN': '接送用车',
    'zh-TW': '接送用車'
  },
  'タクシー関連': {
    en: 'Taxi Operations'
  },
  '申込区分': {
    en: 'Applicant Type'
  },
  '個人': {
    en: 'Individual'
  },
  '法人': {
    en: 'Corporation'
  },
  '個人事業主': {
    en: 'Sole Proprietor',
    ko: '개인사업자',
    'zh-CN': '个体经营者',
    'zh-TW': '個人事業主'
  },
  '在日外国人のお客様': {
    en: 'Foreign Residents in Japan'
  },
  'ローン相談': {
    en: 'Loan Consultation'
  },
  '希望する': {
    en: 'Interested',
    ko: '상담 희망',
    'zh-CN': '需要咨询',
    'zh-TW': '需要諮詢'
  },
  '検討中': {
    en: 'Considering',
    'zh-CN': '考虑中',
    'zh-TW': '考慮中'
  },
  '希望しない': {
    en: 'Not required',
    ko: '필요 없음',
    'zh-CN': '暂不需要',
    'zh-TW': '暫不需要'
  },
  '車両購入に関する備考': {
    en: 'Vehicle Purchase Notes',
    'zh-CN': '购车备注',
    'zh-TW': '購車備註'
  },
  '購入希望時期、現在の状況、必要書類の確認など': {
    en: 'Preferred purchase timing, current situation, and questions about required documents'
  },
  '希望職種': {
    en: 'Preferred Position'
  },
  '勤務希望エリア': {
    en: 'Preferred Work Area',
    'zh-CN': '希望工作地区',
    'zh-TW': '希望工作地區'
  },
  '運転・接客経験': {
    en: 'Driving / Customer Service Experience',
    'zh-CN': '驾驶 / 接待经验',
    'zh-TW': '駕駛 / 接待經驗'
  },
  '連絡可能時間': {
    en: 'Preferred Contact Time'
  },
  '採用に関する備考': {
    en: 'Application Notes',
    'zh-CN': '应聘备注',
    'zh-TW': '應徵備註'
  },
  'その他のお問い合わせ': {
    en: 'Other Enquiries',
    'zh-CN': '其他咨询',
    'zh-TW': '其他諮詢'
  },
  'お問い合わせ件名': {
    en: 'Enquiry Subject',
    'zh-CN': '咨询主题',
    'zh-TW': '諮詢主旨'
  },
  '会社情報、取材、パートナー相談など': {
    en: 'Company information, media enquiries, partnership enquiries, etc.'
  },
  'お問い合わせ内容': {
    en: 'Enquiry Details',
    'zh-CN': '咨询详情',
    'zh-TW': '諮詢內容'
  },
  '選択してください': {
    en: 'Please select'
  },
  '採用・乗務員応募': {
    ko: '운전기사 채용·지원'
  },
  '迅速な見積もり': {
    en: 'Quick Quote'
  },
  '柔軟な手配': {
    en: 'Flexible Arrangements'
  },
  '専門ドライバー': {
    en: 'Professional Driver'
  },
  '時間に正確な運行': {
    en: 'Punctual Service'
  },
  '日時、人数、荷物、行程を確認し、利用目的に合ったプランをご案内します。': {
    en: 'We confirm the date, time, passenger count, luggage and itinerary before recommending a plan suited to your requirements.'
  },
  '単発送迎、時間貸切、複数日運行、複数台運行など、行程に合わせて調整します。': {
    en: 'We adapt arrangements to the itinerary, including point-to-point transfers, hourly charters, multi-day services and multi-vehicle operations.'
  },
  'メールで送る': {
    en: 'Send by Email',
    'zh-CN': '发送邮件',
    'zh-TW': '寄送電子郵件'
  },
  'プライバシーポリシーを確認し、担当者から連絡を受けることに同意します。': {
    en: 'I have read the Privacy Policy and agree to be contacted by a representative.',
    ko: '개인정보 처리방침을 확인했으며, 담당자의 연락에 동의합니다.',
    'zh-CN': '我已阅读《隐私政策》，并同意由负责人联系我。',
    'zh-TW': '我已閱讀《隱私權政策》，並同意由負責人與我聯絡。'
  }
});

Object.assign(overrides, {
  '関西の旅を、もっと分かりやすく。': {
    'zh-CN': '更轻松地了解关西旅行。',
    en: 'Discover Kansai with local insight.',
    ko: '간사이 여행을 더 알기 쉽게.',
    'zh-TW': '更輕鬆地認識關西旅行。'
  },
  'Japan Travelは、株式会社大寅／Daitora Groupが運営する訪日旅行情報サイトです。大阪・京都を中心に、観光情報、多言語音声ガイド、移動や旅行サービスの入口をご案内しています。': {
    'zh-CN': 'Japan Travel 是由株式会社大寅／Daitora Group 运营的访日旅行信息平台，提供以大阪、京都为中心的景点介绍、多语言语音导览以及旅行服务入口。',
    en: 'Japan Travel is a multilingual visitor information platform operated by Daitora Group, featuring destination guides, audio content and travel service access across Osaka, Kyoto and the wider Kansai region.',
    ko: 'Japan Travel은 주식회사 Daitora／Daitora Group이 운영하는 방일 여행 정보 플랫폼입니다. 오사카와 교토를 중심으로 관광 정보, 다국어 음성 안내와 여행 서비스 정보를 제공합니다.',
    'zh-TW': 'Japan Travel 是由株式會社大寅／Daitora Group 營運的訪日旅行資訊平台，提供以大阪、京都為中心的景點介紹、多語言語音導覽及旅行服務入口。'
  },
  'Japan Travelを見る': {
    'zh-CN': '访问 Japan Travel',
    en: 'Visit Japan Travel',
    ko: 'Japan Travel 둘러보기',
    'zh-TW': '前往 Japan Travel'
  },
  '奈良・春日大社の釣燈籠': {
    'zh-CN': '奈良春日大社的吊灯笼',
    en: 'Hanging lanterns at Kasuga Taisha in Nara',
    ko: '나라 가스가타이샤의 등롱',
    'zh-TW': '奈良春日大社的吊燈籠'
  },
  '必要事項を入力いただくと、担当者が内容を確認し、メールまたはお電話でご連絡します。送信できない場合は、電話またはメールでお問い合わせください。': {
    'zh-CN': '填写必要信息后，负责人将确认内容并通过邮件或电话与您联系。如无法发送，请直接通过电话或邮件联系我们。',
    en: 'Complete the required fields and our team will review your enquiry and respond by email or phone. If the form cannot be sent, please contact us directly by phone or email.',
    ko: '필수 정보를 입력하면 담당자가 내용을 확인한 후 이메일 또는 전화로 연락드립니다. 전송할 수 없는 경우 전화 또는 이메일로 문의해 주세요.',
    'zh-TW': '填寫必要資訊後，負責人將確認內容並透過電子郵件或電話與您聯絡。如無法送出，請直接以電話或電子郵件聯絡我們。'
  },
  'ウェブサイト': {
    'zh-CN': '网站',
    en: 'Website',
    ko: '웹사이트',
    'zh-TW': '網站'
  }
});

for (const [source, translations] of Object.entries(overrides)) {
  content[source] = { ...(content[source] || {}), ...translations };
}

// Keep the structured catalogue aligned with final UI, brand and fact locks.
// The build itself fails if a lower-priority value later drifts from a lock.
for (const { source, translations } of finalLockEntries()) {
  content[source] = { ...(content[source] || {}), ...translations };
}

// The extracted source key for this option can vary with legacy encoding, so
// identify it by its stable English meaning and correct the language names.
for (const translations of Object.values(content)) {
  if (translations?.en === 'Japanese') {
    Object.assign(translations, {
      ko: '일본어',
      'zh-CN': '日语',
      'zh-TW': '日語'
    });
  }
  if (translations?.en === 'Chinese') {
    Object.assign(translations, {
      ko: '중국어',
      'zh-CN': '中文',
      'zh-TW': '中文'
    });
  }
  if (translations?.en === 'Transfer details') {
    Object.assign(translations, {
      en: 'Transportation Details',
      ko: '송영 내용',
      'zh-CN': '接送详情',
      'zh-TW': '接送詳情'
    });
  }
}

fs.writeFileSync(contentPath, `${JSON.stringify(content, null, 2)}\n`, 'utf8');
console.log(`Applied ${Object.keys(overrides).length} human-edited translation overrides.`);
