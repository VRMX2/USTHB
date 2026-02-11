import { IconSymbol } from '@/components/ui/icon-symbol';
import { Styles } from '@/constants/Styles';
import { Colors } from '@/constants/theme';
import { ModulesService } from '@/services/modules';
import { StorageService } from '@/services/storage';
import { Module, Resource } from '@/types';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ModuleDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const [module, setModule] = useState<Module | null>(null);
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'resources' | 'announcements'>('resources');

    useEffect(() => {
        if (id) {
            loadModule();
        }
    }, [id]);

    const loadModule = async () => {
        try {
            const data = await ModulesService.getModuleById(id!);
            const res = await StorageService.getModuleResources(id!);
            setModule(data || null);
            setResources(res);
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

    if (!module) {
        return (
            <View style={[Styles.container, Styles.center]}>
                <Text>Module not found</Text>
            </View>
        );
    }

    return (
        <View style={[Styles.container, { backgroundColor: Colors.light.background, padding: 0 }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <IconSymbol name="chevron.left" size={28} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{module.code}</Text>
                <Text style={styles.headerSubtitle}>{module.name}</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabs}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'resources' && styles.activeTab]}
                    onPress={() => setActiveTab('resources')}
                >
                    <Text style={[styles.tabText, activeTab === 'resources' && styles.activeTabText]}>Resources</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'announcements' && styles.activeTab]}
                    onPress={() => setActiveTab('announcements')}
                >
                    <Text style={[styles.tabText, activeTab === 'announcements' && styles.activeTabText]}>Announcements</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {activeTab === 'resources' ? (
                    <View>
                        <Text style={styles.sectionHeader}>Course Materials</Text>
                        {resources.length > 0 ? (
                            resources.map(resource => (
                                <TouchableOpacity key={resource.id} style={styles.resourceCard} onPress={() => console.log('Download', resource.url)}>
                                    <View style={styles.resourceIcon}>
                                        <IconSymbol name="doc.fill" size={24} color={Colors.light.primary} />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.resourceTitle}>{resource.title}</Text>
                                        <Text style={styles.resourceType}>{resource.type.toUpperCase()}</Text>
                                    </View>
                                    <IconSymbol name="arrow.down.circle" size={24} color={Colors.light.icon} />
                                </TouchableOpacity>
                            ))
                        ) : (
                            <View style={Styles.card}>
                                <Text style={{ color: Colors.light.icon }}>No resources available yet.</Text>
                            </View>
                        )}
                    </View>
                ) : (
                    <View>
                        <Text style={styles.sectionHeader}>Latest Updates</Text>
                        <View style={Styles.card}>
                            <Text style={{ color: Colors.light.icon }}>No announcements yet.</Text>
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.light.primary,
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    backButton: {
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 4,
    },
    tabs: {
        flexDirection: 'row',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    tab: {
        marginRight: 20,
        paddingBottom: 8,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.light.primary,
    },
    tabText: {
        fontSize: 16,
        color: Colors.light.icon,
        fontWeight: '500',
    },
    activeTabText: {
        color: Colors.light.primary,
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: Colors.light.text,
    },
    resourceCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.card,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    resourceIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E0F2FE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    resourceTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
    resourceType: {
        fontSize: 12,
        color: Colors.light.icon,
        marginTop: 2,
    },
});
