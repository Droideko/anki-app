// import { useThemeColor } from "@/hooks/useThemeColor";
// import React, { useEffect } from "react";
// import { StyleProp, StyleSheet, View } from "react-native";
// import { IconButton } from "react-native-paper";
// import Animated, {
//   Easing,
//   useSharedValue,
//   useAnimatedProps,
//   withTiming,
//   withRepeat,
// } from "react-native-reanimated";
// import Svg, { Circle } from "react-native-svg";

// const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// interface OwnProps {
//   children: React.ReactNode;
//   isActivePulse: boolean;
//   style: StyleProp<any>;
//   iconSize: number;
// }

// const WaveCircle = () => {
//   const { primary } = useThemeColor();
//   const radius = useSharedValue(0);
//   const opacity = useSharedValue(1);

//   // Настройка анимации радиуса
//   const animatedProps = useAnimatedProps(() => {
//     return {
//       r: radius.value.toString(),
//       opacity: opacity.value,
//     };
//   });

//   // Запуск анимации при монтировании компонента
//   useEffect(() => {
//     radius.value = withRepeat(
//       withTiming(60, {
//         duration: 2000,
//         easing: Easing.out(Easing.ease),
//       }),
//       -1,
//       false
//     );

//     opacity.value = withRepeat(
//       withTiming(0, {
//         duration: 2000,
//         easing: Easing.out(Easing.ease),
//       }),
//       -1,
//       false
//     );
//   }, []);

//   return (
//     <Svg style={StyleSheet.absoluteFill} viewBox="0 0 120 120">
//       <AnimatedCircle
//         cx="60"
//         cy="60"
//         fill={primary}
//         animatedProps={animatedProps}
//       />
//     </Svg>
//   );
// };

// const WaveIconWrapper = ({
//   children,
//   isActivePulse,
//   style,
//   iconSize,
// }: OwnProps) => {
//   const { background } = useThemeColor();

//   const getCoverStyles = (size: number) => {
//     return {
//       width: size - size / 5,
//       height: size - size / 5,
//       borderRadius: (size - size / 5) / 2,
//     };
//   };

//   return (
//     <View style={{ ...style, ...styles.container }}>
//       <WaveCircle />
//       <View
//         style={{
//           ...getCoverStyles(iconSize),
//           backgroundColor: background, // взять фон бэка
//           ...styles.backgroundCover,
//         }}
//       />
//       {children}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: "absolute",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   iconButton: {
//     position: "absolute",
//   },
//   backgroundCover: {
//     position: "absolute",
//     // width: 20,
//     // height: 20,
//     // borderRadius: 10,
//     // backgroundColor: "black", // Цвет фона, который перекроет анимацию под иконкой
//   },
// });

// // const WaveCircle = () => {
// //   const { primary } = useThemeColor();
// //   const radius = useSharedValue(0);
// //   const opacity = useSharedValue(1);

// //   // Настройка анимации радиуса
// //   const animatedProps = useAnimatedProps(() => {
// //     return {
// //       r: radius.value.toString(),
// //       opacity: opacity.value,
// //     };
// //   });

// //   // Запуск анимации при монтировании компонента
// //   useEffect(() => {
// //     radius.value = withRepeat(
// //       withTiming(60, {
// //         duration: 2000,
// //         easing: Easing.out(Easing.ease),
// //       }),
// //       -1,
// //       false
// //     );

// //     opacity.value = withRepeat(
// //       withTiming(0, {
// //         duration: 2000,
// //         easing: Easing.out(Easing.ease),
// //       }),
// //       -1,
// //       false
// //     );
// //   }, []);

// //   return (
// //     <Svg style={StyleSheet.absoluteFill} viewBox="0 0 120 120">
// //       <AnimatedCircle
// //         cx="60"
// //         cy="60"
// //         fill={primary}
// //         animatedProps={animatedProps}
// //       />
// //     </Svg>
// //   );
// // };

// // const WaveIconWrapper = ({
// //   children,
// //   isActivePulse,
// //   style,
// //   iconSize,
// // }: OwnProps) => {
// //   const { background } = useThemeColor();

// //   const getCoverStyles = (size: number) => {
// //     return {
// //       width: size - size / 5,
// //       height: size - size / 5,
// //       borderRadius: (size - size / 5) / 2,
// //     };
// //   };

// //   return (
// //     <View style={{ ...style, ...styles.container }}>
// //       {isActivePulse && <WaveCircle />}
// //       <View
// //         style={{
// //           backgroundColor: background,
// //           ...getCoverStyles,
// //           ...styles.backgroundCover,
// //         }}
// //       />
// //       {children}
// //     </View>
// //   );
// // };

// export default WaveIconWrapper;

// // const WaveIconButton = () => {
// //   const radius = useSharedValue(0);
// //   const opacity = useSharedValue(1);

// //   const animatedProps = useAnimatedProps(() => {
// //     return {
// //       r: radius.value.toString(),
// //       opacity: opacity.value,
// //     };
// //   });

// //   useEffect(() => {
// //     radius.value = withRepeat(
// //       withTiming(60, {
// //         duration: 2000,
// //         easing: Easing.out(Easing.ease),
// //       }),
// //       -1,
// //       false
// //     );

// //     opacity.value = withRepeat(
// //       withTiming(0, {
// //         duration: 2000,
// //         easing: Easing.out(Easing.ease),
// //       }),
// //       -1,
// //       false
// //     );
// //   }, []);

// //   return (
// //     <View style={styles.container}>
// //       <Svg style={StyleSheet.absoluteFill} viewBox="0 0 120 120">
// //         <AnimatedCircle
// //           cx="60"
// //           cy="60"
// //           fill="red"
// //           animatedProps={animatedProps}
// //         />
// //       </Svg>
// //       <View style={styles.backgroundCover} />
// //       <IconButton
// //         icon="plus-circle"
// //         size={30}
// //         onPress={() => console.log("Pressed")}
// //         iconColor="white"
// //         style={styles.iconButton}
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     justifyContent: "center",
// //     alignItems: "center",
// //     width: 120,
// //     height: 120,
// //   },
// //   iconButton: {
// //     position: "absolute",
// //   },
// //   backgroundCover: {
// //     position: "absolute",
// //     width: 20,
// //     height: 20,
// //     borderRadius: 10,
// //     backgroundColor: "black", // Цвет фона, который перекроет анимацию под иконкой
// //   },
// // });

// // export default WaveIconButton;
