module.exports.function = function selectCategory (kindsCategory, find) { //kindsList는 Select_Kind action의 input값
  // 다른 경로의 파일을 호출
  const kindsList = require("./lib/kindsList.js");
  const console = require('console');
  
   let kindsTitle = [];
   console.log(kindsList);
   console.log(kindsList[0].title)
   console.log(kindsList.length)
   for(let i = 0; i < kindsList.length; i++){
       if(kindsList[i].title == kindsCategory){
      kindsTitle.push(kindsList[i].title);
      break;
    }
     }
      
  console.log(kindsTitle);
  return kindsTitle
}
// kinds 컨셉
// enum (Kinds) {
//   symbol (개)
//   symbol (고양이)
//   symbol (기타동물)
// }