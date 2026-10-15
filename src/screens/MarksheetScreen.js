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
  Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function MarksheetScreen({
  onBack,
  student = {
    name: 'Aarav Sharma',
    class: 'Class 4 - B',
    rollNo: '14',
    admissionNo: 'KD-2023-042',
  },
}) {
  const [selectedTerm, setSelectedTerm] = useState('Term 1'); // 'Term 1' | 'Term 2' | 'Final'
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'detailed'

  const terms = ['Term 1', 'Term 2', 'Annual Final'];

  const performanceData = {
    'Term 1': {
      title: 'Term 1 Assessment 2026-27',
      conductedOn: 'September 2026',
      totalMaxMarks: 500,
      totalObtainedMarks: 452,
      percentage: '90.4%',
      grade: 'A+',
      rankInClass: '3rd',
      totalStudents: 38,
      attendanceScore: '96%',
      remark: 'Outstanding performance! Demonstrates great analytical and problem solving skills.',
      subjects: [
        {
          id: '1',
          name: 'Mathematics',
          code: 'MTH-401',
          icon: 'calculator',
          iconType: 'fa5',
          color: '#3B82F6',
          bg: '#EFF6FF',
          theory: 76,
          maxTheory: 80,
          practical: 19,
          maxPractical: 20,
          total: 95,
          maxTotal: 100,
          grade: 'A+',
          highest: 98,
          teacherNote: 'Exceptional in mental math and geometry.',
        },
        {
          id: '2',
          name: 'English Language',
          code: 'ENG-402',
          icon: 'book-reader',
          iconType: 'fa5',
          color: '#8B5CF6',
          bg: '#F5F3FF',
          theory: 72,
          maxTheory: 80,
          practical: 18,
          maxPractical: 20,
          total: 90,
          maxTotal: 100,
          grade: 'A+',
          highest: 94,
          teacherNote: 'Strong grammar and creative writing expressions.',
        },
        {
          id: '3',
          name: 'Science & EVS',
          code: 'SCI-403',
          icon: 'flask',
          iconType: 'fa5',
          color: '#10B981',
          bg: '#ECFDF5',
          theory: 70,
          maxTheory: 80,
          practical: 18,
          maxPractical: 20,
          total: 88,
          maxTotal: 100,
          grade: 'A',
          highest: 92,
          teacherNote: 'Good understanding of scientific experiments and concepts.',
        },
        {
          id: '4',
          name: 'Social Studies',
          code: 'SST-404',
          icon: 'globe-americas',
          iconType: 'fa5',
          color: '#F59E0B',
          bg: '#FEF3C7',
          theory: 69,
          maxTheory: 80,
          practical: 17,
          maxPractical: 20,
          total: 86,
          maxTotal: 100,
          grade: 'A',
          highest: 90,
          teacherNote: 'Keeps good map pointing records and neat notes.',
        },
        {
          id: '5',
          name: 'Hindi Language',
          code: 'HIN-405',
          icon: 'feather-alt',
          iconType: 'fa5',
          color: '#EC4899',
          bg: '#FDF2F8',
          theory: 74,
          maxTheory: 80,
          practical: 19,
          maxPractical: 20,
          total: 93,
          maxTotal: 100,
          grade: 'A+',
          highest: 95,
          teacherNote: 'Very neat handwriting and accurate Hindi grammar.',
        },
      ],
      coScholastic: [
        { activity: 'Art & Craft', grade: 'A+', remark: 'Very creative' },
        { activity: 'Physical Education & Yoga', grade: 'A', remark: 'Active participant' },
        { activity: 'Discipline & Conduct', grade: 'A+', remark: 'Polite and helpful' },
        { activity: 'Computer Science', grade: 'A+', remark: 'Mastered Scratch basics' },
      ],
    },
    'Term 2': {
      title: 'Term 2 Mid-Terms 2026-27',
      conductedOn: 'December 2026',
      totalMaxMarks: 500,
      totalObtainedMarks: 442,
      percentage: '88.4%',
      grade: 'A',
      rankInClass: '4th',
      totalStudents: 38,
      attendanceScore: '94%',
      remark: 'Very good grasp of mid-term concepts, keep up the effort in Social Science.',
      subjects: [
        {
          id: '1',
          name: 'Mathematics',
          code: 'MTH-401',
          icon: 'calculator',
          iconType: 'fa5',
          color: '#3B82F6',
          bg: '#EFF6FF',
          theory: 73,
          maxTheory: 80,
          practical: 19,
          maxPractical: 20,
          total: 92,
          maxTotal: 100,
          grade: 'A+',
          highest: 97,
          teacherNote: 'Quick problem solver.',
        },
        {
          id: '2',
          name: 'English Language',
          code: 'ENG-402',
          icon: 'book-reader',
          iconType: 'fa5',
          color: '#8B5CF6',
          bg: '#F5F3FF',
          theory: 70,
          maxTheory: 80,
          practical: 18,
          maxPractical: 20,
          total: 88,
          maxTotal: 100,
          grade: 'A',
          highest: 92,
          teacherNote: 'Active participation in recitation.',
        },
        {
          id: '3',
          name: 'Science & EVS',
          code: 'SCI-403',
          icon: 'flask',
          iconType: 'fa5',
          color: '#10B981',
          bg: '#ECFDF5',
          theory: 71,
          maxTheory: 80,
          practical: 18,
          maxPractical: 20,
          total: 89,
          maxTotal: 100,
          grade: 'A',
          highest: 93,
          teacherNote: 'Great curiosity during lab sessions.',
        },
        {
          id: '4',
          name: 'Social Studies',
          code: 'SST-404',
          icon: 'globe-americas',
          iconType: 'fa5',
          color: '#F59E0B',
          bg: '#FEF3C7',
          theory: 66,
          maxTheory: 80,
          practical: 18,
          maxPractical: 20,
          total: 84,
          maxTotal: 100,
          grade: 'A',
          highest: 91,
          teacherNote: 'Good understanding of Indian history chapters.',
        },
        {
          id: '5',
          name: 'Hindi Language',
          code: 'HIN-405',
          icon: 'feather-alt',
          iconType: 'fa5',
          color: '#EC4899',
          bg: '#FDF2F8',
          theory: 71,
          maxTheory: 80,
          practical: 18,
          maxPractical: 20,
          total: 89,
          maxTotal: 100,
          grade: 'A',
          highest: 94,
          teacherNote: 'Fluency in speech is commendable.',
        },
      ],
      coScholastic: [
        { activity: 'Art & Craft', grade: 'A', remark: 'Good illustrations' },
        { activity: 'Physical Education & Yoga', grade: 'A+', remark: 'Winner in inter-house sprint' },
        { activity: 'Discipline & Conduct', grade: 'A+', remark: 'Well behaved' },
        { activity: 'Computer Science', grade: 'A', remark: 'Good typing pace' },
      ],
    },
    'Annual Final': {
      title: 'Annual Final Exams (Upcoming)',
      conductedOn: 'March 2027',
      totalMaxMarks: 500,
      totalObtainedMarks: 0,
      percentage: 'Pending',
      grade: 'TBD',
      rankInClass: '—',
      totalStudents: 38,
      attendanceScore: '95%',
      remark: 'Scheduled for March 2027. Syllabus and study tips available in Exam Schedule tab.',
      subjects: [],
      coScholastic: [],
    },
  };

  const currentData = performanceData[selectedTerm] || performanceData['Term 1'];

  const handleShareReport = async () => {
    try {
      await Share.share({
        message: `Kids' Dream English School - Report Card\nStudent: ${student.name} (${student.class})\nExam: ${currentData.title}\nPercentage: ${currentData.percentage} (Grade: ${currentData.grade})\nRank: ${currentData.rankInClass} in Class!`,
      });
    } catch (err) {
      // Ignored
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <LinearGradient
        colors={['#6C63FF', '#4F46E5']}
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
            <Text style={styles.headerTitle}>Student Marksheet</Text>
            <Text style={styles.headerSubtitle}>Academic Year 2026 - 2027</Text>
          </View>
          <TouchableOpacity
            style={styles.headerActionBtn}
            onPress={handleShareReport}
            activeOpacity={0.7}
          >
            <Feather name="share-2" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Student Mini Chip */}
        <View style={styles.studentChip}>
          <View style={styles.studentAvatar}>
            <Text style={styles.studentAvatarText}>
              {student.name.charAt(0)}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.studentNameText}>{student.name}</Text>
            <Text style={styles.studentMetaText}>
              {student.class} • Roll No: {student.rollNo} • Adm: {student.admissionNo}
            </Text>
          </View>
          <View style={styles.boardBadge}>
            <Text style={styles.boardBadgeText}>CBSE</Text>
          </View>
        </View>

        {/* Term Tabs */}
        <View style={styles.termTabsContainer}>
          {terms.map((term) => {
            const isSelected = selectedTerm === term;
            return (
              <TouchableOpacity
                key={term}
                style={[styles.termTab, isSelected && styles.termTabActive]}
                onPress={() => setSelectedTerm(term)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.termTabText,
                    isSelected && styles.termTabTextActive,
                  ]}
                >
                  {term}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {selectedTerm === 'Annual Final' ? (
          <View style={styles.emptyStateCard}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="calendar-outline" size={38} color="#6C63FF" />
            </View>
            <Text style={styles.emptyTitle}>Final Exams are Upcoming</Text>
            <Text style={styles.emptyDesc}>
              Annual examinations are slated for March 2027. You can view the full timetable and datesheet in the Exam Schedule section.
            </Text>
          </View>
        ) : (
          <>
            {/* Grand Overall Performance Card */}
            <View style={styles.performanceCard}>
              <View style={styles.performanceCardTop}>
                <View>
                  <Text style={styles.scoreLabel}>OVERALL RESULT</Text>
                  <View style={styles.scoreRow}>
                    <Text style={styles.scoreValue}>{currentData.percentage}</Text>
                    <View style={styles.gradePill}>
                      <Text style={styles.gradePillText}>Grade {currentData.grade}</Text>
                    </View>
                  </View>
                  <Text style={styles.scoreTotalText}>
                    Obtained {currentData.totalObtainedMarks} / {currentData.totalMaxMarks} Marks
                  </Text>
                </View>

                {/* Circular badge for Rank */}
                <View style={styles.rankBadge}>
                  <FontAwesome5 name="trophy" size={20} color="#F59E0B" />
                  <Text style={styles.rankNum}>{currentData.rankInClass}</Text>
                  <Text style={styles.rankLabel}>Rank</Text>
                </View>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressBarWrapper}>
                <View style={styles.progressBarBg}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${parseFloat(currentData.percentage)}%` },
                    ]}
                  />
                </View>
              </View>

              {/* Stats Highlights */}
              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statBoxNum}>{currentData.totalStudents}</Text>
                  <Text style={styles.statBoxLabel}>Class Strength</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statBox}>
                  <Text style={[styles.statBoxNum, { color: '#10B981' }]}>
                    {currentData.attendanceScore}
                  </Text>
                  <Text style={styles.statBoxLabel}>Attendance</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statBox}>
                  <Text style={[styles.statBoxNum, { color: '#6C63FF' }]}>PASS</Text>
                  <Text style={styles.statBoxLabel}>Status</Text>
                </View>
              </View>
            </View>

            {/* Principal / Class Teacher Remark */}
            <View style={styles.remarkCard}>
              <View style={styles.remarkIcon}>
                <Feather name="message-square" size={16} color="#6C63FF" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.remarkTitle}>Teacher's Assessment Note</Text>
                <Text style={styles.remarkText}>{currentData.remark}</Text>
              </View>
            </View>

            {/* Subject-Wise Performance Title */}
            <View style={styles.sectionHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.sectionTitle}>Subject Scores</Text>
                <View style={styles.badgeCount}>
                  <Text style={styles.badgeCountText}>
                    {currentData.subjects.length} Subjects
                  </Text>
                </View>
              </View>

              <View style={styles.switchTabs}>
                <TouchableOpacity
                  style={[
                    styles.switchTab,
                    activeTab === 'summary' && styles.switchTabActive,
                  ]}
                  onPress={() => setActiveTab('summary')}
                >
                  <Text
                    style={[
                      styles.switchTabText,
                      activeTab === 'summary' && styles.switchTabTextActive,
                    ]}
                  >
                    Scores
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.switchTab,
                    activeTab === 'detailed' && styles.switchTabActive,
                  ]}
                  onPress={() => setActiveTab('detailed')}
                >
                  <Text
                    style={[
                      styles.switchTabText,
                      activeTab === 'detailed' && styles.switchTabTextActive,
                    ]}
                  >
                    Details
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Subject List */}
            {currentData.subjects.map((sub) => {
              const percentage = Math.round((sub.total / sub.maxTotal) * 100);
              return (
                <View key={sub.id} style={styles.subjectCard}>
                  <View style={styles.subjectTop}>
                    <View
                      style={[
                        styles.subjectIconBox,
                        { backgroundColor: sub.bg },
                      ]}
                    >
                      <FontAwesome5
                        name={sub.icon}
                        size={18}
                        color={sub.color}
                      />
                    </View>
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <Text style={styles.subjectName}>{sub.name}</Text>
                      <Text style={styles.subjectCode}>{sub.code}</Text>
                    </View>

                    {/* Score badge */}
                    <View style={styles.subjectScoreBox}>
                      <Text style={styles.subjectTotalScore}>{sub.total}</Text>
                      <Text style={styles.subjectMaxScore}>/{sub.maxTotal}</Text>
                    </View>
                    <View
                      style={[
                        styles.subjectGradeBadge,
                        { backgroundColor: sub.color + '18' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.subjectGradeText,
                          { color: sub.color },
                        ]}
                      >
                        {sub.grade}
                      </Text>
                    </View>
                  </View>

                  {/* Visual Bar Indicator */}
                  <View style={styles.subjectBarBg}>
                    <View
                      style={[
                        styles.subjectBarFill,
                        {
                          width: `${percentage}%`,
                          backgroundColor: sub.color,
                        },
                      ]}
                    />
                  </View>

                  {/* Breakdown if detailed tab active */}
                  {activeTab === 'detailed' ? (
                    <View style={styles.breakdownBox}>
                      <View style={styles.breakdownItem}>
                        <Text style={styles.breakdownLabel}>Theory</Text>
                        <Text style={styles.breakdownValue}>
                          {sub.theory} / {sub.maxTheory}
                        </Text>
                      </View>
                      <View style={styles.breakdownItem}>
                        <Text style={styles.breakdownLabel}>Internal / Pract</Text>
                        <Text style={styles.breakdownValue}>
                          {sub.practical} / {sub.maxPractical}
                        </Text>
                      </View>
                      <View style={styles.breakdownItem}>
                        <Text style={styles.breakdownLabel}>Class Highest</Text>
                        <Text style={[styles.breakdownValue, { color: '#10B981' }]}>
                          {sub.highest}
                        </Text>
                      </View>
                    </View>
                  ) : null}

                  <View style={styles.teacherNoteRow}>
                    <Feather name="info" size={13} color="#9CA3AF" />
                    <Text style={styles.teacherNoteText}>{sub.teacherNote}</Text>
                  </View>
                </View>
              );
            })}

            {/* Co-Scholastic & Life Skills */}
            <View style={[styles.sectionHeader, { marginTop: 14 }]}>
              <Text style={styles.sectionTitle}>Co-Scholastic & Activities</Text>
            </View>

            <View style={styles.coScholasticCard}>
              {currentData.coScholastic.map((item, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.coScholasticRow,
                    idx < currentData.coScholastic.length - 1 && styles.borderBottom,
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.coScholasticName}>{item.activity}</Text>
                    <Text style={styles.coScholasticRemark}>{item.remark}</Text>
                  </View>
                  <View style={styles.coGradeChip}>
                    <Text style={styles.coGradeText}>{item.grade}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Official Seal / Download PDF Bar */}
            <View style={styles.downloadCard}>
              <View style={styles.downloadCardContent}>
                <MaterialCommunityIcons
                  name="file-pdf-box"
                  size={38}
                  color="#EF4444"
                />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.downloadTitle}>
                    Download Verified Marksheet PDF
                  </Text>
                  <Text style={styles.downloadSub}>
                    Signed with digital school seal & QR code verification
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.downloadButton}
                activeOpacity={0.8}
                onPress={handleShareReport}
              >
                <Feather name="download" size={16} color="#FFFFFF" />
                <Text style={styles.downloadBtnText}>Save Report PDF</Text>
              </TouchableOpacity>
            </View>
          </>
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
    marginBottom: 14,
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
    letterSpacing: 0.3,
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
  studentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 10,
    marginBottom: 14,
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
  studentAvatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6C63FF',
  },
  studentNameText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  studentMetaText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 1,
  },
  boardBadge: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  boardBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  termTabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
    borderRadius: 12,
    padding: 3,
  },
  termTab: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 9,
  },
  termTabActive: {
    backgroundColor: '#FFFFFF',
  },
  termTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.85)',
  },
  termTabTextActive: {
    color: '#4F46E5',
    fontWeight: '700',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 36,
  },
  performanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  performanceCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  scoreLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.8,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E293B',
  },
  gradePill: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginLeft: 10,
  },
  gradePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
  },
  scoreTotalText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  rankBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  rankNum: {
    fontSize: 18,
    fontWeight: '800',
    color: '#92400E',
    marginTop: 2,
  },
  rankLabel: {
    fontSize: 10,
    color: '#B45309',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  progressBarWrapper: {
    marginTop: 14,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6C63FF',
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statBoxNum: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  statBoxLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },
  remarkCard: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    alignItems: 'flex-start',
  },
  remarkIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  remarkTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 2,
  },
  remarkText: {
    fontSize: 12,
    color: '#3B82F6',
    lineHeight: 17,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
  },
  badgeCount: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  badgeCountText: {
    fontSize: 11,
    color: '#6C63FF',
    fontWeight: '700',
  },
  switchTabs: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 8,
    padding: 2,
  },
  switchTab: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  switchTabActive: {
    backgroundColor: '#FFFFFF',
  },
  switchTabText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  switchTabTextActive: {
    color: '#1E293B',
    fontWeight: '700',
  },
  subjectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  subjectTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  subjectCode: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  subjectScoreBox: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginRight: 10,
  },
  subjectTotalScore: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E293B',
  },
  subjectMaxScore: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  subjectGradeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  subjectGradeText: {
    fontSize: 13,
    fontWeight: '800',
  },
  subjectBarBg: {
    height: 5,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    marginTop: 10,
    overflow: 'hidden',
  },
  subjectBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  breakdownBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  breakdownItem: {
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: 10,
    color: '#64748B',
  },
  breakdownValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 2,
  },
  teacherNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  teacherNoteText: {
    fontSize: 11,
    color: '#64748B',
    marginLeft: 6,
    fontStyle: 'italic',
  },
  coScholasticCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  coScholasticRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  coScholasticName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  coScholasticRemark: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  coGradeChip: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  coGradeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
  },
  downloadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
  },
  downloadCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  downloadTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  downloadSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6C63FF',
    borderRadius: 10,
    paddingVertical: 10,
  },
  downloadBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  emptyStateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: 10,
  },
  emptyIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  },
});
