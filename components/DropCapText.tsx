import React from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';
import { splitByNewlines } from '../Utilities/textUtils';
import { ThemeContextType } from '@/hooks/ThemeContext'; 

type DropCapTextProps = {
    text: string;
    dropCapStyle?: TextStyle;
    textStyle?: TextStyle;
    themeContext?: ThemeContextType; // Optional theme context prop
};

const DropCapText = ({ text, dropCapStyle, textStyle, themeContext }: DropCapTextProps) => {
    const firstLetter = text.charAt(0);
    const remainingText = text.slice(1);

    const lines = splitByNewlines(remainingText); // adjust maxCharsPerLine as needed
    if (text.length === 0 || lines.length === 0) {
        return (
            <View style={[
                styles.outerContainer,
                { paddingHorizontal: themeContext?.spacing.sm },
            ]}>
                <Text style={[
                    styles.defaultText,
                    {
                        fontSize: themeContext?.fontSize.xxl,
                        color: themeContext?.colors.primaryText,
                    },
                ]}>
                    {`Nothing to see here!!!`}
                </Text>
            </View>
        );
    }

    const firstLines = lines.slice(0, 2); // adjust how many lines go beside drop cap
    const remainingLines = lines.slice(2); // rest of the lines go under the drop cap

  return (
    <View style={[styles.outerContainer, { paddingHorizontal: themeContext?.spacing.sm } ]}>
        <View style={styles.row}>
            <Text style={[styles.dropCap, dropCapStyle, themeContext?.dropCapText]}>{firstLetter}</Text>
            <View style={styles.BesideTextContainer}>
                {firstLines.map((line, idx) => (
                    <Text key={idx} style={[styles.Besidetext, textStyle, themeContext?.besideText]}>{line}</Text>
                ))}
            </View>
        </View>
        <View style={styles.BelowTextContainer}>       
            {remainingLines.map((line, idx) => (
                <Text key={`below-${idx}`} style={[styles.Belowtext, textStyle, themeContext?.belowText]}>{line}</Text>
            ))}
        </View>    
    </View>
  );
};

const styles = StyleSheet.create({
    defaultText: {
        fontSize: 22,
        color: '#fff',
        textAlign: 'center',
    },
    outerContainer: {
        width: '100%',
        paddingHorizontal: 10,
    },   
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    dropCap: {
        fontSize: 96,
        lineHeight: 96,
        color: '#fff',
        marginRight: 10,
    },
    BesideTextContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    Besidetext: {    
        fontSize: 22,
        lineHeight: 24,
        color: '#fff',
        textAlign: 'left',
        paddingTop: 10, // align top of text block with drop cap
    },
    BelowTextContainer: {
        
    },
    Belowtext: {
        fontSize: 22,
        lineHeight: 24,
        color: '#fff',
        textAlign: 'left',
        paddingTop: 5, // space between lines
    },
});

export default DropCapText;


