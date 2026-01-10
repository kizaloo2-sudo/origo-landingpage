# Mobile Effects Specification & Guidelines

## 📋 Executive Summary

This document provides a comprehensive specification for handling visual effects, interactions, and animations across mobile and desktop devices. Following these guidelines will prevent common mobile UX issues while maintaining rich desktop experiences.

---

## 🎯 Core Principles

### Principle 1: Mobile-First Static Design
**Rule**: Mobile devices should receive a clean, static design without hover-dependent effects.

**Rationale**:
- Touch devices don't have a true "hover" state
- Pseudo-hover states (tap-and-hold, active states) create confusion
- Better performance on lower-powered devices
- Clearer, more predictable user experience

**Implementation**:
```tsx
// ❌ BAD: Hover effects without device detection
className="hover:bg-blue-500"

// ✅ GOOD: Desktop-only hover effects
className="md:hover:bg-blue-500"
```

---

### Principle 2: Desktop Progressive Enhancement
**Rule**: Desktop devices receive enhanced interactions through hover, focus, and pointer events.

**Rationale**:
- Desktop users expect rich, responsive feedback
- Hover states provide valuable affordance cues
- Better utilization of precise pointer input

**Implementation**:
```tsx
// ✅ GOOD: Progressive enhancement pattern
className="
  bg-gray-900                    // Base (all devices)
  md:hover:bg-gray-800          // Desktop hover
  md:hover:scale-105            // Desktop transform
  md:transition-all             // Desktop transitions
"
```

---

### Principle 3: No JavaScript-Based Hover Detection
**Rule**: Avoid JavaScript state management for hover/active states unless absolutely necessary.

**Rationale**:
- Adds unnecessary complexity
- Potential for bugs and edge cases
- Performance overhead
- Harder to maintain

**Implementation**:
```tsx
// ❌ BAD: JavaScript state for hover
const [isHovered, setIsHovered] = useState(false);
<div onMouseEnter={() => setIsHovered(true)}>

// ✅ GOOD: CSS-only with Tailwind group pattern
<div className="group">
  <div className="md:group-hover:opacity-100">
```

---

## 📱 Mobile-Specific Guidelines

### 1. Touch Interactions

#### ✅ DO:
- Use clear, static designs on mobile
- Provide visual feedback only on actual tap (`:active` state)
- Use appropriate touch target sizes (minimum 44x44px)
- Add `touch-action` CSS for gesture control when needed

#### ❌ DON'T:
- Use hover effects on mobile
- Rely on tooltips that require hover
- Use click/tap to toggle states unless it's explicit (like accordion)
- Use double-tap interactions

**Example**:
```tsx
// ✅ GOOD: Touch-friendly button
<button className="
  min-h-[44px] min-w-[44px]     // Touch target size
  active:scale-95               // Tap feedback (all devices)
  md:hover:scale-105            // Hover (desktop only)
">
  Click Me
</button>
```

---

### 2. Background Effects

#### ✅ DO:
- Use solid backgrounds on mobile
- Reduce or remove blur effects on mobile
- Simplify gradients on mobile

#### ❌ DON'T:
- Use backdrop-blur on mobile (performance)
- Use complex radial gradients
- Use multiple layered backgrounds

**Example**:
```tsx
// ✅ GOOD: Simplified mobile background
<div className="
  bg-black                      // Mobile: solid
  md:bg-black/80               // Desktop: semi-transparent
  md:backdrop-blur-xl          // Desktop: blur effect
">
```

---

### 3. Animations & Transitions

#### ✅ DO:
- Use `prefers-reduced-motion` media query
- Keep animations short (200-300ms) on mobile
- Use CSS transitions over JavaScript animations
- Test on actual devices (not just emulators)

#### ❌ DON'T:
- Use auto-playing animations on mobile
- Use parallax effects on mobile
- Use complex transform animations
- Chain multiple animations

**Example**:
```tsx
// ✅ GOOD: Reduced motion support
<div className="
  transition-opacity duration-200
  motion-reduce:transition-none
  md:transition-all md:duration-300
">
```

---

## 🖥️ Desktop-Specific Guidelines

### 1. Hover States

#### ✅ DO:
- Use `md:` prefix for all hover effects
- Provide clear hover feedback
- Use CSS group pattern for nested hovers
- Keep hover effects performant

#### ❌ DON'T:
- Apply hover effects globally
- Use JavaScript for hover detection
- Create hover-dependent critical functionality

**Example**:
```tsx
// ✅ GOOD: Desktop hover pattern
<div className="group">
  {/* Parent hover triggers children */}
  <div className="md:group-hover:opacity-100 md:group-hover:scale-110" />
  <h3 className="md:group-hover:text-blue-500" />
</div>
```

---

### 2. Focus States

#### ✅ DO:
- Always provide focus styles
- Make focus visible for keyboard navigation
- Use `focus-visible:` for better UX

#### ❌ DON'T:
- Remove focus outlines without replacement
- Make focus styles desktop-only

**Example**:
```tsx
// ✅ GOOD: Accessible focus
<button className="
  focus-visible:outline-2
  focus-visible:outline-blue-500
  focus-visible:outline-offset-2
">
```

---

## 🛠️ Implementation Patterns

### Pattern 1: Card Component with Hover

```tsx
function Card({ title, description }) {
  return (
    <div className="group relative h-full">
      {/* Glow Effect - Desktop Only */}
      <div className="
        hidden md:block
        absolute inset-0 -z-10
        rounded-2xl blur-3xl
        transition-all duration-500
        group-hover:bg-blue-500/10
      " />

      {/* Card Container */}
      <div className="
        h-full
        bg-gray-900                      // Mobile: solid
        md:bg-gray-900/80               // Desktop: semi-transparent
        border-2 border-gray-800        // Mobile: static
        rounded-2xl p-8
        overflow-hidden
        transition-all duration-300
        md:hover:border-blue-500        // Desktop: hover border
        md:hover:shadow-xl              // Desktop: hover shadow
        md:hover:-translate-y-2         // Desktop: hover lift
      ">
        {/* Icon */}
        <div className="
          w-16 h-16
          bg-blue-500/10
          border border-blue-500/20
          rounded-xl
          flex items-center justify-center
          transition-all duration-300
          md:group-hover:bg-blue-500/20
          md:group-hover:scale-110
        ">
          <Icon className="
            w-8 h-8 text-blue-500
            transition-transform duration-300
            md:group-hover:rotate-12
          " />
        </div>

        {/* Content */}
        <h3 className="
          text-2xl font-bold text-white
          transition-colors duration-300
          md:group-hover:text-blue-500
        ">
          {title}
        </h3>
        <p className="text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}
```

---

### Pattern 2: Button with States

```tsx
function Button({ children, variant = "primary" }) {
  return (
    <button className="
      // Base styles (all devices)
      px-6 py-3 rounded-lg
      font-semibold
      min-h-[44px]                    // Touch target
      transition-all duration-200
      
      // Mobile: Simple active state
      active:scale-95
      
      // Desktop: Rich hover states
      md:hover:scale-105
      md:hover:shadow-lg
      
      // Focus (all devices)
      focus-visible:outline-2
      focus-visible:outline-offset-2
      focus-visible:outline-blue-500
      
      // Reduced motion
      motion-reduce:transition-none
      motion-reduce:hover:transform-none
    ">
      {children}
    </button>
  );
}
```

---

### Pattern 3: Navigation with Dropdown

```tsx
function NavItem({ label, items }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="group relative">
      {/* Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}    // Mobile: Click to toggle
        className="
          px-4 py-2
          md:hover:text-blue-500              // Desktop: Hover color
        "
      >
        {label}
      </button>

      {/* Dropdown */}
      <div className={`
        absolute top-full left-0 mt-2
        bg-gray-900 rounded-lg shadow-xl
        transition-all duration-200
        
        // Mobile: Controlled by state
        ${isOpen ? 'block' : 'hidden'}
        
        // Desktop: Hover to show (override mobile)
        md:opacity-0 md:invisible
        md:group-hover:opacity-100
        md:group-hover:visible
        md:group-hover:block
      `}>
        {items.map(item => (
          <a key={item} href="#" className="
            block px-4 py-2
            md:hover:bg-gray-800
          ">
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}
```

---

## ✅ Checklist for New Components

### Before Implementation
- [ ] Is this component mobile-first?
- [ ] Do hover effects have `md:` prefix?
- [ ] Are touch targets at least 44x44px?
- [ ] Is focus state visible and accessible?
- [ ] Does it work without JavaScript?

### During Development
- [ ] Test on actual mobile device
- [ ] Test with keyboard navigation
- [ ] Test with screen reader
- [ ] Check performance (no jank)
- [ ] Verify reduced motion support

### Before Production
- [ ] No hover states on mobile
- [ ] No backdrop-blur on mobile (or minimal)
- [ ] Active states work on touch
- [ ] Group hover pattern used correctly
- [ ] All transitions under 300ms

---

## 🧪 Testing Strategy

### Device Testing Matrix

| Device Type | Screen Size | Input Method | Effects to Test |
|------------|-------------|--------------|-----------------|
| Mobile Phone | 375-428px | Touch | No hover, active states |
| Tablet | 768-1024px | Touch/Stylus | Minimal hover, touch priority |
| Laptop | 1024-1440px | Trackpad/Mouse | All hover effects |
| Desktop | 1440px+ | Mouse | All hover effects |

### Test Scenarios

1. **Hover Leakage Test**
   - Touch card on mobile
   - Lift finger
   - Verify no hover state persists

2. **Performance Test**
   - Open DevTools Performance tab
   - Interact with components
   - Check for layout thrashing or jank

3. **Accessibility Test**
   - Use keyboard only
   - Use screen reader
   - Check focus visibility

4. **Reduced Motion Test**
   - Enable "Reduce Motion" in OS
   - Verify animations are removed/simplified

---

## 🐛 Common Issues & Solutions

### Issue 1: Sticky Hover on Mobile
**Problem**: Tapping element on mobile causes hover state to persist

**Solution**:
```tsx
// ❌ BAD
className="hover:bg-blue-500"

// ✅ GOOD
className="md:hover:bg-blue-500"
```

---

### Issue 2: Poor Touch Target Size
**Problem**: Buttons too small to tap accurately

**Solution**:
```tsx
// ❌ BAD
className="p-2"  // Only 8px + content

// ✅ GOOD
className="min-h-[44px] min-w-[44px] p-4"
```

---

### Issue 3: Backdrop Blur Performance
**Problem**: Laggy scrolling on mobile

**Solution**:
```tsx
// ❌ BAD
className="backdrop-blur-xl"

// ✅ GOOD
className="md:backdrop-blur-xl"  // Desktop only
```

---

### Issue 4: Complex State Management
**Problem**: Using useState for hover detection

**Solution**:
```tsx
// ❌ BAD
const [isHovered, setIsHovered] = useState(false);
return (
  <div 
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    {isHovered && <Tooltip />}
  </div>
);

// ✅ GOOD
return (
  <div className="group">
    <div className="hidden md:group-hover:block">
      <Tooltip />
    </div>
  </div>
);
```

---

## 📚 Reference Breakpoints

```typescript
// tailwind.config.ts
export default {
  theme: {
    screens: {
      'sm': '640px',   // Small devices
      'md': '768px',   // ← Use this for hover effects
      'lg': '1024px',  // Large devices
      'xl': '1280px',  // Extra large
      '2xl': '1536px', // 2X Extra large
    },
  },
}
```

**Best Practice**: Use `md:` (768px) as the breakpoint for hover effects
- Most tablets 768px+ support hover well
- Clear separation between touch-primary and pointer-primary devices

---

## 🎨 Design Tokens for Effects

### Animation Durations
```tsx
// Mobile
duration-200  // 200ms - Quick feedback
duration-300  // 300ms - Max for mobile

// Desktop
duration-300  // 300ms - Standard
duration-500  // 500ms - Slow, smooth
```

### Transform Scales
```tsx
// Tap feedback (Mobile)
active:scale-95     // Subtle press

// Hover feedback (Desktop)
md:hover:scale-105  // Gentle lift
md:hover:scale-110  // Noticeable zoom
```

### Opacity Values
```tsx
// Disabled states
opacity-50          // Clear disabled state

// Hover states
opacity-80          // Subtle hover
opacity-90          // Medium hover
opacity-100         // Full visibility
```

---

## 📖 Additional Resources

- [MDN: Hover Media Query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover)
- [MDN: Pointer Media Query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer)
- [WCAG Touch Target Size](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
- [Tailwind CSS Group Hover](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state)

---

## 🔄 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-11 | Initial specification |

---

## 📝 Notes

This specification should be reviewed and updated quarterly or when major framework updates occur. All team members should familiarize themselves with these patterns before implementing new UI components.
