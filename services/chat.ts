import { db } from '@/firebaseConfig';
import {
    addDoc,
    collection,
    DocumentData,
    limit,
    onSnapshot,
    orderBy,
    query,
    QuerySnapshot,
    Timestamp
} from 'firebase/firestore';

export interface ChatMessage {
    id: string;
    text: string;
    userId: string;
    userName: string;
    timestamp: string;
    isCurrentUser?: boolean;
}

// Mock data as fallback
const MOCK_MESSAGES: ChatMessage[] = [
    { id: '1', text: 'Hey everyone! Ready for the exam?', userId: 'user1', userName: 'Ahmed', timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: '2', text: 'Yes! Been studying all week', userId: 'user2', userName: 'Sara', timestamp: new Date(Date.now() - 1800000).toISOString() },
    { id: '3', text: 'Anyone want to form a study group?', userId: 'user3', userName: 'Karim', timestamp: new Date(Date.now() - 900000).toISOString() },
];

export const ChatService = {
    /**
     * Send a message to Firestore
     */
    async sendMessage(text: string, userId: string, userName: string): Promise<void> {
        try {
            await addDoc(collection(db, 'messages'), {
                text,
                userId,
                userName,
                timestamp: Timestamp.now(),
                createdAt: new Date().toISOString(),
            });
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    },

    /**
     * Get messages with real-time updates
     */
    subscribeToMessages(
        callback: (messages: ChatMessage[]) => void,
        currentUserId: string
    ): () => void {
        try {
            const q = query(
                collection(db, 'messages'),
                orderBy('timestamp', 'desc'),
                limit(50)
            );

            const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
                const messages: ChatMessage[] = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        text: data.text,
                        userId: data.userId,
                        userName: data.userName,
                        timestamp: data.timestamp?.toDate?.()?.toISOString() || data.createdAt,
                        isCurrentUser: data.userId === currentUserId,
                    };
                }).reverse();

                callback(messages);
            }, (error) => {
                console.error('Error subscribing to messages:', error);
                // Fallback to mock data on error
                callback(MOCK_MESSAGES.map(m => ({
                    ...m,
                    isCurrentUser: m.userId === currentUserId
                })));
            });

            return unsubscribe;
        } catch (error) {
            console.error('Error setting up message subscription:', error);
            // Return mock data immediately on error
            callback(MOCK_MESSAGES.map(m => ({
                ...m,
                isCurrentUser: m.userId === currentUserId
            })));
            return () => { }; // Return empty unsubscribe function
        }
    },

    /**
     * Get messages (one-time fetch)
     */
    async getMessages(currentUserId: string): Promise<ChatMessage[]> {
        try {
            // For now, return mock data
            // In production, this would fetch from Firestore
            return MOCK_MESSAGES.map(m => ({
                ...m,
                isCurrentUser: m.userId === currentUserId
            }));
        } catch (error) {
            console.error('Error getting messages:', error);
            return MOCK_MESSAGES.map(m => ({
                ...m,
                isCurrentUser: m.userId === currentUserId
            }));
        }
    },
};
