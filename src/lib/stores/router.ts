import { writable } from "svelte/store";
import ExplorerPanel from "../components/subcomponents/ExplorerPanel.svelte";
import MethodsPanel from "../components/subcomponents/MethodsPanel.svelte";
import VarsPanel from "../components/subcomponents/VarsPanel.svelte";


export const navLinks = [
    {
        name: 'Variables',
        link: 'vars',
        icon: '📜'
    },
    {
        name: 'Methods',
        link: 'methods',
        icon: '📃'
    }
]

export const navLinks2 = [
    {
        name: 'Explorer',
        link: 'explorer',
        icon: ''
    }
]


export const navRoutes = {
    ['vars']: VarsPanel,
    ['methods']: MethodsPanel
}

export const navRoutes2 = {
    ['explorer']: ExplorerPanel,

}


export const currentNavLink = writable("vars")
export const currentNavLink2 = writable("explorer")