export const useSQLiteContext = jest.fn();

const mockDb = {
  runAsync: jest.fn(),
  getFirstAsync: jest.fn(),
  getAllAsync: jest.fn(),
  withTransactionAsync: jest.fn(),
};

useSQLiteContext.mockReturnValue(mockDb);
