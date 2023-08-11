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

  const sortableOptions = {
    animation: 150, // 드래그 애니메이션 지속시간 (밀리초),
    swapThreshold: 0.5, // 컬럼 스왑 임계값 설정
    onEnd: async (event) => {
      const fromIndex = event.oldIndex;
      const toIndex = event.newIndex;

      // 서버에 컬럼 순서 업데이트 요청
      try {
        const jwtToken = getJwtToken();
        const response = await fetch(`/api/${boardId}/column-order`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ fromIndex, toIndex })
        });

        if (!response.ok) {
          throw new Error('컬럼 순서를 업데이트하는데 실패하였습니다.');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 컬럼 구역 전체에 드래그 앤 드롭 기능 추가
  new Sortable(columnsContainer, sortableOptions);

  columns.forEach(column => {
    const columnSection = document.createElement('section'); // 각 컬럼의 구역 생성
    columnSection.classList.add('column-section');

    const columnTitleWrapper = document.createElement('div'); // 컬럼 제목을 감싸는 요소
    columnTitleWrapper.classList.add('column-title-wrapper');

    const columnTitle = document.createElement('h2'); // 컬럼 제목 표시
    columnTitle.textContent = column.name;
    columnTitleWrapper.appendChild(columnTitle);

    const columnElement = document.createElement('div'); // 컬럼 요소 표시
    columnElement.classList.add('column');
    columnElement.textContent = column.name;
    columnTitleWrapper.appendChild(columnElement);

    columnSection.appendChild(columnTitleWrapper);
    columnsContainer.appendChild(columnSection);

    // 컬럼 내부에서의 드래그 앤 드롭 기능 추가
    new Sortable(columnTitleWrapper, {
      animation: 150,
      swapThreshold: 0.5,
    });
  });
}
// 컬럼 생성 폼 이벤트 리스너
const createColumnForm = document.getElementById('create-column-form');
createColumnForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const columnNameInput = document.getElementById('column-name');
  const columnName = columnNameInput.value.trim();

  if (columnName) {
    try {
      const jwtToken = getJwtToken();
      const response = await fetch(`/api/${boardId}/column`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: columnName }) // 컬럼 이름 전송
      });

      if (response.ok) {
        // 성공적으로 컬럼을 생성한 경우, 화면 갱신
        columnNameInput.value = ''; // 입력 필드 초기화

        // 생성된 컬럼을 추가한 후, 컬럼을 다시 표시
        const createdColumn = await response.json();
        displayColumn(createdColumn);
      } else {
        throw new Error('컬럼 생성 실패');
      }
    } catch (error) {
      console.error(error);
    }
  }
});

// 컬럼 추가 및 화면 갱신 함수
async function displayColumn(column) {
  const columnsContainer = document.getElementById('columns-container');
  const columnSection = document.createElement('section');
  columnSection.classList.add('column-section');

  const columnTitleWrapper = document.createElement('div');
  columnTitleWrapper.classList.add('column-title-wrapper');

  const columnTitle = document.createElement('h2');
  columnTitle.textContent = column.name;
  columnTitleWrapper.appendChild(columnTitle);

  const columnElement = document.createElement('div');
  columnElement.classList.add('column');
  columnElement.textContent = column.name;
  columnTitleWrapper.appendChild(columnElement);

  columnSection.appendChild(columnTitleWrapper);
  columnsContainer.appendChild(columnSection);

  // 컬럼 내부에서의 드래그 앤 드롭 기능 추가
}


// 페이지 로드 시 컬럼 데이터 표시
document.addEventListener('DOMContentLoaded', displayColumns);