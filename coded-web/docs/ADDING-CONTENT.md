# Adding Content (Non-Coder Guide)

This guide explains how to add, edit, or remove content on the CODED website without touching any code. All content lives in Supabase tables and updates appear on the live site automatically.

## How to access Supabase

1. Go to https://supabase.com/dashboard
2. Sign in with the project owner's account
3. Select the **coded-platform** project
4. Click **Table Editor** in the left sidebar

---

## Adding a new bootcamp program

**Table:** `programs`
**Rendered by:** The "Discover Your Perfect Bootcamp Match Today" section (4-card grid)

| Column        | What it does                              | Example                    |
| ------------- | ----------------------------------------- | -------------------------- |
| `name`        | Card title                                | `Cybersecurity`            |
| `slug`        | URL-safe identifier (lowercase, hyphens)  | `cybersecurity`            |
| `description` | Card body text                            | `A hands-on bootcamp...`  |
| `accent_color`| Title color and button color (hex code)   | `#1a2570`                  |
| `sort`        | Display order (lower = first)             | `1`                        |

**Steps:**
1. Open the `programs` table in Table Editor
2. Click **Insert row**
3. Fill in `name`, `slug`, `description`, `accent_color`
4. Set `sort` to control where it appears (existing values: 1, 2, 3, 4)
5. Click **Save**
6. The new card appears on the site within seconds (no deploy needed)

---

## Adding a new testimonial

**Table:** `testimonials`
**Rendered by:** The "What our graduates say" section (3-card grid)

| Column     | What it does                          | Example                          |
| ---------- | ------------------------------------- | -------------------------------- |
| `name`     | Graduate's full name                  | `Fatima Al-Rashidi`              |
| `initials` | Avatar circle text (2 letters)        | `FA`                             |
| `quote`    | The testimonial text                  | `I joined as a marketing...`    |
| `program`  | Track and cohort label                | `AI App Developer - Cohort 9`    |
| `cohort`   | Cohort identifier (optional)         | `Cohort 9`                       |
| `sort`     | Display order (lower = first)         | `1`                              |

**Steps:**
1. Open the `testimonials` table
2. Click **Insert row**
3. Fill in all fields -- make sure `initials` is exactly 2 characters
4. Set `sort` to position it (existing values: 1, 2, 3)
5. Click **Save**

---

## Updating a stat

**Table:** `stats`
**Rendered by:** The stats bar with animated counters (teal numbers on dark background)

| Column   | What it does                   | Example       |
| -------- | ------------------------------ | ------------- |
| `label`  | Text below the number          | `Graduates`   |
| `value`  | The number (integer)           | `500`         |
| `suffix` | Text after the number          | `+`           |
| `sort`   | Display order (lower = first)  | `1`           |

**To update a number:** Find the row, click the `value` cell, type the new number, press Enter.

Current stats: Graduates 500+, Company Partners 50+, Years Est. 2015 10, Active Tracks 4.

---

## Adding a company to the marquee

**Table:** `companies`
**Rendered by:** The "Trusted by Leading Companies in Kuwait" scrolling marquee

| Column   | What it does                  | Example     |
| -------- | ----------------------------- | ----------- |
| `name`   | Company name displayed        | `Zain`      |
| `sort`   | Display order (lower = first) | `1`         |

Just add a row with the company name. The marquee auto-repeats and scrolls continuously.

---

## Adding a FAQ

**Table:** `faqs`
**Rendered by:** The "Frequently Asked Questions" accordion section

| Column     | What it does    | Example                          |
| ---------- | --------------- | -------------------------------- |
| `question` | The question    | `Do I need coding experience?`   |
| `answer`   | The answer text | `Not at all. Our bootcamps...`  |
| `sort`     | Display order   | `1`                              |

---

## Adding a "How it works" step

**Table:** `steps`
**Rendered by:** The "How CODED actually teaches" section (4-card grid)

| Column        | What it does          | Example                     |
| ------------- | --------------------- | --------------------------- |
| `num`         | Step number displayed  | `01`                        |
| `title`       | Step title             | `Learn by building`         |
| `description` | Step body text         | `Every session ends with...`|
| `sort`        | Display order          | `1`                         |

---

## Viewing applications

Applications submitted through the "Apply Now" form are stored in the `applications` table. This table is INSERT-only from the public website -- you can only view submissions from the Supabase dashboard.

| Column         | Content                    |
| -------------- | -------------------------- |
| `full_name`    | Applicant's name           |
| `email`        | Applicant's email          |
| `phone`        | Applicant's phone          |
| `program_slug` | Which program they applied for (e.g., `cybersecurity`) |
| `created_at`   | When they submitted        |

---

## What NOT to touch

- **Do not rename columns** -- the website code expects exact column names
- **Do not delete tables** -- the site will fall back to hardcoded data but won't show your latest edits
- **Do not disable RLS** -- Row Level Security protects the applications table from public reads
- **Do not change the `id` column** -- it auto-generates UUIDs
- **`sort` values don't need to be consecutive** -- they just need to be in the right relative order (e.g., 1, 2, 3 or 10, 20, 30 both work)
