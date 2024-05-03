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

  const keyHandler = (e: any) => {
    if (e.key === 'Enter') {
      handleClick();
      inputRef.current.focus();
    }
  }

  dispatch(getWeather('Moscow'));

  return (
    <div
      className={styles.wrapper}
      onKeyDownCapture={keyHandler}
    >
      <input className={styles.input} ref={inputRef} placeholder='Город' defaultValue='Moscow' autoFocus/>
      <button className={styles.btn} onClick={handleClick}>Найти</button>
    </div>
  )
};
  

export default InputBlock;