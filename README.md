# Osaka 2027 🏯

大阪・關西旅行 App，2027/1/15–1/21，子庭和彥文兩個人一起用。

手機用 Safari 打開後按「分享 → 加入主畫面」，就能像 App 一樣用，離線也看得到行程。

## 功能

- **行程**：每天的時間表，現在進行到哪一項會標出來
- **名單**：想去的地方、投票、排進行程
- **地圖**：大阪關西的口袋地圖，可以把地點加進名單
- **記帳**：誰付了什麼、自動分帳、日圓和台幣換算
- **資訊**：航班、行李清單、緊急聯絡電話

## 技術

- 單一靜態頁 `index.html`，放在 GitHub Pages
- 資料存在 Firebase Firestore，不用登入，兩個人即時同步。大阪的資料放在 `trips/<trip>/osaka/2027/` 底下，和峇里島那趟的資料分開
- `sw.js` 做離線快取，`manifest.webmanifest` 讓它能加到主畫面
- 地圖用 Leaflet，底圖是 OpenStreetMap 海岸線、琵琶湖和主要道路自己做的向量圖層（`basemap.json`）
- 天氣來自 Open-Meteo，出發前 16 天內才會顯示

## 檔案

| 路徑 | 內容 |
| --- | --- |
| `index.html` | 整個 App |
| `seed.json` | 第一次開啟時寫進資料庫的備忘和打包清單 |
| `firestore.rules` | 資料庫權限 |
| `img/` | 每天的封面照片（Wikimedia Commons，CC 授權） |
