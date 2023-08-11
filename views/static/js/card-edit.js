const cardId = window.location.pathname.split('/')[2];

const taskName = document.querySelector('taskName');
const color = document.querySelector('input[name="color"]:checked');
const taskDescription = document.querySelector('taskDescription');
const startDate = document.querySelector('startDate');
const endDate = document.querySelector('endDate');
const invitePeople = document.querySelector('invitePeople');
const editBtn = document.querySelector('.btn btn-primary');

// 데이터 가져오기
const getData = async () => {
  try {
    const response = await fetch(`/api/cards/${cardId}`);

    const resData = await response.json();
    console.log(resData);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

getData();

// // 버튼 누르면 수정됨
// editBtn.addEventListener('click', async()=>{
//   const
// })
