import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ExamScheduleScreen({
  onBack,
  student = {
    name: 'Aarav Sharma',
    class: 'Class 4 - B',
    rollNo: '14',
    admissionNo: 'KD-2023-042',
  },
}) {
  const [selectedExamType, setSelectedExamType] = useState('upcoming'); // 'upcoming' | 'past'

  const upcomingExams = [
    {
      id: 'e1',
      subject: 'Mathematics',
      code: 'MTH-401',
      date: '20 Oct 2026',
      day: 'Tuesday',
      time: '09:00 AM - 11:30 AM',
      duration: '2.5 Hours',
      room: 'Room 204 (Block B)',
      totalMarks: 80,
      passingMarks: 32,
      syllabus: 'Chapters 1 to 5: Large Numbers, Fractions, Factors & Multiples, Geometry.',
      color: '#3B82F6',
      icon: 'calculator',
      status: 'In 6 Days',
      statusColor: '#F59E0B',
    },
    {
      id: 'e2',
      subject: 'English Literature & Grammar',
      code: 'ENG-402',
      date: '22 Oct 2026',
      day: 'Thursday',
      time: '09:00 AM - 11:30 AM',
      duration: '2.5 Hours',
      room: 'Room 204 (Block B)',
      totalMarks: 80,
      passingMarks: 32,
      syllabus: 'Prose Lessons 1-4, Poems 1-2, Tenses, Prepositions, Letter Writing.',
      color: '#8B5CF6',
      icon: 'book-reader',
      status: 'In 8 Days',
      statusColor: '#6366F1',
    },
    {
      id: 'e3',
      subject: 'Science & Environmental Studies',
      code: 'SCI-403',
      date: '24 Oct 2026',
      day: 'Saturday',
      time: '09:00 AM - 11:30 AM',
      duration: '2.5 Hours',
      room: 'Room 204 (Block B)',
      totalMarks: 80,
      passingMarks: 32,
      syllabus: 'Plant Life, Digestive System, Weather & Seasons, Force and Simple Machines.',
      color: '#10B981',
      icon: 'flask',
      status: 'In 10 Days',
      statusColor: '#10B981',
    },
    {
      id: 'e4',
      subject: 'Social Studies',
      code: 'SST-404',
      date: '27 Oct 2026',
      day: 'Tuesday',
      time: '09:00 AM - 11:30 AM',
      duration: '2.5 Hours',
      room: 'Room 204 (Block B)',
      totalMarks: 80,
      passingMarks: 32,
      syllabus: 'Our Country India, Northern Mountains, Coastal Plains, Local Government.',
      color: '#F59E0B',
      icon: 'globe-americas',
      status: 'In 13 Days',
      statusColor: '#64748B',
    },
    {
      id: 'e5',
      subject: 'Hindi Bhasha & Vyakaran',
      code: 'HIN-405',
      date: '29 Oct 2026',
      day: 'Thursday',
      time: '09:00 AM - 11:30 AM',
      duration: '2.5 Hours',
      room: 'Room 204 (Block B)',
      totalMarks: 80,
      passingMarks: 32,
      syllabus: 'Pari Aur Baalak, Sangya, Sarvanam, Muhavare, Nibandh Lekhan.',
      color: '#EC4899',
      icon: 'feather-alt',
      status: 'In 15 Days',
      statusColor: '#64748B',
    },
  ];

  const pastExams = [
    {
      id: 'p1',
      examTitle: 'Term 1 Unit Assessment',
      period: '10 Sep - 18 Sep 2026',
      resultStatus: 'Result Declared',
      overallScore: '90.4% (Grade A+)',
      color: '#10B981',
    },
    {
      id: 'p2',
      examTitle: 'Periodic Test 1 (PT-1)',
      period: '12 Jul - 18 Jul 2026',
      resultStatus: 'Result Declared',
      overallScore: '89.2% (Grade A)',
      color: '#3B82F6',
    },
  ];

  const handleDownloadHallTicket = () => {
    Alert.alert(
      'Admit Card Downloaded',
      'Admit Card for Mid-Term Examination 2026-27 has been saved to your downloads folder.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <LinearGradient
        colors={['#8B5CF6', '#6D28D9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Exam Schedule & Routine</Text>
            <Text style={styles.headerSubtitle}>Mid-Term Examination 2026</Text>
          </View>
          <TouchableOpacity
            style={styles.headerActionBtn}
            onPress={handleDownloadHallTicket}
            activeOpacity={0.7}
          >
            <Feather name="file-text" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Student Bar */}
        <View style={styles.studentBanner}>
          <View style={styles.studentAvatar}>
            <Text style={styles.studentInitial}>{student.name.charAt(0)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.studentName}>{student.name}</Text>
            <Text style={styles.studentMeta}>
              {student.class} • Roll No: {student.rollNo} • Room: 204
            </Text>
          </View>
          <TouchableOpacity
            style={styles.hallTicketBtn}
            onPress={handleDownloadHallTicket}
            activeOpacity={0.8}
          >
            <Feather name="download" size={12} color="#6D28D9" />
            <Text style={styles.hallTicketText}>Hall Ticket</Text>
          </TouchableOpacity>
        </View>

        {/* Toggle Bar */}
        <View style={styles.toggleBar}>
          <TouchableOpacity
            style={[
              styles.toggleTab,
              selectedExamType === 'upcoming' && styles.toggleTabActive,
            ]}
            onPress={() => setSelectedExamType('upcoming')}
          >
            <Text
              style={[
                styles.toggleText,
                selectedExamType === 'upcoming' && styles.toggleTextActive,
              ]}
            >
              Upcoming ({upcomingExams.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleTab,
              selectedExamType === 'past' && styles.toggleTabActive,
            ]}
            onPress={() => setSelectedExamType('past')}
          >
            <Text
              style={[
                styles.toggleText,
                selectedExamType === 'past' && styles.toggleTextActive,
              ]}
            >
              Past Examinations ({pastExams.length})
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {selectedExamType === 'upcoming' ? (
          <>
            {/* Exam Alert Card */}
            <View style={styles.alertCard}>
              <View style={styles.alertIconCircle}>
                <Ionicons name="timer-outline" size={20} color="#F59E0B" />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.alertTitle}>Next Exam Begins in 6 Days</Text>
                <Text style={styles.alertSub}>
                  Reporting time is strictly 08:30 AM. Students must bring school ID card & admit slip.
                </Text>
              </View>
            </View>

            {/* List of Scheduled Papers */}
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeaderTitle}>Date Sheet & Papers</Text>
              <Text style={styles.timingNote}>Shift: Morning (09:00 AM)</Text>
            </View>

            {upcomingExams.map((exam, index) => (
              <View key={exam.id} style={styles.examCard}>
                {/* Date Left Ribbon */}
                <View style={styles.examCardTop}>
                  <View style={styles.dateBlock}>
                    <Text style={styles.dateDayText}>{exam.day.slice(0, 3)}</Text>
                    <Text style={styles.dateNumText}>{exam.date.split(' ')[0]}</Text>
                    <Text style={styles.dateMonthText}>{exam.date.split(' ')[1]}</Text>
                  </View>

                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <View style={styles.subjectRow}>
                      <View
                        style={[
                          styles.subjectMiniIcon,
                          { backgroundColor: exam.color + '18' },
                        ]}
                      >
                        <FontAwesome5
                          name={exam.icon}
                          size={13}
                          color={exam.color}
                        />
                      </View>
                      <Text style={styles.subjectTitle}>{exam.subject}</Text>
                    </View>
                    <Text style={styles.subjectCodeText}>
                      Code: {exam.code} • Max: {exam.totalMarks} Marks (Pass: {exam.passingMarks})
                    </Text>

                    <View style={styles.timeTagRow}>
                      <View style={styles.timeBadge}>
                        <Feather name="clock" size={11} color="#475569" />
                        <Text style={styles.timeBadgeText}>{exam.time}</Text>
                      </View>
                      <View
                        style={[
                          styles.statusBadge,
                          { backgroundColor: exam.statusColor + '18' },
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusBadgeText,
                            { color: exam.statusColor },
                          ]}
                        >
                          {exam.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Room and Syllabus Box */}
                <View style={styles.examCardBottom}>
                  <View style={styles.roomRow}>
                    <Ionicons name="location-outline" size={14} color="#64748B" />
                    <Text style={styles.roomText}>{exam.room}</Text>
                  </View>
                  <View style={styles.syllabusBox}>
                    <Text style={styles.syllabusLabel}>Syllabus Covered:</Text>
                    <Text style={styles.syllabusContent}>{exam.syllabus}</Text>
                  </View>
                </View>
              </View>
            ))}

            {/* Exam Guidelines Card */}
            <View style={styles.guidelinesCard}>
              <View style={styles.guidelineHeader}>
                <MaterialCommunityIcons
                  name="shield-check-outline"
                  size={20}
                  color="#10B981"
                />
                <Text style={styles.guidelineHeaderTitle}>
                  Examination Hall Instructions
                </Text>
              </View>
              <Text style={styles.bulletPoint}>
                • Entry permitted only with verified Hall Ticket & school uniform.
              </Text>
              <Text style={styles.bulletPoint}>
                • Transparent stationery pouch and water bottle are allowed.
              </Text>
              <Text style={styles.bulletPoint}>
                • No electronic watches or gadgets are permitted in the exam hall.
              </Text>
              <Text style={styles.bulletPoint}>
                • 15 minutes dedicated reading time from 08:45 AM to 09:00 AM.
              </Text>
            </View>
          </>
        ) : (
          /* Past Exams List */
          <View>
            {pastExams.map((past) => (
              <View key={past.id} style={styles.pastExamCard}>
                <View style={styles.pastExamTop}>
                  <View>
                    <Text style={styles.pastExamTitle}>{past.examTitle}</Text>
                    <Text style={styles.pastExamPeriod}>{past.period}</Text>
                  </View>
                  <View style={styles.pastBadge}>
                    <Text style={styles.pastBadgeText}>{past.resultStatus}</Text>
                  </View>
                </View>

                <View style={styles.pastDivider} />

                <View style={styles.pastBottomRow}>
                  <View>
                    <Text style={styles.pastScoreLabel}>Performance</Text>
                    <Text style={styles.pastScoreVal}>{past.overallScore}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.viewResultBtn}
                    onPress={onBack}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.viewResultBtnText}>View Marksheet</Text>
                    <Feather name="chevron-right" size={14} color="#6366F1" />
                  </TouchableOpacity>
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
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 12 : 36,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
    fontWeight: '500',
  },
  headerActionBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
  },
  studentAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  studentInitial: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6D28D9',
  },
  studentName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  studentMeta: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 1,
  },
  hallTicketBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  hallTicketText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6D28D9',
    marginLeft: 4,
  },
  toggleBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 3,
  },
  toggleTab: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 9,
  },
  toggleTabActive: {
    backgroundColor: '#FFFFFF',
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.85)',
  },
  toggleTextActive: {
    color: '#6D28D9',
    fontWeight: '700',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 36,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFBEB',
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  alertIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 2,
  },
  alertSub: {
    fontSize: 11,
    color: '#B45309',
    lineHeight: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionHeaderTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  timingNote: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  examCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  examCardTop: {
    flexDirection: 'row',
  },
  dateBlock: {
    width: 60,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  dateDayText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  dateNumText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E293B',
    marginVertical: 1,
  },
  dateMonthText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectMiniIcon: {
    width: 24,
    height: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  subjectTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
  },
  subjectCodeText: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  timeTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  timeBadgeText: {
    fontSize: 11,
    color: '#475569',
    marginLeft: 4,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  examCardBottom: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  roomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  roomText: {
    fontSize: 11,
    color: '#64748B',
    marginLeft: 4,
    fontWeight: '500',
  },
  syllabusBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  syllabusLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 2,
  },
  syllabusContent: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },
  guidelinesCard: {
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginTop: 8,
  },
  guidelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  guidelineHeaderTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#065F46',
    marginLeft: 6,
  },
  bulletPoint: {
    fontSize: 11,
    color: '#047857',
    lineHeight: 18,
    marginBottom: 2,
  },
  pastExamCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pastExamTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  pastExamTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  pastExamPeriod: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  pastBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  pastBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#10B981',
  },
  pastDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  pastBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pastScoreLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  pastScoreVal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 1,
  },
  viewResultBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  viewResultBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6366F1',
    marginRight: 4,
  },
});
