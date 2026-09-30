# CustomBadges

<p align="center">
  <img src="https://img.shields.io/badge/platform-Vencord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Platform: Vencord" />
  <img src="https://img.shields.io/badge/client--side-100%25-success?style=for-the-badge" alt="100% client-side" />
  <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" alt="License: MIT" />
</p>

<p align="center">
  <b>A Vencord plugin that injects extra profile badges onto your own Discord profile (client side only)</b>
</p>

<p align="center">
  <a href="#-features">Features</a> ·
  <a href="#-installation">Installation</a> ·
  <a href="#-settings-tab">Settings Tab</a> ·
  <a href="#-badge-categories">Categories</a> ·
  <a href="#-project-structure">Structure</a> ·
  <a href="#-publishing-to-vencord-officially">Publishing to Vencord</a> ·
  <a href="#-contributing">Contributing</a> ·
  <a href="#-faq">FAQ</a>
</p>

---

## What is CustomBadges?

**CustomBadges** is a [Vencord](https://vencord.dev/) userplugin that renders a curated
set of Discord profile badges on **your own profile view** — Nitro tenure,
HypeSquad, Server Boost history, account-age badges, streaming tiers, and more —
with a clean, categorized settings tab to toggle each one individually.

It is a purely **cosmetic, client-side patch**. Nothing is sent to Discord, no
account data is modified, and no other user will ever see badges added by
this plugin. It only changes what *you* see when *you* look at *your own*
profile, in *your own* client.

> **Heads up:** because it's client-side, badges added by CustomBadges will
> **not** appear if you view your profile from a browser, on mobile, or from
> an account without the plugin installed — and other people will never see
> them either. See [FAQ](#-faq) for details.

---

## ✨ Features

- **80+ badges available**, matching Discord's real badge catalogue — Nitro
  tenure tiers, Server Boost levels, HypeSquad houses, Gifting tiers, Account
  Age, Streaming, Game Time, Game Variety, and more.
- **Organized, collapsible settings tab** — badges are grouped into 13 logical
  categories instead of one long flat list, each with an `on/off` counter and
  an **All on / All off** shortcut.
- **Icon previews** — every toggle shows the actual badge icon next to its
  name, so you always know what you're enabling.
- **Adjustable badge size** — one setting to resize every badge icon in
  Discord's UI.
- **Editable "Subscriber since" date** — set your own Nitro subscription date
  and it renders as a proper long-form date (`28/08/2012` → *Subscriber since
  August 28, 2012*).
- **Accurate ordering** — badges follow Discord's real display order as
  closely as documented (Staff → Nitro → Partner/Mod → HypeSquad → Boost →
  Gifting → ... ), with tiered badges always running from lowest to highest.
- **Zero telemetry, zero network calls** — everything runs locally against
  Vencord's own Badge API.

---

## 📦 Installation

CustomBadges is a **userplugin**, which means it requires a **source build**
of Vencord — it will not work with the official one-click installer.

### 1. Get the Vencord source

```bash
git clone https://github.com/Vendicated/Vencord
cd Vencord
pnpm install
```

### 2. Add the plugin

```bash
mkdir -p src/userplugins/CustomBadges
```

Copy [`vencord-plugin/index.tsx`](vencord-plugin/index.tsx) from this repo into
that folder.

### 3. Build & inject

```bash
pnpm build
pnpm inject
```

On Windows, `pnpm inject` will ask you which Discord install to patch — pick
the one you use.

### 4. Fully restart Discord

A simple `Ctrl+R` is **not** enough. Quit Discord completely (including from
the system tray) and reopen it.

### 5. Enable it

`User Settings → Vencord → Plugins → CustomBadger` → toggle it on, then click
the ⚙️ gear icon to open the badge settings.

📖 Full, step-by-step guide (with troubleshooting):
[`vencord-plugin/README.md`](vencord-plugin/README.md) (English) ·
`vencord-plugin/README_Greek.md` (Ελληνικά)

---

## ⚙️ Settings Tab

Once enabled, the plugin's settings panel gives you:

| Control | What it does |
|---|---|
| **Badge Size** | Numeric field, in px. `0` keeps Discord's default size. Applies globally to badge icons, not only on your profile. |
| **Category groups** | Click a category title to collapse/expand it. A `x / y` counter shows how many badges in that group are currently enabled. |
| **All on / All off** | Per-category shortcut to toggle every badge inside it at once. |
| **Per-badge toggle** | Every badge has its own switch, shown next to its real icon and name. |

Changes apply the next time your profile view re-renders — close and reopen
your profile popout if you don't see it update instantly.

---

## 🗂 Badge Categories

Badges are grouped into 13 categories in the settings tab, in this order:

1. **Staff & Programs** — Discord Staff, Moderator Programs Alumni, Early
   Verified Bot Developer, Bug Hunter (Tier 1 & 2)
2. **Nitro** — the generic Nitro badge, Subscriber-since, and every tenure
   tier from 1 month to Opal
3. **Community & Ownership** — Partnered Server Owner
4. **HypeSquad** — Events + the three houses (Bravery, Brilliance, Balance)
5. **Server Boost** — every boost tenure level
6. **Gifting** — Patron through Legend
7. **Legacy / Historical** — Early Supporter, Originally Known As
8. **Activity & Engagement** — Completed a Quest, Orbs Apprentice, Active
   Developer
9. **Bot / App Features** — Uses AutoMod, Supports Commands, App Premium
10. **Account Age** — Seed through Primordial
11. **Streaming** — Newcomer through Phenomenon
12. **Game Time** — Casual through Eternal
13. **Game Variety** — Sampler through Universalist

> Categories only organize the **settings tab**. The order badges actually
> appear in **on your profile** is controlled separately by the `BADGE_ORDER`
> array in `index.tsx` — see [Adding or changing badges](vencord-plugin/README.md#adding-or-changing-badges).

---

## 📁 Project Structure

```
CustomBadges/
├── vencord-plugin/           # the actual plugin — this is what you install
│   ├── index.tsx             # plugin source: badge list, order, categories, UI
│   └── README.md             # detailed setup + customization guide
├── badges_index.js           # reference list of every known badge (name, icon hash) — not used at runtime, just a lookup table for copying icon hashes when adding new badges
├── LICENSE
└── README.md                  # you are here
```

---

## 🚀 Publishing to Vencord officially

CustomBadges currently ships as a **userplugin** (something you drop into
`src/userplugins/` yourself). That's the quickest way to use it, but it means
it's *not* one of Vencord's built-in plugins yet (*and most likely will never be*). Here's, briefly, what
getting it there for real looks like:

1. **Meet Vencord's plugin guidelines.** Official plugins live in
   `src/plugins/` (not `userplugins/`) inside the main Vencord repo, and need
   an `index.ts(x)` plus a short plugin description, following the coding
   conventions documented in Vencord's own contributing docs.
2. **Fork [Vendicated/Vencord](https://github.com/Vendicated/Vencord)** and
   add the plugin folder under `src/plugins/customBadges/`.
3. **Follow the review checklist**: no unnecessary patches, no telemetry, a
   clear `description` and `authors` field in the `definePlugin()` call, and
   settings defined through `definePluginSettings` (already done here).
4. **Open a Pull Request** against the main repo. A Vencord maintainer will
   review the code, may request changes (naming, patch scope, settings UX),
   and merge it once it meets their bar.
5. Once merged, it ships with **every** Vencord install — no manual source
   build needed anymore.

Until (and unless) that happens, the userplugin install method above is the
only way to run it.

---

## 🛠 Adding or Changing Badges

See the **"Adding or changing badges"** section of
[`vencord-plugin/README.md`](vencord-plugin/README.md) for the exact steps —
in short: edit the `BADGE_ORDER` array in `index.tsx`, grab the icon hash from
`badges_index.js`, and rebuild with `pnpm build && pnpm inject`.

---

## ❓ FAQ

1. **Will other people see these badges on my profile?**

No. This only changes what *you* see in *your own* client. It's a local
render patch, not a real account change.

2. **Will I see these badges if I open Discord in a browser, or on mobile?**

No — only in the Vencord-patched desktop client where it's installed.

3. **Does this send any data anywhere?**

No. Zero network calls, zero telemetry. Everything is computed locally from
Vencord's own Badge API.

4. **Can I get banned for using this?**

Cosmetic client mods carry the general (low, but non-zero) risk that comes
with any Discord client modification. Don't post screenshots implying you
"really" have badges you don't, and don't use it to misrepresent yourself in
ways that could be considered impersonation or fraud.

5. **Why don't I see badge X?**

Check the "Known limitations" section of
[`vencord-plugin/README.md`](vencord-plugin/README.md) — a handful of badges
aren't wired up yet even though they exist in `badges_index.js`.

6. **Is this any useful?**

To be honest, I do not really know

7. **Why does this exist?**

As Cave Johnson said, *becuase why not?*

---

## 🤝 Contributing

Issues and pull requests are welcome — whether that's fixing a badge icon,
adding a missing badge, improving the settings UI, or clarifying the docs.
Please keep changes to `index.tsx` scoped and update `badges_index.js` if you
add a new badge hash.

---

## Credits

Part of [Aperture Nexus](https://github.com/ApertureNexus).

- **Lead Maintainer:** [NexzaDev](https://github.com/NexzaDev)
- **Tester:** [ShadowDev7](https://github.com/ShadowDev7)

## License

[MIT](LICENSE)
