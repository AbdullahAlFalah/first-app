import { Pressable, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemeContextType } from '@/hooks/ThemeContext';

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress: () => void;
  themeContext: ThemeContextType; // theme context prop
};

export default function IconButton({ icon, label, onPress, themeContext}: Props) {
  return (
    <Pressable style={[styles.iconButton]} onPress={onPress}>
      <MaterialIcons name={icon} size={(themeContext.size.sm-4)} color={themeContext.colors.primaryText} />
      <Text style={[
        styles.iconButtonLabel, 
        {
          color: themeContext.colors.primaryText, // Use primaryText color from theme context
          marginTop: themeContext.spacing.sm, // Use spacing from theme context
        }
      ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonLabel: {
    color: '#fff',
    marginTop: 12,
  },
});

