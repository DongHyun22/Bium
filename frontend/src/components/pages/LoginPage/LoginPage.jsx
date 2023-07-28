import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginActions } from '../../../slices/userSlice.js';
import axios from 'axios';

// 로그인 컴포넌트
function Login() {
  const [userMail, setUserMail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  // axios 요청 함수
  const getUserInfo = (userMail, password) => {
    const API = 'http://localhost:8080/login';

    console.log(userMail, password);

    axios
      .post(
        API,
        {
          userEmail: 'ssafy',
          userPw: '1234'
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
        dispatch(loginActions.getUserInfo(userMail, password));
      })
      .catch((error) => {
        console.log(error);
        alert('로그인 실패');
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailRegex.test(userMail)) {
      alert('유효한 이메일 형식이 아닙니다.');
      return;
    }

    // axios 요청 함수
    getUserInfo(userMail, password);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="loginEmail">
          <div>
            <input
              type="input"
              id="userEmail"
              placeholder="이메일을 입력해 주세요."
              value={userMail}
              onChange={(e) => setUserMail(e.target.value)}
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
