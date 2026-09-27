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
    { key: "showNitroOpal", id: "nitro-opal-72mo", name: "Nitro Opal (72mo+)", icon: "https://cdn.discordapp.com/badge-icons/5b154df19c53dce2af92c9b61e6be5e2.png" },
    { key: "showHypesquadEvents", id: "hypesquad-events", name: "HypeSquad Events", icon: "https://cdn.discordapp.com/badge-icons/bf01d1073931f921909045f3a39fd264.png" },
    { key: "showHypesquadBrilliance", id: "hypesquad-brilliance", name: "HypeSquad Brilliance", icon: "https://cdn.discordapp.com/badge-icons/011940fd013da3f7fb926e4a1cd2e618.png" },
    { key: "showBugHunterTier2", id: "bug-hunter-tier-2", name: "Bug Hunter Tier 2", icon: "https://cdn.discordapp.com/badge-icons/848f79194d4be5ff5f81505cbd0ce1e6.png" },
    { key: "showEarlyVerifiedBotDev", id: "early-verified-bot-developer", name: "Early Verified Bot Developer", icon: "https://cdn.discordapp.com/badge-icons/6df5892e0f35b051f8b61eace34f4967.png" },
    { key: "showEarlySupporter", id: "early-supporter", name: "Early Supporter", icon: "https://cdn.discordapp.com/badge-icons/7060786766c9c840eb3019e725d2b358.png" },
    { key: "showServerBoost2Years", id: "server-boost-2-years", name: "Server Boost (2 Years)", icon: "https://cdn.discordapp.com/badge-icons/ec92202290b48d0879b7413d2dde3bab.png" },
    { key: "showOriginallyKnownAs", id: "originally-known-as", name: "Originally Known As", icon: "https://cdn.discordapp.com/badge-icons/6de6d34650760ba5551a79732e98ed60.png" },
    { key: "showCompletedQuest", id: "completed-a-quest", name: "Completed a Quest", icon: "https://cdn.discordapp.com/badge-icons/7d9ae358c8c5e118768335dbe68b4fb8.png" },
    { key: "showOrbsApprentice", id: "orbs-apprentice", name: "Orbs Apprentice", icon: "https://cdn.discordapp.com/badge-icons/83d8a1eb09a8d64e59233eec5d4d5c2d.png" },
    { key: "showLegend", id: "legend", name: "Legend", icon: "https://cdn.discordapp.com/badge-icons/7fe346cfc5da1340087d8759a9e7a395.png" },
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
    description: "Μέγεθος badge σε px (0 = αυτόματο)",
    default: 20,
};

const settings = definePluginSettings(settingsDef);

const UserProfileStore = findStoreLazy("UserProfileStore");

let origGetUserProfile: any;

export default definePlugin({
    name: "CustomBadges",
    description: "Προσθέτει επιλεγμένα badges στο δικό σου profile, με on/off switch για το καθένα στο settings tab.",
    authors: [
        { name: "NexusResearch", id: 1411992082733863006n },
        { name: "Contributor", id: 837022217002680350n },
    ],
    settings,

    start() {
        origGetUserProfile = UserProfileStore.getUserProfile;
        const self = this;

        UserProfileStore.getUserProfile = function (userId: string) {
            const profile = origGetUserProfile.apply(this, arguments);
            const currentUser = UserStore.getCurrentUser();
            if (!profile || !currentUser || userId !== currentUser.id) return profile;

            const rawExisting: any[] = Array.isArray(profile.badges) ? profile.badges : [];

            // Preserve Discord's own entry for any badge id we've marked as "real".
            const existing = rawExisting.filter(x => KEEP_REAL_IDS.has(x.id));

            for (const b of BADGE_ORDER) {
                if (!settings.store[b.key]) continue; // toggled off
                const already = existing.some(x => x.id === b.id || iconKey(x.icon) === iconKey(b.icon));
                if (already) continue;
                existing.push({ id: b.id, description: b.name, icon: b.icon, link: "#" });
            }

            profile.badges = existing
                .map((badge, i) => ({ badge, i, rank: RANK_MAP[badge.id] ?? UNRANKED }))
                .sort((a, b) => a.rank - b.rank || a.i - b.i)
                .map(x => x.badge);

            return profile;
        };

        self.applySizeCss();
    },

    stop() {
        if (origGetUserProfile) UserProfileStore.getUserProfile = origGetUserProfile;
        document.getElementById("vc-custombadges-size")?.remove();
    },

    applySizeCss() {
        const size = settings.store.badgeSize;
        if (!size || size <= 0) return;
        let style = document.getElementById("vc-custombadges-size") as HTMLStyleElement | null;
        if (!style) {
            style = document.createElement("style");
            style.id = "vc-custombadges-size";
            document.head.appendChild(style);
        }
        style.textContent = `
            img[src*="/badge-icons/"] {
                width: ${size}px !important;
                height: ${size}px !important;
                min-width: ${size}px !important;
                min-height: ${size}px !important;
                max-width: ${size}px !important;
                max-height: ${size}px !important;
                object-fit: contain !important;
            }
        `;
    },
});
