import { CATEGORY_SEGMENT_BUTTON } from "@/src/features/categories/constants";
import { CategorySegmentButtonValues } from "../types";

const isCategorySegmentButtonValue = (
  value: string
): value is CategorySegmentButtonValues => {
  return Object.values(CATEGORY_SEGMENT_BUTTON).some(
    (button) => button.value === value
  );
};

export default isCategorySegmentButtonValue;
