const cardId = window.location.pathname.split('/')[2];

const taskName = document.querySelector('#taskName');
// console.log(taskName);
const taskColor = document.querySelector('#taskColor');
const taskStartDate = document.querySelector('#taskStartDate');
const taskDueDate = document.querySelector('#taskDueDate');
const taskDescription = document.querySelector('#taskDescription');
const selectUser = document.querySelector('.select-user');
let selectValue;
const inviteBut = document.querySelector('#inviteButton');

const getData = async () => {
  try {
    const response = await fetch(`/api/cards/${cardId}`);
    const { findCard } = await response.json();
    // console.log(findCard);
    const boardId = findCard.Column.Board.boardId;
    const { name, description, startDate, dueDate, color } = findCard;
    taskName.innerText = name; // 작업 이름
    taskDescription.innerText = description;
    taskStartDate.innerText = startDate;
    taskDueDate.innerText = dueDate;
    taskColor.style.backgroundColor = color;

    const inviteRes = await fetch(`/api/boards/${boardId}`);
    const { message } = await inviteRes.json();
    // console.log(message);
    const temp = message
      .map((data) => {
        return `
        <option value=${data.User.name}>${data.User.name}</option>
      `;
      })
      .join(' ');

    selectUser.innerHTML = temp;
    selectValue = message[0].User.name;
    console.log(selectValue);
    const selectChange = () => {
      selectValue = selectUser.options[selectUser.selectedIndex].value;
      // console.log(selectValue);
    };
    selectUser.addEventListener('change', selectChange);
  } catch (error) {
    console.error('Error:', error);
  }
};
getData();

inviteBut.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`/api/cards/${cardId}/share`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: selectValue,
      }),
    });
    const data = await response.json();
    // console.log(data);
    if (data) {
      // window.location.href = `/card/${cardId}`;
    }
  } catch (error) {
    console.log(error);
  }
});

const commentContainer = document.querySelector('.comment-container');
// 댓글
const getComment = async () => {
  try {
    const response = await fetch(`/api/comment/${cardId}`);

    const { data } = await response.json();
    console.log(data);
    const temp = data
      .map((data) => {
        return `
      <div class="border p-3 mb-3">
        <p>
          ${data.User.name}: ${data.comment}
          <a href="/comment-edit/${data.commentId}">수정</a>
          <button class="btn btn-link delete" data-id=${data.commentId}>삭제</button>
        </p>
      </div>
      `;
      })
      .join(' ');
    commentContainer.innerHTML = temp;
    commentContainer.addEventListener('click', async (e) => {
      if (e.target.classList.contains('delete')) {
        const commentId = e.target.getAttribute('data-id');
        // console.log(commentId);
        const response = await fetch(`/api/comments/${commentId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
        const { data } = await response.json();
        if (data === '댓글을 삭제하였습니다.') window.location.reload();
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
};
getComment();
