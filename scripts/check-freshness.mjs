import fs from 'node:fs';

const sites = JSON.parse(fs.readFileSync('data/official-sites.json', 'utf8'));
const maxAgeDays = 14;
const dueSoonDays = 3;
const now = Date.now();
const allowedStatuses = new Set(['VERIFIED', 'ESTIMATED', 'NEEDS_REVIEW']);
const errors = [];
const seenIds = new Set();

const ageDays = (iso) => {
  const t = Date.parse(iso);
  return Number.isFinite(t) ? Math.floor((now - t) / 86400000) : Infinity;
};

if (!Array.isArray(sites) || sites.length === 0) {
  throw new Error('Official sites data must be a non-empty array.');
}

for (const [index, site] of sites.entries()) {
  const label = site?.id || `item[${index}]`;
  if (!site || typeof site !== 'object' || Array.isArray(site)) {
    errors.push(`${label}: expected an object`);
    continue;
  }

  for (const field of ['id', 'title', 'arabicTitle', 'source', 'sourceUrl', 'lastReviewed', 'status']) {
    if (typeof site[field] !== 'string' || !site[field].trim()) {
      errors.push(`${label}: missing required field ${field}`);
    }
  }

  if (typeof site.id === 'string' && site.id.trim()) {
    if (seenIds.has(site.id)) errors.push(`${label}: duplicate id`);
    seenIds.add(site.id);
  }

  try {
    const sourceUrl = new URL(site.sourceUrl);
    if (sourceUrl.protocol !== 'https:') errors.push(`${label}: sourceUrl must use HTTPS`);
  } catch {
    errors.push(`${label}: sourceUrl must be a valid absolute URL`);
  }

  if (typeof site.lastReviewed === 'string') {
    const isIsoDate = /^\d{4}-\d{2}-\d{2}$/.test(site.lastReviewed);
    const timestamp = Date.parse(site.lastReviewed);
    if (!isIsoDate || !Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0, 10) !== site.lastReviewed) {
      errors.push(`${label}: lastReviewed must be a valid YYYY-MM-DD date`);
    } else if (timestamp > now) {
      errors.push(`${label}: lastReviewed cannot be in the future`);
    }
  }

  if (typeof site.status === 'string' && !allowedStatuses.has(site.status)) {
    errors.push(`${label}: unsupported status ${site.status}`);
  }
}

const stale = sites.filter((s) => ageDays(s.lastReviewed) > maxAgeDays);
const dueSoon = sites.filter((s) => {
  const age = ageDays(s.lastReviewed);
  return Number.isFinite(age) && age <= maxAgeDays && (maxAgeDays - age) <= dueSoonDays;
});

console.log(JSON.stringify({
  total: sites.length,
  validationErrors: errors,
  stale: stale.map((s) => ({ id: s.id, lastReviewed: s.lastReviewed })),
  dueSoon: dueSoon.map((s) => ({ id: s.id, lastReviewed: s.lastReviewed, daysUntilReview: maxAgeDays - ageDays(s.lastReviewed) })),
  maxAgeDays,
  dueSoonDays,
}, null, 2));

if (errors.length || stale.length) process.exitCode = 1;
