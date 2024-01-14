import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { FontAwesome6, Entypo, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addItem, clearCart, deleteItem } from "../hook/store";
import { useNavigation } from "@react-navigation/native";
import { width, height, ios, image342 } from "../constants/dimension";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  runtime: number;
}

export default function CartScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector((store: any) => store.cart.items);
  const [cart, setCart] = useState<Movie[]>([]);

  useEffect(() => {
    setCart(cartItems);
  }, [cartItems]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const deleteMovie = (item: Movie) => {
    if (!item) return;
    dispatch(deleteItem(item));
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#1e2b37" }}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <SafeAreaView style={ios ? { marginBottom: 2, backgroundColor: "#red-400" } : { marginBottom: 3, backgroundColor: "#red-400" }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 4 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 1 }}>
            <MaterialIcons name="chevron-left" size={32} strokeWidth={2.5} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row' }}>
            <Entypo name="shopping-cart" size={32} strokeWidth={2} color="black" />
            <Text style={{ position: 'absolute', right: 2, color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 1 }}>
              {cart.length}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {cart.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          style={{ spaceY: 3 }}
        >
          <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
            {cart.map((item, index) => (
              <View
                key={index}
                style={{ flexDirection: 'row', spaceY: 2, marginBottom: 4, paddingHorizontal: 2, paddingVertical: 3, justifyContent: 'space-between', borderBottomWidth: 2, borderBottomColor: 'neutral-600' }}
              >
                <TouchableWithoutFeedback
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View style={{ flexDirection: 'row', spaceX: 6 }}>
                    <Image
                      source={{ uri: image342(item.poster_path) }}
                      style={{ width: 50, height: 80 }}
                    />
                    <View style={{ flexDirection: 'column', justifyContent: 'center', width: 60, spaceY: 1 }}>
                      <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                        {item?.title.length > 25
                          ? item?.title.slice(0, 25) + "..."
                          : item?.title}
                      </Text>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'neutral-300', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 'bold' }}>
                          {item?.release_date?.split("-")[0]}
                        </Text>
                        <Text style={{ color: 'neutral-300', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 'bold' }}>
                          {item?.runtime} min
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableOpacity
                  onPress={() => {
                    deleteMovie(item);
                  }}
                  style={{ position: 'absolute', right: 2, borderRadius: 15, padding: 2, margin: 1, backgroundColor: 'neutral-500' }}
                >
                  <Entypo
                    name="cross"
                    size={22}
                    strokeWidth={2}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 4 }}>
            <TouchableOpacity onPress={handleClearCart} style={{ borderRadius: 15, padding: 2, backgroundColor: 'red-400', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', letterSpacing: 2 }}>
                Clear Cart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ borderRadius: 15, padding: 2, backgroundColor: 'red-400', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', letterSpacing: 2 }}>
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View style={{ paddingTop: 10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require("../../assets/cart.png")}
            style={{ width: 96, height: 96 }}
          />
          <Text style={{ fontSize: 30, fontWeight: 'bold', letterSpacing: 2, color: 'white', textAlign: 'center', paddingVertical: 4 }}>
            Your cart is empty
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'red-400', padding: 2, borderRadius: 15, marginTop: 20 }}
          >
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2, marginRight: 2 }}>
              Go back to homepage
            </Text>
            <Entypo name="home" size={22} strokeWidth={2} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
