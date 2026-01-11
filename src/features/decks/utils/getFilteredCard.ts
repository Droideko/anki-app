import { CardFormValues } from '../components/DeckCardsContainer';

const isEmptyCard = (card: { front?: string; back?: string }) =>
  !card.front?.trim() && !card.back?.trim();

export default function getFilteredCard(cards: CardFormValues['cards']) {
  return cards
    .filter((card) => !isEmptyCard(card))
    .map((card) => ({
      ...card,
      examples: (card.examples ?? []).filter((ex) => !isEmptyCard(ex)),
    }));
}
