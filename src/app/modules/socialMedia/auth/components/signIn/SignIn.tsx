import React, { useState } from "react";
import { login } from '../../services/login';

// import { AppButton, AppInput } from '../../../../shared/forms/components';
// import { getInitialValues, getValidationSchema, UpdatePasswordModel } from '../../forms/updatePassword/updatePassword';
// import { updatePassword } from '../../../../services/api/userApi';
import { useAppDispatch } from '../../../../../state/configure-store';

interface UpdatePasswordProps {}

const SignIn: React.FC<UpdatePasswordProps> = () => {
  const dispatch = useAppDispatch();
  const handleOnLogin = () => {
    dispatch(login());
  };

  return (
    <button onClick={handleOnLogin}>Login</button>
  );
};

export default SignIn;
