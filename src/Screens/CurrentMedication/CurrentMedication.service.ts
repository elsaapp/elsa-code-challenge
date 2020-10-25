import {IMedication} from '~/Store'

class CurrentMedicationService {
  activeMeds: IMedication[] = []

  async load(medications: IMedication[]) {
    this.activeMeds = this.filterMedication(medications)
  }

  loadActiveMedications() {
    return this.activeMeds.filter(m => !m.paused)
  }

  loadPausedMedications() {
    return this.activeMeds.filter(m => m.paused)
  }

  filterMedication(medications: IMedication[]) {
    return medications.filter(m => !m.finished)
  }
}

export const currentMedicationService = new CurrentMedicationService()
