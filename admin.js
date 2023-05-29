// Получение сохраненного списка информации из localStorage (если есть)
let objInf = localStorage.getItem('objInf');
if (objInf) {
  objInf = JSON.parse(objInf);
} else {
  // Если список информации не сохранен, создаем пустой список
  objInf = [];
}

// Функция для обновления таблицы с информацией
function updateAdminTable() {
  const adminTableBody = document.querySelector('#admin-table tbody');
  adminTableBody.innerHTML = '';

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
    priceCell.textContent = info.price;
    row.appendChild(priceCell);

    const actionsCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Редактировать';
    editButton.addEventListener('click', function () {
      editInfo(i);
    });
    actionsCell.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.addEventListener('click', function () {
      deleteInfo(i);
    });
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);

    adminTableBody.appendChild(row);
  }
}

// Функция для добавления информации
function addInfo() {
  const transportSelect = document.getElementById('transport-type-select');
  const ticketSelect = document.getElementById('ticket-type-select');
  const priceInput = document.getElementById('price-input');

  const transport = transportSelect.value.trim();
  const ticketType = ticketSelect.value.trim();
  const price = parseFloat(priceInput.value);

  if (transport !== '' && ticketType !== '' && !isNaN(price)) {
    const newInfo = {
      transport: transport,
      ticketType: ticketType,
      price: price
    };

    objInf.push(newInfo);

    saveObjInf();

    transportSelect.value = '';
    ticketSelect.value = '';
    priceInput.value = '';

    updateAdminTable();
  }
}

// Функция для редактирования информации
function editInfo(index) {
  const info = objInf[index];

  const transportSelect = document.getElementById('transport-type-select');
  const ticketSelect = document.getElementById('ticket-type-select');
  const priceInput = document.getElementById('price-input');

  transportSelect.value = info.transport;
  ticketSelect.value = info.ticketType;
  priceInput.value = info.price;

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Сохранить';
  saveButton.addEventListener('click', function () {
    saveEditedInfo(index);
  });

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Отмена';
  cancelButton.addEventListener('click', function () {
    cancelEdit();
  });

  const addInfoForm = document.getElementById('add-info-form');
  addInfoForm.appendChild(saveButton);
  addInfoForm.appendChild(cancelButton);
}

// Функция для сохранения отредактированной информации
function saveEditedInfo(index) {
  const transportSelect = document.getElementById('transport-type-select');
  const ticketSelect = document.getElementById('ticket-type-select');
  const priceInput = document.getElementById('price-input');

  const transport = transportSelect.value.trim();
  const ticketType = ticketSelect.value.trim();
  const price = parseFloat(priceInput.value);

  if (transport !== '' && ticketType !== '' && !isNaN(price)) {
    const editedInfo = {
      transport: transport,
      ticketType: ticketType,
      price: price
    };

    objInf[index] = editedInfo;

    saveObjInf();

    transportSelect.value = '';
    ticketSelect.value = '';
    priceInput.value = '';

    cancelEdit();
    updateAdminTable();
  }
}

// Функция для отмены редактирования
function cancelEdit() {
  const saveButton = document.querySelector('#add-info-form button:first-child');
  const cancelButton = document.querySelector('#add-info-form button:last-child');

  saveButton.remove();
  cancelButton.remove();
}

// Функция для удаления информации
function deleteInfo(index) {
  objInf.splice(index, 1);

  saveObjInf();
  updateAdminTable();
}

// Функция для сохранения списка информации в localStorage
function saveObjInf() {
  localStorage.setItem('objInf', JSON.stringify(objInf));
}

// Вызов функции для обновления таблицы при загрузке страницы
updateAdminTable();

// Обработка отправки формы добавления информации
const addInfoForm = document.getElementById('add-info-form');
addInfoForm.addEventListener('submit', function (event) {
  event.preventDefault();
  addInfo();
});
