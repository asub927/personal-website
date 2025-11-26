# Visual Design Examples - McKinsey-Inspired Theme

This document provides visual representations and detailed descriptions of how the design will look in the actual UI.

## Color Palette Visual Reference

```
┌─────────────────────────────────────────────────────────────┐
│                     PRIMARY COLORS                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ███████████  Navy Blue (#003366)                          │
│  ███████████  Primary brand color - Headings, Navigation   │
│  ███████████                                               │
│                                                             │
│  ░░░░░░░░░░░  White (#FFFFFF)                             │
│  ░░░░░░░░░░░  Primary background                          │
│  ░░░░░░░░░░░                                              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                     ACCENT COLORS                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ▓▓▓▓▓▓▓▓▓▓▓  Teal (#00A3A1)                              │
│  ▓▓▓▓▓▓▓▓▓▓▓  Links, CTAs, Hover states                   │
│  ▓▓▓▓▓▓▓▓▓▓▓                                              │
│                                                             │
│  ▒▒▒▒▒▒▒▒▒▒▒  Gold (#C9A961)                              │
│  ▒▒▒▒▒▒▒▒▒▒▒  Premium highlights, Awards                  │
│  ▒▒▒▒▒▒▒▒▒▒▒                                              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                     TEXT COLORS                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ████████  Primary (#1A1A1A) - Main headings              │
│  ▓▓▓▓▓▓▓▓  Secondary (#4A5568) - Body text               │
│  ▒▒▒▒▒▒▒▒  Tertiary (#718096) - Metadata                 │
│  ░░░░░░░░  Light (#A0AEC0) - Subtle elements             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Navigation Bar Example

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  PORTFOLIO          Home    About    Work    Writing    Contact       │
│  (Navy #003366)     (Navy, hover → Teal)                              │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
   ↑                    ↑
   Playfair Display    Inter, uppercase, 14px
   32px, Weight 900    Letter-spacing: 0.1em
   
Background: White with 95% opacity + backdrop blur
Height: 96px
Border bottom: 1px solid #E2E8F0

HOVER STATE:
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  PORTFOLIO          Home    [About]   Work    Writing    Contact      │
│                             ▓▓▓▓▓▓▓                                    │
│                             Teal text + Navy-50 background             │
└────────────────────────────────────────────────────────────────────────┘

ACTIVE STATE:
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  PORTFOLIO          Home    ███████   Work    Writing    Contact      │
│                             │ Work │  White text on Navy background    │
│                             ███████                                    │
└────────────────────────────────────────────────────────────────────────┘
```

## Hero Section Example

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│                                                                        │
│                                                                        │
│                    Crafting Digital                                    │
│                    Experiences That                                    │
│                    Drive Results                                       │
│                    ─────────────────                                   │
│                    (Playfair Display, 72px, Navy, Weight 900)         │
│                                                                        │
│                                                                        │
│              Strategic design and development solutions                │
│              that transform businesses and engage users                │
│              ───────────────────────────────────────────              │
│              (Inter, 24px, Text Secondary #4A5568)                    │
│                                                                        │
│                                                                        │
│                      ┌──────────────────┐                             │
│                      │  View My Work    │                             │
│                      └──────────────────┘                             │
│                      Teal background, White text                       │
│                      Hover: Teal Dark + lift 2px + shadow             │
│                                                                        │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘

Vertical padding: 120px
Max content width: 960px
Centered alignment
```

## Content Card Example

```
┌─────────────────────────────────────────┐
│                                         │
│  ┌───────────────────────────────────┐ │
│  │                                   │ │
│  │      [Project Image]              │ │
│  │      16:9 aspect ratio            │ │
│  │      Grayscale 20% filter         │ │
│  │                                   │ │
│  └───────────────────────────────────┘ │
│                                         │
│  DESIGN                                 │
│  (Inter, 12px, Teal, uppercase)        │
│                                         │
│  Brand Identity Redesign                │
│  ────────────────────────                │
│  (Playfair Display, 24px, Navy)        │
│                                         │
│  A comprehensive brand refresh for a    │
│  leading technology company, focusing   │
│  on modern aesthetics and clarity.      │
│  (Inter, 16px, Text Secondary)         │
│                                         │
│  November 15, 2024                      │
│  (Inter, 14px, Text Tertiary)          │
│                                         │
└─────────────────────────────────────────┘

Border: 1px solid #E2E8F0
Border radius: 8px
Padding: 32px
Shadow: none

HOVER STATE:
┌─────────────────────────────────────────┐
│ ↗ Lifts 2px                             │
│  ┌───────────────────────────────────┐ │
│  │                                   │ │
│  │      [Project Image]              │ │
│  │      Full color (no grayscale)    │ │
│  │      Scale: 1.05                  │ │
│  │                                   │ │
│  └───────────────────────────────────┘ │
│  ...content same as above...           │
└─────────────────────────────────────────┘

Border: 1px solid #CBD5E0 (darker)
Shadow: Large shadow (shadow-lg)
Transform: scale(1.02)
Transition: 300ms ease-out
```

## Button Variations

```
PRIMARY BUTTON (Call-to-Action):
┌──────────────────────┐
│   Get Started        │  ← White text (Inter, 16px, weight 600)
└──────────────────────┘
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ← Teal background (#00A3A1)
Padding: 14px 28px
Border radius: 4px
Border: 2px solid Teal

HOVER:
┌──────────────────────┐
│   Get Started        │  ↑ Lifts 2px
└──────────────────────┘  ↓ Shadow appears
████████████████████████  ← Teal Dark (#008785)


SECONDARY BUTTON (Outline):
┌──────────────────────┐
│   Learn More         │  ← Navy text
└──────────────────────┘
░░░░░░░░░░░░░░░░░░░░░░░░  ← Transparent background
Border: 2px solid Navy

HOVER:
┌──────────────────────┐
│   Learn More         │  ← White text
└──────────────────────┘
████████████████████████  ← Navy background


TERTIARY BUTTON (Text):
   View Details  →       ← Teal text, no background
   ─────────────         ← Underline on hover
```

## Typography Hierarchy Example

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  Our Approach                                              │
│  ─────────────                                             │
│  H1: Playfair Display, 72px, Navy, Weight 900             │
│                                                            │
│                                                            │
│  Strategic Design Process                                  │
│  ─────────────────────                                     │
│  H2: Playfair Display, 48px, Navy, Weight 700             │
│                                                            │
│                                                            │
│  Discovery & Research                                      │
│  ─────────────────────                                     │
│  H3: Playfair Display, 36px, Navy, Weight 600             │
│                                                            │
│                                                            │
│  We begin every project with comprehensive research        │
│  to understand your business goals, target audience,       │
│  and competitive landscape. This foundation ensures        │
│  our solutions are strategically aligned.                  │
│  ──────────────────────────────────────────────           │
│  Body: Inter, 18px, Text Secondary (#4A5568)              │
│  Line height: 1.7, Letter spacing: -0.01em                │
│                                                            │
│                                                            │
│  PUBLISHED: NOVEMBER 2024                                  │
│  ─────────────────────────                                 │
│  Caption: Inter, 12px, Text Tertiary, Uppercase           │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

## Footer Example

```
████████████████████████████████████████████████████████████████
█                                                              █
█  PORTFOLIO                                                   █
█  ─────────                                                   █
█  (Playfair Display, 32px, White, Weight 900)               █
█                                                              █
█  A personal portfolio                                        █
█  showcasing work, writing,                                   █
█  and creative projects with                                  █
█  professional excellence.                                    █
█  (Inter, 16px, Navy-100 #CCE0F0)                           █
█                                                              █
█                                                              █
█  NAVIGATION                    CONNECT                       █
█  ──────────                    ───────                       █
█  (Inter, 14px, Teal, uppercase)                             █
█                                                              █
█  Home                          [Twitter]  [LinkedIn]        █
█  About                         [GitHub]   [Instagram]       █
█  Work                          (Icon buttons with borders)  █
█  Writing                                                     █
█  Contact                                                     █
█  (Inter, 16px, White)                                       █
█                                                              █
█  ────────────────────────────────────────────────────────   █
█                                                              █
█  © 2024 Portfolio. All rights reserved.                     █
█  Designed with excellence in mind                           █
█  (Inter, 14px, Navy-100)                                    █
█                                                              █
████████████████████████████████████████████████████████████████
Navy background (#003366)
Padding: 96px vertical
```

## Complete Page Layout Example

```
┌──────────────────────────────────────────────────────────────┐
│ NAVIGATION BAR (Fixed, 96px height)                         │
│ White background, backdrop blur, subtle shadow               │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                    HERO SECTION                              │
│                    Full viewport height                      │
│                    Centered content                          │
│                    120px vertical padding                    │
│                                                              │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  Featured Work                                               │
│  ──────────────                                              │
│  (Section heading, 96px top padding)                         │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │  Card 1  │  │  Card 2  │  │  Card 3  │                 │
│  │          │  │          │  │          │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
│  (3-column grid, 32px gap)                                  │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │  Card 4  │  │  Card 5  │  │  Card 6  │                 │
│  │          │  │          │  │          │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
│                                                              │
│  (96px bottom padding)                                       │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                    FOOTER                                    │
│                    Navy background                           │
│                    96px vertical padding                     │
│                    3-column grid                             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Responsive Behavior

### Desktop (> 1024px)
```
┌─────────────────────────────────────────────────────────┐
│ PORTFOLIO              Home  About  Work  Writing  Contact│
└─────────────────────────────────────────────────────────┘
│                                                           │
│                  Large Hero Text (72px)                   │
│                  3-column card grid                       │
│                  Generous spacing (96px)                  │
```

### Tablet (768px - 1024px)
```
┌─────────────────────────────────────────────────────────┐
│ PORTFOLIO              Home  About  Work  Writing  Contact│
└─────────────────────────────────────────────────────────┘
│                                                           │
│                Medium Hero Text (60px)                    │
│                2-column card grid                         │
│                Moderate spacing (64px)                    │
```

### Mobile (< 768px)
```
┌─────────────────────────────────────────┐
│ PORTFOLIO                    [☰]        │
└─────────────────────────────────────────┘
│                                         │
│        Small Hero Text (48px)           │
│        Single column cards              │
│        Compact spacing (48px)           │
│                                         │
│ [Hamburger menu expands to full-width]  │
```

## Color Combinations in Context

### Light Background Sections
```
Background: White (#FFFFFF)
Heading: Navy (#003366)
Body text: Text Secondary (#4A5568)
Links: Teal (#00A3A1)
Borders: Border (#E2E8F0)
```

### Dark Background Sections (Footer)
```
Background: Navy (#003366)
Heading: White (#FFFFFF)
Section headers: Teal (#00A3A1)
Body text: Navy-100 (#CCE0F0)
Links: White → Teal on hover
```

### Card Components
```
Background: White (#FFFFFF)
Border: Border (#E2E8F0)
Category badge: Teal text on Teal-50 background
Title: Navy (#003366)
Description: Text Secondary (#4A5568)
Date: Text Tertiary (#718096)
```

## Interactive States Visual Guide

### Link States
```
Default:  Navy text (#003366)
Hover:    Teal text (#00A3A1) + underline
Active:   Teal Dark (#008785)
Focus:    Teal ring (2px, 2px offset)
```

### Button States
```
Default:  Teal background, White text
Hover:    Teal Dark background + lift 2px + shadow
Active:   Teal Dark, no lift
Focus:    Teal ring (2px, 2px offset)
Disabled: Gray background, Light text
```

### Card States
```
Default:  Border (#E2E8F0), no shadow
Hover:    Border Dark (#CBD5E0), shadow-lg, scale 1.02
         Image: full color, scale 1.05
Focus:    Teal ring (2px, 2px offset)
```

## Spacing Visual Reference

```
Section Spacing (Desktop):
│
├─ 96px ─┤  Section padding top
│
│         Content
│
├─ 96px ─┤  Section padding bottom
│

Component Spacing:
│
├─ 48px ─┤  Between major components
│
│         Component
│
├─ 32px ─┤  Between related elements
│
│         Element
│
├─ 16px ─┤  Between small elements
│

Card Internal Spacing:
┌─────────────────┐
│ ├─ 32px ─┤      │  Padding all sides
│           Image │
│                 │
│ ├─ 12px ─┤      │  Category margin bottom
│           Title │
│ ├─ 16px ─┤      │  Title margin bottom
│           Desc  │
│ ├─ 16px ─┤      │  Description margin bottom
│           Date  │
│                 │
└─────────────────┘
```

## Accessibility Features

```
Focus Indicators:
┌──────────────────┐
│   Button Text    │
└──────────────────┘
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    ← 2px Teal ring
  ▓                ▓    2px offset from element
  ▓  ┌──────────┐ ▓
  ▓  │  Button  │ ▓
  ▓  └──────────┘ ▓
  ▓                ▓
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

Touch Targets (Mobile):
┌────────────────┐
│                │  Minimum 44x44px
│     Button     │  for comfortable
│                │  touch interaction
└────────────────┘
```

## Summary

This design creates a **sophisticated, professional aesthetic** through:

1. **Bold Typography**: Playfair Display serifs for impact, Inter for clarity
2. **Strategic Color**: Navy for authority, Teal for energy, Gold for premium touches
3. **Generous Spacing**: 96px section padding creates breathing room
4. **Refined Interactions**: Subtle 300ms transitions, lift effects, color changes
5. **Clear Hierarchy**: Size, weight, and color create obvious content structure
6. **Accessibility**: WCAG AA compliant, clear focus states, proper contrast

The result is a **McKinsey-grade digital experience** that conveys expertise and professionalism while remaining modern and engaging.
