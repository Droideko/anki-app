import { Pressable, StyleSheet } from "react-native";
import { Divider, Icon } from "react-native-paper";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";
import { useModalStore } from "@/src/shared/store/useModalStore";
import { Text } from "@/src/shared/components/ui/ThemedText";

function CategoryModalMenuContent() {
  const { error } = useThemeColor();
  const { hideModal, showDeleteModal, selectedCategory } = useModalStore();

  const onDelete = () => {
    hideModal();
    showDeleteModal(selectedCategory);
  };

  return (
    <>
      <Pressable style={styles.item} onPress={() => {}}>
        <Text variant="bodyMedium">Share</Text>
        <Icon size={25} source="share-variant" />
      </Pressable>
      <Divider />
      <Pressable style={styles.item} onPress={onDelete}>
        <Text variant="bodyMedium" style={{ color: error }}>
          Delete
        </Text>
        <Icon size={25} source="delete" color={error} />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});

export default CategoryModalMenuContent;
