import { createAction } from "@reduxjs/toolkit";

export const completeAuthLoading = createAction('auth/loadingComplete');

// Optionally export all auth actions together
export const authActions = {
  completeAuthLoading,
  // ...your other actions
};