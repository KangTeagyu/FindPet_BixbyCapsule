// 백업용 파일입니다.
const main = require("./httpCall.js")
module.exports.function = function operationPage () {
  
  if (operator == "다음"){
  return main.httpCall(bgnde_Convert, endde_Convert, pageNum_local+1)
  }else if (operator == "이전"){
  return main.httpCall(bgnde_Convert, endde_Convert, pageNum_local-1)
  }
}

const main = require("./httpCall.js")

module.exports.function = function operationPage (pageNum_local, operator) {
  
  if (operator == "다음"){
  pageNum_local = pageNum_local + 1 
  }else if (operator == "이전"){
  pageNum_local = pageNum_local - 1
  }
  
  return main.httpCall(bgnde_Convert, endde_Convert, pageNum_local)
}
// 백업용 파일입니다.