package com.ssafy.bium.user.service;

import com.ssafy.bium.common.exception.ExceptionMessage;
import com.ssafy.bium.common.exception.UserLoginException;
import com.ssafy.bium.image.Image;
import com.ssafy.bium.image.repository.ImageRepository;
import com.ssafy.bium.user.User;
import com.ssafy.bium.user.controller.UserController;
import com.ssafy.bium.user.repository.UserRepository;
import com.ssafy.bium.user.request.FilePostReq;
import com.ssafy.bium.user.request.UserLoginPostReq;
import com.ssafy.bium.user.request.UserModifyPostReq;
import com.ssafy.bium.user.request.UserRegisterPostReq;
import com.ssafy.bium.user.response.MailGetRes;
import com.ssafy.bium.user.response.UserModifyGetRes;
import com.ssafy.bium.user.response.UserRankingGetRes;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    public static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserRepository userRepository;
    private final ImageRepository imageRepository;
    private final MailSender mailSender;

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

        Optional<User> user = userRepository.findByUserEmailAndUserPw(userLoginPostReq.getUserEmail(), userLoginPostReq.getUserPw());

        if (user.isEmpty()) {
            throw new UserLoginException(ExceptionMessage.LOGIN_EXCEPTION);
        }

        User loginUser = user.get();
        return loginUser;
    }

    @Override
    public void saveRefreshToken(String userEmail, String refreshToken) {

        User user = getUser(userEmail);
        user.changeToken(refreshToken);
        userRepository.save(user);
    }

    @Override
    public String getRefreshToken(String userEmail) {

        User user = getUser(userEmail);
        return user.getToken();
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
    @Transactional
    public Image setImage(FilePostReq filePostReq) {

        Optional<Image> image = imageRepository.findByUserIdAndImgType(filePostReq.getUserId(), filePostReq.getImageType());
        if (image.isPresent()) {
            imageRepository.deleteImageByUserIdAndImgType(filePostReq.getUserId(), filePostReq.getImageType());
        }

        Image newImage = Image.builder()
                .userId(filePostReq.getUserId())
                .imgType(filePostReq.getImageType())
                .saveFolder(filePostReq.getSaveFolder())
                .originalFile(filePostReq.getOriginalFile())
                .saveFile(filePostReq.getSaveFile())
                .build();

        Image result = imageRepository.save(newImage);
        return result;
    }

    @Override
    public Image getImageData(String userEmail, int imgType) {

        Optional<User> user = userRepository.findByUserEmail(userEmail);
        if (user.isEmpty()) {
            logger.debug("해당 계정이 존재하지 않음");
            return null;
        }
        Long userId = user.get().getId();

        Optional<Image> image = imageRepository.findByUserIdAndImgType(userId, imgType);
        if (image.isEmpty()) {
            logger.debug("해당 계정의 {} type 이미지가 존재하지 않음", imgType);
            return null;
        }

        return image.get();

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

    private User getUser(String userEmail) {

        Optional<User> findUser = userRepository.findByUserEmail(userEmail);
        if (findUser.isEmpty()) {
            throw new UserLoginException("해당 계정이 존재하지 않음");
        }
        return findUser.get();
    }

    @Override
    public String getTempPassword() throws Exception {

        char[] charSet = new char[] {
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
                'U', 'V', 'W', 'X', 'Y', 'Z' };

        String str = "";

        // 문자 배열 길이의 값을 랜덤으로 10개를 뽑아 구문을 작성함
        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }

        return str;
    }

    @Override
    public void updatePassword(String str, String userEmail) throws Exception {

        User user = getUser(userEmail);
        user.setUserPw(str);

        userRepository.save(user);
    }

    // 메일 내용 생성, 임시 비밀번호 발급
    @Override
    public MailGetRes createMailAndChangePassword(String userEmail) throws Exception {

        String str = getTempPassword();
        MailGetRes mailGetRes = new MailGetRes();
        mailGetRes.setAddress(userEmail);
        mailGetRes.setTitle("🔐 비움 임시 비밀번호 안내 이메일 입니다.");
        mailGetRes.setMessage("안녕하세요. 비움 임시 비밀번호 안내 관련 이메일 입니다.\n\n" + "회원님의 임시 비밀번호는 [ "
                + str + " ] 입니다.\n\n" + "로그인 후에 비밀번호를 변경해주세요.");
        updatePassword(str,userEmail);

        return mailGetRes;
    }

    // 메일 보내기
    @Override
    public void sendMail(MailGetRes mailGetRes) throws Exception {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(mailGetRes.getAddress());
        message.setSubject(mailGetRes.getTitle());
        message.setText(mailGetRes.getMessage());
        message.setFrom("c205bium@gmail.com");
        message.setReplyTo("c205bium@gmail.com");
        logger.debug("message: {}", message);

        mailSender.send(message);
    }

}
