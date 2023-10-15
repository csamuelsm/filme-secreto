"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.intersectionLength = exports.createLongSuffix = exports.createLongPrefix = exports.buildSearchTree = void 0;
var buildFailPointer = function (searchWordTree) {
    var _a;
    var queue = [];
    queue.push.apply(queue, __spreadArray([], __read(searchWordTree.children.values())));
    var length = queue.length;
    var start = 0;
    while (start < length) {
        var node = queue[start];
        var nodeName = node.name;
        var nodeStr = node.str;
        queue.push.apply(queue, __spreadArray([], __read(node.children.values())));
        if ((nodeStr === null || nodeStr === void 0 ? void 0 : nodeStr.length) === 1) {
            node.failPointer = searchWordTree;
        }
        else {
            var parentNodeFailPointer = (_a = node.parent) === null || _a === void 0 ? void 0 : _a.failPointer;
            var parentNodeFailPointerChildren = parentNodeFailPointer === null || parentNodeFailPointer === void 0 ? void 0 : parentNodeFailPointer.children;
            var sameNameNode = parentNodeFailPointerChildren.get(nodeName);
            if (sameNameNode) {
                node.failPointer = sameNameNode;
            }
            else {
                node.failPointer = parentNodeFailPointer;
            }
        }
        length = queue.length;
        start += 1;
    }
};
var buildSearchTree = function (searchArray) {
    console.time('build search tree');
    var tree = {
        children: new Map(),
        str: '',
    };
    var createNode = function (isEnd, name, prefix, parent) { return ({
        children: new Map(),
        name: name,
        str: prefix + name,
        isEnd: isEnd,
        parent: parent,
    }); };
    searchArray.forEach(function (word) {
        var charList = word.split('');
        var node = tree;
        charList.forEach(function (char, index) {
            if (node.children.has(char)) {
                node = node.children.get(char);
            }
            else {
                var isEnd = index === word.length - 1;
                var newNode = createNode(isEnd, char, node.str, node);
                node.children.set(char, newNode);
                node = node.children.get(char);
            }
        });
    });
    console.timeEnd('build search tree');
    console.time('build fail pointer');
    buildFailPointer(tree);
    console.timeEnd('build fail pointer');
    return tree;
};
exports.buildSearchTree = buildSearchTree;
var createLongPrefix = function (str) {
    var prefixCollection = [];
    var length = str.length;
    if (length === 1) {
        return prefixCollection;
    }
    for (var i = 0; i < length - 1; i++) {
        prefixCollection.push(str.slice(0, i + 1));
    }
    return prefixCollection;
};
exports.createLongPrefix = createLongPrefix;
var createLongSuffix = function (str) {
    var suffixCollection = [];
    var length = str.length;
    if (length === 1) {
        return suffixCollection;
    }
    for (var i = length - 1; i > 0; i--) {
        suffixCollection.unshift(str.slice(i, length));
    }
    return suffixCollection;
};
exports.createLongSuffix = createLongSuffix;
var intersectionLength = function (arg1, arg2) {
    var result = '';
    var arrayMap = new Map();
    arg1.forEach(function (item) { return arrayMap.set(item, item); });
    for (var i = 0; i < arg2.length; i++) {
        var item = arg2[i];
        if (arrayMap.has(item) && item.length > result.length) {
            result = item;
        }
    }
    return result.length;
};
exports.intersectionLength = intersectionLength;
