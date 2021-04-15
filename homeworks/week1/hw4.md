## 跟你朋友介紹 Git

Git 是一種版本控制的系統，當專案加入 Git 的控管後，Git 能幫助工程師紀錄每次 commit 的程式碼。
簡單來說， Git 滿像遊戲的存檔紀錄點。如果這次挑戰失敗，打怪陣亡，它可以讓你從上一個儲存點重新開始，不損失任何裝備。或如果對現在遊戲進度有不滿意的地方想重刷，它可以讓你回到最近的儲存記錄再來一遍。
Git 也能幫助工程師比對每個版本程式碼的差異，如果新 commit 的程式碼有 bug，它能協助比對新舊程式碼的差別，和協助這個版本的程式碼回到上個版本。
此外，Git 也會紀錄每次版本的更動紀錄，在多人協作的情形下，可以了解更動程式碼的原因（比如說網頁需要加入一個新功能），或是知道誰更動了程式碼，以便有問題時可以找對人解決（不是抓兇手）:)

所以，菜哥要管理他的笑話大全資料夾且成為笑話冠軍，就照以下步驟服用ㄅ：

1. 首先先打開你 Mac 的終端機，輸入 `brew install git` 安裝 git (此方式需先安裝 Homebrew，[Homebrew 安裝連結](https://brew.sh/index_zh-tw))
2. 完成後，可以輸入 `git --version` 確認是否有成功安裝 git 和 git 的版本資訊
3. 接著在終端機 cd 到菜哥的笑話資料夾位置，輸入 `git init` 。現在笑話資料夾受到 git 的管控了
4. 接著輸入指令 `git add .` 。這個步驟是把笑話資料夾裡的所有檔案加到「索引」裡，加到索引後才能進行下一個指令
5. 輸入指令 `git commit -m "輸入你的 commit 訊息，例如 add a new index.html"`，就成功把目前的索引狀態儲存到本地數據庫。
6. 如果菜哥想要把 local repo 放到雲端上面，可以使用雲端版本控制服務，這邊是使用 GitHub。 GitHub 註冊後，在網頁上點選 `new` 按鈕來 create a new repository
7. 在雲端 create 好 repo 後，複製雲端 repo 的位址(這邊用 https)，接著在 terminal 上輸入：
   `git remote add origin [your github repo https]`
8. 接著下指令 `git push --set-upstream [repo 簡稱][branch 名稱]`，就將本地端的 repo 推到遠端了
