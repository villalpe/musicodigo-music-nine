import React from "react";
const beethoven = require("../Beethoven.mp3");

const Sound = () => <audio src={beethoven} autoPlay />;

export default Sound;