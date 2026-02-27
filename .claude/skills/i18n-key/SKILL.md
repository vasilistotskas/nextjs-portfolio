---
name: i18n-key
description: Add, rename, or remove translation keys across both en.json and el.json locale files, keeping them in sync.
---

# i18n Key Manager

Manage translation keys across both locale files: `messages/en.json` and `messages/el.json`.

## Usage

The user will specify one of:
- **Add**: a new key path and values for both English and Greek
- **Rename**: an existing key path to a new path
- **Remove**: an existing key path from both files

## Instructions

1. Read both `messages/en.json` and `messages/el.json` first.
2. Validate the key path uses an existing namespace as the top-level key. Known namespaces: `nav`, `hero`, `skills`, `projects`, `experience`, `about`, `contact`, `footer`, `spotify`, `github`, `notFound`, `common`. If a new top-level namespace is needed, confirm with the user first.
3. Apply the change to **both** files simultaneously.
4. Maintain identical key structure between both files — every key in `en.json` must exist in `el.json` and vice versa.
5. If the user only provides the English value, ask for the Greek translation before writing. If the user says to leave Greek empty or use a placeholder, use the English value prefixed with `[EL] ` as a placeholder.
6. Preserve existing JSON formatting (tabs for indentation, no trailing commas).
7. After editing, show a summary of what changed in both files.
