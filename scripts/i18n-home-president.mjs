const t = (ja, zhCN, en, ko, zhTW) => ({ ja, 'zh-CN': zhCN, en, ko, 'zh-TW': zhTW });

export const HOME_PRESIDENT_OVERRIDES = {
  '社長あいさつ': t('社長あいさつ', '社长致辞', 'Message from the President', '사장 인사말', '社長致辭'),
  '株式会社大寅は、2018年の創業以来、「安全・謙遜・迅敏」を社訓とし、人と社会に安心と信頼を届ける企業として歩んでまいりました。': t(
    '株式会社大寅は、2018年の創業以来、「安全・謙遜・迅敏」を社訓とし、人と社会に安心と信頼を届ける企業として歩んでまいりました。',
    '大寅股份有限公司自2018年创立以来，始终秉持“安全・谦逊・迅敏”的社训，致力于成为为人与社会带来安心与信赖的企业。',
    'Since its founding in 2018, Daitora Co., Ltd. has upheld Safety, Humility and Agility as its guiding principles and has worked to bring peace of mind and trust to people and society.',
    '주식회사 다이토라는 2018년 창업 이래 「안전・겸손・신속」을 사훈으로 삼고, 사람과 사회에 안심과 신뢰를 전하는 기업으로 성장해 왔습니다.',
    '大寅股份有限公司自2018年創立以來，始終秉持「安全・謙遜・迅敏」的社訓，致力成為為人與社會帶來安心與信賴的企業。'
  ),
  '現在、当社はハイヤー事業をはじめ、医療ツーリズム事業、デジタルマーケティング事業、中古車販売事業など、多様な分野で事業を展開しております。': t(
    '現在、当社はハイヤー事業をはじめ、医療ツーリズム事業、デジタルマーケティング事業、中古車販売事業など、多様な分野で事業を展開しております。',
    '目前，本公司以包车接送业务为主，同时开展医疗旅游、数字营销、二手车销售等多领域业务。',
    'Today, our operations span a wide range of fields, including chauffeur services, medical tourism, digital marketing and used car sales.',
    '현재 당사는 하이어 사업을 비롯해 의료 관광, 디지털 마케팅, 중고차 판매 등 다양한 분야에서 사업을 전개하고 있습니다.',
    '目前，本公司以包車接送業務為主，同時拓展醫療旅遊、數位行銷、中古車銷售等多元領域。'
  ),
  '事業の内容は異なりますが、私たちが目指すものは創業以来変わることはありません。': t(
    '事業の内容は異なりますが、私たちが目指すものは創業以来変わることはありません。',
    '尽管各项业务内容不同，但我们自创立以来所追求的目标始终不变。',
    'Although these businesses differ in nature, what we strive for has remained unchanged since our founding.',
    '사업의 내용은 서로 다르지만, 창업 이래 저희가 지향하는 바는 변함이 없습니다.',
    '儘管各項業務內容不同，但我們自創立以來所追求的目標始終不變。'
  ),
  'お客様に価値を提供し、信頼を築き、社会に必要とされる企業であり続けること。': t(
    'お客様に価値を提供し、信頼を築き、社会に必要とされる企業であり続けること。',
    '那就是为客户创造价值、建立信赖，并始终成为社会所需要的企业。',
    'It is to deliver value to our customers, build trust and remain a company that society needs.',
    '고객에게 가치를 제공하고 신뢰를 쌓으며, 사회에 필요한 기업으로 계속 존재하는 것입니다.',
    '那就是為客戶創造價值、建立信賴，並始終成為社會所需要的企業。'
  ),
  'その想いを支えているのが、「安全・謙遜・迅敏」という三つの価値観です。': t(
    'その想いを支えているのが、「安全・謙遜・迅敏」という三つの価値観です。',
    '支撑这一信念的，正是“安全・谦逊・迅敏”这三项价值观。',
    'This commitment is supported by three core values: Safety, Humility and Agility.',
    '그 뜻을 뒷받침하는 것이 바로 「안전・겸손・신속」이라는 세 가지 가치입니다.',
    '支撐這份信念的，正是「安全・謙遜・迅敏」這三項價值觀。'
  ),
  '安全とは、すべての判断の基準であり、責任ある行動の原点です。': t(
    '安全とは、すべての判断の基準であり、責任ある行動の原点です。',
    '安全，是一切判断的标准，也是负责任行动的起点。',
    'Safety is the standard for every decision and the foundation of responsible action.',
    '안전은 모든 판단의 기준이며 책임 있는 행동의 출발점입니다.',
    '安全，是一切判斷的標準，也是負責任行動的起點。'
  ),
  '謙遜とは、すべての人に敬意を持ち、感謝を忘れない姿勢です。': t(
    '謙遜とは、すべての人に敬意を持ち、感謝を忘れない姿勢です。',
    '谦逊，是尊重每一个人并常怀感恩的态度。',
    'Humility is an attitude of respect for every person and a commitment never to lose sight of gratitude.',
    '겸손은 모든 사람을 존중하고 감사하는 마음을 잊지 않는 자세입니다.',
    '謙遜，是尊重每一個人並常懷感恩的態度。'
  ),
  '迅敏とは、変化を恐れず、自ら考え、迅速に行動する力です。': t(
    '迅敏とは、変化を恐れず、自ら考え、迅速に行動する力です。',
    '迅敏，是不惧变化、主动思考并迅速行动的能力。',
    'Agility is the ability to embrace change, think independently and act swiftly.',
    '신속은 변화를 두려워하지 않고 스스로 생각하여 빠르게 행동하는 힘입니다.',
    '迅敏，是不懼變化、主動思考並迅速行動的能力。'
  ),
  '私たちは、この理念をすべての事業に共通する行動指針として、人づくりを大切にし、一人ひとりがプロフェッショナルとして成長できる企業を目&#8288;指&#8288;し&#8288;て&#8288;い&#8288;ま&#8288;す&#8288;。': t(
    '私たちは、この理念をすべての事業に共通する行動指針として、人づくりを大切にし、一人ひとりがプロフェッショナルとして成長できる企業を目&#8288;指&#8288;し&#8288;て&#8288;い&#8288;ま&#8288;す&#8288;。',
    '我们将这一理念作为所有业务共同的行动准则，重视人才培养，致力于建设让每个人都能成长为专业人才的企业。',
    'We apply these principles as a common code of conduct across all our businesses, value the development of our people and aim to be a company where every individual can grow as a professional.',
    '저희는 이 이념을 모든 사업에 공통되는 행동 지침으로 삼아 인재 육성을 소중히 여기며, 구성원 한 사람 한 사람이 전문가로 성장할 수 있는 기업을 지향합니다.',
    '我們將這一理念作為所有業務共同的行動準則，重視人才培育，致力打造讓每個人都能成長為專業人才的企業。'
  ),
  'そして、お客様、お取引先、地域社会とともに歩みながら、新しい価値を創造し、より豊かな未来に貢献してまいります。これからも、挑戦を続け、信頼され、必要とされる企業であり続けるために、社員一同さらなる努力を重ねてまいります。今後とも変わらぬご支援、ご愛顧を賜りますよう、心よりお願い申し上げます。': t(
    'そして、お客様、お取引先、地域社会とともに歩みながら、新しい価値を創造し、より豊かな未来に貢献してまいります。これからも、挑戦を続け、信頼され、必要とされる企業であり続けるために、社員一同さらなる努力を重ねてまいります。今後とも変わらぬご支援、ご愛顧を賜りますよう、心よりお願い申し上げます。',
    '同时，我们将与客户、合作伙伴及当地社会携手前行，创造新的价值，为更加美好的未来作出贡献。今后，为了持续挑战自我，成为值得信赖且不可或缺的企业，全体员工将继续不懈努力。衷心恳请各位今后继续给予我们一如既往的支持与厚爱。',
    'Together with our customers, business partners and local communities, we will continue to create new value and contribute to a more prosperous future. All of us at Daitora will continue to take on new challenges and redouble our efforts to remain a trusted and essential company. We sincerely ask for your continued support and patronage.',
    '또한 고객, 거래처, 지역사회와 함께 걸으며 새로운 가치를 창출하고 더욱 풍요로운 미래에 기여하겠습니다. 앞으로도 도전을 이어가며 신뢰받고 필요한 기업으로 남기 위해 임직원 모두가 더욱 노력하겠습니다. 앞으로도 변함없는 성원과 관심을 보내주시기를 진심으로 부탁드립니다.',
    '同時，我們將與客戶、合作夥伴及地方社會攜手前行，創造新的價值，為更美好的未來作出貢獻。今後，為了持續迎接挑戰，成為值得信賴且不可或缺的企業，全體員工將繼續不懈努力。衷心懇請各位今後繼續給予我們一如既往的支持與厚愛。'
  )
};
