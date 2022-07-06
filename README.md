FORMAT: 1A
HOST: http://polls.apiblueprint.org/

# 預約功能API

導師開放可預約時間給學生預約


# 老師開放時間

### List All times [GET /api/opentime/{?id,view,starttime,endtime}]

在路由的地方使用 `{}` 把參數包起來，如果最前面有加上 `?`，表示它是 qeury string，否則會屬於 URL 中的 params。

使用 `+ Parameters` 可以定義每個 query string 的意義。撰寫時遵行的是 `MSON` 的格式，長像這樣
：

​`` <parameter 名稱>: `<範例值>` (<型別>, required | optional) - <描述> ​``

- Parameters

  - id: "登入老師id編號" (int, optional) - 使用者id
  - view: "week" (string, optional) - 目前日曆使用模式
  - starttime: "1657036800" (timestamp, optional) - 日曆最開始時間
  - endtime: "1657036800" (timestamp, optional) - 日曆最晚時間

- Response 200 (application/json)

        [
                {
                        "id": "1",
                        "start": "1657036800",
                        "end": "1657036800"
                },
                {
                        "id": "2",
                       "start": "1657036800",
                        "end": "1657036800"
                }
        ]