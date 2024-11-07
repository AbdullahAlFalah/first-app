import { captureScreen } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

export default async function takeScreenshotAndSave () {

  // Request media library permissions
  const { status } = await MediaLibrary.requestPermissionsAsync();

  if (status !== 'granted') {
    console.log('Permission Denied', 'Please allow access to save screenshots.');
    return;
  }

  try {

    // Capture screenshot
    const uri = await captureScreen({ format: 'png', quality: 0.8 });

    // Save to media library
    const asset = await MediaLibrary.createAssetAsync(uri);
    await MediaLibrary.createAlbumAsync('Screenshots', asset, false);
    console.log('Success', 'Screenshot saved to your gallery.');
    return uri;
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    console.log('Error', 'Could not capture screenshot.');
  }

};

