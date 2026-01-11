import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const paddingHorizontal = 20;
const numColumns = 2;
const gap = 16;
const availableWidth = screenWidth - paddingHorizontal * 2;
export const cardWidth = (availableWidth - gap) / numColumns;

const styles = StyleSheet.create({
  button: {
    maxWidth: 'auto',
    minWidth: 30,
    // minWidth: 30,
  },
});

export const levelButtons = [
  {
    value: 'A1',
    label: 'A1',
    style: styles.button,
  },
  {
    value: 'A2',
    label: 'A2',
    style: styles.button,
  },
  {
    value: 'B1',
    label: 'B1',
    style: styles.button,
  },
  {
    value: 'B2',
    label: 'B2',
    style: styles.button,
  },
  {
    value: 'C1',
    label: 'C1',
    style: styles.button,
  },
  {
    value: 'C2',
    label: 'C2',
    style: styles.button,
  },
];

export const countButtons = [
  {
    value: '5',
    label: '5',
  },
  {
    value: '10',
    label: '10',
  },
  {
    value: '20',
    label: '20',
  },
];
