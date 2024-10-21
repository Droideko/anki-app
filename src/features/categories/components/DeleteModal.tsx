import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useModalStore } from "@/src/shared/store/useModalStore";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";
import { useCategoryRepository } from "@/src/features/categories/hooks/useCategoryRepository";
import { ThemedView } from "@/src/shared/components/ui/ThemedView";
import { Text } from "@/src/shared/components/ui/ThemedText";

export default function DeleteModal() {
  const { isDeleteModalVisible, hideDeleteModal, selectedCategory } =
    useModalStore();

  const { deleteCategory } = useCategoryRepository();
  const { error, primary, background, border } = useThemeColor();

  const onDelete = async () => {
    try {
      if (selectedCategory === null) {
        throw new Error("Selected category is null");
      }
      await deleteCategory(selectedCategory.id);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      hideDeleteModal();
    }
  };

  if (!isDeleteModalVisible || !selectedCategory) {
    return null;
  }

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isDeleteModalVisible}
    >
      <Pressable style={styles.deleteModalOverlay} onPress={hideDeleteModal}>
        <Pressable style={styles.deleteModalContent} pointerEvents="box-none">
          <ThemedView
            style={[
              styles.deleteModalContentInner,
              { backgroundColor: background, borderColor: border },
            ]}
            pointerEvents="box-none"
          >
            <Text style={styles.deleteModalText}>
              Delete "{selectedCategory.name}"?
            </Text>
            <View style={styles.deleteModalButtons}>
              <TouchableOpacity
                style={[{ backgroundColor: primary }, styles.button]}
                onPress={hideDeleteModal}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[{ backgroundColor: error }, styles.button]}
                onPress={onDelete}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  deleteModalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteModalContent: {
    width: "80%",
  },
  deleteModalContentInner: {
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
  },
  deleteModalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  deleteModalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    minWidth: 100,
    padding: 10,
    borderRadius: 6,
  },
  buttonText: {
    textAlign: "center",
  },
});
