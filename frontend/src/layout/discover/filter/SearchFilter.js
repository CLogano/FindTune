import React, { useState, useEffect, useCallback } from "react";
import classes from "./SearchFilter.module.css";
import { TextField, Chip, Autocomplete, Box } from "@mui/material";
import { searchArtists, searchTracks } from "../helpers/filtersHelper";
import { debounce } from "lodash";

const SearchFilter = (props) => {
    const { accessToken, handleUnauthorized, title, selectedContents, onSelectedContents } = props;

    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isLimitReached, setIsLimitReached] = useState(false);

    const fetchItems = useCallback(
        debounce(async (q) => {
            if (q) {
                console.log("Searching for " + title + "...");

                let items;

                if (title === "artists") {
                    items = await searchArtists(accessToken, handleUnauthorized, q);
                } else if (title === "tracks") {
                    items = await searchTracks(accessToken, handleUnauthorized, q);
                }
                
                if (items) {
                    setSuggestions(items);
                }
            } else {
                setSuggestions([]);
            }
        }, 300), [accessToken, handleUnauthorized, title]
    );

    useEffect(() => {
        if (query.trim()) {
            fetchItems(query);
        }
        return () => {
            fetchItems.cancel();
        };
    }, [query, fetchItems]);

    const inputChangeHandler = (event, value) => {
        setQuery(value);
    };

    const selectItemHandler = (event, item) => {
        if (item && !selectedContents.some(content => content.id === item.id)) {
            if (selectedContents.length < 2) {
                onSelectedContents([...selectedContents, item]);
            } else {
                setIsLimitReached(true);
                setTimeout(() => setIsLimitReached(false), 500);
            }
        }
    };

    const deleteItemHandler = (itemToDelete) => {
        const updatedItems = selectedContents.filter((item) => item.id !== itemToDelete.id);
        onSelectedContents(updatedItems);
    };

    return (
        <div className={classes.container}>
            <Box display="flex" alignItems="center">
                <Autocomplete
                    freeSolo
                    options={suggestions}
                    getOptionLabel={(option) => option.name}
                    onInputChange={inputChangeHandler}
                    onChange={selectItemHandler}
                    className={classes["inner-container"]}
                    sx={{
                        "& .MuiAutocomplete-clearIndicator": {
                            color: "white",
                            "&:hover": {
                                color: "#FA7268",
                            },
                        },
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={title.charAt(0).toUpperCase() + title.slice(1)}
                            variant="outlined"
                            InputProps={{
                                ...params.InputProps,
                                style: {
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 400,
                                    color: "white",
                                    borderRadius: "25px",
                                },
                                autoComplete: "off",
                            }}
                            InputLabelProps={{
                                style: {
                                    fontFamily: "Poppins, sans-serif",
                                    fontWeight: 400,
                                    color: "#FA7268",
                                },
                                shrink: !!query,
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "white",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "white",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "white",
                                    },
                                },
                            }}
                        />
                    )}
                    renderOption={(props, option) => (
                        <li 
                            {...props} 
                            key={option.id}
                            style={{
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: 400,
                                color: "black"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = "#FA7268"}
                            onMouseOut={(e) => e.currentTarget.style.color = "black"}
                        >
                            {option.name}
                        </li>
                    )}
                />
                <Box
                    sx={{
                        ml: 2,
                        color: "white",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 400,
                        animation: isLimitReached ? `${classes.shake} 0.5s` : "none",
                    }}
                >
                    {`${selectedContents.length}/2`}
                </Box>
            </Box>
            <div>
                {selectedContents && selectedContents.length > 0 && selectedContents.map((item, index) => (
                    <Chip
                        key={item.id}
                        label={item.name}
                        onDelete={() => deleteItemHandler(item)}
                        sx={{
                            margin: "5px",
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 400,
                            color: "white",
                            border: "1px solid white",
                            "& .MuiChip-deleteIcon": {
                                color: "white",
                                "&:hover": {
                                    color: "#FA7268",
                                }
                            },
                            backgroundColor: "transparent"
                        }}
                    />
                ))}
            </div>
        </div>
    );
};


export default SearchFilter;