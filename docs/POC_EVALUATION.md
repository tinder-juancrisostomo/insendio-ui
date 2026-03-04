# PoC Evaluation & Adoption

This document covers limitations of this PoC, adoption path, team fit, and next steps. Use it to justify the PoC and plan rollout.

---

## Limitations of This PoC

We did **not** evaluate:

| Area | What We Didn't Test | Impact |
|------|--------------------|--------|
| **Complex forms** | Multi-step wizards, validation, conditional fields | Form UX may differ; consider react-hook-form + Zod |
| **Data grids** | Sorting, filtering, virtualization, inline edit | MUI Data Grid is strong; Shadcn has no built-in equivalent |
| **SSR / Next.js** | Server components, streaming, hydration | May affect choice if we adopt Next.js |
| **Offline / PWA** | Service workers, caching | Not library-specific |
| **Design system compliance** | Pixel-perfect match to existing Insendio screens | Tokens help; may need tuning |
| **Performance under load** | Large lists, many re-renders | All use React; similar baseline |
| **Accessibility audit** | Full WCAG 2.1 audit, screen reader testing | Base follows ARIA APG; formal audit recommended |

**Implication:** The recommendation (Shadcn—prioritizing speed and reuse via copy-paste) holds for typical internal apps. For data-heavy or form-heavy projects, re-evaluate or run a focused spike.

---

## Adoption Path

### Phase 1: Pilot (1–2 sprints)

1. Pick one **greenfield** internal project or a small new feature.
2. Use Shadcn + our base + tokens from day one.
3. Document pain points, missing components, customization needs.
4. Retro: confirm Shadcn fits or adjust.

### Phase 2: Standardize

1. Add Shadcn components to our design system package (or keep copy-paste in a shared repo).
2. Update internal docs and templates.
3. Train team: "Use Shadcn for new projects; here's the pattern."

### Phase 3: Migrate (Optional)

- For existing projects on other libraries: migrate only if ROI is clear (e.g. reducing bundle size, unifying stack).
- Prefer **strangler pattern**: new features use Shadcn; legacy stays until rewrite.

#### Strangler Pattern Explained

The **strangler fig pattern** (from Martin Fowler) is a gradual migration strategy. Instead of a big-bang rewrite, you:

1. **Leave legacy code in place** – Don't touch existing screens or components that work.
2. **Build new features with the new stack** – Every new page, feature, or component uses Shadcn (or the chosen library).
3. **Replace legacy only when touched** – When you need to change an old screen, migrate it to Shadcn as part of that work.
4. **Eventually, legacy shrinks** – Over time, the old library is "strangled" as more of the app uses the new stack.

**Why use it:** Avoids risky all-at-once migrations, spreads effort over time, and lets you ship value while migrating. Both stacks can coexist in the same app during the transition.

**For UI libraries:** New routes use Shadcn components; old routes keep MUI/DaisyUI/etc. until they're refactored or the app is retired.

### Effort Estimate

| Task | Effort |
|------|--------|
| Pilot project (small app) | 1–2 sprints |
| Design system integration | 1 sprint |
| Docs + templates | 2–3 days |
| Team onboarding | 1–2 sessions |

---

## Team Fit

| Factor | Shadcn | Notes |
|--------|--------|-------|
| **Learning curve** | Low | Tailwind + React; no new paradigm |
| **Existing skills** | High | Most devs know Tailwind; CVA is simple |
| **Design handoff** | Good | Design tokens map to Tailwind; designers can use utility classes |
| **Maintenance** | Medium | We own components; upgrades are manual but controlled |
| **Vendor lock-in** | None | Copy-paste = no runtime dependency on Shadcn |

**Recommendation:** If the team is already on Tailwind, Shadcn (`@design-system/shadcn-ui`) is the recommended choice—speed and reuse via copy-paste. If not, factor in Tailwind adoption first.

---

## Next Steps

1. **Decision** – Review this PoC with the team; get sign-off on Shadcn.
2. **Pilot** – Identify a pilot project and kick off in the next sprint.
3. **Spike (optional)** – If data grids or complex forms are critical, run a 2–3 day spike on Shadcn + TanStack Table (or similar).
4. **Document** – After pilot, update this doc with lessons learned and any adjustments to the recommendation.
