import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons, Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function PayslipScreen({ onBack }) {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [downloadingId, setDownloadingId] = useState(null);
  const [viewSlipModal, setViewSlipModal] = useState(null);
  const [downloadSuccessModal, setDownloadSuccessModal] = useState(null);

  const payslips = [
    {
      id: '1',
      month: 'September 2026',
      amount: '₹42,000',
      basic: '₹32,000',
      hra: '₹6,000',
      da: '₹4,000',
      pfDeduction: '₹1,800',
      taxDeduction: '₹500',
      netPayable: '₹39,700',
      paidDate: 'Paid on 30 Sep 2026',
      status: 'Paid',
      daysWorked: '26 Days',
      paymentMode: 'Bank Transfer (HDFC)',
      slipNo: 'BN-PAY-202609-042',
    },
    {
      id: '2',
      month: 'August 2026',
      amount: '₹42,000',
      basic: '₹32,000',
      hra: '₹6,000',
      da: '₹4,000',
      pfDeduction: '₹1,800',
      taxDeduction: '₹500',
      netPayable: '₹39,700',
      paidDate: 'Paid on 31 Aug 2026',
      status: 'Paid',
      daysWorked: '25 Days',
      paymentMode: 'Bank Transfer (HDFC)',
      slipNo: 'BN-PAY-202608-042',
    },
    {
      id: '3',
      month: 'July 2026',
      amount: '₹40,000',
      basic: '₹30,000',
      hra: '₹6,000',
      da: '₹4,000',
      pfDeduction: '₹1,800',
      taxDeduction: '₹400',
      netPayable: '₹37,800',
      paidDate: 'Paid on 31 Jul 2026',
      status: 'Paid',
      daysWorked: '26 Days',
      paymentMode: 'Bank Transfer (HDFC)',
      slipNo: 'BN-PAY-202607-042',
    },
    {
      id: '4',
      month: 'June 2026',
      amount: '₹40,000',
      basic: '₹30,000',
      hra: '₹6,000',
      da: '₹4,000',
      pfDeduction: '₹1,800',
      taxDeduction: '₹400',
      netPayable: '₹37,800',
      paidDate: 'Paid on 30 Jun 2026',
      status: 'Paid',
      daysWorked: '24 Days',
      paymentMode: 'Bank Transfer (HDFC)',
      slipNo: 'BN-PAY-202606-042',
    },
  ];

  const handleDownload = (item) => {
    setDownloadingId(item.id);

    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccessModal(item);
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={onBack}>
          <Feather name="chevron-left" size={24} color="#1E1B4B" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Salary & Payslips</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Summary Card */}
        <LinearGradient
          colors={['#1E1B4B', '#312E81']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.summaryCard}
        >
          <View style={styles.summaryTopRow}>
            <View>
              <Text style={styles.summaryPreText}>ANNUAL EARNINGS (FY 2026-27)</Text>
              <Text style={styles.summaryAmountText}>₹4,80,000</Text>
            </View>
            <View style={styles.statusVerifiedBadge}>
              <Ionicons name="shield-checkmark" size={14} color="#10B981" />
              <Text style={styles.statusVerifiedText}>Verified</Text>
            </View>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryFootRow}>
            <View style={styles.footCol}>
              <Text style={styles.footLabel}>Designation</Text>
              <Text style={styles.footVal}>Sr. Mathematics Teacher</Text>
            </View>
            <View style={styles.footCol}>
              <Text style={styles.footLabel}>Staff ID</Text>
              <Text style={styles.footVal}>TCH-2026-89</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Year Filter Row */}
        <View style={styles.yearRow}>
          <Text style={styles.sectionHeaderTitle}>Monthly Breakdown</Text>
          <View style={styles.yearDropdown}>
            <Feather name="calendar" size={14} color="#6366F1" style={{ marginRight: 6 }} />
            <Text style={styles.yearText}>Session {selectedYear}</Text>
          </View>
        </View>

        {/* Payslip Cards List */}
        {payslips.map((item) => {
          const isDownloading = downloadingId === item.id;

          return (
            <View key={item.id} style={styles.payslipCard}>
              <View style={styles.cardHeaderRow}>
                <View style={styles.monthLeft}>
                  <View style={styles.calendarIconBg}>
                    <FontAwesome5 name="file-invoice-dollar" size={16} color="#4F46E5" />
                  </View>
                  <View>
                    <Text style={styles.monthTitle}>{item.month}</Text>
                    <Text style={styles.slipSubNo}>{item.slipNo}</Text>
                  </View>
                </View>

                <View style={styles.paidBadge}>
                  <View style={styles.paidDot} />
                  <Text style={styles.paidBadgeText}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.cardBodyRow}>
                <View>
                  <Text style={styles.salaryAmount}>{item.amount}</Text>
                  <Text style={styles.paidDateText}>{item.paidDate}</Text>
                </View>

                <View style={styles.cardActions}>
                  {/* View Details Button */}
                  <TouchableOpacity
                    style={styles.viewBtn}
                    activeOpacity={0.8}
                    onPress={() => setViewSlipModal(item)}
                  >
                    <Feather name="eye" size={14} color="#4B5563" style={{ marginRight: 4 }} />
                    <Text style={styles.viewBtnText}>Details</Text>
                  </TouchableOpacity>

                  {/* Download Button */}
                  <TouchableOpacity
                    style={[styles.downloadBtn, isDownloading && styles.downloadBtnActive]}
                    activeOpacity={0.8}
                    disabled={isDownloading}
                    onPress={() => handleDownload(item)}
                  >
                    {isDownloading ? (
                      <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                      <>
                        <Feather name="download" size={14} color="#FFFFFF" style={{ marginRight: 5 }} />
                        <Text style={styles.downloadBtnText}>Download</Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Salary Breakdown Modal */}
      <Modal visible={!!viewSlipModal} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.detailModalCard}>
            <View style={styles.detailModalHeader}>
              <View>
                <Text style={styles.detailModalTitle}>Salary Slip Breakdown</Text>
                <Text style={styles.detailModalSub}>{viewSlipModal?.month} • {viewSlipModal?.slipNo}</Text>
              </View>
              <TouchableOpacity onPress={() => setViewSlipModal(null)} style={styles.closeCircle}>
                <Feather name="x" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 380, width: '100%' }}>
              <View style={styles.breakdownGroup}>
                <Text style={styles.breakdownHeader}>EARNINGS</Text>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownItemLabel}>Basic Salary</Text>
                  <Text style={styles.breakdownItemVal}>{viewSlipModal?.basic}</Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownItemLabel}>House Rent Allowance (HRA)</Text>
                  <Text style={styles.breakdownItemVal}>{viewSlipModal?.hra}</Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownItemLabel}>Dearness Allowance (DA)</Text>
                  <Text style={styles.breakdownItemVal}>{viewSlipModal?.da}</Text>
                </View>
              </View>

              <View style={styles.breakdownGroup}>
                <Text style={[styles.breakdownHeader, { color: '#EF4444' }]}>DEDUCTIONS</Text>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownItemLabel}>Provident Fund (PF)</Text>
                  <Text style={[styles.breakdownItemVal, { color: '#EF4444' }]}>-{viewSlipModal?.pfDeduction}</Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownItemLabel}>Professional Tax</Text>
                  <Text style={[styles.breakdownItemVal, { color: '#EF4444' }]}>-{viewSlipModal?.taxDeduction}</Text>
                </View>
              </View>

              <View style={styles.netTotalBox}>
                <Text style={styles.netTotalLabel}>NET PAYABLE SALARY</Text>
                <Text style={styles.netTotalVal}>{viewSlipModal?.netPayable}</Text>
                <Text style={styles.netTotalMode}>{viewSlipModal?.paymentMode}</Text>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.modalFullDownloadBtn}
              activeOpacity={0.85}
              onPress={() => {
                const slip = viewSlipModal;
                setViewSlipModal(null);
                handleDownload(slip);
              }}
            >
              <Feather name="download-cloud" size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.modalFullDownloadBtnText}>Download PDF Slip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Download Success Modal */}
      <Modal visible={!!downloadSuccessModal} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.successModalCard}>
            <View style={styles.successIconCircle}>
              <Ionicons name="document-text" size={38} color="#10B981" />
            </View>
            <Text style={styles.successModalTitle}>Payslip Downloaded!</Text>
            <Text style={styles.successModalSubtitle}>
              Salary slip for <Text style={{ fontWeight: '800', color: '#1E1B4B' }}>{downloadSuccessModal?.month}</Text> has been saved successfully to your device Downloads folder.
            </Text>

            <View style={styles.fileInfoCard}>
              <Feather name="file" size={16} color="#6366F1" style={{ marginRight: 8 }} />
              <Text style={styles.fileInfoText} numberOfLines={1}>
                {downloadSuccessModal?.slipNo}.pdf (142 KB)
              </Text>
            </View>

            <TouchableOpacity
              style={styles.doneBtn}
              activeOpacity={0.85}
              onPress={() => setDownloadSuccessModal(null)}
            >
              <Text style={styles.doneBtnText}>Done</Text>
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
  screenTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 40,
  },
  summaryCard: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#1E1B4B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 4,
  },
  summaryTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  summaryPreText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#A5B4FC',
    letterSpacing: 0.6,
  },
  summaryAmountText: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 4,
  },
  statusVerifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 4,
  },
  statusVerifiedText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#34D399',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    marginVertical: 14,
  },
  summaryFootRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footCol: {
    flex: 1,
  },
  footLabel: {
    fontSize: 10,
    color: '#C7D2FE',
    fontWeight: '600',
  },
  footVal: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: 2,
  },
  yearRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionHeaderTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  yearDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  yearText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4F46E5',
  },
  payslipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  monthLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIconBg: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  monthTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  slipSubNo: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 1,
  },
  paidBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  paidDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  paidBadgeText: {
    color: '#059669',
    fontSize: 11,
    fontWeight: '800',
  },
  cardBodyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
  },
  salaryAmount: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
  },
  paidDateText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
    marginTop: 2,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  viewBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4B5563',
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    minWidth: 95,
  },
  downloadBtnActive: {
    backgroundColor: '#6366F1',
  },
  downloadBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  detailModalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  detailModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  detailModalTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#0F172A',
  },
  detailModalSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  closeCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  breakdownGroup: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  breakdownHeader: {
    fontSize: 10,
    fontWeight: '900',
    color: '#4F46E5',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  breakdownItemLabel: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  breakdownItemVal: {
    fontSize: 12,
    color: '#0F172A',
    fontWeight: '800',
  },
  netTotalBox: {
    backgroundColor: '#EEF2FF',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  netTotalLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#4F46E5',
    letterSpacing: 0.5,
  },
  netTotalVal: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1E1B4B',
    marginTop: 2,
  },
  netTotalMode: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  modalFullDownloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    borderRadius: 14,
  },
  modalFullDownloadBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  successModalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  successIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  successModalTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 6,
  },
  successModalSubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 16,
  },
  fileInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    width: '100%',
    marginBottom: 20,
  },
  fileInfoText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  doneBtn: {
    width: '100%',
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  doneBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});

