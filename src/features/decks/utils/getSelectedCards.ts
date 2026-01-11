import { customAlphabet } from 'nanoid/non-secure';

import { CreatedCardFormValues } from '../types';

import { Card } from '@shared/api/openaiService';

const nanoidNumeric = customAlphabet('0123456789', 10);

export interface FormExample {
  front: string;
  back: string;
  // exampleId: number; // временный идентификатор
}

export interface FormCard {
  front: string;
  back: string;
  examples: FormExample[];
}

export default function getSelectedCards(
  data: CreatedCardFormValues,
  cards: Card[],
): FormCard[] {
  return data.cards.reduce<FormCard[]>((acc, flags, cardIndex) => {
    if (!flags.selected) return acc;

    const card = cards[cardIndex];
    const filtered = (card.examples ?? []).filter(
      (_, exampleIndex) => flags.examples[exampleIndex],
    );
    const examples: FormExample[] = filtered.map((ex) => ({
      front: ex.front,
      back: ex.back,
      // exampleId: Number(nanoidNumeric()),
    }));

    acc.push({
      front: card.front,
      back: card.back,
      examples: examples,
    });
    return acc;
  }, []);
}

// type UpdateExampleDto = { id: number; front: string; back: string };

// export type UpdateCardDto = {
//   front: string;
//   back: string;
//   examples?: UpdateExampleDto[];
// };

// export default function getSelectedCards(
//   data: CreatedCardFormValues,
//   cards: Card[],
// ) {
//   return data.cards.reduce<UpdateCardDto[]>((acc, flags, i) => {
//     if (!flags.selected) {
//       return acc;
//     }

//     const card = cards[i];
//     const filteredExamples = (card.examples ?? []).filter(
//       (_, exampleIndex) => flags.examples[exampleIndex],
//     );

//     acc.push({
//       front: card.front,
//       back: card.back,
//       examples: filteredExamples.length ? filteredExamples : [],
//     } satisfies UpdateCardDto);

//     return acc;
//   }, []);
// }
