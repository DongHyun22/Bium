import React, { useState, useEffect } from 'react';
import styles from './ProfilePage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  setNickname,
  setUserEmail,
  setImageId,
  setDisturb,
  setImgType,
  setSaveFile,
  setSaveFolder,
  setOriginalFile
} from '../../../slices/userSlice';
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
  const savedDisturbImage = useSelector((state) => state.user.disturb);
  const saveFile = useSelector((state) => state.user.saveFile);
  const saveFolder = useSelector((state) => state.user.saveFolder);
  const imgType = useSelector((state) => state.user.imgType);
  const originalFile = useSelector((state) => state.user.originalFile);

  // 회원 정보 수정의 기본값은 store 기본값에 한정
  const [name, setName] = useState(savedNickname);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const todayBium = useGetBiumTime(savedTodayBium);
  const totalBium = useGetBiumTime(savedTotalBium);
  const [profileimage, setProfileImage] = useState(null);
  const [disturbImage, setDisturbImage] = useState(null);

  // 회원 탈퇴 확인 모달의 상태를 관리하는 state
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

  // 회원 정보 수정 모달 오픈 여부
  const [modalOpen, setModalOpen] = useState(false);

  // 프로필 이미지 저장
  const saveProfile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log('file', file);
    if (file) {
      dispatch(setImageId(URL.createObjectURL(file)));
      setProfileImage(file);
      console.log('프로필 이미지', file);
    }
  };
  // 방해 이미지 저장
  const saveDisturb = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log('file', file);
    if (file) {
      dispatch(setDisturb(URL.createObjectURL(file)));
      setDisturbImage(file);
      console.log('방해 이미지', file);
    }
  };

  // 프로필 이미지 전송
  const sendToProfile = async (e) => {
    e.preventDefault();
    if (profileimage) {
      console.log('프로필 이미지', profileimage);
      const formData = new FormData();
      formData.append('file', profileimage);
      // formData.append('file', new Blob([JSON.stringify(profileimage)], { type: 'application/json' }));
      for (let pair of formData.entries()) {
        console.log('프로필 이미지 formData', pair[0] + ', ' + pair[1]);
      }
      console.log(formData);
      try {
        const uploadResponse = await axios.post(`http://localhost:8080/api/profile/img/${savedEmail}`, formData, {
          params: {
            imgType: 1
          },
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          transformRequest: [
            function () {
              return formData;
            }
          ]
        });
        console.log(uploadResponse.data);
        // if (response.status === 200 && response.data.imageUrl) {
        if (uploadResponse.status === 200) {
          dispatch(setImageId(uploadResponse.data.saveFile));

          // dispatch(setSaveFolder(response.data.saveFolder))
          // dispatch(setSaveFile(response.data.saveFile))
          // dispatch(setImgType(response.data.imgType))
          // dispatch(setOriginalFile(response.data.originalFile))

          console.log(dispatch(setImageId(uploadResponse.data.saveFile)));
          console.log('서버 전송 성공', uploadResponse.data.saveFile);

          const saveFile = uploadResponse.data.saveFile;
          const saveFolder = uploadResponse.data.saveFolder;
          const imgType = uploadResponse.data.imgType;
          const originalFile = uploadResponse.data.originalFile;

          const getResponse = await axios.get(
            `http://localhost:8080/api/file/${saveFolder}/${imgType}/${originalFile}/${saveFile}`,
            {responseType: "blob"}
          );

          let imgSrc = URL.createObjectURL(getResponse.data);

          console.log('조회 성공', imgSrc);
        } else {
          console.log('서버 응답 오류');
        }
      } catch (error) {
        console.log('전송 실패', error);
      }
    }
  };

  // // 프로필 이미지 조회
  // const getImage = () => {
  //   try {
  //     const response = axios.get(`http://localhost:8080/api/file/${saveFolder}/${imgType}/${originalFile}/${saveFile}`)
  //     console.log(response)
  //     console.log('조회 성공', response)
  //   } catch(error) {
  //     console.log('조회 실패', error)
  //   }
  // }

  // 방해 이미지 전송
  const sendToDisturb = async (e) => {
    e.preventDefault();
    if (profileimage) {
      console.log('방해이미지', profileimage);
      const formData = new FormData();
      formData.append('file', profileimage);
      // formData.append('file', new Blob([JSON.stringify(profileimage)], { type: 'application/json' }));
      for (let pair of formData.entries()) {
        console.log('방해이미지 formData', pair[0] + ', ' + pair[1]);
      }
      console.log(formData);
      try {
        const response = await axios.post(`http://localhost:8080/api/profile/img/${savedEmail}`, formData, {
          params: {
            imgType: 2
          },
          headers: {
            'Content-Type': 'multipart/form-data'
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
          dispatch(setDisturb(response.data.saveFile));
          console.log('서버 전송 성공', response);
        } else {
          console.log('서버 응답 오류');
        }
      } catch (error) {
        console.log('전송 실패', error);
      }
    }
  };
  // useEffect(() => {
  //   if (savedProfileImage) {
  //     setProfileImage(savedProfileImage);
  //     console.log('savedProfileImage1', savedProfileImage);
  //     console.log('setProfileImage1', setProfileImage);
  //   } else {
  //     setProfileImage(null);
  //   }
  // }, [savedProfileImage]);

  // 프로필 이미지 삭제
  const deleteProfile = () => {
    if (profileimage) {
      setProfileImage(null);
      dispatch(setImageId(null));
    }
  };

  // 방해 이미지 삭제
  const deleteDisturb = () => {
    if (disturbImage) {
      setDisturbImage(null);
      dispatch(setDisturb(null));
    }
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
    <>
      <h1>ProfilePage</h1>
      <div>
        <div>
          <p>프로필 이미지</p>
          {savedProfileImage && <img src={savedProfileImage} alt="미리보기" />}
          <div>
            <input name="file" type="file" accept="image/*" onChange={saveProfile}></input>
          </div>
          <button onClick={sendToProfile}>이미지 서버 전송</button>
          <div>
            <button onClick={deleteProfile}>삭제</button>
          </div>
        </div>
        <div>
          <p>방해 이미지</p>
          {savedDisturbImage && <img src={savedDisturbImage} alt="미리보기" />}
          <div>
            <input name="file" type="file" accept="image/*" onChange={saveDisturb}></input>
          </div>
          <button onClick={sendToDisturb}>이미지 서버 전송</button>
          <div>
            <button onClick={deleteDisturb}>삭제</button>
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
