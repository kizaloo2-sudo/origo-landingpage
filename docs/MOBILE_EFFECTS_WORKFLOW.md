# Component Development Workflow: Mobile-First Effects

## 🎯 Step-by-Step Development Process

### Phase 1: Planning (Before Writing Code)

#### Step 1.1: Define Component Requirements
```markdown
Component: [Name]
Purpose: [Description]
Devices: Mobile, Tablet, Desktop
Interactions Needed:
- [ ] Click/Tap
- [ ] Hover (Desktop only)
- [ ] Focus
- [ ] Active state
```

#### Step 1.2: Design Review Questions
- Does this component need hover effects?
  - If YES → Plan for `md:` prefix
  - If NO → Skip hover entirely
- Are there any background effects (blur, gradient)?
  - If YES → Plan mobile simplification
- What is the touch target size?
  - Minimum 44x44px required

---

### Phase 2: Implementation

#### Step 2.1: Write Mobile-First Base Styles
```tsx
// Start with mobile (no breakpoint prefix)
<div className="
  bg-gray-900           // Solid background
  border-2 border-gray-800
  rounded-xl p-8
  min-h-[44px]         // Touch target
">
```

#### Step 2.2: Add Desktop Enhancements
```tsx
<div className="
  // Mobile base (from Step 2.1)
  bg-gray-900
  border-2 border-gray-800
  rounded-xl p-8
  
  // Desktop enhancements (add md: prefix)
  md:bg-gray-900/80         // Semi-transparent
  md:backdrop-blur-xl       // Blur effect
  md:hover:border-blue-500  // Hover border
  md:hover:shadow-xl        // Hover shadow
">
```

#### Step 2.3: Add Animations (Optional)
```tsx
<div className="
  // ... previous styles
  
  // Transitions (always include)
  transition-all duration-300
  
  // Reduced motion support
  motion-reduce:transition-none
  
  // Desktop transforms
  md:hover:-translate-y-2
  motion-reduce:md:hover:translate-y-0
">
```

#### Step 2.4: Use Group Pattern for Nested Effects
```tsx
<div className="group">  {/* Parent */}
  {/* Child inherits parent hover */}
  <div className="md:group-hover:opacity-100">
    Appears on parent hover
  </div>
</div>
```

---

### Phase 3: Testing

#### Test 3.1: Mobile Device Test
```bash
Device: iPhone/Android
Actions:
1. [ ] Tap component
2. [ ] Verify active state works
3. [ ] Lift finger
4. [ ] Verify NO hover state persists
5. [ ] Check touch target size (44x44px min)
```

#### Test 3.2: Desktop Browser Test
```bash
Browser: Chrome/Firefox/Safari
Actions:
1. [ ] Hover over component
2. [ ] Verify hover effects appear
3. [ ] Move mouse away
4. [ ] Verify hover effects disappear
5. [ ] Test keyboard focus
```

#### Test 3.3: Performance Test
```bash
Tool: Chrome DevTools Performance
Actions:
1. [ ] Open Performance tab
2. [ ] Start recording
3. [ ] Interact with component
4. [ ] Stop recording
5. [ ] Check for jank (>16ms frames)
```

#### Test 3.4: Accessibility Test
```bash
Tools: Keyboard + Screen Reader
Actions:
1. [ ] Tab to component
2. [ ] Verify focus visible
3. [ ] Activate with Enter/Space
4. [ ] Screen reader announces correctly
```

---

### Phase 4: Code Review

#### Review 4.1: Self Review Checklist
```bash
# Run these checks before committing

# 1. Check for hover without breakpoint
grep -r "className.*hover:" src/components/YourComponent.tsx

# Expected: All hover should have "md:hover:" prefix
# ❌ Bad: "hover:bg-blue-500"
# ✅ Good: "md:hover:bg-blue-500"

# 2. Check for backdrop-blur without breakpoint
grep -r "backdrop-blur" src/components/YourComponent.tsx

# Expected: All backdrop-blur should have "md:" prefix
# ❌ Bad: "backdrop-blur-xl"
# ✅ Good: "md:backdrop-blur-xl"

# 3. Check for useState with hover
grep -r "useState.*hover\|useState.*active" src/components/YourComponent.tsx

# Expected: No results (use CSS group pattern instead)
```

#### Review 4.2: Peer Review Questions
- [ ] Are all hover effects prefixed with `md:`?
- [ ] Is the component mobile-first?
- [ ] Are touch targets at least 44x44px?
- [ ] Does it work without JavaScript?
- [ ] Is focus state visible?

---

### Phase 5: Documentation

#### Doc 5.1: Component Documentation Template
```tsx
/**
 * ComponentName
 * 
 * @description Brief description
 * 
 * @mobile
 * - Solid background
 * - No hover effects
 * - 44px touch targets
 * - Active state on tap
 * 
 * @desktop
 * - Semi-transparent background
 * - Hover effects (border, shadow, transform)
 * - Focus visible for keyboard nav
 * 
 * @accessibility
 * - Keyboard navigable
 * - Screen reader compatible
 * - Reduced motion support
 * 
 * @example
 * <ComponentName />
 */
```

---

## 🔄 Common Workflows

### Workflow A: Creating New Interactive Card

```tsx
// 1. Start with mobile base
function Card() {
  return (
    <div className="
      bg-gray-900
      border-2 border-gray-800
      rounded-xl p-8
      min-h-[320px]
    ">
      <h3>Title</h3>
      <p>Description</p>
    </div>
  );
}

// 2. Add group for nested hover
function Card() {
  return (
    <div className="group ..."> {/* Add group */}
      {/* Content */}
    </div>
  );
}

// 3. Add desktop hover effects
function Card() {
  return (
    <div className="
      group
      bg-gray-900
      border-2 border-gray-800
      rounded-xl p-8
      
      md:hover:border-blue-500    // Desktop hover
      md:hover:shadow-xl          // Desktop hover
      md:hover:-translate-y-2     // Desktop hover
      transition-all duration-300
    ">
      <h3 className="md:group-hover:text-blue-500">
        Title
      </h3>
    </div>
  );
}

// 4. Test on mobile → Test on desktop → Done!
```

---

### Workflow B: Fixing Existing Component with Mobile Issues

```tsx
// BEFORE (problematic)
function OldCard() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        bg-gray-900/80
        backdrop-blur-xl
        ${isHovered ? 'border-blue-500' : 'border-gray-800'}
      `}
    >
      <h3 className={isHovered ? 'text-blue-500' : 'text-white'}>
        Title
      </h3>
    </div>
  );
}

// AFTER (fixed)
function NewCard() {
  // ✅ Remove useState
  // ✅ Remove event handlers
  
  return (
    <div className="
      group
      bg-gray-900              // ✅ Solid mobile
      md:bg-gray-900/80       // ✅ Desktop only
      md:backdrop-blur-xl     // ✅ Desktop only
      border-2 border-gray-800
      md:hover:border-blue-500 // ✅ Desktop only
    ">
      <h3 className="
        text-white
        md:group-hover:text-blue-500 // ✅ Desktop only
      ">
        Title
      </h3>
    </div>
  );
}
```

---

### Workflow C: Converting Hover to Click for Mobile

```tsx
// Scenario: Dropdown that should click on mobile, hover on desktop

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="group relative">
      {/* Trigger */}
      <button onClick={() => setIsOpen(!isOpen)}>
        Menu
      </button>
      
      {/* Dropdown */}
      <div className={`
        absolute top-full mt-2
        bg-gray-900 rounded-lg
        
        // Mobile: Controlled by state
        ${isOpen ? 'block' : 'hidden'}
        
        // Desktop: Override with hover
        md:opacity-0 md:invisible
        md:group-hover:opacity-100
        md:group-hover:visible
        md:group-hover:block
      `}>
        Dropdown content
      </div>
    </div>
  );
}
```

---

## 📊 Decision Tree

```
Is this component interactive?
├─ NO → Use static styles only
└─ YES → Continue
    │
    ├─ Does it need hover effects?
    │  ├─ NO → Use click/tap only
    │  └─ YES → Add `md:hover:` effects
    │
    ├─ Does it have nested hover elements?
    │  ├─ NO → Use standard `md:hover:`
    │  └─ YES → Use `group` + `md:group-hover:`
    │
    ├─ Does it use background effects?
    │  ├─ NO → Continue
    │  └─ YES → Simplify for mobile, use `md:` prefix
    │
    └─ Is touch target large enough?
       ├─ YES → Ship it!
       └─ NO → Add `min-h-[44px] min-w-[44px]`
```

---

## 🎓 Training Exercises

### Exercise 1: Convert This Bad Code
```tsx
// Fix this component:
<div 
  className="hover:bg-blue-500 backdrop-blur-xl"
  onMouseEnter={() => setHovered(true)}
>
  Hover me
</div>

// Your solution:
// _________________
```

<details>
<summary>Solution</summary>

```tsx
<div className="
  group
  bg-gray-900
  md:bg-gray-900/80
  md:backdrop-blur-xl
  md:hover:bg-blue-500
">
  Hover me
</div>
```
</details>

---

### Exercise 2: Create Mobile-First Card
```tsx
// Requirements:
// - Mobile: Solid bg, no hover
// - Desktop: Semi-transparent, hover effects
// - Icon rotates on hover (desktop only)
// - Title changes color on hover (desktop only)

// Your solution:
// _________________
```

<details>
<summary>Solution</summary>

```tsx
<div className="group">
  <div className="
    bg-gray-900
    md:bg-gray-900/80
    border-2 border-gray-800
    rounded-xl p-8
    md:hover:border-blue-500
    md:hover:-translate-y-2
    transition-all duration-300
  ">
    <div className="
      w-16 h-16
      bg-blue-500/10
      rounded-xl
      flex items-center justify-center
      md:group-hover:rotate-12
      transition-transform
    ">
      <Icon />
    </div>
    
    <h3 className="
      text-white
      md:group-hover:text-blue-500
      transition-colors
    ">
      Title
    </h3>
  </div>
</div>
```
</details>

---

## 📚 Additional Resources

- Full Spec: `MOBILE_EFFECTS_SPEC.md`
- Quick Ref: `MOBILE_EFFECTS_QUICK_REF.md`
- Tailwind Docs: https://tailwindcss.com/docs/hover-focus-and-other-states
