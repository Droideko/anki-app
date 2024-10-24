import { useState } from 'react';

import { CATEGORY_SEGMENT_BUTTON } from '../constants';
import isCategorySegmentButtonValue from '../utils/isCategorySegmentButtonValue';
import { CategorySegmentButtonValues } from '../types';

function useSegmentedButtons() {
  const [value, setValue] = useState<CategorySegmentButtonValues>(
    CATEGORY_SEGMENT_BUTTON.deck.value,
  );

  const onChange = (newValue: string) => {
    if (isCategorySegmentButtonValue(newValue)) {
      setValue(newValue);
    } else {
      console.warn(`Not allowed value: ${newValue}`);
    }
  };

  return [value, onChange] as const;
}

export default useSegmentedButtons;
