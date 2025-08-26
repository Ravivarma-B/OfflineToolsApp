import React, { useEffect, useState } from 'react';
import { View, Text, Button, Platform, Alert } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import { useAppStore } from '../store';

const NFCScreen: React.FC = () => {
  const { nfcResult, setNfcResult } = useAppStore();
  const [hasNfc, setHasNfc] = useState(false);

  useEffect(() => {
    NfcManager.start();
    checkNfcSupport();
  }, []);

  const checkNfcSupport = async () => {
    const supported = await NfcManager.isSupported();
    setHasNfc(supported);
    if (!supported) Alert.alert('NFC not supported on this device');
    if (Platform.OS === 'android') await NfcManager.isEnabled(); // Check enabled on Android
  };

  const readTag = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      setNfcResult(JSON.stringify(tag));
      Alert.alert('Tag Read', JSON.stringify(tag));
    } catch (ex) {
      Alert.alert('Error', 'Failed to read NFC tag');
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>NFC Result: {nfcResult}</Text>
      {hasNfc && <Button title="Read NFC Tag" onPress={readTag} />}
    </View>
  );
};

export default NFCScreen;