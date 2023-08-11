const cardId = window.location.pathname.split('/')[2];

const commentInput = document.querySelector('#commentText');
const editBtn = document.querySelector('.edit');

editBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`/api/comments/${cardId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        comment: commentInput.value,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data) {
      window.location.href = `/card/${cardId}`;
    }
  } catch (error) {
    console.log(error);
  }
});
