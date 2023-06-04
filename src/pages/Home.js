import React, {useEffect, useState} from 'react';
import axios from "axios";
import './Home.css'
import PokemonTile from "../components/pokemonTIle/PokemonTile";
import FlipThroughButton from "../components/flipthroughbutton/FlipThroughButton";
import LimitSelector from "../components/limitselector/LimitSelector";
import pokemonLogo from '../assets/pokemonlogo.png'


function Home(props) {

    const ENDPOINT = 'https://pokeapi.co/api/v2/'
    const [error, toggleError] = useState(false)
    const [isLoading, toggleIsLoading] = useState(false)
    // states to store the offset and limit for the request
    const [pokemonLimit, setPokemonLimit] = useState(20)
    const [pokemonOffset, setPokemonOffset] = useState(0)
    const [reachedEnd, setReachedEnd] = useState('')
    const [upperLimitShown, setUpperLimitShown] = useState(0)
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
            // checks whether the next step will take the user over the end of the list
            pokemonOffset - pokemonLimit < 0 ? setPokemonOffset(0) :
                setPokemonOffset(pokemonOffset - pokemonLimit)

        }
    }

    function CheckLimit() {
        // checks whether the next step will take the user over the end of the list
        if (pokemonOffset + pokemonLimit >= pokemonGroupData.count) {
            setReachedEnd('end')
        }
        // set its back to empty if neither is the case
        else {
            setReachedEnd('')
        }
    }

    function UpdateUpperLimit() {
        // checks whether the next step will take the user over the end of the list
        if (pokemonOffset + pokemonLimit >= pokemonGroupData.count) {
            setUpperLimitShown(pokemonGroupData.count)
        }
        // follows usual logic if not the case
        else {
            setUpperLimitShown(pokemonOffset + pokemonLimit)
        }
    }

    // on page mount fills the state with the info from the first request
    useEffect(() => {
        // checks whether the next step will take the user over the end of the list
        CheckLimit()
        // fetches the data from the api
        void fetchAllPokemon()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        // updates the upper limit shown
        UpdateUpperLimit()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokemonOffset, pokemonLimit])


    return (
        <>
            <header>
                <div className="logo-wrapper">
                    <img className="pokemon-logo" src={pokemonLogo} alt="pokemon logo"/>
                </div>
                <nav>
                    <div className="Nav-button-container">
                        <FlipThroughButton
                            variant='previous'
                            handleClick={handleClick}
                            reachedEnd={reachedEnd}
                            pokemonOffset={pokemonOffset}
                        />
                        {/*keeps track where the user is in the data set*/}
                        <span className="shown-counter">{pokemonOffset + 1} - {upperLimitShown} of {pokemonGroupData.count}</span>
                        <FlipThroughButton
                            variant='next'
                            handleClick={handleClick}
                            reachedEnd={reachedEnd}
                            pokemonOffset={pokemonOffset}
                        />
                        </div>
                    {/*displays a limit selector to change the amount of pokemon displayed on the page*/}
                    <LimitSelector
                        setLimit={setPokemonLimit}
                        limit={pokemonLimit}
                    />
                </nav>
            </header>
            {/*maps over all pokemon feeding the endpoint for their details to the component*/}
            <section className="pokemon-tile-container">
                {pokemonGroupData.results && pokemonGroupData.results.map((pokemon) =>
                    <PokemonTile
                        // cant use name because names are not unique in the list
                        key={pokemon.url}
                        requestEndpoint={pokemon.url}
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