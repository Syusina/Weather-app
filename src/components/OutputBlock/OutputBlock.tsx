import { useSelector } from "react-redux";
import { selectWeather, selectWeatherLoading } from "../../store/weaterSlice";
import styles from './Output.module.css';
import { WiRain, WiDayRain, WiThunderstorm, WiDaySunny, WiCloud, WiCloudy } from "react-icons/wi";
import { IconType } from "../../utilities/IconType";

const Icon = ({ iconType }: {iconType: string}) => {
   switch(iconType) {
    case IconType.LIGHT_RAIN:
      return <WiDayRain className={styles.icon}/>;
    case IconType.MODERATE_RAIN:
      return <WiRain className={styles.icon}/>;
    case IconType.HEAVY_RAIN:
      return <WiThunderstorm className={styles.icon}/>;
    case IconType.LIGHT_CLOUD:
      return <WiDaySunny className={styles.icon}/>;
    case IconType.MODERATE_CLOUD:
      return <WiCloud className={styles.icon}/>;
    case IconType.HEAVY_CLOUD:
      return <WiCloudy className={styles.icon}/>;
    default:
      break;
  }
};

const OutputBlock = () => {
  const data = useSelector(selectWeather);
  const isLoading = useSelector(selectWeatherLoading);


  return (
    <>
      {!isLoading ? (<div className={styles.wrapper}>
      {data?.map((el: any) => {
        return (
          <div className={styles.card} key={el.id}>
            <Icon iconType={el.iconType} />
            <p className={styles.time}>{el.time}</p>
            <p className={styles.temp}>{el.temp} &#186;C</p>
          </div>
        )
      })}
      </div>) : null}
    </>
  )
};

export default OutputBlock;