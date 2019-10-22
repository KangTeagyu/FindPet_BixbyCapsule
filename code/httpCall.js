//20191021 httpCall.js 변경
module.exports.function = function httpCall (inputDate, kinds){
  var http = require('http')
  var console = require('console')
  var ServiceKey = "FPG2e4FPk/9gfHfsfjr68sF4wtwmsWd2lTak4KJabkBLKMvd+XDnG1JoqoZ1D/riVxwpQUP3p/CvUQWk195e2Q=="
 
//results는 결과값을 담을 리스트
  var results = []


//Input 받은 kinds(동물의 종류)에 대하여 api Call에 요청변수에 맞게 변환해줌
//축종코드 - 개 : 417000 - 고양이 : 422400 - 기타 : 429900
  if (kinds == 'Dog') {
      kinds = 417000
    }else if (kinds == 'Cat') {
      kinds = 422400
    }else if (kinds == 'Etc') {
      kinds = 429900}
  
  var options= {
    format: 'xmljs',
    returnHeader : true,
    query: {
    bgnde : inputDate.bgnde_Convert,
    endde : inputDate.endde_Convert,
    pageNo : 1,
    upkind: kinds, //동물의 종류 
    numOfRows: 500 }
  }
    var results = http.getUrl("http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?bgnde=20140301&endde=20140430&pageNo=1&numOfRows=10&ServiceKey=" + ServiceKey, options)
  //Value compilation error 있는 item 찾기
  for(var i = 0; i < 100; i++){
    if(!results.response.body.items.item[i].specialMark){
      console.log(i,"비었음")}}


  console.log(typeof(results.response.body.items.item))
//Value compilation error 처리하기 위한 코드 
//specialMark 속성이 없는 item 에 "specialMark : 없음" 속성 추가 
  for(var i = 0; i < results.response.body.items.item.length; i++) {
    if (!results.response.body.items.item[i].specialMark) {
      results.response.body.items.item[i].specialMark = '없음'
    }
  }

  
//아래 코드는 성별, 중성화 여부에 대하여 단순 알파벳으로 표기되는 것을 사용자가 알기 쉽게 한글로 변환
//ex) 성별: F => 성별: 암컷, 성별: Q => 성별: 미상
  for(var i = 0; i < results.response.body.items.item.length; i++) {
    if (results.response.body.items.item[i].sexCd == 'M') {
      results.response.body.items.item[i].sexCd = '수컷'
    }else if (results.response.body.items.item[i].sexCd == 'F') {
      results.response.body.items.item[i].sexCd = '암컷'
    }else if (results.response.body.items.item[i].sexCd == 'Q') {
      results.response.body.items.item[i].sexCd = '미상'
    }
  }
  for(var i = 0; i < results.response.body.items.item.length; i++) {
    if (results.response.body.items.item[i].neuterYn == 'Y') {
      results.response.body.items.item[i].neuterYn = '예'
    }
    else if (results.response.body.items.item[i].neuterYn == 'N') {
      results.response.body.items.item[i].neuterYn = '아니오'
    }
    else if (results.response.body.items.item[i].neuterYn == 'U') {
      results.response.body.items.item[i].neuterYn = '미상'
    }
  }
  //잘 변경되었나 확인
  console.log("변경값 확인", results.response.body.items.item[38].specialMark)
  
  
  return results.response.body.items.item
}

//results.result.response.body.items.item