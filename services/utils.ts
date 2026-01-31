// Backward-compatibility re-export
// Previously this file contained Firestore helper implementations.
// Keep this file to avoid breaking imports from `services/utils` and re-export
// the actual implementations from `services/firebase/utils`.
export * from './firebase/utils';
