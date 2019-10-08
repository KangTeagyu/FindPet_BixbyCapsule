module.exports.function = function httpCall (inputDate, kinds){
  var http = require('http')
  var console = require('console')
  var pageNum_local = 1
  
  
  var ServiceKey = "FPG2e4FPk/9gfHfsfjr68sF4wtwmsWd2lTak4KJabkBLKMvd+XDnG1JoqoZ1D/riVxwpQUP3p/CvUQWk195e2Q=="
  var options= {
    format: 'xmljs',
    returnHeader : true,
    query: {
     bgnde : inputDate.bgnde_Convert,
     endde : inputDate.endde_Convert,
     pageNo : pageNum_local,
     numOfRows: 1 }
  }
 
  //최초로 불러와서 totalcount를 알아냄
  var first_result =  http.getUrl("http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?bgnde=20140301&endde=20140430&pageNo=1&numOfRows=10&ServiceKey=" + ServiceKey, options)
  var total_PageNum = first_result.response.body.totalCount
  console.log(first_result.response.body.totalCount)
  console.log(total_PageNum)
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
    numOfRows: total_PageNum }
  }
    var results = http.getUrl("http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?bgnde=20140301&endde=20140430&pageNo=1&numOfRows=10&ServiceKey=" + ServiceKey, options)
    console.log(results.response.body.items.item)
    //results.push(result.response.body.items.item)
  //}
  //여기부터



  //var resultList = [].concat(results.items)
  
  
  console.log("results:",results)
  console.log(results.response.body.items.item)
//아래 코드는 성별, 중성화 여부에 대하여 단순 알파벳 => 한글로
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
  console.log(results.response.body.items.item[0].neuterYn)
  
  
  return results.response.body.items.item
}

//results.result.response.body.items.item