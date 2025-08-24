# Streamlit Code Style and Conventions

## Python Code Style

### General Principles
- **PEP 8 Compliance**: Strict adherence to PEP 8 guidelines
- **Elegance and Readability**: Prioritize Pythonic, maintainable code
- **Zen of Python**: Follow Python's design principles
- **Avoid inheritance**: Prefer composition over inheritance
- **Avoid methods**: Prefer non-class functions or static methods
- **Self-documenting code**: Name functions/variables to eliminate need for comments

### Naming Conventions
- **Files and Folders**: snake_case for all Python files and directories
- **Private Members**: Prefix with underscore (_) for module-level private items
- **Functions**: snake_case with descriptive names
- **Classes**: PascalCase
- **Constants**: UPPER_SNAKE_CASE

### Import Style
- **Prefer module imports**: `from streamlit import mymodule` over `from streamlit.mymodule import internal_function`
- **Sort imports**: Use Ruff's isort functionality

### Function Design
- **Keyword arguments**: Prefer keyword-only for enhancing arguments
- **Positional arguments**: Only for required values that frame the API
- **Return types**: Explicit return type annotations required

### Documentation
- **Docstring Style**: Numpydoc format
- **Target Audience**: Write for users, not internal developers
- **Module Docstrings**: Required for user-facing modules
- **Comments**: Capitalize, use proper grammar, no profanity

### Type Annotations
- **Requirement**: Type annotations for all new functions, methods, classes
- **Future Annotations**: Use `from __future__ import annotations`
- **Typing Extensions**: Use `typing_extensions` for backporting newer features
- **Type Checking**: mypy in strict mode + ty type checker

### Logging
```python
from streamlit.logger import get_logger

_LOGGER: Final = get_logger(__name__)
```

## TypeScript/Frontend Code Style

### General Principles
- **Functional Programming**: Prefer functional, declarative approach
- **Iteration and Modularization**: Avoid duplication through reusable components
- **Descriptive Names**: Use auxiliary verbs (e.g., isLoading, hasError)
- **RORO Pattern**: Receive an Object, Return an Object
- **Explicit Return Types**: All functions must have explicit return types

### React Best Practices
- **React 18**: Leverage all React 18 best practices
- **Performance**: Write performant code with referential stability
- **React Hooks**: Use for state management and side effects
- **Event Handlers**: Prefix with "handle" (handleClick, handleSubmit)

### Styling Conventions
- **Emotion/Styled**: Prefer @emotion/styled over inline styles
- **Object Notation**: Use object style notation in Emotion
- **Styled Components**: Begin names with "Styled" prefix
- **Props-based Styling**: Use props for conditional styling
- **BaseWeb Integration**: Import theme via `useEmotionTheme`

### CSS Class Naming
- **Pattern**: `stComponentSubcomponent` (e.g., `stTextInputIcon`)
- **Test IDs**: Follow same naming convention
- **Consistency**: Use across components and tests

### Component Structure
- **File Organization**: Logical grouping by feature/widget
- **Import Order**: External libraries, internal utilities, components
- **Export Pattern**: Named exports preferred

## Testing Conventions

### Python Unit Tests
- **Framework**: pytest (not unittest)
- **File Naming**: `my_example_test.py`
- **Docstrings**: Brief numpydoc-style comments for test functions
- **Type Annotations**: All new tests must be fully typed
- **Skipping Tests**: Use `pytest.mark.skipif` for CI secrets

### Frontend Tests
- **Framework**: Vitest (not Jest)
- **UI Testing**: React Testing Library (RTL)
- **Query Priority**: getByRole > getByLabelText > getByText > getByTestId
- **User Events**: Use `userEvent` library
- **Assertions**: Test user behavior, not implementation details

### E2E Tests
- **File Structure**: `*.py` (app) + `*_test.py` (test)
- **Element Naming**: Prefix with `st_<element_name>`
- **Assertions**: Use `expect`, not `assert`
- **Element Location**: Prefer `get_by_test_id`
- **Timing**: Use `wait_until`, never `wait_for_timeout`

## Code Quality Tools Configuration

### Ruff Configuration
- **Version**: 0.12.9 (pinned)
- **Functions**: Linting + formatting (replaces Black + isort)
- **Import Sorting**: Integrated with format command

### Mypy Configuration
- **Strict Mode**: Enabled in mypy.ini
- **Python Version**: 3.9 target
- **Files**: lib/streamlit/, lib/tests/streamlit/typing/, scripts/, e2e_playwright/

### Pre-commit Hooks
- **License Headers**: Automatic insertion/update
- **Format Checking**: Ruff + Prettier
- **Lint Checking**: Ruff + ESLint
- **Type Checking**: mypy + TypeScript compiler