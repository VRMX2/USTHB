import { ChatMessageItem } from '@/components/ChatMessageItem';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Styles } from '@/constants/Styles';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { ChatMessage, ChatService } from '@/services/chat';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ChatScreen() {
    const { user } = useAuth();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputText, setInputText] = useState('');
    const flatListRef = useRef<FlatList>(null);

    // Mock current user for development if Auth not ready
    const currentUser = user ? { _id: user.uid, name: user.displayName || 'Me' } : { _id: '1', name: 'Me' };

    useEffect(() => {
        const unsubscribe = ChatService.getMessages((newMessages) => {
            setMessages(newMessages);
        });
        return () => unsubscribe();
    }, []);

    const handleSend = async () => {
        if (!inputText.trim()) return;

        await ChatService.sendMessage(inputText, currentUser);
        setInputText('');
        // Scroll to bottom
        setTimeout(() => flatListRef.current?.scrollToOffset({ offset: 0, animated: true }), 100);
    };

    return (
        <KeyboardAvoidingView
            style={[Styles.container, { backgroundColor: Colors.light.background, padding: 0 }]}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <View style={styles.header}>
                <Text style={styles.headerTitle}>RSD Chat</Text>
                <TouchableOpacity onPress={() => alert('Video Calling is coming soon!')}>
                    <IconSymbol name="video.fill" size={24} color={Colors.light.primary} />
                </TouchableOpacity>
            </View>

            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <ChatMessageItem
                        message={item}
                        isMe={item.user._id === currentUser._id}
                    />
                )}
                style={styles.list}
                contentContainerStyle={styles.listContent}
                inverted // Chat usually starts from bottom
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Type a message..."
                    placeholderTextColor={Colors.light.icon}
                    multiline
                />
                <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                    <IconSymbol name="paperplane.fill" size={24} color="#FFF" />
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
    list: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: Colors.light.border,
        backgroundColor: Colors.light.background,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        maxHeight: 100,
        fontSize: 16,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: Colors.light.tint,
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
