import { useRef } from "react";
import { useDispatch } from "react-redux";
import { getWeather } from "../../store/weaterSlice";
import styles from './InputBlock.module.css';

const InputBlock = () => {
  const inputRef: any = useRef(null);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(getWeather(inputRef.current.value));
  };

  dispatch(getWeather('London'));

  return (
    <div className={styles.wrapper}>
      <input className={styles.input} ref={inputRef} placeholder='Город'/>
      <button className={styles.btn} onClick={handleClick}>Найти</button>
    </div>
  )
};

export default InputBlock;