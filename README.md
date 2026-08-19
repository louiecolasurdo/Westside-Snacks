# Westside Soccer Club — Snack Sign-Up

A tiny site listing each game (number, date, field) with a button for a
parent to sign up to bring post-game snacks. Sign-ups are shared live for
everyone (stored in a free Upstash Redis database via Vercel).

## Deploy to Vercel (~5 minutes)

**1. Push this folder to GitHub**

```bash
cd westside-snacks
git init
git add .
git commit -m "Westside Soccer Club snack sign-up"
gh repo create westside-snacks --private --source=. --push
```

(No `gh` CLI? Create an empty repo on github.com, then `git remote add origin <url>` and `git push -u origin main`.)

**2. Import into Vercel**

- Go to vercel.com → **Add New… → Project** → import the `westside-snacks` GitHub repo.
- Framework preset should auto-detect as **Next.js**. Click **Deploy**.

**3. Add the free database (before or after first deploy)**

- In the Vercel project, go to the **Storage** tab → **Create Database** → choose **Upstash — Serverless DB (Redis)** (or search "Upstash for Redis" in the Marketplace) → pick the free tier → **Connect** it to this project.
- This automatically adds the `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` environment variables to your project.
- Go to **Deployments** and **Redeploy** the latest deployment so it picks up the new env vars.

**4. Visit your site**

Vercel gives you a URL like `westside-snacks.vercel.app`. Share that link
with the team. You can later add a custom domain in Project → Settings → Domains.

## Editing the schedule

Open `lib/games.ts` and edit the `games` list — update dates, fields, or
add/remove games. Each row needs a stable `id` (e.g. `g1`, `g2`…); don't
change an id once parents have started signing up for it, or that game's
sign-up will look empty again. Commit and push — Vercel redeploys
automatically.

## Local development (optional)

```bash
npm install
# create .env.local with UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
# (copy them from Vercel → Project → Settings → Environment Variables)
npm run dev
```

Then open http://localhost:3000.
