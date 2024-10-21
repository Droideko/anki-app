import { Card, Icon } from "react-native-paper";
import { HEIGHT_CATEGORY_CAROUSEL } from "@/src/features/categories/constants";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";
import { SubCategoryItemTypeWithoutAddSubcategory } from "@/src/types/category";
import { StyleProp, ViewStyle } from "react-native";

interface SubcategoryCardProps {
  item: SubCategoryItemTypeWithoutAddSubcategory;
  style?: StyleProp<ViewStyle>;
}

function SubcategoryCard({ item, style }: SubcategoryCardProps) {
  const { border, secondary, elevation } = useThemeColor();

  return (
    <Card
      mode="elevated"
      style={[
        {
          height: HEIGHT_CATEGORY_CAROUSEL,
          borderBlockEndColor: border,
          backgroundColor: elevation.level1,
        },
        style,
      ]}
    >
      <Card.Title
        style={{ minHeight: HEIGHT_CATEGORY_CAROUSEL }}
        titleStyle={{ marginBottom: 0, alignContent: "center" }}
        title={item.name}
        left={() => (
          <Icon
            source={item.type === "CATEGORY" ? "folder" : "cards"}
            color={secondary}
            size={30}
          />
        )}
      />
    </Card>
  );
}

export default SubcategoryCard;
