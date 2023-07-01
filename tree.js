import mergeSort from './mergesort.js';
import Node from './node.js';

class Tree {
  constructor(arr) {
    this.arr = arr;
    this.root = this.buildTree(this.sortArr(this.arr));
  }

  sortArr() {
    const sortedArr = mergeSort(this.arr);
    return [...new Set(sortedArr)];
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
      if (start > end) return null;
      const mid = Math.floor((start + end) / 2);
      const root = new Node(arr[mid]);
      root.left = this.buildTree(arr, start, mid - 1);
      root.right = this.buildTree(arr, mid + 1, end);
    
      return root;
    }

  insert(value, root = this.root) {
    if (!root) return new Node(value);
    if (value === root.data) return root;
    if (value < root.data) {
      root.left = this.insert(value, root.left);
    } else if (value > root.data) {
      root.right = this.insert(value, root.right);
    }
    return root;
  }

  delete(value, root = this.root) {
    if (!root) return root;
    if (value < root.data) {
      root.left = delete(value, root.data);
      return root;
    } else if (value > root.data) {
      root.right = delete(value, root.data);
      return root;
    }
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const newTree = new Tree([5, 3, 4, 4, 8, 1]);
prettyPrint(newTree.root);