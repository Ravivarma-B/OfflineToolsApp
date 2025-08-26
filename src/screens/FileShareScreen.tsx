import React from 'react';
import { View, Button, Alert, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

const FileShareScreen: React.FC = () => {
  const shareFile = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.All });
    if (!result.canceled) {
      try {
        await Sharing.shareAsync(result.assets[0].uri, { dialogTitle: 'Share File Offline' });
      } catch (ex) {
        Alert.alert('Error', 'Failed to share file');
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Select and Share File Offline" onPress={shareFile} />
      <Text>Note: Uses device P2P (e.g., Bluetooth/AirDrop/Nearby) without internet.</Text>
    </View>
  );
};

export default FileShareScreen;