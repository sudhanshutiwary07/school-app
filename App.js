import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import LoginScreen from './src/screens/LoginScreen';
import TeacherHomeScreen from './src/screens/TeacherHomeScreen';
import ParentHomeScreen from './src/screens/ParentHomeScreen';
import AttendanceScreen from './src/screens/AttendanceScreen';
import TimetableScreen from './src/screens/TimetableScreen';
import PayslipScreen from './src/screens/PayslipScreen';
import LeaveScreen from './src/screens/LeaveScreen';
import NoticesHolidaysScreen from './src/screens/NoticesHolidaysScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import HelpdeskScreen from './src/screens/HelpdeskScreen';
import ChildAttendanceScreen from './src/screens/ChildAttendanceScreen';
import MarksheetScreen from './src/screens/MarksheetScreen';
import ExamScheduleScreen from './src/screens/ExamScheduleScreen';
import HomeworkScreen from './src/screens/HomeworkScreen';
import FeeReceiptsScreen from './src/screens/FeeReceiptsScreen';
import TransportScreen from './src/screens/TransportScreen';

export default function App() {
  // Screen routing state: 'login' | 'teacher_home' | 'parent_home' | 'attendance' | 'timetable' | 'payslip' | 'leave' | 'notices' | 'holidays' | 'profile' | 'settings' | 'support' | 'child_attendance'
  const [currentScreen, setCurrentScreen] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    if (userData?.role === 'parent') {
      setCurrentScreen('parent_home');
    } else {
      setCurrentScreen('teacher_home');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('login');
  };

  const homeScreenName = currentUser?.role === 'parent' ? 'parent_home' : 'teacher_home';

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Screen Routing */}
      {currentScreen === 'login' && (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      )}

      {currentScreen === 'teacher_home' && (
        <TeacherHomeScreen
          user={{
            name: currentUser?.username || 'Rohit Kumar',
            subject: 'Mathematics Teacher',
          }}
          onNavigate={(screen) => setCurrentScreen(screen)}
          onLogout={handleLogout}
        />
      )}

      {currentScreen === 'parent_home' && (
        <ParentHomeScreen
          user={{
            name: currentUser?.username || 'Aarav Sharma',
            class: 'Class 4-B',
            rollNo: '14',
          }}
          onNavigate={(screen) => setCurrentScreen(screen)}
        />
      )}

      {/* Module 9: Child Attendance (Parent View) */}
      {currentScreen === 'child_attendance' && (
        <ChildAttendanceScreen
          student={{
            name: currentUser?.username || 'Aarav Sharma',
            class: 'Class 4 - B',
            rollNo: '14',
            admissionNo: 'KD-2023-042',
          }}
          onBack={() => setCurrentScreen(homeScreenName)}
        />
      )}

      {/* Module 10: Marksheet (Parent View) */}
      {currentScreen === 'marksheet' && (
        <MarksheetScreen
          student={{
            name: currentUser?.username || 'Aarav Sharma',
            class: 'Class 4 - B',
            rollNo: '14',
            admissionNo: 'KD-2023-042',
          }}
          onBack={() => setCurrentScreen(homeScreenName)}
        />
      )}

      {/* Module 10: Exam Schedule & Routine */}
      {currentScreen === 'exam_schedule' && (
        <ExamScheduleScreen
          student={{
            name: currentUser?.username || 'Aarav Sharma',
            class: 'Class 4 - B',
            rollNo: '14',
            admissionNo: 'KD-2023-042',
          }}
          onBack={() => setCurrentScreen(homeScreenName)}
        />
      )}

      {/* Module 12: Homework & Assignments */}
      {currentScreen === 'homework' && (
        <HomeworkScreen
          student={{
            name: currentUser?.username || 'Aarav Sharma',
            class: 'Class 4 - B',
            rollNo: '14',
            admissionNo: 'KD-2023-042',
          }}
          onBack={() => setCurrentScreen(homeScreenName)}
        />
      )}

      {/* Module 11: Fee Receipts & Online Payment */}
      {currentScreen === 'fee_receipts' && (
        <FeeReceiptsScreen
          student={{
            name: currentUser?.username || 'Aarav Sharma',
            class: 'Class 4 - B',
            rollNo: '14',
            admissionNo: 'KD-2023-042',
          }}
          onBack={() => setCurrentScreen(homeScreenName)}
        />
      )}

      {/* Module 13: Transport GPS & Route Tracking */}
      {currentScreen === 'transport' && (
        <TransportScreen
          student={{
            name: currentUser?.username || 'Aarav Sharma',
            class: 'Class 4 - B',
            rollNo: '14',
            admissionNo: 'KD-2023-042',
          }}
          onBack={() => setCurrentScreen(homeScreenName)}
        />
      )}

      {currentScreen === 'attendance' && (
        <AttendanceScreen onBack={() => setCurrentScreen(homeScreenName)} />
      )}

      {currentScreen === 'timetable' && (
        <TimetableScreen onBack={() => setCurrentScreen(homeScreenName)} />
      )}

      {currentScreen === 'payslip' && (
        <PayslipScreen onBack={() => setCurrentScreen(homeScreenName)} />
      )}

      {currentScreen === 'leave' && (
        <LeaveScreen onBack={() => setCurrentScreen(homeScreenName)} />
      )}

      {currentScreen === 'notices' && (
        <NoticesHolidaysScreen initialTab="notices" onBack={() => setCurrentScreen(homeScreenName)} />
      )}

      {currentScreen === 'holidays' && (
        <NoticesHolidaysScreen initialTab="holidays" onBack={() => setCurrentScreen(homeScreenName)} />
      )}

      {currentScreen === 'profile' && (
        <ProfileScreen
          user={{
            name: currentUser?.username || 'Rohit Kumar',
            subject: 'Mathematics Teacher',
          }}
          onBack={() => setCurrentScreen(homeScreenName)}
        />
      )}

      {currentScreen === 'settings' && (
        <SettingsScreen
          onBack={() => setCurrentScreen(homeScreenName)}
          onLogout={handleLogout}
        />
      )}

      {currentScreen === 'support' && (
        <HelpdeskScreen onBack={() => setCurrentScreen(homeScreenName)} />
      )}

      {/* Bottom Navigation Bar when logged in */}
      {currentScreen !== 'login' && (
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setCurrentScreen(homeScreenName)}
          >
            <Ionicons
              name={currentScreen === homeScreenName ? 'home' : 'home-outline'}
              size={22}
              color={currentScreen === homeScreenName ? '#6366F1' : '#9CA3AF'}
            />
            <Text
              style={[
                styles.navText,
                currentScreen === homeScreenName && styles.navTextActive,
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setCurrentScreen('attendance')}
          >
            <Ionicons
              name={currentScreen === 'attendance' ? 'calendar' : 'calendar-outline'}
              size={22}
              color={currentScreen === 'attendance' ? '#6366F1' : '#9CA3AF'}
            />
            <Text
              style={[
                styles.navText,
                currentScreen === 'attendance' && styles.navTextActive,
              ]}
            >
              Attendance
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setCurrentScreen('timetable')}
          >
            <Ionicons
              name={currentScreen === 'timetable' ? 'time' : 'time-outline'}
              size={22}
              color={currentScreen === 'timetable' ? '#6366F1' : '#9CA3AF'}
            />
            <Text
              style={[
                styles.navText,
                currentScreen === 'timetable' && styles.navTextActive,
              ]}
            >
              Timetable
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setCurrentScreen('notices')}
          >
            <Ionicons
              name={currentScreen === 'notices' || currentScreen === 'holidays' ? 'notifications' : 'notifications-outline'}
              size={22}
              color={currentScreen === 'notices' || currentScreen === 'holidays' ? '#6366F1' : '#9CA3AF'}
            />
            <Text
              style={[
                styles.navText,
                (currentScreen === 'notices' || currentScreen === 'holidays') && styles.navTextActive,
              ]}
            >
              Notices
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={handleLogout}>
            <Feather name="log-out" size={22} color="#EF4444" />
            <Text style={[styles.navText, { color: '#EF4444' }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#EDE9FE',
    justifyContent: 'space-around',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    flex: 1,
  },
  navText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: 2,
  },
  navTextActive: {
    color: '#6366F1',
    fontWeight: '700',
  },
});
