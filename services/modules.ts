import { db } from '@/firebaseConfig';
import { Module } from '@/types';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';

// Mock data as fallback
const MOCK_MODULES: Module[] = [
    { id: 'meps', name: 'Méthodes et Pratiques Scientifiques', code: 'MEPS', semester: 'S1', professor: 'Dr. Benali', coefficient: 3, credits: 6 },
    { id: 'algo', name: 'Algorithmique Avancée', code: 'ALGO', semester: 'S1', professor: 'Dr. Mansouri', coefficient: 4, credits: 8 },
    { id: 'bd', name: 'Bases de Données Avancées', code: 'BDA', semester: 'S1', professor: 'Dr. Khelif', coefficient: 3, credits: 6 },
    { id: 'reseaux', name: 'Réseaux et Protocoles', code: 'RES', semester: 'S2', professor: 'Dr. Amrani', coefficient: 3, credits: 6 },
    { id: 'ia', name: 'Intelligence Artificielle', code: 'IA', semester: 'S2', professor: 'Dr. Bouazza', coefficient: 4, credits: 8 },
];

export const ModulesService = {
    /**
     * Get modules by semester from Firestore
     */
    async getModules(semester: 'S1' | 'S2'): Promise<Module[]> {
        try {
            const q = query(
                collection(db, 'modules'),
                where('semester', '==', semester)
            );
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                return querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Module));
            }

            // Fallback to mock data
            return MOCK_MODULES.filter(m => m.semester === semester);
        } catch (error) {
            console.error('Error fetching modules from Firestore:', error);
            // Fallback to mock data on error
            return MOCK_MODULES.filter(m => m.semester === semester);
        }
    },

    /**
     * Get a single module by ID
     */
    async getModuleById(id: string): Promise<Module | null> {
        try {
            const docRef = doc(db, 'modules', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return {
                    id: docSnap.id,
                    ...docSnap.data()
                } as Module;
            }

            // Fallback to mock data
            return MOCK_MODULES.find(m => m.id === id) || null;
        } catch (error) {
            console.error('Error fetching module:', error);
            // Fallback to mock data
            return MOCK_MODULES.find(m => m.id === id) || null;
        }
    },

    /**
     * Get all modules
     */
    async getAllModules(): Promise<Module[]> {
        try {
            const querySnapshot = await getDocs(collection(db, 'modules'));

            if (!querySnapshot.empty) {
                return querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Module));
            }

            return MOCK_MODULES;
        } catch (error) {
            console.error('Error fetching all modules:', error);
            return MOCK_MODULES;
        }
    },
};
