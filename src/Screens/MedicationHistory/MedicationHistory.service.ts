import {IMedication} from '~/Store'

class MedicationHistoryService {
  async load(medications: IMedication[]) {
    return this.filterMedication(medications)
  }

  filterMedication(medications: IMedication[]) {
    return medications.filter(m => m.finished)
  }
}

export const medicationHistoryService = new MedicationHistoryService()
