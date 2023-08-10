const boardId = window.location.pathname.split('/')[1];

console.log(boardId);

function getJwtToken() {
  return localStorage.getItem('jwtToken');
}

async function fetchColumns() {
  try {
    const jwtToken = getJwtToken();

    const response = await fetch(`/api/${boardId}/column`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtToken}`
      }
    });

    if (!response.ok) {
      throw new Error('컬럼 정보를 불러오는데 실패하였습니다.');
    }

    const columns = await response.json();
    return columns;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// DOM에 컬럼 데이터 표시하는 함수
async function displayColumns() {
  const columnsContainer = document.getElementById('columns-container'); // 컬럼을 표시할 컨테이너 선택

  const columns = await fetchColumns(); // 서버에서 컬럼 정보 가져오기

  // 각 컬럼을 구역에 표시
  columns.forEach(column => {
    const columnSection = document.createElement('section'); // 각 컬럼의 구역 생성
    columnSection.classList.add('column-section');

    const columnTitle = document.createElement('h2'); // 컬럼 제목 표시
    columnTitle.textContent = column.name;
    columnSection.appendChild(columnTitle);

    const columnElement = document.createElement('div'); // 컬럼 요소 표시
    columnElement.classList.add('column');
    columnElement.textContent = column.title;
    columnSection.appendChild(columnElement);

    columnsContainer.appendChild(columnSection);
  });
}

// 페이지 로드 시 컬럼 데이터 표시
document.addEventListener('DOMContentLoaded', displayColumns);