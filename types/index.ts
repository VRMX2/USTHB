export interface UserProfile {
    uid: string;
    matricule: string;
    displayName?: string;
    role: 'student' | 'professor' | 'admin';
    semester: 'S1' | 'S2';
    groupId?: string;
}

export interface Module {
    id: string;
    name: string;
    code: string;
    semester: 'S1' | 'S2';
    professor?: string;
    description?: string;
    coefficient?: number;
    credits?: number;
}

export interface Resource {
    id: string;
    moduleId: string;
    title: string;
    type: 'pdf' | 'video' | 'link' | 'pptx' | 'docx' | 'image' | 'other';
    url: string;
    date: string; // ISO string
}

export interface TimetableSession {
    id: string;
    day: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday';
    startTime: string; // "08:00"
    endTime: string; // "09:30"
    moduleId: string;
    moduleName: string;
    room: string;
    type: 'Lecture' | 'TD' | 'TP';
}
