# Pathumi Portfolio + Admin Dashboard

## Requirements

- Node.js 18 or newer
- npm 9 or newer

## Clean installation

Open a terminal inside this exact folder and run:

```bash
npm install
npm run dev
```

Then open:

- Portfolio: http://localhost:5173/
- Admin: http://localhost:5173/admin

Admin credentials:

- Username: `admin`
- Password: `admin123`

## If the page is blank

Stop the server and run:

### Windows PowerShell

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm cache verify
npm install
npm run dev
```

Do not run Vite from the parent folder. The terminal path must end with `pathumi-portfolio-admin`.
