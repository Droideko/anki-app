import { CategorySegmentButtonValues } from '../types';

import { CATEGORY_SEGMENT_BUTTON } from '@features/categories/constants';

const isCategorySegmentButtonValue = (
  value: string,
): value is CategorySegmentButtonValues => {
  return Object.values(CATEGORY_SEGMENT_BUTTON).some(
    (button) => button.value === value,
  );
};

export default isCategorySegmentButtonValue;
