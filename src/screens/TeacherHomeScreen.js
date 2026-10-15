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
import { Ionicons, Feather, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import BannerSlider from '../components/BannerSlider';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.82;

export default function TeacherHomeScreen({
  onNavigate,
  onLogout,
  user = { name: 'Rohit Kumar', subject: 'Mathematics Teacher' },
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  const quickMenuItems = [
    { id: 'attendance', title: 'Attendance', subtitle: 'Geo Punch', icon: 'calendar-check', iconType: 'fa5', color: '#10B981', bg: '#ECFDF5', badge: 'Live', screen: 'attendance' },
    { id: 'timetable', title: 'Time Table', subtitle: '3 Slots Today', icon: 'calendar-alt', iconType: 'fa5', color: '#6366F1', bg: '#EEF2FF', badge: 'Daily', screen: 'timetable' },
    { id: 'leave', title: 'Apply Leave', subtitle: 'CL / SL / EL', icon: 'plane-departure', iconType: 'fa5', color: '#EC4899', bg: '#FDF2F8', badge: null, screen: 'leave' },
    { id: 'payslip', title: 'Payslip', subtitle: 'Salary History', icon: 'file-invoice-dollar', iconType: 'fa5', color: '#F59E0B', bg: '#FEF3C7', badge: 'Sep 26', screen: 'payslip' },
    { id: 'notices', title: 'Notices', subtitle: 'Circulars & News', icon: 'bullhorn', iconType: 'fa5', color: '#06B6D4', bg: '#ECFEFF', badge: '3 New', screen: 'notices' },
    { id: 'holidays', title: 'Holidays', subtitle: 'School Calendar', icon: 'umbrella-beach', iconType: 'fa5', color: '#8B5CF6', bg: '#F5F3FF', badge: null, screen: 'holidays' },
  ];

  const drawerMenuItems = [
    { id: 'home', label: 'Dashboard / Home', icon: 'home', iconType: 'feather', screen: 'teacher_home', color: '#6366F1' },
    { id: 'attendance', label: 'Geo Attendance & Check-In', icon: 'map-pin', iconType: 'feather', screen: 'attendance', color: '#10B981' },
    { id: 'timetable', label: 'My Weekly Timetable', icon: 'clock', iconType: 'feather', screen: 'timetable', color: '#6366F1' },
    { id: 'leave', label: 'Apply / Check Leaves', icon: 'file-text', iconType: 'feather', screen: 'leave', color: '#EC4899' },
    { id: 'payslip', label: 'Salary & Payslips', icon: 'dollar-sign', iconType: 'feather', screen: 'payslip', color: '#F59E0B' },
    { id: 'notices', label: 'School Notices & Circulars', icon: 'bell', iconType: 'feather', screen: 'notices', color: '#06B6D4' },
    { id: 'holidays', label: 'Academic Holiday Calendar', icon: 'calendar', iconType: 'feather', screen: 'holidays', color: '#EF4444' },
    { id: 'classes', label: 'Assigned Classes & Students', icon: 'users', iconType: 'feather', screen: 'timetable', color: '#8B5CF6' },
  ];

  const drawerSecondaryItems = [
    { id: 'profile', label: 'My Profile & Details', icon: 'user', iconType: 'feather', screen: 'profile', color: '#6366F1' },
    { id: 'settings', label: 'App Settings', icon: 'settings', iconType: 'feather', screen: 'settings', color: '#06B6D4' },
    { id: 'support', label: 'Helpdesk & Support', icon: 'help-circle', iconType: 'feather', screen: 'support', color: '#10B981' },
  ];

  const todaysClasses = [
    { id: '1', time: '08:00 - 08:45 AM', className: 'Class 5 - A', subject: 'Mathematics', room: 'Room 101', active: true },
    { id: '2', time: '09:00 - 09:45 AM', className: 'Class 6 - B', subject: 'Mathematics', room: 'Room 102', active: false },
    { id: '3', time: '11:00 - 11:45 AM', className: 'Class 7 - A', subject: 'Mathematics', room: 'Room 103', active: false },
  ];

  const openDrawer = () => {
    setIsDrawerOpen(true);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnim, {
        toValue: 1,
        duration: 250,
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

  const renderIcon = (item) => {
    return <FontAwesome5 name={item.icon} size={22} color={item.color} />;
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
            <Text style={styles.schoolHeaderSub}>BNORBIT SCHOOL ERP</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.iconCircle}
          activeOpacity={0.7}
          onPress={() => onNavigate && onNavigate('notices')}
        >
          <Ionicons name="notifications-outline" size={22} color="#1F2937" />
          <View style={styles.badgeDot}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Separate Punch In Card */}
        <TouchableOpacity
          style={styles.punchCard}
          activeOpacity={0.88}
          onPress={() => onNavigate('attendance')}
        >
          <View style={styles.punchCardLeft}>
            <View style={styles.punchIconCircle}>
              <Ionicons name="location" size={22} color="#10B981" />
            </View>
            <View style={styles.punchTextGroup}>
              <View style={styles.punchStatusRow}>
                <View style={styles.punchLiveDot} />
                <Text style={styles.punchStatusLabel}>Geo Attendance</Text>
              </View>
              <Text style={styles.punchMainTitle}>Punch In for Today</Text>
              <Text style={styles.punchSubText}>Thu, 02 Oct • School Campus</Text>
            </View>
          </View>

          <View style={styles.punchActionBtn}>
            <Text style={styles.punchActionBtnText}>Punch In</Text>
            <Feather name="arrow-right" size={15} color="#FFFFFF" style={{ marginLeft: 4 }} />
          </View>
        </TouchableOpacity>

        {/* Quick Menu Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionIconPill}>
              <Ionicons name="grid" size={14} color="#6366F1" />
            </View>
            <Text style={styles.sectionTitle}>Quick Services</Text>
          </View>
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>6 Actions</Text>
          </View>
        </View>

        {/* Quick Menu Grid (6 Items) */}
        <View style={styles.quickGridContainer}>
          {quickMenuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.gridCard}
              activeOpacity={0.75}
              onPress={() => onNavigate(item.screen)}
            >
              {item.badge && (
                <View style={[styles.cardTopBadge, { backgroundColor: item.color }]}>
                  <Text style={styles.cardTopBadgeText}>{item.badge}</Text>
                </View>
              )}

              <View
                style={[
                  styles.gridIconCircle,
                  {
                    backgroundColor: item.bg,
                    shadowColor: item.color,
                  },
                ]}
              >
                {renderIcon(item)}
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

        {/* Today's Classes Section */}
        <View style={[styles.sectionHeader, { marginTop: 6 }]}>
          <View style={styles.sectionTitleRow}>
            <View style={[styles.sectionIconPill, { backgroundColor: '#F0FDF4' }]}>
              <Ionicons name="time" size={14} color="#10B981" />
            </View>
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
          </View>
          <TouchableOpacity
            style={styles.viewAllBtn}
            onPress={() => onNavigate('timetable')}
            activeOpacity={0.7}
          >
            <Text style={styles.viewAllText}>View All</Text>
            <Feather name="arrow-right" size={13} color="#6366F1" style={{ marginLeft: 3 }} />
          </TouchableOpacity>
        </View>

        {/* Class Cards List */}
        {todaysClasses.map((c) => (
          <TouchableOpacity
            key={c.id}
            style={[
              styles.classCard,
              c.active && styles.classCardActiveBorder,
            ]}
            activeOpacity={0.85}
            onPress={() => onNavigate('timetable')}
          >
            {/* Left colored bar indicator */}
            <View
              style={[
                styles.classAccentBar,
                { backgroundColor: c.active ? '#10B981' : '#6366F1' },
              ]}
            />

            <View style={styles.classCardLeft}>
              <View
                style={[
                  styles.bookIconBg,
                  c.active && { backgroundColor: '#ECFDF5' },
                ]}
              >
                <Ionicons
                  name={c.active ? 'videocam' : 'book-outline'}
                  size={18}
                  color={c.active ? '#10B981' : '#6366F1'}
                />
              </View>

              <View style={styles.classDetails}>
                <View style={styles.classTimeRow}>
                  <Text style={styles.classTime}>{c.time}</Text>
                  {c.active && (
                    <View style={styles.liveTag}>
                      <View style={styles.liveDot} />
                      <Text style={styles.liveTagText}>ONGOING</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.className}>{c.className}</Text>

                <View style={styles.metaRow}>
                  <Text style={styles.classSubject}>{c.subject}</Text>
                  <Text style={styles.metaDot}>•</Text>
                  <View style={styles.roomPill}>
                    <Ionicons name="location-outline" size={11} color="#6B7280" />
                    <Text style={styles.roomText}>{c.room}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.startClassBtn,
                c.active ? styles.startBtnActive : styles.startBtnInactive,
              ]}
            >
              <Text
                style={[
                  styles.startBtnText,
                  c.active ? styles.startBtnTextActive : styles.startBtnTextInactive,
                ]}
              >
                {c.active ? 'Start' : 'View'}
              </Text>
              <Feather
                name={c.active ? 'play' : 'chevron-right'}
                size={12}
                color={c.active ? '#FFFFFF' : '#6B7280'}
                style={{ marginLeft: 4 }}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Side Navigation Drawer Modal */}
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
              colors={['#4F46E5', '#6366F1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.drawerHeader}
            >
              <View style={styles.drawerHeaderTop}>
                <View style={styles.drawerAvatarCircle}>
                  <FontAwesome5 name="chalkboard-teacher" size={24} color="#4F46E5" />
                </View>
                <TouchableOpacity
                  style={styles.closeDrawerBtn}
                  onPress={() => closeDrawer()}
                >
                  <Ionicons name="close" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              <Text style={styles.drawerUserName}>{user.name}</Text>
              <Text style={styles.drawerUserRole}>Staff ID: EMP-2024-08</Text>
              <View style={styles.drawerBadge}>
                <Text style={styles.drawerBadgeText}>{user.subject}</Text>
              </View>
            </LinearGradient>

            {/* Drawer Menu List */}
            <ScrollView
              style={styles.drawerScroll}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10 }}
            >
              <Text style={styles.drawerSectionHeading}>MAIN NAVIGATION</Text>
              {drawerMenuItems.map((item) => (
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

              <Text style={styles.drawerSectionHeading}>ACCOUNT & PREFERENCES</Text>
              {drawerSecondaryItems.map((item) => (
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
                <Text style={styles.drawerLogoutText}>Log Out</Text>
              </TouchableOpacity>
              <Text style={styles.drawerAppVersion}>BNOrbit ERP v2.4.0 • Build 2026</Text>
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
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 36 : 10,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3E8FF',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#EF4444',
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: 34,
    height: 34,
    marginRight: 8,
  },
  schoolHeaderTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#312E81',
    fontFamily: Platform.OS === 'ios' ? 'Palatino-Bold' : 'serif',
  },
  schoolHeaderSub: {
    fontSize: 9,
    fontWeight: '700',
    color: '#818CF8',
    letterSpacing: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EDE9FE',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarWrapper: {
    marginRight: 14,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#C7D2FE',
  },
  profileInfo: {
    flex: 1,
  },
  greetingText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  teacherName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
    marginTop: 1,
  },
  teacherRole: {
    fontSize: 12,
    color: '#6366F1',
    fontWeight: '600',
    marginTop: 2,
  },
  checkInBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  checkInLeft: {
    flex: 1,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  bannerDate: {
    fontSize: 12,
    color: '#E0E7FF',
    fontWeight: '600',
    marginLeft: 6,
  },
  bannerStatus: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  checkInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  punchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    marginTop: 2,
    borderWidth: 1.2,
    borderColor: '#D1FAE5',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  punchCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  punchIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  punchTextGroup: {
    flex: 1,
  },
  punchStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  punchLiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 5,
  },
  punchStatusLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  punchMainTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  punchSubText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 1,
  },
  punchActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  punchActionBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 4,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIconPill: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E1B4B',
    letterSpacing: -0.2,
  },
  countBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6366F1',
  },
  quickGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridCard: {
    width: '31.2%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingTop: 16,
    paddingBottom: 14,
    paddingHorizontal: 6,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
    shadowColor: '#1E1B4B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  cardTopBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  cardTopBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  gridIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  gridTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
  },
  gridSubtitle: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 2,
  },
  classCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
    shadowColor: '#1E1B4B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  classCardActiveBorder: {
    borderColor: '#A7F3D0',
    backgroundColor: '#F0FDF4',
  },
  classAccentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  classCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 4,
  },
  bookIconBg: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  classDetails: {
    flex: 1,
  },
  classTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  classTime: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '700',
  },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 4,
  },
  liveTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#059669',
  },
  className: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  classSubject: {
    fontSize: 11,
    color: '#6366F1',
    fontWeight: '700',
  },
  metaDot: {
    color: '#CBD5E1',
    marginHorizontal: 5,
  },
  roomPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  roomText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    marginLeft: 2,
  },
  startClassBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    marginLeft: 8,
  },
  startBtnActive: {
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  startBtnInactive: {
    backgroundColor: '#F1F5F9',
  },
  startBtnText: {
    fontSize: 12,
    fontWeight: '800',
  },
  startBtnTextActive: {
    color: '#FFFFFF',
  },
  startBtnTextInactive: {
    color: '#64748B',
  },

  // Modal / Drawer Styles
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
  drawerAppVersion: {
    fontSize: 10,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '500',
  },
});
