import React, { useState, useEffect } from 'react';
import styles from './ProfilePage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { setIsLogin, setNickname, setUserEmail } from '../../../slices/userSlice';
import { GetRanking } from '../../organisms/RankingList';
import useGetBiumTime from '../../../hooks/TimeInquery';
import axios from 'axios';
import { persistor } from '../../../store/store';

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
  const [name, setName] = useState(savedNickname);
  const [existingPassword, setExistingPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newpasswordConfirm, setNewPasswordConfirm] = useState('');
  const todayBium = useGetBiumTime(savedTodayBium);
  const totalBium = useGetBiumTime(savedTotalBium);

  // 회원 탈퇴 확인 모달의 상태를 관리하는 state
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

  // 회원 정보 수정 모달 오픈 여부
  const [modalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  // 모달창을 닫을 시 기존 input에 입력된 값 초기화
  function closeModal() {
    setModalOpen(false);
    setName(savedNickname);
    setExistingPassword('');
    setNewPassword('');
    setNewPasswordConfirm('');
  }

  // 기존 비밀번호 확인
  const checkPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8080/api/profile/checkpw`,
        {
          userEmail: savedEmail,
          userPw: existingPassword
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        return true;
      }
      console.log(response.status);
      return false;
    } catch (error) {
      return error;
    }
  };

  const modifyUserInfo = async (e) => {
    e.preventDefault();

    if (checkPassword === false) {
      alert('잘못된 비밀번호를 입력하셨습니다.');
      return; 
    }

    try {
      if (newPassword !== newpasswordConfirm) {
        return alert('비밀번호가 일치하지 않습니다.');
      }

      const data = {
        userEmail: savedEmail,
        userNickname: name,
        userPw: newPassword
      };
      console.log(data);
      const response = await axios.post(`http://localhost:8080/api/profile/modify`, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'POST'
          // Authorization: `Bearer ${accessToken}`
        }
      });

      console.log(response.data);
      if (response.status === 200) {
        console.log('회원 정보 수정 성공');
        dispatch(setNickname(name));
        // setName(updatedNickname);
        persistor.flush();
        closeModal();
      }
    } catch (error) {
      console.error('회원 정보 수정에 실패하였습니다.', error);
    }
  };

  // 회원 탈퇴 요청
  const signOutUser = async (e) => {
    e.preventDefault();

    if (checkPassword === false) {
      alert('잘못된 비밀번호를 입력하셨습니다.');
      return; 
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/profile/delete`,
        {},
        {
          params: {
            userEmail: savedEmail
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response.data);
      if (response.data === 0) {
        sessionStorage.removeItem('accessToken');
        navigate('/');
      }
    } catch (error) {
      console.log('에러났어요~');
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
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
  const confirmSignOut = (e) => {
    signOutUser(e);
    closeDeleteConfirmModal();
  };

  useEffect(() => {}, []);

  return (
    <div className={styles.gridContainer}>
      <div className={styles.header}>
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <h1>ProfilePage</h1>
        </div>
      </div>
      <div className={styles.sideLeft}>
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
              <div>{name}</div>
              <label>
                닉네임:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </label>
              <br />
              <label>
                기존비밀번호:
                <input
                  type="password"
                  autoComplete="off"
                  value={existingPassword}
                  onChange={(e) => setExistingPassword(e.target.value)}
                />
              </label>
              <br />
              <label>
                비밀번호:
                <input
                  type="password"
                  autoComplete="off"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </label>
              <br />
              <label>
                비밀번호확인:
                <input
                  type="password"
                  autoComplete="off"
                  value={newpasswordConfirm}
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
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
      <div className={styles.sideRight}>
        <GetRanking />
      </div>
    </div>
  );
}
