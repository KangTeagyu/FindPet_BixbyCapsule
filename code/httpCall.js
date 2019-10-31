//20191021 httpCall.js 변경
module.exports.function = function httpCall (inputDate, kinds,kindN ,find, location, kindDB, locationDB, kindDBcat){
  var http = require('http')
  var console = require('console')
  const fail = require('fail');
  var ServiceKey = "FPG2e4FPk/9gfHfsfjr68sF4wtwmsWd2lTak4KJabkBLKMvd+XDnG1JoqoZ1D/riVxwpQUP3p/CvUQWk195e2Q=="
  const Dummy_Dog = require("./kinds_DB/dogKind.js");
  const Dummy_Cat = require("./kinds_DB/catKind.js");
  const Dummy_Location = require("./location_DB.js");
//results는 결과값을 담을 리스트
  var results = [];
  console.log(Dummy_Location[2])

//Input 받은 kinds(동물의 종류)에 대하여 api Call에 요청변수에 맞게 변환해줌
//축종코드 - 개 : 417000 - 고양이 : 422400 - 기타 : 429900
  if (kinds == 'Dog') {
      kinds = 417000
    }else if (kinds == 'Cat') {
      kinds = 422400
    }else if (kinds == 'Etc') {
      kinds = 429900}


// if(kindDB){
//   for(var i = 0; i < Dummy_Dog.length ; i++){
//     if(kindDB == Dummy_Dog[i].name){
//     var kindN = Dummy_Dog[i].kind
//     kinds = 417000}
//     }
// }
// else if(kindDB){
//   for(var i = 0; i < Dummy_Cat.length ; i++){
//     if(kindDB == Dummy_Cat[i].name){
//     var kindN = Dummy_Cat[i].kind
//     kinds = 422400}
//     }
// }

// else{ //에러 처리를 위해 꼭 있어야 됨
//   kinds = 0
// }
  for(var i = 0; i < Dummy_Dog.length ; i++){
    if(kindDB == Dummy_Dog[i].name){
    var kindN = Dummy_Dog[i].kind
    var kinds = 417000}
    }


  for(var i = 0; i < Dummy_Cat.length ; i++){
    if(kindDBcat == Dummy_Cat[i].name){
    var kindN = Dummy_Cat[i].kind
    var kinds = 422400}
    }


  for(var i = 0; i < Dummy_Location.length ; i++){
    if(locationDB == Dummy_Location[i].orgdownNm){
    var subLocation = Dummy_Location[i].orgCd
    location = Dummy_Location[i].uprCd
    }
  }  


  if (location == 'Seoul') {
       location = 6110000
    }else if (location == 'Busan') {
      location = 6260000
    }else if (location == 'Incheon') {
      location = 6280000
    }else if (location == 'Daegu') {
      location = 6270000
    }else if (location == 'Gwangju') {
      location = 6290000
    }else if (location == 'Sejong') {
      location = 5690000
    }else if (location == 'Daejeon') {
      location = 6300000
    }else if (location == 'Ulsan') {
      location = 6310000
    }else if (location == 'Gyeongi') {
      location = 6410000
    }else if (location == 'Gangwon') {
      location = 6420000
    }
  
  var options= {
    format: 'xmljs',
    returnHeader : true,
    query: {
    bgnde : inputDate.bgnde_Convert,
    endde : inputDate.endde_Convert,
    pageNo : 1,
    upr_cd : location,
    org_cd : subLocation,
    upkind: kinds,
    kind: kindN, //동물의 종류 
    numOfRows: 50}//
  }
    var results = http.getUrl("http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?bgnde=20140301&endde=20140430&pageNo=1&numOfRows=10&ServiceKey=" + ServiceKey, options)
  //Value compilation error 있는 item 찾기

    if(!results.response.body.items.item){
    throw fail.checkedError("No Result", "NoResult");  
  }
    // if(kinds == 429900){
    //   throw fail.checkedError("ETC", "ETC");
    // }


  console.log(typeof(results.response.body.items.item))
//Value compilation error 처리하기 위한 코드 
//specialMark 속성이 없는 item 에 "specialMark : 없음" 속성 추가 
  for(var i = 0; i < results.response.body.items.item.length; i++) {
    if (!results.response.body.items.item[i].specialMark) {
      results.response.body.items.item[i].specialMark = '없음'
    }
  }
  for(var i = 0; i < results.response.body.items.item.length; i++){
  if(!results.response.body.items.item[i].specialMark){
    console.log(i,"비었음")}}

  
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
  console.log(results.response.body.items.item)
  
  
  return results.response.body.items.item
}


//results.result.response.body.items.item
//http://www.convertstring.com/ko/EncodeDecode/UrlDecode 서비스키 인코딩 디코딩

// <orgCd>6110000</orgCd>
// <orgdownNm>서울특별시</orgdownNm>
// </item>
// <item>
// <orgCd>6260000</orgCd>
// <orgdownNm>부산광역시</orgdownNm>
// </item>
// <item>
// <orgCd>6270000</orgCd>
// <orgdownNm>대구광역시</orgdownNm>
// </item>
// <item>
// <orgCd>6280000</orgCd>
// <orgdownNm>인천광역시</orgdownNm>
// </item>
// <item>
// <orgCd>6290000</orgCd>
// <orgdownNm>광주광역시</orgdownNm>
// </item>
// <item>
// <orgCd>5690000</orgCd>
// <orgdownNm>세종특별자치시</orgdownNm>
// </item>
// <item>
// <orgCd>6300000</orgCd>
// <orgdownNm>대전광역시</orgdownNm>
// </item>
// <item>
// <orgCd>6310000</orgCd>
// <orgdownNm>울산광역시</orgdownNm>
// </item>
// <item>
// <orgCd>6410000</orgCd>
// <orgdownNm>경기도</orgdownNm>
// </item>
// <item>
// <orgCd>6420000</orgCd>
