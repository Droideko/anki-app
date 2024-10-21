import { useSession } from "@/src/shared/contexts/SessionProvider";
import ThemedButton from "../../../shared/components/ui/ThemedButton";
import { router } from "expo-router";

function LogOutButton() {
  const { signOut } = useSession();

  const onPress = async () => {
    await signOut();
    router.replace("/welcome");
  };

  return <ThemedButton onPress={onPress}>Sign Out</ThemedButton>;
}

export default LogOutButton;
