# CustomBadger

Custom profile badges for Discord, via [Vencord](https://vencord.dev/).
Shows a curated set of badges on your own profile — a pure client-side
cosmetic patch, visible only to you, nothing is sent anywhere.

Part of [Nexus](https://github.com/ApertureNexus).

Lead Maintainer: [NexzaDev](https://github.com/NexzaDev), Tester: [ShadowDev7](https://github.com/ShadowDev7)

## Contents

- **`vencord-plugin/`** — the actual plugin. Drop `index.tsx` into
  `src/userplugins/customBadger/` in a Vencord source checkout, then
  `pnpm build && pnpm inject`. The settings tab groups the badges into
  categories (Nitro, Server Boost, Gifting, Account Age, Streaming, Game Time,
  Game Variety, ...), shows the badge icon next to every name, and has an
  on/off switch per badge plus a badge-size option. Step-by-step setup is in
  `vencord-plugin/README.md` (English) and `vencord-plugin/README_Greek.md` (Greek).
- **`badges_index.js`** — reference list of Discord badges (name, category,
  icon URL). Not used by the plugin at runtime; it is the source to copy
  icon hashes from when adding badges.
- **`browser-extension-legacy/`** — the original standalone Chrome/Vivaldi
  extension (no settings UI, edit `main.js` directly). Kept for reference only;
  the Vencord plugin supersedes it. *We do NOT recommend using it.*

## How it works

The plugin patches `UserProfileStore.getUserProfile` at runtime so your own
client injects extra badge entries into your own profile view. Newer SVG-based
badges (Nitro Basic, Account Age, Streaming, Game Time, Game Variety) are added
through Vencord's Badge API instead. It doesn't touch your account, doesn't
affect what other users see, and doesn't talk to any server. It is client-side
only and works **ONLY** with Vencord.

## License

MIT
