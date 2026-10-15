import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons, Feather, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function AttendanceScreen({ onBack }) {
  const [tab, setTab] = useState('checkin'); // 'checkin' | 'history'
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const dateString = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const handleCheckIn = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    setCheckInTime(timeStr);
    setIsCheckedIn(true);
  };

  const handleCheckOut = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    setCheckOutTime(timeStr);
    setIsCheckedIn(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Feather name="chevron-left" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Smart Geo Attendance</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'checkin' ? styles.tabBtnActive : styles.tabBtnInactive]}
          onPress={() => setTab('checkin')}
        >
          <Text style={[styles.tabText, tab === 'checkin' ? styles.tabTextActive : styles.tabTextInactive]}>
            Clock In / Out
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, tab === 'history' ? styles.tabBtnActive : styles.tabBtnInactive]}
          onPress={() => setTab('history')}
        >
          <Text style={[styles.tabText, tab === 'history' ? styles.tabTextActive : styles.tabTextInactive]}>
            Attendance History
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {tab === 'checkin' ? (
          <>
            {/* Live Digital Clock Card */}
            <LinearGradient
              colors={['#1E1B4B', '#312E81']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.liveClockCard}
            >
              <View style={styles.clockHeaderRow}>
                <View style={styles.liveBadge}>
                  <View style={styles.pulsingDot} />
                  <Text style={styles.liveBadgeText}>LIVE TIME</Text>
                </View>
                <Text style={styles.clockDateText}>{dateString}</Text>
              </View>

              <Text style={styles.digitalClockText}>{timeString}</Text>

              <View style={styles.clockFooterRow}>
                <View style={styles.clockStatusPill}>
                  <Ionicons name="shield-checkmark" size={14} color="#10B981" style={{ marginRight: 4 }} />
                  <Text style={styles.clockStatusText}>
                    {isCheckedIn ? 'Status: Active on Campus' : 'Status: Ready for Clock-In'}
                  </Text>
                </View>
              </View>
            </LinearGradient>

            {/* Radar / Geofence Location Card */}
            <View style={styles.radarCard}>
              <View style={styles.radarOuterRing}>
                <View style={styles.radarMiddleRing}>
                  <View style={styles.radarInnerRing}>
                    <View style={styles.radarCenterDot}>
                      <Image
                        source={require('../../assets/image.png')}
                        style={styles.radarLogo}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.radarLocateBtn}>
                <MaterialIcons name="my-location" size={20} color="#6366F1" />
              </TouchableOpacity>
            </View>

            {/* Location Status Badge */}
            <View style={styles.locationStatusCard}>
              <View style={styles.statusPill}>
                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                <Text style={styles.statusPillText}>Verified inside school geofence</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Image
                  source={require('../../assets/image.png')}
                  style={{ width: 28, height: 28, marginRight: 8 }}
                  resizeMode="contain"
                />
                <Text style={styles.schoolLocationName}>Kids' Dream English School</Text>
              </View>
              <Text style={styles.schoolLocationAddress}>Main Road, Ranchi, Jharkhand</Text>
              <Text style={styles.accuracyText}>GPS Accuracy: 12 meters (Precise)</Text>
            </View>

            {/* Attractive Clock In / Clock Out Action Buttons */}
            <View style={styles.actionButtonsRow}>
              {/* Clock In Button Card */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleCheckIn}
                style={[
                  styles.punchActionCard,
                  styles.clockInCard,
                  isCheckedIn && styles.actionDisabled,
                ]}
                disabled={isCheckedIn}
              >
                <LinearGradient
                  colors={isCheckedIn ? ['#9CA3AF', '#6B7280'] : ['#10B981', '#059669']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.punchBtnGradient}
                >
                  <View style={styles.punchBtnIconCircle}>
                    <Ionicons name="log-in-outline" size={24} color="#FFFFFF" />
                  </View>
                  <Text style={styles.punchBtnHeading}>CLOCK IN</Text>
                  <Text style={styles.punchBtnSub}>{checkInTime ? `In: ${checkInTime}` : 'Tap to Start'}</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* Clock Out Button Card */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleCheckOut}
                style={[
                  styles.punchActionCard,
                  styles.clockOutCard,
                  !isCheckedIn && styles.actionDisabled,
                ]}
                disabled={!isCheckedIn}
              >
                <LinearGradient
                  colors={!isCheckedIn ? ['#9CA3AF', '#6B7280'] : ['#EF4444', '#DC2626']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.punchBtnGradient}
                >
                  <View style={styles.punchBtnIconCircle}>
                    <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
                  </View>
                  <Text style={styles.punchBtnHeading}>CLOCK OUT</Text>
                  <Text style={styles.punchBtnSub}>{checkOutTime ? `Out: ${checkOutTime}` : 'End Shift'}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Today's Status Table */}
            <View style={styles.todayStatusCard}>
              <Text style={styles.todayStatusHeading}>Today's Punch Summary</Text>
              <View style={styles.statusColumnsRow}>
                <View style={styles.statusCol}>
                  <Text style={styles.statusColLabel}>Clock In</Text>
                  <Text style={[styles.statusColVal, checkInTime && { color: '#10B981' }]}>
                    {checkInTime || '--:--'}
                  </Text>
                </View>

                <View style={styles.statusColDivider} />

                <View style={styles.statusCol}>
                  <Text style={styles.statusColLabel}>Clock Out</Text>
                  <Text style={[styles.statusColVal, checkOutTime && { color: '#EF4444' }]}>
                    {checkOutTime || '--:--'}
                  </Text>
                </View>

                <View style={styles.statusColDivider} />

                <View style={styles.statusCol}>
                  <Text style={styles.statusColLabel}>Working Hours</Text>
                  <Text style={styles.statusColVal}>
                    {isCheckedIn ? 'Counting...' : checkInTime && checkOutTime ? '8h 15m' : '--:--'}
                  </Text>
                </View>
              </View>
            </View>
          </>
        ) : (
          /* History View */
          <View style={styles.historyContainer}>
            <View style={styles.historyMonthHeader}>
              <Text style={styles.historyMonthTitle}>September 2026</Text>
              <Text style={styles.historySummaryText}>22 Present • 2 Absent</Text>
            </View>

            {[
              { date: '01 Oct 2026', in: '07:55 AM', out: '03:10 PM', status: 'Present' },
              { date: '30 Sep 2026', in: '07:58 AM', out: '03:05 PM', status: 'Present' },
              { date: '29 Sep 2026', in: '08:02 AM', out: '03:15 PM', status: 'Present' },
              { date: '28 Sep 2026', in: '--:--', out: '--:--', status: 'Leave' },
            ].map((h, i) => (
              <View key={i} style={styles.historyCard}>
                <View>
                  <Text style={styles.historyDate}>{h.date}</Text>
                  <Text style={styles.historyTime}>{h.in} - {h.out}</Text>
                </View>
                <View style={[styles.historyBadge, h.status === 'Present' ? styles.badgePresent : styles.badgeLeave]}>
                  <Text style={[styles.historyBadgeText, h.status === 'Present' ? styles.badgeTextPresent : styles.badgeTextLeave]}>
                    {h.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF5FF',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 36 : 10,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3E8FF',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E1B4B',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 6,
    marginHorizontal: 20,
    marginTop: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EDE9FE',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
  },
  tabBtnActive: {
    backgroundColor: '#6366F1',
  },
  tabBtnInactive: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  tabTextInactive: {
    color: '#6B7280',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 30,
    alignItems: 'center',
  },
  bannerCardWrapper: {
    width: width - 32,
    height: (width - 32) * 0.48,
    borderRadius: 20,
    backgroundColor: '#1E1B4B',
    marginBottom: 14,
    shadowColor: '#1E1B4B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
    overflow: 'hidden',
  },
  heroBannerImage: {
    width: '100%',
    height: '100%',
  },
  liveClockCard: {
    width: width - 32,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#312E81',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
    alignItems: 'center',
  },
  clockHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  pulsingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 5,
  },
  liveBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#34D399',
    letterSpacing: 0.5,
  },
  clockDateText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#C7D2FE',
  },
  digitalClockText: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1.5,
    marginVertical: 4,
    fontVariant: ['tabular-nums'],
  },
  clockFooterRow: {
    marginTop: 6,
  },
  clockStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  clockStatusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#E0E7FF',
  },
  todayDateText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4B5563',
    marginBottom: 14,
  },
  radarCard: {
    width: width - 32,
    height: 180,
    backgroundColor: '#EDE9FE',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#DDD6FE',
    position: 'relative',
    overflow: 'hidden',
  },
  radarOuterRing: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  radarMiddleRing: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.4)',
  },
  radarInnerRing: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: 'rgba(99, 102, 241, 0.28)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radarCenterDot: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#6366F1',
    overflow: 'hidden',
  },
  radarLogo: {
    width: 32,
    height: 32,
  },
  radarLocateBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  locationStatusCard: {
    width: width - 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EDE9FE',
    shadowColor: '#1E1B4B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 10,
  },
  statusPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
    marginLeft: 6,
  },
  schoolLocationName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
  },
  schoolLocationAddress: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  accuracyText: {
    fontSize: 11,
    color: '#6366F1',
    marginTop: 4,
    fontWeight: '700',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    width: width - 32,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  punchActionCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  clockInCard: {
    marginRight: 8,
    shadowColor: '#10B981',
  },
  clockOutCard: {
    marginLeft: 8,
    shadowColor: '#EF4444',
  },
  actionDisabled: {
    opacity: 0.6,
    shadowOpacity: 0.05,
    elevation: 1,
  },
  punchBtnGradient: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  punchBtnIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  punchBtnHeading: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  punchBtnSub: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 3,
  },
  todayStatusCard: {
    width: width - 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.2,
    borderColor: '#EDE9FE',
    shadowColor: '#1E1B4B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  todayStatusHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E1B4B',
    marginBottom: 12,
  },
  statusColumnsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusCol: {
    flex: 1,
    alignItems: 'center',
  },
  statusColDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E5E7EB',
  },
  statusColLabel: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 4,
  },
  statusColVal: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1F2937',
  },
  historyContainer: {
    width: '100%',
  },
  historyMonthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  historyMonthTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E1B4B',
  },
  historySummaryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366F1',
  },
  historyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EDE9FE',
  },
  historyDate: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  historyTime: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  historyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  badgePresent: {
    backgroundColor: '#ECFDF5',
  },
  badgeLeave: {
    backgroundColor: '#FEF3C7',
  },
  historyBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  badgeTextPresent: {
    color: '#059669',
  },
  badgeTextLeave: {
    color: '#D97706',
  },
});
