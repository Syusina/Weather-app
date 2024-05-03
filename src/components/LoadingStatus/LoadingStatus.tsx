import { useSelector } from "react-redux";
import { selectWeatherError, selectWeatherLoading } from "../../store/weaterSlice";
import { CiTimer } from "react-icons/ci";
import styles from './LoadingStatus.module.css';

const LoadingStatus = () => {
  const isLoading = useSelector(selectWeatherLoading);
  const error = useSelector(selectWeatherError);

  return (
    <div className={styles.wrapper}>
      {isLoading && <span className={styles.loader}></span>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
};

export default LoadingStatus;