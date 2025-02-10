// localStorageUtils.ts
export const getLocalStorageItem = (key: string, defaultValue: string): string => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? storedValue : defaultValue;
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return defaultValue;
    }
  };
  
  export const setLocalStorageItem = (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error setting localStorage item:', error);
    }
  };
  