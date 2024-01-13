import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/themes";
import { width, height, image342 } from "../constants/dimension";

// var { width, height } = Dimensions.get("window");

interface MovieListProps {
  title: string;
  data: Array<any>; // Update with your actual data type
  hideSeeAll?: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ title, data, hideSeeAll }) => {
  const navigation = useNavigation();

  return (
    <View style={{ marginBottom: 8, marginTop: 8 }}>
      <View style={{ marginHorizontal: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20 }}>{title}</Text>
        {/* {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={[styles.text, { fontSize: 16 }]}>See All</Text>
          </TouchableOpacity>
        )} */}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          const movieLength = item.title;
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Movie", item)}
            >
              <View style={{ marginRight: 4 }}>
                <Image
                  // source={require("../../assets/Supernatural.jpg")}
                  source={{ uri: image342(item.poster_path) }}
                  style={{
                    width: width * 0.33,
                    height: height * 0.22,
                    borderRadius: 20,
                  }}
                />
                <Text style={{ color: 'rgba(255, 255, 255, 0.7)', marginLeft: 1 }}>
                  {item.title.length > 14
                    ? item.title.slice(0, 14) + "..."
                    : item.title}
                </Text>
                {/* {item.title} */}
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
