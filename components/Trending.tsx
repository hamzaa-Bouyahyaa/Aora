import {
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
import { WebView } from "react-native-webview";
//import { Video, ResizeMode } from "expo-av";

const zoomIn: any = {
  0: { scale: 0.9 },
  1: { scale: 1.1 },
};

const zoomOut: any = {
  0: { scale: 1 },
  1: { scale: 0.9 },
};

const TrendingItem = ({ activeItem, item }: any) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        // <Video
        //   source={{
        //     uri: item.video,
        //   }}
        //   style={styles.container}
        //   //  className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
        //   resizeMode={ResizeMode.CONTAIN}
        //   useNativeControls
        //   shouldPlay
        //   onPlaybackStatusUpdate={(status: any) => {
        //     if (status.didJustFinish) {
        //       setPlay(false);
        //     }
        //   }}
        // />
        <WebView
          source={{ uri: item.video }}
          style={styles.container}
          allowsFullscreenVideo
          scrollEnabled={false}
          automaticallyAdjustContentInsets
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-black-40 shadow-lg"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: any) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 } as any}
      horizontal
    />
  );
};

export default Trending;

const styles = StyleSheet.create({
  container: {
    width: 208,
    height: 288,
    marginTop: 12,
    borderRadius: 35,
    zIndex: 9999,
    backgroundColor: "#ffffff1a",
  },
});
