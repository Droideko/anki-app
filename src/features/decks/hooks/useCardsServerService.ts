import withErrorHandling from '@features/categories/utils/withErrorHandling';
import { deckService } from '@shared/api/deckService';
import { Card } from '@shared/store/useCardsStore';
import { Deck } from '@shared/types/deck';
import useGetSQLiteContext from '@shared/utils/isWeb/useGetSQLiteContext';

const useCardsServerService = () => {
  const db = useGetSQLiteContext();

  const getDeck = async (id: number): Promise<Deck> =>
    withErrorHandling(async () => {
      console.log('requested getCategories');
      const categories = await deckService.getDeck();

      if (db) {
        // await db.withTransactionAsync(async () => {
        //   for (const category of categories) {
        //     await saveCategoryToSQLite(db, category);
        //   }
        // });
      }

      const cardWithTimestamp = categories.map((category) => ({
        ...category,
        lastFetched: new Date().toISOString(),
      }));

      setCategories(categoriesWithTimestamp);
      return categoriesWithTimestamp;
    });
};
