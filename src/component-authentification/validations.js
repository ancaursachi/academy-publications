import * as Yup from 'yup'

export const LoginValidation = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),

  //trebuie refacuta parola
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
})

export const SignUpValidation = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  university: Yup.string().required('Required'),
  specialization: Yup.string().required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
})
