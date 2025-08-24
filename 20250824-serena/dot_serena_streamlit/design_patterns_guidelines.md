# Streamlit Design Patterns and Guidelines

## Core Design Principles

### Streamlit Philosophy
- **Simplicity First**: Make complex data apps simple to build
- **Python-Centric**: Stay true to Python idioms and patterns
- **Instant Feedback**: Changes should be visible immediately
- **Progressive Disclosure**: Simple things simple, complex things possible

### API Design Principles
- **Imperative Style**: `st.write()` over declarative configuration
- **Sensible Defaults**: Work out of the box with minimal configuration
- **Keyword Arguments**: Enhancing parameters should be keyword-only
- **Consistency**: Similar patterns across all elements

## Backend Design Patterns

### Element Implementation Pattern
```python
def element_function(
    value,                    # Required positional argument
    *,                       # Force keyword-only for optional args
    key: str | None = None,  # State key for stateful elements
    help: str | None = None, # Help tooltip
    disabled: bool = False,  # Disable interaction
    **kwargs                 # Future extensibility
) -> ReturnType:
    """Docstring in Numpydoc format.
    
    Parameters
    ----------
    value : type
        Description of the value parameter.
    key : str, optional
        Unique key for the widget.
    help : str, optional
        Tooltip help text.
    disabled : bool, default False
        Whether the widget is disabled.
        
    Returns
    -------
    ReturnType
        Description of return value.
    """
```

### State Management Pattern
```python
# Session state integration
def stateful_widget(value, *, key=None, **kwargs):
    # Generate key if not provided
    widget_key = key or f"widget_{hash(...)}"
    
    # Get current state
    current_value = st.session_state.get(widget_key, value)
    
    # Create protobuf message
    proto_msg = create_proto_message(
        value=current_value,
        id=widget_key,
        **kwargs
    )
    
    # Send to frontend
    send_proto_message(proto_msg)
    
    return current_value
```

### Error Handling Pattern
```python
def validate_and_process(value, expected_type, param_name):
    """Standard validation pattern."""
    if not isinstance(value, expected_type):
        raise StreamlitAPIException(
            f"{param_name} must be {expected_type.__name__}, "
            f"got {type(value).__name__}"
        )
```

### Logging Pattern
```python
from streamlit.logger import get_logger

_LOGGER: Final = get_logger(__name__)

def some_function():
    _LOGGER.debug("Debug information")
    _LOGGER.info("Informational message")
    _LOGGER.warning("Warning message")
    _LOGGER.error("Error message")
```

## Frontend Design Patterns

### Component Structure Pattern
```typescript
interface ComponentProps {
  element: ProtoElementType;
  disabled?: boolean;
  width?: number;
}

const StyledContainer = styled.div<{ disabled: boolean }>`
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

function StreamlitComponent({ 
  element, 
  disabled = false,
  width 
}: ComponentProps): ReactElement {
  const theme = useEmotionTheme();
  
  // Event handlers prefixed with "handle"
  const handleChange = useCallback((value: ValueType) => {
    // Send message to backend
  }, []);
  
  return (
    <StyledContainer disabled={disabled} data-testid="stComponent">
      {/* Component implementation */}
    </StyledContainer>
  );
}
```

### State Synchronization Pattern
```typescript
// Use React hooks for local state
const [localValue, setLocalValue] = useState(element.value);

// Sync with backend on change
useEffect(() => {
  if (localValue !== element.value) {
    sendBackendMessage({
      type: 'valueChange',
      value: localValue,
      widgetId: element.id
    });
  }
}, [localValue, element.value, element.id]);
```

### Styling Pattern
```typescript
// Emotion styled components
const StyledButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  ${({ theme, variant }) => ({
    padding: theme.spacing.sm,
    borderRadius: theme.radii.default,
    backgroundColor: theme.colors[variant],
    color: theme.colors.bodyText,
    
    '&:hover': {
      backgroundColor: theme.colors[`${variant}Hover`],
    },
    
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  })}
`;

// Usage with props
<StyledButton variant="primary" disabled={disabled}>
  Click me
</StyledButton>
```

## Testing Patterns

### Python Unit Test Pattern
```python
import pytest
from unittest.mock import patch, MagicMock

class TestStreamlitElement:
    """Test class for Streamlit element."""
    
    def test_element_basic_functionality(self):
        """Test basic element functionality."""
        # Arrange
        expected_value = "test value"
        
        # Act
        result = st.element_function(expected_value)
        
        # Assert
        assert result == expected_value
    
    @patch('streamlit.elements.module.send_proto_message')
    def test_element_protobuf_message(self, mock_send):
        """Test protobuf message is sent correctly."""
        # Arrange
        value = "test"
        
        # Act
        st.element_function(value)
        
        # Assert
        mock_send.assert_called_once()
        proto_msg = mock_send.call_args[0][0]
        assert proto_msg.value == value
```

### Frontend Unit Test Pattern
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';

import StreamlitComponent from './StreamlitComponent';

test('component renders with correct value', () => {
  // Arrange
  const mockElement = {
    value: 'test value',
    id: 'test-id',
  };
  
  // Act
  render(<StreamlitComponent element={mockElement} />);
  
  // Assert
  expect(screen.getByDisplayValue('test value')).toBeVisible();
});

test('component handles user interaction', async () => {
  // Arrange
  const user = userEvent.setup();
  const mockOnChange = vi.fn();
  const mockElement = { value: '', id: 'test-id' };
  
  render(<StreamlitComponent element={mockElement} onChange={mockOnChange} />);
  
  // Act
  await user.type(screen.getByRole('textbox'), 'new value');
  
  // Assert
  expect(mockOnChange).toHaveBeenCalledWith('new value');
});
```

### E2E Test Pattern
```python
# st_element.py - Test app
import streamlit as st

# Test different states of the element
st.write("## Basic Usage")
value = st.element_function("default value")
st.write(f"Current value: {value}")

st.write("## Disabled State")
st.element_function("disabled", disabled=True)

st.write("## With Help")
st.element_function("with help", help="This is help text")
```

```python
# st_element_test.py - Test implementation
import pytest
from playwright.sync_api import Page, expect

def test_element_basic_functionality(app: Page):
    """Test element basic functionality."""
    # Wait for app to load
    expect(app.get_by_test_id("stElement")).to_be_visible()
    
    # Verify initial state
    element = app.get_by_test_id("stElement")
    expect(element).to_have_value("default value")

def test_element_visual_appearance(app: Page, assert_snapshot):
    """Test element visual appearance."""
    element = app.get_by_test_id("stElement")
    
    # Ensure stable state before snapshot
    expect(element).to_be_visible()
    
    # Take snapshot
    assert_snapshot(element, name="st_element-basic_appearance")
```

## Protobuf Design Patterns

### Message Definition Pattern
```protobuf
// Element-specific message
message NewElement {
  string value = 1;
  bool disabled = 2;
  string help = 3;
  // Always use sequential field numbers
  // Never reuse or change existing numbers
  // Mark deprecated fields with [deprecated=true]
}

// Integration into main Element message
message Element {
  oneof type {
    // ... existing elements
    NewElement new_element = 50;  // Use next available number
  }
}
```

### Backward Compatibility Pattern
```protobuf
message ExistingElement {
  string value = 1;
  bool disabled = 2;
  
  // Adding new field - always optional
  string new_field = 3;
  
  // Deprecating field - never remove
  string old_field = 4 [deprecated=true];
  
  // Replacing field - add new, deprecate old
  string better_field = 5;
}
```

## Performance Patterns

### Frontend Optimization
```typescript
// Memoize expensive computations
const processedData = useMemo(() => {
  return expensiveProcessing(element.data);
}, [element.data]);

// Avoid unnecessary re-renders
const MemoizedComponent = memo(({ element, ...props }) => {
  return <ExpensiveComponent {...props} />;
}, (prevProps, nextProps) => {
  // Custom comparison logic
  return prevProps.element.value === nextProps.element.value;
});

// Debounce user input
const debouncedValue = useDebounce(inputValue, 300);
```

### Backend Optimization
```python
# Cache expensive operations
@st.cache_data
def expensive_computation(data):
    """Cache results of expensive computation."""
    return process_large_dataset(data)

# Lazy loading
def get_large_resource():
    """Lazy load large resources."""
    if not hasattr(st.session_state, 'large_resource'):
        st.session_state.large_resource = load_large_resource()
    return st.session_state.large_resource
```

## Error Handling Patterns

### Graceful Degradation
```python
def robust_element_function(value, **kwargs):
    """Element with graceful error handling."""
    try:
        validated_value = validate_input(value)
        return process_value(validated_value, **kwargs)
    except ValidationError as e:
        st.error(f"Invalid input: {e}")
        return None
    except Exception as e:
        _LOGGER.error(f"Unexpected error: {e}")
        st.error("An unexpected error occurred")
        return None
```

### User-Friendly Messages
```python
# Provide clear, actionable error messages
if not isinstance(data, pd.DataFrame):
    raise StreamlitAPIException(
        "Expected a pandas DataFrame, but received "
        f"{type(data).__name__}. Please convert your data "
        "to a DataFrame using pd.DataFrame(data)."
    )
```

These patterns ensure consistency, maintainability, and reliability across the Streamlit codebase while providing excellent user experience.