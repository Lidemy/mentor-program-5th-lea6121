## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

| tag                       | description                                                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| <audio></audio>           | 用於播放聲音、音頻                                                                                                          |
| <blockquote></blockquote> | 用於引用一段長的引文（短引文建議使用 <q></q>，可加入 cite 屬性來標示引用來源。                                              |
| <figure></figure>         | HTML5 新增的標籤，主要用來放置圖片，通常會搭配 <figcaption></figcaption> 使用。透過這兩項元素能直接在圖片下方加上圖片說明。 |

## 請問什麼是盒模型（box model）

![Box Model](https://titangene.github.io/images/css-box-model/2019-09-29-07-51-24.png)

Box model 盒模型也稱為區塊模型，係由 margin, border, padding, content 所組成，分為上下左右四側，透過控制內距的 padding、控制外距的 margin 以及控制元素邊框的 border 屬性來調整網頁內容的呈現。

- margin：margin 預設值為零，用來控制元素與外部其他元素的距離，例如我家想跟隔壁公園間隔 30px &rArr; `margin-right: 30px`。
- border：用來設計元素邊框的顏色、粗細與樣式，例如我家圍欄想用超厚水泥牆 &rArr; `border: 10px solid #000`，或是較薄有縫隙的木板牆 &rArr; `border: 1px dashed #7d4633`。若要調整 border-width 需先調整 border-style (default 值為 none）後再進行寬度及顏色的設定，否則調多寬，顏色多亮麗都不會出現邊框。
- padding：用來控制與元素本身 (content) 的距離，即 box content 外的填充區域。假設 `padding: 30px` 可略解釋為我想把我家圍牆往四個方位拓展 30px。

另外，margin、padding、border 在 edge 的表示上都是相同寫法。

```
四個值（例如 padding: 10px 20px 40px 10px），即依照上、右、下、左（順時針）來看。
三個值（例如 margin: 40px 50px 10px)，分別為上方、左右、下方。
兩個值（例如 margin: 10px 50px)，即表示上下、左右。
一個值（例如 border-width: 10px)，即上下左右。
```

## 請問 display: inline, block 跟 inline-block 的差別是什麼？

1. `display: block`： block 為區塊元素，因其具有占滿一整行容器的性質，下個元素就不會並排而會換行呈現。另外，block 可以設定長寬、margin 和 padding。常見的區塊元素為 div, p, h1~h6, ul, li 等。如果希望 inline 元素（例如 span）佔滿整行容器來排版，則可以設定 `display: block` 的方式來達成需求。
2. `display: inline`：inline 為行內元素，inline 元素會是以並排呈現，元素的寬高係根據內容大小來撐開，因此無法設定寬高，排版亦不會隨著設定 margin 和 padding 而有所改變，意思就是 inline 上下的內容並不會因爲 inline 元素設定 margin 和 padding 而被撐開。像 span, input, a, img, label 等都屬 inline 標籤。若希望 block 元素（如 div) 能並排陳列，就可對該 div 設定 `display: inline`。
3. `display: inline-block`： inline-block 行內區塊就是一個血統讚的混血兒，結合了上述 block 和 inline 的優點，排版可像 inline 元素並排不占滿一整行容器，並可像 block 元素一樣設定寬高、調整 margin 和 padding。如想針對 div 進行並排，同時希望他保有調整寬高、margin 和 padding 的特質，就將其設定為 `display: inline-block`。

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

- `position: static`：static 是預設值。`position: static` 的元素依照著瀏覽器預設的配置自動排版在頁面上。
- `position: relative 相對定位`：以自己原本顯示的位置為基準位置來移動。在設定為 position: relative 的元素內設定 top、right、bottom 和 left 屬性可讓元素以其原本該出現的位置進行相對調整，但不會改變其他元素本來的位置。
  這個屬性值大多使用在：
  1. 設定絕對配置(position: absolute)的基準元素時
  2. 希望元素調整位置，或指定圖層的上下順序時
- `position: absolute 絕對定位`：想脫離原本預設的版面配置並自由指定配置位置的話，可設定 position: absolute。absolute 係以設定父層元素為基準元素作絕對位移，如果套用 position: absolute 的元素的上層容器沒有「可以被定位」的元素（除了 position: static 以外，其他元素都屬可被定位元素），那設定為 position: absolute 的元素會以 body 元素（整個視窗）為基準。absolute 和 relative 都可達到調整位置的效果，但區塊設定 absolute 後，原本佔的空間會不見，後續的內容會自動遞補上來（像筆記本上黏貼便利貼，後面寫的內容就會寫在原本它會佔的位置）。
- `position: fixed 固定定位`：以瀏覽器視窗來定位，元素不會隨著頁面滾動消失，而會固定在視窗上相同的位置。可使用 top、right、bottom 和 left 屬性來定位，常應用在網頁的 <回到上方> 按鈕等。

**left、top、right、bottom 語法和 z-index 語法只有當 position 屬性非 static 時才有效**
