  import handsontable from 'handsontable';
  import math from 'mathjs';
  import * as $ from 'jquery';
  import Controller from './controller'


  export default class ViewController {
      constructor(numberExperts) {
          this._criteriorsPriorityTable = null;
          this._alternativesTables = [];
          this._controller = new Controller();
          this._numberExperts = numberExperts;
      }

      getTables(self) {
          $(`#container_${self._numberExperts} #table-group`).hide("slow");

          let countCriterior = +$(`#container_${self._numberExperts} #count-criteriors`).val();
          let countAlternatives = +$(`#container_${self._numberExperts} #count-alternatives`).val();

          self._criteriorsPriorityTable = new handsontable(document.querySelector(`#container_${self._numberExperts} #criteriors`), {
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
              $(`#container_${self._numberExperts} #wrap-alternatives`).append(domElement);

              let alternativesTable = new handsontable(document.querySelector(`#container_1 #table-alternatives${i}`), {
                  data: [
                      []
                  ],
                  rowHeaders: false,
                  colHeaders: false,
                  minCols: countAlternatives,
                  minRows: countAlternatives,
              });

              self._alternativesTables[i] = alternativesTable
          }

          $(`#container_${self._numberExperts} #table-group`).show("slow");
      }



      getResult(self) {
          self._controller.criteriorsPriority = self.stringToNumberArray(self._criteriorsPriorityTable.getData());

          self._controller.alternatives = self._alternativesTables.map(function(item) {
              return self.stringToNumberArray(item.getData());
          });

          let raiting = self._controller.getResult()

          raiting.forEach(function(item, i, arr) {
              let domElement = `<div class='raiting'>${i+1}) ${arr[i][0]}</div>`;
              $(`#container_${self._numberExperts} #wrap-raiting`).append(domElement);
              $(`#container_${self._numberExperts}  #wrap-raiting`).show("slow");
              $(`#container_${self._numberExperts}  #addExpert`).show("slow");

          })

      }


      stringToNumberArray(array) {
          for (let i = 0; i < array.length; i++) {
              for (let j = 0; j < array.length; j++) {
                  array[i][j] = +array[i][j];
              }
          }
          return array
      }

  }