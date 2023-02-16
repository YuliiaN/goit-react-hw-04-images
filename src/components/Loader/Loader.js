import { Triangle } from 'react-loader-spinner';

const Loader = ({ loading }) => {
  return (
    <Triangle
      height="100"
      width="100"
      color="#3f51b5"
      ariaLabel="triangle-loading"
      visible={loading}
      wrapperStyle={{ margin: '0 auto' }}
    />
  );
};

export default Loader;
