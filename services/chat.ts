
export interface ChatMessage {
    _id: string; // Underscore for GiftedChat compatibility if we use it later
    text: string;
    createdAt: Date | number;
    user: {
        _id: string;
        name: string;
        avatar?: string;
    };
}

// Mock Data
const MOCK_MESSAGES: ChatMessage[] = [
    {
        _id: '1',
        text: 'Has anyone finished the TP for Systems?',
        createdAt: new Date().getTime() - 3600000,
        user: {
            _id: '2',
            name: 'Sarah',
        },
    },
    {
        _id: '2',
        text: 'I am still working on the last part. It is tricky.',
        createdAt: new Date().getTime() - 1800000,
        user: {
            _id: '3',
            name: 'Ahmed',
        },
    },
];

export const ChatService = {
    getMessages: (callback: (messages: ChatMessage[]) => void) => {
        // In production, sync with Firestore:
        // const q = query(collection(db, 'chats', 'general', 'messages'), orderBy('createdAt', 'desc'));
        // return onSnapshot(q, snapshot => {
        //   const messages = snapshot.docs.map(doc => ({
        //     _id: doc.id,
        //     ...doc.data(),
        //     createdAt: doc.data().createdAt?.toDate(),
        //   })) as ChatMessage[];
        //   callback(messages);
        // });

        // Return mock data immediately
        callback(MOCK_MESSAGES);
        return () => { }; // Unsubscribe function
    },

    sendMessage: async (text: string, user: any) => {
        // await addDoc(collection(db, 'chats', 'general', 'messages'), {
        //   text,
        //   user,
        //   createdAt: serverTimestamp(),
        // });
        console.log('Sending message:', text, user);
        MOCK_MESSAGES.unshift({
            _id: Math.random().toString(),
            text,
            createdAt: new Date(),
            user
        });
    }
};
