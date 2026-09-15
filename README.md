# Marquee — Movie Search App

A movie search application that finds films in real time using the OMDb API, with a debounced search input to avoid unnecessary network requests on every keystroke.

## Live Demo
https://movie-search-app-mauve-xi.vercel.app/

## Features
- Debounced search (500ms) using `useRef` and `useEffect`
- Live results with poster, title, and release year
- Loading, empty, and no-results states handled separately
- Animated Three.js spotlight background with drifting dust particles
- Fully responsive layout

## Built with
- React (hooks: `useState`, `useEffect`, `useRef`)
- Three.js
- OMDb API
- Plain CSS

## What I learned
This project was my hands-on introduction to debouncing — a pattern used in most real-world search interfaces (like Google's live search) to prevent firing an API call on every single keystroke. Instead, the app waits until the user pauses typing before searching, which is implemented by storing a timer ID in a `useRef` and clearing/resetting it on every input change. Because `useRef` doesn't trigger a re-render when updated (unlike `useState`), it's the right tool for storing a value like a timer ID that the component needs to remember between renders without needing to display it.

## Running locally
```bash
npm install
npm run dev
```

You'll need your own OMDb API key from [omdbapi.com](https://www.omdbapi.com/apikey.aspx) — add it in `MovieSearch.jsx` where the fetch URL is built.
