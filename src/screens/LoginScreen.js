import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';

export default function LoginScreen({ onLoginSuccess }) {
  // 'teacher' or 'parent'
  const [role, setRole] = useState('teacher');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = () => {
    const userClean = username.trim().toLowerCase();
    const passClean = password.trim();

    if (!userClean || !passClean) {
      alert('Please enter both User ID and Password');
      return;
    }

    // Explicit Parent Credentials Detection
    const isParent =
      userClean === 'parent' ||
      userClean === 'parent123' ||
      userClean.startsWith('parent') ||
      userClean.includes('aarav') ||
      userClean.includes('kd-2023') ||
      userClean.includes('student');

    const userData = isParent
      ? {
          role: 'parent',
          username: 'Aarav Sharma',
          admissionNo: 'KD-2023-042',
          class: 'Class 4-B',
          rollNo: '14',
        }
      : {
          role: 'teacher',
          username: 'Rohit Kumar',
          subject: 'Mathematics Teacher',
          employeeId: 'EMP-2024-08',
        };

    if (onLoginSuccess) {
      onLoginSuccess(userData);
    } else {
      alert(`Logged in as ${userData.role}`);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#EDE9FE', '#F5F3FF', '#FAF5FF', '#FFFFFF']}
        locations={[0, 0.35, 0.7, 1]}
        style={StyleSheet.absoluteFillObject}
      />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={styles.topContentContainer}>
              {/* Top Header Section */}
              <View style={styles.headerSection}>
                <View style={styles.logoOuterWrapper}>
                  <Image
                    source={require('../../assets/image.png')}
                    style={styles.logoImage}
                    resizeMode="contain"
                  />
                </View>

                <Text style={styles.schoolName}>Kids' Dream English School</Text>

                <View style={styles.badgeContainer}>
                  <LinearGradient
                    colors={['#6366F1', '#4F46E5']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.badgeGradient}
                  >
                    <Text style={styles.schoolSubtext}>BNORBIT SCHOOL ERP</Text>
                  </LinearGradient>
                </View>
              </View>

              {/* Login Card Block */}
              <View style={styles.loginCardBlock}>
                {/* Username & Password in the Middle */}
                <View style={styles.middleInputsWrapper}>
                  {/* Username Input */}
                  <View style={styles.inputWrapper}>
                    <Feather name="user" size={20} color="#818CF8" style={styles.inputIcon} />
                    <TextInput
                      placeholder="Username or Email"
                      placeholderTextColor="#9CA3AF"
                      style={styles.input}
                      value={username}
                      onChangeText={setUsername}
                      autoCapitalize="none"
                    />
                  </View>

                  {/* Password Input */}
                  <View style={styles.inputWrapper}>
                    <Feather name="lock" size={20} color="#818CF8" style={styles.inputIcon} />
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor="#9CA3AF"
                      secureTextEntry={!showPassword}
                      style={styles.input}
                      value={password}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeButton}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Feather
                        name={showPassword ? 'eye' : 'eye-off'}
                        size={18}
                        color="#818CF8"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* 3. Remember Me & Forgot Password */}
                <View style={styles.rowOptions}>
                  <TouchableOpacity
                    style={styles.rememberMeRow}
                    activeOpacity={0.7}
                    onPress={() => setRememberMe(!rememberMe)}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        rememberMe ? styles.checkboxChecked : styles.checkboxUnchecked,
                      ]}
                    >
                      {rememberMe && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                    </View>
                    <Text style={styles.rememberText}>Remember me</Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={0.7}>
                    <Text style={styles.forgotText}>Forgot password?</Text>
                  </TouchableOpacity>
                </View>

                {/* 4. Dynamic Login Button */}
                <View style={styles.loginBtnWrapper}>
                  <TouchableOpacity
                    activeOpacity={0.88}
                    onPress={handleLogin}
                    style={styles.loginButtonContainer}
                  >
                    <LinearGradient
                      colors={['#4F46E5', '#6366F1']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.loginGradient}
                    >
                      <Text style={styles.loginButtonText}>Sign In to Dashboard</Text>
                      <View style={styles.btnIconCircle}>
                        <Feather name="arrow-right" size={18} color="#FFFFFF" />
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Bottom Illustration & Branding Footer */}
            <View style={styles.footerSection}>
              {/* Illustration Graphic Card */}
              <View style={styles.illustrationCard}>
                <View style={styles.schoolGraphic}>
                  <Ionicons name="school" size={40} color="#6366F1" />
                  <View style={styles.decorativeTrees}>
                    <Ionicons name="leaf" size={16} color="#10B981" />
                    <Ionicons name="sunny" size={20} color="#F59E0B" style={{ marginHorizontal: 6 }} />
                    <Ionicons name="leaf" size={16} color="#10B981" />
                  </View>
                </View>
              </View>

              {/* Taglines */}
              <Text style={styles.tagline}>
                Empowering Education Together
              </Text>
              <Text style={styles.brandCredit}>
                Designed by <Text style={styles.brandHighlight}>BN IntelHub Pvt Ltd</Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF5FF',
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 24 : 14,
    paddingBottom: 20,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  topContentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  headerSection: {
    alignItems: 'center',
    width: '100%',
    marginTop: 64,
  },
  logoOuterWrapper: {
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 200,
    height: 200,
  },
  schoolName: {
    fontSize: 23,
    fontWeight: '900',
    color: '#1E1B4B',
    textAlign: 'center',
    letterSpacing: 0.4,
    fontFamily: Platform.OS === 'ios' ? 'Palatino-Bold' : 'serif',
    textShadowColor: 'rgba(99, 102, 241, 0.28)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  badgeContainer: {
    marginTop: 4,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  badgeGradient: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
  },
  schoolSubtext: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 2,
    textAlign: 'center',
  },
  loginCardBlock: {
    width: '100%',
    marginTop: 18,
    marginBottom: 10,
  },
  roleToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 4,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    marginTop: -80,
    marginBottom: 8,
  },
  roleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 26,
  },
  roleButtonActive: {
    backgroundColor: '#6366F1',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  roleButtonInactive: {
    backgroundColor: 'transparent',
  },
  roleIcon: {
    marginRight: 8,
  },
  roleText: {
    fontSize: 14,
    fontWeight: '700',
  },
  roleTextActive: {
    color: '#FFFFFF',
  },
  roleTextInactive: {
    color: '#6B7280',
  },
  middleInputsWrapper: {
    marginTop: 12,
    marginBottom: 4,
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: '#EDE9FE',
    shadowColor: '#4338CA',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '500',
  },
  eyeButton: {
    padding: 4,
  },
  rowOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  rememberMeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#6366F1',
  },
  checkboxUnchecked: {
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  rememberText: {
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '600',
  },
  forgotText: {
    fontSize: 13,
    color: '#6366F1',
    fontWeight: '700',
  },
  loginBtnWrapper: {
    marginTop: 18,
    width: '100%',
  },
  loginButtonContainer: {
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#4338CA',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.42,
    shadowRadius: 14,
    elevation: 8,
  },
  loginGradient: {
    flexDirection: 'row',
    height: 56,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  btnIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerSection: {
    alignItems: 'center',
    paddingTop: 8,
    width: '100%',
  },
  illustrationCard: {
    width: '100%',
    height: 64,
    backgroundColor: '#EEF2FF',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  schoolGraphic: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  decorativeTrees: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 14,
  },
  tagline: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 2,
    textAlign: 'center',
  },
  brandCredit: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  brandHighlight: {
    color: '#6366F1',
    fontWeight: '600',
  },
});
