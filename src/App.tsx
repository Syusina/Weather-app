import InputBlock from './components/InputBlock/InputBlock';
import OutputBlock from './components/OutputBlock/OutputBlock';
import styles from './App.module.css';

const App = () => {

  return (
    <div className={styles.wrapper}>
      <InputBlock />
      <OutputBlock />
    </div>
  )
};

export default App;
