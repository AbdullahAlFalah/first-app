import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome  from '@expo/vector-icons/FontAwesome';
import { ThemeContextType } from '@/hooks/ThemeContext';

type Props = {
  icon?: keyof typeof FontAwesome.glyphMap;
  label: string;
  theme?: 'primary';
  onPress: () => void;
  themeContext: ThemeContextType; // theme context prop
};

export default function Button({ icon, label, theme, onPress = () => {}, themeContext }: Props) {

  if (theme === 'primary') {

    return (
      <View style={[ 
        styles.buttonContainer,
        themeContext.wideButtonContainer, 
        { 
          borderWidth: 4, 
          borderColor: themeContext.colors.buttonBorder, 
          borderRadius: themeContext.radius.lg+6, 
        }, 
      ]}>
        <Pressable 
          style={[ 
            styles.button,
            { backgroundColor: themeContext.colors.buttonColor, },
          ]}
          onPress={onPress}
        >
            <FontAwesome 
              name={icon} 
              size={(themeContext.size.sm-8)} 
              color={themeContext.colors.background} 
              style={{ paddingRight: (themeContext.spacing.xs+2), }} 
            />
            <Text style={[ 
              styles.buttonLabel, 
              { color: themeContext.colors.background, }, 
            ]}>
              {label}
            </Text>
        </Pressable>
      </View>
    );

  }

  return (
    <View style={[styles.buttonContainer, themeContext.wideButtonContainer]}>
      <Pressable 
        style={[
          styles.button, 
          { borderRadius: themeContext.radius.lg-2, },
        ]} 
        onPress={onPress}
      >
        <Text style={[styles.buttonLabel, themeContext.primaryText]}>{label}</Text>
      </Pressable>
    </View>
  );

}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
