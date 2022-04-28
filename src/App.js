import s from './App.module.scss';
import Basic from "./components/AuthorizationForm";

function App() {
  return (
    <div className={s.App}>
      <div className={s.appWrapper}>
        <Basic />
      </div>
    </div>
  );
}

export default App;
