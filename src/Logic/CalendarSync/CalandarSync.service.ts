import RNCalendarEvents from 'react-native-calendar-events/src'
import {COLORS} from '~/Style/Colors'
// @ts-ignore
import {v4 as uuidv4} from 'uuid'

class CalendarSyncService {
  createCalendar() {
    RNCalendarEvents.saveCalendar({
      title: 'Medication Calendar',
      color: COLORS.red1,
      accessLevel: 'owner',
      ownerAccount: 'user',
      entityType: 'reminder',
      name: 'Medication Calendar',
      source: {
        name: 'user',
        type: 'Medication',
      },
    })
  }

  createDailyCalendarReminder(medicationName: string, calendarId: string) {
    RNCalendarEvents.saveEvent(`Medication reminder for ${medicationName}.`, {
      id: uuidv4(),
      calendarId: calendarId,
      startDate: new Date().toISOString(),
      recurrence: 'daily',
    })
  }
}

export const calendarSyncService = new CalendarSyncService()
