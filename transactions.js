// Функция для отображения списка транзакций
function displayTransactions() {
    const transactionsTable = document.getElementById('transactions-table');
    const transactionsBody = transactionsTable.getElementsByTagName('tbody')[0];
  
    // Очищаем таблицу перед обновлением
    while (transactionsBody.firstChild) {
      transactionsBody.firstChild.remove();
    }
  
    const transactions = JSON.parse(localStorage.getItem('transactions'));
  
    if (transactions) {
      for (const transaction of transactions) {
        const row = document.createElement('tr');
  
        const emailCell = document.createElement('td');
        emailCell.textContent = transaction.email;
        row.appendChild(emailCell);
  
        const transportCell = document.createElement('td');
        transportCell.textContent = transaction.transport;
        row.appendChild(transportCell);
  
        const ticketTypeCell = document.createElement('td');
        ticketTypeCell.textContent = transaction.ticketType;
        row.appendChild(ticketTypeCell);
  
        const statusCell = document.createElement('td');
        statusCell.textContent = transaction.status === 1 ? 'Завершена' : 'Отменена';
        row.appendChild(statusCell);
  
        transactionsBody.appendChild(row);
      }
    }
  }
  
  // Вызываем функцию для отображения списка транзакций при загрузке страницы
  displayTransactions();
  