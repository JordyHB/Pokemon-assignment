import React, { useState, useEffect, useRef} from 'react';
import axios from "axios";
import './Home.css'
import PokemonTile from "../components/pokemonTIle/PokemonTile";
import FlipThroughButton from "../components/flipthroughbutton/FlipThroughButton";


function Home(props) {

    const ENDPOINT = 'https://pokeapi.co/api/v2/'
    const [error, toggleError] = useState(false)
    const [isLoading, toggleIsLoading] = useState(false)
    const [pokemonOffset, setPokemonOffset] = useState(0)
    // empty state to store the data from the request
    const [pokemonGroupData, setPokemonGroupData] = useState({})


    // requests a set of pokemon to be displayed on the page
    async function fetchAllPokemon() {
        toggleIsLoading(true)
        try {
            // resets error back to initial state
            toggleError(false)
            // gets the data from the request and stores it in the state
            setPokemonGroupData((await axios.get(`${ENDPOINT}pokemon?offset=${pokemonOffset}`)).data)

        } catch (e) {
            toggleError(true)
            console.error(e)
        }
        toggleIsLoading(false)
    }

    // function to decrease or increase the offset depending on the button pressed
    function handleClick(variant) {
        if (variant === 'next') {
            setPokemonOffset(pokemonOffset + 20)
        }
        if (variant === 'previous') {
            setPokemonOffset(pokemonOffset - 20)
        }
    }


    // on page mount fills the state with the info from the first request
    useEffect(() => {
        void fetchAllPokemon()
    }, [pokemonOffset])



    return (
        <>
            <FlipThroughButton
                variant='previous'
                handleClick={handleClick}
                currentOffset={pokemonOffset}
            />
            <FlipThroughButton
                variant='next'
                handleClick={handleClick}
                currentOffset={pokemonOffset}
            />
            <h1>Welcome on the Home page</h1>
            {/*maps over all pokemon feeding the endpoint for their details to the component*/}
            <section className="pokemon-tile-container">
                { pokemonGroupData.results && pokemonGroupData.results.map((pokemon) =>
                    <PokemonTile
                        key={pokemon.name}
                        REQUESTENDPOINT={pokemon.url}
                    />
                )}
            </section>
            {/*displays a loading message if the request is still being processed*/}
            {isLoading && <p>Loading...</p>}
            {/*displays an error message if the request fails*/}
            {error && <p>Something went wrong</p>}
        </>
    );
}

export default Home;