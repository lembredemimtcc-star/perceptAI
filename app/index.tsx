import { styles } from "@/styles/splash.styles";
import { router } from "expo-router";
import React, { useEffect, useMemo, useRef } from "react";
import {Animated,Dimensions,Easing,Image,SafeAreaView,Text,View,DimensionValue,} from "react-native";
import { useAuth } from "@/context/AuthContext";
  useEffect(() => {
    animatedValues.forEach((value, index) => {
      const startAnimation = () => {
        value.setValue(-20);
        Animated.timing(value, {
          toValue: height + 20,
          duration: dots[index].duration,
          delay: dots[index].delay,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => startAnimation());
      };

      startAnimation();
    });

    if (isLoading) return;

    const route = isAuthenticated ? "/(tabs)" : "/autenticacao";
    const timer = setTimeout(() => {
      router.replace(route);
    }, 5000);

    return () => clearTimeout(timer);
  }, [animatedValues, dots, isAuthenticated, isLoading]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("@/assets/images/logo-perceptai.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>perceptAI</Text>
      </View>

      {dots.map((dot, index) => (
        <Animated.View
          key={`falling-${index}`}
          style={[
            styles.fallingDot,
            {
              left: dot.left,
              width: dot.size,
              height: dot.size,
              borderRadius: dot.size / 2,
              opacity: dot.opacity,
              transform: [{ translateY: animatedValues[index] }],
            },
          ]}
        />
      ))}

      <View style={styles.bottomArea}>
        {bottomDots.map((dot, index) => (
          <View
            key={`bottom-${index}`}
            style={[
              styles.bottomDot,
              {
                left: dot.left,
                bottom: dot.bottom,
                width: dot.size,
                height: dot.size,
                borderRadius: dot.size / 2,
              },
            ]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}
