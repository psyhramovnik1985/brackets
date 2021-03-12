module.exports = function check(str, bracketsConfig) {
  let strMas = str.split('');
  let bufferMas = [];
  let closeIndex;
  let openIndex;

  let elemLine = true;
  let openBracketsMas = [];
  let closeBracketsMas = [];

  let specialCaseObj = {}; //объект для состояния частных случев

  for (let i = 0; i < bracketsConfig.length; i++) {
    openBracketsMas.push(bracketsConfig[i][0]);
    closeBracketsMas.push(bracketsConfig[i][1]);
    if (bracketsConfig[i][0] === bracketsConfig[i][1]) {
      specialCaseObj[bracketsConfig[i][0]] = true;
    }
  }

  if (strMas.length%2 !== 0){
    return false
  }

  // перебираем массив, получившийся из строки
  for (let i = 0; i < strMas.length; i++) {
    openIndex = openBracketsMas.indexOf(strMas[i]);

    //делаем сразу проверку на частный случай
    if (openBracketsMas.indexOf(strMas[i]) !== closeBracketsMas.indexOf(strMas[i])){   

      ///  перебираем обычные скобки
      if (openIndex !== -1) {          
        bufferMas.push(openIndex);             
      } else {
        closeIndex = closeBracketsMas.indexOf(strMas[i]);
        if (closeIndex !== -1) {
          openIndex = bufferMas.pop();
                 
          if (closeIndex !== openIndex) {
            return false;
          }
        }
      }     
      

    } else {
      // перебираем скобки равные частному случаю
      if (openIndex !== -1 && specialCaseObj[strMas[i]]) {          
        bufferMas.push(openIndex);
        specialCaseObj[strMas[i]] = false;   
      } else {
        closeIndex = closeBracketsMas.indexOf(strMas[i]);
        if (closeIndex !== -1 && !specialCaseObj[strMas[i]]) {
          openIndex = bufferMas.pop();
          specialCaseObj[strMas[i]] = true;    
          if (closeIndex !== openIndex) {
            return false;
          }
        }
      }            
    }
  }
  if (bufferMas.length !== 0) {
      return false;
  }

  return true;
}
