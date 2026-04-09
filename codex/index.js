// 列表数据
const list = [
    { id: '01', pid: null },
    { id: '02', pid: null },
    { id: '03', pid: '01' },
    { id: '04', pid: '03' },
    { id: '05', pid: '01' },
    { id: '06', pid: '03' },
    { id: '07', pid: '02' },
    { id: '09', pid: '02' },
    { id: '10', pid: '07' },
    { id: '11', pid: '07' },
]

function listToTree(list) {
    const map = new Map()
    const roots = [];

    for (const item of list) {
        map.set(item.id, {
            ...item,
            children: []
        })
    }

    for (const item of list) {
        const node = map.get(item.id);
        const pid = item.pid;

        if (pid === null || !map.get(pid)) {
            roots.push(node)
        } else {
            const parent = map.get(pid);
            parent.children.push(node)
        }
    }

    return roots
}

// console.log(listToTree(list))

const tree = [
    {
        "id": "01",
        "pid": null,
        "children": [
            {
                "id": "03",
                "pid": "01",
                "children": [
                    {
                        "id": "04",
                        "pid": "03",
                        "children": []
                    },
                    {
                        "id": "06",
                        "pid": "03",
                        "children": []
                    }
                ]
            },
            {
                "id": "05",
                "pid": "01",
                "children": []
            }
        ]
    },
    {
        "id": "02",
        "pid": null,
        "children": [
            {
                "id": "07",
                "pid": "02",
                "children": [
                    {
                        "id": "10",
                        "pid": "07",
                        "children": []
                    },
                    {
                        "id": "11",
                        "pid": "07",
                        "children": []
                    }
                ]
            },
            {
                "id": "09",
                "pid": "02",
                "children": []
            }
        ]
    }
]

function treeToList(tree) {
    const result = [];
    const stack = [...tree];
    while(stack.length) {
        const node = stack.pop();
        const { children, ...rest } = node;
        result.push(rest);
        if (children?.length) {
            stack.push(...children)
        }
    }
    return result
} 

//console.log(treeToList(tree))

function findTreeNode(tree, fn) {
    // stack的初始值为树结构根节点
    const stack = [...tree];
    while(stack.length) {
        // 重复执行以下步骤直到stack为空
        const node = stack.shift();
        const {children, ...rest} = node;
        if (fn(rest)) return node
        if(children?.length) {
            stack.push(...children);
        }
    }
    return null
}

// console.log(findTreeNode(tree, (node) => {
//    return node.id === '11'
// }))

function findTreeNodePath(tree, fn, path = []) {
    // stack的初始值为树结构根节点
    const stack = tree.map(node => ({ ...node, path: [node] }));
    while(stack.length) {
        // 重复执行以下步骤直到stack为空
        const node = stack.shift();
        const {children, path, ...rest} = node;
        if (fn(rest)) return path
        if(children?.length) {
            stack.push(...children.map(item => ({...item, path: [...path, item]})));
        }
    }
    return []
}

console.log(findTreeNodePath(tree, (node) => {
   return node.id === '11'
}))

/**
 * 简洁版本
 * 最后一位作为基准
 */
const quickSort = (list) => {
    if (list.length <= 1) return list;
    const pivot = list.pop();
    const left = list.filter(v => v < pivot)
    const right = list.filter(v => v >= pivot)
    return quickSort(left).concat(pivot, quickSort(right))
}

// const arr = [15,23,45,34,12,56,89,48,26];
 const arr = [15,23,45,34,12,56,89,48,12];

 const arr1 = quickSort(arr)
console.log(arr1)

const binarySearch = (list) => {
    
}