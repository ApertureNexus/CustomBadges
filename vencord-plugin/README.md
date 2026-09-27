# CustomBadger - Vencord userplugin

This used to be a browser extension. However, due to some decisions, we decided to make it a vencord extension

# Instructions 

I assume you already have installed discord and logged once, **this is required**

1. Install the following:

On Debian/Ubutntu:
```bash
sudo apt update && sudo apt install -y nodejs npm
sudo corepack enable pnpm
```

On Fedora/SUSE/RHEL based:
```bash
sudo dnf install -y nodejs npm pnpm
```

On Arch based:
```bash
sudo pacman -S nodejs npm pnpm
```

On Windows: (PowerShell)
```powershell
winget install OpenJS.NodeJS Corecheck.pnpm Git.Git
```

3. Clone the git repository and install:
```bash
git clone https://github.com/Vencord/Vencord
cd Vencord
pnpm install
```
