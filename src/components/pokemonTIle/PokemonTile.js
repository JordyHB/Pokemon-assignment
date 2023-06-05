import React, { useState, useEffect } from 'react';
import axios from "axios";
import './PokemonTile.css'


function PokemonTile({ requestEndpoint }) {



    const [ pokemonInfo, setPokemonInfo] = useState({})
    async function fetchPokeInfo() {
        try {
            setPokemonInfo((await axios.get(requestEndpoint)).data)
        } catch (e) {
            console.error(e)
        }

    }

        useEffect(() => {
            void fetchPokeInfo()
        }, [])



        return (
            <>
                { pokemonInfo.species &&
                <article className="pokemon-tile">
                    <h2 className="pokemon-name">{pokemonInfo.species.name}</h2>
                    <img
                        className="pokemon-sprite"
                        src={ pokemonInfo.sprites.front_default || "https://archives.bulbagarden.net/media/upload/b/b7/Missingno.png"}
                        alt="Pokemon Sprite"
                    />
                    <p className="pokemon-moves"><strong>Moves: </strong>{pokemonInfo.moves.length}</p>
                    <p className="pokemon-weight"><strong>Weight: </strong> {pokemonInfo.weight}</p>
                    <div className="ability-container">
                        <p><strong>Abilities: </strong></p>
                        {/*maps through the abilities array and displays the name of each ability*/}
                        {pokemonInfo.abilities.map((abilityInfo, index) => {
                            return <p
                                // using index because names and urls are duplicate
                                key={index}
                                className="pokemon-ability"
                            >
                                {abilityInfo.ability.name}
                            </p>
                        })}
                    </div>

                </article> }
            </>
        );

}

export default PokemonTile;