import { useDispatch, useSelector } from 'react-redux';
import { setImageId } from '../../../slices/userSlice';
import { useEffect, useState } from 'react';

function ImageUpload() {
  // 업로드된 이미지 파일 객체나 미리보기 URL을 저장
  const [fileImage, setFileImage] = useState(null);
  const imageId = useSelector((state) => state.user.imageId);
  const dispatch = useDispatch();

  useEffect(() => {
    // imageId가 변경되면 fileImage 상태를 업데이트
    if (imageId) {
      setFileImage(URL.createObjectURL(imageId));
    } else {
      setFileImage(null);
    }
  }, [imageId]);

  // 파일 저장
  const saveFileImage = (e) => {
    const file = e.target.files[0];
    e.preventDefault();
    if (file) {
      // const newFileImage = URL.createObjectURL(file);
      // URL.createObjectURL()은 파라미터로 전달된 파일 객체를 나타내는 Blob URL을 생성
      // 선택한 파일의 Blob 또는 File 객체를 URL 형태로 변환하는 역할
      setFileImage(file);
      dispatch(setImageId(URL.createObjectURL(file)));
      console.log('userSliceImage', dispatch(setImageId(file)));
    }
  };

  const deleteFileImage = () => {
    if (imageId) {
      // URL.revokeObjectURL()은 URL을 브라우저에서 해제하고 사용한 리소스를 정리하는 역할
      URL.revokeObjectURL(imageId);
    }
    setFileImage(null);
    dispatch(setImageId(null));
  };

  return (
    <div>
      <h1>이미지 미리보기</h1>
      <div>
        <p>이미지</p>
        {fileImage && <img src={fileImage} alt="미리보기" />}
        <div>
          <input name="imgUpload" type="file" accept="image/*" onChange={saveFileImage}></input>
        </div>
        <div>
          <button onClick={deleteFileImage}>삭제</button>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
