import { HeadlessEngine, searchPageReducers } from "@coveo/headless";

const engine = new HeadlessEngine({
    configuration: HeadlessEngine.getSampleConfiguration(),
    reducers: searchPageReducers,
});

export default engine;
