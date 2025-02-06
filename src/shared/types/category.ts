import {
  ADD_SUBCATEGORY_ITEM,
  DEFAULT_SIGN_UP_VALUES,
} from '@shared/constants/category';
import { DEFAULT_CREATE_DECK_VALUES } from '@shared/constants/deck';
import { Deck } from '@shared/types/deck';

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
  type: 'CATEGORY';
  lastFetched?: string;
};

export type NormalizedCategory = Omit<Category, 'subcategories' | 'decks'> & {
  childIds: number[];
  deckIds: number[];
};

export interface NormalizedCategories {
  categoriesById: Record<number, NormalizedCategory>;
  decksById: Record<number, Deck>;
  rootCategoryIds: number[];
}

export type NormalizedCategoryOrDeck = NormalizedCategory | Deck;

export type SubCategoryItemType =
  | NormalizedCategory
  | Deck
  | typeof ADD_SUBCATEGORY_ITEM;

export type SubCategoryItemTypeWithoutAddSubcategory = Exclude<
  SubCategoryItemType,
  typeof ADD_SUBCATEGORY_ITEM
>;

export type CreateDeckData = typeof DEFAULT_CREATE_DECK_VALUES;

export type SignUpFormData = Record<
  keyof typeof DEFAULT_SIGN_UP_VALUES,
  string
>;

export type LoginFormData = Record<keyof typeof DEFAULT_SIGN_UP_VALUES, string>;
