import { FlatListProps } from 'react-native';

import {
  CATEGORY_SEGMENT_BUTTON,
  DEFAULT_CREATE_CATEGORY_VALUES,
  DEFAULT_UPDATE_CATEGORY_VALUES,
} from '@features/categories/constants';
import { Brand } from '@shared/types/global';
import { Category, NormalizedCategory } from '@shared/types/category';
import { Deck } from '@shared/types/deck';

export type CategoryFormData = {
  name: string;
  parentId?: number;
  accessLevel?: string;
};

export type CategoryWithoutSubcategories = Omit<Category, 'subcategories'>;

export type CreateCategoryData = typeof DEFAULT_CREATE_CATEGORY_VALUES;
export type UpdateCategoryData = typeof DEFAULT_UPDATE_CATEGORY_VALUES;

export type CategorySegmentButtonValues =
  (typeof CATEGORY_SEGMENT_BUTTON)[keyof typeof CATEGORY_SEGMENT_BUTTON]['value'];

export type MenuHeight = Brand<number, 'MenuHeight'>;
export type MenuWidth = Brand<number, 'MenuWidth'>;

export type BrandedMenuSize = {
  height: MenuHeight;
  width: MenuWidth;
};

export type ListItem =
  | { type: 'header'; title: string }
  | { type: 'category'; item: NormalizedCategory }
  | { type: 'deck'; item: Deck };

export type RenderersCategoryFactory = {
  [K in ListItem['type']]: React.ComponentType<Extract<ListItem, { type: K }>>;
};
