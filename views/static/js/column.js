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

async function displayColumns() {
  const columnsContainer = document.getElementById('columns-container');
  columnsContainer.innerHTML = '';

  const columns = await fetchColumns();

  const sortableOptions = {
    animation: 150, // 드래그 애니메이션 지속시간 (밀리초),
    swapThreshold: 0.5, // 컬럼 스왑 임계값 설정
    onEnd: async (event) => {
      const fromposition = event.oldIndex;
      const toposition = event.newIndex;

      // 서버에 컬럼 순서 업데이트 요청
      try {
        const jwtToken = getJwtToken();
        const response = await fetch(`/api/${boardId}/column-order`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ columnOrder: { fromposition, toposition } })
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

  new Sortable(columnsContainer, sortableOptions);

  columns.forEach(column => {
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

    columnSection.appendChild(columnTitleWrapper);
    columnsContainer.appendChild(columnSection);

    new Sortable(columnTitleWrapper, {
      animation: 150,
      swapThreshold: 0.5,
    });
  });
}

async function updateColumn(columnId, newName) {
  try {
    const jwtToken = getJwtToken();
    const response = await fetch(`/api/${boardId}/column/${columnId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newName })
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
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json'
      }
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
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: columnName }) // 컬럼 이름 전송
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

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete Column';
  columnTitleWrapper.appendChild(deleteButton);

  deleteButton.addEventListener('click', () => {
    deleteColumn(column.columnId);
  });

  columnSection.appendChild(columnTitleWrapper);
  columnsContainer.appendChild(columnSection);

  new Sortable(columnTitleWrapper, {
    animation: 150,
    swapThreshold: 0.5,
  });
}



// 페이지 로드 시 컬럼 데이터 표시
document.addEventListener('DOMContentLoaded', displayColumns);
