var _ = require('underscore');

function Node(label) {
    this.label = label;
    this.adjacents = [];
}

Node.prototype.addAdjacent = function(node) {
    this.adjacents.push(node);
}

Node.prototype.addAdjacents = function(nodes, created) {
    for(var adj in nodes) {
        if(created[nodes[adj]]) {
            this.adjacents.push(created[nodes[adj]]);
        } else {
            var newNode = new Node(nodes[adj]);
            created[nodes[adj]] = newNode;
            this.adjacents.push(newNode);
        }
    }
}

function Graph() {
    this.nodes = [];
}

Graph.prototype.init = function(nodes) {
    var created = {};
    //create
    for(var node in nodes) {
       for(var i in nodes[node]){
           if(!created[i]) {
               //create new node
               var newNode = new Node(i);
               //add its adjacents
               created[i] = newNode;
               this.nodes.push(newNode);
           }
       }
    }

    // Add adjacents
    for(var node in nodes) {
        for(var i in nodes[node]){
            if(nodes[node][i].length > 0) {
                _.each(nodes[node][i], function(adj) {
                    created[i].addAdjacent(created[adj]);
                });
            }
        }
    }
}

Graph.prototype.DFS = function(start) {
    var startNode, visited = {};
    var stack = [];
    //initialization
     _.each(this.nodes, function(node) {
        visited[node.label] = false;
        if(node.label === start) {
            startNode = node;
            stack.push(startNode);
        }
    });
    //get First node in stack
    while(stack.length !== 0) {
            var node = stack.pop();
            console.log('****', node.label);
            visited[node.label] = true;
            _.each(node.adjacents, function(adj) {
                if(!visited[adj.label]) {
                    stack.push(adj);
                }
            });
    }
}

var g = new Graph();
g.init([ {'A': ['B']}, {'B': ['C']}, {'C': ['A']}]);

g.DFS('A');
