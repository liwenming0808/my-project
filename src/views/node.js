import '@antv/x6-vue-shape';
import { Addon} from '@antv/x6';
// 拖拽生成四边形
export const startDragToGraph  = (graph,type,e) =>{
  const node =
  graph.createNode({
  width: 100,  //节点的宽度
  height: 60,   //节点的高度
  attrs: {
    label: {
      text: type,
      fill: '#000000',
      fontSize: 14,
      textWrap: {
        width: -10 ,
        height: -10,
        ellipsis: true,
      },
    },
    body: {
      stroke: '#000000',
      strokeWidth: 1,
      fill: '#ffffff',
    }
  },
  ports: ports
})
  const dnd = new Addon.Dnd({target:graph})
  dnd.start(node,e)
}

//下面是锚点的代码。 知道就行了 我就不一一写了。
const ports = {
  groups: {
    // 输入链接桩群组定义
    top: {
      position: 'top',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 2,
          fill: '#fff',
        },
      },
    },
    // 输出链接桩群组定义
    bottom: {
      position: 'bottom',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 2,
          fill: '#fff',
        },
      },
    },
    left: {
      position: 'left',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 2,
          fill: '#fff',
        },
      },
    },
    right: {
      position: 'right',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#2D8CF0',
          strokeWidth: 2,
          fill: '#fff',
        },
      },
    },
  },
  items: [
    {
      id: 'port1',
      group: 'top',
    },
    {
      id: 'port2',
      group: 'bottom',
    },
    {
      id: 'port3',
      group: 'left',
    },
    {
      id: 'port4',
      group: 'right',
    }
  ],
}
