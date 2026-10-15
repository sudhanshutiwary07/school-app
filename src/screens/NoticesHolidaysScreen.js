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
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function NoticesHolidaysScreen({ onBack, initialTab = 'notices' }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'notices' | 'holidays'
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [savedNotices, setSavedNotices] = useState({});

  const categories = [
    { id: 'All', label: 'All', icon: 'grid-outline' },
    { id: 'Urgent', label: 'Urgent', icon: 'alert-circle-outline' },
    { id: 'Events', label: 'Events', icon: 'calendar-outline' },
    { id: 'Academic', label: 'Academic', icon: 'book-outline' },
    { id: 'Sports', label: 'Sports', icon: 'football-outline' },
    { id: 'Exam', label: 'Exam', icon: 'document-text-outline' },
  ];

  const notices = [
    {
      id: '1',
      title: 'Annual Sports Day Practice Schedule',
      date: 'Today, 06 Oct',
      time: '08:00 AM',
      category: 'Sports',
      color: '#10B981',
      isUrgent: false,
      isNew: true,
      issuedBy: 'Sports Dept',
      attachment: 'Sports_Schedule_2026.pdf',
      description: 'Sports practice will be held daily at 8:00 AM in the school playground. All student participants must wear proper sports tracksuits and carry their water bottles.',
    },
    {
      id: '2',
      title: 'Important: Parent-Teacher Meeting (PTM)',
      date: '02 Oct 2026',
      time: '10:00 AM',
      category: 'Events',
      color: '#6366F1',
      isUrgent: true,
      isNew: true,
      issuedBy: 'Principal Office',
      attachment: null,
      description: 'Quarterly PTM is scheduled for the upcoming Saturday. Parents are requested to visit school according to their designated time slot. Progress reports will be distributed.',
    },
    {
      id: '3',
      title: 'Half-Yearly Examination Timetable Published',
      date: '28 Sep 2026',
      time: '02:00 PM',
      category: 'Exam',
      color: '#EF4444',
      isUrgent: true,
      isNew: false,
      issuedBy: 'Exam Controller',
      attachment: 'Half_Yearly_Datesheet.pdf',
      description: 'The timetable for Mid-Term Half Yearly examination has been published. Check the Exam Schedule tab for subject-wise syllabus and hall ticket instructions.',
    },
    {
      id: '4',
      title: 'Science Exhibition & Robotics Showcase 2026',
      date: '22 Sep 2026',
      time: '11:30 AM',
      category: 'Academic',
      color: '#8B5CF6',
      isUrgent: false,
      isNew: false,
      issuedBy: 'Science Faculty',
      attachment: 'Exhibition_Guidelines.pdf',
      description: 'Entries are open for the Inter-School Science & Tech Fair. Interested students from Class 4th onwards can submit working models to their class teacher by Friday.',
    },
    {
      id: '5',
      title: 'School Uniform Policy Update for Winter',
      date: '15 Sep 2026',
      time: '09:00 AM',
      category: 'Academic',
      color: '#F59E0B',
      isUrgent: false,
      isNew: false,
      issuedBy: 'Admin Office',
      attachment: null,
      description: 'Starting from next month, all students are required to switch to winter uniforms. Navy blue blazers and sweaters are mandatory on Monday assemblies.',
    },
  ];

  const holidays = [
    { id: '1', title: 'New Year Day', date: '01 Jan 2026', day: 'Thursday', daysLeft: 'Passed', type: 'Restricted Holiday', color: '#6366F1', icon: 'sunny' },
    { id: '2', title: 'Makar Sankranti / Pongal', date: '14 Jan 2026', day: 'Wednesday', daysLeft: 'Passed', type: 'Festival Holiday', color: '#F59E0B', icon: 'flame' },
    { id: '3', title: 'Republic Day', date: '26 Jan 2026', day: 'Monday', daysLeft: 'Passed', type: 'National Holiday', color: '#10B981', icon: 'flag' },
    { id: '4', title: 'Maha Shivratri', date: '15 Feb 2026', day: 'Sunday', daysLeft: 'Passed', type: 'Festival Holiday', color: '#8B5CF6', icon: 'moon' },
    { id: '5', title: 'Holi (Dhulandi & Holika)', date: '03 Mar 2026 - 04 Mar 2026', day: 'Tue - Wed', daysLeft: 'Passed', type: 'Festival Break', color: '#EC4899', icon: 'color-palette' },
    { id: '6', title: 'Id-ul-Fitr (Eid)', date: '20 Mar 2026', day: 'Friday', daysLeft: 'Passed', type: 'Gazetted Holiday', color: '#06B6D4', icon: 'moon' },
    { id: '7', title: 'Ram Navami', date: '27 Mar 2026', day: 'Friday', daysLeft: 'Passed', type: 'Festival Holiday', color: '#F59E0B', icon: 'sparkles' },
    { id: '8', title: 'Good Friday / Easter Break', date: '03 Apr 2026', day: 'Friday', daysLeft: 'Passed', type: 'Gazetted Holiday', color: '#6366F1', icon: 'heart' },
    { id: '9', title: 'Ambedkar Jayanti', date: '14 Apr 2026', day: 'Tuesday', daysLeft: 'Passed', type: 'Gazetted Holiday', color: '#3B82F6', icon: 'ribbon' },
    { id: '10', title: 'Summer Vacation Break', date: '15 May 2026 - 15 Jun 2026', day: '1 Month', daysLeft: 'Passed', type: 'Vacation Period', color: '#EF4444', icon: 'sunny' },
    { id: '11', title: 'Muharram', date: '26 Jun 2026', day: 'Friday', daysLeft: 'Passed', type: 'Gazetted Holiday', color: '#64748B', icon: 'moon' },
    { id: '12', title: 'Independence Day', date: '15 Aug 2026', day: 'Saturday', daysLeft: 'Passed', type: 'National Holiday', color: '#10B981', icon: 'flag' },
    { id: '13', title: 'Raksha Bandhan', date: '28 Aug 2026', day: 'Friday', daysLeft: 'Passed', type: 'Festival Holiday', color: '#EC4899', icon: 'heart' },
    { id: '14', title: 'Janmashtami', date: '04 Sep 2026', day: 'Friday', daysLeft: 'Passed', type: 'Festival Holiday', color: '#6366F1', icon: 'sparkles' },
    { id: '15', title: 'Gandhi Jayanti', date: '02 Oct 2026', day: 'Friday', daysLeft: 'Passed', type: 'National Holiday', color: '#10B981', icon: 'flag' },
    { id: '16', title: 'Maha Navami / Dussehra', date: '19 Oct 2026 - 20 Oct 2026', day: 'Mon - Tue', daysLeft: 'In 13 days', type: 'Festival Break', color: '#F59E0B', icon: 'flame' },
    { id: '17', title: 'Diwali (Deepawali & Laxmi Puja)', date: '08 Nov 2026 - 10 Nov 2026', day: 'Sun - Tue', daysLeft: 'In 33 days', type: 'Festival Break', color: '#EC4899', icon: 'sparkles' },
    { id: '18', title: 'Chhath Puja', date: '15 Nov 2026 - 16 Nov 2026', day: 'Sun - Mon', daysLeft: 'In 40 days', type: 'Festival Holiday', color: '#F97316', icon: 'sunny' },
    { id: '19', title: 'Guru Nanak Jayanti', date: '24 Nov 2026', day: 'Tuesday', daysLeft: 'In 49 days', type: 'Gazetted Holiday', color: '#6366F1', icon: 'moon' },
    { id: '20', title: 'Christmas & Winter Vacation', date: '25 Dec 2026 - 02 Jan 2027', day: 'Fri - Sat', daysLeft: 'In 80 days', type: 'Winter Break', color: '#EF4444', icon: 'gift' },
  ];

  const toggleNoticeExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleBookmark = (id) => {
    setSavedNotices((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredNotices = notices.filter((n) => {
    const matchesCategory =
      categoryFilter === 'All'
        ? true
        : categoryFilter === 'Urgent'
        ? n.isUrgent
        : n.category === categoryFilter;

    const matchesSearch =
      searchQuery.trim() === '' ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.issuedBy.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header with Gradient Accent */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={onBack}>
          <Feather name="chevron-left" size={24} color="#1E1B4B" />
        </TouchableOpacity>

        <View style={styles.headerTitleGroup}>
          <Text style={styles.screenTitle}>
            {activeTab === 'notices' ? 'Notifications & Circulars' : 'Holiday Calendar'}
          </Text>
          <Text style={styles.screenSubtitle}>
            {activeTab === 'notices' ? 'Live updates & school announcements' : 'Official Academic Year 2026-27'}
          </Text>
        </View>

        <TouchableOpacity style={styles.filterIconBtn} activeOpacity={0.7}>
          <Ionicons name="notifications" size={20} color="#6366F1" />
          <View style={styles.activeDot} />
        </TouchableOpacity>
      </View>

      {/* Main Switcher Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'notices' && styles.tabBtnActive]}
          activeOpacity={0.85}
          onPress={() => setActiveTab('notices')}
        >
          {activeTab === 'notices' ? (
            <LinearGradient
              colors={['#6366F1', '#4F46E5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.tabGradient}
            >
              <Ionicons name="megaphone" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.tabTextActive}>Notices ({notices.length})</Text>
            </LinearGradient>
          ) : (
            <View style={styles.tabInnerInactive}>
              <Ionicons name="megaphone-outline" size={16} color="#64748B" style={{ marginRight: 6 }} />
              <Text style={styles.tabTextInactive}>Notices</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'holidays' && styles.tabBtnActive]}
          activeOpacity={0.85}
          onPress={() => setActiveTab('holidays')}
        >
          {activeTab === 'holidays' ? (
            <LinearGradient
              colors={['#6366F1', '#4F46E5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.tabGradient}
            >
              <Ionicons name="calendar" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.tabTextActive}>Holidays (2026)</Text>
            </LinearGradient>
          ) : (
            <View style={styles.tabInnerInactive}>
              <Ionicons name="calendar-outline" size={16} color="#64748B" style={{ marginRight: 6 }} />
              <Text style={styles.tabTextInactive}>Holidays</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {activeTab === 'notices' ? (
          <>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <Feather name="search" size={18} color="#94A3B8" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search circulars, topics, issued by..."
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={18} color="#94A3B8" />
                </TouchableOpacity>
              )}
            </View>

            {/* Category Filter Pills */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryFilterRow}
            >
              {categories.map((cat) => {
                const isActive = categoryFilter === cat.id;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    style={[styles.categoryPill, isActive && styles.categoryPillActive]}
                    activeOpacity={0.8}
                    onPress={() => setCategoryFilter(cat.id)}
                  >
                    <Ionicons
                      name={cat.icon}
                      size={14}
                      color={isActive ? '#FFFFFF' : '#64748B'}
                      style={{ marginRight: 5 }}
                    />
                    <Text style={[styles.categoryPillText, isActive && styles.categoryPillTextActive]}>
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Notice Cards */}
            {filteredNotices.length === 0 ? (
              <View style={styles.emptyState}>
                <Ionicons name="mail-open-outline" size={48} color="#CBD5E1" />
                <Text style={styles.emptyTitle}>No notices found</Text>
                <Text style={styles.emptySubtitle}>Try changing your search or category filter.</Text>
              </View>
            ) : (
              filteredNotices.map((n) => {
                const isExpanded = expandedId === n.id;
                const isBookmarked = !!savedNotices[n.id];

                return (
                  <TouchableOpacity
                    key={n.id}
                    activeOpacity={0.92}
                    onPress={() => toggleNoticeExpand(n.id)}
                    style={[
                      styles.noticeCard,
                      n.isUrgent && styles.noticeCardUrgent,
                      isExpanded && styles.noticeCardExpanded,
                    ]}
                  >
                    {/* Top Card Badge & Date Header */}
                    <View style={styles.noticeHeader}>
                      <View style={styles.badgeGroup}>
                        <View style={[styles.categoryTag, { backgroundColor: `${n.color}18` }]}>
                          <Text style={[styles.categoryTagText, { color: n.color }]}>
                            {n.category}
                          </Text>
                        </View>
                        {n.isUrgent && (
                          <View style={styles.urgentBadge}>
                            <Ionicons name="flame" size={11} color="#EF4444" style={{ marginRight: 2 }} />
                            <Text style={styles.urgentBadgeText}>Urgent</Text>
                          </View>
                        )}
                        {n.isNew && (
                          <View style={styles.newBadge}>
                            <Text style={styles.newBadgeText}>NEW</Text>
                          </View>
                        )}
                      </View>

                      <TouchableOpacity
                        onPress={() => toggleBookmark(n.id)}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <Ionicons
                          name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                          size={19}
                          color={isBookmarked ? '#6366F1' : '#94A3B8'}
                        />
                      </TouchableOpacity>
                    </View>

                    {/* Notice Title */}
                    <Text style={styles.noticeTitle}>{n.title}</Text>

                    {/* Meta info row */}
                    <View style={styles.metaRow}>
                      <View style={styles.metaItem}>
                        <Feather name="clock" size={12} color="#94A3B8" style={{ marginRight: 4 }} />
                        <Text style={styles.metaText}>{n.date} • {n.time}</Text>
                      </View>
                      <View style={styles.metaDivider} />
                      <View style={styles.metaItem}>
                        <Feather name="user" size={12} color="#94A3B8" style={{ marginRight: 4 }} />
                        <Text style={styles.metaText}>{n.issuedBy}</Text>
                      </View>
                    </View>

                    {/* Description Body */}
                    <Text
                      style={styles.noticeDescription}
                      numberOfLines={isExpanded ? undefined : 2}
                    >
                      {n.description}
                    </Text>

                    {/* Expanded Section (Attachment & Actions) */}
                    {isExpanded && (
                      <View style={styles.expandedSection}>
                        {n.attachment && (
                          <TouchableOpacity style={styles.attachmentBox} activeOpacity={0.8}>
                            <View style={styles.pdfIconBg}>
                              <Ionicons name="document-attach" size={18} color="#EF4444" />
                            </View>
                            <View style={{ flex: 1 }}>
                              <Text style={styles.attachmentName} numberOfLines={1}>{n.attachment}</Text>
                              <Text style={styles.attachmentSub}>Click to download PDF (240 KB)</Text>
                            </View>
                            <Feather name="download" size={16} color="#6366F1" />
                          </TouchableOpacity>
                        )}

                        <View style={styles.actionRow}>
                          <TouchableOpacity style={styles.actionBtnSecondary} activeOpacity={0.8}>
                            <Feather name="share-2" size={14} color="#4F46E5" style={{ marginRight: 6 }} />
                            <Text style={styles.actionBtnSecondaryText}>Share</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.actionBtnPrimary} activeOpacity={0.8}>
                            <Feather name="check-circle" size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
                            <Text style={styles.actionBtnPrimaryText}>Acknowledge</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}

                    {/* Expand Indicator */}
                    <View style={styles.expandFoot}>
                      <Text style={styles.expandFootText}>
                        {isExpanded ? 'Tap to collapse' : 'Tap to read full circular'}
                      </Text>
                      <Feather
                        name={isExpanded ? 'chevron-up' : 'chevron-down'}
                        size={14}
                        color="#6366F1"
                        style={{ marginLeft: 4 }}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })
            )}
          </>
        ) : (
          /* Holidays Calendar Section */
          <View style={styles.holidayContainer}>
            {/* Calendar Banner Stat Card */}
            <LinearGradient
              colors={['#1E1B4B', '#312E81']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.holidayHeroCard}
            >
              <View>
                <Text style={styles.heroPreText}>ACADEMIC SESSION 2026-27</Text>
                <Text style={styles.heroTitleText}>Upcoming Holidays</Text>
                <Text style={styles.heroSubText}>Next break: Dussehra (19 Oct 2026)</Text>
              </View>
              <View style={styles.heroBadge}>
                <Ionicons name="sparkles" size={16} color="#FBBF24" />
                <Text style={styles.heroBadgeText}>5 Listed</Text>
              </View>
            </LinearGradient>

            {/* Holiday Cards List */}
            {holidays.map((h, idx) => (
              <View key={h.id} style={styles.holidayCard}>
                <View style={styles.holidayIndex}>
                  <Text style={styles.holidayIndexText}>{idx + 1}</Text>
                </View>

                <View style={styles.holidayLeft}>
                  <View style={[styles.holidayIconBg, { backgroundColor: `${h.color}18` }]}>
                    <Ionicons name={h.icon} size={20} color={h.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.holidayTitle}>{h.title}</Text>
                    <View style={styles.holidayTypeRow}>
                      <View style={[styles.holidayTypeDot, { backgroundColor: h.color }]} />
                      <Text style={styles.holidayType}>{h.type}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.holidayRight}>
                  <Text style={styles.holidayDate}>{h.date}</Text>
                  <Text style={styles.holidayDay}>{h.day}</Text>
                  <View style={[styles.daysLeftChip, h.daysLeft === 'Passed' && styles.daysLeftChipPassed]}>
                    <Text style={[styles.daysLeftText, h.daysLeft === 'Passed' && styles.daysLeftTextPassed]}>
                      {h.daysLeft}
                    </Text>
                  </View>
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
    letterSpacing: -0.2,
  },
  screenSubtitle: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 1,
  },
  filterIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    padding: 4,
    marginHorizontal: 18,
    marginTop: 14,
    marginBottom: 4,
    borderRadius: 16,
  },
  tabBtn: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  tabBtnActive: {
    elevation: 2,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  tabGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
  },
  tabInnerInactive: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  tabTextInactive: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 44,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '600',
  },
  categoryFilterRow: {
    flexDirection: 'row',
    marginBottom: 14,
    paddingVertical: 2,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 8,
  },
  categoryPillActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  categoryPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  categoryPillTextActive: {
    color: '#FFFFFF',
  },
  noticeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  noticeCardUrgent: {
    borderColor: '#FCA5A5',
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  noticeCardExpanded: {
    borderColor: '#C7D2FE',
    shadowOpacity: 0.09,
    shadowRadius: 14,
    elevation: 4,
  },
  noticeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  badgeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  categoryTag: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 8,
  },
  categoryTagText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  urgentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  urgentBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#DC2626',
    textTransform: 'uppercase',
  },
  newBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  newBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  noticeTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 21,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  metaDivider: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 8,
  },
  noticeDescription: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 19,
    fontWeight: '500',
  },
  expandedSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  attachmentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  pdfIconBg: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  attachmentName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  attachmentSub: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionBtnSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  actionBtnSecondaryText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4F46E5',
  },
  actionBtnPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: '#4F46E5',
  },
  actionBtnPrimaryText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  expandFoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingTop: 8,
  },
  expandFootText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6366F1',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 10,
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center',
  },
  holidayContainer: {
    width: '100%',
  },
  holidayHeroCard: {
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#1E1B4B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  heroPreText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#A5B4FC',
    letterSpacing: 0.8,
  },
  heroTitleText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 3,
  },
  heroSubText: {
    fontSize: 12,
    color: '#E0E7FF',
    marginTop: 3,
    fontWeight: '500',
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  heroBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  holidayCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  holidayIndex: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  holidayIndexText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
  },
  holidayLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  holidayIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  holidayTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  holidayTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  holidayTypeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  holidayType: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  holidayRight: {
    alignItems: 'flex-end',
  },
  holidayDate: {
    fontSize: 13,
    fontWeight: '800',
    color: '#4F46E5',
  },
  holidayDay: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
    fontWeight: '600',
  },
  daysLeftChip: {
    marginTop: 4,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  daysLeftChipPassed: {
    backgroundColor: '#F1F5F9',
  },
  daysLeftText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#4F46E5',
  },
  daysLeftTextPassed: {
    color: '#94A3B8',
  },
});

