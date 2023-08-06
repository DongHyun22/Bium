package com.ssafy.bium.user.service;

import com.ssafy.bium.image.Image;
import com.ssafy.bium.image.repository.ImageRepository;
import com.ssafy.bium.user.User;
import com.ssafy.bium.user.repository.UserRepository;
import com.ssafy.bium.user.request.FilePostReq;
import com.ssafy.bium.user.request.UserLoginPostReq;
import com.ssafy.bium.user.request.UserModifyPostReq;
import com.ssafy.bium.user.request.UserRegisterPostReq;
import com.ssafy.bium.user.response.UserModifyGetRes;
import com.ssafy.bium.user.response.UserRankingGetRes;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ImageRepository imageRepository;

    @Override
    public User setUser(UserRegisterPostReq userRegisterInfo) {

        User user = User.builder()
                .userEmail(userRegisterInfo.getUserEmail())
                .userPw(userRegisterInfo.getUserPw())
                .userName(userRegisterInfo.getUserName())
                .userNickname(userRegisterInfo.getUserNickname())
                .build();

        System.out.println("userServiceImpl" + user.getUserEmail());
        return userRepository.save(user);

    }

    @Override
    public User getUserByUserEmail(String userEmail) {
        Optional<User> findUser = userRepository.findByUserEmail(userEmail);
        if(!findUser.isPresent()){
            return null;
        }
        return findUser.get();
    }

    @Override
    public int deleteUserByUserEmail(String userEmail) {

        Optional<User> findUser = userRepository.findByUserEmail(userEmail);
        if (!findUser.isPresent()) {
            return 1;
        }

        User user = findUser.get();
        if (!user.getUserEmail().equals(userEmail)) {
            return 1;
        }

        userRepository.delete(user);
        return 0;
    }

    @Override
    public User login(UserLoginPostReq userLoginPostReq) {
        return userRepository.findByUserEmail(userLoginPostReq.getUserEmail()).get();
    }

    @Override
    public UserModifyGetRes getModifyData(String userEmail) {

        UserModifyGetRes userModifyGetRes = null;
        Optional<User> user = userRepository.findByUserEmail(userEmail);
        if (user.isEmpty()) {
            System.out.println("해당 계정이 존재하지 않음");
        } else {
            userModifyGetRes = new UserModifyGetRes(user.get());
        }
        return userModifyGetRes;
    }

    @Override
    public int modifyProfile(UserModifyPostReq userModifyPostReq) {

        Optional<User> optionalUser = userRepository.findByUserEmail(userModifyPostReq.getUserEmail());
        if (optionalUser.isEmpty()) {
            System.out.println("해당 계정이 존재하지 않음");
            return 0;
        } else {
            User user = optionalUser.get();

            user.setUserPw(userModifyPostReq.getUserPw());
            user.setUserNickname(userModifyPostReq.getUserNickname());

            userRepository.save(user);
            return 1;
        }
    }

    @Override
    public Image setImage(FilePostReq filePostReq) {

        Image image = Image.builder()
                .userId(filePostReq.getUserId())
                .imgType(filePostReq.getImageType())
                .saveFolder(filePostReq.getSaveFolder())
                .originalFile(filePostReq.getOriginalFile())
                .saveFile(filePostReq.getSaveFile())
                .build();

        Image result = imageRepository.save(image);
        return result;
    }

    public List<UserRankingGetRes> getUserListTop5ByTotalBium() {

        List<UserRankingGetRes> list = userRepository.findTop5ByOrderByTotalBiumDesc()
                .stream().map(UserRankingGetRes::new).collect(Collectors.toList());
        if (list.isEmpty()) {
            System.out.println("1~5위 랭킹 없음");
        }

        for (int i = 0; i < list.size(); i++) {
            list.get(i).setRanking(i + 1);
        }
        return list;
    }

    @Override
    public UserRankingGetRes getUserByTotalBium(String userEmail) {

        List<UserRankingGetRes> list = userRepository.findUserByOrderByTotalBiumDesc()
                .stream().map(UserRankingGetRes::new).collect(Collectors.toList());
        if (list.isEmpty()) {
            System.out.println("user 정보 없음");
        }

        int userRanking = 0;
        UserRankingGetRes userRankingGetRes = new UserRankingGetRes();
        for (UserRankingGetRes temp : list) {
            userRanking++;
            if (temp.getUserEmail().equals(userEmail)) {
                userRankingGetRes = temp;
                userRankingGetRes.setRanking(userRanking);
                break;
            }
        }

        return userRankingGetRes;

    }

}
