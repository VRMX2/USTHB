import { Resource } from '../types';

const MOCK_RESOURCES: Resource[] = [
    { id: '1', title: 'Chapter 1: Introduction', type: 'pdf', url: 'https://example.com/ch1.pdf' },
    { id: '2', title: 'Lecture Slides Week 2', type: 'pptx', url: 'https://example.com/week2.pptx' },
    { id: '3', title: 'Lab Assignment 1', type: 'docx', url: 'https://example.com/lab1.docx' },
];

export const StorageService = {
    getModuleResources: async (moduleId: string): Promise<Resource[]> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_RESOURCES;
    },

    downloadResource: async (url: string) => {
        console.log('Downloading...', url);
        // Use expo-file-system in production
    }
};
