# Streamlit Technology Stack

## Backend Technologies

### Python Environment
- **Python Version**: 3.9 - 3.13 (current development uses 3.12)
- **Packaging**: setuptools with setup.py
- **Dependency Management**: pip with requirements.txt files

### Core Python Dependencies
- **altair**: Data visualization (>=4.0, <6, excluding 5.4.0, 5.4.1)
- **blinker**: Signal/slot system (>=1.5.0, <2)
- **cachetools**: Caching utilities (>=4.0, <7)
- **click**: Command-line interface (>=7.0, <9)
- **numpy**: Numerical computing (>=1.23, <3)
- **pandas**: Data manipulation (>=1.4.0, <3)
- **pillow**: Image processing (>=7.1.0, <12)
- **protobuf**: Serialization (>=3.20, <7)
- **pyarrow**: Apache Arrow bindings

### Web Framework
- **Tornado**: Asynchronous web server and framework
- **WebSocket**: Real-time communication with frontend

## Frontend Technologies

### Core Frontend Stack
- **TypeScript**: v5 (strict type checking)
- **React**: v18 (functional components, hooks)
- **Build Tool**: Vite v6
- **Package Manager**: Yarn v4 with workspaces

### Frontend Dependencies
- **@emotion/styled**: v11 (CSS-in-JS styling)
- **Styling Philosophy**: Emotion over inline styles
- **Component Prefix**: All styled components begin with "Styled"

### Frontend Workspace Structure
```json
{
  "workspaces": [
    "app",           // Main Streamlit application
    "connection",    // WebSocket connection handling
    "lib",           // Shared library (elements, widgets)
    "protobuf",      // Generated protobuf code
    "typescript-config", // Shared TypeScript configuration
    "utils"          // Shared utilities
  ]
}
```

## Development Tools

### Code Quality (Python)
- **Linter**: Ruff 0.12.9
- **Formatter**: Ruff (replaces Black + isort)
- **Type Checker**: mypy 1.16.1+ (strict mode) + ty 0.0.1a16
- **Testing**: pytest 8.x
- **Pre-commit**: Automated code quality hooks

### Code Quality (Frontend)
- **Linter**: ESLint v9
- **Formatter**: Prettier v3
- **Type Checker**: TypeScript compiler
- **Testing**: Vitest + React Testing Library

### Communication Protocol
- **Protobuf**: Version >=3.20 for type-safe client-server communication
- **Minimum protoc**: 3.20 required for code generation

## Testing Stack

### Python Testing
- **Unit Tests**: pytest in `lib/tests/`
- **Performance Tests**: pytest with benchmarking
- **Integration Tests**: Requires separate integration-requirements.txt
- **Type Tests**: mypy + assert_type in `lib/tests/streamlit/typing/`

### Frontend Testing
- **Unit Tests**: Vitest
- **UI Testing**: React Testing Library (RTL)
- **Coverage**: Integrated with Vitest

### End-to-End Testing
- **Framework**: Playwright with pytest
- **Visual Testing**: Screenshot comparisons
- **Browser Support**: Cross-browser testing
- **Location**: `e2e_playwright/` directory

## Build System

### Python Build
- **Development**: Editable installation with `pip install -e ./lib`
- **Production**: Wheel generation via setuptools
- **Dependencies**: dev-requirements.txt, test-requirements.txt

### Frontend Build
- **Development**: `yarn start` (Vite dev server)
- **Production**: `yarn workspaces foreach run build`
- **Output**: Static assets copied to `lib/streamlit/static/`

### Protobuf Compilation
- **Python**: Generated files in `lib/streamlit/proto/`
- **TypeScript**: Generated in `frontend/protobuf/src/`
- **Command**: `make protobuf` compiles for both