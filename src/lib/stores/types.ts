
export interface IBase {
    name: string
    objectType: string,
}

export interface Variable extends IBase {
    value: any,
}

export interface Method extends IBase {
    name: string,

    variables: {
        [key: string]: Variable
    },
}

export interface Contract extends IBase {
    name: string,
    objectType: string,
    variables: {
        [key: string]: Variable
    },
    methods: {
        [key: string]: Method
    }
}


export interface UIElementsMetadata {
    [key: string]: {
        props: { name: string, type: string }[]
    }
}

export interface ContractFileSystem {
    [key: string]: Contract
}