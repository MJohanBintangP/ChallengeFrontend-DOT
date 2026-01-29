export const saveState = (key, state) => {
  try {
    if (!key) throw new Error("Key is required for saveState");
    localStorage.setItem(key, JSON.stringify(state));
  } catch (e) {
    console.error(`[localStorage] saveState error for key "${key}":`, e);
  }
};

export const loadState = (key) => {
  try {
    if (!key) throw new Error("Key is required for loadState");
    const saved = localStorage.getItem(key);
    if (!saved) return undefined;
    return JSON.parse(saved);
  } catch (e) {
    console.error(`[localStorage] loadState error for key "${key}":`, e);
    return undefined;
  }
};

export const clearState = (key) => {
  try {
    if (!key) throw new Error("Key is required for clearState");
    localStorage.removeItem(key);
  } catch (e) {
    console.error(`[localStorage] clearState error for key "${key}":`, e);
  }
};
