// Copyright (C) 2024-2026 Dejoiy

// Extend ActionCable types globally.
declare global {
  namespace ActionCable {
    interface Connection {
      events: {
        open: () => void
        close: () => void
        error: () => void
      }
      triedToReconnect: () => boolean
      reopenCalled: boolean
    }
  }
}

export {}
