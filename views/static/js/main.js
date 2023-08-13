document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api/boards');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

function updateActivityList(boards) {
  const activityList = document.getElementById('activityList');

  // 기존의 보드 요소 제거
  activityList.innerHTML = '';

  boards.forEach((board) => {
    const card = document.createElement('div');
    card.className = `board-card ${getColorClass(board.color)}`;
    card.setAttribute('data-board-id', board.boardId);

    const cardText = document.createElement('p');
    cardText.className = 'card-text text-start';
    cardText.textContent = `Board ID: ${board.boardId}, Name: ${board.name}`;

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'board-buttons';

    const getButton = document.createElement('button');
    getButton.className = 'get-button btn btn-primary btn-sm';
    getButton.textContent = '조회';
    getButton.addEventListener('click', () => handleEditClick(boards));

    const createButton = document.createElement('button');
    createButton.className = 'create-button btn btn-primary btn-sm';
    createButton.textContent = '생성';
    createButton.addEventListener('click', () => handleEditClick(boards));

    const editButton = document.createElement('button');
    editButton.className = 'edit-button btn btn-primary btn-sm';
    editButton.textContent = '수정';
    editButton.addEventListener('click', () => handleEditClick(board.boardId));

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button btn btn-danger btn-sm';
    deleteButton.textContent = '삭제';
    deleteButton.addEventListener('click', () => handleDeleteClick(board.boardId));

    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(deleteButton);

    card.appendChild(cardText);
    card.appendChild(buttonsDiv);

    activityList.appendChild(card);
  });
}

// 서버에서 받아온 보드 데이터를 화면에 표시
async function handleEditClick(boardId) {
  const newData = {
    name: '프로젝트 이름',
    color: '보드 색상',
    description: '프로젝트 설명',
  };

  // ------------------------------공통------------------------------

  $(document).ready(function () {
    $('#getBoardButton').click(function () {
      $.get('/api/boards', function (data) {
        console.log(data);
      });
    });
  });

  // -----------------------------------------------------------------------------------
  // 페이지 로드 시 fetch 요청 보내고 데이터 처리
  // document.addEventListener('DOMContentLoaded', async () => {
  //   try {
  //     const response = await fetch('/api/boards'); // GET 요청을 보내는 URL을 적절히 변경해주세요
  //     const data = await response.json(); // 서버 응답 데이터를 json파싱
  //     updateActivityList(data.message); // 파싱한 데이터로 화면 업데이트 함수 호출
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // });
  // -------------------생성-------------------------------
  $(document).ready(function () {
    // 보드 생성 버튼 클릭 이벤트 리스너
    $('#createBoardButton').click(function () {
      $('#createModal').modal('show');
    });

    // 보드 생성 폼 제출 이벤트 리스너
    $('#createSaveButton').click(function () {
      const name = $('#createName').val();
      const color = $('#createColor').val();
      const description = $('#createDescription').val();

      // 보드 생성 API 호출
      createBoard(name, color, description);
    });
  });
  // 보드 생성 API 호출 함수
  function createBoard(name, color, description) {
    $.ajax({
      type: 'POST',
      url: '/api/boards/create',
      data: { name, color, description },
      success: function (response) {
        console.log(response.message);
        $('#createModal').modal('hide');
      },
      error: function (error) {
        console.error(error.responseJSON.message);
      },
    });
  }

  // 보드 생성 버튼 클릭 이벤트 처리
  document.getElementById('createBoardButton').addEventListener('click', () => {
    $('#createModal').modal('show');
  });

  // 활동 목록 불러오기 버튼 클릭 이벤트 리스너
  $('#getBoardButton').click(function () {
    // 활동 목록 불러오기 API 호출
    getBoardList();
  });
  //------------------------------수정------------------------------------
  // 수정 버튼 클릭 이벤트 리스너
  $(document).on('click', '.edit-button', function () {
    const boardId = $(this).data('board-id');
    openEditModal(boardId);
  });
  // 모달 내용 업데이트
  document.getElementById('editName').value = newData.name;
  document.getElementById('editColor').value = newData.color;
  document.getElementById('editDescription').value = newData.description;

  // 수정 모달 열기 함수
  function openEditModal(boardId) {
    $('#editModal').data('board-id', boardId);
    $('#editModal').modal('show');
  }

  // 수정 - 저장 버튼 클릭 이벤트 처리
  document.getElementById('editSaveButton').addEventListener('click', async () => {
    const editedData = {
      name: document.getElementById('editName').value,
      color: document.getElementById('editColor').value,
      description: document.getElementById('editDescription').value,
    };

    try {
      // 실제 서버와 통신하는 코드
      const response = await fetch(`/api/boards/${boardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        alert('Board updated successfully');
        $('#editModal').modal('hide'); // 모달을 닫기
        location.reload();
      } else {
        console.error('Failed to update board');
      }
    } catch (error) {
      console.error('Error updating board:', error);
    }
  });
}

function getColorClass(color) {
  switch (color) {
    case 'green':
      return 'board-green';
    case 'blue':
      return 'board-blue';
    case 'red':
      return 'board-red';
    case 'yellow':
      return 'board-yellow';
    default:
      return '';
  }
}
// 수정 모달 저장 버튼 클릭 이벤트 리스너
$('#editSaveButton').click(function () {
  const boardId = $('#editModal').data('board-id');
  const name = $('#editName').val();
  const color = $('#editColor').val();
  const description = $('#editDescription').val();

  // 보드 수정 API 호출
  updateBoard(boardId, name, color, description);
});
//----------------------------------삭제 기능---------------------------

// 삭제 버튼 클릭 이벤트 처리
async function handleDeleteClick(boardId) {
  const confirmation = confirm('정말로 이 보드를 삭제하시겠습니까?');

  if (confirmation) {
    try {
      const response = await fetch(`/api/boards/${boardId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Board deleted successfully');
        $('#editModal').modal('hide');
        removeBoardFromUI(boardId);
      } else {
        console.error('Failed to delete board');
      }
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  }
}

function removeBoardFromUI(boardId) {
  const boardElement = document.querySelector(`[data-board-id="${boardId}"]`);
  if (boardElement) {
    boardElement.remove();
  }
}

// 메인 유저 정보 출력
$(document).ready(() => {
  const userId = getUserId();
  getBoardUserInfo(userId);
  // getBoardList2();
});

const getUserId = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('userId');
};

async function getBoardUserInfo(userId) {
  const response = await fetch(`/api/users/${userId}`);
  const data = await response.json();
  const userInfo = data.data;
  // const userProfileImage = document.getElementById('userProfileImage');
  const userName = document.getElementById('userName');
  const userDescription = document.getElementById('userDescription');
  // userProfileImage.src = `${userInfo.userImage}`;
  userName.innerText = `${userInfo.name}`;
  userDescription.innerText = `${userInfo.introduction}`;
}

// async function getBoardList2() {
//   const activityList = document.getElementById('activityList');

//   const response = await fetch('/api/boards');
//   const data = await response.json();
//   const boards = data.data;
//   console.log(boards);

//   activityList.innerHTML = '';

// }
