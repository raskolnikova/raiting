import handsontable from 'handsontable';
import math from 'mathjs';
import * as $ from 'jquery';

let criteriorsPriority = [[]]
let alternatives = [[]]

let criteriorsPriorityTable=null;
let alternativesTables = [];


$('#submitCounts').click(function(){
  let countCriterior =  +$('#count-criteriors').val();
  let countAlternatives =  +$('#count-alternatives').val();

  criteriorsPriorityTable= new handsontable(document.getElementById('criteriors'), {
    data: criteriorsPriority,
    rowHeaders: false,
    colHeaders: false,
     minCols: countCriterior,
     minRows: countCriterior,
  });

for (let i = 0; i<countCriterior; i++){
  let domElement=`<div class='table-criterior' id=table-alternatives${i}></div>`;
  $("#wrap-alternatives").append(domElement);

  let alternativesTable =  new handsontable(document.getElementById(`table-alternatives${i}`), {
      data: alternatives,
      rowHeaders: false,
      colHeaders: false,
       minCols: countAlternatives,
       minRows: countAlternatives,
    });

  alternativesTables[i]=alternativesTable
}
})


$('#submitTables').click(function(){
  debugger
  criteriorsPriority = stringToNumberArray(criteriorsPriorityTable.getData());
  alternatives = alternativesTables
})

function stringToNumberArray(array){
  for(let i = 0;i<array.length;i++){
    for(let j = 0;j<array.length;j++){
      array[i][j] = +array[i][j];
    }
  }
  return array
}
