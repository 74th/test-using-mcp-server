# macOS Development Environment Guide

## System Information

### Platform Details
- **OS**: Darwin (macOS) on ARM64 (Apple Silicon)
- **Architecture**: arm64 (M-series chips)
- **Kernel**: Darwin Kernel Version 24.6.0
- **Shell**: bash (default)

## System Commands

### File Operations
```bash
# List files and directories
ls -la                    # Detailed list with permissions
ls -lah                   # With human-readable sizes
find . -name "*.py"       # Find Python files recursively
find . -type f -name "pattern" # Find files by pattern

# File manipulation
cp source dest            # Copy files
mv source dest            # Move/rename files
rm file                   # Remove files
rm -rf directory          # Remove directory recursively
chmod +x script.sh        # Make script executable

# File content operations
cat file.txt              # Display file content
head -n 20 file.txt       # First 20 lines
tail -n 20 file.txt       # Last 20 lines
tail -f logfile.log       # Follow log file updates
grep -r "pattern" .       # Search pattern in files
grep -i "pattern" file    # Case-insensitive search
```

### Process Management
```bash
# Process information
ps aux                    # List all processes
ps aux | grep python      # Find Python processes
top                       # Interactive process viewer
htop                      # Enhanced process viewer (if installed)

# Process control
kill -9 <pid>            # Force kill process
killall python          # Kill all Python processes
lsof -i :8501            # Check what's using port 8501
lsof -p <pid>            # List files opened by process
```

### Network and Ports
```bash
# Port management
lsof -i :<port>          # Check port usage
netstat -an | grep <port> # Alternative port check
sudo lsof -i -P | grep LISTEN # List all listening ports

# Network connectivity
ping google.com          # Test connectivity
curl -I https://site.com # HTTP headers
wget https://file.url    # Download file (if installed)
```

### System Information
```bash
# System details
uname -a                 # System information
sw_vers                  # macOS version details
arch                     # Architecture (arm64/x86_64)
sysctl -n machdep.cpu.brand_string # CPU information

# Disk usage
df -h                    # Disk space usage
du -sh directory         # Directory size
du -h --max-depth=1 .    # Size of subdirectories
```

### Environment Variables
```bash
# View environment
env                      # All environment variables
echo $PATH               # Path variable
echo $HOME               # Home directory
echo $USER               # Current user

# Set variables
export VAR_NAME=value    # Set for current session
echo 'export VAR=value' >> ~/.bashrc # Persistent
```

## macOS-Specific Considerations

### Package Managers
```bash
# Homebrew (recommended)
brew install package     # Install package
brew update             # Update package list
brew upgrade            # Upgrade all packages
brew list               # List installed packages
brew services list      # List services

# MacPorts (alternative)
sudo port install package
sudo port upgrade outdated
```

### Development Tools
```bash
# Xcode Command Line Tools
xcode-select --install   # Install development tools
xcode-select -p          # Check installation path

# Python management
python3 --version        # Python version
which python3           # Python location
pip3 list               # Installed packages

# Node.js management (if using nvm)
nvm list                # List Node versions
nvm use 22.4.1          # Switch Node version
nvm install --lts       # Install latest LTS
```

### File System Differences
- **Case Sensitivity**: macOS is case-insensitive by default
- **Hidden Files**: Files starting with `.` are hidden
- **Permissions**: More restrictive than Linux
- **Quarantine**: Downloaded files may be quarantined

### Common Development Paths
```bash
# User directories
~/                      # Home directory (/Users/username)
~/Documents             # Documents folder
~/Downloads             # Downloads folder
~/Desktop               # Desktop folder

# Development directories
~/ghq/github.com/       # Git repository organization
~/Projects/             # Common project location
~/Code/                 # Alternative project location

# System directories
/usr/local/             # Homebrew installs (Intel)
/opt/homebrew/          # Homebrew installs (Apple Silicon)
/Applications/          # Applications
/Library/               # System libraries
```

## Streamlit-Specific macOS Setup

### Environment Setup
```bash
# Check required tools
python3 --version       # Should be 3.9+
node --version          # Should be 22.4.1+
git --version           # Git for version control

# Install missing tools via Homebrew
brew install python@3.12 node yarn git
```

### Performance Considerations
```bash
# Monitor resource usage during builds
top -o cpu              # Sort by CPU usage
top -o mem              # Sort by memory usage
activity_monitor        # GUI activity monitor

# Memory pressure
vm_stat                 # Virtual memory statistics
memory_pressure         # System memory pressure
```

### File Watching (for hot reload)
```bash
# Check file descriptor limits
ulimit -n               # Current limit
ulimit -n 65536         # Increase limit

# File system events
fs_usage -w -f pathname # Watch file system activity
```

### Terminal Productivity
```bash
# History and shortcuts
history                 # Command history
!!                      # Repeat last command
!pattern                # Repeat last command matching pattern
Ctrl+R                  # Reverse search history
Ctrl+C                  # Interrupt current command
Ctrl+D                  # Exit shell

# Tab completion
Tab                     # Complete command/path
Tab Tab                 # Show all completions
```

### Security and Permissions
```bash
# Handle permission issues
sudo chown -R $USER:staff directory  # Take ownership
chmod -R 755 directory               # Set permissions

# Gatekeeper (for downloaded tools)
xattr -d com.apple.quarantine file   # Remove quarantine
spctl --assess --type execute file   # Check code signing
```

This guide helps navigate macOS-specific aspects of Streamlit development, ensuring smooth development workflow on Apple Silicon Macs.