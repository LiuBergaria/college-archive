import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated, Easing } from 'react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import getImage from '../utils/getImage';
import { grayBlue } from '../utils/config';

export default ({date, max, min, precipitation, weather, delayLevel = 0}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const scaleYAnim = useRef(new Animated.Value(-1)).current;
  
  const animate = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        delay: (200 * delayLevel),
        duration: 1250,
        easing: Easing.bounce
      }),
      Animated.timing(scaleYAnim, {
        toValue: 1,
        delay: 1000 + (200 * delayLevel),
        duration: 1000,
        easing: Easing.bounce
      })
    ]).start();
  };

  useEffect(() => {
    animate();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.date}>{format(date, 'dd', { locale: ptBR })}</Text>
        <Text style={styles.dateWeek}>{format(date, 'iiii', { locale: ptBR }).slice(0, 3).toUpperCase()}</Text>
      </View>
      <Animated.Image style={[
        styles.image,
        { transform: [ { scale: scaleAnim } ] }
      ]} source={getImage(weather)} />
      <View style={styles.itemContainer}>
        <Text style={styles.temperatureMax}>{max}°</Text>
        <Text style={styles.temperatureMin}>{min}°</Text>
      </View>
      <View style={styles.itemContainerRow}>
        <Text style={styles.precipitation}>{precipitation}%</Text>
        <Animated.Image style={[
            styles.imagePrecipitation,
            { transform: [ { scaleY: scaleYAnim } ] }
          ]} source={require('./../assets/raindrop.png')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginTop: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: grayBlue,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center'
  },
  image: {
    height: 64,
    width: 64,
    resizeMode: 'contain'
  },
  itemContainer: {
    alignItems: 'center'
  },
  itemContainerRow: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  date: {
    color: '#fff',
    fontSize: 20
  },
  dateWeek: {
    color: '#fff'
  },
  temperatureMin: {
    color: '#a5a5a5',
    fontSize: 20
  },
  temperatureMax: {
    color: '#fff',
    fontSize: 22
  },
  precipitation: {
    color: '#fff',
    fontSize: 18
  },
  imagePrecipitation: {
    height: 12,
    width: 12,
    marginLeft: 8,
    resizeMode: 'contain',
  },
});