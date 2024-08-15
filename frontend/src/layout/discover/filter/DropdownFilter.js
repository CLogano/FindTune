import React from "react";
import classes from "./DropdownFilter.module.css";
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const DropdownFilter = (props) => {

    const { title, contents, selectedContents, onSelectedContents, hasMultiple } = props;

    const onChangeHandler = (event) => {
        onSelectedContents(event.target.value);
    };

    return (
        <div className={classes.container}>
            <FormControl className={classes["inner-container"]}>
                <InputLabel
                    id="dropdown-label"
                    sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 400, color: "#FA7268",
                        '&.Mui-focused': {
                            color: '#FA7268',
                        },
                    }}>
                    {title}
                </InputLabel>
                <Select
                    labelId="dropdown-label"
                    id="dropdown"
                    value={selectedContents}
                    label="Genres"
                    onChange={onChangeHandler}
                    multiple={hasMultiple}
                    renderValue={(selected) => hasMultiple ? selected.join(", ") : selected}
                    IconComponent={(props) => <ArrowDropDownIcon {...props} style={{ color: "white" }} />}
                    sx={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 400,
                        color: "white",
                        borderRadius: "25px",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                        },
                    }}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                maxHeight: 500
                            }
                        }
                    }}
                >
                    {Array.isArray(contents) && contents.map((item, index) => (
                        <MenuItem
                            key={index}
                            value={item}
                            sx={{ color: "black" }}
                        >
                            {hasMultiple && (
                                <Checkbox
                                    checked={selectedContents.indexOf(item) > -1}
                                    sx={{
                                        "&.Mui-checked": {
                                            color: "#FA7268",
                                        },
                                    }}
                                />
                            )}
                            <ListItemText
                                primary={item}
                                disableTypography={true}
                                sx={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, color: selectedContents.indexOf(item) > -1 ? "#FA7268" : "inherit" }}
                            />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default DropdownFilter;