import React, { useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated, Easing } from 'react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import getImage from '../utils/getImage';
import { grayBlue } from '../utils/config';

export default ({date, max, min, precipitation, weather}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const scaleYAnim = useRef(new Animated.Value(-1)).current;
  
  const animate = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1250,
        easing: Easing.bounce
      }),
      Animated.timing(scaleYAnim, {
        toValue: 1,
        delay: 1000,
        duration: 1000,
        easing: Easing.bounce,
      }),
    ]).start();
  };

  useEffect(() => {
    animate();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{format(date, 'dd iiii', { locale: ptBR })}</Text>
      <View style={styles.rowContainer}>
        <View style={styles.itemContainer}>
          <Animated.Image style={[
            styles.image,
            { transform: [ { scale: scaleAnim } ] }
          ]} source={getImage(weather)} />
          <Text style={styles.weather}>{weather}</Text>
        </View>
      <View style={styles.columnContainer}>
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperatureMax}>{max}°</Text>
          <Text style={styles.temperatureMin}>{min}°</Text>
        </View>
        <View style={styles.precipitationContainer}>
          <Text style={styles.precipitation}>{precipitation}%</Text>
          <Animated.Image style={[
            styles.imagePrecipitation,
            { transform: [ { scaleY: scaleYAnim } ] }
          ]} source={require('./../assets/raindrop.png')} />
        </View>
      </View>
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
    backgroundColor: grayBlue
  },
  image: {
    height: 96,
    width: 96,
    resizeMode: 'contain'
  },
  itemContainer: {
    alignItems: 'center'
  },
  temperatureContainer: {
    alignItems: 'center',
  },
  precipitationContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  columnContainer: {
    alignItems: 'center',
    justifyContent:'space-between',
    paddingTop: 16
  },
  date: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 8
  },
  temperatureMax: {
    color: '#fff',
    fontSize: 32
  },
  temperatureMin: {
    color: '#a5a5a5',
    fontSize: 24
  },
  precipitation: {
    color: '#fff',
    fontSize: 18
  },
  imagePrecipitation: {
    height: 12,
    width: 12,
    marginLeft: 8,
    resizeMode: 'contain'
  },
  weather: {
    color: '#fff',
    fontSize: 18
  },
});