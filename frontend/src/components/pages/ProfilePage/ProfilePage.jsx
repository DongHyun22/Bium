import React, { useState, useRef, useEffect } from 'react';
import styles from './ProfilePage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { setToken, setIsLogin, setNickname, setImageId, setDisturb } from '../../../slices/userSlice';
import { GetRanking } from '../../organisms/RankingList';
import useGetBiumTime from '../../../hooks/TimeInquery';
import axios from 'axios';
import { persistor } from '../../../store/store';
import emptyprofile from '../../../asset/backgroudimage/emptyprofile.png';
import { PURGE } from 'redux-persist';
import { Fab, Action } from 'react-tiny-fab';

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === 'production' ? 'https://i9c205.p.ssafy.io' : 'http://localhost:8080';

export function ProfilePage() {
  const { userEmail } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileImageInput = useRef();
  const disturbImageInput = useRef();

  // 기존 스토어의 유저 정보
  const savedEmail = useSelector((state) => state.user.userEmail);
  const savedNickname = useSelector((state) => state.user.nickname);
  const savedTodayBium = useSelector((state) => state.user.todayBium);
  const savedTotalBium = useSelector((state) => state.user.totalBium);
  const savedProfileImage = useSelector((state) => state.user.imageId);
  const savedDisturbImage = useSelector((state) => state.user.disturb);

  // 회원 정보 수정의 기본값은 store 기본값에 한정
  const [name, setName] = useState(savedNickname);
  const [existingPassword, setExistingPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newpasswordConfirm, setNewPasswordConfirm] = useState('');
  const todayBium = useGetBiumTime(savedTodayBium);
  const totalBium = useGetBiumTime(savedTotalBium);
  const [profileImage, setProfileImage] = useState(null);
  const [disturbImage, setDisturbImage] = useState(null);

  // RankingList에서 전달하는 랭크 이모지
  const [emoji, setEmoji] = useState('');

  // 프로필 이미지와 방해이미지가 바뀌는 상태를 관리하는 state
  const [showProfile, setShowProfile] = useState(true);

  // 회원 탈퇴 확인 모달의 상태를 관리하는 state
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

  // 회원 정보 수정 모달 오픈 여부
  const [modalOpen, setModalOpen] = useState(false);

  // 프로필 이미지 저장
  const saveProfile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      dispatch(setImageId(URL.createObjectURL(file)));
      setProfileImage(file);
      return true;
    }
    return false;
  };

  // 방해 이미지 저장
  const saveDisturb = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      dispatch(setDisturb(URL.createObjectURL(file)));
      setDisturbImage(file);
    }
  };

  // 프로필 이미지 전송
  const sendToProfile = async () => {
    if (profileImage) {
      const formData = new FormData();
      formData.append('file', profileImage);
      // for (let pair of formData.entries()) {
      //   console.log('프로필 이미지 formData', pair[0] + ', ' + pair[1]);
      // }
      try {
        const profileResponse = await axios.post(APPLICATION_SERVER_URL + `/api/profile/img/${savedEmail}`, formData, {
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
        if (profileResponse.status === 200) {
          dispatch(setImageId(profileResponse.data.saveFile));
          // console.log('서버 전송 성공', profileResponse.data.saveFile);

          // 프로필 이미지 조회
          const saveFile = profileResponse.data.saveFile;
          const saveFolder = profileResponse.data.saveFolder;
          const imgType = profileResponse.data.imgType;
          const originalFile = profileResponse.data.originalFile;

          const getProfileResponse = await axios.get(
            APPLICATION_SERVER_URL + `/api/file/${saveFolder}/${imgType}/${originalFile}/${saveFile}`,
            { responseType: 'blob' }
          );

          const imgSrc = URL.createObjectURL(getProfileResponse.data);
          dispatch(setImageId(imgSrc));
        } else {
        }
      } catch (error) {}
    }
  };

  // 방해 이미지 전송
  const sendToDisturb = async () => {
    if (disturbImage) {
      const formData = new FormData();
      formData.append('file', disturbImage);
      // for (let pair of formData.entries()) {
      //   console.log('방해이미지 formData', pair[0] + ', ' + pair[1]);
      // }
      try {
        const disturbResponse = await axios.post(APPLICATION_SERVER_URL + `/api/profile/img/${savedEmail}`, formData, {
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
        if (disturbResponse.status === 200) {
          dispatch(setDisturb(disturbResponse.data.saveFile));
          // console.log('서버 전송 성공', disturbResponse);

          // 방해 이미지 조회
          const saveFile = disturbResponse.data.saveFile;
          const saveFolder = disturbResponse.data.saveFolder;
          const imgType = disturbResponse.data.imgType;
          const originalFile = disturbResponse.data.originalFile;

          const getDisturbResponse = await axios.get(
            APPLICATION_SERVER_URL + `/api/file/${saveFolder}/${imgType}/${originalFile}/${saveFile}`,
            { responseType: 'blob' }
          );

          const imgSrc = URL.createObjectURL(getDisturbResponse.data);
          dispatch(setDisturb(imgSrc));
          await saveDisturb;
        } else {
        }
      } catch (error) {}
    }
  };

  // 프로필 사진 전송과 저장
  useEffect(() => {
    if (profileImage) {
      sendToProfile();
    }
  }, [profileImage]);

  // 방해 사진 전송과 저장
  useEffect(() => {
    if (disturbImage) {
      sendToDisturb();
    }
  }, [disturbImage]);

  // 프로필 이미지 삭제
  // const deleteProfile = () => {
  //   if (savedProfileImage) {
  //     setProfileImage(null);
  //     dispatch(setImageId(null));
  //   }
  // };

  // 방해 이미지 삭제
  // const deleteDisturb = () => {
  //   if (savedDisturbImage) {
  //     setDisturbImage(null);
  //     dispatch(setDisturb(null));
  //   }
  // };

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
  const checkPassword = async () => {
    try {
      const response = await axios.post(
        APPLICATION_SERVER_URL + `/api/profile/checkpw`,
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
      if (response.status === 200) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const modifyUserInfo = async (e) => {
    e.preventDefault();

    const validatePassword = await checkPassword();

    if (validatePassword === false) {
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
      const response = await axios.post(APPLICATION_SERVER_URL + `/api/profile/modify`, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'POST'
        }
      });

      if (response.status === 200) {
        dispatch(setNickname(name));
        persistor.flush();
        closeModal();
      }
    } catch (error) {}
  };

  // 회원 탈퇴 요청
  const signOutUser = async (e) => {
    e.preventDefault();

    const validatePassword = await checkPassword();

    if (validatePassword === false) {
      alert('잘못된 비밀번호를 입력하셨습니다.');
      return;
    }

    try {
      const response = await axios.post(
        APPLICATION_SERVER_URL + `/api/profile/delete`,
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
      if (response.data === 0) {
        sessionStorage.removeItem('accessToken');
        navigate('/');
      }
    } catch (error) {
      return error;
    }
  };

  // 프로필 이미지 업로드 버튼
  const onClickProfileUpload = () => {
    profileImageInput.current.click();
  };

  // 방해 이미지 업로드 버튼
  const onClickDisturbUpload = () => {
    disturbImageInput.current.click();
  };

  // 회원 탈퇴 확인 모달을 열고 닫는 함수들
  const openDeleteConfirmModal = () => {
    setDeleteConfirmModalOpen(true);
  };

  const closeDeleteConfirmModal = () => {
    setDeleteConfirmModalOpen(false);
  };

  // 토글 버튼 상태 변경 핸들러
  const handleToggleChange = () => {
    setShowProfile(!showProfile);
  };

  const goToMainPage = () => {
    return navigate('/');
  };

  const goToGameList = () => {
    navigate(`/gameroomlist`);
  };

  const logout = (e) => {
    e.stopPropagation();
    sessionStorage.removeItem('accessToken');
    dispatch({ type: PURGE, key: 'root', result: () => null });
    dispatch(setToken(null));
    dispatch(setIsLogin(false));
  };

  // 회원 탈퇴 확인 모달에서 '예, 탈퇴합니다' 버튼을 눌렀을 때의 동작
  const confirmSignOut = (e) => {
    dispatch({ type: PURGE, key: 'root', result: () => null });
    signOutUser(e);
    alert('회원탈퇴가 완료되었습니다.');
    dispatch(setToken(null));
    dispatch(setIsLogin(false));
    closeDeleteConfirmModal();
    navigate('/');
  };

  return (
    <div className={styles.gridContainer}>
      <div className={styles.header}>
        <div className={styles.homelogo} onClick={goToMainPage}></div>
      </div>
      <div className={styles.sideLeft}>
        {showProfile ? (
          <div>
            <h3>프로필 이미지</h3>
            <div>
              <button onClick={onClickProfileUpload} className={styles.imageUpload}>
                <input
                  name="file"
                  type="file"
                  accept="image/*"
                  className={styles.imageInput}
                  ref={profileImageInput}
                  onChange={saveProfile}
                ></input>
                {savedProfileImage ? (
                  <img src={savedProfileImage} alt="미리보기" />
                ) : (
                  <img src={emptyprofile} alt="미리보기" />
                )}
              </button>
            </div>
            {/* <button onClick={sendToProfile}>이미지 저장</button>
            <div>
              <button onClick={deleteProfile}>삭제</button>
            </div> */}
          </div>
        ) : (
          <div>
            <h3>방해 이미지</h3>
            <div>
              <input
                name="file"
                type="file"
                accept="image/*"
                className={styles.imageInput}
                ref={disturbImageInput}
                onChange={saveDisturb}
              ></input>
              <button onClick={onClickDisturbUpload} className={styles.imageUpload}>
                {savedDisturbImage ? (
                  <img src={savedDisturbImage} alt="미리보기" />
                ) : (
                  <img src={emptyprofile} alt="미리보기" />
                )}
              </button>
            </div>
            {/* <button onClick={sendToDisturb}>이미지 저장</button>
            <div>
              <button onClick={deleteDisturb}>삭제</button>
            </div> */}
          </div>
        )}
        <div className={styles.toggleWrapper}>
          <label className={styles.switch}>
            <input type="checkbox" checked={showProfile} onChange={handleToggleChange} />
            <span className={styles.slider}></span>
          </label>
        </div>
        <div className={styles.myBium}>
          <h3>{emoji} {savedNickname}</h3>
          <h3>오늘 비움량 : {todayBium}</h3>
          <h3>총 비움량 : {totalBium}</h3>
          <button className={styles.modifyButton} onClick={openModal}>
            수정✏️
          </button>
        </div>
        {modalOpen && (
          <div className={styles.modal}>
            <form className={styles.modifyForm}>
              <div>
                <div>
                  <h2>회원정보 수정</h2>
                  <p>{savedEmail}</p>
                </div>
                {/* <div>{savedProfileImage && <img src={savedProfileImage} alt="미리보기" />}</div> */}
              </div>
              <label>
                닉네임
                <br />
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
                기존비밀번호
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
            <div className={styles.insertButton}>
              <button onClick={modifyUserInfo}>수정하기</button>
              <button onClick={openDeleteConfirmModal}>회원 탈퇴</button>
              <button className={styles.overlay} onClick={closeModal}>
                닫기
              </button>
            </div>
          </div>
        )}
        {/* css 적용시 .modal이 아닌 다른 css 적용 필요 */}
        {deleteConfirmModalOpen && (
          <div className={styles.signOutModal}>
            <h2>정말로 탈퇴하시겠어요?</h2>
            <label>
              회원 탈퇴를 진행하시려면 비밀번호를 입력해주세요
              <br />
              &nbsp;
              <input
                type="password"
                autoComplete="off"
                value={existingPassword}
                onChange={(e) => setExistingPassword(e.target.value)}
              />
            </label>
            <div className={styles.signOutButton}>
              <button onClick={confirmSignOut}>예</button>
              <button onClick={closeDeleteConfirmModal}>아니요</button>
            </div>
          </div>
        )}
      </div>
      <div className={styles.sideRight}>
        <GetRanking setEmoji={setEmoji} />
        <Fab alwaysShowTitle={true} icon="👤">
          <Action text="비우러 가기" onClick={goToGameList}>
            🧘🏻‍♂
          </Action>
          <Action text="로그아웃" onClick={logout}>
            💨
          </Action>
        </Fab>
      </div>
    </div>
  );
}
