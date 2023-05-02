import Form from "../Form/Form";

function Login() {
  return (
    <Form buttonText="Войти" textUnderButton="Ещё не зарегистрированы?" link="/signup" linkText="Регистрация" />
  );
}

export default Login;
