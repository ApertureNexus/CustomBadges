# CustomBadger — Vencord userplugin

This is not anymore a browser extension· it is an actual Vencord plugin, so
it is shown at **Vencord → Plugins** with your own settings,
which each badge has an on/off switch.

## Installation (Requires source build of Vencord — not the official installer)

1. If you do not have the source, clone it:
   ```
   git clone https://github.com/Vendicated/Vencord
   cd Vencord
   pnpm install
   ```
2. Inside the repo, make this:
   ```
   src/userplugins/CustomBagder/
   ```
3. Add `index.tsx` inside that Folder.
4. Build & inject:
   ```
   pnpm build
   pnpm inject
   ```
   (Windows: `pnpm inject`, then select the Discord client when required.)
5. Do full restart of Discord (not just reload — Ctrl+R not enough to apply. Close and reopen the app).
6. Discord Settings → Vencord → Plugins → **CustomBadger** → enable it
   → the settings icon allows you to customize the badges

## What each switch does

The 11 switches point exactly at the badges you had in your old 
`customOrder` (Nitro Opal, HypeSquad Events, HypeSquad Brilliance, Bug
Hunter Tier 2, Early Verified Bot Developer, Early Supporter, Server Boost
2 Years, Originally Known As, Completed a Quest, Orbs Apprentice, Legend).
The order of the badges in your profile is followed always with the order of the list
`BADGE_ORDER` inside `index.tsx` — meaning whatever order they have, will be that. 

The `badgeSize` switch/space controls the size of the badges (0 = is default).

## Adding or Changing the list 

Open the `index.tsx`, find the `BADGE_ORDER` array at the start, and
add/remove an object object `{ key, id, name, icon }` — το `key` MUST be a hash (no links, a HASH, eg `6de6d34650760ba5551a79732e98ed60`). The settings tab will be updated automatically
After you configure it, build it and inject again:
`pnpm build && pnpm inject`.

## IMPORTANT

This extension (like the original browser extension) is client-side, if you try to see it eg on your browser or mobile, it will **NOT** work. 

Text written by [ShadowDev7](https://github.com/ShadowDev7)
