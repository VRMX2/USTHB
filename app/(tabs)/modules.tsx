import { Styles } from '@/constants/Styles';
import { Colors } from '@/constants/theme';
import { ModulesService } from '@/services/modules';
import { Module } from '@/types';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ModulesScreen() {
    const [s1Modules, setS1Modules] = useState<Module[]>([]);
    const [s2Modules, setS2Modules] = useState<Module[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [s1, s2] = await Promise.all([
                ModulesService.getModules('S1'),
                ModulesService.getModules('S2')
            ]);
            setS1Modules(s1);
            setS2Modules(s2);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const renderModuleCard = (module: Module) => (
        <TouchableOpacity
            key={module.id}
            style={[Styles.card, { backgroundColor: Colors.light.card }]}
            onPress={() => router.push(`/module/${module.id}` as any)}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.cardCode}>{module.code}</Text>
                    <Text style={styles.cardTitle}>{module.name}</Text>
                </View>
                <View style={styles.creditBadge}>
                    <Text style={styles.creditText}>Coeff: {module.coefficient}</Text>
                </View>
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
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                <Text style={styles.headerTitle}>Modules</Text>

                <Text style={styles.sectionTitle}>Semester 1</Text>
                {s1Modules.map(renderModuleCard)}

                <Text style={styles.sectionTitle}>Semester 2</Text>
                {s2Modules.map(renderModuleCard)}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 20,
        marginTop: 40,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: Colors.light.primary,
        marginTop: 20,
        marginBottom: 10,
    },
    cardCode: {
        fontSize: 14,
        fontWeight: '800',
        color: Colors.light.primary,
        marginBottom: 4,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    creditBadge: {
        backgroundColor: Colors.light.background,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    creditText: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.light.icon,
    },
});
