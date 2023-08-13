const boardList = document.querySelector('#boardList');

const getData = async () => {
  const response = await fetch('/api/boards');
  const { data } = await response.json();
  console.log(data);
  const temp = data
    .map((data) => {
      return `
    <div class="board" style="background-color: ${data.color};">
      <p>관리자: ${data.User.name}</p>
      <p>보드이름: ${data.name}</p>
      <p>${data.description}</p>
      <button class="delete" data-id=${data.boardId}>삭제하기</button>
      <a href="/board-edit/${data.boardId}">수정하기</a>
    </div>
    `;
    })
    .join(' ');
  boardList.innerHTML = temp;

  boardList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete')) {
      const boardId = e.target.getAttribute('data-id');
      const response = await fetch(`/api/boards/${boardId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      console.log(data);
      if (data.message === '보드를 삭제하였습니다.') window.location.reload();
    }
  });
};
getData();

const color = document.querySelector('.color');
const createBoardBtn = document.querySelector('#createBoardButton');
const nameInput = document.querySelector('.nameInput');
const descInput = document.querySelector('.descInput');
let colorValue = 'blue';
const selectChange = () => {
  colorValue = color.options[color.selectedIndex].value;
};
color.addEventListener('change', selectChange);

createBoardBtn.addEventListener('click', async () => {
  if (nameInput === '' || descInput === '') return;
  const response = await fetch('/api/boards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: nameInput.value,
      description: descInput.value,
      color: colorValue,
    }),
  });
  const data = await response.json();
  console.log(data);
  if (data.message === '보드 작성이 완료되었습니다.') window.location.reload();
});
