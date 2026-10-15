import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 32; // 16 margin on left and right
const BANNER_HEIGHT = Math.round(BANNER_WIDTH * 0.52);

export default function BannerSlider() {
  return (
    <View style={styles.container}>
      <View style={styles.shadowWrapper}>
        <View style={styles.cardContainer}>
          <Image
            source={require('../../assets/banner/image.png')}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 14,
    alignItems: 'center',
  },
  shadowWrapper: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 10,
  },
  cardContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
});
