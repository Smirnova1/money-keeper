'use strict';

let startBtn = document.getElementById('start');
let budget = document.getElementsByClassName('budget-value')[0];
let dayBudget = document.getElementsByClassName('daybudget-value')[0];
let level = document.getElementsByClassName('level-value')[0];
let expenses = document.getElementsByClassName('expenses-value')[0];
let optionalExpenses = document.getElementsByClassName('optionalexpenses-value')[0];
let incomeValue = document.getElementsByClassName('income-value')[0];
let monthSavings = document.getElementsByClassName('monthsavings-value')[0];
let yearSavings = document.getElementsByClassName('yearsavings-value')[0];
let expensesItem = document.getElementsByClassName('expenses-item');
let btn = document.getElementsByTagName('button');
let expensesButton = btn[0];
let optionalExpensesButton = btn[1];
let countBudgetButton = btn[2];
let optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item');
let chooseIncome = document.querySelector('.choose-income');
let checkbox = document.querySelector('#savings');
let chooseSumma = document.querySelector('#sum');
let percentSumma = document.querySelector('#percent');
let year = document.querySelector('.year-value');
let month = document.querySelector('.month-value');
let day = document.querySelector('.day-value');

let money, time;
startBtn.addEventListener('click', function(){
    time = prompt("Дата в формате YYYY-MM-DD");
    money = +prompt("Ваш бюджет в месяц?");
    while(isNaN(money) || money == '' || money == null){
        money = +prompt("Ваш бюджет в месяц?");
    }
    appData.budget = money;
    appData.timeData = time;
    budget.textContent = money.toFixed();
    year.value = new Date(Date.parse(time)).getFullYear();
    month.value = new Date(Date.parse(time)).getMonth() + 1;
    day.value = new Date(Date.parse(time)).getDate();
});

expensesButton.addEventListener('click', function(){
    let sum = 0;
    for (let i = 0; i<expensesItem.length; i++){
        let a = expensesItem[i].value;
        let b = expensesItem[++i].value;

        if (typeof(a)==='string' && typeof(a)!=null && typeof(b)!=null && a!='' && b!=''&& a.length<50)
        {
            appData.expences[a]=b;
            sum+= +b;
        } else {
            i = i-1;
        }
    }
    expenses.textContent = sum;
});

optionalExpensesButton.addEventListener('click', function(){
    for (let i = 0; i<optionalExpensesItem.length; i++){
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpenses.textContent += appData.optionalExpenses[i] + ' ';
    }
});

countBudgetButton.addEventListener('click', function(){
    if(appData.budget!=undefined){
        appData.moneyPerDay = (appData.budget/30).toFixed();
        dayBudget.textContent = appData.moneyPerDay;
    
        if(appData.moneyPerDay < 100){
            level.textContent = 'Минимальный уровень достатка';
        }else if(appData.moneyPerDay > 100 && appData.moneyPerDay < 2000){
            level.textContent = 'Средний уровень достатка';
        }else if(appData.moneyPerDay > 2000){
            level.textContent = 'Высокий уровень достатка';
        } else {
            level.textContent = 'Произошла ошибка';
        }
    } else {
        dayBudget.textContent = 'Нажмите "Начать расчет"!';
    }
});

chooseIncome.addEventListener('input', function(){
    let items = chooseIncome.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

checkbox.addEventListener('click', function(){
    if (appData.saving == true){
        appData.saving = false;
    } else {
        appData.saving = true;
    }
});

chooseSumma.addEventListener('input', function(){
    if(appData.saving == true){
        let sum = +chooseSumma.value;
        let per = +percentSumma.value;

        appData.monthIncome = sum/100/12*per;
        appData.yearIncome = sum/100*per;

        monthSavings.textContent = appData.monthIncome.toFixed(1);
        yearSavings.textContent = appData.yearIncome.toFixed(1);
    }
});
percentSumma.addEventListener('input', function(){
    if(appData.saving == true){
        let sum = +chooseSumma.value;
        let per = +percentSumma.value;

        appData.monthIncome = sum/100/12*per;
        appData.yearIncome = sum/100*per;

        monthSavings.textContent = appData.monthIncome.toFixed(1);
        yearSavings.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
    budget: money,
    expences: {},
    optionalExpenses: {},
    income: [],
    timeData: time,
    saving: false,
};