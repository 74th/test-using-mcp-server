# Task Completion Workflow

## What to Do When a Task is Completed

When you finish implementing a feature or fixing a bug in Streamlit, follow this comprehensive checklist to ensure code quality and proper integration.

## 1. Code Quality Checks

### Auto-fix Issues First
```bash
# Fix all formatting and linting issues automatically
make autofix
```

This command will:
- Format Python code with Ruff
- Fix Python linting issues with Ruff
- Initialize frontend dependencies if needed
- Format frontend code with Prettier
- Fix frontend linting issues with ESLint
- Update notices file
- Run pre-commit hooks

### Manual Quality Checks
```bash
# Verify Python type checking
make python-types

# Verify frontend type checking
make frontend-types

# Check for unsynced TypeScript types
make frontend-typesync
```

## 2. Testing Requirements

### Python Testing
```bash
# Run all Python unit tests
make python-tests

# Run specific tests related to your changes
PYTHONPATH=lib pytest lib/tests/streamlit/path/to/your_test.py

# If you modified performance-critical code
make python-performance-tests
```

### Frontend Testing
```bash
# Run all frontend tests
make frontend-tests

# Run specific tests for components you modified
cd frontend && yarn test lib/src/components/path/component.test.tsx
```

### End-to-End Testing
```bash
# If you added/modified UI elements or user interactions
make run-e2e-test st_your_element_test.py

# If visual changes were made, update snapshots
make update-snapshots-changed
```

## 3. Build Verification

### Frontend Build Check
```bash
# Ensure frontend builds successfully
make frontend-fast

# For production verification
make frontend
```

### Protobuf Updates (if applicable)
```bash
# If you modified .proto files
make protobuf
```

## 4. New Feature Implementation Checklist

### For New Streamlit Elements
When implementing a new element (e.g., `st.new_widget`), ensure:

1. **Backend Implementation** (`lib/streamlit/`)
   - Element function in appropriate module
   - Added to `lib/streamlit/__init__.py`
   - Protobuf message definition in `proto/streamlit/proto/Element.proto`

2. **Frontend Implementation** (`frontend/`)
   - React component in `frontend/lib/src/components/elements/`
   - Added to `frontend/lib/src/components/core/Block/ElementNodeRenderer.tsx`
   - TypeScript types generated from protobuf

3. **Testing Coverage**
   - Python unit tests in `lib/tests/streamlit/`
   - Element mock in `lib/tests/streamlit/element_mocks.py`
   - Frontend unit tests (`*.test.tsx`)
   - E2E tests in `e2e_playwright/` (both `st_element.py` and `st_element_test.py`)

4. **Documentation**
   - Docstrings following Numpydoc style
   - Type annotations for all new functions

## 5. Pre-Commit Verification

### Run All Checks
```bash
# Ensure all pre-commit hooks pass
pre-commit run --all-files
```

### Manual Verification
```bash
# Check that build works end-to-end
make clean
make all
streamlit hello  # Verify basic functionality
```

## 6. Performance Considerations

### If Performance-Critical Changes
```bash
# Run performance benchmarks
make python-performance-tests

# Run Lighthouse tests for frontend performance
make lighthouse-tests
```

## 7. Integration Testing

### Full System Test
```bash
# Test CLI functionality
make cli-smoke-tests

# Test bare execution mode
make bare-execution-tests
```

## 8. Final Checklist Before Submission

- [ ] `make autofix` completed successfully
- [ ] All relevant tests pass (`python-tests`, `frontend-tests`)
- [ ] E2E tests pass for affected functionality
- [ ] Type checking passes (`python-types`, `frontend-types`)
- [ ] Build completes successfully (`frontend-fast`)
- [ ] New features include comprehensive tests
- [ ] Documentation is updated (docstrings, type hints)
- [ ] Pre-commit hooks pass
- [ ] Performance tests pass (if applicable)

## 9. Common Issues and Solutions

### Test Failures
```bash
# E2E test snapshot mismatches
make update-snapshots

# Type checking failures
make frontend-typesync  # For missing TypeScript types
```

### Build Issues
```bash
# Clean and rebuild everything
make clean
make all
```

### Protobuf Issues
```bash
# Recompile after proto changes
make protobuf
```

## 10. Documentation Updates

### For Public API Changes
- Update docstrings with proper Numpydoc format
- Ensure type annotations are complete
- Add usage examples in docstrings
- Consider if documentation site needs updates

### For Internal Changes
- Update code comments for complex logic
- Ensure memory files reflect new patterns/conventions
- Update this task completion guide if new steps are needed

This workflow ensures that your changes maintain Streamlit's high code quality standards and integrate properly with the existing codebase.