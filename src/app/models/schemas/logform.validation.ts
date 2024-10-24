import * as Yup from "yup"

export const LogInSchema = Yup.object().shape({
    username: Yup.string().required('Name is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

export const SignUpSchema = Yup.object().shape({
  username: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirm_password: Yup.string().oneOf([Yup.ref('password')], 'Must be the same as password').required('hey this is required too!')
});

export const SearchUserSchema = Yup.object().shape({
  userToSearch: Yup.string().required('Hey motherfucker you better write something here!')
})

export interface LoginFormValues {
  username: string;
  password: string;
};

export interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
};