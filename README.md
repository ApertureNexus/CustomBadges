# CustomBadger 

A [Vencord](https://vencord.dev) plugin that injects extra profile badges onto your own Discord profile and displays them in a custom order. Local/client-side only — it does not change your real account and is not visible to other users.

## What it does

- Adds a fixed set of badge icons to your own profile popout/card.
- Reorders **all** badges on your profile (both real and injected) according to a custom hierarchy you define.
- Optionally hides specific badges you already have, by icon hash.
- Fixes broken badge images where the `img` `src` accidentally contains a full URL instead of just the icon hash.

## Requirements

- A desktop installation of Discord (Windows, macOS, or Linux). This plugin does **not** work on mobile or the browser version of Discord.
- [Node.js](https://nodejs.org) (LTS, Suggested to use Nodejs 22)
- [Git](https://git-scm.com) 
- [pnpm](https://pnpm.io) (`npm install -g pnpm`)

## Installation

1. Clone Vencord and install dependencies:

   ```bash
   git clone https://github.com/Vendicated/Vencord
   cd Vencord
   pnpm install
   ```

2. Create the plugin folder:

   ```
   src/userplugins/badgeSpoofer/index.ts
   ```

3. Paste in the plugin code (see `index.ts` in this project).

4. Build and inject into your local Discord client:

   ```bash
   pnpm build
   pnpm inject
   ```

5. Restart Discord. Go to **User Settings → Vencord → Plugins**, find **BadgeSpoofer**, and enable it.

## Configuration

All configuration lives at the top of `index.ts`:

| Constant | Purpose |
|---|---|
| `HIDDEN_ICON_KEYS` | Icon hashes to hide from your profile, even if genuinely present on your account. |
| `RANK_TIERS` | Ordered list of icon-hash groups. Earlier entries in the array are displayed first. Badges not listed here keep their existing relative order and are placed after every listed tier. |
| `INJECTED_BADGES` | The badges added to your profile: `id`, `description` (tooltip text), and `icon` (bare CDN hash, no URL/extension). |

To change which badges appear or their order, edit `RANK_TIERS` and `INJECTED_BADGES` and rebuild (`pnpm build` + `pnpm inject`).

## Uninstalling / disabling

Toggle the plugin off in **Vencord → Plugins**, or remove the `src/userplugins/badgeSpoofer` folder and rebuild.

## Notes

- Changes are visible only in your own client. Other users viewing your profile through their own Discord client will see your real, unmodified badges.
- Icon values should be the bare CDN hash (e.g. `bf01d1073931f921909045f3a39fd264`), not a full URL — the plugin builds image URLs internally.
