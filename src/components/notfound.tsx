import Lottie from 'lottie-react';
import loadingAnimation from '../../public/notfound.json';

export const NotfoundAnimation = () => {
  return (
    <Lottie
      animationData={loadingAnimation}
      loop
      autoplay
      style={{ width: 250, height: 250, marginTop: "-103px" }}
    />
  );
};
