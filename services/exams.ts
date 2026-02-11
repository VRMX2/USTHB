
export interface Exam {
    id: string;
    moduleId: string;
    moduleName: string;
    date: string; // ISO Date
    time: string;
    room: string;
    type: 'Midterm' | 'Final' | 'Catch-up';
}

export interface Grade {
    id: string;
    moduleId: string;
    moduleName: string;
    score: number;
    coefficient: number;
    type: 'CC' | 'Exam' | 'Final';
}

const MOCK_EXAMS: Exam[] = [
    { id: '1', moduleId: 'meps', moduleName: 'MEPS', date: '2026-06-15', time: '09:00', room: 'Amphi D', type: 'Final' },
    { id: '2', moduleId: 'rp', moduleName: 'Réseaux & Protocoles', date: '2026-06-17', time: '13:00', room: 'Amphi E', type: 'Final' },
];

const MOCK_GRADES: Grade[] = [
    { id: '1', moduleId: 'algo', moduleName: 'Algorithmes & Complexité', score: 14.5, coefficient: 3, type: 'Final' },
    { id: '2', moduleId: 'eng', moduleName: 'Technical English', score: 16, coefficient: 1, type: 'CC' },
];

export const ExamService = {
    getExams: async (): Promise<Exam[]> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_EXAMS;
    },

    getGrades: async (): Promise<Grade[]> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_GRADES;
    }
};
