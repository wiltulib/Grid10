interface CadeplaySDKGlobal {
  gameLoadingStart(): void;
  gameLoadingFinished(): void;
  gameplayStart(): void;
  gameplayStop(): void;
  // We'll add more as we need them
}

declare global {
  interface Window {
    CadeplaySDK?: CadeplaySDKGlobal;
  }
}

export {};
