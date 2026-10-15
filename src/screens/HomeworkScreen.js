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
  Modal,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeworkScreen({
  onBack,
  student = {
    name: 'Aarav Sharma',
    class: 'Class 4 - B',
    rollNo: '14',
    admissionNo: 'KD-2023-042',
  },
}) {
  const [activeFilter, setActiveFilter] = useState('pending'); // 'all' | 'pending' | 'submitted' | 'evaluated'
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [submissionModalVisible, setSubmissionModalVisible] = useState(false);
  const [submissionNotes, setSubmissionNotes] = useState('');

  const [homeworkList, setHomeworkList] = useState([
    {
      id: 'hw-1',
      subject: 'Mathematics',
      code: 'MTH-401',
      teacher: 'Rohit Kumar Sir',
      assignedDate: '13 Oct 2026',
      dueDate: '16 Oct 2026',
      dueDaysText: 'Due in 2 Days',
      status: 'pending', // 'pending' | 'submitted' | 'evaluated'
      title: 'Fractions & Word Problems Exercise 4.3',
      description: 'Solve Questions 1 to 15 from Chapter 4 in class notebook. Make sure to draw neat fraction diagrams for Q7 and Q8.',
      attachments: ['Exercise_4.3_Fractions.pdf (1.2 MB)', 'Hints_Geometry.jpg'],
      color: '#3B82F6',
      icon: 'calculator',
      points: '10 Marks',
      teacherFeedback: null,
    },
    {
      id: 'hw-2',
      subject: 'Science & EVS',
      code: 'SCI-403',
      teacher: 'Mrs. Anjali Gupta',
      assignedDate: '12 Oct 2026',
      dueDate: '15 Oct 2026',
      dueDaysText: 'Due Tomorrow',
      status: 'pending',
      title: 'Human Digestive System Model & Chart',
      description: 'Draw and label the human digestive system on an A4 pastel sheet. Color the liver, stomach and intestines with designated colors.',
      attachments: ['Digestive_System_Diagram.pdf'],
      color: '#10B981',
      icon: 'flask',
      points: '15 Marks',
      teacherFeedback: null,
    },
    {
      id: 'hw-3',
      subject: 'English Language',
      code: 'ENG-402',
      teacher: 'Ms. Priya Menon',
      assignedDate: '10 Oct 2026',
      dueDate: '13 Oct 2026',
      dueDaysText: 'Submitted on 13 Oct',
      status: 'submitted',
      title: 'Creative Essay: "A Day in a Wildlife Sanctuary"',
      description: 'Write a 150-200 word essay covering animals seen, bird sanctuary rules, and preservation of nature.',
      attachments: ['Essay_Guidelines.docx'],
      color: '#8B5CF6',
      icon: 'book-reader',
      points: '10 Marks',
      teacherFeedback: 'Submission received on time. Teacher evaluation in progress.',
    },
    {
      id: 'hw-4',
      subject: 'Social Studies',
      code: 'SST-404',
      teacher: 'Mr. Arvind Saxena',
      assignedDate: '07 Oct 2026',
      dueDate: '10 Oct 2026',
      dueDaysText: 'Evaluated',
      status: 'evaluated',
      title: 'Map Pointing: Northern Mountains of India',
      description: 'Locate and label Himalaya ranges, K2, Mount Everest, and major Himalayan rivers on physical outline map of India.',
      attachments: ['India_Outline_Map.pdf'],
      color: '#F59E0B',
      icon: 'globe-americas',
      points: '10/10 Marks',
      teacherFeedback: 'Outstanding map work! Accurate labeling and very neat coloring.',
    },
    {
      id: 'hw-5',
      subject: 'Hindi Vyakaran',
      code: 'HIN-405',
      teacher: 'Smt. Kamla Joshi',
      assignedDate: '06 Oct 2026',
      dueDate: '09 Oct 2026',
      dueDaysText: 'Evaluated',
      status: 'evaluated',
      title: 'Sangya Aur Bhed - Abhyas Patra',
      description: 'Pathya pustak se 20 sangya shabd chhaant kar unke bhed (Vyakti-vachak, Jati-vachak, Bhav-vachak) likhiye.',
      attachments: ['Abhyas_Patra_Sangya.pdf'],
      color: '#EC4899',
      icon: 'feather-alt',
      points: '9/10 Marks',
      teacherFeedback: 'Shuddh vartani aur sundar hast lekhan.',
    },
  ]);

  const filteredList = homeworkList.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.status === activeFilter;
  });

  const pendingCount = homeworkList.filter((h) => h.status === 'pending').length;
  const submittedCount = homeworkList.filter((h) => h.status === 'submitted').length;
  const evaluatedCount = homeworkList.filter((h) => h.status === 'evaluated').length;

  const handleOpenSubmit = (hw) => {
    setSelectedHomework(hw);
    setSubmissionNotes('');
    setSubmissionModalVisible(true);
  };

  const handleConfirmSubmit = () => {
    if (!selectedHomework) return;
    setHomeworkList((prev) =>
      prev.map((h) =>
        h.id === selectedHomework.id
          ? {
              ...h,
              status: 'submitted',
              dueDaysText: 'Submitted Just Now',
              teacherFeedback: 'Online response submitted. Under review by teacher.',
            }
          : h
      )
    );
    setSubmissionModalVisible(false);
    Alert.alert(
      'Homework Submitted!',
      `Assignment for "${selectedHomework.title}" has been successfully submitted to ${selectedHomework.teacher}.`,
      [{ text: 'Great' }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <LinearGradient
        colors={['#EC4899', '#DB2777']}
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
            <Text style={styles.headerTitle}>Daily Homework</Text>
            <Text style={styles.headerSubtitle}>Tasks, Assignments & Projects</Text>
          </View>
          <View style={styles.counterBadge}>
            <Text style={styles.counterBadgeText}>{pendingCount} Due</Text>
          </View>
        </View>

        {/* Student Bar */}
        <View style={styles.studentChip}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarChar}>{student.name.charAt(0)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.studentNameText}>{student.name}</Text>
            <Text style={styles.studentMetaText}>
              {student.class} • Roll No: {student.rollNo}
            </Text>
          </View>
          <View style={styles.statusPillTop}>
            <Text style={styles.statusPillTopText}>
              {evaluatedCount} Evaluated
            </Text>
          </View>
        </View>

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterScrollContent}
        >
          <TouchableOpacity
            style={[
              styles.filterPill,
              activeFilter === 'pending' && styles.filterPillActive,
            ]}
            onPress={() => setActiveFilter('pending')}
          >
            <Text
              style={[
                styles.filterPillText,
                activeFilter === 'pending' && styles.filterPillTextActive,
              ]}
            >
              Pending ({pendingCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterPill,
              activeFilter === 'submitted' && styles.filterPillActive,
            ]}
            onPress={() => setActiveFilter('submitted')}
          >
            <Text
              style={[
                styles.filterPillText,
                activeFilter === 'submitted' && styles.filterPillTextActive,
              ]}
            >
              Submitted ({submittedCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterPill,
              activeFilter === 'evaluated' && styles.filterPillActive,
            ]}
            onPress={() => setActiveFilter('evaluated')}
          >
            <Text
              style={[
                styles.filterPillText,
                activeFilter === 'evaluated' && styles.filterPillTextActive,
              ]}
            >
              Graded ({evaluatedCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterPill,
              activeFilter === 'all' && styles.filterPillActive,
            ]}
            onPress={() => setActiveFilter('all')}
          >
            <Text
              style={[
                styles.filterPillText,
                activeFilter === 'all' && styles.filterPillTextActive,
              ]}
            >
              All ({homeworkList.length})
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredList.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="checkmark-done-circle" size={48} color="#10B981" />
            <Text style={styles.emptyTitle}>All Caught Up!</Text>
            <Text style={styles.emptySub}>
              There are no {activeFilter} assignments for this filter.
            </Text>
          </View>
        ) : (
          filteredList.map((hw) => {
            const isPending = hw.status === 'pending';
            const isSubmitted = hw.status === 'submitted';
            const isEvaluated = hw.status === 'evaluated';

            return (
              <View key={hw.id} style={styles.hwCard}>
                {/* Top line with subject and status */}
                <View style={styles.cardHeader}>
                  <View style={styles.subjectBox}>
                    <View
                      style={[
                        styles.iconWrap,
                        { backgroundColor: hw.color + '18' },
                      ]}
                    >
                      <FontAwesome5
                        name={hw.icon}
                        size={14}
                        color={hw.color}
                      />
                    </View>
                    <View style={{ marginLeft: 8 }}>
                      <Text style={styles.subjectName}>{hw.subject}</Text>
                      <Text style={styles.teacherName}>By {hw.teacher}</Text>
                    </View>
                  </View>

                  {/* Status Tag */}
                  <View
                    style={[
                      styles.statusBadge,
                      isPending && styles.badgePending,
                      isSubmitted && styles.badgeSubmitted,
                      isEvaluated && styles.badgeEvaluated,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusBadgeText,
                        isPending && styles.textPending,
                        isSubmitted && styles.textSubmitted,
                        isEvaluated && styles.textEvaluated,
                      ]}
                    >
                      {isPending
                        ? 'Pending'
                        : isSubmitted
                        ? 'Submitted'
                        : 'Evaluated'}
                    </Text>
                  </View>
                </View>

                {/* Assignment Title & Body */}
                <Text style={styles.hwTitle}>{hw.title}</Text>
                <Text style={styles.hwDesc}>{hw.description}</Text>

                {/* Dates & Points Row */}
                <View style={styles.metaRow}>
                  <View style={styles.metaCol}>
                    <Text style={styles.metaLabel}>Assigned</Text>
                    <Text style={styles.metaVal}>{hw.assignedDate}</Text>
                  </View>
                  <View style={styles.metaDivider} />
                  <View style={styles.metaCol}>
                    <Text style={styles.metaLabel}>Submission Due</Text>
                    <Text
                      style={[
                        styles.metaVal,
                        isPending && { color: '#EF4444', fontWeight: '700' },
                      ]}
                    >
                      {hw.dueDate}
                    </Text>
                  </View>
                  <View style={styles.metaDivider} />
                  <View style={styles.metaCol}>
                    <Text style={styles.metaLabel}>Weightage</Text>
                    <Text
                      style={[
                        styles.metaVal,
                        isEvaluated && { color: '#10B981', fontWeight: '700' },
                      ]}
                    >
                      {hw.points}
                    </Text>
                  </View>
                </View>

                {/* Attachments Section */}
                {hw.attachments && hw.attachments.length > 0 && (
                  <View style={styles.attachSection}>
                    <Text style={styles.attachHeaderTitle}>Worksheet Material:</Text>
                    {hw.attachments.map((file, i) => (
                      <TouchableOpacity
                        key={i}
                        style={styles.attachFileItem}
                        activeOpacity={0.7}
                        onPress={() =>
                          Alert.alert('Opening Worksheet', `Downloading ${file} for offline viewing.`)
                        }
                      >
                        <Feather name="file" size={13} color="#6366F1" />
                        <Text style={styles.attachFileName}>{file}</Text>
                        <Feather name="download" size={13} color="#64748B" />
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                {/* Feedback if any */}
                {hw.teacherFeedback && (
                  <View style={styles.feedbackBox}>
                    <Feather name="message-circle" size={14} color="#10B981" />
                    <View style={{ flex: 1, marginLeft: 8 }}>
                      <Text style={styles.feedbackTitle}>Teacher Remarks:</Text>
                      <Text style={styles.feedbackBody}>{hw.teacherFeedback}</Text>
                    </View>
                  </View>
                )}

                {/* Bottom Action Button */}
                {isPending && (
                  <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={() => handleOpenSubmit(hw)}
                    activeOpacity={0.8}
                  >
                    <Feather name="upload" size={15} color="#FFFFFF" />
                    <Text style={styles.submitBtnText}>Upload & Submit Homework</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Submission Modal */}
      <Modal
        visible={submissionModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSubmissionModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Submit Homework</Text>
                <Text style={styles.modalSub}>{selectedHomework?.title}</Text>
              </View>
              <TouchableOpacity
                onPress={() => setSubmissionModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <Ionicons name="close" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Parent / Student Note:</Text>
            <TextInput
              style={styles.textInputArea}
              placeholder="E.g., Completed all questions with diagrams. Notebook pages attached."
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={4}
              value={submissionNotes}
              onChangeText={setSubmissionNotes}
            />

            <TouchableOpacity
              style={styles.uploadBox}
              activeOpacity={0.8}
              onPress={() =>
                Alert.alert('Upload Photo/PDF', 'Choose from Camera or Gallery to attach homework photos.')
              }
            >
              <Feather name="camera" size={22} color="#EC4899" />
              <Text style={styles.uploadBoxTitle}>Attach Photos of Notebook</Text>
              <Text style={styles.uploadBoxSub}>Camera or PDF file up to 10 MB</Text>
            </TouchableOpacity>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setSubmissionModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirmBtn}
                onPress={handleConfirmSubmit}
              >
                <Text style={styles.modalConfirmText}>Confirm Submit</Text>
              </TouchableOpacity>
            </View>
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
  counterBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  counterBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  studentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarChar: {
    fontSize: 16,
    fontWeight: '700',
    color: '#DB2777',
  },
  studentNameText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  studentMetaText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  statusPillTop: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusPillTopText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#DB2777',
  },
  filterScroll: {
    marginTop: 4,
  },
  filterScrollContent: {
    paddingRight: 12,
  },
  filterPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginRight: 8,
  },
  filterPillActive: {
    backgroundColor: '#FFFFFF',
  },
  filterPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  filterPillTextActive: {
    color: '#DB2777',
    fontWeight: '700',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 36,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: 20,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 10,
  },
  emptySub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  hwCard: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  teacherName: {
    fontSize: 10,
    color: '#94A3B8',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgePending: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  textPending: {
    color: '#D97706',
    fontSize: 10,
    fontWeight: '700',
  },
  badgeSubmitted: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  textSubmitted: {
    color: '#2563EB',
    fontSize: 10,
    fontWeight: '700',
  },
  badgeEvaluated: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  textEvaluated: {
    color: '#059669',
    fontSize: 10,
    fontWeight: '700',
  },
  hwTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    lineHeight: 19,
    marginBottom: 4,
  },
  hwDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
  },
  metaCol: {
    flex: 1,
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: 10,
    color: '#94A3B8',
  },
  metaVal: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 2,
  },
  metaDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#E2E8F0',
  },
  attachSection: {
    marginBottom: 10,
  },
  attachHeaderTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 4,
  },
  attachFileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 4,
  },
  attachFileName: {
    fontSize: 11,
    color: '#334155',
    flex: 1,
    marginLeft: 6,
  },
  feedbackBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F0FDF4',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    marginBottom: 10,
  },
  feedbackTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#166534',
  },
  feedbackBody: {
    fontSize: 11,
    color: '#15803D',
    marginTop: 1,
    lineHeight: 15,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EC4899',
    borderRadius: 10,
    paddingVertical: 9,
    marginTop: 4,
  },
  submitBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
  modalSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  modalCloseBtn: {
    padding: 4,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
  },
  textInputArea: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    padding: 12,
    fontSize: 13,
    color: '#1E293B',
    textAlignVertical: 'top',
    height: 80,
    marginBottom: 12,
  },
  uploadBox: {
    borderWidth: 2,
    borderColor: '#FCE7F3',
    borderStyle: 'dashed',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#FDF2F8',
    marginBottom: 18,
  },
  uploadBoxTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#DB2777',
    marginTop: 6,
  },
  uploadBoxSub: {
    fontSize: 11,
    color: '#9D174D',
    marginTop: 2,
  },
  modalActions: {
    flexDirection: 'row',
  },
  modalCancelBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
  },
  modalCancelText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  modalConfirmBtn: {
    flex: 2,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#EC4899',
  },
  modalConfirmText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
