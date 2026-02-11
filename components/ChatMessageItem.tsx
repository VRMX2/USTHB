import { Colors } from '@/constants/theme';
import { ChatMessage } from '@/services/chat';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ChatMessageProps {
    message: ChatMessage;
    isMe: boolean;
}

export function ChatMessageItem({ message, isMe }: ChatMessageProps) {
    return (
        <View style={[
            styles.container,
            isMe ? styles.myMessage : styles.theirMessage
        ]}>
            {!isMe && <Text style={styles.senderName}>{message.user.name}</Text>}
            <Text style={[
                styles.text,
                isMe ? styles.myText : styles.theirText
            ]}>
                {message.text}
            </Text>
            <Text style={[styles.time, isMe ? styles.myTime : styles.theirTime]}>
                {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 16,
        marginVertical: 4,
    },
    myMessage: {
        alignSelf: 'flex-end',
        backgroundColor: Colors.light.primary,
        borderBottomRightRadius: 2,
    },
    theirMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#E5E7EB',
        borderBottomLeftRadius: 2,
    },
    senderName: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.light.tint,
        marginBottom: 4,
    },
    text: {
        fontSize: 16,
    },
    myText: {
        color: '#FFF',
    },
    theirText: {
        color: '#000',
    },
    time: {
        fontSize: 10,
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    myTime: {
        color: 'rgba(255,255,255,0.7)',
    },
    theirTime: {
        color: '#6B7280',
    },
});
