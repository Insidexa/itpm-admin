import {WBSOBS} from "./types/WBSOBS";
import {PERT} from "./types/PERT";
import {ResultWBSOBS} from "./types/ResultWBSOBS";
import Diagram from "./types/Diagram";

export const instances = [
    {
        value: 'WBSOBS',
        'class': WBSOBS,
        result: false,
        name: 'WBS/OBS'
    },
    {
        value: 'PERT',
        'class': PERT,
        result: false,
        name: 'PERT'
    },
    {
        value: 'ResultWBSOBS',
        result: true,
        'class': ResultWBSOBS,
        name: 'WBS/OBS Result'
    }

];

export function DiagramFactory (diagram, div, ...args): Diagram {
    console.log(diagram, div, args);
    return new diagram(div, args);
}