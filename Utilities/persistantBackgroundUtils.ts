import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'currentBackground';

export const saveBackgroundUrl = async (url: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, url);
    console.log('Background URL saved:', url);
  } catch (error) {
    console.warn('Error saving background URL:', error);
  }
};

export const loadBackgroundUrl = async (): Promise<string | null> => {
  try {
    const url = await AsyncStorage.getItem(STORAGE_KEY);
    console.log('Loaded background URL:', url);
    return url;
  } catch (error) {
    console.warn('Error loading background URL:', error);
    return null;
  }
};

export const clearBackgroundUrl = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    console.log('Background URL cleared');
  } catch (error) {
    console.warn('Error clearing background URL:', error);
  }
};

