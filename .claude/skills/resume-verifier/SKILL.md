---
name: resume-verifier
description: Validate that every resume claim is supported by source-of-truth, flag overfitted/inflated/fabricated claims, and check formatting is tight and compact
---

# Resume Verifier

## When to Use This Skill

Use when the user wants to:
- Fact-check a resume against its source material (project reports, website, repos)
- Make sure nothing is exaggerated, "overfitted," or incorrect before submitting
- Confirm formatting is tight, compact, and one page with no orphan lines
- Mentions: "verify resume", "is this accurate", "am I overclaiming", "check my resume isn't overfitted", "fact-check"

Run this AFTER tailoring/ATS/quantifying — it is the truthfulness gate before submission.

## Core Principle

**A resume claim is only as good as the source that backs it.** Tailoring selects and reframes true facts; it must never invent, inflate, or borrow facts between projects. This skill draws a hard line between *defensible reframing* and *overfitting*.

## Step 1: Establish Source-of-Truth

Before verifying, collect the ground-truth sources, in priority order:
1. **Primary artifacts** — project reports/PDFs, lab notebooks, the actual repo/code, benchmark logs, official competition leaderboards.
2. **Secondary** — the user's own website/portfolio, LinkedIn, prior verified resume.
3. **User confirmation** — for facts no artifact can settle (team counts, prize wording, internal metrics), ASK; do not guess.

Map every line of the resume to a source. A claim with **no source** is unverified by default.

## Step 2: Classify Every Claim

For each metric, title, tool, scope, and placement, assign one label:

| Label | Meaning | Action |
|---|---|---|
| ✅ **Verified** | Backed by a primary/secondary source | Keep |
| 🟡 **Unverified** | Plausible, but no source found | Ask user to confirm or soften |
| 🟠 **Overfit** | True-ish but reframed beyond what the source supports | Rewrite to match source |
| 🔴 **Unsupported / Inflated** | Contradicts source or invents a number/word | Fix or remove |

## Step 3: Overfitting Patterns to Hunt

These are the specific failure modes — check each one explicitly:

1. **Borrowed numbers** — a denominator or metric from project A pasted onto project B (e.g., "top 10 of 130" where the *130* came from a different class). Each number must trace to *that* item's source.
2. **Inflated placement** — "Winner" / "1st" when the source says 2nd, 3rd, finalist, or "placed." Use the exact placement the source states.
3. **Re-branding** — labeling a project as a category it isn't (a teaching/Unix OS called an "RTOS"; a script called a "platform"; a class project called "production"). Name it as what it is.
4. **Phantom tools/instruments** — naming a tool, instrument, or protocol (logic analyzer, oscilloscope, CAN, Kubernetes) not evidenced in the source. Drop it unless confirmed.
5. **Scope inflation** — "designed/architected/led" when the real role was "contributed/implemented one part." Match the verb to the actual scope.
6. **Vague→specific without basis** — turning "improved performance" into "improved 40%" with no measurement behind it.
7. **Keyword overfit** — adding a JD's exact keyword (SIL/HIL, SLAM, sensor fusion) when the work is only *adjacent*. Either qualify honestly ("...-style", "-adjacent") or list it as a genuine gap, never as a bare claim.

## Step 4: Defensible vs Overfit (the line)

**Defensible reframing (OK):**
- Reordering and emphasizing true facts
- Industry-standard synonyms for the same thing ("closed-loop control" for a feedback controller you built)
- Honest qualifiers: "SIL-style", "SLAM-adjacent", "(IMU + vision) state estimation"
- Rounding a sourced number conservatively (12.55 ms → 12.5 ms; 6.58× → 6.6×)

**Overfit (NOT OK):**
- Numbers/denominators with no source for *that* item
- A stronger placement word than the source supports
- A category/tool/protocol label the work doesn't earn
- Bare JD keywords for adjacent-only experience

## Step 5: Formatting Tightness Check

A verified resume must also be tight. Check:
- ✅ **One page** (entry/early-career) — compile and confirm page count
- ✅ **No orphan lines** — no bullet whose wrap leaves a single short word/fragment alone on a line; no skills category wrapping to a 1-2 word tail
- ✅ **Consistent dates** (one format throughout, e.g. `Mon YYYY`)
- ✅ **Consistent tense/voice** — past roles past tense, current present; bullets start with strong verbs
- ✅ **No wasted whitespace / no overflow** — content fills the page without spilling
- ✅ **ATS-safe** — single column, standard section headers, text-based PDF, contact info in body, no images/text-boxes for essential info
- ✅ **Parallel structure** — skills categories, bullet lengths, and punctuation consistent

To check page count and orphans on a LaTeX resume:
- Compile: `pdflatex -interaction=nonstopmode <file>.tex`
- Page count: grep `Output written` for `(N page`
- Orphans: `pdftotext -layout <file>.pdf - | awk 'NF>0 && NF<=2 {print}'` and eyeball for bullet tails (ignore real section headers)

## Output Format

```markdown
# RESUME VERIFICATION REPORT — [version]

## Claim Audit
| Claim | Source | Verdict | Note / Fix |
|---|---|---|---|
| "top 10 of 130" (CPU) | ECE 411 report | 🟠 Overfit | report says "top 10", no 130 — drop denominator |
| "Winner" (hackathon) | website | 🔴 Inflated | site says 2nd & 3rd place — restate precisely |
| ... | | | |

## Formatting
- Pages: [N]  | Orphans: [list or none] | Dates consistent: [Y/N] | ATS-safe: [Y/N]

## Must-Fix (incorrect / overfit)
1. ...

## Confirm With User (no source found)
1. ...

## Verdict
[Ready to submit / Fix N items first]
```

## Guardrails

- Never "verify" from memory — only from a cited source or explicit user confirmation.
- When a fix reduces impressiveness (e.g., "Winner" → "2nd place"), still recommend it; truth first, and flag the trade-off so the user decides.
- Prefer softening over deletion when the underlying fact is real but mislabeled.
- A claim the user verbally confirms is verified — record that it was user-confirmed.
