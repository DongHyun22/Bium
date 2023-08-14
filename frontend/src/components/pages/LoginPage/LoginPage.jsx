import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, getUserInfo } from '../../../slices/getLoginInfo';
import styles from './LoginPage.module.css';
import axios from 'axios';
const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === 'production' ? 'https://i9c205.p.ssafy.io' : 'http://localhost:8080';

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
        navigate('/gameroomlist');
      })
      .catch((error) => {});
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
    } catch (error) {
      return;
    }
  };

  function openModal() {
    setPasswordModal(true);
  }

  function closeModal() {
    setPasswordModal(false);
  }

  return (
    <div className={styles.loginpagebg}>
      <div className={styles.photo}>
        <h1 className={styles.titlebium} onClick={goToMainPage}>
          비 움
        </h1>
        <div className={styles.circle}>
          <div className={styles.circlelogo}></div>
        </div>
        <div className={styles.leftcontent}>
          <p>아직 비움의 회원이 아니세요?</p>
          <h3 onClick={goToSignUp}>회원가입</h3>
        </div>
      </div>

      <div className={styles.rightbox}>
        <h1 className={styles.titlelogin}>로그인</h1>
        <form>
          <label htmlFor="userEmail" className={styles.loginid}>
            이메일 <br></br>
            <input
              type="text"
              id="userEmail"
              placeholder="이메일을 입력해 주세요."
              value={userEmail}
              className={styles.logininput}
              onChange={handleEmailChange}
            />
          </label>
          <label htmlFor="userPassword" className={styles.loginpassword}>
            비밀번호 <br></br>
            <input
              type="password"
              id="userPassword"
              placeholder="비밀번호를 입력해 주세요."
              value={userPw}
              className={styles.logininput}
              onChange={handlePasswordChange}
            />
          </label>
          <p className={styles.findpassword} onClick={openModal}>
            비밀번호 찾기
          </p>
        </form>
        <div className={styles.buttoncontainer}>
          <button className={styles.loginbutton} onClick={handleSubmit}>
            로그인
          </button>
          <button className={styles.cancelbutton} onClick={goToMainPage}>
            취소
          </button>
        </div>
        <div>
          {passwordModal && (
            <div className={styles.findPwModal}>
              <h2 className={styles.titleFindPw}>비밀번호 찾기</h2>
              <hr className={styles.hrFindPw}></hr>
              <form>
                <label className={styles.labelFindPw}>
                  이메일
                  <input
                    type="text"
                    value={passwordEmail}
                    className={styles.logininput}
                    placeholder="회원가입한 이메일을 입력해주세요."
                    onChange={(e) => setPasswordEmail(e.target.value)}
                  ></input>
                </label>
              </form>
              <br></br>
              <div className={styles.containerBtnFindPw}>
                <button className={styles.btnSubmitFindPw} onClick={findPassword}>
                  전송
                </button>
                <button className={styles.btnCloseFindPw} onClick={closeModal}>
                  닫기
                </button>
              </div>             
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
