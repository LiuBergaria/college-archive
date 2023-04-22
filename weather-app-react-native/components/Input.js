import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, View, TextInput, Text, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

import { yellow } from '../utils/config';

export default ({text, suffix, type, value, onChange, ...rest}) => {
  const [isShow, setIsShow] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if(type === "date") setIsShow(true);
      }}
    >
      <View style={[
        styles.container,
        isFocused ? { borderBottomColor: yellow } : {}
      ]}>
        {type === "date" ?
          (<Text style={styles.dateText}>{format(value, 'dd/MM/yyyy')}</Text>) : (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              placeholder={text}
              placeholderTextColor="#fff"
              selectTextOnFocus={true}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...rest}
            />
          )
        }
        {suffix && <Text style={styles.suffix}>{suffix}</Text>}
        {isShow &&
          <DateTimePicker
            testID="dateTimePicker"
            value={value}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={({type, nativeEvent}) => {
              setIsShow(false);
              if (type !== "dismissed") onChange(new Date(nativeEvent.timestamp));
            }}
          />
        }
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    marginHorizontal: 4,
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 8
  },
  suffix: {
    color: '#fff',
    position: 'absolute',
    right: 16
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 8
  }
});