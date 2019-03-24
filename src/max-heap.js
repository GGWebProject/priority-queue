const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		const node = new Node(data, priority)
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if (!this.isEmpty()) {
			let removedRoot = this.detachRoot();
			this.restoreRootFromLastInsertedNode(removedRoot);
			this.shiftNodeDown(this.root);
			return removedRoot.data;
		}
	}

	detachRoot() {
		let lastRoot = this.root;
		this.parentNodes = this.parentNodes.filter((node)=> node != lastRoot);
		this.root = null;
		return lastRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (detached.left) {
            this.root = this.parentNodes[this.parentNodes.length - 1]

            if (this.parentNodes.length <= 2) {
				this.parentNodes.unshift(this.root)
			} else if (this.root.parent.right == this.root && this.root.parent != detached) {
				this.parentNodes.unshift(this.root.parent);
			}
			
            this.parentNodes.splice(this.parentNodes.lastIndexOf(this.root), 1);

            if (this.root.parent.left == this.root) {
                this.root.parent.left = null;
            } else {
				this.root.parent.right = null;
			}

			this.root.left = detached.left;
			
            if (this.root.left) {
				this.root.left.parent = this.root;
			}

			this.root.right = detached.right;
			
            if (this.root.right) {
				this.root.right.parent = this.root;
			}

            this.root.parent = null;
		}
	}

	size() {
		return this.parentNodes.length + 1;
	}

	isEmpty() {
		if (!this.root){
			return true;
		}

		return false;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if (!this.root) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
			node.parent = this.parentNodes[0];
			if (!node.parent.left) {
				node.parent.left = node;
			} else if (!node.parent.right) {
				node.parent.right = node;
				this.parentNodes.shift();
			}
			this.parentNodes.push(node);
		}
	}

	shiftNodeUp(node) {
		if (!node.parent){
			this.root = node;
		}

		if (node.parent && node.parent.priority < node.priority) {

			if (this.parentNodes.indexOf(node.parent) == -1){
				this.parentNodes.splice(this.parentNodes.indexOf(node), 1, node.parent);
				this.root = node;
			} else {
				this.parentNodes[this.parentNodes.indexOf(node)] = node.parent;
				this.parentNodes[this.parentNodes.indexOf(node.parent)] = node;
			}
			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {

	}
}

module.exports = MaxHeap;
