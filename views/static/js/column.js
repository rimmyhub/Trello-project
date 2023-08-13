const boardId = window.location.pathname.split('/')[2];

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
        Authorization: `Bearer ${jwtToken}`,
      },
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

async function displayColumns() {
  const columnsContainer = document.getElementById('columns-container');
  columnsContainer.innerHTML = '';

  const columns = await fetchColumns();

  const sortableOptions = {
    animation: 150, // 드래그 애니메이션 지속시간 (밀리초),
    swapThreshold: 0.5, // 컬럼 스왑 임계값 설정
    onEnd: async (event) => {
      const fromIndex = event.oldIndex;
      const toIndex = event.newIndex;

      // 서버에 실제 컬럼 순서 업데이트 요청
      try {
        const jwtToken = getJwtToken();
        const response = await fetch(`/api/${boardId}/column-order`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fromIndex, toIndex }), // 실제 position 값
        });

        if (!response.ok) {
          throw new Error('컬럼 순서를 업데이트하는데 실패하였습니다.');
        }
      } catch (error) {
        console.error(error);
      }
    },
  };

  // 컬럼 구역 전체에 드래그 앤 드롭 기능 추가
  new Sortable(columnsContainer, sortableOptions);

  columns.forEach(async column => {
    const columnSection = document.createElement('section');
    columnSection.classList.add('column-section');

    const columnTitleWrapper = document.createElement('div');
    columnTitleWrapper.classList.add('column-title-wrapper');

    const columnTitle = document.createElement('h2');
    columnTitle.textContent = column.name;
    columnTitleWrapper.appendChild(columnTitle);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit Column';
    columnTitleWrapper.appendChild(editButton);

    const editForm = document.createElement('form');
    const editInput = document.createElement('input');
    const saveButton = document.createElement('button');
    const cancelButton = document.createElement('button');

    editForm.style.display = 'none';

    editInput.type = 'text';
    editInput.placeholder = 'Enter new column name';
    saveButton.textContent = 'Save';
    cancelButton.textContent = 'Cancel';

    editForm.appendChild(editInput);
    editForm.appendChild(saveButton);
    editForm.appendChild(cancelButton);
    columnTitleWrapper.appendChild(editForm);

    editButton.addEventListener('click', () => {
      columnTitle.style.display = 'none';
      editForm.style.display = 'block';
      editInput.value = column.name;
    });

    saveButton.addEventListener('click', () => {
      const newName = editInput.value.trim();
      if (newName) {
        updateColumn(column.columnId, newName);
        columnTitle.textContent = newName;
        columnTitle.style.display = 'block';
        editForm.style.display = 'none';
      }
    });

    cancelButton.addEventListener('click', () => {
      columnTitle.style.display = 'block';
      editForm.style.display = 'none';
    });

    const columnElement = document.createElement('div');
    columnElement.classList.add('column');
    columnElement.textContent = column.name;
    columnTitleWrapper.appendChild(columnElement);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Column';
    columnTitleWrapper.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
      deleteColumn(column.columnId);
    });

    // "카드 생성" 버튼 생성
    const createCardButton = document.createElement('button');
    createCardButton.textContent = '카드 생성';
    columnTitleWrapper.appendChild(createCardButton);

    // "카드 생성" 버튼의 이벤트 리스너
    createCardButton.addEventListener('click', async () => {
      const cardInfo = promptCardInfo(); // 카드 정보를 입력받는 함수 호출
      if (cardInfo) {
        const { cardName, cardColor, cardDescription, cardStartDate, cardDueDate } = cardInfo;
        createCard(column.columnId, cardName, cardColor, cardDescription, cardStartDate, cardDueDate);
      }
    });

    // 카드 정보를 입력받는 함수
    function promptCardInfo() {
      const cardName = prompt('새 카드의 이름을 입력하세요:');
      if (!cardName) return null;

      const cardColor = prompt('카드의 색상을 선택하세요 (red, blue, yellow, green 중 선택):');
      if (!['red', 'blue', 'yellow', 'green'].includes(cardColor)) return null;

      const cardDescription = prompt('카드의 설명을 입력하세요:');
      const cardStartDate = prompt('카드의 시작 날짜를 입력하세요 (YYYY-MM-DD 형식):');
      const cardDueDate = prompt('카드의 마감 날짜를 입력하세요 (YYYY-MM-DD 형식):');

      return { cardName, cardColor, cardDescription, cardStartDate, cardDueDate };
    }

    // 컬럼에 대한 카드를 가져와 표시
    const response = await fetchCardsForColumn(column.columnId);
    const cards = response.cards; // 객체 내의 cards 배열 추출
    if (Array.isArray(cards)) {
      cards.forEach(card => {
        // 컬럼 섹션 내에 카드 요소 생성 및 표시
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.textContent = card.name;
        columnTitleWrapper.appendChild(cardElement);
      });
    }

    columnSection.appendChild(columnTitleWrapper);
    columnsContainer.appendChild(columnSection);

    new Sortable(columnTitleWrapper, {
      animation: 150,
      swapThreshold: 0.5,
    });
  });
}

// 카드 생성 함수 수정
async function createCard(columnId, cardName, cardColor, cardDescription, cardStartDate, cardDueDate) {
  try {
    const jwtToken = getJwtToken();
    const response = await fetch(`/api/${columnId}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: cardName,
        color: cardColor,
        description: cardDescription,
        startDate: cardStartDate,
        dueDate: cardDueDate
      }) // 카드 정보 데이터
    });

    if (response.ok) {
      displayColumns(); // 카드 생성 후 컬럼 갱신
    } else {
      console.error('Error creating card:', error);
      throw new Error('카드 생성 실패');
    }
  } catch (error) {
    console.error(error);
  }
}

async function fetchCardsForColumn(columnId) {
  try {
    const jwtToken = getJwtToken();
    const response = await fetch(`/api/${columnId}/cards`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtToken}`
      }
    });

    if (response.ok) {
      const cards = await response.json();
      return cards; // 배열로 데이터 반환
    } else {
      console.error('Error fetching cards:', error);
      return []; // 빈 배열 반환
    }
  } catch (error) {
    console.error(error);
    return []; // 빈 배열 반환
  }
}

async function updateColumn(columnId, newName) {
  try {
    const jwtToken = getJwtToken();
    const response = await fetch(`/api/${boardId}/column/${columnId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newName }),
    });

    if (!response.ok) {
      throw new Error('컬럼 수정 실패');
    }

    displayColumns();
  } catch (error) {
    console.error(error);
  }
}

async function deleteColumn(columnId) {
  try {
    const jwtToken = getJwtToken();
    const response = await fetch(`/api/${boardId}/column/${columnId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('컬럼 삭제 실패');
    }

    displayColumns();
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', displayColumns);

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
          Authorization: `Bearer ${jwtToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: columnName }), // 컬럼 이름 전송
      });

      if (response.ok) {
        columnNameInput.value = '';

        const createdColumn = await response.json();

        // 서버에서 생성된 컬럼 객체에 position 정보가 있다고 가정합니다.
        const position = createdColumn.position;

        // 컬럼을 표시할 때 position 값을 함께 전달합니다.
        displayColumn(createdColumn, position);
      } else {
        console.error('Error updating column order:', error);
        throw new Error('컬럼 생성 실패');
      }
    } catch (error) {
      console.error(error);
    }
  }
});




// 페이지 로드 시 컬럼 데이터 표시
document.addEventListener('DOMContentLoaded', displayColumns);
