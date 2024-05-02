import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getWeather } from './store/weaterSlice';

const App = () => {
  const inputRef: any = useRef(null);
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log("🚀 ~ App ~ inputRef:", inputRef.current.value)

    dispatch(getWeather(inputRef.current.value));
  };

  return (
    <div>
      <input ref={inputRef} placeholder='City name'/>
      <button onClick={handleClick}>Button</button>
    </div>
  )
};

export default App;
