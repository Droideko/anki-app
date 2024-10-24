import { Dimensions } from 'react-native';

export const DEFAULT_CREATE_CATEGORY_VALUES = {
  name: '',
} as const;

export const DEFAULT_UPDATE_CATEGORY_VALUES = {
  name: '',
} as const;

export const KEYBOARD_OFFSET_IOS = 95;
export const CREATE_CATEGORY_ICON_SIZE = 50;

export const CATEGORY_SEGMENT_BUTTON = {
  deck: {
    value: 'deck',
    label: 'Deck',
    icon: 'cards',
  },
  category: {
    value: 'category',
    label: 'Category',
    icon: 'folder',
  },
} as const;

const { width } = Dimensions.get('window');

export const ITEM_WIDTH = width * 0.7; // Устанавливаем ширину элемента меньше ширины экрана
export const ITEM_SPACING = 16; // Отступ между элементами

export const ADD_SUBCATEGORY_ITEM = {
  id: 'add_new',
} as const;
