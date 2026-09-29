# Architecture

## Frontend

Next.js App Router + TypeScript, mobile-first, accessible, local assets, no unnecessary UI dependencies.

## Core modules

Home / Experiences / Planner / Transport / Before You Buy / Privacy / Terms.

## Data trust model

Every mutable operational record should support source, source URL, last updated date, verification status, price type and notes.

Suggested states: CHECKED, ESTIMATED, UNVERIFIED, PLANNED, EXPIRED, ARCHIVED.

## Data lifecycle

Record → Source review → Verification → Approval → Publish → Monitor → Update / Expire / Archive.

## Future production evolution

A backend/database, admin dashboard, authentication, provider verification workflow, analytics, booking, payments and notifications are future modules and must be introduced only after separate architecture, security and legal review.
