# edn-project

Bootstrap 5.3 + Sass 7-1 + Vite + EJS + Node.js + GitHub Pages 多頁面練習專案。

## 技術選型

- Windows + VS Code 終端機開發
- Vite MPA，多頁面：`index`、`about`、`product`、`contact`
- EJS partial：共用 `head`、`header/nav menu`、`footer`
- Bootstrap 5.3.3：練習階段先完整匯入
- Sass 7-1：用 `src/scss/all.scss` 匯整所有 SCSS 路徑
- `sass@1.77.6`：刻意鎖版，避免 Bootstrap 5.3.x 搭配新版 Dart Sass 出現大量 deprecation warnings
- `gh-pages`：將 `dist/` 發布到 GitHub Pages 的 `gh-pages` branch

## 專案結構

```txt
edn-project/
├─ public/
│  ├─ favicon.svg
│  └─ assets/
│     └─ images/
├─ src/
│  ├─ ejs/
│  │  └─ partials/
│  │     ├─ head.ejs
│  │     ├─ header.ejs
│  │     └─ footer.ejs
│  ├─ js/
│  │  ├─ main.js
│  │  └─ pages/
│  │     ├─ index.js
│  │     ├─ about.js
│  │     ├─ product.js
│  │     └─ contact.js
│  └─ scss/
│     ├─ all.scss
│     ├─ abstracts/
│     │  ├─ _functions.scss
│     │  ├─ _mixins.scss
│     │  ├─ _variables.scss
│     │  └─ _variables-dark.scss
│     ├─ base/
│     ├─ components/
│     ├─ layout/
│     ├─ pages/
│     ├─ themes/
│     └─ vendors/
│        └─ _bootstrap.scss
├─ index.html
├─ about.html
├─ product.html
├─ contact.html
├─ vite.config.mjs
├─ package.json
└─ .gitignore
```

## Windows + VS Code 開發流程

### 1. 確認 Node.js

建議使用 Node.js 20 LTS 或以上。

```powershell
node -v
npm -v
```

### 2. 安裝依賴

```powershell
cd edn-project
npm install
```

### 3. 啟動開發伺服器

```powershell
npm run dev
```

瀏覽器開啟終端機顯示的網址，通常是：

```txt
http://localhost:5173/
```

### 4. 打包

```powershell
npm run build
```

輸出會在 `dist/`。此資料夾已被 `.gitignore` 排除，不建議提交到 main branch。

### 5. 本機預覽打包結果

```powershell
npm run preview
```

## Bootstrap Sass 客製化重點

### 變數修改位置

主要改這兩個檔案：

```txt
src/scss/abstracts/_variables.scss
src/scss/abstracts/_variables-dark.scss
```

例如：

```scss
$primary: #b60005;
$font-family-base: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans TC', sans-serif;
$body-bg-dark: #111827;
$link-color-dark: #ff8a8d;
```

### 為什麼不用最新版 sass？

Bootstrap 5.3.x 仍大量使用 Sass `@import` 與部分舊式 Sass 寫法。最新版 Dart Sass 會出現許多 deprecation warnings。這不一定會造成編譯失敗，但會干擾學習與開發判讀。

本專案在 `package.json` 中固定：

```json
"sass": "1.77.6"
```

未來 Bootstrap 官方完全遷移到新版 Sass API 後，再考慮升級。

## EJS partial 使用方式

每個 HTML 頁面都可以共用：

```ejs
<%- include('src/ejs/partials/head.ejs') %>
<%- include('src/ejs/partials/header.ejs') %>
<%- include('src/ejs/partials/footer.ejs') %>
```

頁面的 title、description、nav active 狀態由 `vite.config.mjs` 裡的 `pages` 設定集中管理。

## 每頁 JS

每頁都有自己的 JS entry：

```txt
src/js/pages/index.js
src/js/pages/about.js
src/js/pages/product.js
src/js/pages/contact.js
```

每頁 JS 都會先載入：

```js
import '../main.js';
```

`main.js` 會載入：

```js
import '../scss/all.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
```

這樣 Bootstrap CSS、Bootstrap JS 與共用 JS 都會進入 Vite 流程。

## GitHub Pages 部署流程

### 1. 建立 GitHub repo

建議 repo 名稱與專案一致：

```txt
edn-project
```

### 2. 初始化 Git

```powershell
git init
git add .
git commit -m "init edn-project"
git branch -M main
git remote add origin https://github.com/YOUR_ACCOUNT/edn-project.git
git push -u origin main
```

請把 `YOUR_ACCOUNT` 換成你的 GitHub 帳號。

### 3. 部署到 gh-pages

```powershell
npm run deploy
```

這個指令會：

1. 執行 `vite build`
2. 產生 `dist/`
3. 用 `gh-pages -d dist` 將打包結果推到 `gh-pages` branch

### 4. GitHub Pages 設定

到 GitHub repo：

```txt
Settings → Pages → Build and deployment
```

設定：

```txt
Source: Deploy from a branch
Branch: gh-pages
Folder: /root
```

### 5. 網址

若 repo 名稱是 `edn-project`，網址通常會是：

```txt
https://YOUR_ACCOUNT.github.io/edn-project/
```

`vite.config.mjs` 已設定正式 build 時的 base：

```js
base: command === 'build' ? '/edn-project/' : '/',
```

如果 repo 名稱改掉，請同步修改 `repoName`。

## .gitignore 注意事項

本專案已排除：

```gitignore
node_modules/
/dist/
/.vite/
.env
.env.*
```

`node_modules/` 不要上傳，因為可用 `npm install` 還原。

`dist/` 不要提交到 main branch，部署時會由 `gh-pages` 套件發布到 `gh-pages` branch。

`public/` 是 Vite 的靜態來源資料夾，若裡面放 favicon、圖片、公開靜態資源，通常可以提交。若你有放大型素材或臨時檔，建議另外建立忽略規則。

## 下一步練習建議

1. 在 `_variables.scss` 改 `$primary`，觀察 Bootstrap button、badge、link 是否一起變色。
2. 在 `_variables-dark.scss` 改深色模式變數，並在 `<html>` 加上 `data-bs-theme="dark"` 測試。
3. 把 `vendors/_bootstrap.scss` 改成只引入用到的 Bootstrap 元件，觀察 CSS 體積變化。
4. 在 `src/js/pages/contact.js` 加入表單驗證練習。

---

## 專案常用 Git 指令速查

以下指令以 Windows + VS Code 終端機為主，建議在專案根目錄 `edn-project/` 執行。

### 1. 第一次建立 Git 版本控制

```powershell
cd edn-project
git init
git status
git add .
git commit -m "init project"
```

說明：

- `git init`：讓目前資料夾開始被 Git 管理。
- `git status`：查看目前有哪些檔案新增、修改或尚未追蹤。
- `git add .`：把目前所有變更加入暫存區。
- `git commit -m "init project"`：建立第一個版本紀錄。

### 2. 連接 GitHub 遠端 repo

請先到 GitHub 建立一個空 repo，例如：`edn-project`。

```powershell
git branch -M main
git remote add origin https://github.com/YOUR_ACCOUNT/edn-project.git
git remote -v
git push -u origin main
```

請把 `YOUR_ACCOUNT` 換成自己的 GitHub 帳號。

說明：

- `git branch -M main`：把主要分支命名為 `main`。
- `git remote add origin ...`：設定 GitHub 遠端位置。
- `git remote -v`：確認遠端 repo 是否設定成功。
- `git push -u origin main`：第一次推送 main 分支，並建立預設追蹤關係。

### 3. 日常開發最常用流程

```powershell
git status
git add .
git commit -m "update page layout"
git push
```

建議 commit message 寫清楚這次做了什麼，例如：

```powershell
git commit -m "add product page cards"
git commit -m "update bootstrap theme variables"
git commit -m "fix contact form layout"
git commit -m "refactor ejs header partial"
```

### 4. 查看版本紀錄

```powershell
git log
```

若想用比較簡潔的方式查看：

```powershell
git log --oneline --graph --decorate --all
```

### 5. 查看檔案差異

查看尚未加入暫存區的變更：

```powershell
git diff
```

查看已加入暫存區、準備 commit 的變更：

```powershell
git diff --staged
```

### 6. 取消或還原變更

還原某個尚未 commit 的檔案：

```powershell
git restore src/scss/all.scss
```

還原全部尚未 commit 的變更：

```powershell
git restore .
```

把已經 `git add` 的檔案移出暫存區，但保留檔案內容：

```powershell
git restore --staged src/scss/all.scss
```

### 7. 分支操作

建立新分支：

```powershell
git switch -c feature/header-layout
```

查看所有分支：

```powershell
git branch
```

切回 main：

```powershell
git switch main
```

把功能分支合併回 main：

```powershell
git switch main
git merge feature/header-layout
```

刪除已合併的本機分支：

```powershell
git branch -d feature/header-layout
```

### 8. 拉取遠端最新版本

```powershell
git pull
```

如果多人協作，建議每天開始開發前先執行：

```powershell
git switch main
git pull origin main
```

### 9. 常見衝突處理流程

當 `git pull` 或 `git merge` 出現 conflict 時：

```powershell
git status
```

打開 VS Code 內標示衝突的檔案，手動選擇要保留的內容後：

```powershell
git add .
git commit -m "resolve merge conflict"
git push
```

### 10. 修改最近一次 commit 訊息

如果 commit 後發現訊息寫錯，而且還沒 push：

```powershell
git commit --amend -m "update correct commit message"
```

若已經 push 到遠端，不建議新手隨意 amend，以免影響協作者。

### 11. 暫存目前做到一半的工作

當你做到一半，但需要先切換分支：

```powershell
git stash
```

取回剛剛暫存的工作：

```powershell
git stash pop
```

查看 stash 清單：

```powershell
git stash list
```

### 12. GitHub Pages 部署相關指令

本專案使用 `gh-pages` 套件部署 `dist/`。

先確認本機可以正常 build：

```powershell
npm run build
```

部署到 GitHub Pages：

```powershell
npm run deploy
```

部署後，GitHub 會產生或更新 `gh-pages` 分支。

若 repo 名稱為 `edn-project`，GitHub Pages 網址通常是：

```txt
https://YOUR_ACCOUNT.github.io/edn-project/
```

### 13. 不該上傳的檔案

本專案 `.gitignore` 已排除常見不該提交的檔案：

```gitignore
node_modules/
/dist/
/.vite/
.env
.env.*
```

注意：

- `node_modules/` 不要上傳，因為其他人可透過 `npm install` 還原。
- `dist/` 不要提交到 `main`，因為它是 build 產物，部署時會推到 `gh-pages` 分支。
- `.env`、`.env.*` 可能包含金鑰或私密設定，不要上傳。
- `public/` 是 Vite 的公開靜態來源資料夾，若放正式圖片、favicon、公開素材，可以提交；若放暫存圖、大型原始檔或客戶未公開素材，請另外加入 `.gitignore`。

### 14. 推薦的開發節奏

```powershell
git switch main
git pull origin main
git switch -c feature/page-update
npm run dev
```

完成修改並確認畫面正常後：

```powershell
git status
git add .
git commit -m "update page content"
git switch main
git merge feature/page-update
git push origin main
npm run deploy
```

這樣可以讓：

1. `main` 保持乾淨穩定。
2. 每個功能或頁面調整都有獨立分支。
3. 部署前先確認本機開發與 build 都正常。
