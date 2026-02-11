import { IconSymbol } from '@/components/ui/icon-symbol';
import { Styles } from '@/constants/Styles';
import { BorderRadius, Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { TimetableService } from '@/services/timetable';
import { TimetableSession } from '@/types';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const [nextSession, setNextSession] = useState<TimetableSession | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const loadData = async () => {
    const session = await TimetableService.getNextSession();
    setNextSession(session);
  };

  useEffect(() => {
    loadData();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const displayName = userProfile?.displayName || user?.displayName || 'Student';
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <View style={[Styles.container, { backgroundColor: Colors.light.background }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.light.primary} />}
      >
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <View>
            <Text style={styles.greeting}>Welcome Back</Text>
            <Text style={styles.userName}>{displayName}</Text>
            {userProfile?.matricule && (
              <Text style={styles.matricule}>{userProfile.matricule}</Text>
            )}
          </View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/profile' as any)} style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{userInitial}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Next Class Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Up Next</Text>
          {nextSession ? (
            <View style={styles.nextClassCard}>
              <View style={styles.nextClassHeader}>
                <View style={styles.nextClassIconContainer}>
                  <IconSymbol name="book.fill" size={24} color="#FFF" />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.nextClassTitle}>{nextSession.moduleName}</Text>
                  <Text style={styles.nextClassTime}>
                    {nextSession.startTime} - {nextSession.endTime}
                  </Text>
                </View>
                <View style={styles.nextClassBadge}>
                  <Text style={styles.nextClassBadgeText}>{nextSession.type}</Text>
                </View>
              </View>
              <View style={styles.nextClassFooter}>
                <IconSymbol name="location.fill" size={14} color="rgba(255,255,255,0.8)" />
                <Text style={styles.nextClassRoom}>{nextSession.room}</Text>
              </View>
            </View>
          ) : (
            <View style={[Styles.card, styles.emptyCard]}>
              <IconSymbol name="checkmark.circle.fill" size={32} color={Colors.light.success} />
              <Text style={styles.emptyCardText}>No classes today!</Text>
            </View>
          )}
        </View>

        {/* Stories Rail */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
            <TouchableOpacity style={styles.addStory}>
              <View style={styles.addStoryIcon}>
                <IconSymbol name="plus" size={20} color={Colors.light.primary} />
              </View>
              <Text style={styles.storyLabel}>Add</Text>
            </TouchableOpacity>
            {[1, 2, 3, 4].map((i) => (
              <TouchableOpacity key={i} style={styles.storyItem}>
                <View style={styles.storyRing}>
                  <Image
                    source={{ uri: `https://i.pravatar.cc/150?u=${i}` }}
                    style={styles.storyImage}
                  />
                </View>
                <Text style={styles.storyLabel}>User {i}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickGrid}>
            <TouchableOpacity style={styles.quickAction} onPress={() => router.push('/timetable' as any)}>
              <View style={[styles.quickIcon, { backgroundColor: '#E8F4FD' }]}>
                <IconSymbol name="calendar" size={26} color={Colors.light.primary} />
              </View>
              <Text style={styles.quickText}>Timetable</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction} onPress={() => router.push('/(tabs)/modules' as any)}>
              <View style={[styles.quickIcon, { backgroundColor: '#F3E8FD' }]}>
                <IconSymbol name="book.fill" size={26} color={Colors.light.secondary} />
              </View>
              <Text style={styles.quickText}>Modules</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction} onPress={() => router.push('/(tabs)/chat' as any)}>
              <View style={[styles.quickIcon, { backgroundColor: '#E8FDF3' }]}>
                <IconSymbol name="message.fill" size={26} color={Colors.light.success} />
              </View>
              <Text style={styles.quickText}>Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction} onPress={() => router.push('/exams' as any)}>
              <View style={[styles.quickIcon, { backgroundColor: '#FDF3E8' }]}>
                <IconSymbol name="bell" size={26} color={Colors.light.warning} />
              </View>
              <Text style={styles.quickText}>Exams</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Updates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Updates</Text>
          <View style={styles.updateCard}>
            <View style={styles.updateHeader}>
              <View style={styles.updateIcon}>
                <IconSymbol name="bell.fill" size={18} color={Colors.light.primary} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.updateTitle}>Exam Schedule Released</Text>
                <Text style={styles.updateTime}>2 hours ago</Text>
              </View>
            </View>
            <Text style={styles.updateBody}>The tentative schedule for S1 exams is now available on the department board.</Text>
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
    paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.light.icon,
    letterSpacing: -0.2,
  },
  userName: {
    fontSize: 34,
    fontWeight: '700',
    color: Colors.light.text,
    letterSpacing: 0.4,
    marginTop: 2,
  },
  matricule: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  avatarContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 14,
    letterSpacing: 0.35,
  },
  nextClassCard: {
    backgroundColor: Colors.light.primary,
    borderRadius: BorderRadius.xl,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  nextClassHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  nextClassIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextClassTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#FFF',
    letterSpacing: -0.4,
  },
  nextClassTime: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  nextClassBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  nextClassBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  nextClassFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextClassRoom: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '500',
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyCardText: {
    fontSize: 17,
    color: Colors.light.textSecondary,
    marginTop: 8,
  },
  addStory: {
    alignItems: 'center',
    marginRight: 16,
  },
  addStoryIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.light.card,
    borderWidth: 2,
    borderColor: Colors.light.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  storyRing: {
    padding: 3,
    borderRadius: 38,
    borderWidth: 2.5,
    borderColor: Colors.light.primary,
    marginBottom: 6,
  },
  storyImage: {
    width: 68,
    height: 68,
    borderRadius: 34,
  },
  storyLabel: {
    fontSize: 13,
    color: Colors.light.text,
    fontWeight: '500',
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  quickAction: {
    width: '50%',
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  quickIcon: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quickText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.light.text,
    textAlign: 'center',
    letterSpacing: -0.2,
  },
  updateCard: {
    backgroundColor: Colors.light.card,
    borderRadius: BorderRadius.lg,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  updateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  updateIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E8F4FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.light.text,
    letterSpacing: -0.4,
  },
  updateTime: {
    fontSize: 13,
    color: Colors.light.icon,
    marginTop: 2,
  },
  updateBody: {
    fontSize: 15,
    color: Colors.light.textSecondary,
    lineHeight: 21,
  },
});
