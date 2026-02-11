export type Role = 'student' | 'professor' | 'admin';

export interface User {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
    matricule?: string;
    semester?: 1 | 2;
    isVerified: boolean;
    profilePicture?: string;
}

export interface Module {
    id: string;
    title: string;
    semester: 1 | 2;
    coefficient: number;
    professorId?: string;
}

export interface Session {
    id: string;
    moduleId: string;
    dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday
    startTime: string; // "08:30"
    endTime: string; // "10:00"
    room: string;
    type: 'cours' | 'td' | 'tp';
}
