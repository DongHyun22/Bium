import React, { useState, useEffect } from 'react';
import styles from './ProfilePage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { setIsLogin, setUserEmail } from '../../../slices/userSlice';
import { GetRanking } from '../../organisms/RankingList';
import useGetBiumTime from '../../../hooks/TimeInquery';
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
  // const confirmIslogin = useSelector((state) => state.user.isLogin);
  // console.log(confirmIslogin);

  // 회원 정보 수정의 기본값은 store 기본값에 한정
  const [nickname, setNickname] = useState(savedNickname);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const todayBium = useGetBiumTime(savedTodayBium);
  const totalBium = useGetBiumTime(savedTotalBium);

  // 회원 탈퇴 확인 모달의 상태를 관리하는 state
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

  // 회원 정보 수정 모달 오픈 여부
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

    const response = axios.get(` https://i9c205.p.ssafy.io/api/profile/modify/${savedEmail}`, {
      nickname,
      password
    });

    if (response.status === 200) {
      // 통신이 성공한 경우 변경된 닉네임을 다시 스토어에 넣어준다.
      dispatch(setNickname(response.data.userInfo.userNickname));
    }
  };

  // 회원 탈퇴 요청
  const signOutUser = async (e) => {
    e.preventDefault();
    try {
      const response = axios.post(`https://i9c205.p.ssafy.io/api/profile/delete`, {
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

  // 회원 탈퇴 확인 모달을 열고 닫는 함수들
  const openDeleteConfirmModal = () => {
    setDeleteConfirmModalOpen(true);
  };

  const closeDeleteConfirmModal = () => {
    setDeleteConfirmModalOpen(false);
  };

  // 회원 탈퇴 확인 모달에서 '예, 탈퇴합니다' 버튼을 눌렀을 때의 동작
  const confirmSignOut = () => {
    signOutUser();
    closeDeleteConfirmModal();
  };

  useEffect(() => {
    // 세션 스토리지에서 userEmail 값을
    const sessionUserEmail = window.sessionStorage.getItem('userEmail');

    // 세션 스토리지와 스토어의 userEmail 값이 다른 경우 스토어를 업데이트합니다.
    if (sessionUserEmail && (!userEmail || userEmail === '')) {
      dispatch(setUserEmail(sessionUserEmail));
    }
  }, [dispatch]);

  return (
    <>
      <h1>ProfilePage</h1>
      <div>
        <h3>닉네임</h3>
        <h3>{savedNickname}</h3>
        <h3>오늘 비움량</h3>
        <h3>{todayBium}</h3>
        <h3>총 비움량</h3>
        <h3>{totalBium}</h3>
        <button onClick={openModal}>회원 정보 수정</button>
        {modalOpen && (
          <div className={styles.modal}>
            <h2>회원정보 수정</h2>
            <form>
              <div>{savedNickname}</div>
              <label>
                닉네임:
                <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
              </label>
              <br />
              <label>
                비밀번호:
                <input
                  type="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <br />
              <label>
                비밀번호확인:
                <input
                  type="password"
                  autoComplete="off"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </label>
            </form>
            <button onClick={modifyUserInfo}>수정하기</button>
            <button onClick={openDeleteConfirmModal}>회원 탈퇴</button>

            <button className={styles.overlay} onClick={closeModal}>
              닫기
            </button>
          </div>
        )}
        {/* css 적용시 .modal이 아닌 다른 css 적용 필요 */}
        {deleteConfirmModalOpen && (
          <div className={styles.modal}>
            <h2>정말로 탈퇴하시겠어요?</h2>

            <button onClick={confirmSignOut}>예</button>
            <button onClick={closeDeleteConfirmModal}>아니요</button>
          </div>
        )}
      </div>
      <GetRanking />
    </>
  );
}
