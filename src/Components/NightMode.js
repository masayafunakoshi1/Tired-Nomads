import Switch from "@material-ui/core/Switch";
import React from "react";
import PopoverComp from "./PopoverComp";

const NightMode = ({
  nightModeHandler,
  setNightModeHandler,
  anchorEl,
  setAnchorEl,
}) => {
  const switchHandler = () => {
    if (!nightModeHandler) {
      setNightModeHandler(true);
    }
    if (nightModeHandler) {
      setNightModeHandler(false);
    }
  };

  return (
    <>
      <div className="buttons" id="nightMode">
        <Switch color="default" onChange={switchHandler} />

        <span
          onMouseEnter={(e) => setAnchorEl(e.target)}
          onMouseLeave={() => setAnchorEl(null)}
          className="nightMode"
        >
          {nightModeHandler ? "🌜" : "🌞"}
        </span>
      </div>

      <PopoverComp anchorEl={anchorEl} />
    </>
  );
};

export default NightMode;
