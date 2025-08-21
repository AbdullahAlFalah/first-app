import { ImageSourcePropType } from "react-native";
import { Image } from "expo-image";
import { ThemeContextType } from "@/hooks/ThemeContext";

type Props = {
  imgSource: ImageSourcePropType;
  selectedImage?: string;
  themeContext: ThemeContextType;
};

export default function ImageViewer({ imgSource, selectedImage, themeContext }: Props) {

const imageSource = selectedImage ? { uri: selectedImage }: imgSource;

  return ( 
    <Image source={imageSource} 
      style={{
        width: (themeContext.size.md*10),
        height: (themeContext.size.xxl*10),
        borderRadius: (themeContext.radius.lg+6),
      }} 
    />
  );

}
