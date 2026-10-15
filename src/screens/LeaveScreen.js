import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
  Modal,
} from 'react-native';
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function LeaveScreen({ onBack }) {
  const [tab, setTab] = useState('apply'); // 'apply' | 'history'
  const [leaveType, setLeaveType] = useState('CL'); // 'CL' | 'SL'
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState(null);

  // Leave balances without Earned Leave (only CL and SL)
  const [leaveBalances, setLeaveBalances] = useState([
    { type: 'Casual Leave (CL)', key: 'CL', available: 5, total: 12, color: '#6366F1', bg: '#EEF2FF', icon: 'coffee' },
    { type: 'Sick Leave (SL)', key: 'SL', available: 4, total: 10, color: '#10B981', bg: '#ECFDF5', icon: 'heart' },
  ]);

  const [leaveHistory, setLeaveHistory] = useState([
    {
      id: '1',
      type: 'Casual Leave (CL)',
      dates: '23 Sep 2026 - 24 Sep 2026',
      days: '2 Days',
      reason: 'Family function in hometown',
      status: 'Approved',
      appliedOn: '21 Sep 2026',
    },
    {
      id: '2',
      type: 'Sick Leave (SL)',
      dates: '12 Aug 2026',
      days: '1 Day',
      reason: 'Fever and severe cold with medical slip',
      status: 'Approved',
      appliedOn: '11 Aug 2026',
    },
  ]);

  const handleApply = () => {
    if (!startDate.trim()) {
      Alert.alert('Required Field', 'Please enter a Start Date (e.g. 10/10/2026)');
      return;
    }
    if (!reason.trim()) {
      Alert.alert('Required Field', 'Please provide a reason for your leave application.');
      return;
    }

    const currentBal = leaveBalances.find((b) => b.key === leaveType);
    if (currentBal && currentBal.available <= 0) {
      Alert.alert('Quota Exhausted', `You have 0 ${currentBal.type} left in your balance.`);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const daysCount = endDate.trim() ? '2 Days' : '1 Day';
      const formattedDate = endDate.trim() ? `${startDate} - ${endDate}` : startDate;
      const typeLabel = leaveType === 'CL' ? 'Casual Leave (CL)' : 'Sick Leave (SL)';

      const newEntry = {
        id: Date.now().toString(),
        type: typeLabel,
        dates: formattedDate,
        days: daysCount,
        reason: reason.trim(),
        status: 'Pending Approval',
        appliedOn: 'Today, ' + new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
      };

      // Add to history
      setLeaveHistory([newEntry, ...leaveHistory]);

      // Deduct balance
      setLeaveBalances((prev) =>
        prev.map((b) => (b.key === leaveType ? { ...b, available: Math.max(0, b.available - 1) } : b))
      );

      setLastSubmitted(newEntry);
      setSuccessModalVisible(true);

      // Clear form
      setStartDate('');
      setEndDate('');
      setReason('');
    }, 600);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={onBack}>
          <Feather name="chevron-left" size={24} color="#1E1B4B" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Leave Application</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabBtn, tab === 'apply' ? styles.tabBtnActive : styles.tabBtnInactive]}
          activeOpacity={0.8}
          onPress={() => setTab('apply')}
        >
          <Text style={[styles.tabText, tab === 'apply' ? styles.tabTextActive : styles.tabTextInactive]}>
            Apply Leave
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, tab === 'history' ? styles.tabBtnActive : styles.tabBtnInactive]}
          activeOpacity={0.8}
          onPress={() => setTab('history')}
        >
          <Text style={[styles.tabText, tab === 'history' ? styles.tabTextActive : styles.tabTextInactive]}>
            Leave History ({leaveHistory.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Leave Balance Cards Row (Only 2 cards: CL and SL) */}
        <View style={styles.balanceRow}>
          {leaveBalances.map((b) => (
            <View key={b.key} style={[styles.balanceCard, { backgroundColor: b.bg }]}>
              <View style={styles.balanceHeader}>
                <Feather name={b.icon} size={16} color={b.color} />
                <Text style={[styles.balanceCount, { color: b.color }]}>{b.available}</Text>
              </View>
              <Text style={styles.balanceType}>{b.type.split(' ')[0]} Leave</Text>
              <Text style={styles.balanceSub}>Available of {b.total} Total</Text>
            </View>
          ))}
        </View>

        {tab === 'apply' ? (
          /* Apply Form */
          <View style={styles.formCard}>
            <View style={styles.formTitleRow}>
              <Text style={styles.formSectionTitle}>Fill Leave Request</Text>
              <View style={styles.activeFormBadge}>
                <View style={styles.pulseDot} />
                <Text style={styles.activeFormBadgeText}>Active Form</Text>
              </View>
            </View>

            {/* Leave Type Selector (Only Casual and Sick) */}
            <Text style={styles.inputLabel}>Select Leave Type</Text>
            <View style={styles.typeSelectorRow}>
              <TouchableOpacity
                style={[styles.typeBtn, leaveType === 'CL' && styles.typeBtnActive]}
                activeOpacity={0.8}
                onPress={() => setLeaveType('CL')}
              >
                <Ionicons
                  name="cafe"
                  size={16}
                  color={leaveType === 'CL' ? '#FFFFFF' : '#6366F1'}
                  style={{ marginRight: 6 }}
                />
                <Text style={[styles.typeBtnText, leaveType === 'CL' && styles.typeBtnTextActive]}>
                  Casual Leave (CL)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.typeBtn, leaveType === 'SL' && styles.typeBtnActive]}
                activeOpacity={0.8}
                onPress={() => setLeaveType('SL')}
              >
                <Ionicons
                  name="medkit"
                  size={16}
                  color={leaveType === 'SL' ? '#FFFFFF' : '#10B981'}
                  style={{ marginRight: 6 }}
                />
                <Text style={[styles.typeBtnText, leaveType === 'SL' && styles.typeBtnTextActive]}>
                  Sick Leave (SL)
                </Text>
              </TouchableOpacity>
            </View>

            {/* Dates Inputs */}
            <Text style={styles.inputLabel}>Start Date *</Text>
            <View style={styles.inputBox}>
              <Feather name="calendar" size={18} color="#6366F1" style={{ marginRight: 10 }} />
              <TextInput
                placeholder="e.g. 10/10/2026"
                placeholderTextColor="#94A3B8"
                value={startDate}
                onChangeText={setStartDate}
                style={styles.textInput}
              />
            </View>

            <Text style={styles.inputLabel}>End Date (Optional for multiple days)</Text>
            <View style={styles.inputBox}>
              <Feather name="calendar" size={18} color="#6366F1" style={{ marginRight: 10 }} />
              <TextInput
                placeholder="e.g. 12/10/2026"
                placeholderTextColor="#94A3B8"
                value={endDate}
                onChangeText={setEndDate}
                style={styles.textInput}
              />
            </View>

            {/* Reason Input */}
            <Text style={styles.inputLabel}>Reason for Leave *</Text>
            <View style={[styles.inputBox, styles.textAreaBox]}>
              <TextInput
                placeholder="Enter detailed reason for leave application..."
                placeholderTextColor="#94A3B8"
                multiline
                numberOfLines={3}
                value={reason}
                onChangeText={setReason}
                style={styles.textArea}
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleApply}
              disabled={isSubmitting}
              style={styles.submitButtonContainer}
            >
              <LinearGradient
                colors={['#6366F1', '#4F46E5']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.submitGradient}
              >
                <Text style={styles.submitBtnText}>
                  {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                </Text>
                <Feather name="arrow-right" size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          /* Leave History List */
          <View style={styles.historySection}>
            {leaveHistory.map((item) => (
              <View key={item.id} style={styles.leaveHistoryCard}>
                <View style={styles.leaveHistoryHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.leaveHistoryType}>{item.type}</Text>
                    <Text style={styles.leaveHistoryDates}>
                      {item.dates} • <Text style={{ fontWeight: '800' }}>{item.days}</Text>
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      item.status === 'Approved'
                        ? styles.statusApproved
                        : item.status === 'Pending Approval'
                        ? styles.statusPending
                        : styles.statusRejected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusBadgeText,
                        item.status === 'Approved'
                          ? styles.statusApprovedText
                          : item.status === 'Pending Approval'
                          ? styles.statusPendingText
                          : styles.statusRejectedText,
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>

                <Text style={styles.leaveReasonText}>
                  <Text style={{ fontWeight: '700', color: '#4B5563' }}>Reason: </Text>
                  {item.reason}
                </Text>

                {item.appliedOn && (
                  <Text style={styles.appliedOnText}>Applied: {item.appliedOn}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Success Modal */}
      <Modal visible={successModalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.successIconCircle}>
              <Ionicons name="checkmark-done" size={36} color="#10B981" />
            </View>
            <Text style={styles.modalTitle}>Leave Submitted!</Text>
            <Text style={styles.modalSubtitle}>
              Your request for <Text style={{ fontWeight: '800', color: '#1E1B4B' }}>{lastSubmitted?.type}</Text> on {lastSubmitted?.dates} has been recorded and forwarded to the Principal for approval.
            </Text>

            <TouchableOpacity
              style={styles.modalCloseBtn}
              activeOpacity={0.8}
              onPress={() => {
                setSuccessModalVisible(false);
                setTab('history');
              }}
            >
              <Text style={styles.modalCloseBtnText}>View in History</Text>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },
  balanceCard: {
    flex: 1,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EDE9FE',
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  balanceCount: {
    fontSize: 24,
    fontWeight: '900',
  },
  balanceType: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E1B4B',
    marginTop: 2,
  },
  balanceSub: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
    marginTop: 2,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EDE9FE',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  formTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  formSectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E1B4B',
  },
  activeFormBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 5,
  },
  activeFormBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4B5563',
    marginBottom: 8,
  },
  typeSelectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  typeBtn: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  typeBtnActive: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  typeBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#4B5563',
  },
  typeBtnTextActive: {
    color: '#FFFFFF',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 14,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
  },
  textAreaBox: {
    height: 85,
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  textArea: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
    textAlignVertical: 'top',
  },
  submitButtonContainer: {
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 6,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  submitGradient: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  historySection: {
    width: '100%',
  },
  leaveHistoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EDE9FE',
  },
  leaveHistoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  leaveHistoryType: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1F2937',
  },
  leaveHistoryDates: {
    fontSize: 12,
    color: '#6366F1',
    fontWeight: '600',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusApproved: {
    backgroundColor: '#ECFDF5',
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
  },
  statusRejected: {
    backgroundColor: '#FEF2F2',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusApprovedText: {
    color: '#059669',
  },
  statusPendingText: {
    color: '#D97706',
  },
  statusRejectedText: {
    color: '#EF4444',
  },
  leaveReasonText: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
    marginTop: 4,
  },
  appliedOnText: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 6,
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
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  successIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  modalCloseBtn: {
    width: '100%',
    backgroundColor: '#6366F1',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  modalCloseBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
