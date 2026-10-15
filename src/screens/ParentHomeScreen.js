import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Image,
  Modal,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import BannerSlider from '../components/BannerSlider';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.82;

export default function ParentHomeScreen({
  onNavigate,
  onLogout,
  user = { name: 'Aarav Sharma', class: 'Class 4-B', rollNo: '14' },
}) {
  const [selectedChildIndex, setSelectedChildIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  const openDrawer = () => {
    setIsDrawerOpen(true);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 260,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnim, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeDrawer = (callback) => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnim, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsDrawerOpen(false);
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  };

  const handleDrawerNavigate = (screen) => {
    closeDrawer(() => {
      if (screen && onNavigate) {
        onNavigate(screen);
      }
    });
  };

  const childrenList = [
    {
      id: '1',
      name: 'Aarav Sharma',
      class: 'Class 4 - B',
      rollNo: '14',
      admissionNo: 'KD-2023-042',
      attendancePercent: '94%',
      photo: 'boy',
    },
    {
      id: '2',
      name: 'Ananya Sharma',
      class: 'Class 1 - A',
      rollNo: '08',
      admissionNo: 'KD-2025-118',
      attendancePercent: '98%',
      photo: 'girl',
    },
  ];

  const currentChild = childrenList[selectedChildIndex];

  // Drawer menu items for parent
  const parentDrawerNavItems = [
    { id: 'home', label: 'Parent Dashboard', icon: 'home', screen: 'parent_home', color: '#6366F1' },
    { id: 'attendance', label: 'Child Attendance & Calendar', icon: 'calendar', screen: 'child_attendance', color: '#10B981' },
    { id: 'notices', label: 'School Notices & Circulars', icon: 'bell', screen: 'notices', color: '#06B6D4' },
    { id: 'holidays', label: 'Holiday Calendar 2026', icon: 'umbrella', screen: 'holidays', color: '#EF4444' },
  ];

  const parentDrawerSecondaryItems = [
    { id: 'profile', label: 'Student & Guardian Profile', icon: 'user', screen: 'profile', color: '#6366F1' },
    { id: 'settings', label: 'App Settings & Alerts', icon: 'settings', screen: 'settings', color: '#8B5CF6' },
    { id: 'support', label: 'School Helpdesk & Support', icon: 'help-circle', screen: 'support', color: '#10B981' },
  ];

  // 9 items as per implementation plan Module 8
  const parentMenuItems = [
    {
      id: 'attendance',
      title: 'Attendance',
      subtitle: '94% Present',
      icon: 'calendar-check',
      iconType: 'fa5',
      color: '#10B981',
      bg: '#ECFDF5',
      screen: 'child_attendance',
    },
    {
      id: 'marks',
      title: 'Marks & Report',
      subtitle: 'Grade A (88%)',
      icon: 'award',
      iconType: 'fa5',
      color: '#6366F1',
      bg: '#EEF2FF',
      screen: 'marksheet',
    },
    {
      id: 'exam_schedule',
      title: 'Exam Schedule',
      subtitle: 'Term-1 Exams',
      icon: 'file-alt',
      iconType: 'fa5',
      color: '#8B5CF6',
      bg: '#F3E8FF',
      screen: 'exam_schedule',
    },
    {
      id: 'timetable',
      title: 'Time Table',
      subtitle: 'Class 4-B',
      icon: 'calendar-alt',
      iconType: 'fa5',
      color: '#3B82F6',
      bg: '#EFF6FF',
      screen: 'timetable',
    },
    {
      id: 'homework',
      title: 'Homework',
      subtitle: '2 Pending',
      icon: 'book-open',
      iconType: 'fa5',
      color: '#EC4899',
      bg: '#FDF2F8',
      screen: 'homework',
    },
    {
      id: 'notices',
      title: 'Notices',
      subtitle: '3 New',
      icon: 'bullhorn',
      iconType: 'fa5',
      color: '#06B6D4',
      bg: '#ECFEFF',
      screen: 'notices',
    },
    {
      id: 'holidays',
      title: 'Holidays',
      subtitle: 'Calendar 2026',
      icon: 'umbrella-beach',
      iconType: 'fa5',
      color: '#EF4444',
      bg: '#FEF2F2',
      screen: 'holidays',
    },
    {
      id: 'fee_receipts',
      title: 'Fee Receipts',
      subtitle: 'Paid (Q3)',
      icon: 'receipt',
      iconType: 'fa5',
      color: '#F59E0B',
      bg: '#FEF3C7',
      screen: 'fee_receipts',
    },
    {
      id: 'transport',
      title: 'Transport',
      subtitle: 'Bus Route #4',
      icon: 'bus-alt',
      iconType: 'fa5',
      color: '#14B8A6',
      bg: '#CCFBF1',
      screen: 'transport',
    },
  ];

  const recentNotices = [
    {
      id: '1',
      title: 'Annual Sports Day 2026 Registration',
      date: '04 Oct 2026',
      category: 'Sports',
      badgeColor: '#10B981',
      badgeBg: '#ECFDF5',
      desc: 'Annual sports meet registrations are now open. Parents are requested to submit consent forms before Oct 10.',
    },
    {
      id: '2',
      title: 'Term-1 Examination Timetable Released',
      date: '02 Oct 2026',
      category: 'Academic',
      badgeColor: '#6366F1',
      badgeBg: '#EEF2FF',
      desc: 'Term-1 assessments begin from Oct 15. Detailed schedule is uploaded in the Exam Schedule section.',
    },
  ];

  const handleMenuClick = (item) => {
    if (onNavigate) {
      onNavigate(item.screen);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top App Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.iconCircle}
          activeOpacity={0.7}
          onPress={openDrawer}
        >
          <Feather name="menu" size={22} color="#1F2937" />
        </TouchableOpacity>

        <View style={styles.topCenterTitle}>
          <Image
            source={require('../../assets/image.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.schoolHeaderTitle}>Kids' Dream English School</Text>
            <Text style={styles.schoolHeaderSub}>BNORBIT PARENT PORTAL</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.iconCircle}
          activeOpacity={0.7}
          onPress={() => onNavigate && onNavigate('notices')}
        >
          <Ionicons name="notifications-outline" size={22} color="#1F2937" />
          <View style={styles.badgeDot}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Multi-Child Selector Switcher if more than 1 child */}
        {childrenList.length > 1 && (
          <View style={styles.childSwitchRow}>
            {childrenList.map((c, idx) => (
              <TouchableOpacity
                key={c.id}
                activeOpacity={0.8}
                onPress={() => setSelectedChildIndex(idx)}
                style={[
                  styles.childTabChip,
                  selectedChildIndex === idx && styles.childTabChipActive,
                ]}
              >
                <FontAwesome5
                  name={c.photo === 'boy' ? 'user-astronaut' : 'user-graduate'}
                  size={13}
                  color={selectedChildIndex === idx ? '#FFFFFF' : '#6B7280'}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={[
                    styles.childTabText,
                    selectedChildIndex === idx && styles.childTabTextActive,
                  ]}
                >
                  {c.name.split(' ')[0]} ({c.class.split('-')[0].trim()})
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Child Profile Card */}
        <LinearGradient
          colors={['#4F46E5', '#6366F1', '#818CF8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.childCard}
        >
          <View style={styles.cardHeaderRow}>
            <View style={styles.avatarBorder}>
              <View style={styles.avatarInner}>
                <FontAwesome5
                  name={currentChild.photo === 'boy' ? 'user-astronaut' : 'user-graduate'}
                  size={32}
                  color="#4F46E5"
                />
              </View>
            </View>

            <View style={styles.childMeta}>
              <View style={styles.greetingPill}>
                <Text style={styles.greetingPillText}>Student Profile</Text>
              </View>
              <Text style={styles.childNameText}>{currentChild.name}</Text>
              <Text style={styles.childSubInfo}>
                {currentChild.class} • Roll No: {currentChild.rollNo}
              </Text>
              <Text style={styles.childAdmText}>Adm ID: {currentChild.admissionNo}</Text>
            </View>
          </View>

          {/* Quick Metrics Bar inside Child Card */}
          <View style={styles.statsStrip}>
            <TouchableOpacity
              style={styles.statBox}
              activeOpacity={0.7}
              onPress={() => onNavigate && onNavigate('child_attendance')}
            >
              <Text style={styles.statLabel}>Attendance</Text>
              <Text style={styles.statValue}>{currentChild.attendancePercent}</Text>
            </TouchableOpacity>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Academic Rank</Text>
              <Text style={styles.statValue}>#3 in Class</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Quarter Fees</Text>
              <Text style={[styles.statValue, { color: '#86EFAC' }]}>Cleared ✓</Text>
            </View>
          </View>

          {/* Module 8 Component: View Profile Button */}
          <TouchableOpacity
            style={styles.viewProfileBtn}
            activeOpacity={0.8}
            onPress={() => onNavigate && onNavigate('child_attendance')}
          >
            <Feather name="user-check" size={14} color="#4F46E5" style={{ marginRight: 6 }} />
            <Text style={styles.viewProfileBtnText}>View Full Academic & Attendance Profile</Text>
            <Feather name="arrow-right" size={14} color="#4F46E5" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </LinearGradient>

        {/* Quick Menu 9-Item Grid (Module 8: 3x3 Grid) */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionIconPill}>
              <FontAwesome5 name="th-large" size={13} color="#6366F1" />
            </View>
            <Text style={styles.sectionTitle}>Parent Quick Menu</Text>
          </View>
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>9 Services</Text>
          </View>
        </View>

        <View style={styles.gridContainer}>
          {parentMenuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.gridCard}
              activeOpacity={0.7}
              onPress={() => handleMenuClick(item)}
            >
              <View style={[styles.iconCircleLarge, { backgroundColor: item.bg }]}>
                <FontAwesome5 name={item.icon} size={20} color={item.color} />
              </View>
              <Text style={styles.gridTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.gridSubtitle} numberOfLines={1}>
                {item.subtitle}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Module 8: Today's Notice Section with See All Link */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionIconPill}>
              <Ionicons name="megaphone" size={13} color="#6366F1" />
            </View>
            <Text style={styles.sectionTitle}>Today's Notices & Circulars</Text>
          </View>
          <TouchableOpacity
            style={styles.seeAllBtn}
            activeOpacity={0.7}
            onPress={() => onNavigate && onNavigate('notices')}
          >
            <Text style={styles.seeAllText}>See All</Text>
            <Feather name="chevron-right" size={14} color="#6366F1" style={{ marginLeft: 2 }} />
          </TouchableOpacity>
        </View>

        {recentNotices.map((notice) => (
          <View key={notice.id} style={styles.noticeCard}>
            <View style={styles.noticeTopRow}>
              <View style={[styles.categoryBadge, { backgroundColor: notice.badgeBg }]}>
                <Text style={[styles.categoryBadgeText, { color: notice.badgeColor }]}>
                  {notice.category}
                </Text>
              </View>
              <View style={styles.noticeDateRow}>
                <Ionicons name="time-outline" size={13} color="#9CA3AF" />
                <Text style={styles.noticeDateText}>{notice.date}</Text>
              </View>
            </View>
            <Text style={styles.noticeHeading}>{notice.title}</Text>
            <Text style={styles.noticeBody}>{notice.desc}</Text>
          </View>
        ))}

        {/* Helpline & Support banner */}
        <View style={styles.helpBanner}>
          <View style={styles.helpIconBox}>
            <Ionicons name="help-buoy" size={24} color="#6366F1" />
          </View>
          <View style={styles.helpTextContent}>
            <Text style={styles.helpTitle}>Need help or have questions?</Text>
            <Text style={styles.helpSubtitle}>School Helpdesk: +91 98765 43210</Text>
          </View>
          <TouchableOpacity
            style={styles.callButton}
            activeOpacity={0.8}
            onPress={() => onNavigate && onNavigate('support')}
          >
            <Ionicons name="call" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Side Navigation Drawer Modal for Parent */}
      <Modal
        visible={isDrawerOpen}
        transparent
        animationType="none"
        onRequestClose={() => closeDrawer()}
      >
        <View style={styles.modalContainer}>
          {/* Backdrop */}
          <TouchableWithoutFeedback onPress={() => closeDrawer()}>
            <Animated.View
              style={[
                styles.backdrop,
                {
                  opacity: overlayAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.55],
                  }),
                },
              ]}
            />
          </TouchableWithoutFeedback>

          {/* Drawer Content */}
          <Animated.View
            style={[
              styles.drawerSheet,
              {
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            {/* Drawer Header with Gradient */}
            <LinearGradient
              colors={['#1E1B4B', '#312E81']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.drawerHeader}
            >
              <View style={styles.drawerHeaderTop}>
                <View style={styles.drawerAvatarCircle}>
                  <FontAwesome5
                    name={currentChild.photo === 'boy' ? 'user-astronaut' : 'user-graduate'}
                    size={22}
                    color="#4F46E5"
                  />
                </View>
                <TouchableOpacity
                  style={styles.closeDrawerBtn}
                  activeOpacity={0.7}
                  onPress={() => closeDrawer()}
                >
                  <Ionicons name="close" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              <Text style={styles.drawerUserName}>{currentChild.name}</Text>
              <Text style={styles.drawerUserRole}>{currentChild.class} • Roll No: {currentChild.rollNo}</Text>
              <View style={styles.drawerBadge}>
                <Text style={styles.drawerBadgeText}>Adm: {currentChild.admissionNo}</Text>
              </View>
            </LinearGradient>

            {/* Sibling Switcher inside Drawer */}
            {childrenList.length > 1 && (
              <View style={styles.drawerSiblingBox}>
                <Text style={styles.drawerSiblingLabel}>SELECT CHILD</Text>
                <View style={styles.drawerSiblingRow}>
                  {childrenList.map((c, idx) => (
                    <TouchableOpacity
                      key={c.id}
                      style={[
                        styles.drawerSiblingChip,
                        selectedChildIndex === idx && styles.drawerSiblingChipActive,
                      ]}
                      activeOpacity={0.8}
                      onPress={() => setSelectedChildIndex(idx)}
                    >
                      <Text
                        style={[
                          styles.drawerSiblingChipText,
                          selectedChildIndex === idx && styles.drawerSiblingChipTextActive,
                        ]}
                      >
                        {c.name.split(' ')[0]}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Drawer Menu List */}
            <ScrollView
              style={styles.drawerScroll}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10 }}
            >
              <Text style={styles.drawerSectionHeading}>MAIN SERVICES</Text>
              {parentDrawerNavItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.drawerMenuItem}
                  activeOpacity={0.7}
                  onPress={() => handleDrawerNavigate(item.screen)}
                >
                  <View style={[styles.drawerItemIconBox, { backgroundColor: `${item.color}15` }]}>
                    <Feather name={item.icon} size={18} color={item.color} />
                  </View>
                  <Text style={styles.drawerItemLabel}>{item.label}</Text>
                  <Feather name="chevron-right" size={16} color="#D1D5DB" />
                </TouchableOpacity>
              ))}

              <View style={styles.drawerDivider} />

              <Text style={styles.drawerSectionHeading}>ACCOUNT & SETTINGS</Text>
              {parentDrawerSecondaryItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.drawerMenuItem}
                  activeOpacity={0.7}
                  onPress={() => handleDrawerNavigate(item.screen)}
                >
                  <View style={[styles.drawerItemIconBox, { backgroundColor: `${item.color}15` }]}>
                    <Feather name={item.icon} size={18} color={item.color} />
                  </View>
                  <Text style={styles.drawerItemLabel}>{item.label}</Text>
                  <Feather name="chevron-right" size={16} color="#D1D5DB" />
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Drawer Footer / Logout Button */}
            <View style={styles.drawerFooter}>
              <TouchableOpacity
                style={styles.drawerLogoutBtn}
                activeOpacity={0.8}
                onPress={() => {
                  closeDrawer(() => {
                    if (onLogout) {
                      onLogout();
                    } else if (onNavigate) {
                      onNavigate('login');
                    }
                  });
                }}
              >
                <Feather name="log-out" size={18} color="#EF4444" style={{ marginRight: 10 }} />
                <Text style={styles.drawerLogoutText}>Log Out (Parent)</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
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
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'android' ? 32 : 12,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EDE9FE',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#EF4444',
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  topCenterTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 38,
    height: 38,
    marginRight: 8,
  },
  schoolHeaderTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E1B4B',
    fontFamily: Platform.OS === 'ios' ? 'Palatino-Bold' : 'serif',
  },
  schoolHeaderSub: {
    fontSize: 9,
    fontWeight: '700',
    color: '#6366F1',
    letterSpacing: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 24,
  },
  childSwitchRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  childTabChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  childTabChipActive: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  childTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4B5563',
  },
  childTabTextActive: {
    color: '#FFFFFF',
  },
  childCard: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarBorder: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  childMeta: {
    marginLeft: 14,
    flex: 1,
  },
  greetingPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginBottom: 4,
  },
  greetingPillText: {
    color: '#E0E7FF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  childNameText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  childSubInfo: {
    color: '#EDE9FE',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  childAdmText: {
    color: '#C7D2FE',
    fontSize: 11,
    marginTop: 2,
  },
  statsStrip: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 14,
    marginTop: 14,
    paddingVertical: 10,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  statLabel: {
    color: '#C7D2FE',
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 2,
  },
  viewProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 10,
    marginTop: 12,
  },
  viewProfileBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#4F46E5',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIconPill: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  countBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  countBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#6366F1',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridCard: {
    width: '31.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EDE9FE',
    shadowColor: '#4338CA',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  iconCircleLarge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  gridTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
  },
  gridSubtitle: {
    fontSize: 9,
    color: '#9CA3AF',
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },
  noticeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EDE9FE',
    shadowColor: '#4338CA',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  noticeTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  noticeDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  noticeDateText: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  noticeHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  noticeBody: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 17,
  },
  helpBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    padding: 12,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  helpIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  helpTextContent: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E1B4B',
  },
  helpSubtitle: {
    fontSize: 11,
    color: '#6366F1',
    fontWeight: '600',
    marginTop: 1,
  },
  callButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Modal / Drawer Styles for Parent View
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
  },
  drawerSheet: {
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 16,
  },
  drawerHeader: {
    paddingTop: Platform.OS === 'android' ? 44 : 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  drawerHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  drawerAvatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeDrawerBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerUserName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  drawerUserRole: {
    color: '#E0E7FF',
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
  drawerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 8,
  },
  drawerBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  drawerSiblingBox: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  drawerSiblingLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  drawerSiblingRow: {
    flexDirection: 'row',
    gap: 8,
  },
  drawerSiblingChip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  drawerSiblingChipActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  drawerSiblingChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  drawerSiblingChipTextActive: {
    color: '#FFFFFF',
  },
  drawerScroll: {
    flex: 1,
    paddingHorizontal: 16,
  },
  drawerSectionHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 0.8,
    marginTop: 10,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  drawerMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 3,
  },
  drawerItemIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  drawerItemLabel: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: '600',
    color: '#374151',
  },
  drawerDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 10,
    marginHorizontal: 8,
  },
  drawerFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FAFAFA',
  },
  drawerLogoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    paddingVertical: 11,
    borderRadius: 12,
  },
  drawerLogoutText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '700',
  },
});
