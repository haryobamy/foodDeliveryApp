import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from "react-native";
import {
  COLORS,
  FONTS,
  icons,
  SIZES,
  initialCurrentLocation,
  categoryData,
  affordable,
  fairPrice,
  expensive,
  restaurantData,
} from "../constants";

const Home = ({ navigation }) => {
  const [categories, setCategories] = React.useState(categoryData);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [restaurants, setRestaurants] = React.useState(restaurantData);
  const [currentLocation, setCurrentLocation] = React.useState(
    initialCurrentLocation
  );

  function onSelectedCategory(category) {
    //filter
    let restaurantList = restaurantData.filter((a) =>
      a.categories.includes(category.id)
    );

    setRestaurants(restaurantList);

    setSelectedCategory(category);
  }

  function getCategoryNameById(id) {
    let category = categories.filter((a) => a.id == id);

    if (category.length > 0) {
      return category[0].name;
    } else {
      return "";
    }
  }

  function renderHeader() {
    return (
      <View style={{ flexDirection: "row", height: 50 }}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.nearby}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              width: "70%",
              height: "100%",
              backgroundColor: COLORS.lightGray3,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: SIZES.radius,
            }}
          >
            <Text style={{ ...FONTS.h3 }}>{currentLocation.streetName}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: 50,

            justifyContent: "center",
          }}
        >
          <Image
            source={icons.basket}
            resizeMode="contain"
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderMainCategory() {
    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          style={{
            backgroundColor:
              selectedCategory?.id === item.id ? COLORS.primary : COLORS.white,
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
            marginRight: SIZES.padding,
            ...styles.shadow,
          }}
          onPress={() => onSelectedCategory(item)}
        >
          <View
            style={{
              backgroundColor:
                selectedCategory?.id === item.id
                  ? COLORS.white
                  : COLORS.lightGray,
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </View>
          <Text
            style={{
              color:
                selectedCategory?.id === item.id
                  ? COLORS.white
                  : COLORS.primary,
              marginTop: SIZES.padding,
              ...FONTS.body3,
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{ padding: SIZES.padding * 2 }}>
        <Text style={{ ...FONTS.h1 }}>Main</Text>
        <Text style={{ ...FONTS.h1 }}>categories</Text>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={{ padding: SIZES.padding * 2 }}
          renderItem={renderItem}
        />
      </View>
    );
  }

  function renderRestaurantList() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{ marginBottom: SIZES.padding * 2 }}
          onPress={() =>
            navigation.navigate("Restaurant", { item, currentLocation })
          }
        >
          <View style={{ marginBottom: SIZES.padding }}>
            <Image
              source={item.photo}
              resizeMode="cover"
              style={{
                width: "100%",
                height: 200,
                borderRadius: SIZES.radius,
              }}
              onPress={() =>
                navigation.navigate("Restaurant", { item, currentLocation })
              }
            />
            <View
              style={{
                position: "absolute",
                width: SIZES.width * 0.3,
                backgroundColor: COLORS.white,
                bottom: 0,
                height: 50,
                borderTopRightRadius: SIZES.radius,
                borderBottomLeftRadius: SIZES.radius,
                alignItems: "center",
                justifyContent: "center",
                ...styles.shadow,
              }}
            >
              <Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
            </View>
          </View>
          {/* restaurant info */}
          <Text style={{ ...FONTS.body2 }}>{item.name} </Text>
          <View style={{ marginTop: SIZES.padding, flexDirection: "row" }}>
            {/* Ratings */}
            <Image
              source={icons.star}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.primary,
                marginRight: 10,
              }}
            />
            <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>
            {/* categories */}
            <View
              style={{
                flexDirection: "row",
                marginLeft: 10,
              }}
            >
              {item.categories.map((categoryId) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                    key={categoryId}
                  >
                    <Text style={{ ...FONTS.body3 }}>
                      {getCategoryNameById(categoryId)}
                    </Text>
                    <Text style={{ color: COLORS.darkgray, ...FONTS.h3 }}>
                      .
                    </Text>
                  </View>
                );
              })}

              {/* Price */}

              {[1, 2, 3].map((priceRating) => {
                return (
                  <Text
                    key={priceRating}
                    style={{
                      ...FONTS.body3,
                      color:
                        priceRating <= item.priceRating
                          ? COLORS.black
                          : COLORS.darkgray,
                    }}
                  >
                    $
                  </Text>
                );
              })}
            </View>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <FlatList
        data={restaurants}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderMainCategory()}
      {renderRestaurantList()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});

export default Home;
