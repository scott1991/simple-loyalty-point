# simple-loyalty-point

[DEMO](https://scott.is-a.dev/point)

這個fullstack專案製做一個簡易的客戶集點系統，提供兩個頁面:客戶端、結帳端。結帳端輸入金額後，客戶端輸入電話號碼確認就可以集點。點數與金額的比例可以透過config設定。專案前端使用 React.js，後端使用nodejs，資料庫使用MongoDB
該專案使用 [express-es6-spa-example](https://github.com/scott1991/express-es6-spa-example) 來初始化

![screenshot1](READMEassets/p1.png)
![screenshot2](READMEassets/p2.png)

## Tech Stack

- Node.js
- Express
- Mongoose
- MongoDB
- Socket.IO
- React.js
- Bootstrap 5

## Features

- **即時互動**：使用 `Socket.IO` 客戶端,結帳端,Server可以即時通訊，結帳端輸入金額後客戶端可以立即出現，客戶端輸入電話亦然不須重新整理
- **自訂比例**：可以透過修改`server/config.json`，決定消費金額和點數的比例
- **螢幕數字按鈕**：螢幕上顯示數字按鈕，方便平版等裝置使用。金額以計算機式排列，電話以電話式排列。
- **API可串接結帳**：結帳端可透過API呼叫輸入金額，方便與其他POS串接


## Installation
1. clone此專案，安裝依賴 `npm install`
2. 將 `server/config.js.example`重新命名為`config.js` ，並完整其內容(MongoDBURI)
3. `node index.js` 啟動程式
4. 在兩個端點分別點開`Employee`,`Customer`頁面

## Requirements

- Node.js (建議版本 12.20.0+)
