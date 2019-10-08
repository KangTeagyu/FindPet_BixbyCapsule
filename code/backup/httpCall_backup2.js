//백업용 파일입니다.
//백업용파일입니다. 
module.exports.function = function httpCall (MyDate_Start, MyDate_End, Operator){
  var http = require('http')
  var console = require('console')
  var pageNum_local = 1
  
  Operator = String(Operator)
  
  if (Operator == "plus"){
  pageNum_local = pageNum_local + 1
  }else if (Operator == "minus"){
  pageNum_local = pageNum_local - 1
  }
  
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
  var bgnde = String(MyDate_Start['year']) + String(MyDate_Start['month']) + String(MyDate_Start['day'])
  var endde = String(MyDate_End['year']) + String(MyDate_End['month']) + String(MyDate_End['day'])
  
  var ServiceKey = "FPG2e4FPk/9gfHfsfjr68sF4wtwmsWd2lTak4KJabkBLKMvd+XDnG1JoqoZ1D/riVxwpQUP3p/CvUQWk195e2Q=="
  var options= {
    format: 'xmljs',
    returnHeader : true,
    query: {
     bgnde : bgnde,
     endde : endde,
     pageNo : pageNum_local,
     numOfRows: 1000 }
  }
 
  //최초로 불러와서 totalcount를 알아냄
  var first_result =  http.getUrl("http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?bgnde=20140301&endde=20140430&pageNo=1&numOfRows=10&ServiceKey=" + ServiceKey, options)
  var total_PageNum = first_result.response.body.totalCount
  console.log(first_result.response.body.totalCount)
  console.log(total_PageNum)
//results는 결과값을 담을 리스트
  let results = []
  for(var i = 1; i < total_PageNum/500; i++){
    
    pageNum_local = i
    var options= {
      format: 'xmljs',
      returnHeader : true,
      query: {
      bgnde : bgnde,
     endde : endde,
      pageNo : pageNum_local,
      numOfRows: 500 }
  }
    var result = http.getUrl("http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?bgnde=20140301&endde=20140430&pageNo=1&numOfRows=10&ServiceKey=" + ServiceKey, options)
    console.log(result.response.items.item)
    results.push(result.response.item)
  }
  //여기부터



  //var resultList = [].concat(results.items)
  
  
  console.log(results)
  console.log(results.result.response.body.items.item)
//아래 코드는 성별, 중성화 여부에 대하여 단순 알파벳 => 한글로
  for(var i = 0; i < results.result.response.body.items.item.length; i++) {
    if (results.result.response.body.items.item[i].sexCd == 'M') {
      results.result.response.body.items.item[i].sexCd = '수컷'
    }else if (results.result.response.body.items.item[i].sexCd == 'F') {
      results.result.response.body.items.item[i].sexCd = '암컷'
    }else if (results.result.response.body.items.item[i].sexCd == 'Q') {
      results.result.response.body.items.item[i].sexCd = '미상'
    }
  }
  for(var i = 0; i < results.result.response.body.items.item.length; i++) {
    if (results.result.response.body.items.item[i].neuterYn == 'Y') {
      results.result.response.body.items.item[i].neuterYn = '예'
    }
    else if (results.result.response.body.items.item[i].neuterYn == 'N') {
      results.result.response.body.items.item[i].neuterYn = '아니오'
    }
    else if (results.result.response.body.items.item[i].neuterYn == 'U') {
      results.result.response.body.items.item[i].neuterYn = '미상'
    }
  }
  console.log(results.result.response.body.items.item[0].neuterYn)
  
  
  return results.result.response.body.items.item
}
//백업용 파일입니다.
//백업용파일입니다. 