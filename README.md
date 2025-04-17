# Color Scorer - WCAG Contrast Ratio Checker

Color Scorer is a web application built with React and TypeScript that helps designers and developers check contrast ratios between colors according to WCAG (Web Content Accessibility Guidelines) standards.

## Features

- Compare two colors for accessibility compliance
- View contrast ratio scores
- Easy color selection with color pickers
- Real-time contrast analysis

## Getting Started

To run this application locally:

- clone this repo

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser to see the application running.

## Building For Production

To build the application for production:

```bash
pnpm build
```

The build artifacts will be stored in the `dist/` directory.

## Technology Stack

- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [TanStack Router](https://tanstack.com/router) - Routing
- [TanStack Store](https://tanstack.com/store) - State management
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Shadcn UI](https://ui.shadcn.com/) - UI components

## Architecture

The application uses a modern React architecture with the following key components:

- **State Management**: TanStack Store for efficient state updates
- **Color Manipulation**: Utilities for converting between color formats
- **UI Components**: Leveraging Shadcn for accessible UI components

## Accessibility

This tool is designed with accessibility in mind, helping you create designs that meet WCAG 2.1 contrast requirements:

- AA Standard: Minimum contrast ratio of 4.5:1 for normal text, 3:1 for large text
- AAA Standard: Enhanced contrast ratio of 7:1 for normal text, 4.5:1 for large text

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
