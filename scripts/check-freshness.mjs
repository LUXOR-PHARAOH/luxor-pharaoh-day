import fs from 'node:fs';

const sites = JSON.parse(fs.readFileSync('data/official-sites.json', 'utf8'));
const maxAgeDays = 14;
const dueSoonDays = 3;
const now = Date.now();
const ageDays = (iso) => {
  const t = Date.parse(iso);
  return Number.isFinite(t) ? Math.max(0, Math.floor((now - t) / 86400000)) : Infinity;
};
const stale = sites.filter((s) => ageDays(s.lastReviewed) > maxAgeDays);
const dueSoon = sites.filter((s) => {
  const age = ageDays(s.lastReviewed);
  return Number.isFinite(age) && age <= maxAgeDays && (maxAgeDays - age) <= dueSoonDays;
});

console.log(JSON.stringify({
  total: sites.length,
  stale: stale.map((s) => ({ id: s.id, lastReviewed: s.lastReviewed })),
  dueSoon: dueSoon.map((s) => ({ id: s.id, lastReviewed: s.lastReviewed, daysUntilReview: maxAgeDays - ageDays(s.lastReviewed) })),
  maxAgeDays,
  dueSoonDays,
}, null, 2));

if (stale.length) process.exitCode = 1;
