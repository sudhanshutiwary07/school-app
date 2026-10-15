import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  TextInput,
  Alert,
  Modal,
  Linking,
} from 'react-native';
import { Feather, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function HelpdeskScreen({ onBack }) {
  const [activeTab, setActiveTab] = useState('ticket'); // 'ticket' | 'faq' | 'contact'
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Attendance / Geo-fence');
  const [ticketDescription, setTicketDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketSuccessModal, setTicketSuccessModal] = useState(null);

  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    'Attendance / Geo-fence',
    'Timetable & Slot Swap',
    'Salary & Payslip Dispute',
    'Leave Balance / Approval',
    'App Technical Bug',
    'Other School Inquiry',
  ];

  const recentTickets = [
    {
      id: 'TKT-8901',
      subject: 'Geo-fence punch radius issue near gate 2',
      category: 'Attendance',
      status: 'Resolved',
      date: '02 Oct 2026',
      response: 'Admin updated the geofence perimeter to 150m. Please try punching in now.',
    },
    {
      id: 'TKT-8765',
      subject: 'Missing slot in Tuesday Class 7-B timetable',
      category: 'Timetable',
      status: 'In Progress',
      date: '28 Sep 2026',
      response: 'Academic coordinator is currently updating the weekly schedule.',
    },
  ];

  const faqs = [
    {
      id: '1',
      question: 'Why is my Geo-Punch In showing "Outside Geofence"?',
      answer: 'Ensure your device location (GPS) is turned ON and high accuracy mode is enabled. You must be within 100 meters of the school campus boundary.',
    },
    {
      id: '2',
      question: 'How long does Leave Approval usually take?',
      answer: 'Casual and Sick leave applications submitted before 08:00 AM are reviewed by the Principal / Vice-Principal within 2 hours.',
    },
    {
      id: '3',
      question: 'When is monthly salary credited and payslips generated?',
      answer: 'Salary is credited on the last working day of each month. Verified PDF payslips are published immediately in the Payslip tab.',
    },
    {
      id: '4',
      question: 'Can I swap a lecture slot with another teacher?',
      answer: 'Yes, raise a quick slot exchange request via Timetable screen or contact the Time Table coordinator through Helpdesk ticket.',
    },
  ];

  const handleSubmitTicket = () => {
    if (!ticketSubject.trim()) {
      Alert.alert('Subject Required', 'Please enter a brief subject for your helpdesk ticket.');
      return;
    }
    if (!ticketDescription.trim()) {
      Alert.alert('Description Required', 'Please explain your issue in detail.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const newTicket = {
        id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
        subject: ticketSubject.trim(),
        category: ticketCategory,
        status: 'Open',
        date: 'Today',
      };
      setTicketSuccessModal(newTicket);
      setTicketSubject('');
      setTicketDescription('');
    }, 700);
  };

  const handleCallSupport = () => {
    Linking.openURL('tel:+919876543210');
  };

  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@kidsdream.edu?subject=Teacher%20App%20Support%20Request');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={onBack}>
          <Feather name="chevron-left" size={24} color="#1E1B4B" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Helpdesk & Support</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {[
          { id: 'ticket', label: 'Raise Ticket', icon: 'send' },
          { id: 'faq', label: 'FAQs', icon: 'help-circle' },
          { id: 'contact', label: 'Direct Helpline', icon: 'phone' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabBtn, isActive && styles.tabBtnActive]}
              activeOpacity={0.8}
              onPress={() => setActiveTab(tab.id)}
            >
              <Feather
                name={tab.icon}
                size={14}
                color={isActive ? '#FFFFFF' : '#64748B'}
                style={{ marginRight: 6 }}
              />
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Tab 1: Raise Ticket */}
        {activeTab === 'ticket' && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardHeaderTitle}>Submit Support Request</Text>
              <Text style={styles.cardHeaderSub}>Our school IT & Admin staff will respond within 24 hours.</Text>

              <Text style={styles.inputLabel}>Issue Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
                {categories.map((c) => (
                  <TouchableOpacity
                    key={c}
                    style={[styles.categoryChip, ticketCategory === c && styles.categoryChipActive]}
                    activeOpacity={0.8}
                    onPress={() => setTicketCategory(c)}
                  >
                    <Text style={[styles.categoryChipText, ticketCategory === c && styles.categoryChipTextActive]}>
                      {c}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={styles.inputLabel}>Subject / Topic *</Text>
              <View style={styles.inputBox}>
                <TextInput
                  placeholder="e.g. Geo attendance failing near playground"
                  placeholderTextColor="#94A3B8"
                  value={ticketSubject}
                  onChangeText={setTicketSubject}
                  style={styles.textInput}
                />
              </View>

              <Text style={styles.inputLabel}>Detailed Description *</Text>
              <View style={[styles.inputBox, styles.textAreaBox]}>
                <TextInput
                  placeholder="Provide any error message or details..."
                  placeholderTextColor="#94A3B8"
                  multiline
                  numberOfLines={4}
                  value={ticketDescription}
                  onChangeText={setTicketDescription}
                  style={styles.textArea}
                />
              </View>

              <TouchableOpacity
                style={styles.submitBtn}
                activeOpacity={0.85}
                disabled={isSubmitting}
                onPress={handleSubmitTicket}
              >
                <LinearGradient
                  colors={['#6366F1', '#4F46E5']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.submitGradient}
                >
                  <Feather name="send" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                  <Text style={styles.submitBtnText}>
                    {isSubmitting ? 'Sending Request...' : 'Submit Support Ticket'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Previous Tickets Section */}
            <Text style={styles.recentTicketsHeading}>PREVIOUS TICKETS</Text>
            {recentTickets.map((t) => (
              <View key={t.id} style={styles.ticketCard}>
                <View style={styles.ticketHeader}>
                  <View>
                    <Text style={styles.ticketId}>{t.id}</Text>
                    <Text style={styles.ticketSubject}>{t.subject}</Text>
                  </View>
                  <View
                    style={[
                      styles.ticketStatusBadge,
                      t.status === 'Resolved' ? styles.statusResolved : styles.statusInProgress,
                    ]}
                  >
                    <Text
                      style={[
                        styles.ticketStatusText,
                        t.status === 'Resolved' ? styles.statusResolvedText : styles.statusInProgressText,
                      ]}
                    >
                      {t.status}
                    </Text>
                  </View>
                </View>

                {t.response && (
                  <View style={styles.adminResponseBox}>
                    <Text style={styles.adminResponseTitle}>Admin Resolution:</Text>
                    <Text style={styles.adminResponseText}>{t.response}</Text>
                  </View>
                )}
                <Text style={styles.ticketDate}>{t.category} • Submitted on {t.date}</Text>
              </View>
            ))}
          </>
        )}

        {/* Tab 2: FAQs */}
        {activeTab === 'faq' && (
          <View style={styles.faqContainer}>
            <Text style={styles.faqSectionHeading}>Frequently Asked Questions</Text>
            {faqs.map((f) => {
              const isExpanded = expandedFaq === f.id;
              return (
                <TouchableOpacity
                  key={f.id}
                  style={styles.faqCard}
                  activeOpacity={0.85}
                  onPress={() => setExpandedFaq(isExpanded ? null : f.id)}
                >
                  <View style={styles.faqQuestionRow}>
                    <Ionicons name="help-circle-outline" size={18} color="#6366F1" style={{ marginRight: 10 }} />
                    <Text style={styles.faqQuestionText}>{f.question}</Text>
                    <Feather name={isExpanded ? 'chevron-up' : 'chevron-down'} size={18} color="#64748B" />
                  </View>
                  {isExpanded && (
                    <View style={styles.faqAnswerBox}>
                      <Text style={styles.faqAnswerText}>{f.answer}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Tab 3: Helpline & Contact */}
        {activeTab === 'contact' && (
          <View style={styles.contactContainer}>
            <LinearGradient
              colors={['#1E1B4B', '#312E81']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.contactHeroCard}
            >
              <Text style={styles.contactHeroPre}>KIDS' DREAM SCHOOL HELPDESK</Text>
              <Text style={styles.contactHeroTitle}>We're here to help!</Text>
              <Text style={styles.contactHeroSub}>School Admin Office: Mon-Sat, 07:30 AM - 04:00 PM</Text>
            </LinearGradient>

            <TouchableOpacity style={styles.contactActionCard} activeOpacity={0.8} onPress={handleCallSupport}>
              <View style={[styles.contactIconBg, { backgroundColor: '#ECFDF5' }]}>
                <Ionicons name="call" size={22} color="#10B981" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.contactActionTitle}>Call Admin Helpline</Text>
                <Text style={styles.contactActionSub}>+91 98765 43210 (Toll Free)</Text>
              </View>
              <Feather name="external-link" size={18} color="#94A3B8" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactActionCard} activeOpacity={0.8} onPress={handleEmailSupport}>
              <View style={[styles.contactIconBg, { backgroundColor: '#EEF2FF' }]}>
                <Ionicons name="mail" size={22} color="#6366F1" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.contactActionTitle}>Email School Support</Text>
                <Text style={styles.contactActionSub}>support@kidsdream.edu</Text>
              </View>
              <Feather name="external-link" size={18} color="#94A3B8" />
            </TouchableOpacity>

            <View style={styles.contactActionCard}>
              <View style={[styles.contactIconBg, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="location" size={22} color="#F59E0B" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.contactActionTitle}>IT & Administration Cell</Text>
                <Text style={styles.contactActionSub}>Block-A, 1st Floor, Main School Campus</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Ticket Success Modal */}
      <Modal visible={!!ticketSuccessModal} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.successIconCircle}>
              <Ionicons name="checkmark-done" size={38} color="#10B981" />
            </View>
            <Text style={styles.modalTitle}>Ticket Raised Successfully!</Text>
            <Text style={styles.modalSubtitle}>
              Your ticket <Text style={{ fontWeight: '800', color: '#1E1B4B' }}>{ticketSuccessModal?.id}</Text> has been created. School administrator will respond shortly.
            </Text>

            <TouchableOpacity
              style={styles.modalCloseBtn}
              activeOpacity={0.85}
              onPress={() => setTicketSuccessModal(null)}
            >
              <Text style={styles.modalCloseBtnText}>Done</Text>
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    padding: 4,
    marginHorizontal: 18,
    marginTop: 14,
    borderRadius: 14,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 10,
  },
  tabBtnActive: {
    backgroundColor: '#4F46E5',
    elevation: 2,
  },
  tabText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 20,
  },
  cardHeaderTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0F172A',
  },
  cardHeaderSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 6,
  },
  categoryScroll: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  categoryChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  categoryChipTextActive: {
    color: '#4F46E5',
    fontWeight: '800',
  },
  inputBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 46,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 13,
    color: '#0F172A',
  },
  textAreaBox: {
    height: 90,
    paddingVertical: 10,
    alignItems: 'flex-start',
  },
  textArea: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    textAlignVertical: 'top',
  },
  submitBtn: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 4,
  },
  submitGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  recentTicketsHeading: {
    fontSize: 11,
    fontWeight: '900',
    color: '#64748B',
    letterSpacing: 0.6,
    marginBottom: 12,
  },
  ticketCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  ticketId: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6366F1',
  },
  ticketSubject: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  ticketStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusResolved: {
    backgroundColor: '#ECFDF5',
  },
  statusInProgress: {
    backgroundColor: '#FEF3C7',
  },
  ticketStatusText: {
    fontSize: 10,
    fontWeight: '800',
  },
  statusResolvedText: {
    color: '#059669',
  },
  statusInProgressText: {
    color: '#D97706',
  },
  adminResponseBox: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#10B981',
  },
  adminResponseTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
    marginBottom: 2,
  },
  adminResponseText: {
    fontSize: 11,
    color: '#475569',
    lineHeight: 16,
  },
  ticketDate: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600',
  },
  faqContainer: {
    width: '100%',
  },
  faqSectionHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 14,
  },
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  faqQuestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginRight: 8,
  },
  faqAnswerBox: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  faqAnswerText: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
  contactContainer: {
    width: '100%',
  },
  contactHeroCard: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
  },
  contactHeroPre: {
    fontSize: 10,
    fontWeight: '800',
    color: '#A5B4FC',
    letterSpacing: 0.6,
  },
  contactHeroTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 3,
  },
  contactHeroSub: {
    fontSize: 11,
    color: '#E0E7FF',
    marginTop: 2,
  },
  contactActionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  contactIconBg: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  contactActionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  contactActionSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalCard: {
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
  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 6,
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 18,
  },
  modalCloseBtn: {
    width: '100%',
    backgroundColor: '#4F46E5',
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
