import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginActions } from '../../../slices/userSlice.js';
import axios from 'axios';

// 로그인 컴포넌트
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  // axios 요청 함수
  const getUserInfo = (email, password) => {
    const API = 'url';

    console.log(email, password);

    axios
      .post(
        API,
        {
          email: email,
          password: password
        },
        {
          // headers: {
          //     Authorization: `Bearer ${token}`,
          // },
        }
      )
      .then((response) => {
        console.log(response.data);
        console.log('로그인 되었습니다.');
        // userSlice의 actions를 불러옴
        dispatch(loginActions.getUserInfo(email, password));
      })
      .catch((error) => {
        console.log(error);
        window.alert('로그인 실패');
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      alert('유효한 이메일 형식이 아닙니다.');
      return;
    }

    // axios 요청 함수
    getUserInfo(email, password);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="loginId">
          <div>
            <input
              type="input"
              id="userEmail"
              placeholder="이메일을 입력해 주세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="loginPassword">
          <div>
            <input
              type="password"
              id="userPassword"
              placeholder="비밀번호를 입력해 주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button className="loginButton">로그인</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
