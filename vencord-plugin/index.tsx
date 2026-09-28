import { definePluginSettings } from "@api/Settings";
import definePlugin, { OptionType } from "@utils/types";
import { findStoreLazy } from "@webpack";
import { UserStore } from "@webpack/common";

interface BadgeDef {
    /** key inside `settings.store` that toggles this badge on/off */
    key: string;
    id: string;
    name: string;
    icon: string;
}

// Display order = array order. This is also the order the toggles
// appear in the plugin's settings tab, so the two always match.
const BADGE_ORDER: BadgeDef[] = [
    // HEY YOU, yes YOU
    // If you are reading this, just know. I tried to put the other badges and it sucked
    // if you can add it, PLEASE do a Pull request! 
    
    // Devs/Bots
    { key: "showStaff", id: "staff", name: "Discord Staff", icon: "5e74e9b61934fc1f67c65515d1f7e60d" },
    { key: "showPartner", id: "partner", name: "Partnered Server Owner", icon: "3f9748e53446a137a052f3454e2de41e" },
    { key: "showCertifiedMod", id: "certified_moderator", name: "Moderator Programs Alumni", icon: "fee1624003e2fee35cb398e125dc479b" },
    { key: "showHypesquadBravery", id: "hypesquad_house_1", name: "HypeSquad Bravery", icon: "8a88d63823d8a71cd5e390baa45efa02" },
    { key: "showHypesquadBalance", id: "hypesquad_house_3", name: "HypeSquad Balance", icon: "3aa41de486fa12454c3761e8e223442e" },
    { key: "showBugHunterTier1", id: "bug_hunter_level_1", name: "Discord Bug Hunter", icon: "2717692c7dca7289b35297368a940dd0" },
    { key: "showActiveDeveloper", id: "active_developer", name: "Active Developer", icon: "6bdc42827a38498929a4920da12695d9" },
    { key: "showAutomod", id: "automod", name: "Uses AutoMod", icon: "f2459b691ac7453ed6039bbcfaccbfcd" },
    { key: "showBotCommands", id: "bot_commands", name: "Supports Commands", icon: "6f9e37f9029ff57aef81db857890005e" },
    { key: "showPremiumOG", id: "premium", name: "Subscriber since Dec 22, 2016", icon: "2ba85e8026a8614b640c2837bcdfe21b" },
    // Nitro 
    { key: "showNitro1mo",  id: "premium_tenure_1_month_v2",  name: "Nitro (1mo)",  icon: "4f33c4a9c64ce221936bd256c356f91f" },
    { key: "showNitro3mo",  id: "premium_tenure_3_month_v2",  name: "Nitro (3mo)",  icon: "4514fab914bdbfb4ad2fa23df76121a6" },
    { key: "showNitro6mo",  id: "premium_tenure_6_month_v2",  name: "Nitro (6mo)",  icon: "2895086c18d5531d499862e41d1155a6" },
    { key: "showNitro12mo", id: "premium_tenure_12_month_v2", name: "Nitro (12mo)", icon: "0334688279c8359120922938dcb1d6f8" },
    { key: "showNitro24mo", id: "premium_tenure_24_month_v2", name: "Nitro (24mo)", icon: "0d61871f72bb9a33a7ae568c1fb4f20a" },
    { key: "showNitro36mo", id: "premium_tenure_36_month_v2", name: "Nitro (36mo)", icon: "11e2d339068b55d3a506cff34d3780f3" },
    { key: "showNitro60mo", id: "premium_tenure_60_month_v2", name: "Nitro (60mo)", icon: "cd5e2cfd9d7f27a8cdcd3e8a8d5dc9f4" },
    // Server Booster 
    { key: "showBoostLvl1", id: "guild_booster_lvl1", name: "Server Boost (1mo)",  icon: "51040c70d4f20a921ad6674ff86fc95c" },
    { key: "showBoostLvl2", id: "guild_booster_lvl2", name: "Server Boost (2mo)",  icon: "0e4080d1d333bc7ad29ef6528b6f2fb7" },
    { key: "showBoostLvl3", id: "guild_booster_lvl3", name: "Server Boost (3mo)",  icon: "72bed924410c304dbe3d00a6e593ff59" },
    { key: "showBoostLvl4", id: "guild_booster_lvl4", name: "Server Boost (6mo)",  icon: "df199d2050d3ed4ebf84d64ae83989f8" },
    { key: "showBoostLvl5", id: "guild_booster_lvl5", name: "Server Boost (9mo)",  icon: "996b3e870e8a22ce519b3a50e6bdd52f" },
    { key: "showBoostLvl6", id: "guild_booster_lvl6", name: "Server Boost (12mo)", icon: "991c9f39ee33d7537d9f408c3e53141e" },
    { key: "showBoostLvl7", id: "guild_booster_lvl7", name: "Server Boost (15mo)", icon: "cb3ae83c15e970e8f3d410bc62cb8b99" },
    { key: "showBoostLvl8", id: "guild_booster_lvl8", name: "Server Boost (18mo)", icon: "7142225d31238f6387d9f09efaa02759" },
    { key: "showBoostLvl9", id: "guild_booster_lvl9", name: "Server Boost (24mo)", icon: "ec92202290b48d0879b7413d2dde3bab" },

    // Gifting
    { key: "patron",   id: "gifting_patron",   name: "Patron",   icon: "ac305d1b9481f312ce4419e7f8296558" },
    { key: "champion", id: "gifting_champion", name: "Champion", icon: "8b7792c4f65953d3ff564f23429cb79e" },
    { key: "luminary", id: "gifting_luminary", name: "Luminary", icon: "3119f5504b2cd09576a323908c7c3517" },
    { key: "icon",     id: "gifting_icon",     name: "Icon",     icon: "64f2413c9b9803661322aaad25826b62" },
    { key: "hero",     id: "gifting_hero",     name: "Hero",     icon: "77d65b1f210014a11eb1582ee06ab684" },
    { key: "legend",   id: "gifting_legend",   name: "Legend",   icon: "7fe346cfc5da1340087d8759a9e7a395" },
]; 

// If you actually own one of these badges for real (e.g. you really did
// complete a quest), we keep Discord's own entry instead of overwriting
// it with our fake one.
const KEEP_REAL_IDS = new Set<string>(["completed-a-quest"]);

const RANK_MAP: Record<string, number> = {};
BADGE_ORDER.forEach((b, i) => { RANK_MAP[b.id] = i; });
const UNRANKED = BADGE_ORDER.length;

function iconKey(url?: string | null): string | null {
    if (!url) return null;
    const last = url.split("/").pop() || "";
    return last.split(".")[0].split("?")[0].toLowerCase();
}

// ---- CSS for badge size -------------------------------------------------
// Runs on start() AND every time the badgeSize setting changes.
function applySizeCss() {
    const size = Number(settings.store.badgeSize);
    const existing = document.getElementById("vc-custombadges-size");
    if (!size || size <= 0 || !isFinite(size)) {
        existing?.remove();
        return;
    }
    const style = (existing as HTMLStyleElement | null) ?? document.createElement("style");
    style.id = "vc-custombadges-size";
    if (!existing) document.head.appendChild(style);
    style.textContent = `
        img[src*="/badge-icons/"],
        img[src*="discord.com/assets/"],
        [class*="profileBadge"] img,
        [class*="badgeList"] img {
            width: ${size}px !important;
            height: ${size}px !important;
            min-width: ${size}px !important;
            min-height: ${size}px !important;
            max-width: ${size}px !important;
            max-height: ${size}px !important;
            object-fit: contain !important;
        }
    `;
}

// Build the settings object dynamically from BADGE_ORDER so the toggle
// list in the UI can never drift out of sync with the badge list itself.
const settingsDef: Record<string, any> = {};
for (const b of BADGE_ORDER) {
    settingsDef[b.key] = {
        type: OptionType.BOOLEAN,
        description: b.name,
        default: true,
    };
}
settingsDef.badgeSize = {
    type: OptionType.NUMBER,
    description: "Badge Size in px (0 = auto)",
    default: 20,
    onChange: () => applySizeCss(),
};

const settings = definePluginSettings(settingsDef);

const UserProfileStore = findStoreLazy("UserProfileStore");

let origGetUserProfile: any = null;

// Cache: same Discord profile object + same toggles => SAME returned object.
// Discord's React code compares store results by identity; returning a brand
// new object on every call makes components re-render forever -> crash.
const cache = new WeakMap<object, { sig: string; result: any }>();

function toggleSignature(): string {
    return BADGE_ORDER.map(b => (settings.store[b.key] ? "1" : "0")).join("");
}

function buildBadges(rawExisting: any[]): any[] {
    // Keep only the real badges we explicitly marked as "keep"
    const existing = rawExisting.filter(x => x && KEEP_REAL_IDS.has(x.id));

    for (const b of BADGE_ORDER) {
        if (!settings.store[b.key]) continue; // toggled off
        const already = existing.some(x => x.id === b.id || iconKey(x.icon) === iconKey(b.icon));
        if (already) continue;
        existing.push({ id: b.id, description: b.name, icon: b.icon, link: "#" });
    }

    return existing
        .map((badge, i) => ({ badge, i, rank: RANK_MAP[badge.id] ?? UNRANKED }))
        .sort((a, b) => a.rank - b.rank || a.i - b.i)
        .map(x => x.badge);
}

export default definePlugin({
    name: "CustomBadger",
    description: "Adds choosen badges in your own profile (client-side only), with an on/off switch for each one in the settings tab. Made by NexusResearch",
    authors: [
        { name: "NexusResearch", id: 1411992082733863006n },
        { name: "Contributor", id: 837022217002680350n },
    ],
    settings,

    start() {
        if (origGetUserProfile) return; // already patched, never wrap twice
        origGetUserProfile = UserProfileStore.getUserProfile;

        UserProfileStore.getUserProfile = function (this: any, ...args: any[]) {
            const profile = origGetUserProfile.apply(this, args);

            // A plugin must NEVER be able to take Discord down: on any error
            // fall back to Discord's untouched profile.
            try {
                const userId = args[0];
                const currentUser = UserStore.getCurrentUser();
                if (!profile || typeof profile !== "object" || !currentUser || userId !== currentUser.id) return profile;

                const sig = toggleSignature();
                const cached = cache.get(profile);
                if (cached && cached.sig === sig) return cached.result;

                // Copy of the profile (same prototype, same props). We do NOT
                // mutate Discord's own store object anymore.
                const result = Object.create(
                    Object.getPrototypeOf(profile),
                    Object.getOwnPropertyDescriptors(profile)
                );
                Object.defineProperty(result, "badges", {
                    value: buildBadges(Array.isArray(profile.badges) ? profile.badges : []),
                    enumerable: true,
                    configurable: true,
                    writable: true,
                });

                cache.set(profile, { sig, result });
                return result;
            } catch (e) {
                console.error("[CustomBadger] getUserProfile failed, using original profile", e);
                return profile;
            }
        };

        applySizeCss();
    },

    stop() {
        if (origGetUserProfile) {
            UserProfileStore.getUserProfile = origGetUserProfile;
            origGetUserProfile = null;
        }
        document.getElementById("vc-custombadges-size")?.remove();
    },
});
