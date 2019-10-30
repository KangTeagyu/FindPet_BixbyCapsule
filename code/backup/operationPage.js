
//operationPage는 operation을 진행하여 httpCall을 수행
const DateConvert = require("./dateConvert.js")

module.exports.function = function operationPage (operator, bgnde_Convert, endde_Convert) {
  var pageNum = 1
  //Operator(연산자를 받아 다음페이지, 이전페이지를 보여줌)
  operator = String(operator)
  
  if (pageNum > 1){ 
    if (operator == "plus"){
    pageNum = pageNum + 1
    }else if (operator == "minus"){
    pageNum = pageNum - 1
    }}
  else if (pageNum = 1){ 
    if (operator == "plus"){
    pageNum = pageNum + 1
    }}
  
  //httpCall을 실행 bgnde : 검색시작날짜, endde: 검색 종료날짜 pageNo: 결과 페이지 넘버 
  
  var http = require('http')
  var console = require('console')
  var ServiceKey = "FPG2e4FPk/9gfHfsfjr68sF4wtwmsWd2lTak4KJabkBLKMvd+XDnG1JoqoZ1D/riVxwpQUP3p/CvUQWk195e2Q=="
  var options= {
    format: 'xmljs',
    returnHeader : true,
    query: {
     bgnde : bgnde_Convert,
     endde : endde_Convert,
     pageNo : pageNum }
  }
  let results = []
  var result =  http.getUrl("http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?bgnde=20140301&endde=20140430&pageNo=1&numOfRows=10&ServiceKey=" + ServiceKey, options)
  results.push(result)
  var resultList = [].concat(result.items)
  console.log(options.pageNo)
  console.log(result.response.body.items.item)
 
//아래 코드는 성별, 중성화 여부에 대한 결과값은 단순 알파벳으로 되어있음 그것을 한글로 보기 좋게 변환
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

  return result.response.body.items.item
}
