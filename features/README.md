# Features

This directory contains all feature-related code organized in modular, self-contained feature folders.

## 📋 Folder Structure

Each feature should follow this recommended structure:

```
features/
├── feature_name/ (e.g., task_management)
│   ├── components/
│   │   ├── FeatureCard.tsx
│   │   ├── FeatureForm.tsx
│   │   └── FeatureList.tsx
│   ├── hooks/
│   │   ├── useFeature.ts
│   │   └── useFeatureForm.ts
│   ├── services/
│   │   ├── createFeature.ts
│   │   ├── updateFeature.ts
│   │   ├── getFeature.ts
│   │   ├── getFeatures.ts
│   │   └── deleteFeature.ts
│   ├── utils/
│   │   ├── helpers.ts
│   │   └── validators.ts
│   ├── types.ts
│   └── index.ts
└── another_feature/
    └── ...
```

## 📁 Folder Purposes

| Folder | Purpose |
|--------|---------|
| `components/` | Reusable UI components specific to this feature (e.g., `FeatureCard.tsx`, `FeatureForm.tsx`) |
| `hooks/` | Custom React hooks for feature logic (e.g., `useFeature.ts`) |
| `services/` | Server actions or API calls (e.g., `createFeature()`, `updateFeature()`, `getFeature()`) |
| `utils/` | Helper functions and utilities specific to the feature |
| `types.ts` | TypeScript interfaces and types (e.g., `FeatureType`, `FeaturePayload`) |
| `index.ts` | Barrel export file for clean imports |

## ✅ Best Practices

- **Keep it modular**: Each feature should be self-contained and independent
- **Avoid codebase complexity**: Don't mix concerns or create cross-feature dependencies
- **Use barrel exports**: Export from `index.ts` to simplify imports
- **Name with context**: Use clear, descriptive names that reflect the feature's purpose
- **Scalability**: Structure follows a pattern that scales well as features grow