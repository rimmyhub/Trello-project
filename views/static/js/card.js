const cardId = window.location.pathname.split('/')[2];

const taskName = document.querySelector('#taskName');
console.log(taskName);
const taskColor = document.querySelector('#taskColor');
const taskStartDate = document.querySelector('#taskStartDate');
const taskDueDate = document.querySelector('#taskDueDate');
const taskDescription = document.querySelector('#taskDescription');

const getData = async () => {
  try {
    const response = await fetch(`/api/cards/${cardId}`);
    const { findCard } = await response.json();
    const { name, description, startDate, dueDate, color } = findCard;
    taskName.innerText = name; // 작업 이름

    taskDescription.innerText = description;

    taskStartDate.innerText = startDate;

    taskDueDate.innerText = dueDate;

    taskColor.style.backgroundColor = color;
  } catch (error) {
    console.error('Error:', error);
  }
};

getData();
