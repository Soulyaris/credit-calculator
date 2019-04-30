const timeRange = document.querySelector("#timeRange");
	timeRange.addEventListener('input', (e) =>  {document.getElementById('years').innerHTML = `${document.getElementById('timeRange').value} лет`;})

	const button = document.querySelector('#counter');
	button.addEventListener('click', (e) => {
		countResult();
	});

	const reset = document.querySelector('#resetButton');
	reset.addEventListener('click', (e) => {
		result.innerHTML = "";
	});

	const test = document.querySelector('#testFill');
	test.addEventListener('click', (e) => {
		document.getElementById('sum').value = "2500000";
		document.getElementById('firstPayment').value = "500000";
		document.getElementById('timeRange').value = 7;
		document.getElementById('bankPercent').value = 10.6;
		document.getElementById('paymentType').value = 0;
		document.getElementById('years').innerHTML = `${timeRange.value} лет`;
  });
  
function isNull(n) {
  if (isNaN(Number(n))) return true;
    else if (n<0) return true;
  return false;
};

function countResult() {
  var sum = document.getElementById('sum').value;
  var firstPayment = document.getElementById('firstPayment').value;
  var timeRange = document.getElementById('timeRange').value;
  var bankPercent = document.getElementById('bankPercent').value;
  var paymentType = document.getElementById('paymentType').value;
  if (isNull(sum)) {alert(`Ошибка ввода! Проверьте введенные данные.`); return};
  if (isNull(firstPayment)) {alert(`Ошибка ввода! Проверьте введенные данные.`); return};
  if (isNull(bankPercent)) {alert(`Ошибка ввода! Проверьте введенные данные.`); return};
  document.querySelector('#paymentTable').innerHTML = "<hr />";
  var payment = sum - firstPayment;
  switch(true) {
    case paymentType == 0: {
      var i = (bankPercent / 100) / 12;
      var n = timeRange * 12;
      var k = Math.pow((1 + i), n);
      var summ = (payment * ((i * k) / (k - 1))).toFixed(2);
      var op = (summ * timeRange * 12).toFixed(2);
      var os = (op - payment).toFixed(2);
      document.getElementById('paymentTable').innerHTML += "<table><tr><td>Ежемесячный платеж: </td><td>"+summ+"</td></tr><tr><td>Общая сумма выплат: </td><td>"+op+"</td></tr><tr><td>Сумма переплаты: </td><td>"+os+"</td></tr></table>";
    } break;
    case paymentType == 1: {
      document.getElementById('paymentTable').innerHTML += "<table id='paymentTab'><thead><td>Месяц</td><td>Задолженность</td><td>Проценты</td><td>Основной долг</td><td>К оплате</td></thead><tbody></tbody></table>";
      var tableBody = document.getElementById('paymentTab').lastElementChild;
      var iteration = 0;
			var summ = 0;
			var monthlyPayment = payment / (timeRange * 12);
			for (var i = 1; i <= timeRange * 12; i++){
        //document.getElementById('paymentTable').innerHTML += 
        iteration = 
        "<tr><td class='rightborder'>" + i +
				"</td><td class='rightborder'>" + (payment).toFixed(2) +
				"</td><td class='rightborder'>" + (payment * (bankPercent / 12) / 100).toFixed(2) +
				"</td><td class='rightborder'>" + (monthlyPayment).toFixed(2) +
        "</td><td>" + (monthlyPayment + payment * (bankPercent / 12) / 100).toFixed(2) + "</td></tr>";
        tableBody.innerHTML += iteration;
				summ += monthlyPayment + payment * (bankPercent / 12) / 100;
				payment -= monthlyPayment;
			}
      tableBody.innerHTML += "<tr><td colspan='4'>Итоговая сумма:</td><td>"+(summ).toFixed(2)+"</td></tr>";
      tableBody.innerHTML += "<tr><td colspan='4'>Переплата:</td><td>"+(summ - sum).toFixed(2)+"</td></tr>";
    }
  }
};