import NetInfo from '@react-native-community/netinfo';
// import { useSQLiteContext } from 'expo-sqlite';

// import { deckService } from '@shared/api/apiService';
import { useUserStore } from '@shared/store/useUserStore';
import { useCategoriesStore } from '@shared/store/useCategoriesStore';
import { Deck, DeckFormData } from '@shared/types/deck';
import saveDeckToSQLite from '@shared/db/deck/saveDeckToSQLite';
import getDeckFromSQLite from '@shared/db/deck/getDeckFromSQLite';
import { deckService } from '@shared/api/deckService';
import useGetSQLiteContext from '@shared/utils/isWeb/useGetSQLiteContext';

export const useDeckRepository = () => {
  // const db = isWeb() ? null : useSQLiteContext();

  const db = useGetSQLiteContext();

  const { user } = useUserStore();
  const {
    addDeck,
    updateDeck: updateDeckInStore,
    deleteDeck: deleteDeckFromStore,
  } = useCategoriesStore();

  // const getDecks = async (): Promise<Deck[]> => {
  //   const networkState = await NetInfo.fetch();

  //   if (networkState.isConnected) {
  //     try {
  //       const response = await apiService.getDecks();
  //       const decks = response.data;

  //       if (db) {
  //         await db.withTransactionAsync(async () => {
  //           for (const deck of decks) {
  //             await saveDeckToSQLite(db, deck);
  //           }
  //         });
  //       }

  //       // Обновляем Zustand-хранилище
  //       decks.forEach((deck) => {
  //         addDeck(deck);
  //       });

  //       return decks;
  //     } catch (error: unknown) {
  //       if (error instanceof Error) {
  //         throw new Error(
  //           "Ошибка при получении колод с сервера: " + error.message
  //         );
  //       }
  //       throw new Error("Что-то пошло не так!");
  //     }
  //   } else {
  //     try {
  //       if (!db) {
  //         throw new Error("Браузер не поддерживается");
  //       }

  //       const decks = await getDecksFromSQLite(db);

  //       // Обновляем Zustand-хранилище
  //       decks.forEach((deck) => {
  //         addDeck(deck);
  //       });

  //       return decks;
  //     } catch (error: unknown) {
  //       if (error instanceof Error) {
  //         throw new Error(
  //           "Ошибка при получении колод из SQLite: " + error.message
  //         );
  //       }
  //       throw new Error("Что-то пошло не так!");
  //     }
  //   }
  // };

  const getDeck = async (id: number): Promise<Deck> => {
    const networkState = await NetInfo.fetch();

    if (networkState.isConnected) {
      try {
        const deck = await deckService.getDeck(id);

        if (db) {
          await saveDeckToSQLite(db, deck);
        }

        // Обновляем Zustand-хранилище
        addDeck(deck);

        return deck;
      } catch (error: any) {
        throw new Error(
          'Ошибка при получении колоды с сервера: ' + error.message,
        );
      }
    } else {
      try {
        if (!db) {
          throw new Error('Браузер не поддерживается');
        }

        const deck = await getDeckFromSQLite(db, id);

        // Обновляем Zustand-хранилище
        addDeck(deck);

        return deck;
      } catch (error: any) {
        throw new Error(
          'Ошибка при получении колоды из SQLite: ' + error.message,
        );
      }
    }
  };

  const createDeck = async (data: DeckFormData): Promise<Deck> => {
    console.log('createDeck');

    if (!user?.id) {
      throw new Error('Пользователь не авторизован');
    }

    const networkState = await NetInfo.fetch();

    if (networkState.isConnected) {
      try {
        const deck = await deckService.createDeck(data);

        if (db) {
          await saveDeckToSQLite(db, deck);
        }

        // Обновляем Zustand-хранилище
        addDeck(deck);

        return deck;
      } catch (error: any) {
        throw new Error(
          'Ошибка при создании колоды на сервере: ' + error.message,
        );
      }
    } else {
      try {
        if (!db) {
          throw new Error('Браузер не поддерживается');
        }

        // Генерируем временный ID (нужно продумать механизм синхронизации)
        const tempId = Date.now();

        const newDeck: Deck = {
          id: tempId,
          name: data.name || 'Untitled Deck',
          userId: Number(user.id),
          categoryId: data.categoryId!,
          accessLevel: 'PRIVATE',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          type: 'DECK',
        };

        // Сохраняем колоду в SQLite
        await saveDeckToSQLite(db, newDeck);

        // Обновляем Zustand-хранилище
        addDeck(newDeck);

        // Добавляем в очередь синхронизации, если требуется

        return newDeck;
      } catch (error: any) {
        throw new Error(
          'Ошибка при создании колоды в офлайн-режиме: ' + error.message,
        );
      }
    }
  };

  // const updateDeck = async (id: number, data: Partial<Deck>): Promise<Deck> => {
  //   const networkState = await NetInfo.fetch();

  //   if (networkState.isConnected) {
  //     try {
  //       const response = await apiService.updateDeck(id, data);
  //       const deck = response.data;

  //       // Обновляем колоду в SQLite
  //       if (db) {
  //         await saveDeckToSQLite(db, deck);
  //       }

  //       // Обновляем Zustand-хранилище
  //       updateDeckInStore(deck);

  //       return deck;
  //     } catch (error: any) {
  //       throw new Error(
  //         "Ошибка при обновлении колоды на сервере: " + error.message
  //       );
  //     }
  //   } else {
  //     try {
  //       if (!db) {
  //         throw Error("Браузер не поддерживается");
  //       }

  //       // Обновляем колоду в SQLite
  //       await db.runAsync(
  //         `UPDATE Deck SET
  //           name = COALESCE(?, name),
  //           categoryId = COALESCE(?, categoryId),
  //           accessLevel = COALESCE(?, accessLevel),
  //           updatedAt = ?
  //         WHERE id = ?;`,
  //         data.name ?? null,
  //         data.categoryId ?? null,
  //         data.accessLevel ?? null,
  //         new Date().toISOString(),
  //         id
  //       );

  //       // Получаем обновленную колоду из SQLite
  //       const deck = await getDeckFromSQLite(db, id);

  //       // Обновляем Zustand-хранилище
  //       updateDeckInStore(deck);

  //       // Добавляем в очередь синхронизации, если требуется

  //       return deck;
  //     } catch (error: any) {
  //       throw new Error(
  //         "Ошибка при обновлении колоды в офлайн-режиме: " + error.message
  //       );
  //     }
  //   }
  // };

  const deleteDeck = async (id: number): Promise<void> => {
    const networkState = await NetInfo.fetch();

    if (networkState.isConnected) {
      try {
        await apiService.deleteDeck(id);

        // Удаляем колоду из SQLite
        if (db) {
          await deleteDeckFromSQLite(db, id);
        }

        // Обновляем Zustand-хранилище
        deleteDeckFromStore(id);
      } catch (error: any) {
        throw new Error(
          'Ошибка при удалении колоды на сервере: ' + error.message,
        );
      }
    } else {
      try {
        if (!db) {
          throw new Error('Браузер не поддерживается');
        }

        // Удаляем колоду из SQLite
        await deleteDeckFromSQLite(db, id);

        // Обновляем Zustand-хранилище
        deleteDeckFromStore(id);

        // Добавляем в очередь синхронизации, если требуется
      } catch (error: any) {
        throw new Error(
          'Ошибка при удалении колоды в офлайн-режиме: ' + error.message,
        );
      }
    }
  };

  return {
    // getDecks,
    getDeck,
    createDeck,
    // updateDeck,
    deleteDeck,
  };
};
