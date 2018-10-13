
function listupfiles() {
  const options = {
    ts_to: elapsedDaysToUnixTime(100),
    count: 1000
  }
  Logger.log(filesList(options))
}


/* ファイルのリスト */
function filesList(data){
  const SLACK_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("TOKEN");
  const params = {
    'token': SLACK_ACCESS_TOKEN,
    'ts_to': data.ts_to,
    'count': data.count
  }
  const options = {
    'method': 'POST',
    'payload': params
  }
  const res =  UrlFetchApp.fetch('https://slack.com/api/files.list',options);
  return JSON.parse(res.getContentText());
}

function elapsedDaysToUnixTime(sec){
  const date = new Date();
  const now = Math.floor(date.getTime()/ 1000); // unixtime[sec]
  return now - sec + '';
  // return now - 8.64e4 * days + '' // 8.64e4[sec] = 1[day] 文字列じゃないと動かないので型変換している
}
