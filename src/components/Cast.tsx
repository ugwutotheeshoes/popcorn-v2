import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { image185 } from "../constants/dimension";
import { fallbackMoviePoster } from "../hook/useFetch";

interface Person {
  profile_path?: string;
  character?: string;
  original_name?: string;
}

interface CastProps {
  cast: Person[];
  navigation: any; // You should replace 'any' with the correct type for your navigation prop
}

export default function Cast({ cast, navigation }: CastProps) {
  let personName = "Keanu Reeves";
  let characterName = "John Wick";

  return (
    <View style={{ marginVertical: 6 }}>
      <Text style={{ color: "white", fontSize: 18, marginHorizontal: 4, marginBottom: 5 }}>
        Top Cast
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate("Person", person)}
                style={{ marginRight: 4, alignItems: "center" }}
              >
                <View style={{ overflow: "hidden", borderRadius: 50, height: 80, alignItems: "center", borderWidth: 1, borderColor: "#ccc" }}>
                  <Image
                    style={{ borderRadius: 12, height: 96, width: 80 }}
                    source={{ uri: image185(person?.profile_path) || fallbackMoviePoster }}
                    // source={require("../../assets/sahbabi.jpg")}
                  />
                </View>
                <Text style={{ color: "white", fontSize: 12, marginTop: 2 }}>
                  {person?.character?.length! > 10
                    ? person?.character?.slice(0, 10) + "..."
                    : person?.character}
                </Text>
                <Text style={{ color: "#ccc", fontSize: 12, marginTop: 2 }}>
                  {" "}
                  {person?.original_name?.length! > 10
                    ? person?.original_name?.slice(0, 10) + "..."
                    : person?.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
