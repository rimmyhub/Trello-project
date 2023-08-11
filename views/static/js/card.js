document.getElementById('taskForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const taskTitle = document.getElementById('taskTitle').value;
  const taskDescription = document.getElementById('taskDescription').value;
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const invitePeople = document.getElementById('invitePeople').value;

  // 여기서 저장 로직을 추가해주세요
  console.log('할 일 추가:', taskTitle, taskDescription, startDate, endDate, invitePeople);

  // 폼 초기화
  document.getElementById('taskForm').reset();
});
