import Form from "../Form/Form";

function Register({ handleRegister }) {
  function handleSubmit(formValue) {
    handleRegister({
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
    });
  }

  return (
    <Form
      buttonText="Зарегистрироваться"
      textUnderButton="Уже зарегистрированы?"
      linkText="Войти"
      link="/signin"
      onSubmit={handleSubmit}
      form="register"
    />
  );
}

export default Register;
