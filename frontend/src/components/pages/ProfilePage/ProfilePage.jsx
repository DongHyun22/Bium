import React, { useState, useEffect } from 'react';
import styles from './ProfilePage.module.css';
import {  useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setUserEmail } from '../../../slices/userSlice';
// import { GetRanking } from '../../organisms/RankingList'
// import { setProfile } from '../../../slices/userSlice';
// import { getUserInfo } from '../../../slices/getLoginInfo'
import axios from 'axios';

export function ProfilePage() {
  const { userEmail } = useParams();
  const dispatch = useDispatch();
  // 지금은 못 받아와서 빨간불 납니다!!
  const email = useSelector((state) => state.user.userEmail);
  const nickname = useSelector((state) => state.user.nickname);
  const todayBium = useSelector((state) => state.user.todayBium);
  const totalyBium = useSelector((state) => state.user.totalBium);

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
  // useEffect(() => {
  //   const getUserInfo = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8080/info/${userEmail}`);
  //       dispatch(setUserEmail(response.data.userInfo.userEmail ));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   getUserInfo();
  // }, [userEmail, dispatch]);

  return (
    <>
      <h1>ProfilePage</h1>
      <div>
        <button onClick={openModal}>회원 정보 수정</button>
        {modalOpen &&  (
          <div className={styles.modal}>
            <h2>회원정보 수정</h2>
            <form>
              <div>{email}</div>
              <div>{nickname}</div>
              <div>{todayBium}</div>
              <div>{totalyBium}</div>
            </form>
            <button className={styles.overlay} onClick={closeModal}>닫기</button>
          </div>
        )}
      </div>
      {/* <GetRanking /> */}
    </>
  );
};
