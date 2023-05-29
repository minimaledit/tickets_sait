// Обработчик нажатия кнопки "Узнать стоимость"
const calculateButton = document.getElementById('calculate-btn');
calculateButton.addEventListener('click', function () {
  const transportSelect = document.getElementById('transport-type-select');
  const ticketSelect = document.getElementById('ticket-type-select');
  const priceContainer = document.getElementById('price-container');
  const priceElement = document.getElementById('price');

  const transport = transportSelect.value;
  const ticketType = ticketSelect.value;

  const storedInfo = JSON.parse(localStorage.getItem('objInf'));
  const selectedInfo = storedInfo.find(info => info.transport === transport && info.ticketType === ticketType);

  if (selectedInfo) {
    priceElement.textContent = selectedInfo.price;
    priceContainer.style.display = 'block';

    const continueButton = document.getElementById('continue-btn');
    continueButton.style.display = 'block';
  } else {
    alert('Покупка данного билета невозможна');
  }
});

// Обработчик нажатия кнопки "Продолжить"
const continueButton = document.getElementById('continue-btn');
continueButton.addEventListener('click', function () {
  const purchaseForm = document.getElementById('purchase-form');
  const paymentForm = document.getElementById('payment-form');

  purchaseForm.style.display = 'none';
  paymentForm.style.display = 'block';
});

// Обработчик нажатия кнопки "Оплатить"
const payButton = document.getElementById('pay-btn');
payButton.addEventListener('click', function () {
  const emailInput = document.getElementById('email-input');
  const confirmationContainer = document.getElementById('confirmation-container');
  const confirmationEmail = document.getElementById('confirmation-email');
  const cancelButton = document.getElementById('cancel-btn');
  const confirmButton = document.getElementById('confirm-btn');

  const transportSelect = document.getElementById('transport-type-select');
  const ticketSelect = document.getElementById('ticket-type-select');
  const transport = transportSelect.value;
  const ticketType = ticketSelect.value;

  const email = emailInput.value;

  // Отправка письма с инструкцией по оплате (имитация)
  // В реальном приложении здесь должен быть код для отправки письма на указанную почту

  confirmationEmail.textContent = email;
  confirmationContainer.style.display = 'block';

  cancelButton.addEventListener('click', function () {
    // Сохранение информации о транзакции с отменой покупки
    const transaction = {
      email: email,
      transport: transport,
      ticketType: ticketType,
      status: 0 // 0 - покупка отменена
    };
    saveTransaction(transaction);
    // Отображение сообщения после нажатия отмены покупки
    alert('Очень жаль :(');

    // Перенаправление на главную страницу
    window.location.href = 'index.html';
  });

  confirmButton.addEventListener('click', function () {
    // Сохранение информации о транзакции с завершением покупки
    const transaction = {
      email: email,
      transport: transport,
      ticketType: ticketType,
      status: 1 // 1 - покупка завершена
    };
    saveTransaction(transaction);

    // Отображение сообщения после нажатия "Я оплатил"
    alert('Билет был отправлен на вашу почту.');

    // Перенаправление на главную страницу
    window.location.href = 'index.html';
  });
});

// Функция для сохранения информации о транзакции
function saveTransaction(transaction) {
  let transactions = localStorage.getItem('transactions');
  if (transactions) {
    transactions = JSON.parse(transactions);
  } else {
    transactions = [];
  }

  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));
}
