window.addEventListener("load", Init);

let URL = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";

let currencyArr = [{
    ccy: "",
    buy: 0,
    sale: 0,
}];

let totalMoney = 0;

function Init() {
    Request(URL, Print);
}

function Request(URL, callback) {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', URL, true);
    xhr.onreadystatechange = function (aEvt) {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                const data = JSON.parse(xhr.responseText);
                callback(data);
            } else {
                console.log("Error loading page\n");
            }
        }
    };
    xhr.send(null);
}

function Print(data) {
    currencyArr = data;

    //currency-info
    const currencyInfoPrint = document.getElementById("currency");

    for (let i = 0; i < currencyArr.length; i++) {
        const currDiv = document.createElement("div");
        currDiv.setAttribute("class", "col");
        const label = document.createElement("label");
        label.innerHTML = currencyArr[i].ccy + "  :  " + currencyArr[i].buy + "  /  " + currencyArr[i].sale;
        currDiv.appendChild(label);
        currencyInfoPrint.appendChild(currDiv);
    }

    //money div
    const currencyPutPrint = document.getElementById("money-panel");

    currDiv = document.createElement("div");
    currDiv.setAttribute("class", "col");
    //input
    let input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("class", "money-panel-input");
    input.setAttribute("placeholder", "Enter the money");
    currDiv.appendChild(input);
    //rbuttons
    for (let i = 0; i < currencyArr.length; i++) {
        let span = document.createElement("span");
        span.innerHTML = currencyArr[i].ccy;

        let rbtn = document.createElement("input");
        rbtn.setAttribute("type", "radio");
        rbtn.setAttribute("name", "currency-rbtn");
        rbtn.setAttribute("value", currencyArr[i].ccy);

        span.appendChild(rbtn);
        currDiv.appendChild(span);
    }
    //button Send
    let buttonSend = document.createElement("button");
    buttonSend.setAttribute("class", "btn btn-success money-panel-button");
    buttonSend.innerHTML = "Send";
    buttonSend.addEventListener("click", SendMoney);
    currDiv.appendChild(buttonSend);
    //button Take
    let buttonTake = document.createElement("button");
    buttonTake.setAttribute("class", "btn btn-danger money-panel-button");
    buttonTake.innerHTML = "Take";
    buttonTake.addEventListener("click", TakeMoney);
    currDiv.appendChild(buttonTake);
    //message
    let message = document.createElement("span");
    message.setAttribute("class", "money-panel-message");
    currDiv.appendChild(message);

    currencyPutPrint.appendChild(currDiv);
}

function SendMoney() {
    let rBtns = document.getElementsByName("currency-rbtn");
    for (let i = 0; i < rBtns.length; i++) {
        if (rBtns[i].type == "radio" && rBtns[i].checked) {
            let money = document.querySelector(".money-panel-input").value;
            let koef = currencyArr[i].buy;
            let c = currencyArr[i].ccy;

            let convertMoney = money * koef;

            let message = document.querySelector(".money-panel-message");

            totalMoney += convertMoney;
            message.innerHTML = "You send " + money + " " + c;



            let labelMoney = document.querySelector(".labelMoney");
            labelMoney.innerHTML = totalMoney;
        }

    }
}

function TakeMoney() {
    let rBtns = document.getElementsByName("currency-rbtn");
    for (let i = 0; i < rBtns.length; i++) {
        if (rBtns[i].type == "radio" && rBtns[i].checked) {
            let money = document.querySelector(".money-panel-input").value;
            let koef = currencyArr[i].buy;
            let c = currencyArr[i].ccy;

            let convertMoney = money * koef;

            let message = document.querySelector(".money-panel-message");

            if (totalMoney - convertMoney < 0) {
                message.innerHTML = "Not enoght money";
            } else {
                totalMoney -= convertMoney;
                message.innerHTML = "You take " + money + " " + c;
            }


            let labelMoney = document.querySelector(".labelMoney");
            labelMoney.innerHTML = totalMoney;
        }

    }
}