import { Platform, Alert } from 'react-native';

export const showAlertWithAction = (
  title: string,
  message: string,
  actionLabel: string,
  action: () => void
) => {
  if (Platform.OS === 'web') {
    const confirmed = window.confirm(`${title}:\n${message}`);
    if (confirmed) action();
  } else {
    Alert.alert(
      title,
      message,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: actionLabel, onPress: action }
      ],
      { cancelable: true }
    );
  }
};

