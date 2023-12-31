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
      if(start > end) return null;
      const mid = Math.floor((start + end) / 2);
      const root = new Node(arr[mid]);
      root.left = this.buildTree(arr, start, mid - 1);
      root.right = this.buildTree(arr, mid + 1, end);
    
      return root;
    }

  insert(value, root = this.root) {
    if(!root) return new Node(value);
    if(value === root.data) return root;
    if(value < root.data) {
      root.left = this.insert(value, root.left);
    } else if(value > root.data) {
      root.right = this.insert(value, root.right);
    }
    return root;
  }

  deleteNode(value, root = this.root) {
    if(!root) return root;
    if(value === root.data) {
      if(!root.left && !root.right) return null;
      if(!root.left) return root.right;
      if(!root.right) return root.left;
      if(root.left && root.right) {
        let succ = root.right;
        while (succ.left) {
          succ = succ.left;
        }
        succ.left = root.left;
        return succ;
      }
    }
    if(value < root.data) {
      root.left = this.deleteNode(value, root.left);
      return root;
    }
    if(value > root.data) {
      root.right = this.deleteNode(value, root.right);
      return root;
    }
  }

  find(value, root = this.root) {
    if(!root) return null;
    if(value === root.data) return root;
    if(value < root.data) return this.find(value, root.left);
    if(value > root.data) return this.find(value, root.right);
  }

  levelOrder(func) {
    const arr = [];
    const queue = [];
    if(!this.root) return;
    queue.push(this.root);
    while(queue.length !== 0) {
      let currentNode = queue.shift();
      arr.push(currentNode.data);
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
    if(func) {
      arr.forEach((node) => {
        func(node);
      });
    } else return arr;
  }

  preorder(func, root = this.root) {
    if(!func) {
      let arr = [];
      if(!root) return arr;
      arr.push(root.data);
      arr = arr.concat(this.preorder(func, root.left));
      arr = arr.concat(this.preorder(func, root.right));
  
      return arr;
    } else {
      if(!root) return;
      func(root);
      this.preorder(func, root.left);
      this.preorder(func, root.right);
    }
  }

  inorder(func, root = this.root) {
    if(!func) {
      let arr = [];
      if(!root) return arr;
      arr = arr.concat(this.inorder(func, root.left));
      arr.push(root.data);
      arr = arr.concat(this.inorder(func, root.right));

      return arr;
    } else {
      if(!root) return;
      this.inorder(func, root.left);
      func(root);
      this.inorder(func, root.right);
    }
  }

  postorder(func, root = this.root) {
    if(!func) {
      let arr = [];
      if(!root) return arr;
      arr = arr.concat(this.postorder(func, root.left));
      arr = arr.concat(this.postorder(func, root.right));
      arr.push(root.data);

      return arr;
    } else {
      if(!root) return;
      this.postorder(func, root.left);
      this.postorder(func, root.right);
      func(root);
    }
  }

  height(node) {
    if(!node) return -1;

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    let height = Math.max(leftHeight, rightHeight) + 1;

    return height;
  }

  depth(node, root = this.root) {
    let counter = 0;
    if(!node) return -1;
    if(node === root) return 0;

    if(node.data < root.data) {
      counter += (this.depth(node, root.left) + 1);
    } else {
      counter += (this.depth(node, root.right) + 1);
    }

    return counter;
  }

  isBalanced(root = this.root) {
    if(!root) return 0; 
    
    if((Math.abs(this.height(root.left) - this.height(root.right)) > 1)) {
      return 'This tree is NOT balanced.';
    } else {
      this.isBalanced(root.left);
      this.isBalanced(root.right);
    }
    return 'This tree is balanced.';
  }

  rebalance() {
    this.root = this.buildTree(this.inorder());
  }
}

const log = (node) => {
  console.log(node.data);
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

const createRandomArr = () => {
  let arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(Math.trunc(Math.random() * 100));
  }
  return arr;
}

const driver = () => {
  console.log('CREATING A TREE WITH VALUES BETWEEN 1 AND 100');
  const tree = new Tree(createRandomArr());

  console.log('CHECKING IF TREE IS BALANCED');
  console.log(tree.isBalanced());
  
  console.log(`DISPLAYING TREE IN LEVEL ORDER: `);
  console.log(tree.levelOrder());

  console.log('DISPLAYING TREE IN PRE ORDER: ');
  console.log(tree.preorder());

  console.log('DISPLAYING TREE IN IN ORDER: ');
  console.log(tree.inorder());

  console.log('DISPLAYING TREE IN POST ORDER: ');
  console.log(tree.postorder());

  console.log('VISUAL RESPRESENTAION OF TREE');
  prettyPrint(tree.root);


  console.log('INSERTING VALUES GREATER THAN 100');

  tree.insert(102);
  tree.insert(130);
  tree.insert(152);
  tree.insert(190);


  console.log('CHECKING IF TREE IS BALANCED');
  console.log(tree.isBalanced());

  console.log('REBALANCING TREE');
  tree.rebalance();

  console.log('CHECKING IF TREE IS BALANCED');
  console.log(tree.isBalanced());
  
  console.log(`DISPLAYING TREE IN LEVEL ORDER: `);
  console.log(tree.levelOrder());

  console.log('DISPLAYING TREE IN PRE ORDER: ');
  console.log(tree.preorder());

  console.log('DISPLAYING TREE IN IN ORDER: ');
  console.log(tree.inorder());

  console.log('DISPLAYING TREE IN POST ORDER: ');
  console.log(tree.postorder());

  console.log('VISUAL REPRESENATION OF NEW TREE');
  prettyPrint(tree.root);
}

driver();