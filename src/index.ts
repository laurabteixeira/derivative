function transformInArray(expression: string): (number | string)[] {
  const expressionArray: (number | string)[] = [];
  let tempNumber = '';

  for (const character of expression) {
      if (/\d/.test(character)) {
          tempNumber += character;
      } else {
          if (tempNumber !== '') {
              expressionArray.push(parseInt(tempNumber, 10));
              tempNumber = '';
          }
          expressionArray.push(character);
      }
  }

  if (tempNumber !== '') {
      expressionArray.push(parseInt(tempNumber, 10));
  }

  return expressionArray;
}

//const expression = "2X^3+1X^2+3X^1+1345";
//console.log(expression)
//const array = expressionToArray(expression);
//console.log(array);

function divideArrayInArrays(arr: (number | string)[]): (number | string)[][] {
  const expressionArrays: (number | string)[][] = [];
  let temp: (number | string)[] = [];
  let firstArray = false;

  for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      temp.push(item);
      if (item === '^') {
          const nextIndex = i + 1;
          temp.push(arr[nextIndex]);
          if (firstArray) {
              expressionArrays.push(temp.slice(1)); 
          } else {
              expressionArrays.push(temp); 
              firstArray = true;
          }
          temp = [];            
      }
  }

  if (temp.length > 0 && firstArray) {
      expressionArrays.push(temp.slice(1)); 
  } else if (temp.length > 0) {
      expressionArrays.push(temp); 
  }

  return expressionArrays;
}

//const array: (number | string)[] = [4, 'X', '^', 4, '-', 2, 'X', '^', 3, '+', 1, 'X', '^', 2, '+', 3, 'X', '^', 1, '+', 12];
//const resultado: (number | string)[][] = divideArrayInArrays(array);
//console.log(resultado);

function multiplyNumbers(arr: (number | string)[][]) {
  let multiplyedArray: (number | string)[][] = []
  let temp: (number | string)[][] = []

  for (let i = 0; i < arr.length; i++) {
      const subArray = arr[i]
      for (let j = 0; j < subArray.length; j++) {
          //colocar validacao pra caso tenha 0 no array
          if (subArray[j] === "X" || subArray[j] === "x") {
              temp.push(subArray)
          }
      }
  }


  for (let i = 0; i < temp.length; i ++) {
      const subTempArray = temp[i] 
      let modifiedSubArray = [...temp]

          if (subTempArray[0] !== "+" && subTempArray[0] !== "-") {
              const product = parseInt(subTempArray[0] as string) * parseInt(subTempArray[3] as string) 
              modifiedSubArray[i] = [product, subTempArray[1], subTempArray[2], parseInt(subTempArray[3] as string) - 1]

              multiplyedArray.push(modifiedSubArray[i])
          } else {
              const product = parseInt(subTempArray[1] as string) * parseInt(subTempArray[4] as string) 
              modifiedSubArray[i] = [subTempArray[0], product, subTempArray[2], subTempArray[3], parseInt(subTempArray[4] as string) - 1]
              
              multiplyedArray.push(modifiedSubArray[i])
          }
  }

  //tirar x^0

  return multiplyedArray
}

function derivative (expression: string) {
  const expressionArray = transformInArray(expression)
  const arrayOfExpressionArrays = divideArrayInArrays(expressionArray)
  const result = multiplyNumbers(arrayOfExpressionArrays)
  return result
}

//jogar os arrays pra uma string
const result = derivative("2X^3+1X^2+3X^1+1345")
console.log(result)