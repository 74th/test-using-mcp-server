# Streamlit Project Overview

## Project Purpose
Streamlit is an open-source Python framework that transforms Python scripts into interactive web applications in minutes. It's designed for data scientists and developers to quickly build and share dashboards, reports, and data apps without needing extensive web development knowledge.

## Key Features
- **Simple and Pythonic**: Write beautiful, easy-to-read code
- **Fast, interactive prototyping**: Enable quick feedback cycles
- **Live editing**: Apps update instantly as scripts are modified
- **Open-source and free**: MIT licensed with vibrant community

## Project Structure
The Streamlit repository is organized as follows:

### Backend (Python)
- `lib/`: Main Python package and tests
  - `lib/streamlit/`: Core Streamlit library package
  - `lib/streamlit/elements/`: Backend implementation of elements and widgets
  - `lib/tests/`: Python unit tests
  - `lib/setup.py`: Package setup and dependencies

### Frontend (TypeScript/React)
- `frontend/`: All frontend code and assets
  - `frontend/app/`: Main Streamlit application UI
  - `frontend/lib/`: Shared TypeScript library (elements, widgets, layouts)
  - `frontend/connection/`: WebSocket connection handling
  - `frontend/utils/`: Shared utilities
  - Uses Yarn workspaces for monorepo management

### Communication
- `proto/`: Protobuf definitions for client-server communication
- Ensures type-safe communication between backend and frontend

### Testing
- `e2e_playwright/`: End-to-end tests using Playwright
- Tests the complete system from user perspective
- Includes visual snapshot testing

### Development Tools
- `scripts/`: Utility scripts for development and CI/CD
- `component-lib/`: Library for building custom Streamlit components

## Architecture
- **Backend**: Python-based server using Tornado
- **Frontend**: React 18 application with TypeScript
- **Communication**: WebSocket + Protobuf for real-time updates
- **Build System**: Vite for frontend, setuptools for Python
- **Styling**: Emotion/styled components

## Version Information
- Current version: 1.48.1
- Supports Python 3.9 - 3.13
- Uses semantic versioning (PEP-440)