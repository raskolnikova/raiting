  import handsontable from 'handsontable';
  import math from 'mathjs';
  import * as $ from 'jquery';
  import Controller from './controller'

  let controller = new Controller();

  let criteriorsPriorityTable = null;
  let alternativesTables = [];


  $('#submitCounts').click(function() {
      $("#table-group").hide("slow");

      let countCriterior = +$('#count-criteriors').val();
      let countAlternatives = +$('#count-alternatives').val();

      criteriorsPriorityTable = new handsontable(document.getElementById('criteriors'), {
          data: [
              []
          ],
          rowHeaders: false,
          colHeaders: false,
          minCols: countCriterior,
          minRows: countCriterior,
      });

      for (let i = 0; i < countCriterior; i++) {
          let domElement = `<div class='table-criterior' id=table-alternatives${i}></div>`;
          $("#wrap-alternatives").append(domElement);

          let alternativesTable = new handsontable(document.getElementById(`table-alternatives${i}`), {
              data: [
                  []
              ],
              rowHeaders: false,
              colHeaders: false,
              minCols: countAlternatives,
              minRows: countAlternatives,
          });

          alternativesTables[i] = alternativesTable
      }

      $("#table-group").show("slow");
  })


  $('#submitTables').click(function() {
      controller.criteriorsPriority = stringToNumberArray(criteriorsPriorityTable.getData());
      controller.alternatives = alternativesTables.map(function(item) {
          return stringToNumberArray(item.getData());
      });

       let raiting  = controller.getResult()

        raiting.forEach(function(item, i, arr) {
          let domElement = `<div class='raiting'>${i+1}) ${arr[i][0]}</div>`;
          $("#wrap-raiting").append(domElement);
                })



  })

  function stringToNumberArray(array) {
      for (let i = 0; i < array.length; i++) {
          for (let j = 0; j < array.length; j++) {
              array[i][j] = +array[i][j];
          }
      }
      return array
  }
