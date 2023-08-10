document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // 이벤트 발생한 후 브라우저의 기본동작을 막음

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      window.location.href = './main.html';
    } else {
      const loginFailedModal = new bootstrap.Modal(document.getElementById('loginFailedModal'));
      loginFailedModal.show();
    }
  } catch (error) {
    console.log('로그인 오류', error);
  }
});
