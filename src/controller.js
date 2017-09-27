import math from 'mathjs';

export default class Controller {

    constructor() {

        this._criteriorsPriority = [
            []
        ];
        this._alternatives = [
            []
        ];
        this._normalCriteriorsPriority = [];
        this._normalAlternatives = [];
    }

    get criteriorsPriority() {
        return this._criteriorsPriority;
    }

    set criteriorsPriority(newValue) {
        this._criteriorsPriority = newValue;
    }

    get alternatives() {
        return this._alternatives;
    }

    set alternatives(newValue) {
        this._alternatives = newValue;
    }

    isSameColumn(arr) {
        for (let row = 0; row < arr.length; row++) {
            for (let col = 1; col < arr.length; col++) {
                if (arr[col][0] !== arr[col][row]) {
                    return false;
                }
            }
        }
        return true;
    }

    getNormalArray(arr) {
        let sums = [];
        for (let row = 0; row < arr.length; row++) {
            sums[row] = 0
            for (let col = 0; col < arr.length; col++) {
                sums[row] += arr[col][row]
            }
        }

        for (let row = 0; row < arr.length; row++) {
            for (let col = 0; col < arr.length; col++) {
                arr[col][row] = arr[col][row] / sums[row]
            }
        }

        if (this.isSameColumn(arr)) {
            return this.getCol(arr);
        } else {
            return this.getAverageValuesOfRow(arr)
        }
    }


    getCol(arr) {
        let res = [];
        for (let row = 0; row < arr.length; row++) {
            res.push([arr[row][0]])
        }
        return res;
    }

    getAverageValuesOfRow(arr) {
        let avgResult = [];

        for (let row = 0; row < arr.length; row++) {
            let currentAvg = arr[row].reduce(function(sum, current) {
                return sum + current;
            }, 0) / arr.length;

            avgResult.push([currentAvg])

        }
        return avgResult;
    }

    getResult() {
        this._normalCriteriorsPriority = this.getNormalArray(this._criteriorsPriority)

        for (let k = 0; k < this._alternatives[0].length; k++) {
            this._normalAlternatives.push([]);
        }

        for (let i = 0; i < this._alternatives.length; i++) {
            let newArr = this.getNormalArray(this._alternatives[i])
            for (let j = 0; j < this._alternatives[i].length; j++) {
                this._normalAlternatives[j].push(newArr[j][0])
            }
        }

        return math.multiply(this._normalAlternatives, this._normalCriteriorsPriority)

        console.log(raitings)

    }


}