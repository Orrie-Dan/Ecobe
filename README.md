# ECOBE Trading Company

A site for ECOBE Trading Company Ltd, Kigali — steel fabrication, wood manufacturing and interior solutions. The structure follows the scroll rhythm of a contemporary architecture bureau: full-bleed landing photograph, a typographic pause, then image again.

## Run

```bash
cd ecobe
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

## Content

Copy and photography come from the 2026 company profile and product catalogue. Prices remain on application. Workshop visits are by appointment.

The catalogue lists a second telephone (`0788740022`); the site uses the company profile number `0787480022`.

## Contact form

WhatsApp remains the default send: it opens a pre-filled chat. **Send by email** posts the brief to the workshop inbox via [Web3Forms](https://web3forms.com) — no custom backend.

1. Create a free key at Web3Forms, registered to `e.t.c.ltd2017@gmail.com`.
2. Copy `.env.example` to `.env` and set `VITE_WEB3FORMS_KEY`.
3. In the Web3Forms dashboard, restrict the key to the live domain once the site is hosted.

Enquiries from a work page include the piece title, reference and URL (`/contact?project=entrance-gate`).
