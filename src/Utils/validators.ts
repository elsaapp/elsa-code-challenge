import {object, string, number} from 'yup'
import {
  MedicationFormData,
  MedicationProps,
  UnitVariants,
  AdministrationVariants,
} from '~/Store/User'

const addMedicationFormSchema = object({
  [MedicationProps.BRAND_NAME]: string().required(),
  [MedicationProps.SUBSTANCE]: string().required(),
  [MedicationProps.INTERVAL]: number().required(),
  [MedicationProps.ADMINISTRATION]: string()
    .oneOf(Object.values(AdministrationVariants))
    .required(),
  [MedicationProps.STRENGTH]: object({
    value: number().required(),
    unit: string().oneOf(Object.values(UnitVariants)).required(),
  }),
})

export const validateAddMedicationForm = (formData: MedicationFormData) => {
  return addMedicationFormSchema.validateSync(formData)
}
