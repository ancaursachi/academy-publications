import * as Yup from 'yup'

export const editUserValidation = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  role: Yup.string().required('Required'),
  university: Yup.string().required('Required'),
  specialization: Yup.string().required('Required'),
})
