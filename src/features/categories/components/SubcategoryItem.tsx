import React from 'react';

import SubcategoryAddItem from './SubcategoryAddItem';
import SubcategoryTouchable from './SubcategoryTouchable';

import { ADD_SUBCATEGORY_ITEM } from '@features/categories/constants';
import {
  NormalizedCategory,
  SubCategoryItemType,
} from '@shared/types/category';

type SubcategoryItemProps = {
  parentCategoryId: NormalizedCategory['id'];
  item: SubCategoryItemType;
};

function SubcategoryItem({ parentCategoryId, item }: SubcategoryItemProps) {
  if (item.id === ADD_SUBCATEGORY_ITEM.id) {
    return <SubcategoryAddItem parentCategoryId={parentCategoryId} />;
  }

  return <SubcategoryTouchable item={item} />;
}

export default SubcategoryItem;
