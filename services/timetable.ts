import { TimetableSession } from '../types';

const MOCK_TIMETABLE: TimetableSession[] = [
    { id: '1', day: 'Sunday', startTime: '08:00', endTime: '09:30', moduleId: 'meps', moduleName: 'MEPS', room: 'R201', type: 'Lecture' },
    { id: '2', day: 'Sunday', startTime: '09:40', endTime: '11:10', moduleId: 'meps', moduleName: 'MEPS (TD)', room: 'R201', type: 'TD' },
    { id: '3', day: 'Monday', startTime: '11:20', endTime: '12:50', moduleId: 'rp', moduleName: 'Réseaux & Protocoles', room: 'Amphi D', type: 'Lecture' },
    { id: '4', day: 'Tuesday', startTime: '13:00', endTime: '14:30', moduleId: 'se', moduleName: 'Systèmes d’Exploitation (TP)', room: 'Lab 3', type: 'TP' },
    { id: '5', day: 'Wednesday', startTime: '08:00', endTime: '11:10', moduleId: 'algo', moduleName: 'Algorithmes & Complexité', room: 'Amphi E', type: 'Lecture' },
];

export const TimetableService = {
    getTimetable: async (groupId: string): Promise<TimetableSession[]> => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_TIMETABLE;
    },

    getNextSession: async (): Promise<TimetableSession | null> => {
        // Logic to find next session based on current time
        return MOCK_TIMETABLE[0]; // Return Sunday 8:00 for demo
    }
};
