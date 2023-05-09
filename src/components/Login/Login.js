import Form from "../Form/Form";

function Login({ handleLogin }) {
  function handleSubmit(formValue) {
    handleLogin({ email: formValue.email, password: formValue.password });
  }

  return (
    <Form
      buttonText="Войти"
      textUnderButton="Ещё не зарегистрированы?"
      link="/signup"
      linkText="Регистрация"
      onSubmit={handleSubmit}
      form="login"
    />
  );
}

export default Login;
