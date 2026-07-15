# Daitora Group Content Verification

このファイルは、公開前に確認が必要な表現・リンク・事実情報を整理するための確認表です。

## Must Confirm Before Public Release

| Item | Current Website Wording | Verification Needed | Owner |
| --- | --- | --- | --- |
| Vehicle network | グループ全体で約100台規模 | 対象範囲、稼働車両、提携車両を含むかを確認 | Daitora |
| Offices / operating bases | 大阪・京都・堺・港区など関西複数拠点 | 各拠点の正式名称、公開可否、住所公開範囲を確認 | Daitora |
| Airport coverage | KIX / ITM / UKB | 対応範囲、予約受付条件、運行主体を確認 | Daitora |
| Permits / licenses | 許認可に基づく合法運行体制 | 許認可番号、表記名、掲載可否を確認 | Daitora |
| G20 Osaka references | G20大阪サミット関連送迎 | 公開可能な範囲、具体表現、守秘上の制限を確認 | Daitora |
| EXPO2025 references | EXPO2025 大阪・関西万博 要人送迎業務 | 契約表現、公開可否、日付、担当範囲を確認 | Daitora |
| Brand event references | フランス大手ブランドメーカー / 海外ブランドイベント | 顧客名非公開方針、表現の粒度を確認 | Daitora |
| Kyoto office | 京都府京都市伏見区竹田東小屋ノ内町95 / 075-585-7429 | 住所・電話番号・公開可否を確認 | Daitora |
| Main contact | 06-6710-9861 / info@daitora-jp.com | 代表番号・受付メールの公開可否を確認 | Daitora |
| Auto loan link | /autoloan/ | 本番ドメインでのルーティング、SSL、フォーム受付先を確認 | Web / Daitora |
| Taxi app links | DiDi / Uber | 正式掲載 URL、掲載条件、導線の有無を確認 | Daitora |
| Media rights | Hero videos and site images | すべての画像・動画の利用権、商用利用可否、クレジット要否を確認 | Web / Daitora |

## Recommended Wording Policy

- 顧客名・案件詳細は公開承認がない限り出さない。
- 「公開できる範囲」「関連送迎」「担当しました」など、守秘に配慮した表現を優先する。
- 「必ず」「最高」「格安」「審査なし」「誰でもOK」など断定・誇張・金融リスクのある表現は使わない。
- 許認可・車両台数・営業拠点・実績は、公開前に原資料で確認する。

## Form / Conversion Notes

- `contact.html` の問い合わせフォームは静的デモ状態です。
- 公開時は `window.DAITORA_CONTACT_FORM_URL` に正式な受付 API URL を設定してください。
- 受付 API が未設定の場合、フォームは成功表示を出さず、電話・メール連絡を案内します。
- `/autoloan/` は完成済み別ページとして扱い、このサイト側ではリンクのみ使用しています。
