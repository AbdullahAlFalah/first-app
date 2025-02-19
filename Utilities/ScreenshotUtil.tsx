import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { Alert, Platform } from 'react-native';
import domtoimage from 'dom-to-image';

class ScreenshotUtil {

  static async requestPermissions() {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === "granted";
  }

  static async captureAndSave(ref: any) {

    if (Platform.OS !== 'web') {

      try {
        const hasPermission = await this.requestPermissions();
        if (!hasPermission) {
          Alert.alert("Permission Denied", "Gallery access is required to save screenshots.");
          return null;
        }

        const uri = await captureRef(ref, {
          format: "png",
          quality: 1,
        });

        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync("Screenshots", asset, false);
        if (uri) {
          console.log("Screenshot Saved", uri);
          Alert.alert("Screenshot Saved", "Saved to your gallery.");
        }
        return uri;
      } catch (error) {
        console.error("Screenshot Error:", error);
        Alert.alert("Error", "Failed to take screenshot.");
        return null;
      }

    } else {

      try {

        const dataUrl = await domtoimage.toJpeg(ref, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement('a');
        link.download = 'sticker-smash.jpeg';
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.log(error);
      }

    }

  }

}

export default ScreenshotUtil;

