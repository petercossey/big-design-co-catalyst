# Widget Development Template for Catalyst

This template provides a structured approach for creating widgets that fetch data from the BigCommerce Storefront GraphQL API and display it in reusable React components.

## Prompt Template

### Basic Information
**Widget Name**: [Name of your widget]
**Purpose**: [Brief description of what the widget displays/does]
**Target Placement**: [Where this widget will be used - product pages, category pages, etc.]

### Data Requirements
**GraphQL Data Needed**:
- [ ] List all fields/data points needed from the GraphQL API
- [ ] Specify any custom fields required
- [ ] Note any relationships between data (e.g., variants, options, etc.)

**Example Query Structure**:
```graphql
# Provide a sample of the GraphQL query you need
# Include any fragments or specific fields
```

### Display Requirements
**Visual Design**:
- [ ] Describe the layout/appearance
- [ ] List any states (loading, empty, error, etc.)
- [ ] Specify responsive behavior
- [ ] Note any animations or interactions

**Styling Approach**:
- [ ] Use Tailwind CSS classes
- [ ] Follow existing design patterns from /core/vibes/soul
- [ ] Maintain consistency with the existing theme

### Implementation Checklist

#### 1. Create GraphQL Fragment
**Location**: `/core/components/[widget-name]/fragment.ts`
```typescript
import { graphql } from '~/client/graphql';

export const [WidgetName]Fragment = graphql(`
  fragment [WidgetName]Fragment on [GraphQLType] {
    # Add your fields here
  }
`);
```

#### 2. Create Main Component
**Location**: `/core/components/[widget-name]/index.tsx`
```typescript
import { clsx } from 'clsx';
import { FragmentOf, readFragment } from '~/client/graphql';
import { [WidgetName]Fragment } from './fragment';

interface [WidgetName]Props {
  data: FragmentOf<typeof [WidgetName]Fragment>;
  // Add other props as needed
}

export function [WidgetName]({ data }: [WidgetName]Props) {
  const widgetData = readFragment([WidgetName]Fragment, data);
  
  // Component logic here
  
  return (
    <div className="[appropriate-tailwind-classes]">
      {/* Widget content */}
    </div>
  );
}
```

#### 3. Create Client Component (if needed)
**Location**: `/core/components/[widget-name]/[widget-name]-client.tsx`
```typescript
'use client';

import { ReactNode } from 'react';

interface [WidgetName]ClientProps {
  children: ReactNode;
}

export function [WidgetName]Client({ children }: [WidgetName]ClientProps) {
  // Client-side logic here
  return children;
}

export function [WidgetName]Skeleton() {
  return (
    <div className="animate-pulse">
      {/* Skeleton UI */}
    </div>
  );
}
```

#### 4. Integration Steps

##### For Product Pages
1. Import fragment in `/core/app/[locale]/(default)/product/[slug]/page-data.ts`
2. Add fragment to appropriate query
3. Import widget in page component
4. Place widget in desired location

##### For Other Pages
1. Identify the page query file
2. Add fragment to query
3. Import and use widget component

### Code Quality Requirements

#### TypeScript
- [ ] No `any` types - use proper interfaces
- [ ] Handle all nullable fields with optional chaining
- [ ] Export all necessary types

#### Error Handling
- [ ] Handle empty/null data gracefully
- [ ] Provide meaningful fallback UI
- [ ] Consider edge cases

#### Performance
- [ ] Use server components by default
- [ ] Only use client components when necessary
- [ ] Implement proper loading states

#### Accessibility
- [ ] Use semantic HTML
- [ ] Include proper ARIA labels
- [ ] Ensure keyboard navigation works

### Testing Checklist
- [ ] Component renders without errors
- [ ] Handles empty/null data
- [ ] Responsive on all screen sizes
- [ ] TypeScript compilation passes
- [ ] ESLint rules pass

### Example Implementation Pattern

Based on the Stock Widget example, here's the pattern to follow:

1. **Fragment** - Define what data you need:
```typescript
export const ExampleFragment = graphql(`
  fragment ExampleFragment on Product {
    entityId
    customFields(names: ["field_name"]) {
      edges {
        node {
          name
          value
        }
      }
    }
  }
`);
```

2. **Component** - Process and display the data:
```typescript
export function ExampleWidget({ product }: { product: FragmentOf<typeof ExampleFragment> }) {
  const data = readFragment(ExampleFragment, product);
  
  if (!data) {
    return <div>No data available</div>;
  }
  
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      {/* Your widget content */}
    </div>
  );
}
```

3. **Integration** - Add to page:
```typescript
// In page-data.ts
import { ExampleFragment } from '~/components/example-widget/fragment';

// Add to query
const Query = graphql(`
  query {
    product {
      ...ExampleFragment
    }
  }
`, [ExampleFragment]);

// In page.tsx
import { ExampleWidget } from '~/components/example-widget';

// Use in JSX
<ExampleWidget product={productData} />
```

### Common Patterns

#### Conditional Rendering
```typescript
if (!data?.field?.edges?.length) {
  return <EmptyState />;
}
```

#### Type-safe Class Names
```typescript
const statusClasses = {
  'active': 'bg-green-100 text-green-800',
  'inactive': 'bg-gray-100 text-gray-800',
};

className={clsx('base-classes', statusClasses[status])}
```

#### Custom Field Access
```typescript
const customValue = data.customFields?.edges?.find(
  (field) => field.node.name === 'field_name'
)?.node.value;
```

### Deliverables
1. GraphQL fragment file
2. Main component file
3. Client component file (if needed)
4. Integration into target page(s)
5. TypeScript types exported
6. Documentation/comments for complex logic

### Notes for AI/Developers
- Always check existing components in `/core/vibes/soul` for reusable patterns
- Use `clsx` for conditional classes, not template literals
- Follow the established file structure and naming conventions
- Remember that Catalyst uses Makeswift for visual editing
- Cache duration is controlled by `DEFAULT_REVALIDATE_TARGET` env variable
- Authenticated users bypass cache for personalized content