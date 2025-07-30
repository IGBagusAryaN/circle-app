import Lottie from 'lottie-react';
import loadingAnimation from '../../public/loading.json';

export const LottieAnimation = () => {
  return (
    <Lottie
      animationData={loadingAnimation}
      loop
      autoplay
      style={{ width: 300, height: 300 }}
    />
  );
};
