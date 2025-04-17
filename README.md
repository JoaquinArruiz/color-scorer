# Color Scorer - WCAG Contrast Ratio Checker
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Shadcn](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)


Color Scorer is a web application built with React and TypeScript that helps designers and developers check contrast ratios between colors according to WCAG (Web Content Accessibility Guidelines) standards.

## Screenshots

![App Screenshot](https://i.imgur.com/LE5rWun.png)
---
![App Gif](https://i.imgur.com/wOWBoVH.gif)


## Features

- Compare two colors for accessibility compliance
- View contrast ratio scores
- Easy color selection with color pickers
- Real-time contrast analysis

## Architecture

The application uses a modern React architecture with the following key components:

- **State Management**: TanStack Store for efficient state updates
- **Color Manipulation**: Utilities for converting between color formats
- **UI Components**: Leveraging Shadcn for accessible UI components
## Run Locally

To run this application locally:

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm run dev
```

Then open [http://localhost:5173](http://localhost:3001) in your browser to see the application running.

## Building For Production

To build the application for production:

```bash
pnpm build
```

The build artifacts will be stored in the `dist/` directory.
## Tech Stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [TanStack Router](https://tanstack.com/router) - Routing
- [TanStack Store](https://tanstack.com/store) - State management
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Shadcn UI](https://ui.shadcn.com/) - UI components

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
## Responsive Design

![Phone Screenshot](https://i.imgur.com/Imi3rIN.png)
---
![Smaller Screen](https://i.imgur.com/CTEFXIx.png)

