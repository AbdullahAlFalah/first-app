import React, { memo, useState } from 'react';
import { StyleSheet, FlatList, Platform, Pressable, Text, Image, ImageSourcePropType } from 'react-native';
import { ThemeContextType } from '@/hooks/ThemeContext';

type Props = {
  onSelect: (image: ImageSourcePropType) => void;
  themeContext?: ThemeContextType; // This way, TypeScript won’t complain if it’s missing in JSX, but at runtime, EmojiPicker will still inject it. 
};

const emojiImages = Platform.select({
  web: ['😀', '😁', '😂', '🤣', '😃', '😄', '😍'],
  default: [
    require('../assets/images/emoji1.png'),
    require('../assets/images/emoji2.png'),
    require('../assets/images/emoji3.png'),
    require('../assets/images/emoji4.png'),
    require('../assets/images/emoji5.png'),
    require('../assets/images/emoji6.png'),
    require('../assets/images/emoji7.png'),
    require('../assets/images/emoji8.png'),
    require('../assets/images/emoji9.png'),
    require('../assets/images/emoji10.png'),
    require('../assets/images/emoji11.png'),
    require('../assets/images/emoji12.png'),
  ]
});

const EmojiList = memo(function EmojiList({ onSelect, themeContext }: Props) {
    
  const [emoji] = useState<ImageSourcePropType[]>(emojiImages);

  console.log("emoji array:", emoji);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={emoji}
      keyExtractor={( _item, index ) => index.toString()} // Use index as key and ignore item by using the underscore
      contentContainerStyle={[
        styles.listContainer,
        {
          borderTopRightRadius: themeContext?.radius.lg,
          borderTopLeftRadius: themeContext?.radius.lg,
          paddingHorizontal: themeContext?.spacing.lg,
        },
      ]}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {            
            onSelect(item); // Pass the selected emoji
          }}>
          {typeof item === 'string' ? (
            <Text style={{
              fontSize: (themeContext?.fontSize.xl ?? 20)*4,
              width: ((themeContext?.size.xl ?? 40)+10)*2,
              height: ((themeContext?.size.xl ?? 40)+10)*2,
              marginRight: ((themeContext?.spacing.md ?? 20)+4),
            }}>{item}</Text> // Render text emoji directly
          ) : (
            <Image source={item} style={{
              width: ((themeContext?.size.xl ?? 40)+10)*2,
              height: ((themeContext?.size.xl ?? 40)+10)*2,
              marginRight: ((themeContext?.spacing.md ?? 20)+4),
            }} /> // Render image emoji
          )}         
        </Pressable>
      )}
      initialNumToRender={3} // Render only a few items initially
      maxToRenderPerBatch={3} // Limit the number of items rendered per batch
    />
  );
});

export default EmojiList;

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

