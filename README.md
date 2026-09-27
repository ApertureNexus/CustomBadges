# CustomBadges

Custom profile badges for Discord, via [Vencord](https://vencord.dev/).
Shows a curated set of badges on your own profile — pure client-side
cosmetic patch, visible only to you, nothing sent anywhere.

Part of [NexusResearch](https://github.com/NexusResearch).

Lead Maintainer: [NexzaDev](https://github.com/NexzaDev)

## Contents

- **`vencord-plugin/`** — the actual plugin. Drop into
  `src/userplugins/customBadges/` in a Vencord source checkout, then
  `pnpm build && pnpm inject`. Has a full settings tab: one on/off switch
  per badge, in display order, plus a badge-size option. See
  `vencord-plugin/README.md` for step-by-step setup.
- **`browser-extension-legacy/`** — the original standalone Chrome/Vivaldi
  extension version (no settings UI, edit `main.js` directly to configure).
  Kept for reference; the Vencord plugin supersedes it.

## How it works

The plugin patches `UserProfileStore.getUserProfile` at runtime so your own
client injects extra badge entries into your own profile view. It doesn't
touch your account, doesn't affect what other users see, and doesn't talk
to any server.

## License

MIT
