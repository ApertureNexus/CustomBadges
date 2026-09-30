# CustomBadger — Vencord userplugin

This is no longer a browser extension: it is a real Vencord plugin, so it shows
up under **Vencord → Plugins** with its own settings tab.

## Installation (requires a source build of Vencord — not the official installer)

1. If you do not have the source yet:
   ```
   git clone https://github.com/Vendicated/Vencord
   cd Vencord
   pnpm install
   ```
2. Inside the repo, create the folder:
   ```
   src/userplugins/customBadger/
   ```
3. Put `index.tsx` inside that folder.
4. Build and inject:
   ```
   pnpm build
   pnpm inject
   ```
   (Windows: run `pnpm inject`, then pick your Discord client when asked.)
5. Fully restart Discord (Ctrl+R is not enough — close it completely, also from the tray, and reopen).
6. Discord Settings → Vencord → Plugins → **CustomBadger** → enable it,
   then click the gear icon to open the badge settings.

## The settings tab

- **Badge Size** — number field, size of the badge icons in px.
  `0` = don't override Discord's own size. Note: the size rule applies to badge
  icons everywhere in Discord, not only on your own profile.
- **Badge list** — badges are grouped into categories: Discord & Programs,
  Developer & Bots, Nitro, Server Boost, Gifting, Account Age, Streaming,
  Game Time, Game Variety.
  - Every badge shows its icon next to its name, with its own on/off switch.
  - Click a category title to collapse/expand it; the `3/10` counter shows how
    many badges in it are enabled.
  - **All on / All off** switches every badge in that category at once.
- Changes are applied the next time your profile is rendered — close and reopen
  your profile/popout if you don't see the change immediately.

## Badge order on your profile

Regular badges follow the order of the `BADGE_ORDER` list in `index.tsx`, which
follows Discord's real display order as far as it is known: Discord Staff,
Nitro tiers, Partnered Server Owner, Moderator Programs Alumni, HypeSquad
houses, Bug Hunter, Server Boost, Gifting. Tier badges always go from the lowest
to the highest tier. Active Developer, Uses AutoMod, Supports Commands and the
2016 Subscriber badge come after those, because their real position is not
known yet.

**Exception:** the SVG-based badges (Discord Nitro Basic, Account Age, Streaming,
Game Time, Game Variety) are added through Vencord's Badge API and are always
placed at the **end** of the badge row, in `BADGE_ORDER` order among themselves.

The settings categories are only a way to organise the settings tab — they do
not change the order on your profile.

## Adding or changing badges

Open `index.tsx`, find the `BADGE_ORDER` array at the top and add/remove an
object `{ key, id, name, icon }`:

- `key` — must be unique; it is the name under which the on/off state is saved.
  Changing the key of an existing badge resets its switch.
- `id` — unique badge id. It also decides which settings category the badge
  appears in (see `CATEGORIES` just below `BADGE_ORDER`); anything that matches
  no category lands in "Other".
- `name` — the text shown in the settings tab and in the badge tooltip.
- `icon` — **only the hash**, never a link (e.g. `6de6d34650760ba5551a79732e98ed60`).
  Hashes can be copied from `badges_index.js`. Badges whose icon lives under
  `cdn.discordapp.com/assets/content/<hash>.svg` must also match the pattern in
  `SVG_BADGE_IDS`.

The settings tab updates automatically. Afterwards rebuild and inject again:
`pnpm build && pnpm inject`.

## Known limitations

- Not (yet) in the plugin: Orbs Apprentice, Completed a Quest, Originally Known
  As, HypeSquad Events, HypeSquad Brilliance, Early Verified Bot Developer,
  Early Supporter, Bug Hunter Tier 2, Discord Nitro, April Fools Lootbox,
  App Premium and Nitro Opal (72mo+). They exist in `badges_index.js`.
- If a badge icon shows up empty, its hash in `BADGE_ORDER` is wrong.

## IMPORTANT

This plugin is client-side, like the original browser extension. If you look at
your profile in a browser or on mobile (without the plugin), or another user
looks at it, the badges will **NOT** be there.

Text written by [ShadowDev7](https://github.com/ShadowDev7)
