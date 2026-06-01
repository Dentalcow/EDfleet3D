# edfleet3d Website

Marketing and lead-generation site for edfleet3d — Sydney-based 3D printer maintenance for schools.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy the example file and update values:

```bash
cp .env.local.example .env.local
```

Required variables:

- `NEXT_PUBLIC_QR_SYSTEM_NAME` — Display name for the QR reporting system (default: PrintPing).
- `NEXT_PUBLIC_CONTACT_EMAIL` — Contact email shown in the footer.
- `FORMSPREE_ENDPOINT` — Formspree endpoint used by `/api/contact`.
- `RESEND_API_KEY` — Optional if swapping to Resend later.

## Updating Packages

All package names, descriptions, and pricing placeholders live in `lib/packages.ts`. Replace the `// TBD` values and set `unitPrice` when pricing is confirmed.

## Deployment

The project is configured for Vercel. See `vercel.json` for defaults.
