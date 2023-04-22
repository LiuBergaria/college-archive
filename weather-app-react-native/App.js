import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, StatusBar, Alert, Animated, Easing, ActivityIndicator } from 'react-native';
import { getTime } from 'date-fns';
import axios from 'axios';

import WeatherBlock from './components/WeatherBlock';
import WeatherBlockExpanded from './components/WeatherBlockExpanded';
import Input from './components/Input';
import Creation from './components/Creation';

import { endpoint, yellow, darkBlue } from './utils/config';

const renderWeatherBlock = (weather, index) => {
  return (index === 0) ? <WeatherBlockExpanded {...weather} /> : <WeatherBlock {...weather} delayLevel={index} />;
};

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [weathers, setWeathers] = useState([]);

  const getAll = async () => {
    setIsLoading(true);
    const result = await axios.get(endpoint + '/weathers');
    
    const weathers = result.data.map((weather) => ({...weather, date: new Date(weather.date)}));
    weathers.sort((a, b) => getTime(b.date) - getTime(a.date));
    
    setWeathers(weathers);
    
    setIsLoading(false);
  };
  
  const creationCallback = async (weather) => {
    setIsOpen(false);
    setWeathers(
      ([{...weather, date: new Date(weather.date)}, ...weathers])
      .sort((a, b) => getTime(b.date) - getTime(a.date))
    );
  };

  useEffect(() => getAll(), []);
  
  return (
    <SafeAreaView style={styles.background}>
      <StatusBar />
      <Creation
        isOpen={isOpen}
        closeCallback={() => setIsOpen(false)}
        creationCallback={creationCallback}
      />
      {isLoading && <ActivityIndicator style={{marginTop: 16}} size="large" color={yellow}/>}
      <ScrollView style={styles.container}>
        {weathers.map(renderWeatherBlock)}
        {weathers.length === 0 && (
            <>
              <Text style={styles.nothingMessage}>
                Parece que você ainda não tem possui registro =({'\n'}{'\n'}
                Clique no ( + ) para criar um!
              </Text>
              <Text style={styles.mobileMessage}>* Não funciona na versão Web{'\n'}Testar no Android / iOS</Text>
            </>
        )}
      </ScrollView>
      <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setIsOpen(!isOpen)}
          style={styles.TouchableOpacityStyle}>
          <Image
            source={require('./assets/plus.png')}
            style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: darkBlue
  },
  container: {
    flex: 1
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 75,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: yellow,
    borderRadius: 75 / 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 40,
    height: 40
  },
  nothingMessage: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    marginTop: 128,
    padding: 32
  },
  mobileMessage: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    padding: 32
  },
});