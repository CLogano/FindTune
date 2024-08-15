import React, { useEffect, useState } from "react";
import classes from "./Filters.module.css";
import { getAvailableGenres, getAvailableMarkets } from "../helpers/filtersHelper";
import DropdownFilter from "./DropdownFilter";
import SearchFilter from "./SearchFilter";

const Filters = (props) => {

    const { accessToken, handleUnauthorized, genre, onSelectedGenre, artists, onSelectedArtists, markets, onSelectedMarkets, tracks, onSelectedTracks } = props;

    // State to store available genres
    const [availableGenres, setAvailableGenres] = useState([]);
    // State to store available markets
    const [availableMarkets, setAvailableMarkets] = useState([]);

    useEffect(() => {

        const fetchFilters = async () => {

            console.log("getting available genres")

            // const availableGenresData = await getAvailableGenres(accessToken, handleUnauthorized);
            const availableGenresData = ["Hip-hop", "Rap"]

            if (availableGenresData) {
                setAvailableGenres(availableGenresData);
            }

            const availableMarketsData = await getAvailableMarkets(accessToken, handleUnauthorized);

            if (availableMarketsData) {
                setAvailableMarkets(availableMarketsData);
            }
        };

        fetchFilters();
    }, [accessToken, handleUnauthorized]);

    return (
        <div className={classes.container}>
            {availableGenres && <DropdownFilter
                title="Genre"
                contents={availableGenres}
                selectedContents={availableGenres.includes(genre) ? genre : ""}
                onSelectedContents={onSelectedGenre}
                hasMultiple={false}
            />}
            {availableMarkets && <DropdownFilter
                title="Markets"
                contents={availableMarkets}
                selectedContents={markets}
                onSelectedContents={onSelectedMarkets}
                hasMultiple={true}
            />}
            <SearchFilter
                accessToken={accessToken}
                handleUnauthorized={handleUnauthorized}
                title="artists" selectedContents={artists}
                onSelectedContents={onSelectedArtists}
            />
            <SearchFilter
                accessToken={accessToken}
                handleUnauthorized={handleUnauthorized}
                title="tracks" selectedContents={tracks}
                onSelectedContents={onSelectedTracks}
            />
        </div>
    );
};

export default Filters;