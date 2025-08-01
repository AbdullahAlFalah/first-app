import { View, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemeContextType } from '@/hooks/ThemeContext';

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  themeContext: ThemeContextType; // theme context prop
};

export default function CircleButton({ icon, onPress, themeContext }: Props) {

  return (
    <View style={[styles.circleButtonContainer, themeContext.CircleButtonContainer]}>
      <Pressable 
        style={[styles.circleButton, themeContext.CircleButton]} 
        onPress={() => {
          console.log("CircleButton pressed");
          onPress();
        }}
      >
          <MaterialIcons name={icon} size={(themeContext.size.lg+2)} color={themeContext.colors.background} />
      </Pressable>
    </View>
  );

}

const styles = StyleSheet.create({
  circleButtonContainer: {
    borderWidth: 4,
  },
  circleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
