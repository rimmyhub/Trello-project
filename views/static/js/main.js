//페이지 로드 시 fetch 요청 보내고 데이터 처리
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api/boards'); // GET 요청을 보내는 URL을 적절히 변경해주세요
    const data = await response.json(); // 서버 응답 데이터를 json파싱
    updateActivityList(data.message); // 파싱한 데이터로 화면 업데이트 함수 호출
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

function updateActivityList(boards) {
  const activityList = document.getElementById('activityList'); // activityList 요소 가져오기

  boards.forEach((board) => {
    const card = document.createElement('div'); // 새로운 div 요소 생성
    card.className = `board-card ${getColorClass(board.color)}`; //css클래스 추가

    const cardText = document.createElement('p'); // 새로운 p 요소 생성
    cardText.className = 'card-text text-start'; // css클래스 추가
    cardText.textContent = `Board ID: ${board.boardId}, Name: ${board.name}`; // 텍스트 내용 설정

    const buttonsDiv = document.createElement('div'); // 새로운 div 요소 생성
    buttonsDiv.className = 'board-buttons'; // css 클래스 추가

    const getButton = document.createElement('button');
    getButton.className = 'get-button btn btn-primary btn-sm'; // css 클래스 추가
    getButton.textContent = '조회'; // 버튼 텍스트 설정
    getButton.addEventListener('click', () => handleEditClick(boards)); // 클릭 이벤트 리스너 추가

    const createButton = document.createElement('button');
    createButton.className = 'create-button btn btn-primary btn-sm'; // css 클래스 추가
    createButton.textContent = '생성'; // 버튼 텍스트 설정
    createButton.addEventListener('click', () => handleEditClick(boards)); // 클릭 이벤트 리스너 추가

    const editButton = document.createElement('button'); // 새로운 button 요소 생성
    editButton.className = 'edit-button btn btn-primary btn-sm'; // css 클래스 추가
    editButton.textContent = '수정'; // 버튼 텍스트 설정
    editButton.addEventListener('click', () => handleEditClick(board.boardId)); // 클릭 이벤트 리스너 추가

    const deleteButton = document.createElement('button'); // 새로운 button 요소 생성
    deleteButton.className = 'delete-button btn btn-danger btn-sm'; // css 클래스를 추가
    deleteButton.textContent = '삭제'; // 버튼 텍스트 설정
    deleteButton.addEventListener('click', () => handleDeleteClick(board.boardId)); // 클릭 이벤트 리스너 추가

    buttonsDiv.appendChild(editButton); // 버튼을 buttonsDiv에 추가
    buttonsDiv.appendChild(deleteButton); // 버튼을 buttonsDiv에 추가

    card.appendChild(cardText); // card에 cardText를 추가
    card.appendChild(buttonsDiv); // card에 buttonsDiv를 추가

    activityList.appendChild(card); // activityList에 card 추가
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
  // 보드 전체 조회

  $(document).ready(function () {
    $('#getBoardButton').click(function () {
      $.get('/api/boards', function (data) {
        // 서버에서 받아온 데이터를 처리하는 로직을 추가할 수 있습니다.
        console.log(data); // 예시로 콘솔에 데이터를 출력합니다.
      });
    });
  });

  // -----------------------------------------------------------------------------------
  // 페이지 로드 시 fetch 요청 보내고 데이터 처리
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('/api/boards'); // GET 요청을 보내는 URL을 적절히 변경해주세요
      const data = await response.json(); // 서버 응답 데이터를 json파싱
      updateActivityList(data.message); // 파싱한 데이터로 화면 업데이트 함수 호출
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });

  // 모달 내용 업데이트: 공통인지 수정용인지 고민해보기
  document.getElementById('editName').value = newData.name; // 모달 내 입력 필드
  document.getElementById('editColor').value = newData.color; // 모달 내 입력 필드
  document.getElementById('editDescription').value = newData.description; //모달 내 입력 필드

  // 모달 열기
  $('#editModal').modal('show'); // 모달을 열어서 보여줌

  // 보드 생성 버튼 클릭 이벤트 처리
  document.getElementById('createBoardButton').addEventListener('click', () => {
    $('#createModal').modal('show');
  });

  // 이하 생략

  //---------------------------------------------------------------------------------------

  // 수정 - 저장 버튼 클릭 이벤트 처리
  document.getElementById('editSaveButton').addEventListener('click', async () => {
    const editedData = {
      name: document.getElementById('editName').value, // 모달 내 입력 필드 값 가져옴
      color: document.getElementById('editColor').value, // 모달 내 입력 필드 값 가져옴
      description: document.getElementById('editDescription').value, // 모달 내 입력 필드 값 가져옴
    };

    try {
      // 실제 서버와 통신하는 코드
      const response = await fetch(`/api/boards/${boardId}`, {
        method: 'PUT', // http put 메서드를 사용하여 수정 요청을 보냄
        headers: {
          'Content-Type': 'application/json', // 요청 헤더에 json 형식의 데이터를 전송한다고 지정
        },
        body: JSON.stringify(editedData), // 수정한 데이터를 json 문자열로 변환하여 요청 본문에 담음
      });

      if (response.ok) {
        // 수정이 성공적으로 이루어진 경우
        // 필요한 동작을 수행하세요.
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
  // 보드의 색상에 따라 해당하는 css 클래스 이름 반환
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
//----------------------------------삭제 기능---------------------------
// 현재 로그인한 사용자의 정보를 얻어오는 함수
// async function getLoggedInUser() {
//   try {
//     const response = await fetch('/api/current-user'); // 백엔드에서 현재 로그인한 사용자의 정보를 반환하는 엔드포인트
//     const user = await response.json();
//     return user;
//   } catch (error) {
//     console.error('Error fetching logged-in user:', error);
//     return null;
//   }
// }

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
        // 삭제 성공
        alert('Board deleted successfully');
        $('#editModal').modal('hide');
        location.reload();
      } else {
        console.error('Failed to delete board');
      }
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  }
}
