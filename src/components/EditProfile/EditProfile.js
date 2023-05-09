import Form from "../Form/Form";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import FormValidator from "../../utils/FormValidators";

function EditProfile({ handleUpdateUser }) {
  function handleSubmit(formValue) {
    handleUpdateUser({ email: formValue.email, name: formValue.name });
  }

  const { resetForm, handleChange } = FormValidator({});

  const currentUser = useContext(CurrentUserContext).user;
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    resetForm();
    setUserName(currentUser.name);
    setUserEmail(currentUser.email);
  }, [currentUser, resetForm]);

  function handleChangeName(e) {
    setUserName(e.target.value);
    handleChange(e, ".form");
  }

  function handleChangeEmail(e) {
    setUserEmail(e.target.value);
    handleChange(e, ".form");
  }
  
  return (
    <Form
      buttonText="Внесите изменения"
      textUnderButton="Хотите вернуться назад к профилю?"
      link="/profile"
      linkText="Профиль"
      onSubmit={handleSubmit}
      form="edit"
      userName={userName}
      userEmail={userEmail}
      handleChangeName={handleChangeName}
      handleChangeEmail={handleChangeEmail}
    />
  );
}

export default EditProfile;
