import fs from 'node:fs';
import path from 'node:path';

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

for (const [source, translations] of Object.entries(overrides)) {
  content[source] = { ...(content[source] || {}), ...translations };
}

fs.writeFileSync(contentPath, `${JSON.stringify(content, null, 2)}\n`, 'utf8');
console.log(`Applied ${Object.keys(overrides).length} human-edited translation overrides.`);
