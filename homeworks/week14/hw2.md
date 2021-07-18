## 部署紀錄

#### 註冊會員

- 到 AWS 註冊 (https://aws.amazon.com/tw/)，註冊過程中選擇免費方案。註冊成功會出現註冊成功頁面。點選前往主控台後網頁會讓你重新登入，選 root user

#### 主控台設定

- 登入成功後出現該頁面後點選

  ![](https://github.com/lea6121/img-storage/blob/main/img/_2021-07-13_9.57.15.png?raw=true)

  1. Step 1：選擇 Ubuntu Server 18.04 LTS (HVM),SSD Volume Type

     ![](https://github.com/lea6121/img-storage/blob/main/img/_2021-07-13_9.51.30.png?raw=true)

  2. Step 2：選擇綠色 free 方案

     ![](https://github.com/lea6121/img-storage/blob/main/img/_2021-07-13_10.02.01.png?raw=true)

  3. Step 3：不用編輯任何內容，按 Next

     ![](https://github.com/lea6121/img-storage/blob/main/img/_2021-07-13_10.04.24.png?raw=true)

  4. Step 4：同 3，不用編輯內容按 Next

     ![](https://github.com/lea6121/img-storage/blob/main/img/_2021-07-13_10.07.11.png?raw=true)

  5. Step 5：同 3、4，不用編輯內容按 Next

     ![](https://github.com/lea6121/img-storage/blob/main/img/_2021-07-13_10.09.38.png?raw=true)

  6. Step 6：按 add rule，選擇 HTTP 和 HTTPS，然後按下 Review and Launch

     ![](https://github.com/lea6121/img-storage/blob/main/img/_2021-07-13_10.11.42.png?raw=true)

  7. Step 7：本頁面是供 review 方才的設定們，按下 Launch

     ![](https://github.com/lea6121/img-storage/blob/main/img/_2021-07-13_10.16.11.png?raw=true)

  8. 會跳出一個的視窗，選擇 create a new key 和輸入檔名，按下 download

     ![](https://github.com/lea6121/img-storage/blob/main/img/_2021-07-13_10.19.11.png?raw=true)

     download 完後按下 Launch Instance

     ![](https://github.com/lea6121/img-storage/blob/main/img/_2021-07-13_10.22.27.png?raw=true)

     記下 IPv4 位址，打開終端機，輸入指令：

     ```
     chmod 400 <私鑰檔案路徑>
     ssh -i "<私鑰檔案路徑>" ubuntu@<公有 IPv4 位址>
     ```

     虛擬主機連線完成

     ### 設定 LAMP

     「L」表示「Linux」作業系統，「A」表示「Apache」網頁伺服器，「M」表示「MySQL」資料庫，「P」表示「PHP」程式語言，而 phpMyAdmin 則是以 PHP 作為基礎的資料庫管理工具。

     1. 更新 ubuntu 系統

        ```
        $ sudo apt update && sudo apt upgrade && sudo apt dist-upgrade
        ```

        跳出訊息，輸入：Y

     2. 安裝 Tasksel

        ```
        $ sudo apt install tasksel
        ```

        跳出訊息，輸入：Y

     3. 用 Tasksel 下載 lamp-server

        ```
        $ sudo tasksel install lamp-server
        ```

        輸入指令後會跑出一個下載中的紫色視窗

        ![](https://github.com/lea6121/img-storage/blob/main/img/_2021-07-13_10.50.20.png?raw=true)

        結束後可在網址欄輸入 IPv4 位置，可以看到 Apache Ubuntu Default Page

     #### 設定 phpmyadmin

     1. 下載 phpmyadmin

     ```
     $ sudo apt install phpmyadmin
     ```

     選 Y。會跳出紫色視窗，選擇 apache2（按空白鍵會顯示＊字號，再按 Enter）

     ![](https://github.com/lea6121/img-storage/blob/main/img/_2021-07-13_10.57.20.png?raw=true)

     ![](https://github.com/lea6121/img-storage/blob/main/img/_2021-07-13_10.58.44.png?raw=true)

     按 enter

     設定密碼

     ![](https://github.com/lea6121/img-storage/blob/main/img/_2021-07-13_11.02.02.png?raw=true)

     設定後按下 enter。確認密碼，再輸入一次按下 enter。完成

     #### 設置 phpmyadmin 密碼

     1. 改變 phpmyadmin 登入的設定，改成可以用密碼登入

        ```
        $ sudo mysql -u root mysql

        接著輸入

        $ UPDATE user SET plugin='mysql_native_password' WHERE User='root';
        $ FLUSH PRIVILEGES;
        $ exit;
        ```

        ![](https://github.com/lea6121/img-storage/blob/main/img/_2021-07-13_11.11.28.png?raw=true)

     2. 設定 root 的密碼

        ```
        $ sudo mysql_secure_installation
        ```

        選 Y 後會跳出選擇密碼強度

     3. 密碼規格選擇，有三個選項，選了 0。

        ![](https://github.com/lea6121/img-storage/blob/main/img/_2021-07-13_11.11.28.png?raw=true)

     4. 設定密碼：

        是否設定密碼？`$y`
        後續問題都可以選 `$y`

        最後會出現 All Done

        ![](https://github.com/lea6121/img-storage/blob/main/img/_2021-07-13_11.07.34.png?raw=true)

     5. 在瀏覽器輸入 http://<IPv4 位址>/phpmyadmin/) 就可以看到 phpmyadmin 的頁面

     #### 放檔案

     ```
     1. cd ..
     2. cd ..
     3. ls // 有找到 var 資料夾
     4. cd var/www/html // 但是輸入這串他跟我說 directory is not found
     ```

     當下惶恐還嘗試自己創建 www 和 html 資料夾然後把網頁丟進去，但輸入網址發現出現了 not found

     ![](https://github.com/lea6121/img-storage/blob/main/img/_2021-07-13_3.23.22.png?raw=true)

     後來把東西丟估狗在找解決方法的過程突然意識到是因為已經和主機 disconnect 了所以沒找到那個資料夾，於是重新連線

     ```
     chmod 400 <私鑰檔案路徑>
     ssh -i "<私鑰檔案路徑>" ubuntu@<公有 IPv4 位址>
     ```

     接著試著建立檔案看看

     ```
     $ touch index.php // 這時候會說沒有 permission
     $ sudo chown ubuntu /var/www/html // 修改權限，再重新輸入一次上面那行就成功
     ```

     #### FileZilla 連線

     點選左上角的站台管理員圖示。

     協定選 SFTP
     主機名稱是公有 IPv4 DNS 那一串
     登入形式選擇金鑰檔案
     使用者名稱是預設 ubuntu
     接著放上金鑰檔案

     連線成功，丟檔案進去也成功～把 conn.php 更改了下，部署 blog 成功

     #### 購買網域

     到 https://www.gandi.net/zh-Hant 註冊後購買網域（有另外找了 freedom 不過輸了幾個名稱發現也是沒有免費）

     在 Gandi 購買後在左側選域名的 tag，點選區域檔紀錄。將類型 A 的值改為 AWS IPv4 位址。網域設定完成（需要等一段時間才會看到網站）

### Reference

[[紀錄] 部屬 AWS EC2 雲端主機 + LAMP Server + phpMyAdmin](https://mtr04-note.coderbridge.io/2020/09/15/-%E7%B4%80%E9%8C%84-%08-%E9%83%A8%E5%B1%AC-aws-ec2-%E9%9B%B2%E7%AB%AF%E4%B8%BB%E6%A9%9F-/)

[安裝 LAMP Server + phpMyAdmin 在 Linux 系統上輕鬆架設網站](https://magiclen.org/lamp/)

[部署 AWS EC2 遠端主機 + Ubuntu LAMP 環境 + phpmyadmin · Issue #15 · Lidemy/mentor-program-2nd-yuchun33](https://github.com/Lidemy/mentor-program-2nd-yuchun33/issues/15)
