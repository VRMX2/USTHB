import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Styles } from '../constants/Styles';
import { Colors } from '../constants/theme';
import { TimetableService } from '../services/timetable';
import { TimetableSession } from '../types';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];

export default function TimetableScreen() {
    const router = useRouter();
    const [sessions, setSessions] = useState<TimetableSession[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeDay, setActiveDay] = useState<string>('Sunday');

    useEffect(() => {
        loadTimetable();
        // Set active day to today if it's a weekday
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        if (DAYS.includes(today)) {
            setActiveDay(today);
        }
    }, []);

    const loadTimetable = async () => {
        try {
            const data = await TimetableService.getTimetable('G1');
            setSessions(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const daySessions = sessions.filter(s => s.day === activeDay).sort((a, b) => a.startTime.localeCompare(b.startTime));

    if (loading) {
        return (
            <View style={[Styles.container, Styles.center]}>
                <ActivityIndicator size="large" color={Colors.light.primary} />
            </View>
        );
    }

    return (
        <View style={[Styles.container, { backgroundColor: Colors.light.background, padding: 0 }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <IconSymbol name="chevron.left" size={28} color={Colors.light.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Timetable</Text>
            </View>

            <View style={styles.daySelector}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
                    {DAYS.map(day => (
                        <TouchableOpacity
                            key={day}
                            style={[styles.dayChip, activeDay === day && styles.activeDayChip]}
                            onPress={() => setActiveDay(day)}
                        >
                            <Text style={[styles.dayText, activeDay === day && styles.activeDayText]}>{day.slice(0, 3)}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {daySessions.length > 0 ? (
                    daySessions.map(session => (
                        <View key={session.id} style={styles.sessionCard}>
                            <View style={styles.timeContainer}>
                                <Text style={styles.timeText}>{session.startTime}</Text>
                                <Text style={styles.endTimeText}>{session.endTime}</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.sessionInfo}>
                                <Text style={styles.moduleName}>{session.moduleName}</Text>
                                <View style={styles.metaRow}>
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>{session.type}</Text>
                                    </View>
                                    <Text style={styles.roomText}>📍 {session.room}</Text>
                                </View>
                            </View>
                        </View>
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <IconSymbol name="book.fill" size={48} color={Colors.light.border} />
                        <Text style={styles.emptyText}>No classes today!</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    daySelector: {
        marginBottom: 20,
        height: 50,
    },
    dayChip: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        marginRight: 10,
        justifyContent: 'center',
    },
    activeDayChip: {
        backgroundColor: Colors.light.primary,
    },
    dayText: {
        fontWeight: '600',
        color: Colors.light.icon,
    },
    activeDayText: {
        color: '#FFF',
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    sessionCard: {
        flexDirection: 'row',
        backgroundColor: Colors.light.card,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    timeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 16,
        minWidth: 60,
    },
    timeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    endTimeText: {
        fontSize: 12,
        color: Colors.light.icon,
        marginTop: 4,
    },
    divider: {
        width: 2,
        backgroundColor: '#F3F4F6',
        marginRight: 16,
    },
    sessionInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    moduleName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 8,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        backgroundColor: '#E0F2FE',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginRight: 10,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: Colors.light.primary,
        textTransform: 'uppercase',
    },
    roomText: {
        fontSize: 12,
        color: Colors.light.icon,
    },
    emptyState: {
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        marginTop: 10,
        fontSize: 16,
        color: Colors.light.icon,
    },
});
