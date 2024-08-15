import React, { useState, useEffect, useRef } from "react";
import classes from "./Sidebar.module.css";
import Playlists from "./playlist/Playlists";
import Filters from "./filter/Filters";

/**
 * Sidebar component that provides tabbed navigation for playlists and filters.
 * @param {object} props - Props passed to the component.
 * @param {Array} props.playlists - List of playlists.
 * @param {number} props.selectedPlaylist - Index of the currently selected playlist.
 * @param {function} props.onSelectedPlaylist - Function to call when a playlist is selected.
 * @param {function} props.onAddPlaylist - Function to call when a playlist is added.
 * @returns {JSX.Element} The rendered sidebar component.
 */
const Sidebar = (props) => {

    // State to track the selected tab
    const [selectedTab, setSelectedTab] = useState("playlists");
    // State to manage the style of the moving tab bar
    const [barStyle, setBarStyle] = useState({});

    // Destructuring props
    const { accessToken, handleUnauthorized, playlists, selectedPlaylist, onSelectedPlaylist, onAddPlaylist, onEditPlaylist, onDeletePlaylist, genre, onSelectedGenre, markets, onSelectedMarkets, artists, onSelectedArtists, tracks, onSelectedTracks } = props;

    // References for the tabs
    const tabRefs = {
        playlists: useRef(null),
        filters: useRef(null),
    };

    // Updates the bar style whenever the selected tab changes
    useEffect(() => {

        const updateBarStyle = () => {
            const currentTab = tabRefs[selectedTab].current;
            if (currentTab) {
                setBarStyle({
                    width: currentTab.offsetWidth,
                    transform: `translateX(${currentTab.offsetLeft}px)`,
                });
            }
        };

        updateBarStyle();
        window.addEventListener("resize", updateBarStyle);

        return () => window.removeEventListener("resize", updateBarStyle);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTab]);

    return (
        <div className={classes.container}>
            <div className={classes.tabs}>
                <div
                    ref={tabRefs.playlists}
                    className={`${classes.tab} ${selectedTab === "playlists" ? classes.active : ""}`}
                    onClick={() => setSelectedTab("playlists")}
                >
                    Playlists
                </div>
                <div
                    ref={tabRefs.filters}
                    className={`${classes.tab} ${selectedTab === "filters" ? classes.active : ""}`}
                    onClick={() => setSelectedTab("filters")}
                >
                    Filters
                </div>
                <div className={classes["tab-bar"]} style={barStyle}></div>
            </div>
            <div className={classes.content}>
                {selectedTab === "playlists" ? 
                    <Playlists
                        playlists={playlists}
                        selected={selectedPlaylist}
                        onSelected={onSelectedPlaylist}
                        onAddPlaylist={onAddPlaylist}
                        onEditPlaylist={onEditPlaylist}
                        onDeletePlaylist={onDeletePlaylist}
                    /> :
                    <Filters
                        accessToken={accessToken}
                        handleUnauthorized={handleUnauthorized}
                        genre={genre}
                        onSelectedGenre={onSelectedGenre}
                        artists={artists}
                        onSelectedArtists={onSelectedArtists}
                        markets={markets}
                        onSelectedMarkets={onSelectedMarkets}
                        tracks={tracks}
                        onSelectedTracks={onSelectedTracks}
                    />}
            </div>
        </div>
    );
};

export default Sidebar;