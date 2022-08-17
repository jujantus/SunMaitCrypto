import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const designWidth = 390; //This is the iPhone 13's viewport width
const scaleCoefficient = width / designWidth;

const getScaledRoundedValue = value => Math.round(value * scaleCoefficient);

export {width, getScaledRoundedValue};
