// 할 일 열
const sortableTodo = new Sortable(document.getElementById('sortable-todo'), {
  group: 'column',
  animation: 150,
});

// 진행 중 열
const sortableInProgress = new Sortable(document.getElementById('sortable-inProgress'), {
  group: 'column',
  animation: 150,
});

// 완료 열
const sortableDone = new Sortable(document.getElementById('sortable-done'), {
  group: 'column',
  animation: 150,
});

const sortableColumns = new Sortable(document.querySelector('.row'), {
  group: 'column',
  animation: 150,
});

const sortableCards = new Sortable(document.querySelectorAll('.sortable-list'), {
  group: 'card',
  animation: 150,
});

// 카드가 이동될 때의 이벤트
sortableCards.on('add', function (evt) {
  const item = evt.item;
  const column = item.closest('.column');
  column.querySelector('.sortable-list').appendChild(item);
});
