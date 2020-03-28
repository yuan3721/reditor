import * as Bundeler from "parcel-bundler";
import {join, resolve} from "path";

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

const entryFiles = join(process.cwd(),"/test/index.html");
const options = {outDir: 'dist_dev'}
const bundeler = new Bundeler(entryFiles,options);

bundeler.serve(1111,false)
