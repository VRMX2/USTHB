import { ChatMessageItem } from '@/components/ChatMessageItem';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Styles } from '@/constants/Styles';
import { BorderRadius, Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { ChatMessage, ChatService } from '@/services/chat';
import { useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ChatScreen() {
    const { user } = useAuth();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputText, setInputText] = useState('');
    const [sending, setSending] = useState(false);

    useEffect(() => {
        if (!user) return;

        // Subscribe to real-time messages
        const unsubscribe = ChatService.subscribeToMessages(
            (newMessages) => {
                setMessages(newMessages);
            },
            user.uid
        );

        return () => unsubscribe();
    }, [user]);

    const handleSend = async () => {
        if (!inputText.trim() || !user || sending) return;

        setSending(true);
        try {
            await ChatService.sendMessage(
                inputText.trim(),
                user.uid,
                user.displayName || 'Anonymous'
            );
            setInputText('');
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setSending(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={[Styles.container, { backgroundColor: Colors.light.background }]}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={90}
        >
            <View style={styles.header}>
                <Text style={styles.headerTitle}>RSD Chat</Text>
                <TouchableOpacity onPress={() => alert('Video Calling is coming soon!')}>
                    <IconSymbol name="video.fill" size={24} color={Colors.light.primary} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ChatMessageItem message={item} />}
                contentContainerStyle={styles.messageList}
                inverted={false}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    placeholderTextColor={Colors.light.icon}
                    value={inputText}
                    onChangeText={setInputText}
                    multiline
                    maxLength={500}
                />
                <TouchableOpacity
                    style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
                    onPress={handleSend}
                    disabled={!inputText.trim() || sending}
                >
                    <IconSymbol
                        name="arrow.up.circle.fill"
                        size={32}
                        color={inputText.trim() ? Colors.light.primary : Colors.light.icon}
                    />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 50,
        paddingBottom: 15,
        paddingHorizontal: 20,
        backgroundColor: Colors.light.background,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    messageList: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: Colors.light.card,
        borderTopWidth: 1,
        borderTopColor: Colors.light.border,
    },
    input: {
        flex: 1,
        backgroundColor: Colors.light.background,
        borderRadius: BorderRadius.xl,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 17,
        color: Colors.light.text,
        maxHeight: 100,
        marginRight: 8,
    },
    sendButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonDisabled: {
        opacity: 0.5,
    },
});
