## Webpack 是做什麼用的？可以不用它嗎？

Webpack 是一個打包程式碼的工具，將眾多模組與資源打包成一包檔案，並將需要預先處理的內容編譯成瀏覽器看得懂的東西。在前端開發流程中，專案會建立和引入不少 css, js 或 img 檔案，甚至預處理工具及框架，預處理工具例如 PUG、SASS、Babel，框架如 Vue、React、Angular，因此像是 Webpack、Gulp、Grunt、Parcel、Browserify 等都是能協助編譯的自動化工具或模組整合工具。
此外，當專案相對大型時，越來越多的檔案會使得管理不易進行，Webpack 能將開發使用的檔案打包成經過處理的最佳化後的 JavaScript 檔案，專案能較容易被維護，適合用在大型的專案，但專案選擇不使用 Webpack 是可以的。

簡述 Webpack 幾種功能：

- 打包多個 .js 檔案成單一檔案
- 最小化、最佳化程式碼
- 編譯 LESS 或 SCSS 成 CSS
- 包含任何類型的檔案到 JavaScript: AMD/CMD/ES6 Modules、CSS、Images、JSON、LESS

## gulp 跟 webpack 有什麼不一樣？

gulp 提供自動化與流程管理，整合前端開發環境，例如自動刷新頁面，檢查語法、babel、編譯 scss、壓縮、重新整理、校正時間等，可減少開發者工作量，幫助提高效率。

Webpack 是一套模組整合工具（module bundler），用模組化的概念，將各種資源打包成能在瀏覽器上執行的程式碼。

簡而言之，Webpack 是 bundler 的角色，將資源打包，提供模組化開發方式。而 gulp 是 task manager，用於管理任務，建構自動化流程的工具。

## CSS Selector 權重的計算方式為何？

1. 行間樣式(inline)(style="width: 500px")，權重 (1, 0, 0, 0)
2. ID 選擇器(#idName)，權重 (0, 1, 0, 0)
3. class 選擇器(.className)、屬性選擇器([attr="value"])、偽類(:pseudo-class)，權重 (0, 0, 1, 0)
4. 元素選擇器(tagName)、偽元素(::pseudo-element)，權重 (0, 0, 0, 1)

- **`!important`會提升優先順序，加了之後此樣式有最高優先順序**
- _通用符號，子選擇器、相鄰選擇器等如 `*`, `>`, `~`, `+` 權重為 (0, 0, 0, 0)_
- _繼承的樣式沒有權重_

#### Sample

```css
ul > li {
}
/* 權重為 0, 0, 0, 2 */

li .tag {
}
/* 權重 0, 0, 1, 1 */

li .tag ~ li {
}
/* 權重 0, 0, 1, 2 */

form input[type='text'] {
}
/* 權重 0, 0, 1, 2 */

#app > .layout > .main .title > p::first-letter {
  font-size: 30px;
}
/* 權重 0, 1, 3, 2 */
```

**比較規則：**

- 1, 0, 0, 0 > 0, 1, 1, 1，從左往右逐個等級比較，前一等級相等才往後比。無論是行間、內部和外部樣式，都是依照此規則比較，而非僅直觀的行間(inline) > 內部(internal) > 外部(external) 樣式，或 id > class > 元素。
- 在權重相同的情況下，後面的樣式會覆蓋掉前面的樣式。
- 如出現樣式衝突，一般而言會以「後」書寫的樣式為準，後來的樣式會蓋過前面的樣式。

```html
<div class="test1 test2">
  <h1>I am an H1</h1>
  <h2>I am an H2</h2>
  <h2>I am an H2</h2>
</div>
```

```css
.test1 div > h2 {
  color: green;
}
/*權重值(0, 0, 1, 2)*/
.test2 h1 ~ h2 {
  color: red;
}
/*權重值(0, 0, 1, 2)*/
```
