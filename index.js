// Получение сохраненного списка информации из localStorage (если есть)
let objInf = localStorage.getItem('objInf');
if (objInf) {
  objInf = JSON.parse(objInf);
  updateTicketPrices();
} else {
  // Если список информации не сохранен, отобразить сообщение о его отсутствии
  const ticketPricesBody = document.getElementById('ticket-prices-body');
  ticketPricesBody.innerHTML = '<tr><td colspan="3">Стоимость билетов не определена.</td></tr>';
}

// Обновление таблицы стоимости билетов на главной странице
function updateTicketPrices() {
  const ticketPricesBody = document.getElementById('ticket-prices-body');
  ticketPricesBody.innerHTML = '';

  for (let i = 0; i < objInf.length; i++) {
    const info = objInf[i];
    const row = document.createElement('tr');

    const transportCell = document.createElement('td');
    transportCell.textContent = info.transport;
    row.appendChild(transportCell);

    const ticketTypeCell = document.createElement('td');
    ticketTypeCell.textContent = info.ticketType;
    row.appendChild(ticketTypeCell);

    const priceCell = document.createElement('td');
    priceCell.textContent = info.price + ' рублей';
    row.appendChild(priceCell);

    ticketPricesBody.appendChild(row);
  }
}
