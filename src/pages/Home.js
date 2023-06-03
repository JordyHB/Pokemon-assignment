import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Home.css'
import PokemonTile from "../components/pokemonTIle/PokemonTile";
import FlipThroughButton from "../components/flipthroughbutton/FlipThroughButton";
import LimitSelector from "../components/limitselector/LimitSelector";


function Home(props) {

    const ENDPOINT = 'https://pokeapi.co/api/v2/'
    const [error, toggleError] = useState(false)
    const [isLoading, toggleIsLoading] = useState(false)
    // states to store the offset and limit for the request
    const [pokemonLimit, setPokemonLimit] = useState(20)
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
            setPokemonGroupData(
                (await axios.get(
                    `${ENDPOINT}pokemon?offset=${pokemonOffset}&limit=${pokemonLimit}`
                )).data
            )

        } catch (e) {
            toggleError(true)
            console.error(e)
        }
        toggleIsLoading(false)
    }

    // function to decrease or increase the offset depending on the button pressed
    function handleClick(variant) {
        if (variant === 'next') {
            setPokemonOffset(pokemonOffset + pokemonLimit)
        }
        if (variant === 'previous') {
            setPokemonOffset(pokemonOffset - pokemonLimit)
        }
    }


    // on page mount fills the state with the info from the first request
    useEffect(() => {
        void fetchAllPokemon()
    }, [pokemonOffset, pokemonLimit])



    return (
        <>
            <FlipThroughButton
                variant='previous'
                handleClick={handleClick}
                currentOffset={pokemonOffset}
            />
            {/*keeps track where the user is in the data set*/}
            <p> {pokemonOffset}-{pokemonLimit + pokemonOffset} out of {pokemonGroupData.count}</p>
            <FlipThroughButton
                variant='next'
                handleClick={handleClick}
                currentOffset={pokemonOffset}
            />
            {/*displays a limit selector to change the amount of pokemon displayed on the page*/}
            <LimitSelector
                setLimit={setPokemonLimit}
                limit={pokemonLimit}
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