import { Card } from '@shared/store/useCardsStore';
import { PartialWithRequiredKeys } from '@shared/types/global';

export type CardWithCardId = Card & { cardId: number };

export interface CardFormValue {
  deckId: number;
  card: PartialWithRequiredKeys<CardWithCardId, 'front' | 'back'>;
}
