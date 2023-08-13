const boardId = window.location.pathname.split('/')[2];

const taskName = document.querySelector('#taskName');
const taskDescription = document.querySelector('#taskDescription');
const editBtn = document.querySelector('.edit');
const red = document.querySelector('#red');
const yellow = document.querySelector('#yellow');
const blue = document.querySelector('#blue');
const green = document.querySelector('#green');
let colorData;

// 데이터 가져오기
const getData = async () => {
  try {
    const response = await fetch(`/api/board/${boardId}`);
    const { data } = await response.json();
    console.log(data);
    const { name, description, color } = data;
    colorData = color;
    document.querySelector(`#${color}`).click();
    taskName.value = name; // 작업 이름
    taskDescription.value = description; // 작업 설명
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
getData();
const getColor = (e) => {
  colorData = e.target.value;
  // console.log(colorData);
};

red.addEventListener('click', getColor);
yellow.addEventListener('click', getColor);
blue.addEventListener('click', getColor);
green.addEventListener('click', getColor);

// 버튼 누르면 수정됨
editBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  // console.log(startDate.value);
  // console.log(endDate.value);
  try {
    const response = await fetch(`/api/boards/${boardId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: taskName.value,
        color: colorData,
        description: taskDescription.value,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.message === '보드 수정이 완료되었습니다.') window.location.href = '/main';
  } catch (error) {
    console.log(error);
  }
});
