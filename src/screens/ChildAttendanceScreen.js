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
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ChildAttendanceScreen({
  onBack,
  student = {
    name: 'Aarav Sharma',
    class: 'Class 4 - B',
    rollNo: '14',
    admissionNo: 'KD-2023-042',
  },
}) {
  const [selectedMonth, setSelectedMonth] = useState('October 2026');
  const [selectedFilter, setSelectedFilter] = useState('All'); // 'All' | 'present' | 'absent' | 'leave' | 'holiday'
  const [selectedDayDetail, setSelectedDayDetail] = useState(null);

  // Stats for the month (October 2026)
  const stats = {
    totalWorkingDays: 24,
    present: 20,
    absent: 2,
    leave: 1,
    holiday: 8,
    attendancePercent: '91.3%',
  };

  // Days array for calendar generation for October 2026
  // (Oct 1 2026 is Thursday -> empty slots for Sun, Mon, Tue, Wed = 4 offset days)
  const calendarData = [
    { day: null }, { day: null }, { day: null }, { day: null }, // Offset for Thu start
    { day: 1, status: 'present', date: '01 Oct 2026', title: 'Present in School', time: '07:54 AM - 01:30 PM' },
    { day: 2, status: 'holiday', date: '02 Oct 2026', title: 'Gandhi Jayanti', desc: 'National Holiday - School Closed' },
    { day: 3, status: 'present', date: '03 Oct 2026', title: 'Present (PTM & Activity)', time: '08:00 AM - 12:30 PM' },
    { day: 4, status: 'holiday', date: '04 Oct 2026', title: 'Sunday', desc: 'Weekend Holiday' },
    { day: 5, status: 'present', date: '05 Oct 2026', title: 'Present in School', time: '07:50 AM - 01:30 PM' },
    { day: 6, status: 'present', date: '06 Oct 2026', title: 'Present (Today)', time: '07:48 AM - 01:30 PM' },
    { day: 7, status: 'present', date: '07 Oct 2026', title: 'Present in School', time: '07:55 AM - 01:30 PM' },
    { day: 8, status: 'absent', date: '08 Oct 2026', title: 'Uninformed Absent', desc: 'Student did not attend without prior application' },
    { day: 9, status: 'present', date: '09 Oct 2026', title: 'Present in School', time: '07:52 AM - 01:30 PM' },
    { day: 10, status: 'present', date: '10 Oct 2026', title: 'Present in School', time: '07:56 AM - 01:30 PM' },
    { day: 11, status: 'holiday', date: '11 Oct 2026', title: 'Sunday', desc: 'Weekend Holiday' },
    { day: 12, status: 'present', date: '12 Oct 2026', title: 'Present in School', time: '07:49 AM - 01:30 PM' },
    { day: 13, status: 'leave', date: '13 Oct 2026', title: 'Sick Leave Approved', desc: 'Medical slip submitted by Parent for viral fever' },
    { day: 14, status: 'present', date: '14 Oct 2026', title: 'Present in School', time: '07:51 AM - 01:30 PM' },
    { day: 15, status: 'present', date: '15 Oct 2026', title: 'Present in School', time: '07:53 AM - 01:30 PM' },
    { day: 16, status: 'present', date: '16 Oct 2026', title: 'Present in School', time: '07:50 AM - 01:30 PM' },
    { day: 17, status: 'present', date: '17 Oct 2026', title: 'Present in School', time: '07:55 AM - 01:30 PM' },
    { day: 18, status: 'holiday', date: '18 Oct 2026', title: 'Sunday', desc: 'Weekend Holiday' },
    { day: 19, status: 'holiday', date: '19 Oct 2026', title: 'Maha Navami / Dussehra', desc: 'Festival Holiday' },
    { day: 20, status: 'holiday', date: '20 Oct 2026', title: 'Vijayadashami', desc: 'Festival Holiday' },
    { day: 21, status: 'present', date: '21 Oct 2026', title: 'Present in School', time: '07:52 AM - 01:30 PM' },
    { day: 22, status: 'present', date: '22 Oct 2026', title: 'Present in School', time: '07:47 AM - 01:30 PM' },
    { day: 23, status: 'absent', date: '23 Oct 2026', title: 'Absent', desc: 'Parent informed via call (Family Travel)' },
    { day: 24, status: 'present', date: '24 Oct 2026', title: 'Present in School', time: '07:50 AM - 01:30 PM' },
    { day: 25, status: 'holiday', date: '25 Oct 2026', title: 'Sunday', desc: 'Weekend Holiday' },
    { day: 26, status: 'present', date: '26 Oct 2026', title: 'Present in School', time: '07:51 AM - 01:30 PM' },
    { day: 27, status: 'present', date: '27 Oct 2026', title: 'Present in School', time: '07:54 AM - 01:30 PM' },
    { day: 28, status: 'present', date: '28 Oct 2026', title: 'Present in School', time: '07:48 AM - 01:30 PM' },
    { day: 29, status: 'present', date: '29 Oct 2026', title: 'Present in School', time: '07:50 AM - 01:30 PM' },
    { day: 30, status: 'present', date: '30 Oct 2026', title: 'Present in School', time: '07:52 AM - 01:30 PM' },
    { day: 31, status: 'present', date: '31 Oct 2026', title: 'Present in School', time: '07:53 AM - 01:30 PM' },
  ];

  // Specific list of absent & leave days as per Module 9 specification
  const logEntries = [
    {
      id: '1',
      date: 'Friday, 23 Oct 2026',
      status: 'Absent',
      statusType: 'absent',
      reason: 'Family Travel (Informed by Mother)',
      recordedBy: 'Class Teacher (Rohit Kumar)',
      tagColor: '#EF4444',
      tagBg: '#FEF2F2',
    },
    {
      id: '2',
      date: 'Tuesday, 13 Oct 2026',
      status: 'Leave (Approved)',
      statusType: 'leave',
      reason: 'Viral Fever & Medical Rest (Dr. Slip submitted)',
      recordedBy: 'School Principal Office',
      tagColor: '#F59E0B',
      tagBg: '#FEF3C7',
    },
    {
      id: '3',
      date: 'Thursday, 08 Oct 2026',
      status: 'Uninformed Absent',
      statusType: 'absent',
      reason: 'No reason or application received',
      recordedBy: 'Class Teacher (Rohit Kumar)',
      tagColor: '#EF4444',
      tagBg: '#FEF2F2',
    },
  ];

  const getDayStatusStyle = (status) => {
    switch (status) {
      case 'present':
        return { bg: '#10B981', text: '#FFFFFF', label: 'Present' };
      case 'absent':
        return { bg: '#EF4444', text: '#FFFFFF', label: 'Absent' };
      case 'leave':
        return { bg: '#F59E0B', text: '#FFFFFF', label: 'Leave' };
      case 'holiday':
        return { bg: '#E2E8F0', text: '#64748B', label: 'Holiday' };
      default:
        return { bg: 'transparent', text: '#94A3B8', label: '' };
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={onBack}>
          <Feather name="chevron-left" size={24} color="#1E1B4B" />
        </TouchableOpacity>
        <View style={styles.headerTitleGroup}>
          <Text style={styles.screenTitle}>Student Attendance</Text>
          <Text style={styles.screenSubtitle}>{student.name} • {student.class}</Text>
        </View>
        <View style={styles.avatarMini}>
          <Text style={styles.avatarMiniText}>{student.name.charAt(0)}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Student Summary Hero Card */}
        <LinearGradient
          colors={['#1E1B4B', '#312E81']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.heroPreText}>ATTENDANCE PERFORMANCE</Text>
              <Text style={styles.heroPercent}>{stats.attendancePercent}</Text>
              <Text style={styles.heroSubText}>Overall presence in session 2026-27</Text>
            </View>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreNumber}>20/24</Text>
              <Text style={styles.scoreLabel}>Days Attended</Text>
            </View>
          </View>

          <View style={styles.heroDivider} />

          <View style={styles.studentInfoRow}>
            <View style={styles.infoCol}>
              <Text style={styles.infoColLabel}>Roll No.</Text>
              <Text style={styles.infoColVal}>{student.rollNo}</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoColLabel}>Admission No.</Text>
              <Text style={styles.infoColVal}>{student.admissionNo}</Text>
            </View>
            <View style={styles.infoCol}>
              <Text style={styles.infoColLabel}>Status</Text>
              <Text style={[styles.infoColVal, { color: '#34D399' }]}>Good Standing</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Month Selector Row */}
        <View style={styles.monthSelectorRow}>
          <Text style={styles.sectionHeading}>Monthly Record</Text>
          <View style={styles.monthDropdown}>
            <Ionicons name="calendar-outline" size={14} color="#6366F1" style={{ marginRight: 6 }} />
            <Text style={styles.monthDropdownText}>{selectedMonth}</Text>
            <Feather name="chevron-down" size={14} color="#6366F1" style={{ marginLeft: 4 }} />
          </View>
        </View>

        {/* Attendance Stats 3-Pill Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }]}>
            <View style={[styles.statDot, { backgroundColor: '#10B981' }]} />
            <Text style={[styles.statCount, { color: '#047857' }]}>{stats.present}</Text>
            <Text style={styles.statLabel}>Present</Text>
          </View>

          <View style={[styles.statBox, { backgroundColor: '#FEF2F2', borderColor: '#FECACA' }]}>
            <View style={[styles.statDot, { backgroundColor: '#EF4444' }]} />
            <Text style={[styles.statCount, { color: '#B91C1C' }]}>{stats.absent}</Text>
            <Text style={styles.statLabel}>Absent</Text>
          </View>

          <View style={[styles.statBox, { backgroundColor: '#FEF3C7', borderColor: '#FDE68A' }]}>
            <View style={[styles.statDot, { backgroundColor: '#F59E0B' }]} />
            <Text style={[styles.statCount, { color: '#B45309' }]}>{stats.leave}</Text>
            <Text style={styles.statLabel}>Leave</Text>
          </View>

          <View style={[styles.statBox, { backgroundColor: '#F1F5F9', borderColor: '#E2E8F0' }]}>
            <View style={[styles.statDot, { backgroundColor: '#64748B' }]} />
            <Text style={[styles.statCount, { color: '#334155' }]}>{stats.holiday}</Text>
            <Text style={styles.statLabel}>Holidays</Text>
          </View>
        </View>

        {/* Calendar Grid Section */}
        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <Text style={styles.calendarMonthTitle}>October 2026 Calendar</Text>
            <Text style={styles.calendarTip}>Tap any date for details</Text>
          </View>

          {/* Weekday Labels Header */}
          <View style={styles.weekdayRow}>
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((w, idx) => (
              <Text key={idx} style={[styles.weekdayText, idx === 0 && { color: '#EF4444' }]}>
                {w}
              </Text>
            ))}
          </View>

          {/* Days Grid */}
          <View style={styles.daysGrid}>
            {calendarData.map((item, index) => {
              if (!item.day) {
                return <View key={index} style={styles.dayCellEmpty} />;
              }

              const statusStyle = getDayStatusStyle(item.status);
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.dayCellWrapper}
                  activeOpacity={0.75}
                  onPress={() => setSelectedDayDetail(item)}
                >
                  <View style={[styles.dayCircle, { backgroundColor: statusStyle.bg }]}>
                    <Text style={[styles.dayNumberText, { color: statusStyle.text }]}>
                      {item.day}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Calendar Color Legend */}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
              <Text style={styles.legendText}>Present</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
              <Text style={styles.legendText}>Absent</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
              <Text style={styles.legendText}>Leave</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#E2E8F0' }]} />
              <Text style={styles.legendText}>Holiday</Text>
            </View>
          </View>
        </View>

        {/* Detailed Attendance Remarks / Absent & Leave Log */}
        <View style={styles.remarksSection}>
          <View style={styles.remarksHeaderRow}>
            <Text style={styles.sectionHeading}>Absence & Leave Remarks</Text>
            <View style={styles.badgeCount}>
              <Text style={styles.badgeCountText}>{logEntries.length} Records</Text>
            </View>
          </View>

          {logEntries.map((log) => (
            <View key={log.id} style={styles.logCard}>
              <View style={styles.logTopRow}>
                <View style={styles.logDateGroup}>
                  <Feather name="calendar" size={14} color="#6366F1" style={{ marginRight: 6 }} />
                  <Text style={styles.logDateText}>{log.date}</Text>
                </View>

                <View style={[styles.logStatusBadge, { backgroundColor: log.tagBg }]}>
                  <Text style={[styles.logStatusBadgeText, { color: log.tagColor }]}>
                    {log.status}
                  </Text>
                </View>
              </View>

              <Text style={styles.logReasonText}>
                <Text style={{ fontWeight: '800', color: '#1E1B4B' }}>Reason: </Text>
                {log.reason}
              </Text>

              <View style={styles.logFooter}>
                <Feather name="user-check" size={12} color="#94A3B8" style={{ marginRight: 4 }} />
                <Text style={styles.logRecorderText}>{log.recordedBy}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Date Detail Popup Modal */}
      <Modal visible={!!selectedDayDetail} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View
              style={[
                styles.modalHeaderIcon,
                { backgroundColor: getDayStatusStyle(selectedDayDetail?.status).bg },
              ]}
            >
              <Text style={styles.modalHeaderDay}>{selectedDayDetail?.day}</Text>
            </View>

            <Text style={styles.modalDateTitle}>{selectedDayDetail?.date}</Text>
            <Text style={styles.modalTitleText}>{selectedDayDetail?.title}</Text>

            {selectedDayDetail?.time && (
              <View style={styles.modalDetailRow}>
                <Feather name="clock" size={14} color="#10B981" style={{ marginRight: 6 }} />
                <Text style={styles.modalDetailVal}>Timing: {selectedDayDetail?.time}</Text>
              </View>
            )}

            {selectedDayDetail?.desc && (
              <View style={styles.modalDescBox}>
                <Text style={styles.modalDescText}>{selectedDayDetail?.desc}</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.modalCloseBtn}
              activeOpacity={0.85}
              onPress={() => setSelectedDayDetail(null)}
            >
              <Text style={styles.modalCloseBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'android' ? 38 : 12,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleGroup: {
    flex: 1,
    marginHorizontal: 12,
  },
  screenTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  screenSubtitle: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 1,
  },
  avatarMini: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#6366F1',
  },
  avatarMiniText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#4F46E5',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 40,
  },
  heroCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#1E1B4B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 4,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroPreText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#A5B4FC',
    letterSpacing: 0.6,
  },
  heroPercent: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 4,
  },
  heroSubText: {
    fontSize: 11,
    color: '#C7D2FE',
    marginTop: 2,
    fontWeight: '500',
  },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  scoreNumber: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  scoreLabel: {
    fontSize: 9,
    color: '#E0E7FF',
    fontWeight: '600',
    marginTop: 2,
  },
  heroDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    marginVertical: 14,
  },
  studentInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoCol: {
    flex: 1,
  },
  infoColLabel: {
    fontSize: 10,
    color: '#A5B4FC',
    fontWeight: '600',
  },
  infoColVal: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: 2,
  },
  monthSelectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  monthDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  monthDropdownText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4F46E5',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  statBox: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
  statDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginBottom: 4,
  },
  statCount: {
    fontSize: 18,
    fontWeight: '900',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 2,
  },
  calendarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  calendarMonthTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  calendarTip: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
  },
  weekdayRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekdayText: {
    width: (SCREEN_WIDTH - 68) / 7,
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayCellWrapper: {
    width: (SCREEN_WIDTH - 68) / 7,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 3,
  },
  dayCellEmpty: {
    width: (SCREEN_WIDTH - 68) / 7,
    height: 38,
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNumberText: {
    fontSize: 12,
    fontWeight: '800',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  legendText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  remarksSection: {
    width: '100%',
  },
  remarksHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeCount: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeCountText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#4F46E5',
  },
  logCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 1,
  },
  logTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  logDateGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logDateText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
  },
  logStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  logStatusBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  logReasonText: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
    marginBottom: 8,
  },
  logFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  logRecorderText: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
  },
  modalHeaderIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  modalHeaderDay: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  modalDateTitle: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  modalTitleText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 4,
    marginBottom: 12,
  },
  modalDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 12,
  },
  modalDetailVal: {
    fontSize: 12,
    fontWeight: '700',
    color: '#047857',
  },
  modalDescBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    width: '100%',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  modalDescText: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
  modalCloseBtn: {
    width: '100%',
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalCloseBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});
