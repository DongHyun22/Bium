import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './SignupPage.module.css';

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === 'production' ? 'https://i9c205.p.ssafy.io' : 'http://localhost:8080';

export default function SignUpPage() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const isLogin = useSelector((state) => state.user.isLogin);
  useEffect(() => {
    if (isLogin || token !== null) {
      navigate('/');
    }
  }, [isLogin, navigate, token]);
  // 회원가입 요소
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  // 검사 통과 여부
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordConfirmValid, setIsPasswordConfirmValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [checkEmailDuplicate, setCheckEmailDuplicate] = useState(false);

  // 검사 결과 통보용
  const [rightEmail, setRightEmail] = useState('유효한 이메일 형식입니다');
  const [wrongEmail, setWrongEmail] = useState('형식에 맞지않는 이메일입니다');
  const [rightPassword, setRightPassword] = useState('유효한 비밀번호 형식입니다');
  const [wrongPassword, setWrongPassword] = useState('알파벳, 숫자, 특수문자를 사용하여 8자 이상 30자 이하로 작성해 주십시오');
  const [rightPasswordConfirm, setRightPasswordConfirm] = useState('비밀번호와 일치합니다');
  const [wrongPasswordConfirm, setWrongPasswordConfirm] = useState('비밀번호와 일치하지 않습니다');
  const [rightName, setRightName] = useState('유효한 이름 형식입니다');
  const [wrongName, setWrongName] = useState('형식에 맞지않는 이름입니다');

  const validateEmail = (mail) => {
    // 이메일 정규식
    const regEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    return regEx.test(mail);
  };

  const validatePassword = (event) => {
    const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^+=-])(?=.*[0-9]).{8,30}$/;
    return passwordRegEx.test(event);
  };

  const validateName = (name) => {
    const nameRegEx = /^[가-힣a-zA-Z\s]+$/;
    return nameRegEx.test(name);
  };

  const checkPassword = (password, passwordConfirm) => {
    if (password === passwordConfirm) {
      return true;
    }
    return false;
  };

  const handleChange = (e) => {
    const checkMap = {
      userEmail: setUserEmail,
      password: setPassword,
      passwordConfirm: setPasswordConfirm,
      name: setName,
      nickname: setNickname,
      isEmailValid: setIsEmailValid,
      isPasswordValid: setIsPasswordValid,
      isPasswordConfirmValid: setIsPasswordConfirmValid,
      isNameValid: setIsNameValid,
      checkEmailDuplicate: setCheckEmailDuplicate,
      rightEmail: setRightEmail,
      wrongEmail: setWrongEmail,
      rightPassword: setRightPassword,
      wrongPassword: setWrongPassword,
      rightPasswordConfirm: setRightPasswordConfirm,
      wrongPasswordConfirm: setWrongPasswordConfirm,
      rightName: setRightName,
      wrongName: setWrongName
    };

    const check = checkMap[e.target.name];
    if (check) {
      check(e.target.value);
    }
  };

  const goSignup = async (e) => {
    e.preventDefault();
    try {
      const userRegisterInfomation = {
        userEmail: userEmail,
        userPw: password,
        userName: name,
        userNickname: nickname
      };
      const response = await axios.post(APPLICATION_SERVER_URL + '/api/signup', userRegisterInfomation);
      return ;
    } catch (error) {
      return;
    }
  };

  const checkMail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(APPLICATION_SERVER_URL + '/api/signup/check', {
        params: {
          userEmail: userEmail
        }
      });

      if (response.data === 0) {
        alert('사용가능한 이메일입니다.');
        return setCheckEmailDuplicate(true);
      }
      alert('이미 가입이 된 이메일입니다.');
      return setCheckEmailDuplicate(false);
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (userEmail) {
      setIsEmailValid(validateEmail(userEmail));
    }

    if (password) {
      setIsPasswordValid(validatePassword(password));
    }

    if (passwordConfirm) {
      setIsPasswordConfirmValid(checkPassword(password, passwordConfirm));
    }

    if (name) {
      setIsNameValid(validateName(name));
    }
  }, [userEmail, password, passwordConfirm, name, isEmailValid, isPasswordValid, isPasswordConfirmValid]);

  const handleSubmit = async (e) => {

    if (checkEmailDuplicate && isEmailValid && isPasswordValid && isNameValid) {
      await goSignup(e);
      alert('회원가입에 성공 하셨습니다.');
      navigate('/login');
    } else {
      alert('회원가입에 실패 하셨습니다.');
    }
  };

  const goToMainPage = () => {
    navigate('/');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className={styles.signupbg}>
      <div className={styles.photo}>
        <h1 className={styles.titleBium} onClick={goToMainPage}>
          비 움
        </h1>
        <div className={styles.circle}>
          <div className={styles.circleLogo}></div>
        </div>
        <div className={styles.leftContent}>
          <p>이미 비움의 회원이세요?</p>
          <h3 onClick={goToLogin}>로그인</h3>
        </div>
      </div>

      <div className={styles.rightBox}>
        <h1 className={styles.titleSignup}>회원가입</h1>
        <form>
          <label htmlFor="userEmail">
            이메일 <br></br>
            <div className={styles.emailContainer}>
              <input
                type="text"
                placeholder="이메일을 입력해주세요."
                value={userEmail}
                onChange={handleChange}
                id="userEmail"
                name="userEmail"
                required
              />
              <button onClick={checkMail}>중복 확인</button>
            </div>
          </label>
          {userEmail && (
            <div className={styles.validContent}>{isEmailValid ? <p>{rightEmail}</p> : <p>{wrongEmail}</p>}</div>
          )}
          <label htmlFor="password">
            비밀번호 <br></br>
            <input
              type="password"
              autoComplete="off"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={handleChange}
              id="password"
              name="password"
              required
            />
          </label>
          {password && (
            <div className={styles.validContent}>
              {isPasswordValid ? <p>{rightPassword}</p> : <p>{wrongPassword}</p>}
            </div>
          )}
          <label htmlFor="passwordConfirm">
            비밀번호 확인 <br></br>
            <input
              type="password"
              autoComplete="off"
              placeholder="비밀번호를 다시 입력해 주세요."
              value={passwordConfirm}
              onChange={handleChange}
              id="passwordConfirm"
              name="passwordConfirm"
              required
            />
          </label>
          {passwordConfirm && (
            <div className={styles.validContent}>
              {isPasswordConfirmValid ? <p>{rightPasswordConfirm}</p> : <p>{wrongPasswordConfirm}</p>}
            </div>
          )}

          <label htmlFor="name">
            이름 <br></br>
            <input
              type="text"
              placeholder="이름을 입력해 주세요."
              value={name}
              onChange={handleChange}
              id="name"
              name="name"
              required
            />
          </label>
          {name && <div className={styles.validContent}>{isNameValid ? <p>{rightName}</p> : <p>{wrongName}</p>}</div>}

          <label htmlFor="nickname">
            닉네임 <br></br>
            <input
              type="text"
              placeholder="닉네임을 입력해 주세요."
              value={nickname}
              onChange={handleChange}
              id="nickname"
              name="nickname"
              required
            />
          </label>
        </form>
        <div className={styles.buttonContainer}>
          <button type="submit" onClick={handleSubmit} className={styles.signupButton}>
            회원가입
          </button>
          <button className={styles.cancelButton} onClick={goToMainPage}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
