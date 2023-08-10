import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, getUserInfo } from '../../../slices/getLoginInfo';
import styles from './LoginPage.module.css';
import axios from 'axios';
const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? 'https://i9c205.p.ssafy.io' : 'http://localhost:8080';

// 로그인 컴포넌트
function LoginPage() {
  const [userEmail, setUserEmail] = useState('');
  const [userPw, setUserPw] = useState('');
  const isLogin = useSelector((state) => state.user.isLogin);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordModal, setPasswordModal] = useState(false);
  const [passwordEmail, setPasswordEmail] = useState('');

  // 컴포넌트가 렌더링될 때와 isLogin 값이 변경될 때마다 실행
  useEffect(() => {
    if (isLogin || token !== null) {
      navigate('/');
    }
  }, [isLogin]);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailRegex.test(userEmail)) {
      alert('유효한 이메일 형식이 아닙니다.');
      return;
    }

    const user = { userEmail, userPw };

    dispatch(userLogin(user))
      .then(() => {
        dispatch(getUserInfo(userEmail));
        // if (isLogin === true) {
        //   navigate('/');
        // }
      })
      .catch((error) => {
        console.error('Login failed:', error);
      });
  };

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setUserPw(e.target.value);
  };

  const goToSignUp = () => {
    return navigate('/signup');
  };

  const goToMainPage = () => {
    return navigate('/');
  };

  const findPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(APPLICATION_SERVER_URL + `/api/findpw/${passwordEmail}`);
      alert('임시 비밀번호가 이메일로 전송되었습니다.');
      console.log('전송 성공', response);
    } catch (error) {
      console.log('전송 실패', error);
    }
  };

  function openModal() {
    setPasswordModal(true);
  }

  function closeModal() {
    setPasswordModal(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="loginId">
          <label htmlFor="userEmail">
            이메일 &nbsp;
            <input type="text" id="userEmail" placeholder="이메일을 입력해 주세요." value={userEmail} onChange={handleEmailChange} />
          </label>
        </div>
        <div className="loginPassword">
          <label htmlFor="userPassword">
            비밀번호 &nbsp;
            <input type="password" id="userPassword" placeholder="비밀번호를 입력해 주세요." value={userPw} onChange={handlePasswordChange} />
          </label>
        </div>
        <div>
          <button className="loginButton">로그인</button>
        </div>
        </form>
        <div>
          <button onClick={openModal} className={styles.findpasswordbutton}>
            비밀번호 찾기
          </button>
          {passwordModal && (
            <div className={styles.modal}>
              <h2>비밀번호 찾기</h2>
              <form>
                <label>
                  이메일:
                  <input type="text" value={passwordEmail} onChange={(e) => setPasswordEmail(e.target.value)}></input>
                </label>
              </form>
              <br></br>
              <button className={styles.overlay} onClick={findPassword}>
                전송
              </button>
              <button className={styles.overlay} onClick={closeModal}>
                닫기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
