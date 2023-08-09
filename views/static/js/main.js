const loginButton = document.getElementById('loginButton');
const signupButton = document.getElementById('signupButton');
const withdrawButton = document.getElementById('withdrawButton');

// 로그인 버튼 클릭 시
loginButton.addEventListener('click', () => {
  // 로그인 상태로 변경
  withdrawButton.style.display = 'block';
});

// 회원가입 버튼 클릭 시
signupButton.addEventListener('click', () => {
  // 회원가입 상태로 변경
  withdrawButton.style.display = 'none';
});
