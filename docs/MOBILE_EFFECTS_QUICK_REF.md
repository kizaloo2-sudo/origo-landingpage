# Quick Reference: Mobile Effects Prevention

## 🚨 The Golden Rules

### Rule #1: Always Use `md:` Prefix for Hover
```tsx
// ❌ NEVER do this
className="hover:bg-blue-500"

// ✅ ALWAYS do this
className="md:hover:bg-blue-500"
```

### Rule #2: No JavaScript Hover State Management
```tsx
// ❌ NEVER do this
const [isHovered, setIsHovered] = useState(false);

// ✅ ALWAYS do this
className="group md:group-hover:..."
```

### Rule #3: Simplify Mobile Backgrounds
```tsx
// ❌ NEVER do this on mobile
className="backdrop-blur-xl bg-black/80"

// ✅ ALWAYS do this
className="bg-black md:bg-black/80 md:backdrop-blur-xl"
```

---

## ⚡ Quick Patterns

### Card with Hover
```tsx
<div className="group">
  {/* Glow - Desktop only */}
  <div className="hidden md:block md:group-hover:bg-blue-500/5" />
  
  {/* Card */}
  <div className="
    bg-gray-900
    border-2 border-gray-800
    md:hover:border-blue-500
    md:hover:-translate-y-2
  ">
    <h3 className="md:group-hover:text-blue-500">Title</h3>
  </div>
</div>
```

### Button
```tsx
<button className="
  min-h-[44px]              // Touch target
  active:scale-95           // Mobile tap
  md:hover:scale-105        // Desktop hover
">
  Click Me
</button>
```

### Navigation Dropdown
```tsx
<div className="group">
  <button onClick={() => setOpen(!open)}>Menu</button>
  
  <div className={`
    ${open ? 'block' : 'hidden'}           // Mobile: click
    md:group-hover:block md:group-hover:opacity-100  // Desktop: hover
  `}>
    Dropdown
  </div>
</div>
```

---

## ✅ Pre-Commit Checklist

- [ ] All hover effects use `md:` prefix
- [ ] No JavaScript hover state management
- [ ] Touch targets minimum 44x44px
- [ ] Backdrop-blur only on desktop (`md:backdrop-blur-xl`)
- [ ] Group hover pattern for nested effects
- [ ] Tested on actual mobile device

---

## 🔍 Code Review Checklist

Search for these patterns in code reviews:

```bash
# Find hover without breakpoint
grep -r "hover:" --include="*.tsx" --include="*.jsx"

# Find useState with hover/active
grep -r "useState.*hover\|useState.*active" --include="*.tsx"

# Find backdrop-blur without breakpoint
grep -r "backdrop-blur" --include="*.tsx" --include="*.jsx"
```

If any of these return results without `md:` prefix, flag for review.

---

## 📱 Test Commands

```bash
# Test on mobile viewport
# Chrome DevTools → Toggle Device Toolbar
# Select iPhone/Android preset
# Test touch interactions

# Verify no sticky hover:
1. Tap element
2. Lift finger
3. Check if hover state persists (❌ BAD)
```

---

## 🆘 Emergency Fix Template

If you find a component with mobile hover issues:

```tsx
// BEFORE (broken)
<div className="hover:bg-blue-500 backdrop-blur-xl">

// AFTER (fixed)
<div className="md:hover:bg-blue-500 md:backdrop-blur-xl">
```

Apply this pattern to:
- Hover states → `md:hover:...`
- Group hover → `md:group-hover:...`
- Backdrop blur → `md:backdrop-blur-...`
- Complex transforms → `md:hover:transform...`
