import Form from "../Form/Form";

function EditProfile({ handleUpdateUser }) {
  function handleSubmit(formValue) {
    handleUpdateUser({ email: formValue.email, name: formValue.name });
  }
  
  return (
    <Form
      buttonText="Внесите изменения"
      textUnderButton="Хотите вернуться назад к профилю?"
      link="/movies-explorer-frontend/profile"
      linkText="Профиль"
      onSubmit={handleSubmit}
      form="edit"
    />
  );
}

export default EditProfile;
