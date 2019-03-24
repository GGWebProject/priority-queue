class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		node.parent = this;
		if(this.left && this.right) {

		} else if (!this.left) {
			this.left = node;
		} else if(this.left) {
			this.right = node;
		}
	}

	removeChild(node) {
		if (node === this.left){
			this.left.parent = null;
			this.left = null;
		} else if (node === this.right) {
			this.left.parent = null;
			this.right = null;
		} else if (node !== this.left && node !== this.right) {
			throw "error! node is not a child of this node"
		}
	}

	remove() {
		if (this.parent != null) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent) {

			let rightChildThis = this.right;
			let leftChildThis = this.left;
			let parent = this.parent;
			let grandParent = this.parent.parent;

			if (this.parent.right === this) {

				if (this.parent.left) {
					this.parent.left.parent = this;
				}

				this.right = parent;
				this.left = parent.left;
			} else if (this.parent.left === this) {

				if (this.parent.right) {
					this.parent.right.parent = this;
				}

				this.left = parent;
				this.right = parent.right;
			}

			this.parent = grandParent;
			if (grandParent) {
				if (grandParent.left === parent) {
					grandParent.left = this;
				} else if (grandParent.right === parent) {
					grandParent.right = this;
				}
			}


			parent.parent = this;
			parent.right = rightChildThis;
			parent.left = leftChildThis;
		}

	}
}

module.exports = Node;
