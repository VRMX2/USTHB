import { IconSymbol } from '@/components/ui/icon-symbol';
import { Styles } from '@/constants/Styles';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { TimetableService } from '@/services/timetable';
import { TimetableSession } from '@/types';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [nextSession, setNextSession] = useState<TimetableSession | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const session = await TimetableService.getNextSession();
    setNextSession(session);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  return (
    <View style={[Styles.container, { backgroundColor: Colors.light.background, padding: 0 }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.displayName || 'Student'} 👋</Text>
            <Text style={styles.subGreeting}>Ready to learn today?</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/profile' as any)}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>{user?.displayName?.charAt(0) || 'S'}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Next Class Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next Class</Text>
          {nextSession ? (
            <View style={[Styles.card, styles.highlightCard]}>
              <View style={styles.row}>
                <View>
                  <Text style={styles.nextClassTitle}>{nextSession.moduleName}</Text>
                  <Text style={styles.nextClassTime}>
                    {nextSession.startTime} - {nextSession.endTime}
                  </Text>
                  <View style={styles.badgeContainer}>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{nextSession.type}</Text>
                    </View>
                    <Text style={styles.roomText}>📍 {nextSession.room}</Text>
                  </View>
                </View>
                <View style={styles.iconCircle}>
                  <IconSymbol name="book.fill" size={24} color="#FFF" />
                </View>
              </View>
            </View>
          ) : (
            <View style={Styles.card}>
              <Text>No upcoming classes today.</Text>
            </View>
          )}
        </View>

        {/* Stories Rail */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stories (Mock)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesRail}>
            <TouchableOpacity style={styles.addStory}>
              <IconSymbol name="plus" size={24} color="#FFF" />
            </TouchableOpacity>
            {[1, 2, 3].map((i) => (
              <View key={i} style={styles.storyContainer}>
                <View style={styles.storyRing}>
                  <Image
                    source={{ uri: `https://i.pravatar.cc/150?u=${i}` }}
                    style={styles.storyAvatar}
                  />
                </View>
                <Text style={styles.storyName}>User {i}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.grid}>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/timetable' as any)}>
              <View style={[styles.actionIcon, { backgroundColor: '#E0F2FE' }]}>
                <IconSymbol name="calendar" size={24} color={Colors.light.primary} />
              </View>
              <Text style={styles.actionText}>Timetable</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/(tabs)/modules' as any)}>
              <View style={[styles.actionIcon, { backgroundColor: '#FCE7F3' }]}>
                <IconSymbol name="book.fill" size={24} color={Colors.light.accent} />
              </View>
              <Text style={styles.actionText}>Modules</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/(tabs)/chat' as any)}>
              <View style={[styles.actionIcon, { backgroundColor: '#DCFCE7' }]}>
                <IconSymbol name="message.fill" size={24} color={Colors.light.success} />
              </View>
              <Text style={styles.actionText}>Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/exams' as any)}>
              <View style={[styles.actionIcon, { backgroundColor: '#FEF3C7' }]}>
                <IconSymbol name="bell" size={24} color={Colors.light.warning} />
              </View>
              <Text style={styles.actionText}>Exams</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Announcements/Feed Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Updates</Text>
          <View style={Styles.card}>
            <Text style={styles.updateTitle}>Exam Schedule Released</Text>
            <Text style={styles.updateDate}>2 hours ago</Text>
            <Text style={styles.updateText}>The tentative schedule for S1 exams is available on the department board.</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  subGreeting: {
    fontSize: 16,
    color: Colors.light.icon,
    marginTop: 4,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 12,
  },
  highlightCard: {
    backgroundColor: Colors.light.primary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextClassTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  nextClassTime: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  roomText: {
    color: '#FFF',
    fontSize: 12,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: Colors.light.card,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
  },
  updateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  updateDate: {
    fontSize: 12,
    color: Colors.light.icon,
    marginTop: 2,
    marginBottom: 8,
  },
  updateText: {
    fontSize: 14,
    color: Colors.light.text,
    lineHeight: 20,
  },
  storiesRail: {
    flexDirection: 'row',
  },
  addStory: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#E0E7FF',
  },
  storyContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  storyRing: {
    padding: 2,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    marginBottom: 4,
  },
  storyAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  storyName: {
    fontSize: 12,
    color: Colors.light.text,
  },
});
