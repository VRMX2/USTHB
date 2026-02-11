import { Module } from '../types';

// Mock Data for initial development
const MOCK_MODULES_S1: Module[] = [
    { id: 'meps', name: 'Methodologies per Performance Evaluation', code: 'MEPS', semester: 'S1', coefficient: 3, credits: 5 },
    { id: 'rp', name: 'Réseaux & Protocoles', code: 'RP', semester: 'S1', coefficient: 3, credits: 5 },
    { id: 'se', name: 'Systèmes d’Exploitation', code: 'SE', semester: 'S1', coefficient: 3, credits: 5 },
    { id: 'asgbd', name: 'Advanced Databases (ASGBD)', code: 'ASGBD', semester: 'S1', coefficient: 2, credits: 4 },
    { id: 'eng', name: 'Technical English', code: 'ENG', semester: 'S1', coefficient: 1, credits: 2 },
    { id: 'algo', name: 'Algorithmes & Complexité', code: 'ALGO', semester: 'S1', coefficient: 3, credits: 5 },
];

const MOCK_MODULES_S2: Module[] = [
    { id: 'dist_algo', name: 'Algorithmes Répartis', code: 'DIST', semester: 'S2', coefficient: 3, credits: 5 },
    { id: 'acs', name: 'Administration Client/Serveur', code: 'ACS', semester: 'S2', coefficient: 3, credits: 5 },
    { id: 'vf', name: 'Vérification Formelle', code: 'VF', semester: 'S2', coefficient: 2, credits: 4 },
    { id: 'multi', name: 'Multimédia', code: 'MULTI', semester: 'S2', coefficient: 2, credits: 4 },
    { id: 'sec', name: 'Sécurité Informatique', code: 'SEC', semester: 'S2', coefficient: 3, credits: 5 },
];

export const ModulesService = {
    getModules: async (semester: 'S1' | 'S2'): Promise<Module[]> => {
        // In production, fetch from Firestore:
        // const q = query(collection(db, 'modules'), where('semester', '==', semester));
        // const snapshot = await getDocs(q);
        // return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Module));

        // Return mock data for now
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
        return semester === 'S1' ? MOCK_MODULES_S1 : MOCK_MODULES_S2;
    },

    getModuleById: async (id: string): Promise<Module | undefined> => {
        const all = [...MOCK_MODULES_S1, ...MOCK_MODULES_S2];
        return all.find(m => m.id === id);
    }
};
