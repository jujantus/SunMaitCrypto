import React, {useEffect, useRef, useState} from 'react';

import {ScrollView, View, Text, ActivityIndicator} from 'react-native';
import {globalStyles} from '../../common/styles';
import {LineChart} from 'react-native-chart-kit';
import {getScaledRoundedValue, width} from '../../common/metrics';
import {useDispatch, useSelector} from 'react-redux';
import {clearId, setActiveId} from '../../state/coins/coinDetail';
import {Timer} from '../../components/Timer/Timer';

export const CryptoChartScreen = ({navigation, route}) => {
  const {id} = route.params;

  const coinDetail = useSelector(state => state.coins?.detail);
  const dispatch = useDispatch();

  const [pricesArray, setPricesArray] = useState([]);
  const [hoursArray, setHoursArray] = useState([]);

  useEffect(() => {
    dispatch(setActiveId(id));

    return () => {
      dispatch(clearId());
    };
  }, [dispatch, id]);

  useEffect(() => {
    const parsedPrice = parseInt(coinDetail?.detail?.price_usd, 10);
    if (isNaN(parsedPrice)) {
      return;
    }
    setPricesArray(prevPricesArray => prevPricesArray.concat([parsedPrice]));
    setHoursArray(prevHoursArray =>
      prevHoursArray.concat([new Date().toLocaleTimeString('en-US')]),
    );
  }, [coinDetail.detail]);

  return (
    <ScrollView>
      <View style={globalStyles.mainView}>
        <Text>24 hour price variation for {coinDetail?.detail?.name}</Text>
        {coinDetail.numberOfRequests < 5 && (
          <View>
            <Timer
              cicleLimit={5}
              currentCicle={coinDetail.numberOfRequests}
              cicleSeconds={30}
            />
            <Text>seconds until next update</Text>
          </View>
        )}
        {coinDetail.loading || !hoursArray.length || !pricesArray.length ? (
          <ActivityIndicator size="large" color="#BF6900" />
        ) : (
          <LineChart
            data={{
              labels: hoursArray,
              datasets: [
                {
                  data: pricesArray,
                },
              ],
            }}
            width={width}
            height={getScaledRoundedValue(400)}
            yAxisLabel="$"
            yAxisInterval={1}
            yax
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 0,
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
              marginVertical: 20,
              borderRadius: 16,
            }}
          />
        )}
      </View>
    </ScrollView>
  );
};
