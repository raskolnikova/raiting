import ViewController from './ViewController'
import * as $ from 'jquery';

let currentCountExperts = 1;
let expert = new ViewController(currentCountExperts);

$(document).ready(function() { renderView(currentCountExperts, expert) });
//$('#addExpert').ready(function() { addExpert() });

function renderView() {
    let domElement = ` <div id="container_${currentCountExperts}">
    <div class="input-container">
        <div class="counts">
            <h6>Введите количество критериев</h6>
            <input class="form-control" type="text" id="count-criteriors" value="">
        </div>
        <div class="counts">
            <h6>Введите количество альтернатив</h6>
            <input class="form-control" type="text" id="count-alternatives" value="">
        </div>
        <input class="btn btn-primary" type="button" id="submitCounts" value="OK">
    </div>

    <div id="table-group">
        <h6>Заполните таблицу критериев</h6>
        <div id="criteriors"></div>

        <h6>Заполните таблицы альтернатив по критериям</h6>
        <div id="wrap-alternatives"></div>

        <input class="btn btn-primary" type="button" id="submitTables" value="OK">

        <div id="wrap-raiting">
            <h6>Результат:</h6>
        </div>
        <input class="btn btn-primary" type="button" id="addExpert" value="Добавить эксперта">
        
        
    </div>
</div>`;
    $(".container ").append(domElement);
    $(`#container_${currentCountExperts} #submitCounts`).on("click", function() { expert.getTables(expert) })
    $(`#container_${currentCountExperts} #submitTables`).on("click", function() { expert.getResult(expert) })
}

function addExpert() {
    $("#addExpert").remove();
    renderView();

}