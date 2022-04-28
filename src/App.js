import s from './App.module.scss';
import AuthorizationForm from "./components/AuthorizationForm";

function App() {
  return (
    <div className={s.App}>
      <div className={s.appWrapper}>
        <AuthorizationForm />
      </div>
        <div className={s.footer}></div>
    </div>
  );
}

export default App;
