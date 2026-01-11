import { ListItem } from '../types';

const getKeyExtractor = (item: ListItem, index: number) => {
  if (item.type === 'header') {
    return `header-${item.title}-${index}`;
  }
  return `${item.type}-${item.item.id}`;
};

export default getKeyExtractor;
