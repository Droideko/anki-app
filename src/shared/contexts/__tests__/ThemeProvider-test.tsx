import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import ThemeProvider, {
  useTheme,
} from "@/src/shared/contexts/CustomThemeProvide";
import { THEME, THEME_KEY } from "@/src/shared/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";

// Мокируем useColorScheme
jest.mock("react-native/Libraries/Utilities/useColorScheme");

const mockedUseColorScheme = useColorScheme as jest.Mock;

describe("Компонент ThemeProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseColorScheme.mockClear();
    (AsyncStorage.getItem as jest.Mock).mockClear();
    (AsyncStorage.setItem as jest.Mock).mockClear();
  });

  it("устанавливает тему на основе системной темы, если сохраненная тема отсутствует", async () => {
    mockedUseColorScheme.mockReturnValue(THEME.DARK);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    let contextValue: any;

    const TestComponent = () => {
      contextValue = useTheme();
      return null;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(contextValue.theme.dark).toBe(true);
    });
  });

  it("переопределяет системную тему сохраненной темой из AsyncStorage", async () => {
    mockedUseColorScheme.mockReturnValue(THEME.LIGHT);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(THEME.DARK);

    let contextValue: any;

    const TestComponent = () => {
      contextValue = useTheme();
      return null;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(THEME_KEY);
      expect(contextValue.theme.dark).toBe(true);
    });
  });

  it("функция toggleTheme переключает тему и обновляет AsyncStorage", async () => {
    mockedUseColorScheme.mockReturnValue(THEME.LIGHT);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    let contextValue: any;

    const TestComponent = () => {
      contextValue = useTheme();
      return null;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Дожидаемся инициализации контекста
    await waitFor(() => {
      expect(contextValue.theme.dark).toBe(false);
    });

    // Переключаем тему
    await waitFor(async () => {
      await contextValue.toggleTheme();
    });

    // Проверяем, что тема изменилась
    expect(contextValue.theme.dark).toBe(true);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(THEME_KEY, THEME.DARK);
  });

  it("хук useTheme выбрасывает ошибку вне ThemeProvider", () => {
    const TestComponent = () => {
      useTheme();
      return null;
    };

    expect(() => render(<TestComponent />)).toThrow(
      "ThemeContext must be used within the ThemeContext"
    );
  });

  it("корректно обрабатывает ошибки при загрузке темы", async () => {
    mockedUseColorScheme.mockReturnValue(THEME.LIGHT);
    (AsyncStorage.getItem as jest.Mock).mockRejectedValue(
      new Error("Ошибка AsyncStorage")
    );

    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    let contextValue: any;

    const TestComponent = () => {
      contextValue = useTheme();
      return null;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(contextValue).toBeDefined();
    });

    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Error loading theme:",
      expect.any(Error)
    );
    consoleLogSpy.mockRestore();
  });

  it("функция toggleTheme устанавливает тему на указанное значение", async () => {
    mockedUseColorScheme.mockReturnValue(THEME.LIGHT);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    let contextValue: any;

    const TestComponent = () => {
      contextValue = useTheme();
      return null;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(contextValue.theme.dark).toBe(false);
    });

    // Устанавливаем тему на темную
    await waitFor(async () => {
      await contextValue.toggleTheme(THEME.DARK);
    });

    expect(contextValue.theme.dark).toBe(true);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(THEME_KEY, THEME.DARK);
  });

  it("устанавливает значение colorScheme в соответствии с текущей темой", async () => {
    mockedUseColorScheme.mockReturnValue(THEME.LIGHT);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    let contextValue: any;

    const TestComponent = () => {
      contextValue = useTheme();
      return null;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(contextValue.colorScheme).toBe(THEME.LIGHT);
    });

    // Переключаем тему
    await waitFor(async () => {
      await contextValue.toggleTheme();
    });

    expect(contextValue.colorScheme).toBe(THEME.DARK);
  });
});
