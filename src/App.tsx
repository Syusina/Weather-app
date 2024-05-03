import InputBlock from './components/InputBlock/InputBlock';
import OutputBlock from './components/OutputBlock/OutputBlock';
import styles from './App.module.css';
import LoadingStatus from './components/LoadingStatus/LoadingStatus';

const App = () => {

  return (
    <div className={styles.wrapper}>
      <InputBlock />
      <LoadingStatus />
      <OutputBlock />
    </div>
  )
};

export default App;
