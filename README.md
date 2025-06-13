# Next.js Country Explorer

A modern Next.js application that allows users to explore countries from around the world with infinite scrolling functionality.

## Features

- **Country Browsing**: View countries with their flags, names, capitals, and population data
- **Infinite Scrolling**: Dynamically load more countries as you scroll down the page
- **Search Functionality**: Filter countries by name
- **Sorting Options**: Sort countries by population (ascending or descending)
- **Responsive Design**: Optimized for both mobile and desktop experiences
- **Modern UI**: Clean, accessible interface with dark/light mode support

## Technical Implementation

### Infinite Scrolling

The application implements infinite scrolling using TanStack Query's `useInfiniteQuery` hook. This approach provides several advantages:

- **Optimized Data Loading**: Countries are loaded in batches to improve performance
- **Seamless UX**: Users can continuously scroll without having to click "load more" buttons
- **Loading States**: Visual feedback is provided during data fetching
- **Intersection Observer API**: Efficiently detects when the user reaches the end of the list

#### Key Code Components

- `hooks/use-country.tsx`: Custom hook that implements `useInfiniteQuery` to fetch paginated country data
- `components/country/country-lists.tsx`: Component that renders the country grid and handles infinite scroll detection

```jsx
// Infinite scroll implementation using Intersection Observer
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    { threshold: 0.1 }
  );

  // ... observer setup and cleanup
}, [hasNextPage, fetchNextPage, isFetchingNextPage]);
```

### API Integration

The application fetches data from the [REST Countries API](https://restcountries.com), providing:

- Detailed country information
- Country flags and data
- Filtering capabilities

### UI Components

The user interface is built with modern React practices:

- **Responsive Grid**: Adapts to different screen sizes (2 columns on mobile, 4 on desktop)
- **Loading Indicators**: Skeleton loaders for initial load and animated dots for infinite scroll
- **Search & Sort Controls**: Easily filter and sort countries
- **Component-Based Architecture**: Modular design for maintainability

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Built With

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [React 19](https://react.dev/) - UI library
- [TanStack Query v5](https://tanstack.com/query) - Data fetching and caching
- [NuQS](https://github.com/47ng/nuqs) - Query string state management
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Accessible UI components
- [REST Countries API](https://restcountries.com) - Country data
