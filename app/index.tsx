import { styles } from "@/styles/splash.styles";
import { router } from "expo-router";
import React, { useEffect, useMemo, useRef } from "react";
import {
    Animated,
    Dimensions,
    Easing,
    Image,
    SafeAreaView,
    Text,
    View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const FALLING_DOTS = 15;
const BOTTOM_DOTS = 25;

export default function Index() {
  const animatedValues = useRef(
    Array.from({ length: FALLING_DOTS }, () => new Animated.Value(-20)),
  ).current;

  const dots = useMemo(
    () =>
      Array.from({ length: FALLING_DOTS }, (_, index) => ({
        left: Math.random() * width,
        size: 6 + Math.random() * 8,
        duration: 3000 + Math.random() * 3000,
        delay: index * 400,
        opacity: 0.4 + Math.random() * 0.5,
      })),
    [],
  );

  const bottomDots = useMemo(
    () =>
      Array.from({ length: BOTTOM_DOTS }, (_, index) => ({
        left: `${(index * 7) % 100}%`,
        bottom: index % 3 === 0 ? 10 : index % 2 === 0 ? 25 : 15,
        size: 7 + (index % 5),
      })),
    [],
  );

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

    const timer = setTimeout(() => {
      router.replace("/autenticacao");
    }, 5000);

    return () => clearTimeout(timer);
  }, [animatedValues, dots]);

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
