import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const paddingHorizontal = 20;
const numColumns = 2;
const gap = 16;
const availableWidth = screenWidth - paddingHorizontal * 2;
export const cardWidth = (availableWidth - gap) / numColumns;
