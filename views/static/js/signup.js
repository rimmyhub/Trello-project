document.getElementById('signupForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirm = document.getElementById('signupPasswordConfirm').value;
  const intro = document.getElementById('signupIntroduction').value;

  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, confirm, intro }),
    });
    console.log(response);

    if (response.ok) {
      window.location.href = '/login';
    } else {
      const signupFailedModal = new bootstrap.Modal(document.getElementById('signupFailedModal'));
      signupFailedModal.show();
    }
  } catch (error) {
    console.log('회원가입 오류', error);
  }
});
