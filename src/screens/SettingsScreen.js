import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Switch,
  Alert,
} from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function SettingsScreen({ onBack, onLogout }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [autoCheckInReminder, setAutoCheckInReminder] = useState(true);
  const [offlineSync, setOfflineSync] = useState(true);

  const handleClearCache = () => {
    Alert.alert('Clear Cache', 'Are you sure you want to clear temporary offline cache (4.2 MB)?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: () => Alert.alert('Success', 'Cache cleared successfully!') },
    ]);
  };

  const handlePasswordChange = () => {
    Alert.alert('Reset Password', 'A secure password reset OTP link has been sent to your registered email (rohit.kumar@kidsdream.edu).');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={onBack}>
          <Feather name="chevron-left" size={24} color="#1E1B4B" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>App Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Section 1: Notifications & Alerts */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>NOTIFICATIONS & ALERTS</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#EEF2FF' }]}>
                <Ionicons name="notifications" size={18} color="#4F46E5" />
              </View>
              <View>
                <Text style={styles.settingLabel}>Push Notifications</Text>
                <Text style={styles.settingSub}>Notices, circulars & school alerts</Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#CBD5E1', true: '#6366F1' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#ECFDF5' }]}>
                <Ionicons name="volume-high" size={18} color="#10B981" />
              </View>
              <View>
                <Text style={styles.settingLabel}>In-App Sounds</Text>
                <Text style={styles.settingSub}>Punch in & notification chimes</Text>
              </View>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#CBD5E1', true: '#10B981' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="alarm" size={18} color="#F59E0B" />
              </View>
              <View>
                <Text style={styles.settingLabel}>Attendance Reminder</Text>
                <Text style={styles.settingSub}>Daily alert at 07:45 AM before assembly</Text>
              </View>
            </View>
            <Switch
              value={autoCheckInReminder}
              onValueChange={setAutoCheckInReminder}
              trackColor={{ false: '#CBD5E1', true: '#F59E0B' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Section 2: Security & Privacy */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>SECURITY & PRIVACY</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#FDF2F8' }]}>
                <Ionicons name="finger-print" size={18} color="#EC4899" />
              </View>
              <View>
                <Text style={styles.settingLabel}>Biometric / Face ID Unlock</Text>
                <Text style={styles.settingSub}>Quick biometric verification</Text>
              </View>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: '#CBD5E1', true: '#EC4899' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <TouchableOpacity style={styles.actionRow} activeOpacity={0.7} onPress={handlePasswordChange}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#EEF2FF' }]}>
                <Feather name="lock" size={18} color="#4F46E5" />
              </View>
              <View>
                <Text style={styles.settingLabel}>Change Password</Text>
                <Text style={styles.settingSub}>Update current login credentials</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={18} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Section 3: Data & Offline Storage */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>DATA & OFFLINE CACHE</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#ECFEFF' }]}>
                <Feather name="cloud" size={18} color="#06B6D4" />
              </View>
              <View>
                <Text style={styles.settingLabel}>Offline Data Caching</Text>
                <Text style={styles.settingSub}>Save timetable & students offline</Text>
              </View>
            </View>
            <Switch
              value={offlineSync}
              onValueChange={setOfflineSync}
              trackColor={{ false: '#CBD5E1', true: '#06B6D4' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <TouchableOpacity style={styles.actionRow} activeOpacity={0.7} onPress={handleClearCache}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconBox, { backgroundColor: '#FEF2F2' }]}>
                <Feather name="trash-2" size={18} color="#EF4444" />
              </View>
              <View>
                <Text style={[styles.settingLabel, { color: '#EF4444' }]}>Clear App Cache</Text>
                <Text style={styles.settingSub}>Free up 4.2 MB cached files</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>

        {/* App Info Card */}
        <View style={styles.appInfoBox}>
          <Text style={styles.appInfoTitle}>Kids' Dream English School ERP</Text>
          <Text style={styles.appInfoVer}>Version 2.4.0 (Build 2026.10)</Text>
          <Text style={styles.appInfoSub}>Powered by BNOrbit Educational Solutions</Text>
        </View>
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
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: '#64748B',
    letterSpacing: 0.6,
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  settingSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  appInfoBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  appInfoTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E1B4B',
  },
  appInfoVer: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  appInfoSub: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 1,
  },
});
