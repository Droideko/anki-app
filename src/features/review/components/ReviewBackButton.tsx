import React from 'react';
import {
  HeaderBackButton,
  HeaderBackButtonProps,
} from '@react-navigation/elements';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';

import { useProgressRepository } from '../hooks/useProgressRepository';

function ReviewBackButton(props: HeaderBackButtonProps) {
  const { syncProgress } = useProgressRepository();

  const onBack = () => {
    syncProgress();
    router.back();
  };

  return <HeaderBackButton style={styles.button} {...props} onPress={onBack} />;
}

const styles = StyleSheet.create({
  button: {
    marginLeft: -12,
  },
});

export default ReviewBackButton;
