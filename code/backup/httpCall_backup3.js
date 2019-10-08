
//date input 받는게 합쳐져있는 js코드임 
module.exports.function = function httpCall (MyDate_Start, MyDate_End, operator){
  
  //날짜 형식 변환
  
  if (MyDate_Start['month'] < 10) {
    MyDate_Start['month'] = '0'+ String(MyDate_Start['month'])
  }
  if (MyDate_End['month'] < 10) {
    MyDate_End['month'] = '0'+ String(MyDate_End['month'])
  }
  if (MyDate_Start['day'] < 10) {
    MyDate_Start['day'] = '0'+ String(MyDate_Start['day'])
  }
  if (MyDate_End['day'] < 10) {
    MyDate_End['day'] = '0'+ String(MyDate_End['day'])
  }

  var bgnde_Convert = String(MyDate_Start['year']) + String(MyDate_Start['month']) + String(MyDate_Start['day'])
  var endde_Convert = String(MyDate_End['year']) + String(MyDate_End['month']) + String(MyDate_End['day'])
  
 
  var http = require('http')
  var console = require('console')
  var ServiceKey = "FPG2e4FPk/9gfHfsfjr68sF4wtwmsWd2lTak4KJabkBLKMvd+XDnG1JoqoZ1D/riVxwpQUP3p/CvUQWk195e2Q=="
 
  var options= {
    format: 'xmljs',
    returnHeader : true,
    query: {
     bgnde : bgnde_Convert,
     endde : endde_Convert,
     numOfRows: 1000 }
  }
 //  if (plus.PageNum > 1) { 
 //    options.pageNo = options.pageNo + plus.PageNum_local }  
 
  let results = []
  try {var result =  http.getUrl("http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?bgnde=20140301&endde=20140430&pageNo=1&numOfRows=10&ServiceKey=" + ServiceKey, options)
  }finally{
  results.push(result)
  }
  
  var resultList = [].concat(result.items)
  console.log(options.pageNo)
  console.log(result.response.body.items.item)
 
//아래 코드는 성별, 중성화 여부에 대하여 단순 알파벳 => 한글로
  for(var i = 0; i < result.response.body.items.item.length; i++) {
    if (result.response.body.items.item[i].sexCd == 'M') {
      result.response.body.items.item[i].sexCd = '수컷'
    }else if (result.response.body.items.item[i].sexCd == 'F') {
      result.response.body.items.item[i].sexCd = '암컷'
    }else if (result.response.body.items.item[i].sexCd == 'Q') {
      result.response.body.items.item[i].sexCd = '미상'
    }
  }
  for(var i = 0; i < result.response.body.items.item.length; i++) {
    if (result.response.body.items.item[i].neuterYn == 'Y') {
      result.response.body.items.item[i].neuterYn = '예'
    }
    else if (result.response.body.items.item[i].neuterYn == 'N') {
      result.response.body.items.item[i].neuterYn = '아니오'
    }
    else if (result.response.body.items.item[i].neuterYn == 'U') {
      result.response.body.items.item[i].neuterYn = '미상'
    }
  }
  console.log(result.response.body.items.item[0].neuterYn)
  
  return result.response.body.items.item
}