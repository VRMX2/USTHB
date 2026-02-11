import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Styles } from '../constants/Styles';
import { Colors } from '../constants/theme';
import { Exam, ExamService, Grade } from '../services/exams';

export default function ExamsScreen() {
    const router = useRouter();
    const [exams, setExams] = useState<Exam[]>([]);
    const [grades, setGrades] = useState<Grade[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'exams' | 'grades'>('exams');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [examsData, gradesData] = await Promise.all([
                ExamService.getExams(),
                ExamService.getGrades()
            ]);
            setExams(examsData);
            setGrades(gradesData);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

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
                <Text style={styles.headerTitle}>Academic Records</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.tabs}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'exams' && styles.activeTab]}
                        onPress={() => setActiveTab('exams')}
                    >
                        <Text style={[styles.tabText, activeTab === 'exams' && styles.activeTabText]}>Exams</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'grades' && styles.activeTab]}
                        onPress={() => setActiveTab('grades')}
                    >
                        <Text style={[styles.tabText, activeTab === 'grades' && styles.activeTabText]}>Grades</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {activeTab === 'exams' ? (
                        <View>
                            {exams.map(exam => (
                                <View key={exam.id} style={[Styles.card, { backgroundColor: Colors.light.card }]}>
                                    <View style={styles.row}>
                                        <View style={styles.dateBox}>
                                            <Text style={styles.dateDay}>{new Date(exam.date).getDate()}</Text>
                                            <Text style={styles.dateMonth}>{new Date(exam.date).toLocaleString('default', { month: 'short' })}</Text>
                                        </View>
                                        <View style={{ flex: 1, marginLeft: 16 }}>
                                            <Text style={styles.itemTitle}>{exam.moduleName}</Text>
                                            <Text style={styles.itemSubtitle}>{exam.type} • {exam.time}</Text>
                                            <Text style={styles.itemMeta}>📍 {exam.room}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <View>
                            {grades.map(grade => (
                                <View key={grade.id} style={[Styles.card, { backgroundColor: Colors.light.card }]}>
                                    <View style={styles.row}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.itemTitle}>{grade.moduleName}</Text>
                                            <Text style={styles.itemSubtitle}>{grade.type} (Coeff: {grade.coefficient})</Text>
                                        </View>
                                        <View style={styles.gradeBox}>
                                            <Text style={styles.gradeText}>{grade.score}</Text>
                                            <Text style={styles.gradeScale}>/20</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    tabs: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        padding: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    tabText: {
        fontWeight: '600',
        color: Colors.light.icon,
    },
    activeTabText: {
        color: Colors.light.text,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateBox: {
        backgroundColor: Colors.light.primary,
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        minWidth: 60,
    },
    dateDay: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
    },
    dateMonth: {
        fontSize: 12,
        color: '#FFF',
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 4,
    },
    itemSubtitle: {
        fontSize: 14,
        color: Colors.light.icon,
        marginBottom: 4,
    },
    itemMeta: {
        fontSize: 12,
        color: Colors.light.primary,
        fontWeight: '600',
    },
    gradeBox: {
        alignItems: 'flex-end',
    },
    gradeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.light.success,
    },
    gradeScale: {
        fontSize: 12,
        color: Colors.light.icon,
    },
});
