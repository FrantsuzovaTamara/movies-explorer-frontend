import Form from "../Form/Form";

function Register() {
  return (
    <Form buttonText="Зарегистрироваться" textUnderButton="Уже зарегистрированы?" linkText="Войти" link="/signin" />
  );
}

export default Register;
