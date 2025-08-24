# Streamlit Development Commands

## Essential Setup Commands

### Initial Setup
```bash
# Install all dependencies, build frontend, and install editable Streamlit
make all

# Install dependencies without building frontend (faster for Python-only work)
make all-dev

# Clean all generated files
make clean

# Install pre-commit hooks
pre-commit install
```

### Protobuf Management
```bash
# Recompile Protobufs for Python and frontend (required after proto changes)
make protobuf
```

## Python Development Commands

### Package Management
```bash
# Install Python dependencies and Streamlit in editable mode
make python-init

# Manual installation (if needed)
pip install -e ./lib
pip install -r lib/dev-requirements.txt
pip install -r lib/test-requirements.txt
```

### Code Quality (Python)
```bash
# Lint and check formatting
make python-lint

# Auto-format Python code
make python-format

# Run type checker (mypy + ty)
make python-types

# Auto-fix all Python issues
ruff check --fix
ruff format
```

### Testing (Python)
```bash
# Run all Python unit tests
make python-tests

# Run specific test file
PYTHONPATH=lib pytest lib/tests/streamlit/my_example_test.py

# Run specific test within a file
PYTHONPATH=lib pytest lib/tests/streamlit/my_example_test.py -k test_that_something_works

# Run performance tests
make python-performance-tests

# Run integration tests (requires integration-requirements.txt)
make python-integration-tests
```

## Frontend Development Commands

### Package Management
```bash
# Install all frontend dependencies
make frontend-init

# Manual yarn installation (from frontend/ directory)
cd frontend && corepack enable yarn && yarn install --immutable
```

### Building
```bash
# Build frontend (full build)
make frontend

# Build frontend (fast - for development)
make frontend-fast

# Build frontend with profiler enabled
make frontend-with-profiler

# Start development server
make frontend-dev
```

### Code Quality (Frontend)
```bash
# Lint and check formatting
make frontend-lint

# Format frontend files
make frontend-format

# Run type checker
make frontend-types

# Check for unsynced types
make frontend-typesync

# Update missing TypeScript typings
make update-frontend-typesync
```

### Testing (Frontend)
```bash
# Run all frontend tests with coverage
make frontend-tests

# Run specific test file (from frontend/ directory)
cd frontend && yarn test lib/src/components/path/component.test.tsx

# Run specific test by name
cd frontend && yarn test -t "the test name" lib/src/components/path/component.test.tsx

# Watch mode for development
cd frontend && yarn testWatch
```

## End-to-End Testing Commands

### E2E Test Execution
```bash
# Run a specific e2e test
make run-e2e-test st_command_test.py

# Debug an e2e test (with browser)
make debug-e2e-test st_command_test.py

# Update snapshots from latest CI run
make update-snapshots

# Update snapshots only for changed files
make update-snapshots-changed
```

### Performance Testing
```bash
# Run Lighthouse performance tests
make lighthouse-tests

# Run bare execution tests
make bare-execution-tests

# Run CLI smoke tests
make cli-smoke-tests
```

## Maintenance Commands

### Auto-fix Everything
```bash
# Fix all linting and formatting issues
make autofix
```

### Updates and Maintenance
```bash
# Update license headers
make update-headers

# Update notices file (frontend licenses)
make update-notices

# Update minimum dependency constraints
make update-min-deps

# Update material icons
make update-material-icons
```

### Build and Package
```bash
# Create Python wheel files
make package

# Create conda distribution
make conda-package
```

## Running Streamlit

### Development Mode
```bash
# Run Streamlit from source
streamlit run your_app.py

# Run hello app for testing
streamlit hello
```

## System-Specific Commands (macOS)

### Common Unix Commands
```bash
# File operations
ls -la              # List files with details
find . -name "*.py" # Find Python files
grep -r "pattern"   # Search in files
cd path/to/dir      # Change directory

# Git operations
git status          # Check git status
git add .           # Stage all changes
git commit -m "msg" # Commit changes
git push            # Push to remote

# Process management
ps aux | grep python    # Find Python processes
kill -9 <pid>          # Kill process by PID
lsof -i :8501          # Check what's using port 8501
```

### Development Workflow
```bash
# Typical development workflow
make all-dev                    # Initial setup
# ... make changes ...
make autofix                    # Fix formatting/linting
make python-tests               # Run tests
make run-e2e-test test_file.py  # Run e2e tests if needed
```

## Troubleshooting Commands

### Debug Issues
```bash
# Check Python version and paths
python --version
which python
pip list | grep streamlit

# Check Node.js and Yarn
node --version
yarn --version

# Rebuild everything from scratch
make clean
make all
```

### Common Problems
```bash
# Frontend build issues
make frontend-init
make frontend-fast

# Protobuf issues
make protobuf

# Test failures
make update-snapshots  # For e2e test snapshot mismatches
```