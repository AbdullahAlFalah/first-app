import React, { memo, useState } from 'react';
import { StyleSheet, FlatList, Platform, Pressable, Image, ImageSourcePropType } from 'react-native';

type Props = {
  onSelect: (image: ImageSourcePropType) => void;
};

const EmojiList = memo(function EmojiList({ onSelect }: Props) {
    
  const [emoji] = useState<ImageSourcePropType[]>(
    [
      require('../assets/images/emoji1.png'),
      require('../assets/images/emoji2.png'),
      require('../assets/images/emoji3.png'),
      require('../assets/images/emoji4.png'),
      require('../assets/images/emoji5.png'),
      require('../assets/images/emoji6.png'),
    ]
);

  console.log("emoji array:", emoji);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={emoji}
      keyExtractor={( _item, index ) => index.toString()} // Use index as key and ignore item by using the underscore
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            // const resolvedUri = Image.resolveAssetSource(item).uri; // Resolve to URI            
            onSelect(item); // Pass the selected emoji
          }}>
          <Image source={item} key={index} style={styles.image} />
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
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
