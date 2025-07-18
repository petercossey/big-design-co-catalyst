# Widget Development Prompt Template

Copy and fill out this template when requesting a new widget for the Catalyst application.

---

## Widget Request

**Widget Name**: [e.g., "Shipping Calculator Widget"]

**Purpose**: [e.g., "Display shipping costs and delivery times based on customer location"]

**Placement**: [e.g., "Product detail page, below add to cart button"]

## Data Requirements

**I need to fetch from GraphQL**:
- [ ] [e.g., Product weight and dimensions]
- [ ] [e.g., Shipping zones and rates]
- [ ] [e.g., Custom fields: _shipping_class, _delivery_time]

**Sample data structure I expect**:
```
[Provide example of the data structure you need]
```

## Display Requirements

**Desktop Layout**:
```
[ASCII art or description of desktop layout]
┌─────────────────────────┐
│ Shipping Calculator     │
├─────────────────────────┤
│ Enter ZIP: [_______]    │
│                         │
│ Standard: $5 (3-5 days) │
│ Express: $15 (1-2 days) │
└─────────────────────────┘
```

**Mobile Layout**:
[Describe any differences from desktop]

**Visual States**:
- Loading: [Description]
- Empty: [Description]
- Error: [Description]
- Success: [Description]

**Interactions**:
- [ ] [e.g., ZIP code input validation]
- [ ] [e.g., Shipping method selection]
- [ ] [e.g., Real-time calculation on ZIP change]

## Technical Requirements

**Server/Client Rendering**:
- [ ] Server-side only (static data)
- [ ] Client-side needed (for interactions/real-time updates)
- [ ] Hybrid (initial server render, client enhancements)

**Caching Strategy**:
- [ ] Use default cache (from DEFAULT_REVALIDATE_TARGET)
- [ ] Custom cache duration needed: [specify]
- [ ] No cache (real-time data)

**Dependencies**:
- [ ] Needs additional npm packages: [list them]
- [ ] Needs external API calls: [describe]
- [ ] Uses only existing BigCommerce GraphQL

## Integration Points

**Where to add this widget**:
1. Page: [e.g., /product/[slug]/page.tsx]
2. Position: [e.g., After ProductDetail component, before reviews]
3. Conditional display: [e.g., Only show if product has shipping_class]

## Example Implementation

**Similar to existing widget**: [e.g., "Similar to Stock Widget but for shipping"]

**Key differences**: [List any unique requirements]

## Success Criteria

- [ ] [e.g., Shows accurate shipping costs]
- [ ] [e.g., Updates when ZIP code changes]
- [ ] [e.g., Handles international shipping]
- [ ] [e.g., Mobile responsive]
- [ ] [e.g., Loads in under 2 seconds]

---

## For AI Assistant

Please create this widget following the Catalyst patterns:
1. GraphQL fragment in `/components/[widget-name]/fragment.ts`
2. Server component in `/components/[widget-name]/index.tsx`
3. Client component in `/components/[widget-name]/client.tsx` (if needed)
4. Use Tailwind CSS matching existing design system
5. Handle all edge cases and loading states
6. Make it fully typed with TypeScript
7. Follow ESLint rules (use `clsx`, no `any` types, etc.)

Additional context: [Any other relevant information]