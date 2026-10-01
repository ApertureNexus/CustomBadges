# CustomBadges — Vencord userplugin

A real Vencord plugin: it shows up under **Vencord → Plugins** as
**CustomBadger**, with its own settings tab.

## Installation (requires a source build of Vencord — not the official installer)

1. If you do not have the source yet:
   ```
   git clone https://github.com/Vendicated/Vencord
   cd Vencord
   pnpm install
   ```
2. Inside the repo, create the folder:
   ```
   src/userplugins/CustomBadges/
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
- **Badge list** — 13 categories, in this order: Staff & Programs, Nitro,
  Community & Ownership, HypeSquad, Server Boost, Gifting, Legacy / Historical,
  Activity & Engagement, Bot / App Features, Account Age, Streaming, Game Time,
  Game Variety.
  - Every badge shows its icon next to its name, with its own on/off switch.
  - Click a category title to collapse/expand it; the `3/10` counter shows how
    many badges in it are enabled.
  - **All on / All off** switches every badge in that category at once.
- All switches start **on** by default.
- Changes are applied the next time your profile is rendered — close and reopen
  your profile/popout if you don't see the change immediately.

## What happens to your real badges

While the plugin is enabled, your **real** Discord badges are not shown — only
the badges switched on here. Vencord's own badges (contributor, donor, ...) are
not affected.

## Badge order on your profile

Regular badges follow the order of the `BADGE_ORDER` list in `index.tsx`, which
follows Discord's real display order as far as it is known: Discord Staff,
Nitro (Bronze to Opal), Partnered Server Owner, Moderator Programs Alumni,
HypeSquad Events, HypeSquad houses, Bug Hunter Tier 1 and 2, Early Verified Bot
Developer, Early Supporter, Server Boost, Originally Known As, Completed a
Quest, Orbs Apprentice, Gifting. Tier badges always go from the lowest to the
highest tier. Active Developer, Uses AutoMod, Supports Commands and App Premium
come after those, because their real position is not known yet.

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

- Not in the plugin: **April Fools Lootbox** (it does not show up, so it is
  commented out in `BADGE_ORDER`), the generic **Discord Nitro** badge (its icon
  lives on a different path than the other badges; Discord Nitro Basic is
  included instead) and **Subscriber since**.
- If a badge icon shows up empty, its hash in `BADGE_ORDER` is wrong.
- Switches take effect the next time the profile is rendered.

## IMPORTANT

This plugin is client-side, like the original browser extension. If you look at
your profile in a browser or on mobile (without the plugin), or another user
looks at it, the badges will **NOT** be there.

Text written by [ShadowDev7](https://github.com/ShadowDev7)
