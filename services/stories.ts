export interface Story {
    id: string;
    user: {
        id: string;
        name: string;
        avatar: string;
    };
    imageUrl: string;
    createdAt: number;
}

const MOCK_STORIES: Story[] = [
    {
        id: '1',
        user: { id: '2', name: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=sarah' },
        imageUrl: 'https://via.placeholder.com/1080x1920/1e293b/ffffff?text=Library+Session',
        createdAt: Date.now() - 3600000,
    },
    {
        id: '2',
        user: { id: '3', name: 'Ahmed', avatar: 'https://i.pravatar.cc/150?u=ahmed' },
        imageUrl: 'https://via.placeholder.com/1080x1920/0f172a/ffffff?text=Exam+Prep',
        createdAt: Date.now() - 7200000,
    },
];

export const StoriesService = {
    getStories: async (): Promise<Story[]> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_STORIES;
    }
};
