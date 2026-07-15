import React from 'react';
import { Text } from 'react-native';
import {typography} from '@/constants/typography';
import AppText from '@/components/ui/AppText';
import AppButton from '@/components/ui/AppButton';
import AppInput from '@/components/ui/AppInput';
import { ScreenContainer } from 'react-native-screens';

export default function HomeScreen() {
  const [name, setName] = React.useState('');
  return (
    <ScreenContainer style={{padding: 20}}>
 <AppText variant='heading'>
        Spendly
      </AppText>

      <AppText variant='body'
>
        Welcome to Spendly!

      </AppText>

       <AppInput
        label="Name"
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <AppButton
        title="Continue"
        onPress={() => console.log(name)}
      />
    </ScreenContainer>
     
  );
}
