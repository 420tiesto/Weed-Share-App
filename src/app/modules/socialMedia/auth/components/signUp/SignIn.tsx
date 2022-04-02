import React, { useState } from "react";
// import { Form, Formik } from 'formik';

// import { AppButton, AppInput } from '../../../../shared/forms/components';
// import { getInitialValues, getValidationSchema, UpdatePasswordModel } from '../../forms/updatePassword/updatePassword';
// import { updatePassword } from '../../../../services/api/userApi';

interface UpdatePasswordProps {
  onSuccess: () => void;
  email: string;
}

const SignUp: React.FC<UpdatePasswordProps> = (props) => {
  const { email, onSuccess } = props;
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleOnSubmit = () => {
    // updatePassword({ ...values, email }).subscribe(
    //   () => {
    //     onSuccess();
    //   },
    //   (error: Error) => {
    //     setErrorMessage(error.message || 'Error occurred while updating password. Please try again');
    //   }
    // );
  };

  return (
    <p></p>
    // <Formik initialValues={getInitialValues()} onSubmit={handleOnSubmit} validationSchema={getValidationSchema()}>
    //   <Form>
    //     <AppInput name="currentPassword" label="Current Password*" placeholder="Enter Current Password" type="password" />
    //     <AppInput name="newPassword" label="New Password*" placeholder="Enter New Password" type="password" />
    //     <AppInput label="Re-enter New Password*" name="confirmPassword" placeholder="Enter New Password" type="password" />
    //     <AppButton type="submit" text="Update Password" />
    //     {errorMessage && <div className="d-block text-danger text-center mt-2">{errorMessage}</div>}
    //   </Form>
    // </Formik>
  );
};

export default SignUp;
