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
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TransportScreen({
  onBack,
  student = {
    name: 'Aarav Sharma',
    class: 'Class 4 - B',
    rollNo: '14',
    admissionNo: 'KD-2023-042',
  },
}) {
  const [activeShift, setActiveShift] = useState('morning'); // 'morning' | 'afternoon'

  const busDetails = {
    busNumber: 'Bus 04 (DL-01-AB-4021)',
    routeName: 'Route 4: Green Park - Model Town - School Campus',
    status: 'In Transit',
    speed: '34 km/h',
    driverName: 'Suresh Yadav',
    driverPhone: '+91 98765 43210',
    conductorName: 'Rameshwar Lal',
    conductorPhone: '+91 98765 12345',
    currentLocation: 'Near Metro Pillar #142, Outer Ring Road',
    etaToYourStop: '7 Minutes',
    distanceToStop: '1.8 km',
    assignedStop: 'Green Park Central Block (Gate 2)',
    assignedMorningTime: '07:22 AM',
    assignedDropTime: '02:15 PM',
  };

  const morningStops = [
    {
      id: 'st-1',
      name: 'Depot / Starting Point',
      time: '06:45 AM',
      status: 'completed',
    },
    {
      id: 'st-2',
      name: 'Ashok Vihar Phase 2',
      time: '07:05 AM',
      status: 'completed',
    },
    {
      id: 'st-3',
      name: 'Model Town Metro Crossing',
      time: '07:14 AM',
      status: 'completed',
    },
    {
      id: 'st-4',
      name: 'Green Park Central Block (Your Child’s Stop)',
      time: '07:22 AM',
      status: 'current', // Next arriving
      isChildStop: true,
    },
    {
      id: 'st-5',
      name: 'Shalimar Bagh Sector 4',
      time: '07:35 AM',
      status: 'upcoming',
    },
    {
      id: 'st-6',
      name: 'Kids\' Dream English School Campus',
      time: '07:50 AM',
      status: 'upcoming',
    },
  ];

  const afternoonStops = [
    {
      id: 'ast-1',
      name: 'School Campus Exit Gate',
      time: '01:40 PM',
      status: 'upcoming',
    },
    {
      id: 'ast-2',
      name: 'Shalimar Bagh Sector 4',
      time: '01:58 PM',
      status: 'upcoming',
    },
    {
      id: 'ast-3',
      name: 'Green Park Central Block (Your Child’s Stop)',
      time: '02:15 PM',
      status: 'upcoming',
      isChildStop: true,
    },
    {
      id: 'ast-4',
      name: 'Model Town Crossing',
      time: '02:25 PM',
      status: 'upcoming',
    },
    {
      id: 'ast-5',
      name: 'Ashok Vihar Phase 2',
      time: '02:38 PM',
      status: 'upcoming',
    },
  ];

  const currentStops = activeShift === 'morning' ? morningStops : afternoonStops;

  const handleCall = (phoneNumber, name) => {
    Alert.alert(
      `Call ${name}`,
      `Do you want to dial ${phoneNumber}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call Now',
          onPress: () => {
            Linking.openURL(`tel:${phoneNumber}`).catch(() => {
              Alert.alert('Unable to make call', 'Telephone dialing is not supported on this device emulator.');
            });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <LinearGradient
        colors={['#14B8A6', '#0D9488']}
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
            <Text style={styles.headerTitle}>School Transport & GPS</Text>
            <Text style={styles.headerSubtitle}>Real-time Bus Tracking</Text>
          </View>
          <TouchableOpacity
            style={styles.headerActionBtn}
            onPress={() => Alert.alert('GPS Refreshed', 'Live telemetry and satellite fix updated.')}
            activeOpacity={0.7}
          >
            <Feather name="refresh-cw" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Student Vehicle Chip */}
        <View style={styles.studentChip}>
          <View style={styles.busIconBadge}>
            <FontAwesome5 name="bus" size={16} color="#0D9488" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.busNumText}>{busDetails.busNumber}</Text>
            <Text style={styles.busRouteText}>{busDetails.routeName}</Text>
          </View>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>

        {/* Shift Tabs */}
        <View style={styles.shiftTabRow}>
          <TouchableOpacity
            style={[
              styles.shiftTab,
              activeShift === 'morning' && styles.shiftTabActive,
            ]}
            onPress={() => setActiveShift('morning')}
          >
            <Feather
              name="sun"
              size={13}
              color={activeShift === 'morning' ? '#0D9488' : '#FFFFFF'}
            />
            <Text
              style={[
                styles.shiftTabText,
                activeShift === 'morning' && styles.shiftTabTextActive,
              ]}
            >
              Morning Pickup (07:22 AM)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.shiftTab,
              activeShift === 'afternoon' && styles.shiftTabActive,
            ]}
            onPress={() => setActiveShift('afternoon')}
          >
            <Feather
              name="home"
              size={13}
              color={activeShift === 'afternoon' ? '#0D9488' : '#FFFFFF'}
            />
            <Text
              style={[
                styles.shiftTabText,
                activeShift === 'afternoon' && styles.shiftTabTextActive,
              ]}
            >
              Drop Route (02:15 PM)
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* GPS Live Telemetry Simulation Card */}
        <View style={styles.mapSimulationCard}>
          <View style={styles.mapVisualHeader}>
            <View style={styles.mapPulseMarker}>
              <View style={styles.pulseRing} />
              <FontAwesome5 name="bus" size={14} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.currentLocLabel}>CURRENT BUS LOCATION</Text>
              <Text style={styles.currentLocText}>{busDetails.currentLocation}</Text>
            </View>
            <View style={styles.speedPill}>
              <Text style={styles.speedPillText}>{busDetails.speed}</Text>
            </View>
          </View>

          {/* Graphical ETA Box */}
          <View style={styles.etaBox}>
            <View style={styles.etaCol}>
              <Text style={styles.etaSmall}>ESTIMATED ARRIVAL</Text>
              <Text style={styles.etaLarge}>{busDetails.etaToYourStop}</Text>
            </View>
            <View style={styles.etaDivider} />
            <View style={styles.etaCol}>
              <Text style={styles.etaSmall}>DISTANCE</Text>
              <Text style={styles.distLarge}>{busDetails.distanceToStop}</Text>
            </View>
          </View>

          <View style={styles.stopDestinationRow}>
            <Ionicons name="pin" size={16} color="#0D9488" />
            <Text style={styles.destinationText}>
              Destination Stop: <Text style={{ fontWeight: '700' }}>{busDetails.assignedStop}</Text>
            </Text>
          </View>
        </View>

        {/* Driver & Support Staff Card */}
        <View style={styles.staffCard}>
          <Text style={styles.sectionHeaderTitle}>Transport Crew</Text>
          <View style={styles.staffRow}>
            <View style={styles.staffInfo}>
              <View style={styles.avatarCircle}>
                <Feather name="user" size={16} color="#0D9488" />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.staffName}>{busDetails.driverName}</Text>
                <Text style={styles.staffRole}>Designated School Driver</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.callButton}
              onPress={() => handleCall(busDetails.driverPhone, busDetails.driverName)}
              activeOpacity={0.8}
            >
              <Ionicons name="call" size={15} color="#FFFFFF" />
              <Text style={styles.callBtnText}>Call</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.staffDivider} />

          <View style={styles.staffRow}>
            <View style={styles.staffInfo}>
              <View style={[styles.avatarCircle, { backgroundColor: '#F0FDFA' }]}>
                <Feather name="shield" size={16} color="#14B8A6" />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.staffName}>{busDetails.conductorName}</Text>
                <Text style={styles.staffRole}>Bus Incharge / Conductor</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.callButton, { backgroundColor: '#0D9488' }]}
              onPress={() => handleCall(busDetails.conductorPhone, busDetails.conductorName)}
              activeOpacity={0.8}
            >
              <Ionicons name="call" size={15} color="#FFFFFF" />
              <Text style={styles.callBtnText}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Route Stops Timeline */}
        <View style={styles.timelineCard}>
          <View style={styles.timelineHeader}>
            <Text style={styles.sectionHeaderTitle}>Route Stops & Schedule</Text>
            <Text style={styles.timelineTotalText}>
              {currentStops.length} Total Waypoints
            </Text>
          </View>

          {currentStops.map((stop, index) => {
            const isCompleted = stop.status === 'completed';
            const isCurrent = stop.status === 'current';
            const isLast = index === currentStops.length - 1;

            return (
              <View key={stop.id} style={styles.timelineItem}>
                {/* Node icon & vertical connector line */}
                <View style={styles.timelineTrack}>
                  <View
                    style={[
                      styles.nodeCircle,
                      isCompleted && styles.nodeCompleted,
                      isCurrent && styles.nodeCurrent,
                    ]}
                  >
                    {isCompleted ? (
                      <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                    ) : isCurrent ? (
                      <FontAwesome5 name="bus" size={10} color="#FFFFFF" />
                    ) : (
                      <View style={styles.nodeUpcomingInner} />
                    )}
                  </View>
                  {!isLast && (
                    <View
                      style={[
                        styles.trackLine,
                        isCompleted && styles.trackLineActive,
                      ]}
                    />
                  )}
                </View>

                {/* Stop content */}
                <View
                  style={[
                    styles.stopContent,
                    stop.isChildStop && styles.childStopHighlight,
                  ]}
                >
                  <View style={styles.stopNameRow}>
                    <Text
                      style={[
                        styles.stopNameText,
                        stop.isChildStop && styles.childStopNameText,
                      ]}
                    >
                      {stop.name}
                    </Text>
                    <Text style={styles.stopTimeText}>{stop.time}</Text>
                  </View>

                  {stop.isChildStop && (
                    <View style={styles.childStopBadge}>
                      <Ionicons name="person" size={11} color="#0D9488" />
                      <Text style={styles.childStopBadgeText}>
                        Your Assigned Boarding Stop
                      </Text>
                    </View>
                  )}

                  {isCurrent && (
                    <Text style={styles.approachingText}>
                      Bus arriving here in ~{busDetails.etaToYourStop}
                    </Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* Safety & SOS Section */}
        <View style={styles.sosCard}>
          <MaterialCommunityIcons
            name="security"
            size={24}
            color="#0D9488"
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.sosTitle}>Transport Safety & CCTV Active</Text>
            <Text style={styles.sosSub}>
              All buses are equipped with Speed Governors, GPS geo-fencing, female bus attendant, and interior HD CCTV surveillance.
            </Text>
          </View>
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
  busIconBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  busNumText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  busRouteText: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 1,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    marginRight: 4,
  },
  liveText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  shiftTabRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
    borderRadius: 12,
    padding: 3,
  },
  shiftTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    borderRadius: 9,
  },
  shiftTabActive: {
    backgroundColor: '#FFFFFF',
  },
  shiftTabText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginLeft: 6,
  },
  shiftTabTextActive: {
    color: '#0D9488',
    fontWeight: '700',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 36,
  },
  mapSimulationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#CCFBF1',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  mapVisualHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  mapPulseMarker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0D9488',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentLocLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.6,
  },
  currentLocText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 2,
  },
  speedPill: {
    backgroundColor: '#CCFBF1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  speedPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0F766E',
  },
  etaBox: {
    flexDirection: 'row',
    backgroundColor: '#F0FDFA',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#99F6E4',
    marginBottom: 10,
  },
  etaCol: {
    flex: 1,
    alignItems: 'center',
  },
  etaSmall: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0F766E',
    letterSpacing: 0.5,
  },
  etaLarge: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0D9488',
    marginTop: 2,
  },
  distLarge: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 2,
  },
  etaDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#99F6E4',
  },
  stopDestinationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  destinationText: {
    fontSize: 11,
    color: '#64748B',
    marginLeft: 6,
  },
  staffCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionHeaderTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 10,
  },
  staffRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  staffInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#CCFBF1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  staffName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E293B',
  },
  staffRole: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 1,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#14B8A6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  callBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  staffDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  timelineTotalText: {
    fontSize: 11,
    color: '#64748B',
  },
  timelineItem: {
    flexDirection: 'row',
  },
  timelineTrack: {
    width: 28,
    alignItems: 'center',
  },
  nodeCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  nodeCompleted: {
    backgroundColor: '#10B981',
  },
  nodeCurrent: {
    backgroundColor: '#0D9488',
    borderWidth: 2,
    borderColor: '#99F6E4',
  },
  nodeUpcomingInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  trackLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 2,
    minHeight: 28,
  },
  trackLineActive: {
    backgroundColor: '#10B981',
  },
  stopContent: {
    flex: 1,
    paddingBottom: 16,
    paddingLeft: 8,
  },
  childStopHighlight: {
    backgroundColor: '#F0FDFA',
    borderRadius: 10,
    padding: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#CCFBF1',
  },
  stopNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  stopNameText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    flex: 1,
    paddingRight: 6,
  },
  childStopNameText: {
    fontWeight: '700',
    color: '#0F766E',
  },
  stopTimeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  childStopBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  childStopBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0D9488',
    marginLeft: 4,
  },
  approachingText: {
    fontSize: 10,
    color: '#0D9488',
    fontWeight: '600',
    marginTop: 4,
  },
  sosCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDFA',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#99F6E4',
  },
  sosTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F766E',
  },
  sosSub: {
    fontSize: 11,
    color: '#115E59',
    marginTop: 2,
    lineHeight: 15,
  },
});
