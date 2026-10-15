import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function TimetableScreen({ onBack }) {
  const [scheduleType, setScheduleType] = useState('my'); // 'my' | 'all'
  const [selectedDay, setSelectedDay] = useState('Thu');

  const days = [
    { day: 'Mon', date: '29 Sep', fullName: 'Monday', slotsCount: 4, active: false },
    { day: 'Tue', date: '30 Sep', fullName: 'Tuesday', slotsCount: 4, active: false },
    { day: 'Wed', date: '01 Oct', fullName: 'Wednesday', slotsCount: 3, active: false },
    { day: 'Thu', date: '02 Oct', fullName: 'Thursday', slotsCount: 4, active: true },
    { day: 'Fri', date: '03 Oct', fullName: 'Friday', slotsCount: 5, active: false },
    { day: 'Sat', date: '04 Oct', fullName: 'Saturday', slotsCount: 2, active: false },
  ];

  const scheduleSlots = [
    {
      id: '1',
      time: '08:00 - 08:45 AM',
      period: 'Period 1',
      className: 'Class 5 - A',
      subject: 'Mathematics',
      room: 'Room 101',
      status: 'COMPLETED',
      color: '#10B981',
      icon: 'calculator',
    },
    {
      id: '2',
      time: '09:00 - 09:45 AM',
      period: 'Period 2',
      className: 'Class 6 - B',
      subject: 'Mathematics',
      room: 'Room 102',
      status: 'ONGOING',
      color: '#6366F1',
      icon: 'shapes',
    },
    {
      id: '3',
      time: '11:00 - 11:45 AM',
      period: 'Period 3',
      className: 'Class 7 - A',
      subject: 'Mathematics',
      room: 'Room 103',
      status: 'UPCOMING',
      color: '#F59E0B',
      icon: 'square-root-alt',
    },
    {
      id: '4',
      time: '01:00 - 01:45 PM',
      period: 'Period 4',
      className: 'Class 8 - C',
      subject: 'Mathematics',
      room: 'Lab 2',
      status: 'UPCOMING',
      color: '#EC4899',
      icon: 'laptop-code',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Feather name="chevron-left" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Weekly Timetable</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Schedule Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabBtn, scheduleType === 'my' ? styles.tabBtnActive : styles.tabBtnInactive]}
          onPress={() => setScheduleType('my')}
        >
          <Text style={[styles.tabText, scheduleType === 'my' ? styles.tabTextActive : styles.tabTextInactive]}>
            My Schedule
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, scheduleType === 'all' ? styles.tabBtnActive : styles.tabBtnInactive]}
          onPress={() => setScheduleType('all')}
        >
          <Text style={[styles.tabText, scheduleType === 'all' ? styles.tabTextActive : styles.tabTextInactive]}>
            All Classes
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Section Title */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeading}>Select Working Day</Text>
          <View style={styles.todayIndicatorPill}>
            <View style={styles.greenPulseDot} />
            <Text style={styles.todayIndicatorText}>Today: Thursday</Text>
          </View>
        </View>

        {/* Weekly Day Selector Cards (Horizontal Scroll) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daysScrollList}
        >
          {days.map((item) => {
            const isSelected = selectedDay === item.day;
            return (
              <TouchableOpacity
                key={item.day}
                style={[
                  styles.dayCardItem,
                  isSelected ? styles.dayCardItemActive : styles.dayCardItemInactive,
                ]}
                onPress={() => setSelectedDay(item.day)}
                activeOpacity={0.82}
              >
                {isSelected ? (
                  <LinearGradient
                    colors={['#4F46E5', '#6366F1']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.dayCardGradient}
                  >
                    <View style={styles.dayTopBadgeActive}>
                      <Text style={styles.dayTopBadgeTextActive}>{item.slotsCount} Slots</Text>
                    </View>
                    <Text style={styles.dayNameActive}>{item.day}</Text>
                    <Text style={styles.dayDateActive}>{item.date}</Text>
                    <View style={styles.activeCheckCircle}>
                      <Ionicons name="checkmark-circle" size={14} color="#FFFFFF" />
                    </View>
                  </LinearGradient>
                ) : (
                  <View style={styles.dayCardInner}>
                    <View style={styles.dayTopBadge}>
                      <Text style={styles.dayTopBadgeText}>{item.slotsCount} Slots</Text>
                    </View>
                    <Text style={styles.dayNameInactive}>{item.day}</Text>
                    <Text style={styles.dayDateInactive}>{item.date}</Text>
                    <View style={styles.inactiveDot} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Selected Day Header */}
        <View style={styles.dayDetailsHeader}>
          <View style={styles.dayDetailsLeft}>
            <Text style={styles.dayDetailsTitle}>
              {days.find((d) => d.day === selectedDay)?.fullName || selectedDay} Schedule
            </Text>
            <Text style={styles.dayDetailsSub}>4 scheduled teaching lectures</Text>
          </View>
          <View style={styles.filterChip}>
            <Ionicons name="calendar-outline" size={14} color="#6366F1" style={{ marginRight: 4 }} />
            <Text style={styles.filterChipText}>{selectedDay}</Text>
          </View>
        </View>

        {/* Schedule Slots List */}
        <View style={styles.slotsContainer}>
          {scheduleSlots.map((slot) => {
            const isOngoing = slot.status === 'ONGOING';
            return (
              <TouchableOpacity
                key={slot.id}
                style={[
                  styles.slotCard,
                  isOngoing && styles.slotCardOngoing,
                ]}
                activeOpacity={0.88}
              >
                {/* Left accent bar */}
                <View style={[styles.slotAccentBar, { backgroundColor: slot.color }]} />

                {/* Main Card Content */}
                <View style={styles.slotMainContent}>
                  {/* Top Slot Row: Period & Status */}
                  <View style={styles.slotTopRow}>
                    <View style={styles.periodTag}>
                      <Text style={styles.periodTagText}>{slot.period}</Text>
                    </View>

                    <View
                      style={[
                        styles.statusChip,
                        slot.status === 'ONGOING' && styles.statusOngoing,
                        slot.status === 'COMPLETED' && styles.statusCompleted,
                        slot.status === 'UPCOMING' && styles.statusUpcoming,
                      ]}
                    >
                      {isOngoing && <View style={styles.livePulse} />}
                      <Text
                        style={[
                          styles.statusChipText,
                          slot.status === 'ONGOING' && { color: '#059669' },
                          slot.status === 'COMPLETED' && { color: '#6B7280' },
                          slot.status === 'UPCOMING' && { color: '#D97706' },
                        ]}
                      >
                        {slot.status}
                      </Text>
                    </View>
                  </View>

                  {/* Subject and Class Row */}
                  <View style={styles.slotBodyRow}>
                    <View style={[styles.slotIconBox, { backgroundColor: `${slot.color}15` }]}>
                      <FontAwesome5 name={slot.icon} size={18} color={slot.color} />
                    </View>

                    <View style={styles.slotTitleGroup}>
                      <Text style={styles.classNameText}>{slot.className}</Text>
                      <Text style={styles.subjectText}>{slot.subject}</Text>
                    </View>

                    <View style={styles.actionArrowBox}>
                      <Feather
                        name={isOngoing ? 'play-circle' : 'chevron-right'}
                        size={20}
                        color={isOngoing ? '#6366F1' : '#9CA3AF'}
                      />
                    </View>
                  </View>

                  {/* Bottom Meta Row (Time & Room) */}
                  <View style={styles.slotFooterRow}>
                    <View style={styles.slotTimePill}>
                      <Ionicons name="time-outline" size={13} color="#6366F1" style={{ marginRight: 4 }} />
                      <Text style={styles.slotTimeText}>{slot.time}</Text>
                    </View>

                    <View style={styles.slotRoomPill}>
                      <Ionicons name="location-outline" size={13} color="#64748B" style={{ marginRight: 4 }} />
                      <Text style={styles.slotRoomText}>{slot.room}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
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
    paddingTop: 14,
    paddingBottom: 35,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E1B4B',
  },
  todayIndicatorPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  greenPulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 4,
  },
  todayIndicatorText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
  },
  daysScrollList: {
    paddingBottom: 8,
    paddingRight: 10,
  },
  dayCardItem: {
    width: 82,
    height: 110,
    marginRight: 10,
    borderRadius: 18,
    overflow: 'hidden',
  },
  dayCardItemActive: {
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  dayCardItemInactive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#EDE9FE',
    shadowColor: '#1E1B4B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  dayCardGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  dayCardInner: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 6,
  },
  dayTopBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  dayTopBadgeTextActive: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  dayTopBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  dayTopBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#6B7280',
  },
  dayNameActive: {
    fontSize: 15,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  dayNameInactive: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
  },
  dayDateActive: {
    fontSize: 10,
    fontWeight: '700',
    color: '#E0E7FF',
  },
  dayDateInactive: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94A3B8',
  },
  activeCheckCircle: {
    marginTop: 2,
  },
  inactiveDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
    marginTop: 6,
  },
  dayDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 12,
  },
  dayDetailsLeft: {
    flex: 1,
  },
  dayDetailsTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  dayDetailsSub: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 1,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#6366F1',
  },
  slotsContainer: {
    width: '100%',
  },
  slotCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 14,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
    shadowColor: '#1E1B4B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  slotCardOngoing: {
    borderColor: '#C7D2FE',
    backgroundColor: '#FBFBFF',
    shadowColor: '#6366F1',
    shadowOpacity: 0.12,
  },
  slotAccentBar: {
    width: 5,
  },
  slotMainContent: {
    flex: 1,
    padding: 14,
  },
  slotTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  periodTag: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  periodTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#475569',
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusOngoing: {
    backgroundColor: '#DCFCE7',
  },
  statusCompleted: {
    backgroundColor: '#F3F4F6',
  },
  statusUpcoming: {
    backgroundColor: '#FEF3C7',
  },
  livePulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 4,
  },
  statusChipText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  slotBodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  slotIconBox: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  slotTitleGroup: {
    flex: 1,
  },
  classNameText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  subjectText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366F1',
    marginTop: 1,
  },
  actionArrowBox: {
    paddingLeft: 8,
  },
  slotFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  slotTimePill: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slotTimeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  slotRoomPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  slotRoomText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
});
