const cardId = window.location.pathname.split('/')[2];

const taskName = document.querySelector('#taskName');
const taskDescription = document.querySelector('#taskDescription');
const startDateValue = document.querySelector('#startDate');
const endDate = document.querySelector('#endDate');
console.log(endDate);
const editBtn = document.querySelector('.edit');
const red = document.querySelector('#red');
const yellow = document.querySelector('#yellow');
const blue = document.querySelector('#blue');
const green = document.querySelector('#green');
let colorData;

// 데이터 가져오기
const getData = async () => {
  try {
    const response = await fetch(`/api/cards/${cardId}`);
    const { findCard } = await response.json();
    console.log(findCard);
    const { name, description, startDate, dueDate, color } = findCard;
    colorData = color;
    document.querySelector(`#${color}`).click();
    taskName.value = name; // 작업 이름
    taskDescription.value = description; // 작업 설명
    startDateValue.value = startDate; // 시작 날짜
    endDate.value = dueDate; // 마감 날짜
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
    const response = await fetch(`/api/cards/${cardId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: taskName.value,
        color: colorData,
        description: taskDescription.value,
        startDate: startDate.value,
        dueDate: endDate.value,
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});
