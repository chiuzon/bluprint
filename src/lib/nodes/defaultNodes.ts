import { LGraphNode, LiteGraph } from "litegraph.js";

//node constructor class
function FunctionConstructorNode() {

}

//name to show
FunctionConstructorNode.title = "FunctionConstructor";

//function to call when the node is executed
FunctionConstructorNode.prototype.onExecute = function () {
}

function registerDefaultNodes() {
    //register in the system
    LiteGraph.registerNodeType("func/constructor", FunctionConstructorNode as any);
}

export default registerDefaultNodes