import {IMedication} from '~/Store'

class CurrentMedicationService {
  async load(medications: IMedication[]) {
    return this.filterMedication(medications)
  }

  filterMedication(medications: IMedication[]) {
    return medications.filter(m => !m.finished)
  }
}

export const currentMedicationService = new CurrentMedicationService()
