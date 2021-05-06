## 請以自己的話解釋 API 是什麼

我會將 API 比喻為一名服務生。
網頁前端像是餐廳外場，網頁後端像是餐廳內場，API 是服務生，負責雙方資訊的交流和傳遞。外場顧客向服務生點餐後，服務生會將訂單內容傳達給內場的工作人員。當廚師收到需求完成餐點後，亦透過服務生將餐點提供給顧客。
如果這時候餐廳規模更大時（從餐廳拓展業務變成一家飯店之類的)，這時候會有更多類型的「服務生」穿梭在這個場域。例如這位服務生負責將客戶訂房要求傳達給飯店的工作人員，工作人員收到需求後可能會著手準備房間，完成後將資訊告訴服務生，再由服務生告訴客戶：「你的房間是 xxx 號，這是你的鑰匙。」。
因此同樣的場所可能會有很多不同的服務生來處理不同的事務，所以一個網站通常需要串很多支 API。以電商網站來說，某支 API 可能負責提供全部商品的資訊，另數支 API 負責提供商品個別的詳細資訊，有些 API 負責會員登入等等。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

1. `508 Loop Detected`：伺服器在處理用戶請求時陷入無窮迴圈，最後終止操作。
2. `403 Forbidden`: 伺服器有收到及成功解析用戶端的請求，但拒絕回應。通常是在使用者嘗試訪問無權訪問的內容而回傳的代碼。
3. `429 Too Many Requests`：使用者在特定時間內傳送太多請求，白話一點就是 API 被奪命連環 call，最後 call 爆了決定斷開連結。

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

### Restaurant List API

#### Host Name

https://api.restaurant.com

#### API Version

2.0

#### 使用說明

| Description      | Method | path         | 參數           |
| ---------------- | ------ | ------------ | -------------- |
| 回傳所有餐廳資料 | get    | /all         | 無             |
| 回傳單一餐廳資料 | get    | /all/id={id} | 無             |
| 刪除餐廳         | delete | /all/id={id} | id: 餐聽編號   |
| 新增餐廳         | post   | /all         | 無             |
| 更改餐廳         | patch  | /all/id={id} | name: 餐廳名稱 |

- **Example:**

```
GET 所有餐廳資料 - https://[HOST_NAME]/[API_VERSION]/all
GET id 1122 的餐廳資料 - https://[HOST_NAME]/[API_VERSION]/all/id=1122
POST 新增餐廳 - https://[HOST_NAME]/[API_VERSION]/all?name={new-name}
PATCH 更改 id 1122 的餐廳名稱 - https://[HOST_NAME]/[API_VERSION]/all/id=1122?name={new-name}
DELETE 刪除餐廳 id 1122 的餐廳 - https://[HOST_NAME]/[API_VERSION]/all/id=1122
```

- **Success Response: 200**

- **Response Object:**

| Field  | Type   | Description          |
| ------ | ------ | -------------------- |
| id     | Number | Restaurant id.       |
| name   | String | Restaurant name.     |
| county | String | Place of restaurant. |
| phone  | String | Phone of restaurant. |

- **Success Response Example:**

```
{
  "data": [
    {
      "id": 1122,
      "name": "一百減一種味道",
      "county": "新竹市",
      "phone": "03-999-8888"
    },
    {
      "id": 3344,
      "name": "小塾子咖啡",
      "county": "新竹市",
      "phone": "03-222-2222"
    }
    {
      "id": 5566,
      "name": "川堂小吃坊",
      "county": "臺北市",
      "phone": "02-6666-6666"
    },
      "id": 7788,
      "name": "拉麵公子哥",
      "county": "臺北市",
      "phone": "02-2929-1313"
    }
  ],
}
```

- **Client Error Response: 400**
