# Experiment 1: AI-Driven Inspection Form Generation

## Focus

**Activity 1:** AI-driven inspection form generation

## Current Obstacle

Managers postpone starting DVIR setup because they don't have time and feel the form creation is complex.

## Hypothesis

By generating the inspection form with AI based on a questionnaire, we believe more admins will start the DVIR setup.

## Key Metrics

### Primary Metric (Success)

* **Conversion rate from Homepage to Publish:** The percentage of users who enter the DVIR home page and successfully **publish** a form.
  * *Hypothesis:* Increase from current baseline -5-6% week and ~10% in 30 days 15% in 7 days and 30% in 30 days.
  * *Reasoning:* This directly measures if we are unblocking the "postponing" behavior.

### Secondary Metrics (Efficiency & Quality)

* **Conversion rate from Start form to Publish:** The percentage of users who enter the form creation page and successfully **publish** a form.
  * *Hypothesis:* AI should increase this conversion rate from current baseline -25% win 7 days and ~35% in 30 days to 50% in 7 days and 75% in 30 days.
* **Time to Publish:** Average time measured from clicking "Create Form" to "Publish".
  * *Hypothesis:* AI should reduce this compared to manual creation. The median time to from create form page to publish is 7 min in last 7 days and 11 min in last 30 days.
* **AI Adoption Rate:** Percentage of users who choose the "Generate with AI" flow versus "Start from Scratch".
  * *Hypothesis:* 90% of users should choose the "Generate with AI" flow.
* **Edit Ratio:** Average number of manual edits made to an AI-generated form before publishing.
  * *Hypothesis:* 10% of users should make manual edits to an AI-generated form.

### Guardrail Metrics

* **Published Form retention:** Percentage of published forms that are still published after 7 days.
  * *Reasoning:* We don't just want *more* forms; we want *usable* forms. If this drops, we might be generating "garbage" forms that look good but aren't practical.
