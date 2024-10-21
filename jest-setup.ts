import "@testing-library/jest-native/extend-expect";
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { jest } from "@jest/globals";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("react-native/Libraries/Utilities/useColorScheme", () => ({
  __esModule: true,
  default: jest.fn(() => "light"),
}));
