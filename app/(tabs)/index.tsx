import React from 'react';
import { Text } from 'react-native';
import {typography} from '@/constants/typography';

export default function HomeScreen() {
  return (
    <>
      <Text style={{ fontFamily: typography.fontFamily.bold, fontSize: typography.fontSize["4xl"] }}>
        Spendly
      </Text>

      <Text style={{
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.lg,
  }}>
        Welcome to Spendly!
      </Text>
    </>
  );
}
