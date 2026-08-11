import { useSyncExternalStore } from "react";

let state = {
  user: getStoredUser(),
  isAuthenticated: Boolean(
    localStorage.getItem("accessToken")
  ),
};

const listeners = new Set();

function getStoredUser() {
  try {
    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return state;
}

export function useAuthStore() {
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getSnapshot
  );
}

export function setAuth(user) {
  state = {
    user,
    isAuthenticated: true,
  };

  emitChange();
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");

  state = {
    user: null,
    isAuthenticated: false,
  };

  emitChange();
}