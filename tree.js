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

  deleteNode(value, root = this.root) {
    if (!root) return root;
    if (value === root.data) {
      if (!root.left && !root.right) return null;
      if (!root.left) return root.right;
      if (!root.right) return root.left;
      if (root.left && root.right) {
        let succ = root.right;
        while (succ.left) {
          succ = succ.left;
        }
        succ.left = root.left;
        return succ;
      }
    }
    if (value < root.data) {
      root.left = this.deleteNode(value, root.left);
      return root;
    }
    if (value > root.data) {
      root.right = this.deleteNode(value, root.right);
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

const newTree = new Tree([1, 2, 3, 4, 5, 7, 8]);
prettyPrint(newTree.root);