import { IconSymbol } from '@/components/ui/icon-symbol';
import { Styles } from '@/constants/Styles';
import { BorderRadius, Colors, Shadows } from '@/constants/theme';
import { ModulesService } from '@/services/modules';
import { Module } from '@/types';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ModulesScreen() {
    const router = useRouter();
    const [s1Modules, setS1Modules] = useState<Module[]>([]);
    const [s2Modules, setS2Modules] = useState<Module[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadModules();
    }, []);

    const loadModules = async () => {
        const s1 = await ModulesService.getModules('S1');
        const s2 = await ModulesService.getModules('S2');
        setS1Modules(s1);
        setS2Modules(s2);
        setLoading(false);
    };

    const renderModuleCard = (module: Module) => (
        <TouchableOpacity
            key={module.id}
            style={styles.moduleCard}
            onPress={() => router.push(`/module/${module.id}` as any)}
            activeOpacity={0.7}
        >
            <View style={styles.moduleIcon}>
                <IconSymbol name="book.fill" size={24} color={Colors.light.primary} />
            </View>
            <View style={styles.moduleContent}>
                <Text style={styles.moduleCode}>{module.code}</Text>
                <Text style={styles.moduleName}>{module.name}</Text>
                {module.professor && (
                    <Text style={styles.moduleProfessor}>Prof. {module.professor}</Text>
                )}
            </View>
            <View style={styles.moduleFooter}>
                <View style={styles.coeffBadge}>
                    <Text style={styles.coeffText}>Coeff: {module.coefficient}</Text>
                </View>
                <IconSymbol name="chevron.right" size={18} color={Colors.light.icon} />
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={[Styles.container, Styles.center]}>
                <ActivityIndicator size="large" color={Colors.light.primary} />
            </View>
        );
    }

    return (
        <View style={[Styles.container, { backgroundColor: Colors.light.background }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Modules</Text>
                    <Text style={styles.headerSubtitle}>Masters RSD Program</Text>
                </View>

                {/* Semester 1 */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Semester 1</Text>
                        <View style={styles.countBadge}>
                            <Text style={styles.countText}>{s1Modules.length}</Text>
                        </View>
                    </View>
                    {s1Modules.map(renderModuleCard)}
                </View>

                {/* Semester 2 */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Semester 2</Text>
                        <View style={styles.countBadge}>
                            <Text style={styles.countText}>{s2Modules.length}</Text>
                        </View>
                    </View>
                    {s2Modules.map(renderModuleCard)}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 24,
    },
    headerTitle: {
        fontSize: 34,
        fontWeight: '700',
        color: Colors.light.text,
        letterSpacing: 0.4,
    },
    headerSubtitle: {
        fontSize: 17,
        color: Colors.light.textSecondary,
        marginTop: 4,
        letterSpacing: -0.4,
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 32,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.light.text,
        letterSpacing: 0.35,
        flex: 1,
    },
    countBadge: {
        backgroundColor: Colors.light.primary,
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    countText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    moduleCard: {
        backgroundColor: Colors.light.card,
        borderRadius: BorderRadius.lg,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        ...Shadows.md,
    },
    moduleIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E8F4FD',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    moduleContent: {
        flex: 1,
    },
    moduleCode: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.light.primary,
        marginBottom: 2,
        letterSpacing: 0.5,
    },
    moduleName: {
        fontSize: 17,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 2,
        letterSpacing: -0.4,
    },
    moduleProfessor: {
        fontSize: 14,
        color: Colors.light.textSecondary,
    },
    moduleFooter: {
        alignItems: 'flex-end',
    },
    coeffBadge: {
        backgroundColor: Colors.light.background,
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginBottom: 8,
    },
    coeffText: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.light.text,
    },
});
