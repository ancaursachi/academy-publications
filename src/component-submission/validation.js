import * as Yup from 'yup'

export const submissionValidation = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(300, 'Too Long!')
    .required('Required'),

  abstract: Yup.string()
    .min(2, 'Too Short!')
    .max(1000, 'Too Long!')
    .required('Required'),
})
