import React, { useState, useEffect } from 'react';
import styles from './ProfilePage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { setUserEmail } from '../../../slices/userSlice';
import { GetRanking } from '../../organisms/RankingList';
import { getUserInfo } from '../../../slices/getLoginInfo';
import axios from 'axios';

export function ProfilePage() {
  const { userEmail } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 기존 스토어의 유저 정보
  const savedEmail = useSelector((state) => state.user.userEmail);
  const savedNickname = useSelector((state) => state.user.nickname);
  const savedTodayBium = useSelector((state) => state.user.todayBium);
  const savedTotalBium = useSelector((state) => state.user.totalBium);

  // 회원 정보 수정의 기본값은 store 기본값에 한정한다.
  const [nickname, setNickname] = useState(savedNickname);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  //모달 오픈 여부
  const [modalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  const modifyUserInfo = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return true;
    }

    const response = axios.get(` http://localhost:8080/api/profile/modify/${savedEmail}`, {
      nickname,
      password
    });

    if (response.status === 200) {
      // 통신이 성공한 경우 변경된 닉네임을 다시 스토어에 넣어준다.
      dispatch(setNickname(response.data.userInfo.userNickname));
    }
  };

  const popSignout = () => {
    
    
  }

  const signOutUser = async (e) => {
    e.preventDefault();
    try {
      const response = axios.post(`http://localhost:8080/api/profile/delete`, {
        params: {
          userEmail: savedEmail
        }
      });
      if (response.data === 0) {
        sessionStorage.removeItem('accessToken');
        navigate('/');
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    // useFarams에 값을 넣기위한 함수
    const getUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/info/${userEmail}`);
        dispatch(setUserEmail(response.data.userInfo.userEmail));
      } catch (error) {
        console.error(error);
      }
    };

    getUserInfo();
  }, [userEmail, dispatch]);

  return (
    <>
      <h1>ProfilePage</h1>
      <div>
        <h3>오늘 비움량</h3>
        <h3>{savedTodayBium}</h3>
        <h3>총 비움량</h3>
        <h3>{savedTotalBium}</h3>
        <button onClick={openModal}>회원 정보 수정</button>
        {modalOpen && (
          <div className={styles.modal}>
            <h2>회원정보 수정</h2>
            <form>
              <div>{savedEmail}</div>
              <label>
                닉네임:
                <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
              </label>
              <label>
                비밀번호:
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
              </label>
              <label>
                비밀번호확인:
                <input type="text" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
              </label>
            </form>
            <button onClick={modifyUserInfo}>수정하기</button>
            {/* <button onClick={popSignout}>회원탈퇴</button> */}
            <button className={styles.overlay} onClick={closeModal}>
              닫기
            </button>
          </div>
        )}
      </div>
      {/* <GetRanking /> */}
    </>
  );
}
