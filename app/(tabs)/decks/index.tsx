import DecksContainer from "@/components/Decks/DecksContainer";
import { SafeThemedView } from "@/src/shared/components/SafeThemedView";

export default function DecksScreen() {
  return (
    <SafeThemedView>
      <DecksContainer />
    </SafeThemedView>
  );
}
