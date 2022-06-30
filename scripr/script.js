// Ярлык для получения элементов
const el = function (element) {
    if (element.charAt(0) === "#") { // Если передан идентификатор
        return document.querySelector(element); // возвращает один элемент
    }
    return document.querySelectorAll(element); // В противном случае возвращает список узлов
};

// Variables
let viewer = el("#viewer"); // Экран калькулятора, на котором отображается результат
let equals = el("#equals"); // Кнопка равенства
let nums = el(".num"); // Список номеров
let ops = el(".ops"); // Список операторов
let theNum = ""; // Текущий номер
let oldNum = ""; // Первое число
let resultNum; // Результат
let operator; // Batman
let massege = "";

    // Когда: Номер нажат. Получить выбранный текущий номер
function setNum() {
    if (resultNum) { // Если был отображен результат, сбросьте номер
        theNum = this.getAttribute("data-num");
        resultNum = "";
    } else { // В противном случае добавьте цифру к предыдущему номеру (это строка!)
        theNum += this.getAttribute("data-num");
    }
    if(/\D/.test(massege))
    {
        massege = massege.substring(0,massege.lastIndexOf(" ")+1);
        massege+=theNum;
    }
    else
        massege=theNum;
    viewer.textContent = massege; // Отображение текущего номера

};

// Когда: Оператор нажат. Передайте номер в oldNum и сохраните оператора
    function moveNum() {
        oldNum = theNum;
        theNum = "";
        operator = this.getAttribute("data-ops");

        equals.setAttribute("data-result", ""); // Результат сброса в attr

        switch (operator) {
            case "plus":
                massege+=" + ";
                break;

            case "minus":
                massege+=" - ";
                break;

            case "times":
                massege+=" * ";
                break;

            case "divided by":
                massege+=" / ";
                break;
        }
        viewer.textContent = massege;
    };

    //При нажатии кнопки: =. Вычислить результат
    function displayNum() {
        // Преобразование строковых входных данных в числа
        oldNum = parseFloat(oldNum);
        theNum = parseFloat(theNum);
        // Выполнить операцию
        switch (operator) {
            case "plus":
                resultNum = oldNum + theNum;
                break;

            case "minus":
                resultNum = oldNum - theNum;
                break;

            case "times":
                resultNum = oldNum * theNum;
                break;

            case "divided by":
                resultNum = oldNum / theNum;
                break;

            // Если равно нажато без оператора, сохраните число и продолжайте
            default:
                resultNum = theNum;
        }
        // Если NaN или Бесконечность вернутся
        if (!isFinite(resultNum)) {
            if (isNaN(resultNum)) { // Если результат не является числом; устанавливается, например, двойным щелчком мыши.
                resultNum = "You broke it!";
            } else { // Если результат равен бесконечности, засчитывается путем деления на ноль
                resultNum = "Look at what you've done";
                el('#calculator').classList.add("broken"); // Калькулятор перерывов
                el('#reset').classList.add("show"); // И показать кнопку сброса
            }
        }

        massege = resultNum;
        // Покажите результат, наконец-то!
        viewer.textContent = massege;
        equals.setAttribute("data-result", resultNum);
        //Теперь сбросьте старое число и сохраните результат
        oldNum = 0;
        theNum = resultNum;
        massege = resultNum;
    };

    //Когда нажата кнопка "Очистить". Очистить все
    function clearAll() {
        oldNum = "";
        theNum = "";
        massege = "";
        resultNum = "";
        viewer.textContent = "0";
        equals.setAttribute("data-result", resultNum);
    };

    /* События щелчка  */

    // Добавить событие щелчка к номерам
    for (let i = 0, l = nums.length; i < l; i++) {
        nums[i].onclick = setNum;
    }

    // Добавление события щелчка к операторам
    for (let i = 0, l = ops.length; i < l; i++) {
        ops[i].onclick = moveNum;
    }

    // Добавить событие щелчка к знаку равенства
    equals.onclick = displayNum;

    // Добавить событие щелчка для очистки кнопки
    el("#clear").onclick = clearAll;

    // Добавить событие щелчка к кнопке сброса
    el("#reset").onclick = function (){window.location = window.location};
