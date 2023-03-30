import "./normalize.scss";
import "./App.scss";
import { Modal } from "./components/Modal/Modal";
import { Input } from "./components/Input/Input";
import { ReactComponent as Logo } from "./assets/logo.svg";
import { useEffect, useState } from "react";
import { Button } from "./components/Button/Button";
import { useCookies } from "react-cookie";

export const App: React.FC = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pageState, setPageState] = useState<"LOGIN" | "RESET">("LOGIN");
  const [isError, setIsError] = useState<boolean>(false);
  const [resetPhone, setResetPhone] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [cookies, setCookie, removeCookie] = useCookies(["jwtToken"]);
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  const continueHandler = (e: any) => {
    e.preventDefault();
    if (pageState === "RESET") {
      if (resetPhone.trim().length !== 16) {
        setIsError(true);
        return;
      }
      setIsError(false);
      setIsOpenModal(true);
      return;
    }
    if (
      login === "+7 111 111 11 11" &&
      password === "123456" &&
      login.trim().length === 16
    ) {
      setCookie("jwtToken", true);
      setIsLogin(true);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const resetPassHandler = () => {
    setResetPhone(login);
    setIsError(false);
    setPassword("");
    setPageState("RESET");
  };

  const onCloseHandler = () => {
    setIsOpenModal(false);
    setPageState("LOGIN");
    setLogin(resetPhone);
  };

  useEffect(() => {
    if (isError === true) {
      setIsError(false);
    }
  }, [login, password]);

  useEffect(() => {
    if (cookies.jwtToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <div className="App">
      {isLogin === false && (
        <Modal>
          <div className="App__content">
            <div className="App__content_logo">
              <Logo />
            </div>
            <div className="App__content_inputs">
              {pageState === "LOGIN" ? (
                <>
                  <Input
                    type="tel"
                    value={login}
                    onChange={setLogin}
                    label="Введите логин"
                    isMasked
                    className="App__content_input"
                  />
                  <Input
                    type="password"
                    value={password}
                    onChange={setPassword}
                    label="Введите пароль"
                  />
                </>
              ) : (
                <>
                  <h2 className="App__content_reset_heading">
                    Восстановление пароля
                  </h2>
                  <Input
                    type="tel"
                    value={resetPhone}
                    onChange={setResetPhone}
                    label="Введите номер телефона"
                    isMasked
                    className="App__content_input"
                  />
                </>
              )}
              {isError && <p className="error">Данные введены неверно</p>}
            </div>
            {pageState === "LOGIN" && (
              <p onClick={resetPassHandler} className="App__content_reset">
                Забыли пароль?
              </p>
            )}
            {pageState === "RESET" && (
              <p
                onClick={() => setPageState("LOGIN")}
                className="App__content_reset"
              >
                Назад
              </p>
            )}

            <Button
              label={pageState === "LOGIN" ? "Войти" : "Позвонить"}
              onClick={continueHandler}
            />
          </div>
        </Modal>
      )}
      {isLogin === true && (
        <Button
          label="Выйти"
          onClick={() => {
            removeCookie("jwtToken");
            setIsLogin(false);
          }}
        />
      )}

      {isOpenModal && (
        <Modal isExtra>
          <>
            <div>Ваш новый пароль: 123456</div>
            <Button label="Закрыть" onClick={onCloseHandler} />
          </>
        </Modal>
      )}
    </div>
  );
};
