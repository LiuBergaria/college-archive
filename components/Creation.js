import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';

import Input from './Input';

import getImage from '../utils/getImage';
import { endpoint, yellow } from '../utils/config';

const WeatherOption = ({weather, isSelected, selectCallback}) => {
  return (
    <TouchableWithoutFeedback onPress={selectCallback}>
      <View style={[
          stylesWeather.container,
          isSelected ? { borderColor: yellow } : {}
        ]}>
        <Image source={getImage(weather)} style={stylesWeather.image} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ({isOpen, closeCallback, creationCallback}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [max, setMax] = React.useState(22.5);
  const [min, setMin] = React.useState(17.5);
  const [precipitation, setPrecipitation] = React.useState(0);
  const [weatherSelected, setWeatherSelected] = React.useState(0);

  const weathers = [
    "Ensolarado",
    "Nublado",
    "Limpo",
    "Chuva",
    "Tempestades",
    "Neve",
    "Ventos Fortes",
  ];

  const create = async () => {
    setIsLoading(true);
    const result = await axios.post(endpoint + '/weathers', {
      date,
      max,
      min,
      precipitation,
      weather: weathers[weatherSelected]
    });
    setIsLoading(false);
    creationCallback(result.data);
  };

  if(!isOpen) return null;
  
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={closeCallback}>
        <View style={styles.closeContainer}>
          <Image source={require('./../assets/close.png')} style={styles.closeImage} />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.rowContainer}>
        <Input
          text="Data" 
          type="date"
          value={date}
          onChange={(date) => setDate(date)}
          keyboardType="number-pad"
          disabled={isLoading}
        />
        <Input
          text="Precipitação" 
          suffix="%"
          value={precipitation.toFixed(0)}
          onChange={(precipitation) => {
            let n = parseInt(precipitation);
            if (Number.isNaN(n) || n < 0) n = 0;
            else if(n > 100) n = 100;

            setPrecipitation(n)
          }}
          keyboardType="number-pad"
          disabled={isLoading}
        />
      </View>
      <View style={styles.rowContainer}>
        <Input
          text="Temp. Máxima" 
          suffix="°C"
          value={max}
          onChange={(max) => setMax(parseFloat(max))}
          keyboardType="number-pad"
          disabled={isLoading}
        />
        <Input
          text="Temp. Mínima" 
          suffix="°C"
          value={min}
          onChange={(min) => setMin(parseFloat(min))}
          keyboardType="number-pad"
          disabled={isLoading}
        />
      </View>
      <View style={styles.weathersContainer}>
        {weathers.map((weather, index) => (
          <WeatherOption
            weather={weather}
            isSelected={index === weatherSelected}
            selectCallback={() => !isLoading ? setWeatherSelected(index) : null}
          />
        ))}
      </View>
      {isLoading ?
        <ActivityIndicator size="large" color={yellow} /> : (
          <TouchableWithoutFeedback onPress={() => create()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  button: {
    marginTop: 16,
    padding: 16,
    backgroundColor: yellow,
    borderRadius: 8
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
  },
  rowContainer: {
    flexDirection: 'row'
  },
  weathersContainer: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  closeImage: {
    width: 32,
    height: 32,
    padding: 16
  },
  closeContainer: {
    alignItems: 'flex-end',
  }
});


const stylesWeather = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: 'transparent',
  },
  image: {
    width: 64,
    height: 64
  }
});