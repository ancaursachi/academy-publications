import * as Yup from 'yup'

export const submissionValidation = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),

  abstract: Yup.string()
    .min(2, 'Too Short!')
    .max(500, 'Too Long!')
    .required('Required'),

  manuscriptFile: Yup.string().required('Required'),
})
