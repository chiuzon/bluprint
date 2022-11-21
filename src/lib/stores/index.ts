import { writable } from "svelte/store"
import InputComponent from "../components/InputComponent.svelte"
import { v4 as uuidv4 } from "uuid";
import { LiteGraph } from "litegraph.js";
import FunctionArguments from "../components/FunctionArguments.svelte";

export interface VariableProps {
    name: string,
    uuid: string,
    type: "string" | "bigint" | "int" | "map" | "array"
}

export enum ContractFunctionType {
    CONSTRUCTOR,
    FUNCTION
}

export interface FunctionProps {
    name: string,
    uuid: string,
    variables: Variable[],
    type: ContractFunctionType,
    inputs: {
        name: string,
        type: string
    }[],
    outputs: {
        name: string,
        type: string
    }[]
}

export interface ContractProps {
    name: string,
    variables: Variable[],
    functions: ContractFunction[]
}

export class ContractFunction {

    props: FunctionProps = {
        name: "",
        uuid: uuidv4(),
        variables: [],
        type: ContractFunctionType.FUNCTION,
        inputs: [],
        outputs: []
    }

    constructor(name: string) {
        this.props.name = name
    }

    addVariable() {
        const localVariable = new Variable(`LocalVariable_${this.props.variables.length + 1}`)

        this.props.variables = [...this.props.variables, localVariable]

        return this
    }

    addInput(name: string, type: string) {
        this.props.inputs = [...this.props.inputs, { name, type }]

        return this;
    }

    removeInput(index: number) {
        this.props.inputs = this.props.inputs.filter((_, _index) => _index !== index)


        return this;
    }

    editInput(index: number, props: { name: string, type: string }) {
        this.props.inputs[index] = {
            ...this.props[index],
            ...props
        }

        return this
    }

    buildDefaultNode() {

        const node_const = LiteGraph.createNode("func/constructor");

        node_const.title = this.props.name

        for (const input of this.props.inputs) {
            node_const.addOutput(input.name, input.type)
        }

        node_const.pos = [500, 500];

        return [node_const]
    }
}

export class Variable {

    props: VariableProps = {
        name: "",
        uuid: uuidv4(),
        type: "int"
    }

    constructor(name: string) {
        this.props.name = name
    }
}
// Use class for file system
export class Contract {

    props: ContractProps = {

        name: "",
        variables: [],
        functions: []
    }

    constructor(name: string) {
        this.props.name = name;

        this.addConstructor()
    }

    addVariable() {
        const localVariable = new Variable(`Variable_${this.props.variables.length + 1}`)

        this.props.variables = [...this.props.variables, localVariable]

        return this
    }

    addConstructor() {
        const localFunction = new ContractFunction(`Constructor`)

        localFunction.props.type = ContractFunctionType.CONSTRUCTOR

        this.props.functions = [...this.props.functions, localFunction]

        return this
    }

    addFunction() {
        const localFunction = new ContractFunction(`Function_${this.props.variables.length + 1}`)

        this.props.functions = [...this.props.functions, localFunction]

        return this
    }

    editVariableProp(variable: Variable, key: string, value: any) {
        const searchVariableIndex = this.props.variables.findIndex((val) => val.props.uuid === variable.props.uuid)

        if (searchVariableIndex !== -1) {
            this.props.variables[searchVariableIndex].props[key] = value;
        }

        return this
    }

    editFunctionProp(contractFunction: ContractFunction, key: string, value: any) {
        const searchFunctionIndex = this.props.functions.findIndex((val) => val.props.uuid === contractFunction.props.uuid)

        if (searchFunctionIndex !== -1) {
            this.props.functions[searchFunctionIndex].props[key] = value;
        }

        return this
    }

    editFunctionLocalVariableProp(contractFunction: ContractFunction, variable: Variable, key: string, value: any) {
        const searchFunctionIndex = this.props.functions.findIndex((val) => val.props.uuid === contractFunction.props.uuid)

        if (searchFunctionIndex === -1) {
            console.error("Couldn't find function!")
            return this
        }

        const searchVariableIndex = this.props.functions[searchFunctionIndex].props.variables.findIndex((val) => val.props.uuid === variable.props.uuid)

        if (searchVariableIndex !== -1) {
            this.props.functions[searchFunctionIndex].props.variables[searchVariableIndex].props[key] = value;
        }

        return this
    }

    addLocalVariableFunction(contractFunction: ContractFunction) {
        const localFunction = contractFunction.addVariable()

        const searchFunctionIndex = this.props.functions.findIndex((val) => val.props.uuid === contractFunction.props.uuid)

        if (searchFunctionIndex !== -1) {
            this.props.functions[searchFunctionIndex] = localFunction

            return this;
        }

        console.error("Couldn't find the function to add the local variable to!")

        return this
    }

    addFunctionEntryPoint(contractFunction: ContractFunction) {
        const localFunction = contractFunction.addInput("arg" + Object.keys(contractFunction.props.inputs).length + 1, "number")

        const searchFunctionIndex = this.props.functions.findIndex((val) => val.props.uuid === contractFunction.props.uuid)

        if (searchFunctionIndex !== -1) {
            this.props.functions[searchFunctionIndex] = localFunction

            return this;
        }

        console.error("Couldn't find the function to add the local variable to!")

        return this
    }

    editFunctionEntryPoint(contractFunction: ContractFunction, entryPointIndex: number, props: { name: string, type: string }) {
        const searchFunctionIndex = this.props.functions.findIndex((val) => val.props.uuid === contractFunction.props.uuid)

        if (searchFunctionIndex === -1) {
            console.error("Couldn't find function!")
            return this
        }

        this.props.functions[searchFunctionIndex] = contractFunction.editInput(entryPointIndex, props)

        // const searchVariableIndex = this.props.functions[searchFunctionIndex].props.variables.findIndex((val) => val.props.uuid === variable.props.uuid)

        // if (searchVariableIndex !== -1) {
        //     this.props.functions[searchFunctionIndex].props.variables[searchVariableIndex].props[key] = value;
        // }

        return this
    }
}

export const UIElementsTypes = {
    ['text']: {
        component: InputComponent
    },
    ['argsList']: {
        component: FunctionArguments
    }
}



export interface UIElementsMetadata {
    [key: string]: {
        props: { name: string, type: string }[]
    }
}

export const uiElementsMetadata: UIElementsMetadata = {
    ["Contract"]: {
        props: [{
            name: 'name',
            type: 'text'
        }]
    },
    ["ContractFunction"]: {
        props: [{
            name: 'name',
            type: 'text'
        }, {
            name: 'inputs',
            type: 'argsList'
        },
        {
            name: 'outputs',
            type: 'argsList'
        }
        ]
    },
    ["Variable"]: {
        props: [{
            name: 'name',
            type: 'text'
        }]
    }
}


export interface ContractFileSystem {
    [key: string]: Contract
}

export const selectedContract = writable<string>(undefined)
export const selectedElement = writable<Variable | ContractFunction | Contract | undefined>()
export const selectedLocalVariable = writable<Variable | undefined>()
export const contractFileSystem = writable<ContractFileSystem>({})