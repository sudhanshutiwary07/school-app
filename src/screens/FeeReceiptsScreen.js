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

export default function FeeReceiptsScreen({
  onBack,
  student = {
    name: 'Aarav Sharma',
    class: 'Class 4 - B',
    rollNo: '14',
    admissionNo: 'KD-2023-042',
  },
}) {
  const [activeTab, setActiveTab] = useState('receipts'); // 'receipts' | 'due' | 'structure'

  const feeSummary = {
    totalYearlyFee: '₹ 48,000',
    paidAmount: '₹ 36,000',
    dueAmount: '₹ 12,000',
    nextDueDate: '10 Nov 2026',
    status: 'Partially Paid',
  };

  const receiptsList = [
    {
      id: 'rcpt-03',
      receiptNo: 'KD-RCP-2026-0891',
      title: 'Quarter 3 / Term 2 Tuition Fee',
      amount: '₹ 12,000',
      paidOn: '10 Oct 2026',
      mode: 'UPI / Razorpay (ID: pay_Okj897123)',
      status: 'Paid',
      color: '#10B981',
      period: 'Oct 2026 - Dec 2026',
      breakdown: [
        { item: 'Tuition & Academic Fee', amt: '₹ 8,500' },
        { item: 'Computer & Smart Lab', amt: '₹ 1,500' },
        { item: 'Activity & Sports Fund', amt: '₹ 2,000' },
      ],
    },
    {
      id: 'rcpt-02',
      receiptNo: 'KD-RCP-2026-0542',
      title: 'Quarter 2 / Mid-Term Fee',
      amount: '₹ 12,000',
      paidOn: '12 Jul 2026',
      mode: 'Net Banking (HDFC Bank)',
      status: 'Paid',
      color: '#10B981',
      period: 'Jul 2026 - Sep 2026',
      breakdown: [
        { item: 'Tuition Fee', amt: '₹ 8,500' },
        { item: 'Examination Fee Term 1', amt: '₹ 1,500' },
        { item: 'Development Charge', amt: '₹ 2,000' },
      ],
    },
    {
      id: 'rcpt-01',
      receiptNo: 'KD-RCP-2026-0112',
      title: 'Quarter 1 Admission & Session Fee',
      amount: '₹ 12,000',
      paidOn: '08 Apr 2026',
      mode: 'Debit Card (Visa ending in 4118)',
      status: 'Paid',
      color: '#10B981',
      period: 'Apr 2026 - Jun 2026',
      breakdown: [
        { item: 'Annual Session & Books Fund', amt: '₹ 5,000' },
        { item: 'Tuition Fee Q1', amt: '₹ 7,000' },
      ],
    },
  ];

  const dueFeesList = [
    {
      id: 'due-01',
      title: 'Quarter 4 / Final Term Tuition Fee',
      amount: '₹ 12,000',
      dueDate: '10 Nov 2026',
      lateFeeWarning: 'Late fine ₹50/day applicable after 15 Nov',
      period: 'Jan 2027 - Mar 2027',
      status: 'Upcoming Due',
      breakdown: [
        { item: 'Tuition Fee Q4', amt: '₹ 8,500' },
        { item: 'Annual Exam Fee', amt: '₹ 1,500' },
        { item: 'Annual Day & Function Fund', amt: '₹ 2,000' },
      ],
    },
  ];

  const handleDownloadPdf = (receiptNo) => {
    Alert.alert(
      'Receipt Downloaded',
      `Official fee receipt [${receiptNo}] has been saved as PDF with school digital seal.`,
      [{ text: 'OK' }]
    );
  };

  const handlePayNow = (dueItem) => {
    Alert.alert(
      'Proceed to Payment',
      `Initiating secure payment gateway for ${dueItem.title} (${dueItem.amount}).`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Pay with UPI / Card',
          onPress: () =>
            Alert.alert('Payment Demo', 'In real build, Razorpay checkout modal opens here.'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <LinearGradient
        colors={['#F59E0B', '#D97706']}
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
            <Text style={styles.headerTitle}>Fee Receipts & Dues</Text>
            <Text style={styles.headerSubtitle}>Session 2026 - 2027</Text>
          </View>
          <TouchableOpacity
            style={styles.headerActionBtn}
            onPress={() => handleDownloadPdf('ALL-STATEMENT')}
            activeOpacity={0.7}
          >
            <Feather name="printer" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Student Mini Chip */}
        <View style={styles.studentChip}>
          <View style={styles.studentAvatar}>
            <Text style={styles.studentInitial}>{student.name.charAt(0)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.studentNameText}>{student.name}</Text>
            <Text style={styles.studentMetaText}>
              {student.class} • Roll No: {student.rollNo} • Adm: {student.admissionNo}
            </Text>
          </View>
          <View style={styles.feeStatusBadge}>
            <Text style={styles.feeStatusText}>{feeSummary.status}</Text>
          </View>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'receipts' && styles.tabBtnActive]}
            onPress={() => setActiveTab('receipts')}
          >
            <Text
              style={[
                styles.tabBtnText,
                activeTab === 'receipts' && styles.tabBtnTextActive,
              ]}
            >
              Paid Receipts ({receiptsList.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'due' && styles.tabBtnActive]}
            onPress={() => setActiveTab('due')}
          >
            <Text
              style={[
                styles.tabBtnText,
                activeTab === 'due' && styles.tabBtnTextActive,
              ]}
            >
              Due & Pending ({dueFeesList.length})
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Financial Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>ACADEMIC YEAR OVERVIEW</Text>
            <Text style={styles.summaryYear}>2026 - 2027</Text>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryLabel}>Total Tuition</Text>
              <Text style={styles.summaryVal}>{feeSummary.totalYearlyFee}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryCol}>
              <Text style={styles.summaryLabel}>Total Paid</Text>
              <Text style={[styles.summaryVal, { color: '#10B981' }]}>
                {feeSummary.paidAmount}
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryCol}>
              <Text style={styles.summaryLabel}>Current Due</Text>
              <Text style={[styles.summaryVal, { color: '#EF4444' }]}>
                {feeSummary.dueAmount}
              </Text>
            </View>
          </View>

          {/* Mini progress bar of paid vs total */}
          <View style={styles.feeProgressBg}>
            <View style={[styles.feeProgressFill, { width: '75%' }]} />
          </View>
          <Text style={styles.feeProgressSub}>
            75% of yearly tuition fee cleared. Next installment due on {feeSummary.nextDueDate}.
          </Text>
        </View>

        {activeTab === 'receipts' ? (
          <>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Payment History & Receipts</Text>
              <Text style={styles.countText}>{receiptsList.length} Invoices</Text>
            </View>

            {receiptsList.map((rcpt) => (
              <View key={rcpt.id} style={styles.receiptCard}>
                <View style={styles.receiptTop}>
                  <View style={styles.receiptIconCircle}>
                    <FontAwesome5 name="receipt" size={16} color="#10B981" />
                  </View>
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.receiptTitle}>{rcpt.title}</Text>
                    <Text style={styles.receiptNo}>Receipt: {rcpt.receiptNo}</Text>
                  </View>
                  <View style={styles.paidChip}>
                    <Ionicons name="checkmark-circle" size={13} color="#10B981" />
                    <Text style={styles.paidChipText}>PAID</Text>
                  </View>
                </View>

                {/* Amount Highlight */}
                <View style={styles.amountHighlightRow}>
                  <View>
                    <Text style={styles.amtLabel}>Amount Cleared</Text>
                    <Text style={styles.amtValue}>{rcpt.amount}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.amtLabel}>Paid On</Text>
                    <Text style={styles.dateVal}>{rcpt.paidOn}</Text>
                  </View>
                </View>

                {/* Breakdown details */}
                <View style={styles.breakdownBox}>
                  {rcpt.breakdown.map((item, i) => (
                    <View key={i} style={styles.breakdownRow}>
                      <Text style={styles.breakdownItem}>{item.item}</Text>
                      <Text style={styles.breakdownAmt}>{item.amt}</Text>
                    </View>
                  ))}
                  <View style={styles.modeRow}>
                    <Feather name="credit-card" size={12} color="#64748B" />
                    <Text style={styles.modeText}>{rcpt.mode}</Text>
                  </View>
                </View>

                {/* Download PDF Action */}
                <TouchableOpacity
                  style={styles.downloadBtn}
                  onPress={() => handleDownloadPdf(rcpt.receiptNo)}
                  activeOpacity={0.8}
                >
                  <Feather name="download" size={14} color="#6C63FF" />
                  <Text style={styles.downloadBtnText}>Download Tax Invoice PDF</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        ) : (
          /* Due and Pending Fees */
          <>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Upcoming Installments</Text>
              <Text style={styles.countText}>1 Pending Due</Text>
            </View>

            {dueFeesList.map((due) => (
              <View key={due.id} style={styles.dueCard}>
                <View style={styles.dueTop}>
                  <View style={styles.dueIconCircle}>
                    <Ionicons name="alert-circle" size={20} color="#EF4444" />
                  </View>
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.dueTitle}>{due.title}</Text>
                    <Text style={styles.duePeriod}>{due.period}</Text>
                  </View>
                  <View style={styles.dueBadge}>
                    <Text style={styles.dueBadgeText}>DUE SOON</Text>
                  </View>
                </View>

                <View style={styles.dueAmountRow}>
                  <View>
                    <Text style={styles.dueAmtLabel}>Payable Total</Text>
                    <Text style={styles.dueAmtVal}>{due.amount}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.dueAmtLabel}>Due By</Text>
                    <Text style={styles.dueDateVal}>{due.dueDate}</Text>
                  </View>
                </View>

                <View style={styles.warningBox}>
                  <Feather name="info" size={12} color="#D97706" />
                  <Text style={styles.warningText}>{due.lateFeeWarning}</Text>
                </View>

                {/* Breakdown */}
                <View style={styles.breakdownBox}>
                  {due.breakdown.map((item, i) => (
                    <View key={i} style={styles.breakdownRow}>
                      <Text style={styles.breakdownItem}>{item.item}</Text>
                      <Text style={styles.breakdownAmt}>{item.amt}</Text>
                    </View>
                  ))}
                </View>

                {/* Pay Online Button */}
                <TouchableOpacity
                  style={styles.payNowBtn}
                  onPress={() => handlePayNow(due)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#10B981', '#059669']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.payGradient}
                  >
                    <Feather name="lock" size={15} color="#FFFFFF" />
                    <Text style={styles.payBtnText}>Pay {due.amount} Online</Text>
                    <Feather name="arrow-right" size={16} color="#FFFFFF" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ))}

            {/* Payment security info */}
            <View style={styles.securityCard}>
              <MaterialCommunityIcons
                name="shield-check"
                size={22}
                color="#6366F1"
              />
              <Text style={styles.securityText}>
                All fee payments are 256-bit encrypted via certified RBI compliant payment gateways. Instant digital receipt generated immediately.
              </Text>
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
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
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
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
  },
  studentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  studentInitial: {
    fontSize: 16,
    fontWeight: '700',
    color: '#D97706',
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
  feeStatusBadge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  feeStatusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#D97706',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
    borderRadius: 12,
    padding: 3,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 9,
  },
  tabBtnActive: {
    backgroundColor: '#FFFFFF',
  },
  tabBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.85)',
  },
  tabBtnTextActive: {
    color: '#B45309',
    fontWeight: '700',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 36,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.7,
  },
  summaryYear: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryCol: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  summaryVal: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 2,
  },
  summaryDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#E2E8F0',
  },
  feeProgressBg: {
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  feeProgressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  feeProgressSub: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
  },
  sectionHeaderRow: {
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
  countText: {
    fontSize: 11,
    color: '#64748B',
  },
  receiptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
  },
  receiptTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  receiptIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiptTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  receiptNo: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  paidChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  paidChipText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#10B981',
    marginLeft: 3,
  },
  amountHighlightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  amtLabel: {
    fontSize: 10,
    color: '#64748B',
  },
  amtValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#10B981',
    marginTop: 2,
  },
  dateVal: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 2,
  },
  breakdownBox: {
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    marginBottom: 10,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  breakdownItem: {
    fontSize: 11,
    color: '#64748B',
  },
  breakdownAmt: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E293B',
  },
  modeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  modeText: {
    fontSize: 10,
    color: '#64748B',
    marginLeft: 6,
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 10,
    paddingVertical: 9,
  },
  downloadBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C63FF',
    marginLeft: 6,
  },
  dueCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FECDD3',
    elevation: 2,
  },
  dueTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dueIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dueTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  duePeriod: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  dueBadge: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FECDD3',
  },
  dueBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#EF4444',
  },
  dueAmountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF1F2',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  dueAmtLabel: {
    fontSize: 10,
    color: '#9F1239',
  },
  dueAmtVal: {
    fontSize: 20,
    fontWeight: '800',
    color: '#BE123C',
    marginTop: 2,
  },
  dueDateVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#BE123C',
    marginTop: 2,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  warningText: {
    fontSize: 11,
    color: '#B45309',
    marginLeft: 6,
    fontWeight: '500',
  },
  payNowBtn: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 4,
  },
  payGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  payBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    marginHorizontal: 8,
  },
  securityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  securityText: {
    fontSize: 11,
    color: '#4338CA',
    lineHeight: 16,
    marginLeft: 10,
    flex: 1,
  },
});
