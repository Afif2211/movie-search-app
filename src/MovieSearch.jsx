// MovieSearch.jsx
import { useEffect, useRef, useState } from "react"
import SpotlightReel from "./SpotlightReel"
import "./MovieSearch.css"

const MovieSearch = () => {
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const timerRef = useRef(null)
    const [movieList, setMovieList] = useState([])
    const [hasSearched, setHasSearched] = useState(false)

    const controlInput = (e) => {
        setInput(e.target.value)
    }

    useEffect(() => {
        clearTimeout(timerRef.current)
        if (input === "") {
            setLoading(false)
            return
        }

        timerRef.current = setTimeout(() => {
            const getData = async () => {
                setLoading(true)
                const response = await fetch(`https://www.omdbapi.com/?apikey=f91df83f&s=${input}`)
                const result = await response.json()
                setMovieList(result.Search || [])
                setHasSearched(true)
                setLoading(false)
            }
            getData()
        }, 500)
    }, [input])

    return (
        <div className="movie-app">
            <p className="movie-brand">Built by <strong>Afif Ahmad</strong></p>

            <div className="movie-hero">
                <SpotlightReel />
                <div className="movie-hero-content">
                    <p className="movie-app-name">Marquee</p>
                    <h1>Find your next film</h1>
                    <input
                        value={input}
                        onChange={controlInput}
                        type="text"
                        placeholder="Search for a movie title..."
                        className="movie-search-input"
                    />
                </div>
            </div>

            <div className="movie-about">
                <h2>About this project</h2>
                <p>
                    This movie search app demonstrates debounced search using React's{" "}
                    <code>useRef</code> and <code>useEffect</code> hooks — instead of firing
                    an API request on every keystroke, the app waits until the user pauses
                    typing for 500 milliseconds before querying the OMDb API. This pattern
                    is the same one behind live search bars like Google's, and it prevents
                    wasted network calls while still feeling instant to the user. The
                    background scene is built with Three.js: a semi-transparent cone acts
                    as a spotlight beam, with dust particles animated frame by frame using{" "}
                    <code>requestAnimationFrame</code> to drift and loop endlessly. State
                    management (input value, loading status, and results) is handled
                    entirely with React's built-in hooks, with no external libraries.
                </p>
            </div>

            <div className="movie-results">
                {loading && <p className="movie-status">Searching...</p>}

                {!loading && input === "" && (
                    <p className="movie-status">Start typing to search the archive.</p>
                )}

                {!loading && input !== "" && hasSearched && movieList.length === 0 && (
                    <p className="movie-status">No films found for "{input}".</p>
                )}

                {!loading && movieList.length > 0 && (
                    <div className="movie-grid">
                        {movieList.map((movie, index) => (
                            <div className="movie-card" key={index}>
                                <div className="movie-poster-wrap">
                                    {movie.Poster !== "N/A" ? (
                                        <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
                                    ) : (
                                        <div className="movie-poster-fallback">No poster</div>
                                    )}
                                </div>
                                <h3 className="movie-title">{movie.Title}</h3>
                                <p className="movie-year">{movie.Year}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="movie-footer">
                <span className="movie-tech-badge">React</span>
                <span className="movie-tech-badge">useRef Debouncing</span>
                <span className="movie-tech-badge">Three.js</span>
                <span className="movie-tech-badge">OMDb API</span>
            </div>
        </div>
    )
}

export default MovieSearch