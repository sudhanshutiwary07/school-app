import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Image,
  Alert,
  TextInput,
  Switch,
} from 'react-native';
import { Feather, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen({ onBack, user = { name: 'Rohit Kumar', subject: 'Mathematics Teacher' } }) {
  const [activeTab, setActiveTab] = useState('personal'); // 'personal' | 'academic' | 'documents'
  const [isEditing, setIsEditing] = useState(false);

  // Editable profile state
  const [profileData, setProfileData] = useState({
    name: 'Rohit Kumar',
    designation: 'Senior Mathematics Teacher',
    employeeId: 'EMP-2024-08',
    email: 'rohit.kumar@kidsdream.edu',
    phone: '+91 98765 43210',
    bloodGroup: 'O+',
    dob: '14 Aug 1991',
    joiningDate: '01 Jul 2021',
    address: 'Flat 402, Green Valley Enclave, New Delhi - 110025',
    qualification: 'M.Sc (Mathematics), B.Ed (Gold Medalist)',
    experience: '7.5 Years Teaching Experience',
    department: 'Secondary Wing (Classes 6-10)',
    assignedClasses: 'Class 5-A, Class 7-B, Class 8-A',
    bankName: 'HDFC Bank Ltd.',
    accountNo: '•••• •••• 8921',
    ifsc: 'HDFC0001423',
    panNo: 'ABCDE1234F',
    aadhaarNo: '•••• •••• 9081',
  });

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Profile Updated', 'Your personal details have been updated successfully!');
  };

  const documents = [
    { id: '1', title: 'Aadhaar Card Copy', verified: true, size: '1.2 MB', date: 'Verified on Jul 2021' },
    { id: '2', title: 'PAN Card Copy', verified: true, size: '850 KB', date: 'Verified on Jul 2021' },
    { id: '3', title: 'B.Ed & Master Degree Certificates', verified: true, size: '3.4 MB', date: 'Verified on Jul 2021' },
    { id: '4', title: 'Experience Letter (Previous School)', verified: true, size: '1.8 MB', date: 'Verified on Jun 2021' },
    { id: '5', title: 'Teacher Appointment Letter', verified: true, size: '920 KB', date: 'Issued on 01 Jul 2021' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} activeOpacity={0.7} onPress={onBack}>
          <Feather name="chevron-left" size={24} color="#1E1B4B" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Teacher Profile</Text>
        <TouchableOpacity
          style={styles.editBtn}
          activeOpacity={0.7}
          onPress={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          <Feather name={isEditing ? 'check' : 'edit-2'} size={18} color="#4F46E5" />
          <Text style={styles.editBtnText}>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Hero Card */}
        <LinearGradient
          colors={['#1E1B4B', '#312E81']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.avatarWrapper}>
            <Image
              source={require('../../assets/image.png')}
              style={styles.avatarImage}
              resizeMode="contain"
            />
            <View style={styles.onlineBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
            </View>
          </View>

          <Text style={styles.userName}>{profileData.name}</Text>
          <Text style={styles.userRole}>{profileData.designation}</Text>

          <View style={styles.badgeRow}>
            <View style={styles.staffIdBadge}>
              <Text style={styles.staffIdText}>{profileData.employeeId}</Text>
            </View>
            <View style={styles.deptBadge}>
              <Text style={styles.deptText}>Maths Dept</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          {[
            { id: 'personal', label: 'Personal', icon: 'user' },
            { id: 'academic', label: 'Academic', icon: 'book' },
            { id: 'documents', label: 'KYC Docs', icon: 'file-text' },
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

        {/* Tab 1: Personal Info */}
        {activeTab === 'personal' && (
          <View style={styles.infoCard}>
            <Text style={styles.cardHeaderTitle}>Contact & Personal Details</Text>

            <View style={styles.fieldRow}>
              <View style={styles.fieldIconBox}>
                <Feather name="mail" size={16} color="#6366F1" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>Official Email</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.editInput}
                    value={profileData.email}
                    onChangeText={(t) => setProfileData({ ...profileData, email: t })}
                  />
                ) : (
                  <Text style={styles.fieldValue}>{profileData.email}</Text>
                )}
              </View>
            </View>

            <View style={styles.fieldRow}>
              <View style={styles.fieldIconBox}>
                <Feather name="phone" size={16} color="#10B981" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>Mobile Number</Text>
                {isEditing ? (
                  <TextInput
                    style={styles.editInput}
                    value={profileData.phone}
                    onChangeText={(t) => setProfileData({ ...profileData, phone: t })}
                  />
                ) : (
                  <Text style={styles.fieldValue}>{profileData.phone}</Text>
                )}
              </View>
            </View>

            <View style={styles.fieldRow}>
              <View style={styles.fieldIconBox}>
                <Ionicons name="water-outline" size={16} color="#EF4444" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>Blood Group</Text>
                <Text style={styles.fieldValue}>{profileData.bloodGroup}</Text>
              </View>
            </View>

            <View style={styles.fieldRow}>
              <View style={styles.fieldIconBox}>
                <Feather name="calendar" size={16} color="#F59E0B" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>Date of Birth</Text>
                <Text style={styles.fieldValue}>{profileData.dob}</Text>
              </View>
            </View>

            <View style={[styles.fieldRow, { borderBottomWidth: 0 }]}>
              <View style={styles.fieldIconBox}>
                <Feather name="map-pin" size={16} color="#8B5CF6" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>Residential Address</Text>
                {isEditing ? (
                  <TextInput
                    style={[styles.editInput, { height: 60 }]}
                    multiline
                    value={profileData.address}
                    onChangeText={(t) => setProfileData({ ...profileData, address: t })}
                  />
                ) : (
                  <Text style={styles.fieldValue}>{profileData.address}</Text>
                )}
              </View>
            </View>
          </View>
        )}

        {/* Tab 2: Academic & School Details */}
        {activeTab === 'academic' && (
          <View style={styles.infoCard}>
            <Text style={styles.cardHeaderTitle}>Teaching & Qualifications</Text>

            <View style={styles.fieldRow}>
              <View style={styles.fieldIconBox}>
                <Feather name="award" size={16} color="#4F46E5" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>Highest Qualification</Text>
                <Text style={styles.fieldValue}>{profileData.qualification}</Text>
              </View>
            </View>

            <View style={styles.fieldRow}>
              <View style={styles.fieldIconBox}>
                <Feather name="briefcase" size={16} color="#06B6D4" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>Total Experience</Text>
                <Text style={styles.fieldValue}>{profileData.experience}</Text>
              </View>
            </View>

            <View style={styles.fieldRow}>
              <View style={styles.fieldIconBox}>
                <Feather name="users" size={16} color="#10B981" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>Assigned Classes</Text>
                <Text style={styles.fieldValue}>{profileData.assignedClasses}</Text>
              </View>
            </View>

            <View style={[styles.fieldRow, { borderBottomWidth: 0 }]}>
              <View style={styles.fieldIconBox}>
                <Feather name="calendar" size={16} color="#F59E0B" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>School Joining Date</Text>
                <Text style={styles.fieldValue}>{profileData.joiningDate}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Tab 3: Documents / KYC */}
        {activeTab === 'documents' && (
          <View style={styles.infoCard}>
            <Text style={styles.cardHeaderTitle}>Verified Certificates & Documents</Text>

            {documents.map((doc) => (
              <View key={doc.id} style={styles.docItemRow}>
                <View style={styles.docIconCircle}>
                  <Ionicons name="document-text" size={18} color="#4F46E5" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.docTitle}>{doc.title}</Text>
                  <Text style={styles.docSub}>{doc.size} • {doc.date}</Text>
                </View>
                <View style={styles.verifiedChip}>
                  <Feather name="check" size={12} color="#10B981" style={{ marginRight: 2 }} />
                  <Text style={styles.verifiedChipText}>Verified</Text>
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
  screenTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    gap: 4,
  },
  editBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#4F46E5',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 40,
  },
  heroCard: {
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#1E1B4B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 4,
  },
  avatarWrapper: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FFFFFF',
    padding: 6,
    position: 'relative',
    marginBottom: 12,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 34,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  userRole: {
    fontSize: 13,
    color: '#C7D2FE',
    marginTop: 2,
    fontWeight: '600',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  staffIdBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  staffIdText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  deptBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  deptText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    padding: 4,
    borderRadius: 14,
    marginBottom: 16,
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
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  infoCard: {
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
  },
  cardHeaderTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 14,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  fieldIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  fieldLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  fieldValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
  },
  editInput: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4F46E5',
    borderBottomWidth: 1,
    borderBottomColor: '#4F46E5',
    paddingVertical: 2,
    marginTop: 2,
  },
  docItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  docIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  docTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  docSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  verifiedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  verifiedChipText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
  },
});
