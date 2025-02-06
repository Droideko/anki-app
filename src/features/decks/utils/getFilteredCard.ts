import { CardFormValues } from '../components/DeckCardsContainer';

const getFilteredCard = (cards: CardFormValues['cards']) =>
  cards.filter((card) => card.front.trim() || card.back.trim());

export default getFilteredCard;
