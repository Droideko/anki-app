import {
  ADD_SUBCATEGORY_ITEM,
  CATEGORY_SEGMENT_BUTTON,
  DEFAULT_CREATE_CATEGORY_VALUES,
  DEFAULT_UPDATE_CATEGORY_VALUES,
} from "@/src/features/categories/constants";
import { NormalizedCategory } from "@/src/features/categories/utils/normalizeCategories";
import { Deck } from "@/src/shared/types/deck";
import { Brand } from "@/src/shared/types/global";

export type Category = {
  id: number;
  name: string;
  userId: number;
  parentId: null | number;
  accessLevel: string;
  createdAt: string;
  updatedAt: string;
  decks: Deck[];
  subcategories?: Category[];
  type: "CATEGORY";
};

export type Categories = Category[];

export type CategoryFormData = {
  name: string;
  parentId?: number;
  accessLevel?: string;
};

export type CategoryWithoutSubcategories = Omit<Category, "subcategories">;

export type CreateCategoryData = typeof DEFAULT_CREATE_CATEGORY_VALUES;
export type UpdateCategoryData = typeof DEFAULT_UPDATE_CATEGORY_VALUES;

export type CategorySegmentButtonValues =
  (typeof CATEGORY_SEGMENT_BUTTON)[keyof typeof CATEGORY_SEGMENT_BUTTON]["value"];

export type SubCategoryItemType =
  | NormalizedCategory
  | Deck
  | typeof ADD_SUBCATEGORY_ITEM;

export type SubCategoryItemTypeWithoutAddSubcategory = Exclude<
  SubCategoryItemType,
  typeof ADD_SUBCATEGORY_ITEM
>;

export type MenuHeight = Brand<number, "MenuHeight">;
export type MenuWidth = Brand<number, "MenuWidth">;
