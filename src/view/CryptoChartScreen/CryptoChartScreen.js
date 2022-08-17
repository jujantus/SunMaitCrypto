import React, {useEffect, useRef, useState} from 'react';

import {ScrollView, View, Text, ActivityIndicator} from 'react-native';
import {globalStyles} from '../../common/styles';
import {LineChart} from 'react-native-chart-kit';
import {getScaledRoundedValue, width} from '../../common/metrics';
import {useDispatch, useSelector} from 'react-redux';
import {clearId, setActiveId} from '../../state/coins/coinDetail';

export const CryptoChartScreen = ({navigation, route}) => {
  const {id} = route.params;

  const [seconds, setSeconds] = useState(null);
  const [newPrice, setNewPrice] = useState(0);

  const updateInterval = useRef();

  const coinDetail = useSelector(state => state.coins?.detail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveId(id));

    return () => {
      dispatch(clearId());
    };
  }, [dispatch, id]);

  useEffect(() => {
    clearInterval(updateInterval.current);
    if (coinDetail.numberOfRequests > 4) {
      return;
    }
    setSeconds(30);
    updateInterval.current = setInterval(() => {
      if (seconds > 0) {
        setSeconds(prevSeconds => prevSeconds - 1);
      }
    }, 1000);
  }, [coinDetail]);

  useEffect(() => {
    const parsedPrice = parseInt(coinDetail?.detail?.price_usd, 10);
    if (isNaN(parsedPrice)) {
      return;
    }
    setNewPrice(parsedPrice);
  }, [coinDetail.detail]);

  return (
    <ScrollView>
      <View style={globalStyles.mainView}>
        <Text>24 hour price variation for {coinDetail?.detail?.name}</Text>
        <Text>{seconds} seconds until next update</Text>
        {coinDetail.loading ? (
          <ActivityIndicator size="large" color="#BF6900" />
        ) : (
          <LineChart
            data={{
              labels: ['ayer', 'ahora'],
              datasets: [
                {
                  data: [newPrice, newPrice],
                },
              ],
            }}
            width={width}
            height={getScaledRoundedValue(400)}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        )}
      </View>
    </ScrollView>
  );
};
