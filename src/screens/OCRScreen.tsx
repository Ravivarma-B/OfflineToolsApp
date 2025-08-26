import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { useAppStore } from '../store';

const OCRScreen: React.FC = () => {
  const { ocrResult, setOcrResult } = useAppStore();
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  const pickImage = async () => {
    if (!permission?.granted) await requestPermission();
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) {
      processOCR(result.assets[0].uri);
    }
  };

  const processOCR = async (uri: string) => {
    try {
      const recognizedText = await TextRecognition.recognize(uri);
      setOcrResult(recognizedText.text);
      Alert.alert('OCR Result', recognizedText.text);
    } catch (ex) {
      Alert.alert('Error', 'Failed to recognize text');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Pick Image for OCR" onPress={pickImage} />
      <Text>OCR Result: {ocrResult}</Text>
    </View>
  );
};

export default OCRScreen;