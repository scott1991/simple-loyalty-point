import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config_json = require("./config.json");
const env = process.env.NODE_ENV || 'development';
const CONFIG = config_json[env];

export default CONFIG;