import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Profile",
            title: "overview",
          }}
        />
        {/* <Drawer.Screen
          name="news"
          options={{
            drawerLabel: "News",
            title: "overview",
          }}
        /> */}
        {/* <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            title: "overview",
          }}
        />
        <Drawer.Screen
          name="user/[id]" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "User",
            title: "overview",
          }}
        /> */}
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default Layout;
