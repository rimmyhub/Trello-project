document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // 이벤트 발생한 후 브라우저의 기본동작을 막음
});
// getElementById로 loginForm을 불러옴
// addEventListener로 submit 폼이 실행될때 함수

const email = document.getElementById('loginEmail').value;
const password = document.getElementById('loginPassword').value;
// 각 입력 영역을 가져와 변수에 저장

try {
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    window.location.href = '/main.html';
  } else {
    const loginFailedModal = new bootstrap.Modal(document.getElementById('loginFailedModal'));
    loginFailedModal.show();
  }
} catch (error) {
  console.log('로그인 오류', error);
}
