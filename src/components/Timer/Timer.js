import React, {useEffect, useRef, useState} from 'react';
import {Text} from 'react-native';
import {styles} from './style';

export const Timer = ({cicleLimit, currentCicle, cicleSeconds}) => {
  const [seconds, setSeconds] = useState(cicleSeconds);
  const updateInterval = useRef(null);

  useEffect(() => {
    clearInterval(updateInterval.current);
    if (currentCicle >= cicleLimit) {
      return;
    }
    setSeconds(cicleSeconds);
    updateInterval.current = setInterval(() => {
      setSeconds(prevSeconds => (prevSeconds - 1 > 0 ? prevSeconds - 1 : 0));
    }, 1000);
    () => {
      clearInterval(updateInterval.current);
    };
  }, [currentCicle]);

  return isNaN(seconds) ? null : (
    <Text style={styles.timerText}>{seconds}</Text>
  );
};
