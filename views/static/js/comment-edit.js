const commentId = window.location.pathname.split('/')[2];
const commentInput = document.querySelector('#commentText');

const editBtn = document.querySelector('.edit');

const getData = async () => {
  try {
    const response = await fetch(`/api/comments/${commentId}`);

    const { data } = await response.json();
    console.log(data);
    const { comment } = data;
    commentInput.value = comment;
  } catch (error) {
    console.error('Error:', error);
  }
};

getData();

editBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      comment: commentInput.value,
    }),
  });
  const data = await response.json();
  console.log(data);
});
