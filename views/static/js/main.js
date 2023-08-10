// 페이지 로드 시 fetch 요청 보내고 데이터 처리
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api/boards'); // GET 요청을 보내는 URL을 적절히 변경해주세요
    const data = await response.json();
    updateActivityList(data.message);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
function updateActivityList(boards) {
  const activityList = document.getElementById('activityList');

  boards.forEach((board) => {
    const card = document.createElement('div');
    card.className = `board-card ${getColorClass(board.color)}`;

    const cardText = document.createElement('p');
    cardText.className = 'card-text text-start';
    cardText.textContent = `Board ID: ${board.boardId}, Name: ${board.name}`;

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'board-buttons';

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

async function handleEditClick(boardId) {
  const newData = {
    name: '트렐로프로젝트 수정',
    color: 'green',
    description: '토이 프로젝트 진행 중',
  };

  // 모달 내용 업데이트
  document.getElementById('editName').value = newData.name;
  document.getElementById('editColor').value = newData.color;
  document.getElementById('editDescription').value = newData.description;

  // 모달 열기
  $('#editModal').modal('show');

  // 저장 버튼 클릭 이벤트 처리
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
        // 수정이 성공적으로 이루어진 경우
        // 필요한 동작을 수행하세요.
        console.log('Board updated successfully');
        $('#editModal').modal('hide');
      } else {
        console.error('Failed to update board');
      }
    } catch (error) {
      console.error('Error updating board:', error);
    }
  });
}

function handleDeleteClick(boardId) {
  // 삭제 버튼을 눌렀을 때의 동작을 정의합니다.
  console.log(`Delete button clicked for boardId: ${boardId}`);
}

function getColorClass(color) {
  switch (color) {
    case 'green':
      return 'board-green';
    case 'blue':
      return 'board-blue';
    case 'red':
      return 'board-red';
    default:
      return '';
  }
}
