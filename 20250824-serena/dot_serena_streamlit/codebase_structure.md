# Streamlit Codebase Structure

## Directory Overview

```
streamlit/
├── lib/                          # Python backend
│   ├── streamlit/               # Main Streamlit package
│   │   ├── elements/           # UI elements implementation
│   │   ├── proto/              # Generated protobuf files
│   │   ├── static/             # Frontend build output
│   │   ├── logger.py           # Logging utilities
│   │   └── __init__.py         # Public API exports
│   ├── tests/                  # Python unit tests
│   │   ├── streamlit/         # Mirror structure of lib/streamlit/
│   │   └── typing/            # Type checking tests
│   ├── setup.py               # Package configuration
│   ├── dev-requirements.txt   # Development dependencies
│   └── test-requirements.txt  # Testing dependencies
├── frontend/                    # TypeScript/React frontend
│   ├── app/                    # Main Streamlit application
│   ├── lib/                    # Shared components library
│   │   ├── src/components/     # React components
│   │   │   ├── elements/      # UI elements (widgets, display)
│   │   │   ├── core/          # Core components
│   │   │   └── shared/        # Shared utilities
│   ├── connection/             # WebSocket connection handling
│   ├── protobuf/              # Protobuf TypeScript generation
│   ├── utils/                 # Shared utilities
│   └── package.json           # Yarn workspace configuration
├── proto/                       # Protobuf definitions
│   └── streamlit/proto/        # Protocol definitions
├── e2e_playwright/             # End-to-end tests
│   ├── conftest.py            # Pytest fixtures
│   ├── st_*.py                # Test applications
│   └── st_*_test.py           # Test implementations
├── scripts/                    # Development and CI scripts
├── component-lib/              # Custom component development
└── Makefile                    # Build and development commands
```

## Backend Architecture (`lib/streamlit/`)

### Core Modules
- **`__init__.py`**: Public API - all user-facing functions
- **`logger.py`**: Centralized logging with `get_logger(__name__)`
- **`elements/`**: Implementation of all Streamlit elements
  - Each element has its own module (e.g., `text.py`, `widgets.py`)
  - Backend logic for state management and data processing

### Element Implementation Pattern
```python
# lib/streamlit/elements/text.py
def write(body, **kwargs):
    """Display text or objects."""
    # Implementation
    # Communicates with frontend via protobuf messages
```

### State and Session Management
- Session state handling
- Caching mechanisms (`@st.cache_data`, `@st.cache_resource`)
- Widget state persistence

## Frontend Architecture (`frontend/`)

### Workspace Structure
- **Monorepo**: Managed with Yarn workspaces
- **Build Tool**: Vite for fast development and optimized builds
- **Package Management**: Yarn v4 with Zero-Installs

### Key Workspaces
1. **`app/`**: Main Streamlit application
   - Entry point for the web interface
   - Handles routing and main layout
   - Builds to static assets in `lib/streamlit/static/`

2. **`lib/`**: Shared component library
   - Reusable React components
   - Element implementations (widgets, charts, text)
   - Styled components with Emotion

3. **`connection/`**: WebSocket communication
   - Real-time communication with backend
   - Message handling and state synchronization

### Component Organization
```
frontend/lib/src/components/
├── elements/                 # Streamlit elements
│   ├── Text/                # Text display components
│   ├── DataFrame/           # Data display components
│   ├── Chart/               # Chart components
│   └── Widgets/             # Interactive widgets
├── core/                    # Core functionality
│   ├── Block/               # Layout and rendering
│   └── StreamlitApp/        # Main app component
└── shared/                  # Shared utilities
    ├── BaseProvider/        # Context providers
    └── AppUtils/            # Application utilities
```

## Communication Layer (`proto/`)

### Protobuf Messages
- **Element.proto**: Defines all UI element types
- **ForwardMsg.proto**: Backend-to-frontend messages
- **BackendMsg.proto**: Frontend-to-backend messages

### Message Flow
1. User interacts with frontend
2. Frontend sends BackendMsg via WebSocket
3. Backend processes and sends ForwardMsg
4. Frontend updates UI based on received messages

## Testing Architecture

### Unit Tests (`lib/tests/`)
- **Mirror Structure**: Tests mirror `lib/streamlit/` structure
- **Mocking**: `element_mocks.py` provides test doubles
- **Type Tests**: `typing/` directory for type checking verification

### Frontend Tests
- **Unit Tests**: Vitest with React Testing Library
- **Location**: Co-located with components (`*.test.tsx`)
- **Coverage**: Integrated reporting

### E2E Tests (`e2e_playwright/`)
- **App Files**: `st_*.py` - Streamlit apps for testing
- **Test Files**: `st_*_test.py` - Playwright test implementations
- **Fixtures**: `conftest.py` provides common utilities
- **Snapshots**: Visual regression testing

## Build and Deployment

### Development Build Flow
1. **Protobuf**: `make protobuf` generates code for both sides
2. **Backend**: Editable install with `pip install -e ./lib`
3. **Frontend**: `make frontend-dev` starts development server
4. **Static Assets**: Built frontend copied to `lib/streamlit/static/`

### Production Build Flow
1. **Dependencies**: `make init` installs everything
2. **Frontend**: `make frontend` builds optimized assets
3. **Package**: `make package` creates wheels
4. **Distribution**: Published to PyPI

## Development Patterns

### Adding New Elements
1. **Protobuf**: Define message in `proto/streamlit/proto/Element.proto`
2. **Backend**: Implement in `lib/streamlit/elements/`
3. **Frontend**: Create React component in `frontend/lib/src/components/elements/`
4. **Registration**: Add to `ElementNodeRenderer.tsx`
5. **Export**: Add to `lib/streamlit/__init__.py`
6. **Tests**: Unit tests + E2E tests

### File Naming Conventions
- **Python**: `snake_case.py`
- **TypeScript**: `PascalCase.tsx` for components
- **Tests**: `component_name_test.py` or `Component.test.tsx`
- **E2E**: `st_element_name.py` + `st_element_name_test.py`

### Import Patterns
- **Python**: Module imports preferred (`import streamlit.elements`)
- **TypeScript**: Named imports from workspaces
- **Cross-workspace**: Use workspace names (`@streamlit/lib`)

This structure supports Streamlit's real-time, interactive nature while maintaining clear separation between concerns and enabling efficient development workflows.