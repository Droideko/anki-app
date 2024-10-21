import { useThemeColor } from "@/src/shared/hooks/useThemeColor";
import ThemedButton from "../../../shared/components/ui/ThemedButton";
// import { useSession } from "@/src/contexts/SessionProvider";
import { router } from "expo-router";

function DeleteAccountButton() {
  // const { signOut } = useSession();
  const { error, backdrop, background } = useThemeColor();

  const onPress = async () => {
    // await signOut();
    // delete account
    router.replace("/welcome");
  };

  return (
    <ThemedButton buttonColor={background} textColor={error} onPress={onPress}>
      Delete Account
    </ThemedButton>
  );
}

export default DeleteAccountButton;
