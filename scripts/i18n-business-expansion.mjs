const t = (ja, zhCN, en, ko, zhTW) => ({ ja, 'zh-CN': zhCN, en, ko, 'zh-TW': zhTW });

export const EXPANSION_BRAND_LOCKS = {
  '医療ツーリズム事業': t('医療ツーリズム事業', '医疗旅游服务', 'Medical Tourism Support', '의료 관광 지원', '醫療旅遊服務'),
  'デジタルマーケティング・プロモーション支援事業': t('デジタルマーケティング・プロモーション支援事業', '数字营销与推广支持', 'Digital Marketing & Promotion Support', '디지털 마케팅·프로모션 지원', '數位行銷與推廣支援')
};

const about = {
  '企業理念、社訓、会社概要、許認可、拠点情報を通じて、': t('企業理念、社訓、会社概要、許認可、拠点情報を通じて、', '通过企业理念、运营准则、公司概要、许可资质及营业据点，', 'Through our philosophy, operating principles, company profile, licences and office network,', '기업 이념, 운영 원칙, 회사 개요, 인허가 및 거점 정보를 통해', '透過企業理念、營運準則、公司概要、許可資質及營業據點，'),
  '大寅グループの考え方と事業基盤をご紹介します。': t('大寅グループの考え方と事業基盤をご紹介します。', '了解Daitora Group的理念与业务基础。', 'learn about Daitora Group’s values and business foundation.', 'Daitora Group의 가치와 사업 기반을 소개합니다.', '了解Daitora Group的理念與事業基礎。'),
  '安心を基盤に、': t('安心を基盤に、', '以安心为基础，', 'Building new possibilities', '안심을 기반으로', '以安心為基礎，'),
  '事業の可能性を広げる。': t('事業の可能性を広げる。', '拓展业务的可能性。', 'on a foundation of assurance.', '사업의 가능성을 넓힙니다.', '拓展事業的可能性。'),
  '株式会社大寅は、2018年3月の設立以来、大阪を拠点に「安全・謙遜・迅敏」を社訓として掲げ、お客様一人ひとりに寄り添う、安心・安全なサービスの提供に努めてまいりました。': t(
    '株式会社大寅は、2018年3月の設立以来、大阪を拠点に「安全・謙遜・迅敏」を社訓として掲げ、お客様一人ひとりに寄り添う、安心・安全なサービスの提供に努めてまいりました。',
    'Daitora Co., Ltd.自2018年3月成立以来，以大阪为据点，将“安全、谦逊、迅敏”作为企业准则，始终致力于为每一位客户提供安心、安全的服务。',
    'Since its establishment in Osaka in March 2018, Daitora Co., Ltd. has upheld “Safety, Humility and Agility” as its guiding principles and has worked to provide safe, reassuring service tailored to each customer.',
    'Daitora Co., Ltd.는 2018년 3월 오사카에서 설립된 이래 ‘안전·겸손·민첩’을 운영 원칙으로 삼고, 고객 한 분 한 분에게 세심하게 다가가는 안심할 수 있는 안전한 서비스를 제공해 왔습니다.',
    'Daitora Co., Ltd.自2018年3月在大阪成立以來，秉持「安全、謙遜、迅敏」的企業準則，致力為每一位顧客提供安心且安全的服務。'
  ),
  '現在は、訪日外国人のお客様を中心としたハイヤー・貸切送迎サービスを主力事業として、大阪・京都を中心に高品質な輸送サービスを提供しています。また、インバウンド向けの医療ツーリズム事業では、人間ドックや先進医療に関する受診支援をはじめ、多言語対応や医療機関との連携を通じて、訪日外国人のお客様の安心で円滑な滞在を支援しています。': t(
    '現在は、訪日外国人のお客様を中心としたハイヤー・貸切送迎サービスを主力事業として、大阪・京都を中心に高品質な輸送サービスを提供しています。また、インバウンド向けの医療ツーリズム事業では、人間ドックや先進医療に関する受診支援をはじめ、多言語対応や医療機関との連携を通じて、訪日外国人のお客様の安心で円滑な滞在を支援しています。',
    '目前，我们以面向访日旅客的包车及私人接送为核心业务，在大阪、京都提供高品质交通服务。同时，在面向入境旅客的医疗旅游服务中，我们提供健康检查及先进医疗相关就诊支持，并通过多语言沟通、医疗机构日程协调及交通安排，协助访日旅客安心、顺利地完成在日行程。',
    'Today, chauffeur and private transportation for international visitors is our core business, with high-quality services centred on Osaka and Kyoto. Our inbound medical tourism support covers arrangements for health screenings and advanced medical consultations, multilingual communication, scheduling with medical providers and transportation, helping visitors navigate their stay in Japan with confidence.',
    '현재는 방일 외국인 고객을 위한 전용 차량 및 대절 송영 서비스를 핵심 사업으로 운영하며, 오사카와 교토를 중심으로 수준 높은 이동 서비스를 제공합니다. 인바운드 의료 관광 지원에서는 건강검진과 첨단의료 관련 진료 지원, 다국어 안내, 의료기관 일정 조정과 이동 지원을 통해 고객이 일본 체류 일정을 안심하고 원활하게 진행할 수 있도록 돕습니다.',
    '目前以服務訪日旅客的包車及私人接送為核心事業，在大阪、京都提供高品質交通服務。同時，面向入境旅客的醫療旅遊服務提供健康檢查及先進醫療相關就診支援，並透過多語言溝通、醫療機構日程協調與交通安排，協助訪日旅客安心且順利地完成在日行程。'
  ),
  'さらに、SNSやデジタルコンテンツを活用したデジタルマーケティング・プロモーション支援、中古車販売などへ事業領域を広げ、多角的な事業基盤を構築しています。': t(
    'さらに、SNSやデジタルコンテンツを活用したデジタルマーケティング・プロモーション支援、中古車販売などへ事業領域を広げ、多角的な事業基盤を構築しています。',
    '此外，我们还拓展至利用社交媒体和数字内容开展的数字营销与推广支持，以及二手车销售等领域，构建多元化的业务基础。',
    'We have also expanded into digital marketing and promotion support using social media and digital content, as well as used car sales, creating a diversified business foundation.',
    '또한 SNS와 디지털 콘텐츠를 활용한 디지털 마케팅·프로모션 지원과 중고차 판매로 사업 영역을 넓혀 다각적인 사업 기반을 구축하고 있습니다.',
    '此外，我們亦拓展至運用社群媒體與數位內容的數位行銷及推廣支援，以及中古車銷售等領域，建立多元化的事業基礎。'
  ),
  'DAITORA 社訓': t('DAITORA 社訓', 'DAITORA 企业准则', 'THE DAITORA STANDARD', 'DAITORA 운영 원칙', 'DAITORA 企業準則'),
  '安全・謙遜・迅敏': t('安全・謙遜・迅敏', '安全・谦逊・迅敏', 'Safety, Humility and Agility', '안전·겸손·민첩', '安全・謙遜・迅敏'),
  '安全とは、命を預かる責任を忘れないことである。': t('安全とは、命を預かる責任を忘れないことである。', '安全，就是时刻铭记我们肩负着守护生命的责任。', 'Safety means never forgetting our responsibility for every life entrusted to us.', '안전이란 생명을 맡고 있다는 책임을 잊지 않는 것입니다.', '安全，就是時刻銘記我們肩負著守護生命的責任。'),
  '謙遜とは、すべての人に敬意を持って接する姿勢である。': t('謙遜とは、すべての人に敬意を持って接する姿勢である。', '谦逊，就是以尊重之心对待每一个人。', 'Humility means treating every person with respect.', '겸손이란 모든 사람을 존중하는 자세입니다.', '謙遜，就是以尊重之心對待每一個人。'),
  '迅敏とは、状況を見て、自分の頭で考え、最も適切な行動を選ぶ力である。': t('迅敏とは、状況を見て、自分の頭で考え、最も適切な行動を選ぶ力である。', '迅敏，就是观察情况、独立思考，并选择最恰当行动的能力。', 'Agility is the ability to assess the situation, think independently and choose the most appropriate action.', '민첩이란 상황을 살피고 스스로 생각해 가장 적절한 행동을 선택하는 힘입니다.', '迅敏，就是觀察情況、獨立思考，並選擇最恰當行動的能力。'),
  'グループ年商': t('グループ年商', '集团年营业额', 'Group annual sales', '그룹 연간 매출', '集團年營業額'),
  '統計年度：確認中': t('統計年度：確認中', '统计年度：待确认', 'Reporting year: to be confirmed', '집계 연도: 확인 중', '統計年度：待確認'),
  'グループ全体で': t('グループ全体で', '集团整体', 'Across the group', '그룹 전체', '集團整體'),
  '約100台規模': t('約100台規模', '约100台规模', 'Approximately 100 vehicles', '약 100대 규모', '約100台規模'),
  'グループ全体で約100台規模': t('グループ全体で約100台規模', '集团整体约100台规模', 'Approximately 100 vehicles across the group', '그룹 전체 약 100대 규모', '集團整體約100台規模'),
  '関西複数拠点': t('関西複数拠点', '关西多据点', 'Multiple Kansai bases', '간사이 복수 거점', '關西多據點'),
  '大阪・京都・堺': t('大阪・京都・堺', '大阪・京都・堺', 'Osaka / Kyoto / Sakai', '오사카・교토・사카이', '大阪・京都・堺'),
  '関西複数拠点の運行体制': t('関西複数拠点の運行体制', '关西多据点运营体系', 'A Coordinated Network Across Kansai', '간사이 복수 거점 운행 체계', '關西多據點營運體系'),
  '大寅グループは、大阪本社を中心に、京都、堺など関西複数拠点で運行体制を整えています。': t('大寅グループは、大阪本社を中心に、京都、堺など関西複数拠点で運行体制を整えています。', 'Daitora Group以大阪总部为中心，在京都、堺等关西多个据点建立运营体系。', 'Centred on our Osaka head office, Daitora Group operates through multiple Kansai bases including Kyoto and Sakai.', 'Daitora Group은 오사카 본사를 중심으로 교토와 사카이 등 간사이 여러 거점에서 운행 체계를 운영합니다.', 'Daitora Group以大阪總部為中心，在京都、堺等關西多個據點建立營運體系。'),
  '空港送迎、京都発着の観光貸切、企業送迎、大型案件における複数台運行まで、拠点ごとの連携により柔軟な配車を行います。': t('空港送迎、京都発着の観光貸切、企業送迎、大型案件における複数台運行まで、拠点ごとの連携により柔軟な配車を行います。', '从机场接送、京都出发的观光包车、企业接送，到大型项目的多车协同运营，各据点联动提供灵活调度。', 'Our bases coordinate flexible dispatch for airport transfers, Kyoto-based private tours, corporate transportation and multi-vehicle operations for large assignments.', '공항 송영, 교토 출발 관광 전세, 기업 송영부터 대형 프로젝트의 복수 차량 운행까지 거점 간 연계로 유연하게 배차합니다.', '從機場接送、京都出發的觀光包車、企業接送，到大型案件的多車協同營運，各據點聯動提供彈性派車。'),
  '関西南部エリアの運行・車両連携拠点': t('関西南部エリアの運行・車両連携拠点', '关西南部地区的运营与车辆协同据点', 'Operations and fleet coordination for southern Kansai', '간사이 남부 지역 운행 및 차량 연계 거점', '關西南部地區的營運與車輛協同據點'),
  '大阪本社 / 京都営業所 / 堺エリア': t('大阪本社 / 京都営業所 / 堺エリア', '大阪总部 / 京都营业所 / 堺地区', 'Osaka Head Office / Kyoto Office / Sakai Area', '오사카 본사 / 교토 영업소 / 사카이 지역', '大阪總部 / 京都營業所 / 堺地區'),
  'ハイヤー事業 / タクシー事業 / 中古車販売事業 / 旅行関連サービス / 医療ツーリズム事業 / デジタルマーケティング・プロモーション支援事業': t('ハイヤー事業 / タクシー事業 / 中古車販売事業 / 旅行関連サービス / 医療ツーリズム事業 / デジタルマーケティング・プロモーション支援事業', '包车及私人接送 / 出租车 / 二手车销售 / 旅行相关服务 / 医疗旅游服务 / 数字营销与推广支持', 'Chauffeur and private transportation / Taxi / Used car sales / Travel-related services / Medical tourism support / Digital marketing and promotion support', '전용 차량 및 대절 송영 / 택시 / 중고차 판매 / 여행 관련 서비스 / 의료 관광 지원 / 디지털 마케팅·프로모션 지원', '包車及私人接送 / 計程車 / 中古車銷售 / 旅行相關服務 / 醫療旅遊服務 / 數位行銷與推廣支援'),
  '英文社名': t('英文社名', '英文公司名称', 'English Company Name', '영문 회사명', '英文公司名稱'),
  '所在地': t('所在地', '所在地', 'Address', '소재지', '所在地'),
  '営業拠点': t('営業拠点', '营业网点', 'Operating Locations', '영업 거점', '營業據點'),
  '設立': t('設立', '成立日期', 'Established', '설립', '成立日期'),
  '代表者': t('代表者', '代表人', 'Representative Director', '대표이사', '代表人'),
  '年商': t('年商', '集团年营业额', 'Group Annual Revenue', '그룹 연매출', '集團年營業額'),
  '資本金': t('資本金', '注册资本', 'Capital', '자본금', '資本額'),
  '事業内容': t('事業内容', '业务内容', 'Business Activities', '사업 내용', '事業內容'),
  '車両ネットワーク': t('車両ネットワーク', '车辆网络', 'Vehicle Network', '차량 네트워크', '車輛網絡'),
  '許認可': t('許認可', '许可资质', 'Licences and Registrations', '허가·등록', '許可資質'),
  '連絡先': t('連絡先', '联系方式', 'Contact Information', '연락처', '聯絡資訊'),
  '営業時間': t('営業時間', '营业时间', 'Business Hours', '영업시간', '營業時間'),
  '2018年3月8日': t('2018年3月8日', '2018年3月8日', '2018年3月8日', '2018年3月8日', '2018年3月8日'),
  '代表取締役 大野 創世': t('代表取締役 大野 創世', '代表取締役 大野 創世', '代表取締役 大野 創世', '代表取締役 大野 創世', '代表取締役 大野 創世'),
  '17.8億円': t('17.8億円', '17.8億円', '17.8億円', '17.8億円', '17.8億円'),
  '（統計年度：確認中）': t('（統計年度：確認中）', '（统计年度：待确认）', '(Reporting year: to be confirmed)', '(집계 연도: 확인 중)', '（統計年度：待確認）'),
  '1,000万円': t('1,000万円', '1,000万円', '1,000万円', '1,000万円', '1,000万円'),
  '一般乗用旅客自動車運送事業 近運自ニ第990号': t('一般乗用旅客自動車運送事業 近運自ニ第990号', '一般乘用旅客汽车运输业务｜近運自ニ第990号', 'General passenger vehicle transportation business — 近運自ニ第990号', '일반 승용 여객 자동차 운송 사업 — 近運自ニ第990号', '一般乘用旅客汽車運輸業務｜近運自ニ第990号'),
  '一般貸切旅客自動車運送事業 近運自一第737号': t('一般貸切旅客自動車運送事業 近運自一第737号', '一般包车旅客汽车运输业务｜近運自一第737号', 'General charter passenger transportation business — 近運自一第737号', '일반 전세 여객 자동차 운송 사업 — 近運自一第737号', '一般包車旅客汽車運輸業務｜近運自一第737号'),
  '旅行手配・観光サービス 第7068号': t('旅行手配・観光サービス 第7068号', '旅行安排及观光服务｜第7068号', 'Travel arrangement and tourism services — 第7068号', '여행 수배·관광 서비스 — 第7068号', '旅行安排及觀光服務｜第7068号'),
  '古物商許可証 第321090181755号': t('古物商許可証 第321090181755号', '古物商許可証 第321090181755号', '古物商許可証 第321090181755号', '古物商許可証 第321090181755号', '古物商許可証 第321090181755号'),
  '10:00-17:00 [ 土・日・祝日除く ]': t('10:00-17:00 [ 土・日・祝日除く ]', '10:00–17:00（周六、周日及法定节假日除外）', '10:00–17:00 (closed Saturdays, Sundays and public holidays)', '10:00–17:00 (토·일요일 및 공휴일 제외)', '10:00–17:00（週六、週日及國定假日除外）')
};

const businessOverview = {
  '関西の移動と車両活用を支える主要事業と、訪日滞在・情報発信を支援する成長事業をご紹介します。': t('関西の移動と車両活用を支える主要事業と、訪日滞在・情報発信を支援する成長事業をご紹介します。', '介绍支撑关西交通与车辆使用的核心业务，以及服务访日行程与信息传播的成长支持业务。', 'Explore our core mobility and vehicle businesses in Kansai, together with growth services supporting international stays and digital communication.', '간사이의 이동과 차량 활용을 지원하는 핵심 사업과 방일 체류 및 정보 발신을 돕는 성장·지원 사업을 소개합니다.', '介紹支撐關西交通與車輛運用的核心事業，以及服務訪日行程與資訊傳播的成長支援事業。'),
  '関西の移動と車両活用を支える、三つの主要事業。': t('関西の移動と車両活用を支える、三つの主要事業。', '三项核心业务，支撑关西交通与车辆使用。', 'Three core businesses supporting mobility and vehicle use in Kansai.', '간사이의 이동과 차량 활용을 지원하는 세 가지 핵심 사업.', '三項核心事業，支撐關西交通與車輛運用。'),
  '大阪・京都・堺を軸とする運行体制と、グループ全体で約100台規模の車両ネットワークを活用し、空港送迎、観光貸切、企業送迎、地域交通、中古車販売まで一体で支えています。': t('大阪・京都・堺を軸とする運行体制と、グループ全体で約100台規模の車両ネットワークを活用し、空港送迎、観光貸切、企業送迎、地域交通、中古車販売まで一体で支えています。', '依托大阪、京都、堺的运营体系和集团约100台规模的车辆网络，为机场接送、观光包车、企业接送、地区交通及二手车销售提供一体化支持。', 'Using an operating network centred on Osaka, Kyoto and Sakai and approximately 100 vehicles across the group, we support airport transfers, private tours, corporate transportation, local mobility and used car sales.', '오사카·교토·사카이를 축으로 한 운행 체계와 그룹 전체 약 100대 규모의 차량 네트워크를 활용해 공항 송영, 관광 전세, 기업 송영, 지역 교통과 중고차 판매를 통합적으로 지원합니다.', '依託大阪、京都、堺的營運體系和集團約100台規模的車輛網絡，為機場接送、觀光包車、企業接送、地區交通及中古車銷售提供一體化支援。'),
  '訪日滞在と情報発信を支える、成長・支援事業。': t('訪日滞在と情報発信を支える、成長・支援事業。', '服务访日行程与信息传播的成长支持业务。', 'Growth services supporting international stays and digital communication.', '방일 체류와 정보 발신을 지원하는 성장·지원 사업.', '服務訪日行程與資訊傳播的成長支援事業。'),
  '移動サービスで培った訪日対応、多言語コミュニケーション、現場調整の経験を活かし、医療受診を伴う滞在支援とデジタルプロモーションを展開しています。': t('移動サービスで培った訪日対応、多言語コミュニケーション、現場調整の経験を活かし、医療受診を伴う滞在支援とデジタルプロモーションを展開しています。', '运用在交通服务中积累的访日接待、多语言沟通和现场协调经验，开展医疗就诊相关行程支持与数字推广服务。', 'Drawing on our experience with international visitors, multilingual communication and on-site coordination, we provide medical-visit travel support and digital promotion services.', '이동 서비스에서 쌓은 방일 고객 대응, 다국어 커뮤니케이션, 현장 조정 경험을 바탕으로 의료 진료 관련 체류 지원과 디지털 프로모션을 제공합니다.', '運用在交通服務中累積的訪日接待、多語言溝通及現場協調經驗，開展醫療就診相關行程支援與數位推廣服務。'),
  '人間ドックや先進医療に関する情報提供、受診調整、多言語対応、移動・滞在スケジュールを支援します。': t('人間ドックや先進医療に関する情報提供、受診調整、多言語対応、移動・滞在スケジュールを支援します。', '提供健康检查及先进医疗相关信息、就诊日程协调、多语言沟通、交通与在日行程支持。', 'Support includes information on health screenings and advanced medical care, appointment coordination, multilingual guidance, transportation and stay scheduling.', '건강검진과 첨단의료 관련 정보 제공, 진료 일정 조정, 다국어 안내, 이동 및 체류 일정을 지원합니다.', '提供健康檢查及先進醫療相關資訊、就診日程協調、多語言溝通、交通與在日行程支援。'),
  'SNS運用企画、写真・ショート動画、Web、多言語コンテンツを通じて、ブランドの情報発信を支援します。': t('SNS運用企画、写真・ショート動画、Web、多言語コンテンツを通じて、ブランドの情報発信を支援します。', '通过社交媒体运营策划、照片与短视频、网页及多语言内容，支持品牌信息传播。', 'We support brand communication through social media planning, photography, short-form video, web content and multilingual production.', 'SNS 운영 기획, 사진·숏폼 영상, 웹 및 다국어 콘텐츠를 통해 브랜드의 정보 발신을 지원합니다.', '透過社群媒體營運企劃、照片與短影片、網頁及多語言內容，支援品牌資訊傳播。'),
  '事業詳細を見る': t('事業詳細を見る', '查看业务详情', 'View business details', '사업 상세 보기', '查看事業詳情'),
  '医療ツーリズムの受診・滞在支援イメージ': t('医療ツーリズムの受診・滞在支援イメージ', '医疗旅游就诊与在日行程支持示意', 'Medical tourism appointment and stay support', '의료 관광 진료 및 체류 지원 이미지', '醫療旅遊就診與在日行程支援示意'),
  'デジタルコンテンツ制作・発信支援イメージ': t('デジタルコンテンツ制作・発信支援イメージ', '数字内容制作与传播支持示意', 'Digital content production and communication support', '디지털 콘텐츠 제작 및 발신 지원 이미지', '數位內容製作與傳播支援示意')
};

const medical = {
  '日本の医療と、安心の滞在をつなぐ。': t('日本の医療と、安心の滞在をつなぐ。', '连接日本医疗资源与安心的在日行程。', 'Connecting access to medical care in Japan with a well-supported stay.', '일본의 의료 서비스와 안심할 수 있는 체류를 연결합니다.', '串連日本醫療資源與安心的在日行程。'),
  '受診前の確認から、移動・滞在までを一つにつなぐ。': t('受診前の確認から、移動・滞在までを一つにつなぐ。', '从就诊前确认，到交通与在日行程，提供连贯支持。', 'Coordinated support from pre-visit planning through transportation and the stay in Japan.', '진료 전 확인부터 이동과 체류까지 하나의 흐름으로 지원합니다.', '從就診前確認，到交通與在日行程，提供連貫支援。'),
  '訪日外国人のお客様が日本で安心して受診できるよう、受診内容に関する情報提供、医療機関との日程調整、多言語での案内、空港・ホテル・医療機関間の移動支援を行います。': t('訪日外国人のお客様が日本で安心して受診できるよう、受診内容に関する情報提供、医療機関との日程調整、多言語での案内、空港・ホテル・医療機関間の移動支援を行います。', '为帮助访日旅客安心在日本就诊，我们提供就诊相关信息、与医疗机构的日程协调、多语言说明，以及机场、酒店与医疗机构之间的交通支持。', 'To help international visitors access care in Japan with confidence, we provide information about appointments, scheduling support with medical providers, multilingual guidance, and transportation between airports, hotels and medical facilities.', '방일 외국인 고객이 일본에서 안심하고 진료를 받을 수 있도록 진료 관련 정보 제공, 의료기관 일정 조정, 다국어 안내, 공항·호텔·의료기관 간 이동을 지원합니다.', '為協助訪日旅客安心在日本就診，我們提供就診相關資訊、與醫療機構的日程協調、多語言說明，以及機場、飯店與醫療機構之間的交通支援。'),
  'お客様の希望と医療機関からの案内を確認し、必要な移動や滞在スケジュールを整理します。': t('お客様の希望と医療機関からの案内を確認し、必要な移動や滞在スケジュールを整理します。', '我们会确认客户需求及医疗机构提供的说明，并整理所需交通与在日行程。', 'We confirm each visitor’s requirements and the provider’s guidance, then organise the necessary transportation and stay schedule.', '고객의 희망 사항과 의료기관 안내를 확인한 뒤 필요한 이동 및 체류 일정을 정리합니다.', '我們會確認顧客需求及醫療機構提供的說明，並整理所需交通與在日行程。'),
  '医療ツーリズムでご相談いただけること': t('医療ツーリズムでご相談いただけること', '可咨询的医疗旅游支持', 'Medical tourism support available', '의료 관광 지원 상담 항목', '可洽詢的醫療旅遊支援'),
  '人間ドック受診サポート': t('人間ドック受診サポート', '健康检查就诊支持', 'Health Screening Support', '건강검진 진료 지원', '健康檢查就診支援'),
  '受診内容や当日の流れを確認し、必要な手続きと日程を整理します。': t('受診内容や当日の流れを確認し、必要な手続きと日程を整理します。', '确认检查内容与当日流程，整理所需手续和日程。', 'We confirm the screening details and day-of process, then organise the necessary procedures and schedule.', '검진 내용과 당일 절차를 확인하고 필요한 수속과 일정을 정리합니다.', '確認檢查內容與當日流程，整理所需手續與日程。'),
  '先進医療に関する情報提供・受診調整': t('先進医療に関する情報提供・受診調整', '先进医疗相关信息与就诊协调', 'Information and Scheduling for Advanced Medical Care', '첨단의료 관련 정보 및 진료 일정 조정', '先進醫療相關資訊與就診協調'),
  '医療機関が公開する情報をもとに、受診に必要な確認と日程調整を支援します。': t('医療機関が公開する情報をもとに、受診に必要な確認と日程調整を支援します。', '依据医疗机构公开的信息，协助确认就诊所需事项并协调日程。', 'Using information published by medical providers, we support the checks and scheduling required for an appointment.', '의료기관이 공개한 정보를 바탕으로 진료에 필요한 확인과 일정 조정을 지원합니다.', '依據醫療機構公開的資訊，協助確認就診所需事項並協調日程。'),
  '医療機関との連携': t('医療機関との連携', '与医疗机构协调', 'Coordination with Medical Providers', '의료기관 연계', '與醫療機構協調'),
  '受診先からの案内を確認し、お客様に必要な情報と準備事項を共有します。': t('受診先からの案内を確認し、お客様に必要な情報と準備事項を共有します。', '确认就诊机构提供的说明，并向客户传达所需信息与准备事项。', 'We review guidance from the provider and share the information and preparation required with the visitor.', '진료기관의 안내를 확인하고 고객에게 필요한 정보와 준비 사항을 전달합니다.', '確認就診機構提供的說明，並向顧客傳達所需資訊與準備事項。'),
  '多言語対応': t('多言語対応', '多语言支持', 'Multilingual Support', '다국어 지원', '多語言支援'),
  '受診や滞在に関する案内を、希望言語に合わせて分かりやすくお伝えします。': t('受診や滞在に関する案内を、希望言語に合わせて分かりやすくお伝えします。', '根据客户希望使用的语言，清晰说明就诊与在日行程信息。', 'We explain appointment and stay information clearly in the visitor’s preferred language.', '진료와 체류 관련 안내를 희망 언어에 맞춰 알기 쉽게 전달합니다.', '依照顧客希望使用的語言，清楚說明就診與在日行程資訊。'),
  '空港・ホテル・医療機関間の移動支援': t('空港・ホテル・医療機関間の移動支援', '机场、酒店与医疗机构间交通支持', 'Transportation Between Airports, Hotels and Medical Facilities', '공항·호텔·의료기관 간 이동 지원', '機場、飯店與醫療機構間交通支援'),
  '受診予定と人数、荷物に合わせて、移動手段と送迎行程を調整します。': t('受診予定と人数、荷物に合わせて、移動手段と送迎行程を調整します。', '根据就诊日程、人数与行李情况，协调交通方式和接送行程。', 'We coordinate transportation and routes to suit the appointment schedule, passenger count and luggage.', '진료 일정과 인원, 수하물에 맞춰 이동 수단과 송영 일정을 조정합니다.', '依照就診日程、人數與行李情況，協調交通方式與接送行程。'),
  '滞在スケジュール調整': t('滞在スケジュール調整', '在日行程协调', 'Stay Schedule Coordination', '체류 일정 조정', '在日行程協調'),
  '到着から受診、宿泊、帰国まで、無理のない滞在スケジュールを整理します。': t('到着から受診、宿泊、帰国まで、無理のない滞在スケジュールを整理します。', '从抵达、就诊、住宿到回国，协助安排合理的在日行程。', 'We organise a practical stay schedule from arrival and appointments through accommodation and departure.', '도착, 진료, 숙박, 귀국까지 무리 없는 체류 일정을 정리합니다.', '從抵達、就診、住宿到回國，協助安排合理的在日行程。'),
  'ご相談から受診・滞在まで': t('ご相談から受診・滞在まで', '从咨询到就诊及在日行程', 'From Inquiry to Appointment and Stay', '상담부터 진료 및 체류까지', '從洽詢到就診與在日行程'),
  'ご相談内容の確認': t('ご相談内容の確認', '确认咨询内容', 'Confirming Requirements', '상담 내용 확인', '確認洽詢內容'),
  '希望する受診内容、日程、人数、言語、滞在予定を確認します。': t('希望する受診内容、日程、人数、言語、滞在予定を確認します。', '确认希望就诊的内容、日程、人数、语言与在日安排。', 'We confirm the requested appointment, dates, party size, language and stay plans.', '희망 진료 내용, 일정, 인원, 언어와 체류 계획을 확인합니다.', '確認希望就診的內容、日程、人數、語言與在日安排。'),
  '情報提供・日程調整': t('情報提供・日程調整', '提供信息及协调日程', 'Information and Scheduling', '정보 제공 및 일정 조정', '提供資訊及協調日程'),
  '医療機関からの案内に基づき、受診条件と候補日を整理します。': t('医療機関からの案内に基づき、受診条件と候補日を整理します。', '依据医疗机构的说明，整理就诊条件和候选日期。', 'Based on provider guidance, we organise appointment requirements and potential dates.', '의료기관 안내에 따라 진료 조건과 후보 일정을 정리합니다.', '依據醫療機構的說明，整理就診條件與候選日期。'),
  '移動・滞在計画': t('移動・滞在計画', '交通与在日行程规划', 'Transportation and Stay Planning', '이동 및 체류 계획', '交通與在日行程規劃'),
  '空港、ホテル、医療機関間の移動と滞在日程を組み立てます。': t('空港、ホテル、医療機関間の移動と滞在日程を組み立てます。', '规划机场、酒店与医疗机构之间的交通及在日行程。', 'We plan transportation between airports, hotels and medical facilities together with the stay schedule.', '공항, 호텔, 의료기관 간 이동과 체류 일정을 구성합니다.', '規劃機場、飯店與醫療機構之間的交通及在日行程。'),
  '当日の案内': t('当日の案内', '当日说明与支持', 'Day-of Guidance', '당일 안내', '當日說明與支援'),
  '確定した予定と連絡事項を共有し、円滑な受診と滞在を支援します。': t('確定した予定と連絡事項を共有し、円滑な受診と滞在を支援します。', '共享已确认的日程与联络事项，协助客户顺利完成就诊与在日行程。', 'We share the confirmed schedule and contact details to support a smooth appointment and stay.', '확정된 일정과 연락 사항을 공유해 원활한 진료와 체류를 지원합니다.', '共享已確認的日程與聯絡事項，協助顧客順利完成就診與在日行程。'),
  '医療行為に関するご案内': t('医療行為に関するご案内', '医疗服务相关说明', 'Important Medical Notice', '의료행위 관련 안내', '醫療服務相關說明'),
  '当社は医療機関ではなく、診断・治療等の医療行為は行いません。医療行為および医学的判断は、受診先の医療機関が行います。': t('当社は医療機関ではなく、診断・治療等の医療行為は行いません。医療行為および医学的判断は、受診先の医療機関が行います。', '本公司并非医疗机构，不实施诊断、治疗等医疗行为。所有医疗行为及医学判断均由就诊的医疗机构负责。', 'We are not a medical provider and do not perform diagnosis, treatment or any other medical procedure. All medical care and clinical decisions are the responsibility of the medical provider visited.', '당사는 의료기관이 아니며 진단, 치료 등 의료행위를 하지 않습니다. 의료행위와 의학적 판단은 진료를 받는 의료기관에서 수행합니다.', '本公司並非醫療機構，不實施診斷、治療等醫療行為。所有醫療行為及醫學判斷均由就診的醫療機構負責。'),
  '医療ツーリズムに関するご相談': t('医療ツーリズムに関するご相談', '医疗旅游服务咨询', 'Medical Tourism Support Inquiry', '의료 관광 지원 상담', '醫療旅遊服務洽詢'),
  '受診希望、日程、人数、希望言語、移動・滞在に関するご希望をお聞かせください。': t('受診希望、日程、人数、希望言語、移動・滞在に関するご希望をお聞かせください。', '请告知希望就诊的内容、日程、人数、语言以及交通与在日行程需求。', 'Tell us about the requested appointment, dates, party size, preferred language, transportation and stay requirements.', '희망 진료 내용, 일정, 인원, 언어, 이동 및 체류 관련 요청 사항을 알려 주세요.', '請告知希望就診的內容、日程、人數、語言以及交通與在日行程需求。'),
  '相談内容を送る': t('相談内容を送る', '发送咨询内容', 'Send an inquiry', '상담 내용 보내기', '送出洽詢內容')
};

const digital = {
  '相談内容を送る': t('相談内容を送る', '发送咨询内容', 'Send an inquiry', '상담 내용 보내기', '送出洽詢內容'),
  'SNSとデジタルコンテンツで、': t('SNSとデジタルコンテンツで、', '通过社交媒体与数字内容，', 'Using social media and digital content,', 'SNS와 디지털 콘텐츠로', '透過社群媒體與數位內容，'),
  'ブランドの価値が伝わる仕組みをつくる。': t('ブランドの価値が伝わる仕組みをつくる。', '建立清晰传达品牌价值的机制。', 'build a system that communicates brand value.', '브랜드의 가치를 효과적으로 전달하는 체계를 만듭니다.', '建立清楚傳達品牌價值的機制。'),
  '企画、制作、発信、改善を一つの流れに。': t('企画、制作、発信、改善を一つの流れに。', '将策划、制作、发布与优化整合为持续流程。', 'From planning and production to publishing and continuous improvement.', '기획, 제작, 발신, 개선을 하나의 흐름으로 연결합니다.', '將企劃、製作、發布與優化整合為持續流程。'),
  '企業やサービスの魅力が必要な相手に正しく届くよう、SNS運用企画、写真・ショート動画、Webコンテンツ、多言語での情報発信を支援します。': t('企業やサービスの魅力が必要な相手に正しく届くよう、SNS運用企画、写真・ショート動画、Webコンテンツ、多言語での情報発信を支援します。', '为让企业与服务的价值准确触达目标受众，我们提供社交媒体运营策划、照片与短视频、网页内容及多语言传播支持。', 'To help the value of a business or service reach the right audience, we support social media planning, photography, short-form video, web content and multilingual communication.', '기업과 서비스의 매력이 필요한 대상에게 정확히 전달되도록 SNS 운영 기획, 사진·숏폼 영상, 웹 콘텐츠 및 다국어 정보 발신을 지원합니다.', '為讓企業與服務的價值準確觸及目標受眾，我們提供社群媒體營運企劃、照片與短影片、網頁內容及多語言傳播支援。'),
  '目的と対象を整理し、継続できる発信計画と、公開後の分析・改善までを実務に合わせて組み立てます。': t('目的と対象を整理し、継続できる発信計画と、公開後の分析・改善までを実務に合わせて組み立てます。', '在明确目标与受众后，结合实际运营条件制定可持续的传播计划，并延伸至发布后的分析与优化。', 'We clarify objectives and audiences, then build a sustainable communication plan that includes post-publication analysis and improvement.', '목적과 대상을 정리한 뒤 실제 운영 여건에 맞춰 지속 가능한 발신 계획과 공개 후 분석·개선까지 설계합니다.', '在釐清目標與受眾後，結合實際營運條件制定可持續的傳播計畫，並延伸至發布後的分析與優化。'),
  'デジタル発信でご相談いただけること': t('デジタル発信でご相談いただけること', '可咨询的数字传播服务', 'Digital communication support available', '디지털 발신 지원 상담 항목', '可洽詢的數位傳播服務'),
  'SNS運用企画・支援': t('SNS運用企画・支援', '社交媒体运营策划与支持', 'Social Media Planning and Support', 'SNS 운영 기획 및 지원', '社群媒體營運企劃與支援'),
  '発信目的、対象、投稿テーマ、運用体制を整理し、継続できる計画を設計します。': t('発信目的、対象、投稿テーマ、運用体制を整理し、継続できる計画を設計します。', '梳理传播目的、受众、发布主题和运营体制，制定可持续执行的计划。', 'We define communication goals, audiences, content themes and operating responsibilities to create a sustainable plan.', '발신 목적, 대상, 게시 주제와 운영 체계를 정리해 지속 가능한 계획을 설계합니다.', '梳理傳播目的、受眾、發布主題與營運體制，制定可持續執行的計畫。'),
  '写真・ショート動画制作': t('写真・ショート動画制作', '照片与短视频制作', 'Photography and Short-form Video', '사진·숏폼 영상 제작', '照片與短影片製作'),
  'サービスや現場の魅力を伝える写真と短尺動画を企画・制作します。': t('サービスや現場の魅力を伝える写真と短尺動画を企画・制作します。', '策划并制作展现服务与实际场景价值的照片和短视频。', 'We plan and produce photography and short-form video that communicate the value of services and real operating environments.', '서비스와 현장의 매력을 전달하는 사진과 숏폼 영상을 기획·제작합니다.', '企劃並製作展現服務與實際場景價值的照片及短影片。'),
  'Web・デジタルコンテンツ制作': t('Web・デジタルコンテンツ制作', '网页与数字内容制作', 'Web and Digital Content Production', '웹·디지털 콘텐츠 제작', '網頁與數位內容製作'),
  'Webページ、記事、案内コンテンツなど、目的に合わせた情報を制作します。': t('Webページ、記事、案内コンテンツなど、目的に合わせた情報を制作します。', '根据目标制作网页、文章、指南等内容。', 'We create web pages, articles, guides and other content tailored to the objective.', '목적에 맞춰 웹페이지, 기사, 안내 콘텐츠 등을 제작합니다.', '依據目標製作網頁、文章、指南等內容。'),
  '多言語コンテンツ展開': t('多言語コンテンツ展開', '多语言内容发布', 'Multilingual Content', '다국어 콘텐츠 전개', '多語言內容發布'),
  '利用者の言語と文化背景を踏まえ、各言語で理解しやすい表現に整えます。': t('利用者の言語と文化背景を踏まえ、各言語で理解しやすい表現に整えます。', '结合用户语言与文化背景，调整为各语言易于理解的表达。', 'We adapt content for clarity in each language, taking the audience’s language and cultural context into account.', '이용자의 언어와 문화적 배경을 고려해 각 언어에서 이해하기 쉬운 표현으로 정리합니다.', '結合使用者語言與文化背景，調整為各語言容易理解的表達。'),
  'インバウンド向けプロモーション': t('インバウンド向けプロモーション', '入境旅客推广', 'Inbound Promotion', '인바운드 프로모션', '入境旅客推廣'),
  '訪日前後の情報行動を考え、訪日旅行者に届く情報発信を企画します。': t('訪日前後の情報行動を考え、訪日旅行者に届く情報発信を企画します。', '结合访日前后的信息获取习惯，策划面向访日旅客的内容传播。', 'We plan communications for international visitors based on how they seek information before and during their trip.', '방일 전후의 정보 탐색 행동을 고려해 여행자에게 닿는 정보 발신을 기획합니다.', '結合訪日前後的資訊獲取習慣，企劃面向訪日旅客的內容傳播。'),
  '投稿分析・改善支援': t('投稿分析・改善支援', '发布分析与优化支持', 'Content Analysis and Improvement', '게시물 분석 및 개선 지원', '發布分析與優化支援'),
  '公開後の反応を確認し、テーマ、表現、発信頻度の改善につなげます。': t('公開後の反応を確認し、テーマ、表現、発信頻度の改善につなげます。', '分析发布后的反馈，持续优化主题、表达与发布频率。', 'We review audience response after publication and use it to improve themes, wording and publishing frequency.', '공개 후 반응을 확인해 주제, 표현, 발신 빈도 개선에 반영합니다.', '分析發布後的反應，持續優化主題、表達與發布頻率。'),
  '発信の目的から、継続的な改善まで': t('発信の目的から、継続的な改善まで', '从传播目标到持续优化', 'From Communication Goals to Continuous Improvement', '발신 목적부터 지속적인 개선까지', '從傳播目標到持續優化'),
  '目的・対象の整理': t('目的・対象の整理', '明确目标与受众', 'Define Objectives and Audience', '목적·대상 정리', '明確目標與受眾'),
  '事業課題、届けたい相手、伝えるべき価値を確認します。': t('事業課題、届けたい相手、伝えるべき価値を確認します。', '确认业务课题、目标受众及需要传达的价值。', 'We clarify the business challenge, intended audience and value that needs to be communicated.', '사업 과제, 전달할 대상과 전달해야 할 가치를 확인합니다.', '確認事業課題、目標受眾及需要傳達的價值。'),
  '企画・制作': t('企画・制作', '策划与制作', 'Planning and Production', '기획·제작', '企劃與製作'),
  '媒体と運用条件に合わせて、コンテンツを企画・制作します。': t('媒体と運用条件に合わせて、コンテンツを企画・制作します。', '根据媒体特性与运营条件策划并制作内容。', 'We plan and produce content to suit the platform and operating conditions.', '매체와 운영 조건에 맞춰 콘텐츠를 기획·제작합니다.', '依據媒體特性與營運條件企劃並製作內容。'),
  '公開・運用': t('公開・運用', '发布与运营', 'Publishing and Operations', '공개·운영', '發布與營運'),
  '確認した計画に沿って公開し、日々の運用を支援します。': t('確認した計画に沿って公開し、日々の運用を支援します。', '按照确认的计划发布内容，并支持日常运营。', 'We publish according to the agreed plan and support ongoing operations.', '확정된 계획에 따라 공개하고 일상적인 운영을 지원합니다.', '依照確認的計畫發布內容，並支援日常營運。'),
  '分析・改善': t('分析・改善', '分析与优化', 'Analysis and Improvement', '분석·개선', '分析與優化'),
  '反応と成果を確認し、次の企画と運用改善に反映します。': t('反応と成果を確認し、次の企画と運用改善に反映します。', '确认反馈与成果，并用于后续策划和运营优化。', 'We review response and outcomes, then apply the findings to future planning and operational improvements.', '반응과 성과를 확인해 다음 기획과 운영 개선에 반영합니다.', '確認反應與成果，並用於後續企劃和營運優化。'),
  'デジタルプロモーションに関するご相談': t('デジタルプロモーションに関するご相談', '数字推广服务咨询', 'Digital Promotion Inquiry', '디지털 프로모션 상담', '數位推廣服務洽詢'),
  '発信したい事業や対象、現在の運用状況、制作したい内容をお聞かせください。': t('発信したい事業や対象、現在の運用状況、制作したい内容をお聞かせください。', '请告知希望推广的业务与受众、当前运营情况及计划制作的内容。', 'Tell us about the business and audience you want to reach, your current operations and the content you need.', '알리고 싶은 사업과 대상, 현재 운영 상황, 제작하려는 콘텐츠를 알려 주세요.', '請告知希望推廣的事業與受眾、目前營運情況及計畫製作的內容。')
};

export const EXPANSION_PAGE_OVERRIDES = {
  'about.html': about,
  'business.html': businessOverview,
  'business-medical.html': medical,
  'business-digital.html': digital
};

export const EXPANSION_SEO_DESCRIPTIONS = {
  'business.html': t(
    'ハイヤー、タクシー、中古車販売を中心に、医療ツーリズムとデジタルマーケティング支援を展開する大寅グループの事業をご紹介します。',
    '介绍Daitora Group以专车接送、出租车和二手车销售为核心，并拓展医疗旅游及数字营销支持的业务体系。',
    "Explore Daitora Group's core transportation and used-car businesses, together with medical tourism and digital marketing support services.",
    'Daitora Group의 전세 운송, 택시, 중고차 판매를 중심으로 의료 관광과 디지털 마케팅 지원까지 아우르는 사업을 소개합니다.',
    '介紹Daitora Group以專車接送、計程車和中古車銷售為核心，並拓展醫療旅遊及數位行銷支援的事業體系。'
  ),
  'business-medical.html': t(
    '人間ドックや先進医療に関する情報提供、受診調整、多言語対応、移動・滞在を支える医療ツーリズム事業をご紹介します。',
    '介绍Daitora Group面向访日旅客提供的健康检查及先进医疗相关信息、就诊协调、多语言沟通、交通与在日行程支持。',
    'Daitora Group provides medical tourism support for international visitors, including appointment information, scheduling, multilingual guidance, transportation and stay coordination.',
    'Daitora Group의 건강검진 및 첨단의료 관련 정보, 진료 일정 조정, 다국어 안내, 이동과 체류 지원을 소개합니다.',
    '介紹Daitora Group面向訪日旅客提供的健康檢查及先進醫療相關資訊、就診協調、多語言溝通、交通與在日行程支援。'
  ),
  'business-digital.html': t(
    'SNS運用企画、写真・ショート動画、Web、多言語コンテンツ、インバウンド向け発信を支えるデジタルマーケティング事業をご紹介します。',
    '介绍Daitora Group的社交媒体运营策划、照片与短视频、网页及多语言内容、入境旅客推广支持。',
    'Daitora Group supports social media planning, photography, short-form video, web and multilingual content, and inbound promotion.',
    'Daitora Group의 SNS 운영 기획, 사진·숏폼 영상, 웹 및 다국어 콘텐츠, 인바운드 프로모션 지원을 소개합니다.',
    '介紹Daitora Group的社群媒體營運企劃、照片與短影片、網頁及多語言內容、入境旅客推廣支援。'
  )
};
