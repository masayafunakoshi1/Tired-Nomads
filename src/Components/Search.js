import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "../App.css";

const Search = ({ panTo }) => {
  const {
    ready,
    suggestions: { status, data },
    value,
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    //Autocompletes suggestions of locations and has many available hooks
    requestOptions: {
      location: {
        lat: () => 41.076206, //want to receive function that it can call
        lng: () => -73.858749,
      },
      radius: 200 * 1000, //need radius of search in meters (120 mi)
    },
  });

  return (
    <div className="search">
      <Combobox
        onSelect={async (address) => {
          setValue(address, false); //Comes from usePlacesAutocomplete hook
          clearSuggestions();

          try {
            const results = await getGeocode({ address }); //selects suggestion and shows information on it
            const { lat, lng } = await getLatLng(results[0]); //gets lat/lng of location
            panTo({ lat, lng }); //Pans to location in the map
            setValue("");
          } catch (error) {
            console.log("error!");
          }
        }}
      >
        <ComboboxInput //Input Search bar
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Enter an address"
        />

        <ComboboxPopover
        //Popover of suggestions
        >
          <ComboboxList>
            {status === "OK" &&
              data.map(({ description }, index) => (
                <ComboboxOption
                  key={index}
                  value={description}
                  //Gives suggestion options
                />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default Search;
