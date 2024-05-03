import { useSelector } from "react-redux";
import { selectWeather } from "../../store/weaterSlice";
import styles from './Output.module.css';

const OutputBlock = () => {
  const data = useSelector(selectWeather);

  console.log("🚀 ~ OutputBlock ~ data:", data)

  return (
    <div className={styles.wrapper}>
     {data?.map((el: any) => {
      return (
        <div className={styles.card} key={el.id}>
          <p className={styles.time}>{el.time}</p>
          <p className={styles.temp}>{el.temp} &#186;C</p>
        </div>
      )
     })}
    </div>
  )
};

export default OutputBlock;