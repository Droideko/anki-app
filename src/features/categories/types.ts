import {
  CATEGORY_SEGMENT_BUTTON,
  DEFAULT_CREATE_CATEGORY_VALUES,
  DEFAULT_UPDATE_CATEGORY_VALUES,
} from '@features/categories/constants';
import { Brand } from '@shared/types/global';
import { Category } from '@shared/types/category';

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
