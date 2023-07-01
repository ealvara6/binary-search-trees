# binary-search-trees

In this project I demonstrate my ability to create and manipulate a balanaced binary search tree by creating a Tree class with multiple functions that manipulate the tree.

## functions
- `sortArr()` sorts and removes duplicates of the given object array.
- `buildTree()` turns the given object array into a balanced binary tree and returns the level-0 root node.
- `insert(value)` creates a node with the given value and correctly places it in the binary tree as a leaf node.
- `deleteNode(value)` deletes the node with the given value and points its parent node to its children.
- `find(value)` returns the node of the given value. returns null if value is not found.
- `levelOrder(func)` traverse through the tree in a breadth-first level order and provides each node as an argument to the given function. if no function is given, returns an array of values in level order.
- `preorder(func)` traverse through the tree in a pre order depth-first level order and provides each node as an argument to the given function. if no function is given, returns an array of values in pre order.
- `inorder(func)` traverse through the tree in an in order depth-first level order and provides each node as an argument to the given function. if no function is given, returns an array of values in in order.
- `postorder(func)` traverse through the tree in a post order depth-first level order and provides each node as an argument to the given function. if no function is given, returns an array of values in post  order.
- `height(node)` returns the height of the given node. returns -1 if given an invalid node.
- `depth(node)` returns the depth of the given node. returns -1 if given an invalid node.
- `isBalanced()` returns true if the binary tree is balanced or returns false if the binary tree is not balanced.
- `rebalance()` rebalances an unbalanced binary tree.
