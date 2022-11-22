import type { Contract, Method, Variable } from "./types";



export function makeContract(name): Contract {
    return {
        name,
        objectType: "contract",
        variables: {
        },
        methods: {
        }
    }
}


export function makeVariable(name): Variable {
    return {
        name,
        objectType: "variable",
        value: 0
    }
}

export function makeMethod(name): Method {
    return {
        name,
        objectType: "method",
        variables: {}
    }
}