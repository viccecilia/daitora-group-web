import fs from 'node:fs';
import path from 'node:path';
import {
  OFFICIAL_FACTS,
  PAGE_OVERRIDES,
  SEMANTIC_LOCKS,
  SEO_DESCRIPTIONS,
  finalLockEntries
} from './i18n-config.mjs';

const ROOT = process.cwd();
const pages = ['index.html','about.html','business.html','business-hire.html','business-taxi.html','business-auto.html','quality.html','works.html','company.html','news.html','contact.html','privacy.html','404.html'];
const langs = {
  ja: { dir: '', html: 'ja', label: '日本語', name: '日本語' },
  'zh-CN': { dir: 'zh-cn', html: 'zh-CN', label: '简体中文', name: '简体中文' },
  en: { dir: 'en', html: 'en', label: 'English', name: 'English' },
  ko: { dir: 'ko', html: 'ko', label: '한국어', name: '한국어' },
  'zh-TW': { dir: 'zh-tw', html: 'zh-TW', label: '繁體中文', name: '繁體中文' }
};
const baseUrl = 'https://daitora-jp.com';
const ogImagePath = '/assets/images/og/daitora-group-og.jpg';
const japanTravelUrls = {
  ja: 'https://japan-travel.info/ja/?utm_source=daitora-jp.com&amp;utm_medium=referral&amp;utm_campaign=group_home',
  'zh-CN': 'https://japan-travel.info/zh-cn/?utm_source=daitora-jp.com&amp;utm_medium=referral&amp;utm_campaign=group_home',
  en: 'https://japan-travel.info/en/?utm_source=daitora-jp.com&amp;utm_medium=referral&amp;utm_campaign=group_home',
  ko: 'https://japan-travel.info/ko/?utm_source=daitora-jp.com&amp;utm_medium=referral&amp;utm_campaign=group_home',
  'zh-TW': 'https://japan-travel.info/zh-tw/?utm_source=daitora-jp.com&amp;utm_medium=referral&amp;utm_campaign=group_home'
};

const meta = {
  'index.html': ['大寅グループ | 大阪・京都のハイヤー・タクシー・中古車販売','大阪・京都を拠点に、ハイヤー、タクシー、中古車販売を展開するDaitora Groupの公式サイトです。'],
  'about.html': ['大寅について | 大寅グループ','大寅グループの企業理念、Mission / Vision / Value、社訓をご紹介します。'],
  'business.html': ['事業紹介 | 大寅グループ','大寅ハイヤー、寅丸タクシー、大寅中古車販売の三つの事業をご紹介します。'],
  'business-hire.html': ['大寅ハイヤー | 大寅グループ','空港送迎、観光貸切、企業・VIP送迎に対応する大寅ハイヤーをご紹介します。'],
  'business-taxi.html': ['寅丸タクシー | 大寅グループ','大阪・京都・堺・港区など関西エリアの地域移動を支える寅丸タクシーをご紹介します。'],
  'business-auto.html': ['大寅中古車販売 | 大寅グループ','中古車販売、ローン相談、車両購入サポートを行う大寅中古車販売をご紹介します。'],
  'quality.html': ['安全・品質 | 大寅グループ','乗務員教育、車両管理、配車確認、GPS運行管理、法令遵守など安全品質体制をご紹介します。'],
  'works.html': ['実績紹介 | 大寅グループ','公開できる範囲で、大寅グループの大型案件、企業送迎、VIP送迎の対応実績をご紹介します。'],
  'company.html': ['会社概要 | 大寅グループ','株式会社大寅の会社情報、許認可、拠点情報をご紹介します。'],
  'news.html': ['ニュース | 大寅グループ','大寅グループからのお知らせ、事業情報、公開可能な範囲での対応実績をご紹介します。'],
  'contact.html': ['お問い合わせ | 大寅グループ','送迎、タクシー、中古車販売、法人相談、採用に関するお問い合わせページです。'],
  'privacy.html': ['プライバシーポリシー | 大寅グループ','大寅グループの個人情報の取り扱いについてご案内します。'],
  '404.html': ['ページが見つかりません | 大寅グループ','お探しのページが見つかりません。']
};

const rows = [
['ホーム','首页','Home','홈','首頁'],['大寅について','关于大寅','About Daitora','대도라 소개','關於大寅'],['事業紹介','业务介绍','Business','사업 소개','事業介紹'],['安全・品質','安全・品质','Safety & Quality','안전・품질','安全・品質'],['実績紹介','案例介绍','Track Record','실적 소개','實績介紹'],['会社概要','公司概要','Company','회사 개요','公司概要'],['ニュース','新闻','News','뉴스','最新消息'],['お問い合わせ','联系我们','Contact','문의','聯絡我們'],['プライバシーポリシー','隐私政策','Privacy Policy','개인정보처리방침','隱私權政策'],
['Welcome to Kansai','欢迎来到关西','Welcome to Kansai','간사이에 오신 것을 환영합니다','歡迎來到關西'],['大寅グループ','Daitora Group','Daitora Group','Daitora Group','Daitora Group'],['ハイヤー','包车接送','Chauffeur','하이어','包車接送'],['タクシー','出租车','Taxi','택시','計程車'],['中古車販売','二手车销售','Used Car Sales','중고차 판매','中古車銷售'],['総合お問い合わせ','综合咨询','General Inquiry','종합 문의','綜合洽詢'],['採用応募','招聘应聘','Recruitment','채용 지원','招募應徵'],
['空港送迎・観光貸切・企業送迎・VIP接待・地域タクシー・中古車販売','机场接送・观光包车・企业接送・VIP接待・区域出租车・二手车销售','Airport Transfers ・ Private Tours ・ Corporate Transfers ・ VIP Reception ・ Local Taxi ・ Used Car Sales','공항 송영・관광 전세・기업 송영・VIP 의전・지역 택시・중고차 판매','機場接送・觀光包車・企業接送・VIP接待・區域計程車・中古車銷售'],
['大阪・京都・堺・港区など関西複数拠点・約100台規模の車両ネットワーク','大阪、京都、堺、港区等关西多据点・约100台规模车辆网络','Multiple Kansai bases including Osaka, Kyoto, Sakai and Minato ・ approx. 100-vehicle network','오사카・교토・사카이・미나토구 등 간사이 복수 거점・약 100대 규모 차량 네트워크','大阪、京都、堺、港區等關西多據點・約100台規模車輛網絡'],
['GROUP CAPABILITY','集团实力','GROUP CAPABILITY','그룹 역량','集團實力'],['空港送迎・企業送迎・大型案件対応','机场接送・企业接送・大型项目对应','Airport, Corporate and Large-Scale Operations','공항 송영・기업 송영・대형 안건 대응','機場接送・企業接送・大型案件對應'],['関西で動かせる、','能够在关西调度的','A reliable operating base','간사이에서 움직일 수 있는','能在關西調度的'],['確かな運行基盤。','坚实运营基础。','for Kansai mobility.','확실한 운행 기반.','穩固運行基盤。'],['約100台','约100台','Approx. 100 vehicles','약 100대','約100台'],['車両ネットワーク','车辆网络','Vehicle network','차량 네트워크','車輛網絡'],['関西複数拠点','关西多据点','Multiple Kansai bases','간사이 복수 거점','關西多據點'],['大阪・京都・堺・港区','大阪・京都・堺・港区','Osaka / Kyoto / Sakai / Minato','오사카・교토・사카이・미나토구','大阪・京都・堺・港區'],['主要空港対応','主要机场对应','Major airport coverage','주요 공항 대응','主要機場對應'],['用途別車両','按用途配置车辆','Vehicles by purpose','용도별 차량','依用途配置車輛'],['企業・VIP・大型案件対応','企业・VIP・大型案件对应','Corporate, VIP and large-scale operations','기업・VIP・대형 안건 대응','企業・VIP・大型案件對應'],['許認可に基づく合法運行体制','基于许可的合法运营体制','Licensed and compliant operating system','허가에 기반한 합법 운행 체계','依許可營運的合法體制'],
['BUSINESS DOMAINS','业务领域','BUSINESS DOMAINS','사업 영역','事業領域'],['三つの事業で、','以三项事业，','Three business domains','세 가지 사업으로','以三項事業，'],['関西の移動と車両活用を支える。','支撑关西的移动与车辆活用。','support mobility and vehicle use in Kansai.','간사이의 이동과 차량 활용을 지원합니다.','支撐關西移動與車輛活用。'],['大寅ハイヤー','大寅包车接送','Daitora Chauffeur & Private Transportation','대도라 하이어','大寅包車接送'],['空港送迎・観光貸切・企業/VIP送迎','机场接送・观光包车・企业/VIP接送','Airport transfers, private tours, corporate/VIP transportation','공항 송영・관광 전세・기업/VIP 송영','機場接送・觀光包車・企業/VIP接送'],['寅丸タクシー','寅丸出租车','Toramaru Taxi','토라마루 택시','寅丸計程車'],['地域交通・日常移動・観光利用','区域交通・日常出行・观光利用','Local mobility, daily transport and sightseeing','지역 교통・일상 이동・관광 이용','區域交通・日常移動・觀光利用'],['大寅中古車販売','大寅二手车销售','Daitora Auto','대도라 중고차 판매','大寅中古車銷售'],['中古車販売・事業用車両・ローン相談','二手车销售・业务车辆・贷款咨询','Used cars, business vehicles and loan consultation','중고차 판매・사업용 차량・론 상담','中古車銷售・事業用車輛・貸款諮詢'],
['サービスに関するご相談はこちら','服务相关咨询请从这里开始','Service inquiries','서비스 상담은 여기에서','服務相關洽詢請由此開始'],['ハイヤー相談','包车咨询','Chauffeur inquiry','하이어 상담','包車諮詢'],['タクシー利用','出租车利用','Taxi use','택시 이용','計程車使用'],['中古車相談','二手车咨询','Used car inquiry','중고차 상담','中古車諮詢'],['Contact','联系','Contact','문의','聯絡'],
['お問い合わせ項目','咨询项目','Inquiry categories','문의 항목','洽詢項目'],['ご相談前にご用意いただくとスムーズな情報','提前准备这些信息会更顺畅','Information that helps us respond smoothly','상담 전 준비하면 좋은 정보','事前準備可讓洽詢更順利'],['お問い合わせ後の流れ','咨询后的流程','After you contact us','문의 후 흐름','洽詢後流程'],['連絡先','联系方式','Contact information','연락처','聯絡資訊'],['お電話でのご相談','电话咨询','Phone consultation','전화 상담','電話洽詢'],['メールでのご相談','邮件咨询','Email consultation','이메일 상담','電子郵件洽詢'],['電話をかける','拨打电话','Call us','전화 걸기','撥打電話'],['メールを送る','发送邮件','Send email','이메일 보내기','寄送郵件'],
['ページが見つかりません','页面未找到','Page not found','페이지를 찾을 수 없습니다','找不到頁面'],['トップページへ','返回首页','Go to top page','홈으로','回到首頁'],['お問い合わせへ','前往咨询','Contact us','문의하기','前往聯絡'],
['空港、ホテル、住所など','机场、酒店、地址等','Airport, hotel, address, etc.','공항, 호텔, 주소 등','機場、飯店、地址等'],['ホテル、会場、観光地など','酒店、会场、景点等','Hotel, venue, sightseeing spot, etc.','호텔, 행사장, 관광지 등','飯店、會場、景點等'],['行程、待ち合わせ場所、車両台数、配慮事項など','行程、集合地点、车辆台数、注意事项等','Itinerary, meeting point, number of vehicles, special notes, etc.','일정, 만남 장소, 차량 대수, 요청 사항 등','行程、集合地點、車輛台數、注意事項等'],['大阪市内、京都市内、駅・ホテル周辺など','大阪市内、京都市内、车站/酒店周边等','Osaka city, Kyoto city, station or hotel area, etc.','오사카 시내, 교토 시내, 역・호텔 주변 등','大阪市內、京都市內、車站／飯店周邊等'],['例：7月20日 15時ごろ','例：7月20日 15点左右','Example: July 20 around 15:00','예: 7월 20일 15시경','例：7月20日 15點左右'],['荷物、人数、ホテル・法人利用、その他確認事項','行李、人数、酒店/法人使用、其他确认事项','Luggage, passengers, hotel/corporate use and other details','수하물, 인원, 호텔・법인 이용, 기타 확인 사항','行李、人數、飯店／法人使用、其他確認事項'],['例：アルファード、ハイエース、シエンタ','例：Alphard、Hiace、Sienta','Example: Alphard, Hiace, Sienta','예: 알파드, 하이에이스, 시엔타','例：Alphard、Hiace、Sienta'],['購入希望時期、現在の状況、必要書類の確認など','希望购买时期、当前状况、必要资料确认等','Preferred purchase timing, current status, document check, etc.','구매 희망 시기, 현재 상황, 필요 서류 확인 등','希望購買時期、目前狀況、必要文件確認等'],['ドライバー、運行管理、その他','司机、运营管理、其他','Driver, operations management, other','드라이버, 운행 관리, 기타','司機、運行管理、其他'],['大阪、京都など','大阪、京都等','Osaka, Kyoto, etc.','오사카, 교토 등','大阪、京都等'],['会社情報、取材、パートナー相談など','公司信息、采访、合作咨询等','Company information, media inquiry, partnership, etc.','회사 정보, 취재, 파트너 상담 등','公司資訊、採訪、合作洽詢等'],
['航空便名','航班号','Flight number','항공편명','航班號'],['手荷物数','行李数量','Number of bags','수하물 수','手提行李數'],['ご利用日','使用日期','Service date','이용일','使用日期'],['時間','时间','Time','시간','時間'],['出発地','出发地','Pickup location','출발지','出發地'],['目的地','目的地','Destination','목적지','目的地'],['人数','人数','Passengers','인원','人數'],['車種','车型','Vehicle type','차종','車型'],['用途','用途','Purpose','용도','用途'],['備考','备注','Notes','비고','備註'],['お名前','姓名','Name','성명','姓名'],['会社名・団体名','公司名・团体名','Company / organization','회사명・단체명','公司名・團體名'],['電話番号','电话号码','Phone number','전화번호','電話號碼'],['メールアドレス','邮箱地址','Email address','이메일 주소','電子郵件'],['希望言語','希望语言','Preferred language','희망 언어','希望語言'],['お問い合わせ種別','咨询类型','Inquiry type','문의 유형','洽詢類型'],['個人情報の取り扱いに同意します','同意个人信息处理方式','I agree to the privacy policy','개인정보 처리방침에 동의합니다','同意個人資料處理方式'],
['大阪・京都・堺・港区など関西複数拠点を軸に、グループ全体で約100台規模の車両ネットワークを運用。', '以大阪、京都、堺、港区等关西多处据点为基础，集团整体运营约100台规模的车辆网络。', 'Based across Osaka, Kyoto, Sakai and Minato, the group operates an approximately 100-vehicle network.', '오사카・교토・사카이・미나토구 등 간사이 복수 거점을 기반으로 그룹 전체 약 100대 규모의 차량 네트워크를 운영합니다.', '以大阪、京都、堺、港區等關西多處據點為基礎，集團整體營運約100台規模車輛網絡。'],
['空港送迎、観光貸切、企業・VIP送迎、地域タクシー、中古車販売まで、車両・乗務員・配車・現場対応を一体で支えています。', '从机场接送、观光包车、企业/VIP接送、区域出租车到二手车销售，一体化支撑车辆、司机、配车与现场对应。', 'From airport transfers and private tours to corporate/VIP transportation, local taxi service and used car sales, we coordinate vehicles, drivers, dispatch and on-site support as one system.', '공항 송영, 관광 전세, 기업・VIP 송영, 지역 택시, 중고차 판매까지 차량・승무원・배차・현장 대응을 일체로 지원합니다.', '從機場接送、觀光包車、企業/VIP接送、區域計程車到中古車銷售，一體化支撐車輛、乘務員、派車與現場對應。'],
['大寅グループは、ハイヤー、タクシー、中古車販売を軸に、空港送迎、観光貸切、企業送迎、地域交通、車両活用までを一体で支えています。', 'Daitora Group 以包车接送、出租车、二手车销售为核心，一体化支撑机场接送、观光包车、企业接送、区域交通和车辆活用。', 'Daitora Group supports airport transfers, private tours, corporate transportation, local mobility and vehicle use through three core businesses: chauffeur transportation, taxi service and used car sales.', 'Daitora Group은 하이어, 택시, 중고차 판매를 축으로 공항 송영, 관광 전세, 기업 송영, 지역 교통과 차량 활용을 통합적으로 지원합니다.', 'Daitora Group 以包車接送、計程車、中古車銷售為核心，一體化支撐機場接送、觀光包車、企業接送、區域交通與車輛活用。'],
['関西空港・伊丹空港・神戸空港の送迎から、京都・奈良・神戸方面の観光貸切、企業視察、VIP接待まで対応。人数・荷物・接待規格に合わせて、Alphard、Hiace、Mercedes-Benz S-Class などの車両と乗務員を手配します。', '从关西机场、伊丹机场、神户机场接送，到京都、奈良、神户方向观光包车、企业视察和VIP接待，根据人数、行李和接待规格安排 Alphard、Hiace、Mercedes-Benz S-Class 等车辆与司机。', 'We arrange vehicles and drivers for Kansai, Itami and Kobe airport transfers, private tours to Kyoto, Nara and Kobe, corporate inspections and VIP reception, matching passenger count, luggage and service requirements.', '간사이공항・이타미공항・고베공항 송영부터 교토・나라・고베 방면 관광 전세, 기업 시찰, VIP 의전까지 인원, 수하물과 의전 기준에 맞춰 차량과 승무원을 배정합니다.', '從關西機場、伊丹機場、神戶機場接送，到京都、奈良、神戶方向觀光包車、企業視察與VIP接待，依人數、行李與接待規格安排 Alphard、Hiace、Mercedes-Benz S-Class 等車輛與乘務員。'],
['大阪・京都・堺・港区など関西エリアを中心に、駅、ホテル、空港周辺、観光地、ビジネス先への日常移動を支えるタクシー事業。見つけやすい車両と安定した運行管理で、短距離移動から観光利用まで対応します。', '以大阪、京都、堺、港区等关西区域为中心，支撑车站、酒店、机场周边、景点和商务目的地的日常出行。通过易识别车辆与稳定运营管理，对应短途移动和观光利用。', 'Centered on Osaka, Kyoto, Sakai and Minato, Toramaru Taxi supports daily movement to stations, hotels, airport areas, sightseeing spots and business destinations with recognizable vehicles and stable operations.', '오사카・교토・사카이・미나토구 등 간사이 지역을 중심으로 역, 호텔, 공항 주변, 관광지와 비즈니스 목적지의 일상 이동을 지원합니다. 찾기 쉬운 차량과 안정적인 운행 관리로 단거리 이동부터 관광 이용까지 대응합니다.', '以大阪、京都、堺、港區等關西區域為中心，支撐車站、飯店、機場周邊、景點與商務目的地的日常移動。透過易識別車輛與穩定運行管理，對應短程移動與觀光使用。'],
['中古車販売、事業用車両、ローン相談に対応。運行現場を知る会社だからこそ、用途、状態、維持管理、乗り出し後の使いやすさまで考えた車両選びを支援します。', '对应二手车销售、业务车辆和贷款咨询。正因为了解实际运营现场，才能从用途、状态、维持管理到交车后的易用性，协助选择合适车辆。', 'We support used car sales, business vehicles and loan consultation. As an operator that understands daily vehicle use, we help customers choose vehicles based on purpose, condition, maintenance and usability after delivery.', '중고차 판매, 사업용 차량, 론 상담에 대응합니다. 운행 현장을 아는 회사로서 용도, 상태, 유지 관리와 인도 후 사용성까지 고려한 차량 선택을 지원합니다.', '對應中古車銷售、事業用車輛與貸款諮詢。正因熟悉實際運行現場，能從用途、狀態、維護管理到交車後使用便利性，協助選擇合適車輛。'],
['車両だけではなく、', '不只是车辆，', 'More than vehicles,', '차량만이 아니라', '不只是車輛，'],
['人と運行体制で支える。', '更以人员与运营体制支撑。', 'supported by people and operations.', '사람과 운행 체계로 지원합니다.', '更以人員與運行體制支撐。'],
['大寅グループの強みは、車両台数だけではありません。多言語対応、専門ドライバーの育成、整備された車両環境、複数拠点での運行管理により、安心して任せられる移動を支えています。', 'Daitora Group 的强项不只是车辆台数。通过多语言对应、专业司机培养、整备完善的车辆环境和多据点运营管理，支撑令人安心托付的移动服务。', 'Daitora Group is not defined only by fleet size. Multilingual support, professional driver development, well-maintained vehicles and multi-base operations create transportation clients can entrust with confidence.', 'Daitora Group의 강점은 차량 대수만이 아닙니다. 다국어 대응, 전문 드라이버 육성, 정비된 차량 환경과 복수 거점 운행 관리로 안심하고 맡길 수 있는 이동을 지원합니다.', 'Daitora Group 的強項不只是車輛台數。透過多語言對應、專業司機培養、完善車輛環境與多據點運行管理，支撐令人安心託付的移動服務。'],
['安全・謙遜・迅敏。', '安全・谦逊・迅敏。', 'Safety, Humility and Agility.', '안전・겸손・신속.', '安全・謙遜・迅敏。'],
['変わらない姿勢を、すべてのサービスに。', '将不变的姿态落实到所有服务。', 'A consistent standard across every service.', '변하지 않는 자세를 모든 서비스에.', '將不變的態度落實到所有服務。'],
['一件の送迎を、確実に運行するために。', '为了让每一次接送都可靠运行。', 'To operate every transfer with certainty.', '한 건의 송영을 확실하게 운행하기 위해.', '為了讓每一次接送都確實運行。'],
['公開できる範囲の主な対応実績。', '公开范围内的主要对应实绩。', 'Selected public track records.', '공개 가능한 주요 대응 실적.', '公開範圍內的主要對應實績。'],
['ニュース一覧へ', '查看新闻列表', 'View all news', '뉴스 목록 보기', '查看最新消息'],
['実績紹介を見る', '查看案例介绍', 'View track records', '실적 보기', '查看實績介紹'],
['安全・品質を見る', '查看安全・品质', 'View safety and quality', '안전・품질 보기', '查看安全・品質'],
['多言語対応','多语言对应','Multilingual support','다국어 대응','多語言對應'],
['専門ドライバー','专业司机','Professional drivers','전문 드라이버','專業司機'],
['整備された車両環境','完善整备的车辆环境','Well-maintained vehicle environment','정비된 차량 환경','完善整備的車輛環境'],
['複数拠点・複数台対応','多据点・多车辆对应','Multi-base and multi-vehicle support','복수 거점・복수 차량 대응','多據點・多車輛對應'],
['合法車両の運行','合法车辆运营','Licensed vehicle operation','합법 차량 운행','合法車輛運行'],
['日々の車両点検','每日车辆点检','Daily vehicle checks','일상 차량 점검','每日車輛點檢'],
['時間に余裕を持った運行判断','预留时间余裕的运营判断','Operating decisions with time margin','시간 여유를 둔 운행 판단','預留時間餘裕的運行判斷'],
['ご要望をよく聞く','认真倾听需求','Listen carefully to requests','요청 사항을 세심히 듣기','認真傾聽需求'],
['荷物や同行者への配慮','照顾行李与同行者','Care for luggage and accompanying guests','수하물과 동행자 배려','照顧行李與同行者'],
['社内での情報共有','公司内部信息共享','Internal information sharing','사내 정보 공유','公司內部資訊共享'],
['フライト変更への確認','确认航班变更','Flight change confirmation','항공편 변경 확인','確認航班變更'],
['道路状況に応じた判断','根据道路状况判断','Judgment based on road conditions','도로 상황에 따른 판단','依道路狀況判斷'],
['配車、連絡、待機の調整','配车、联系与待机调整','Dispatch, communication and waiting coordination','배차, 연락, 대기 조정','派車、聯絡與待機調整'],
['日々の基本動作','每日基本动作','Daily operating basics','일상의 기본 동작','每日基本動作'],
['予約確認','预约确认','Booking confirmation','예약 확인','預約確認'],
['車両点検','车辆点检','Vehicle inspection','차량 점검','車輛點檢'],
['乗務員共有','司机信息共享','Driver briefing','승무원 공유','乘務員資訊共享'],
['当日運行','当日运行','Day-of operation','당일 운행','當日運行'],
['完了後共有','完成后共享','Post-operation review','완료 후 공유','完成後共享'],
['01 予約確認','01 预约确认','01 Booking confirmation','01 예약 확인','01 預約確認'],
['02 配車設計','02 配车设计','02 Dispatch planning','02 배차 설계','02 派車設計'],
['03 当日運行','03 当日运行','03 Day-of operation','03 당일 운행','03 當日運行'],
['04 完了後共有','04 完成后共享','04 Post-operation review','04 완료 후 공유','04 完成後共享'],
['お客様に、誠実で丁寧に向き合うこと。','以诚实、细致的态度面对每一位客户。','We face every customer with sincerity and care.','고객 한 분 한 분에게 성실하고 정중하게 대응합니다.','以誠實、細緻的態度面對每一位客戶。'],
['すべての判断基準が、安全であること。','所有判断都以安全为基准。','Safety is the basis for every decision.','모든 판단의 기준은 안전입니다.','所有判斷皆以安全為基準。'],
['変化に気づき、素早く正確に動くこと。','察觉变化，并迅速准确行动。','We notice changes and respond quickly and accurately.','변화를 파악하고 신속하고 정확하게 움직입니다.','察覺變化，並迅速準確行動。'],
['日時、便名、人数、荷物、行き先、待ち合わせ場所を確認。','确认日期时间、航班号、人数、行李、目的地和集合地点。','Confirm date, time, flight number, passenger count, luggage, destination and meeting point.','일시, 항공편명, 인원, 수하물, 목적지, 만남 장소를 확인합니다.','確認日期時間、航班號、人數、行李、目的地與集合地點。'],
['人数・荷物・用途に合わせて、車両と乗務員を手配。','根据人数、行李和用途安排车辆与司机。','Arrange vehicles and drivers according to passengers, luggage and purpose.','인원・수하물・용도에 맞춰 차량과 승무원을 배정합니다.','依人數、行李與用途安排車輛與乘務員。'],
['道路状況や到着時間の変化を確認しながら、現場で柔軟に対応。','确认道路状况和到达时间变化，在现场灵活对应。','Respond flexibly on site while monitoring road conditions and arrival-time changes.','도로 상황과 도착 시간 변화를 확인하며 현장에서 유연하게 대응합니다.','確認道路狀況與抵達時間變化，於現場彈性對應。'],
['運行結果、注意点、次回改善点を社内で共有。','在公司内部共享运行结果、注意事项和下次改善点。','Share operation results, notes and future improvement points internally.','운행 결과, 주의점, 다음 개선점을 사내에 공유합니다.','於公司內部共享運行結果、注意事項與下次改善點。'],
['予約確認、配車設計、当日運行、完了後の共有まで。送迎の前後にある確認作業を重ねることで、一件ずつ確実な運行につなげています。','从预约确认、配车设计、当日运行到完成后共享。通过反复确认接送前后的细节，确保每一件运行业务可靠完成。','From booking confirmation and dispatch planning to day-of operation and post-operation review, repeated checks before and after each transfer help us operate reliably.','예약 확인, 배차 설계, 당일 운행, 완료 후 공유까지. 송영 전후의 확인 작업을 쌓아 한 건씩 확실한 운행으로 이어갑니다.','從預約確認、派車設計、當日運行到完成後共享。透過反覆確認接送前後細節，確保每一件運行可靠完成。'],
['G20大阪サミット関連送迎','G20大阪峰会相关接送','G20 Osaka Summit related transfers','G20 오사카 서밋 관련 송영','G20大阪峰會相關接送'],
['企業団体・視察送迎','企业团体・视察接送','Corporate group and inspection transfers','기업 단체・시찰 송영','企業團體・視察接送'],
['海外ブランドイベント送迎','海外品牌活动接送','Overseas brand event transfers','해외 브랜드 이벤트 송영','海外品牌活動接送'],
['万博関連送迎','万博相关接送','Expo-related transfers','엑스포 관련 송영','萬博相關接送'],
['実績','实绩','Track record','실적','實績'],
['お知らせ','通知','Notice','공지','公告'],
['事業情報','业务信息','Business update','사업 정보','事業資訊'],
['ローン相談','贷款咨询','Loan consultation','론 상담','貸款諮詢'],
['事業用車両','业务用车辆','Business vehicles','사업용 차량','事業用車輛'],
['地域交通','区域交通','Local mobility','지역 교통','區域交通'],
['観光利用','观光利用','Sightseeing use','관광 이용','觀光使用'],
['観光貸切','观光包车','Private sightseeing','관광 전세','觀光包車'],
['企業・VIP送迎','企业・VIP接送','Corporate / VIP transfers','기업・VIP 송영','企業・VIP接送'],
['車両仕入ネットワーク','车辆采购网络','Vehicle sourcing network','차량 조달 네트워크','車輛採購網絡'],
['購入後サポート','购买后支持','After-purchase support','구매 후 지원','購買後支援'],
['EXPO2025 大阪・関西万博 要人送迎業務を請負しました','承接 EXPO2025 大阪・关西万博要人接送业务','Handled VIP transfer operations for EXPO2025 Osaka-Kansai Expo','EXPO2025 오사카・간사이 엑스포 요인 송영 업무를 수행했습니다','承接 EXPO2025 大阪・關西萬博要人接送業務'],
['フランス大手ブランドメーカーの日本イベント送迎業務を担当しました','负责法国大型品牌日本活动接送业务','Handled transfer operations for a major French brand event in Japan','프랑스 대형 브랜드의 일본 이벤트 송영 업무를 담당했습니다','負責法國大型品牌日本活動接送業務'],
['京都営業所を開設しました','开设京都营业所','Opened the Kyoto office','교토 영업소를 개설했습니다','開設京都營業所'],
['中古車販売事業の体制を強化しました','强化二手车销售事业体制','Strengthened our used car sales structure','중고차 판매 사업 체계를 강화했습니다','強化中古車銷售事業體制'],
['大型イベントに関連する関係者送迎に対応し、複数台運行・現場連携を行いました。','对应大型活动相关人员接送，进行了多车辆运行和现场联动。','Supported stakeholder transfers for a large-scale event with multi-vehicle operation and on-site coordination.','대형 이벤트 관련 관계자 송영에 대응하고 복수 차량 운행과 현장 연계를 수행했습니다.','對應大型活動相關人員接送，進行多車輛運行與現場聯動。'],
['VIPゲストとイベント関係者の移動に対応し、接遇品質と運行管理を重視しました。','对应VIP客人与活动相关人员移动，重视接遇品质和运行管理。','Supported VIP guests and event stakeholders with emphasis on hospitality quality and operational control.','VIP 게스트와 이벤트 관계자 이동에 대응하며 접객 품질과 운행 관리를 중시했습니다.','對應VIP賓客與活動相關人員移動，重視接遇品質與運行管理。'],
['京都発着の観光貸切、ホテル送迎、法人利用への対応体制を拡充しました。','扩充京都出发/到达的观光包车、酒店接送和法人利用对应体制。','Expanded support for Kyoto-based private tours, hotel transfers and corporate use.','교토 출발・도착 관광 전세, 호텔 송영, 법인 이용 대응 체계를 확충했습니다.','擴充京都出發／抵達的觀光包車、飯店接送與法人使用對應體制。'],
['車両管理の知見を活かし、用途に合った車両提案と購入支援を強化しました。','活用车辆管理经验，强化符合用途的车辆提案和购买支援。','Using our vehicle-management know-how, we strengthened vehicle proposals and purchase support based on customer needs.','차량 관리 노하우를 활용하여 용도에 맞는 차량 제안과 구매 지원을 강화했습니다.','活用車輛管理經驗，強化符合用途的車輛提案與購買支援。']
,
['日本語・中国語・英語など、訪日旅行や海外ゲスト対応に必要なコミュニケーションを支援します。','支持日语、中文、英语等访日旅行和海外客人接待所需的沟通。','We support communication needed for inbound travel and overseas guests, including Japanese, Chinese and English.','일본어・중국어・영어 등 방일 여행과 해외 게스트 대응에 필요한 커뮤니케이션을 지원합니다.','支援日語、中文、英語等訪日旅行與海外賓客接待所需的溝通。'],
['運転技術だけでなく、接遇、安全意識、時間管理を重視した乗務員教育を行っています。','不仅重视驾驶技术，也重视接遇、安全意识和时间管理的司机教育。','Driver training emphasizes not only driving skill, but also hospitality, safety awareness and time management.','운전 기술뿐 아니라 접객, 안전 의식, 시간 관리를 중시한 승무원 교육을 실시합니다.','不只重視駕駛技術，也重視接遇、安全意識與時間管理的乘務員教育。'],
['出庫前の点検、車内清掃、車両状態の確認を行い、快適で安全な移動空間を維持します。','进行出车前点检、车内清扫和车辆状态确认，维持舒适安全的移动空间。','We perform pre-departure checks, interior cleaning and vehicle-condition checks to maintain a comfortable and safe travel environment.','출고 전 점검, 차내 청소, 차량 상태 확인을 실시하여 쾌적하고 안전한 이동 공간을 유지합니다.','進行出車前點檢、車內清潔與車輛狀態確認，維持舒適安全的移動空間。'],
['私たちは、社訓である「安全・謙遜・迅敏」を大切にしています。安全をすべての判断基準とし、謙虚な姿勢でお客様と向き合い、迅敏な対応力で期待を超えるサービスを提供すること。この姿勢を、日々の運行、接遇、車両管理、現場対応の一つひとつに反映しています。','我们重视社训“安全・谦逊・迅敏”。以安全作为所有判断标准，以谦逊姿态面对客户，以迅速准确的对应提供超越期待的服务。我们将这种态度落实到每日运行、接遇、车辆管理和现场对应的每一个动作中。','We value our company principles: Safety, Humility and Agility. Safety is the basis for every decision; humility guides how we face customers; agile response helps us exceed expectations. This attitude is reflected in daily operations, hospitality, vehicle management and on-site response.','저희는 사훈인 「안전・겸손・신속」을 소중히 합니다. 안전을 모든 판단 기준으로 삼고, 겸손한 자세로 고객을 대하며, 신속한 대응력으로 기대를 뛰어넘는 서비스를 제공합니다. 이 자세를 일상의 운행, 접객, 차량 관리와 현장 대응 하나하나에 반영합니다.','我們重視社訓「安全・謙遜・迅敏」。以安全作為所有判斷基準，以謙遜態度面對客戶，以迅速準確的應對提供超越期待的服務。這份態度落實於每日運行、接遇、車輛管理與現場對應的每一個動作中。'],
['国際会議、企業視察、ブランドイベント、万博関連送迎など、時間管理、複数台運行、現場対応力が求められる案件にも対応してきました。','我们也曾对应国际会议、企业视察、品牌活动、万博相关接送等需要时间管理、多车辆运行和现场对应能力的案件。','We have supported projects such as international conferences, corporate inspections, brand events and Expo-related transfers where time control, multi-vehicle operation and on-site response are essential.','국제회의, 기업 시찰, 브랜드 이벤트, 엑스포 관련 송영 등 시간 관리, 복수 차량 운행, 현장 대응력이 요구되는 안건에도 대응해 왔습니다.','我們也曾對應國際會議、企業視察、品牌活動、萬博相關接送等需要時間管理、多車輛運行與現場對應能力的案件。'],
['国際会議関連の関係者送迎に対応。時間管理、待機場所確認、複数車両の運行調整を経験しました。','对应国际会议相关人员接送，积累了时间管理、待机地点确认和多车辆运行调整经验。','Supported stakeholder transfers for international conferences, gaining experience in time control, waiting-location checks and multi-vehicle coordination.','국제회의 관련 관계자 송영에 대응하며 시간 관리, 대기 장소 확인, 복수 차량 운행 조정 경험을 쌓았습니다.','對應國際會議相關人員接送，累積時間管理、待機地點確認與多車輛運行調整經驗。'],
['企業視察、研修旅行、工場見学など、複数名・複数台での移動を伴う案件に対応しています。','对应企业视察、研修旅行、工厂参观等涉及多人和多车辆移动的案件。','We support corporate inspections, training trips, factory visits and other projects involving multiple passengers and vehicles.','기업 시찰, 연수 여행, 공장 견학 등 복수 인원・복수 차량 이동이 수반되는 안건에 대응합니다.','對應企業視察、研修旅行、工廠參觀等涉及多人與多車輛移動的案件。'],
['京都エリアを中心に、VIP顧客・関係者の送迎を担当。車両美観、乗務員の所作、待機中の対応まで重視しています。','以京都区域为中心，负责VIP客户和相关人员接送，重视车辆美观、司机举止和待机期间的对应。','Centered on the Kyoto area, we handle transfers for VIP customers and stakeholders, emphasizing vehicle appearance, driver conduct and waiting-time response.','교토 지역을 중심으로 VIP 고객・관계자 송영을 담당하며 차량 미관, 승무원의 동작, 대기 중 대응까지 중시합니다.','以京都區域為中心，負責VIP客戶與相關人員接送，重視車輛美觀、乘務員舉止與待機期間的對應。'],
['大阪・関西万博に関連する来賓・関係者・企業団体の送迎案件に対応。混雑時の運行管理や複数台調整を支援しています。','对应大阪・关西万博相关来宾、相关人员和企业团体接送，支援拥堵时的运行管理和多车辆调整。','We support transfers for guests, stakeholders and corporate groups related to the Osaka-Kansai Expo, including operation control during congestion and multi-vehicle coordination.','오사카・간사이 엑스포 관련 내빈, 관계자, 기업 단체 송영에 대응하며 혼잡 시 운행 관리와 복수 차량 조정을 지원합니다.','對應大阪・關西萬博相關來賓、相關人員與企業團體接送，支援壅塞時的運行管理與多車輛調整。'],
['大阪本社：大阪府大阪市大正区小林西2丁目10-3 / 京都営業所：京都府京都市伏見区竹田東小屋ノ内町95 /','大阪总部：大阪府大阪市大正区小林西2丁目10-3 / 京都营业所：京都府京都市伏见区竹田东小屋ノ内町95 /','Osaka head office: 2-10-3 Kobayashi-nishi, Taisho-ku, Osaka / Kyoto office: 95 Takeda Higashikoyanouchi-cho, Fushimi-ku, Kyoto /','오사카 본사: 오사카부 오사카시 다이쇼구 고바야시니시 2-10-3 / 교토 영업소: 교토부 교토시 후시미구 다케다 히가시코야노우치초 95 /','大阪總部：大阪府大阪市大正區小林西2丁目10-3 / 京都營業所：京都府京都市伏見區竹田東小屋ノ内町95 /']
,
['大阪・京都・堺・港区など関西複数拠点と約100台規模の車両ネットワークを活用します。','活用大阪、京都、堺、港区等关西多据点与约100台规模车辆网络。','We use multiple Kansai bases, including Osaka, Kyoto, Sakai and Minato, together with an approximately 100-vehicle network.','오사카・교토・사카이・미나토구 등 간사이 복수 거점과 약 100대 규모 차량 네트워크를 활용합니다.','活用大阪、京都、堺、港區等關西多據點與約100台規模車輛網絡。'],
['安全 / Safety','安全','Safety','안전','安全'],
['謙遜 / Humility','谦逊','Humility','겸손','謙遜'],
['迅敏 / Agility','迅敏','Agility','신속','迅敏']
];

const contentPath = path.join(ROOT, 'scripts', 'i18n-content.json');
const content = fs.existsSync(contentPath) ? JSON.parse(fs.readFileSync(contentPath, 'utf8')) : {};
const translatedLanguages = ['zh-CN', 'en', 'ko', 'zh-TW'];
const dict = Object.fromEntries(Object.keys(langs).map((l) => [l, new Map()]));
const finalLockDict = Object.fromEntries(translatedLanguages.map((lang) => [lang, new Map()]));

// General full-sentence translations are the lowest layer.
for (const [source, translations] of Object.entries(content)) {
  for (const lang of translatedLanguages) {
    if (translations?.[lang]) dict[lang].set(source, translations[lang]);
  }
}

// Legacy rows are fallback-only. They can no longer overwrite structured
// translations from i18n-content.json.
for (const row of rows) {
  for (const [lang, index] of [['zh-CN', 1], ['en', 2], ['ko', 3], ['zh-TW', 4]]) {
    if (!dict[lang].has(row[0]) && row[index]) dict[lang].set(row[0], row[index]);
  }
}

const pageDict = Object.fromEntries(Object.entries(PAGE_OVERRIDES).map(([page, entries]) => {
  const byLang = Object.fromEntries(translatedLanguages.map((lang) => [lang, new Map()]));
  for (const [source, translations] of Object.entries(entries)) {
    for (const lang of translatedLanguages) if (translations?.[lang]) byLang[lang].set(source, translations[lang]);
  }
  return [page, byLang];
}));

// A conflicting lower layer is a build error. Final UI, brand and official
// fact locks are checked against both the general catalogue/fallbacks and
// page-specific overrides, then kept in a separate highest-priority map.
for (const { group, source, translations } of finalLockEntries()) {
  for (const lang of translatedLanguages) {
    const lower = dict[lang].get(source);
    if (lower && lower !== translations[lang]) {
      throw new Error(`${group} conflict for ${lang}: ${JSON.stringify(source)}\nExpected: ${translations[lang]}\nFound: ${lower}`);
    }
    for (const [page, overrides] of Object.entries(pageDict)) {
      const pageValue = overrides[lang].get(source);
      if (pageValue && pageValue !== translations[lang]) {
        throw new Error(`${group} conflict in ${page} for ${lang}: ${JSON.stringify(source)}\nExpected: ${translations[lang]}\nFound: ${pageValue}`);
      }
    }
    finalLockDict[lang].set(source, translations[lang]);
    dict[lang].set(source, translations[lang]);
  }
}

const pageNames = {
  'index.html': ['大寅グループ','Daitora Group','Daitora Group','Daitora Group','Daitora Group'],
  'about.html': ['大寅について','关于大寅','About Daitora','대도라 소개','關於大寅'],
  'business.html': ['事業紹介','业务介绍','Business','사업 소개','事業介紹'],
  'business-hire.html': ['大寅ハイヤー','大寅包车接送','Daitora Chauffeur & Private Transportation','대도라 하이어','大寅包車接送'],
  'business-taxi.html': ['寅丸タクシー','寅丸出租车','Toramaru Taxi','토라마루 택시','寅丸計程車'],
  'business-auto.html': ['大寅中古車販売','大寅二手车销售','Daitora Auto','대도라 중고차 판매','大寅中古車銷售'],
  'quality.html': ['安全・品質','安全・品质','Safety & Quality','안전・품질','安全・品質'],
  'works.html': ['実績紹介','案例介绍','Track Record','실적 소개','實績介紹'],
  'company.html': ['会社概要','公司概要','Company','회사 개요','公司概要'],
  'news.html': ['ニュース','新闻','News','뉴스','最新消息'],
  'contact.html': ['お問い合わせ','联系我们','Contact','문의','聯絡我們'],
  'privacy.html': ['プライバシーポリシー','隐私政策','Privacy Policy','개인정보처리방침','隱私權政策'],
  '404.html': ['ページが見つかりません','页面未找到','Page not found','페이지를 찾을 수 없습니다','找不到頁面']
};

function langIndex(lang){ return lang === 'zh-CN' ? 1 : lang === 'en' ? 2 : lang === 'ko' ? 3 : lang === 'zh-TW' ? 4 : 0; }
function pageUrl(page, lang){
  const prefix = langs[lang].dir;
  if (lang === 'ja') return `${baseUrl}/${page === 'index.html' ? '' : page}`;
  return `${baseUrl}/${prefix}/${page === 'index.html' ? '' : page}`;
}
function relativeLangHref(currentLang, targetLang, page){
  if (currentLang === 'ja') return targetLang === 'ja' ? page : `${langs[targetLang].dir}/${page}`;
  if (targetLang === 'ja') return `../${page}`;
  if (targetLang === currentLang) return page;
  return `../${langs[targetLang].dir}/${page}`;
}
function languageSwitcher(currentLang, page, mobile=false){
  const id = `${mobile ? 'mobile' : 'desktop'}-language-menu-${page.replace(/\W/g,'-')}`;
  const items = Object.keys(langs).map((lang) => `<a href="${relativeLangHref(currentLang, lang, page)}" hreflang="${langs[lang].html}" lang="${langs[lang].html}"${lang===currentLang?' aria-current="true"':''}>${langs[lang].label}</a>`).join('');
  return `<div class="language-switcher ${mobile ? 'language-switcher-mobile' : 'language-switcher-desktop'}" data-language-switcher><button class="language-button" type="button" data-language-button aria-haspopup="true" aria-expanded="false" aria-controls="${id}"><span class="language-globe" aria-hidden="true"></span><span>${langs[currentLang].label}</span></button><div class="language-menu" id="${id}" data-language-menu>${items}</div></div>`;
}
function injectSwitchers(html, lang, page){
  html = html.replace(/<!-- i18n:mobile-switcher -->[\s\S]*?<!-- \/i18n:mobile-switcher -->\s*/g, '');
  html = html.replace(/<!-- i18n:desktop-switcher -->[\s\S]*?<!-- \/i18n:desktop-switcher -->\s*/g, '');
  html = html.replace(/(<nav class="nav"[^>]*>)/, `$1\n        <!-- i18n:mobile-switcher -->${languageSwitcher(lang,page,true)}<!-- /i18n:mobile-switcher -->`);
  html = html.replace(/(\s*)<a class="([^"]*\bheader-cta\b[^"]*)"/, `$1<!-- i18n:desktop-switcher -->${languageSwitcher(lang,page,false)}<!-- /i18n:desktop-switcher -->$1<a class="$2"`);
  return html;
}
function seoBlock(lang, page){
  const i = langIndex(lang);
  const name = pageNames[page]?.[i] || pageNames[page]?.[0] || 'Daitora Group';
  const description = SEO_DESCRIPTIONS[page]?.[lang] || meta[page]?.[1] || meta['index.html'][1];
  const title = lang === 'ja' ? meta[page]?.[0] : `${name} | Daitora Group`;
  const canonical = page === 'company.html' ? pageUrl('about.html', lang) : pageUrl(page, lang);
  if (page === 'company.html') {
    return `<!-- i18n:head -->
  <meta name="robots" content="noindex,follow">
  <meta name="description" content="${escapeAttr(description)}">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="${lang === 'ja' ? 'favicon.ico' : '../favicon.ico'}">
  <!-- /i18n:head -->`;
  }
  const hrefs = Object.keys(langs).map((l) => `  <link rel="alternate" hreflang="${langs[l].html}" href="${pageUrl(page,l)}">`).join('\n');
  const absoluteOgImage = `${baseUrl}${ogImagePath}`;
  const robots = page === '404.html' ? '  <meta name="robots" content="noindex,follow">\n' : '';
  return `<!-- i18n:head -->
${robots}  <meta name="description" content="${escapeAttr(description)}">
  <link rel="canonical" href="${canonical}">
${hrefs}
  <link rel="alternate" hreflang="x-default" href="${pageUrl(page,'ja')}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Daitora Group">
  <meta property="og:title" content="${escapeAttr(title)}">
  <meta property="og:description" content="${escapeAttr(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:locale" content="${lang === 'ja' ? 'ja_JP' : lang === 'en' ? 'en_US' : lang === 'ko' ? 'ko_KR' : lang === 'zh-TW' ? 'zh_TW' : 'zh_CN'}">
  <meta property="og:image" content="${absoluteOgImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeAttr(title)}">
  <meta name="twitter:description" content="${escapeAttr(description)}">
  <meta name="twitter:image" content="${absoluteOgImage}">
  <link rel="icon" href="${lang === 'ja' ? 'favicon.ico' : '../favicon.ico'}">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"Daitora Group","url":"${baseUrl}/","telephone":"+81-6-6710-9861","email":"${OFFICIAL_FACTS.email}","address":{"@type":"PostalAddress","postalCode":"551-0013","addressCountry":"JP","addressRegion":"大阪府","addressLocality":"大阪市大正区","streetAddress":"小林西2丁目10-3"}}</script>
  <!-- /i18n:head -->`;
}
function escapeAttr(s){ return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;'); }
function injectHead(html, lang, page){
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${langs[lang].html}"`);
  const title = lang === 'ja' ? meta[page]?.[0] : `${pageNames[page]?.[langIndex(lang)] || 'Daitora Group'} | Daitora Group`;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(title)}</title>`);
  html = html.replace(/<!-- i18n:head -->[\s\S]*?<!-- \/i18n:head -->\s*/g, '');
  html = html.replace(/(<meta name="viewport"[^>]*>)/, `$1\n  ${seoBlock(lang,page)}`);
  return html;
}
function preserveWhitespace(original, translated){
  const leading = original.match(/^\s*/)?.[0] || '';
  const trailing = original.match(/\s*$/)?.[0] || '';
  return `${leading}${translated}${trailing}`;
}
function semanticKeyForText(text, stack, page) {
  const trimmed = text.trim();
  const parent = stack.at(-1);
  const explicit = parent?.attrs?.['data-i18n-key'];
  if (explicit && SEMANTIC_LOCKS[explicit]) return explicit;

  const inPrimaryNav = stack.some((item) => item.name === 'nav' && /(?:^|\s)nav(?:\s|$)/.test(item.attrs.class || ''));
  if (inPrimaryNav && parent?.name === 'a') {
    const href = (parent.attrs.href || '').split('#')[0].split('/').pop();
    const keyByHref = {
      'index.html': 'nav.home',
      'about.html': trimmed === '会社概要' ? 'nav.company' : 'nav.about',
      'business.html': 'nav.business',
      'quality.html': 'nav.quality',
      'works.html': 'nav.works',
      'news.html': 'nav.news',
      'contact.html': 'nav.contact'
    };
    if (keyByHref[href]) return keyByHref[href];
  }
  if (parent?.name === 'a' && /(?:^|\s)header-cta(?:\s|$)/.test(parent.attrs.class || '')) return 'nav.contact';
  if (page === 'contact.html' && trimmed === 'お問い合わせ') return 'contact.inquiry';
  return '';
}

function translateTextNode(text, lang, page, stack){
  if (lang === 'ja') return text;
  const trimmed = text.trim();
  if (!trimmed) return text;
  const semanticKey = semanticKeyForText(text, stack, page);
  const translated = (semanticKey && SEMANTIC_LOCKS[semanticKey]?.[lang])
    || finalLockDict[lang].get(trimmed)
    || pageDict[page]?.[lang]?.get(trimmed)
    || dict[lang].get(trimmed);
  if (translated) return preserveWhitespace(text, translated);
  return text;
}
function translateSafeAttributes(tag, lang, page){
  if (lang === 'ja') return tag;
  return tag.replace(/\s(placeholder|aria-label|title|alt|value)="([^"]*)"/g, (match, attr, value) => {
    const translated = finalLockDict[lang].get(value.trim()) || pageDict[page]?.[lang]?.get(value.trim()) || dict[lang].get(value.trim());
    return translated ? ` ${attr}="${escapeAttr(translated)}"` : match;
  });
}
function parseTag(tag) {
  const name = tag.match(/^<\s*([\w-]+)/)?.[1]?.toLowerCase() || '';
  const attrs = {};
  for (const [, key, value] of tag.matchAll(/\s([\w:-]+)="([^"]*)"/g)) attrs[key.toLowerCase()] = value;
  return { name, attrs };
}
function translate(html, lang, page){
  if (lang === 'ja') return html;
  const protectedBlocks = [];
  html = html.replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/gi, (block) => {
    const token = `@@DAITORA_PROTECTED_${protectedBlocks.length}@@`;
    protectedBlocks.push(block);
    return token;
  });
  const parts = html.split(/(<[^>]+>)/g);
  const stack = [];
  const voidTags = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
  html = parts.map((part) => {
    if (!part.startsWith('<')) return translateTextNode(part, lang, page, stack);
    if (/^<\//.test(part)) {
      const closing = part.match(/^<\/\s*([\w-]+)/)?.[1]?.toLowerCase();
      while (stack.length) if (stack.pop().name === closing) break;
      return part;
    }
    const translatedTag = translateSafeAttributes(part, lang, page);
    if (!/^<!|^<\?/.test(part)) {
      const parsed = parseTag(part);
      if (parsed.name && !voidTags.has(parsed.name) && !/\/\s*>$/.test(part)) stack.push(parsed);
    }
    return translatedTag;
  }).join('');
  protectedBlocks.forEach((block, index) => {
    html = html.replace(`@@DAITORA_PROTECTED_${index}@@`, block);
  });
  return html;
}
function adjustPaths(html, lang){
  if (lang === 'ja') return html;
  html = html.replace(/(data-desktop-videos|data-mobile-videos)="([^"]*)"/g, (match, attrName, value) => {
    const localized = value.split(',').map((item) => {
      const source = item.trim();
      return source.startsWith('assets/') ? `../${source}` : source;
    }).join(',');
    return `${attrName}="${localized}"`;
  });
  html = html.replace(/(href|src)="assets\//g, '$1="../assets/');
  html = html.replace(/data-poster="assets\//g, 'data-poster="../assets/');
  html = html.replace(/url\('assets\//g, "url('../assets/");
  html = html.replace(/url\("assets\//g, 'url("../assets/');
  html = html.replace(/src="assets\//g, 'src="../assets/');
  html = html.replace(/href="favicon\.ico"/g, 'href="../favicon.ico"');
  return html;
}
function setFormLanguage(html, lang){
  html = html.replace(/航班号・便名/g, '航空便名').replace(/行李数量/g, '手荷物数');
  if (!html.includes('data-contact-form')) return html;
  if (html.includes('name="site_language"')) {
    html = html.replace(/<input type="hidden" name="site_language" value="[^"]*">/, `<input type="hidden" name="site_language" value="${langs[lang].html}">`);
  } else {
    html = html.replace(/(<form[^>]*data-contact-form[^>]*>)/, `$1\n          <input type="hidden" name="site_language" value="${langs[lang].html}">`);
  }
  return html;
}
function setJapanTravelLink(html, lang){
  if (!html.includes('data-japan-travel-link')) return html;
  return html.replace(/(<a\b[^>]*data-japan-travel-link[^>]*\bhref=")[^"]*(")/i, `$1${japanTravelUrls[lang]}$2`);
}
function localizedPath(page, lang){
  if (lang === 'ja') return page;
  return page;
}
function fixCompanyRedirect(html, lang){
  if (!html.includes('Company profile has moved')) return html;
  const target = 'about.html#company-profile';
  const messages = {
    ja: ['会社概要は移動しました。','自動的に移動しない場合は、下記のボタンから会社概要をご覧ください。','会社概要を見る'],
    'zh-CN': ['公司概要页面已移动。','如果页面没有自动跳转，请使用下方按钮查看公司概要。','查看公司概要'],
    en: ['Company profile has moved.','If you are not redirected automatically, please use the button below.','View company profile'],
    ko: ['회사 개요 페이지가 이동되었습니다.','자동으로 이동하지 않는 경우 아래 버튼으로 회사 개요를 확인해 주세요.','회사 개요 보기'],
    'zh-TW': ['公司概要頁面已移動。','如果頁面沒有自動跳轉，請使用下方按鈕查看公司概要。','查看公司概要']
  };
  const [title, copy, button] = messages[lang] || messages.ja;
  html = html.replace(/content="0; url=[^"]*"/, `content="0; url=${target}"`);
  html = html.replace(/location\.replace\('[^']*'\)/, `location.replace('${target}')`);
  html = html.replace(/<h1 class="section-title">[\s\S]*?<\/h1>/, `<h1 class="section-title">${title}</h1>`);
  html = html.replace(/<p class="section-copy">[\s\S]*?<\/p>/, `<p class="section-copy">${copy}</p>`);
  html = html.replace(/<a class="button" href="[^"]*">[\s\S]*?<\/a>/, `<a class="button" href="${target}">${button}</a>`);
  return html;
}
function langSpecificCss(html, lang){
  const cls = `lang-${lang.toLowerCase()}`;
  return html.replace(/<body([^>]*)>/, (m, attrs) => {
    const next = attrs.replace(/\sclass="[^"]*"/, '');
    return `<body${next} class="${cls}">`;
  });
}


function writePage(lang, page){
  let html = fs.readFileSync(path.join(ROOT,page),'utf8');
  html = injectHead(html, lang, page);
  html = setFormLanguage(html, lang);
  html = translate(html, lang, page);
  html = setJapanTravelLink(html, lang);
  html = injectSwitchers(html, lang, page);
  html = langSpecificCss(html, lang);
  html = adjustPaths(html, lang);
  if (page === 'company.html') html = fixCompanyRedirect(html, lang);
  const outDir = lang === 'ja' ? ROOT : path.join(ROOT, langs[lang].dir);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, page), html, 'utf8');
}

for (const lang of Object.keys(langs)) for (const page of pages) writePage(lang,page);

const sitemapUrls = [];
for (const page of pages.filter(p=>p!=='404.html' && p!=='company.html')) {
  for (const lang of Object.keys(langs)) {
    const alts = Object.keys(langs).map(l=>`    <xhtml:link rel="alternate" hreflang="${langs[l].html}" href="${pageUrl(page,l)}" />`).join('\n');
    sitemapUrls.push(`  <url>\n    <loc>${pageUrl(page,lang)}</loc>\n${alts}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(page,'ja')}" />\n  </url>`);
  }
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemapUrls.join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(ROOT,'sitemap.xml'), sitemap, 'utf8');
