import LogOutButton from "@/components/auth/LogOutButton";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { StyleSheet } from "react-native";

function HomeContainer() {
  return (
    <ParallaxScrollView>
      <ThemedView>
        <LogOutButton />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

export default HomeContainer;

{
  /* <ParallaxScrollView>
      <ThemedView style={styles.titleContainer}>
        <Pressable onPress={() => console.log("WWWWWWW")}></Pressable>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <Text>{i18n.t("common.yes")}</Text>
        <Link href="/login">Log In</Link>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <Link href="/details/25">Details 25</Link>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <Link href="/drawer/profile" asChild>
          <Button title="drawer"></Button>
        </Link>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <Link href="/details/115" asChild>
          <Button title="Open Details 115"></Button>
        </Link>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <Link href="/decks" asChild>
          <Button title="Open decks"></Button>
        </Link>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <Link href="/broken-view" asChild>
          <Button title="broken-view"></Button>
        </Link>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <Link href="/modal" asChild>
          <Button title="modal"></Button>
        </Link>
      </ThemedView>
      <ThemedView>
        <CustomSwitch />
      </ThemedView>
      <ThemedView>
        <LogOutButton />
      </ThemedView>
    </ParallaxScrollView> */
}
