import React, { useState } from 'react';
import styles from './ProfilePage.module.css';
import {  useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { GetRanking } from '../../organisms/RankingList'
// import { setProfile } from '../../../slices/userSlice';
// import { getUserInfo } from '../../../slices/getLoginInfo'
// import axios from 'axios';

export function ProfilePage() {
  const { userEmail } = useParams();
  // 지금은 못 받아와서 빨간불 납니다!!
  // const userEmail = useSelector((state) => state.user.userEmail);
  // const nickname = useSelector((state) => state.user.nickname);
  // const todayBium = useSelector((state) => state.user.todayBium);
  // const totalyBium = useSelector((state) => state.user.totalyBium);
  // const profile = useSelector((state) => state.user.profile);

  //모달 오픈 여부
  const [modalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  // const getUserInfo = async (e) => {
  //   e.preventDefault();

  //   const response = await axios.get(`http:http://localhost:8080/info/${userEmail}`)
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .catch((error) => {
  //       return error;
  //     })

  // }

  return (
    <>
      <h1>ProfilePage</h1>
      <div>
        <button onClick={openModal}>회원 정보 수정</button>
        {modalOpen &&  (
          <div className={styles.modal}>
            <h2>회원정보 수정</h2>
            <form>
              <h1>대충 회원 정보라는 뜻</h1>
            </form>
            <button className={styles.overlay} onClick={closeModal}>닫기</button>
          </div>
        )}
      </div>
      {/* <GetRanking /> */}
    </>
  );
};
