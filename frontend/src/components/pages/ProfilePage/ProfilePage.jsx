import React, { useState, useEffect } from 'react';
import styles from './ProfilePage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { setNickname, setUserEmail, setImageId } from '../../../slices/userSlice';
import { GetRanking } from '../../organisms/RankingList';
import { getUserInfo } from '../../../slices/getLoginInfo';
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
  const savedProfileImage = useSelector((state) => state.user.imageId);

  // 회원 정보 수정의 기본값은 store 기본값에 한정
  const [name, setName] = useState(savedNickname);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const todayBium = useGetBiumTime(savedTodayBium);
  const totalBium = useGetBiumTime(savedTotalBium);
  const [profileimage, setProfileImage] = useState(null);

  // 회원 탈퇴 확인 모달의 상태를 관리하는 state
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

  // 회원 정보 수정 모달 오픈 여부
  const [modalOpen, setModalOpen] = useState(false);

  // 파일 저장
  const saveFileImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log('file', file);
    if (file) {
      // setProfileImage(URL.createObjectURL(file));
      dispatch(setImageId(URL.createObjectURL(file)));
      setProfileImage(file);
      console.log('dfasdfasdfa', file);
      const blob = new Blob([JSON.stringify(file)], { type: 'image/png' });
      console.log('sedfdafdfasdfd', blob);
    }
  };

  const sendToServer = async (e) => {
    e.preventDefault();
    if (profileimage) {
      const formData = new FormData();
      const blobProfileImage = new Blob([JSON.stringify(profileimage)], { type: 'image/png' });
      // console.log('역이ㅕㄱ이ㅕㅣ', blobProfileImage);
      formData.append('file', blobProfileImage);
      console.log('adfdsfasdfa', e.target.file);
      // formData.append('file', new Blob([JSON.stringify(profileimage)], { type: 'application/json' }));
      for (let pair of formData.entries()) {
        console.log('formdat', pair[0] + ', ' + pair[1]);
      }
      console.log(formData);
      try {
        const response = await axios.post(`http://localhost:8080/api/profile/img/${savedEmail}`, formData, {
          params: {
            imgType: 1
          },
          headers: {
            'Content-Type': 'multipart/form-data'
            // Accept: 'application/json'
          },
          transformRequest: [
            function () {
              return formData;
            }
          ]
        });
        console.log(response.data);
        // if (response.status === 200 && response.data.imageUrl) {
        if (response.status === 200) {
          dispatch(setImageId(response.data.imageUrl));
          console.log('서버 전송 성공', response);
        } else {
          console.log('서버 응답 오류');
        }
      } catch (error) {
        console.log('전송 실패', error);
      }
    }
  };
  useEffect(() => {
    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
      console.log('savedProfileImage1', savedProfileImage);
      console.log('setProfileImage1', setProfileImage);
    } else {
      setProfileImage(null);
    }
  }, [savedProfileImage]);

  // 파일 삭제
  const deleteFileImage = () => {
    if (profileimage) {
      URL.revokeObjectURL(profileimage);
    }
    setProfileImage(null);
    dispatch(setImageId(null));
  };

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  const modifyUserInfo = async (e) => {
    e.preventDefault();
    try {
      if (password !== passwordConfirm) {
        return alert('비밀번호가 일치하지 않습니다.');
      }

      const data = {
        userEmail: savedEmail,
        userNickname: name,
        userPw: password
      };
      const response = await axios.post(`http://localhost:8080/api/profile/modify`, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'POST'
          // Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.status === 200) {
        dispatch(setNickname(name));
        // setName(updatedNickname);
        persistor.flush();
      }
    } catch (error) {
      console.error('회원 정보 수정에 실패하였습니다.', error);
    }
  };

  // 회원 탈퇴 요청
  const signOutUser = async (e) => {
    e.preventDefault();
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
    <>
      <h1>ProfilePage</h1>
      <div>
        <div>
          <p>이미지</p>
          {savedProfileImage && <img src={savedProfileImage} alt="미리보기" />}
          <div>
            <input name="file" type="file" accept="image/*" onChange={saveFileImage}></input>
          </div>
          <button onClick={sendToServer}>이미지 서버 전송</button>
          <div>
            <button onClick={deleteFileImage}>삭제</button>
          </div>
        </div>
        <h3>닉네임</h3>
        <h3>{savedEmail}</h3>
        <h3>오늘 비움량</h3>
        <h3>{todayBium}</h3>
        <h3>총 비움량</h3>
        <h3>{totalBium}</h3>
        <button onClick={openModal}>회원 정보 수정</button>
        {modalOpen && (
          <div className={styles.modal}>
            <h2>회원정보 수정</h2>
            <form>
              <div>{profileimage && <img src={profileimage} alt="미리보기" />}</div>
              <div>{savedNickname}</div>
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
                비밀번호:
                <input type="password" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
              </label>
              <br />
              <label>
                비밀번호확인:
                <input type="password" autoComplete="off" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
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
