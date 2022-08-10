<template>
  <div class="strategy-arrangement">
    <div ref="dnd" class="dnd"></div>
    <div ref="graph" class="graph"></div>
    <!-- 用来拖拽到右边是被复制的dom -->
    <div ref="copyHtml" style="display: none;" >
      <div class="ant-copy" style="text-align: center; font-size: 12px;">
        <div class="ant-title" style="height: 24px; border-radius: 5px 5px 0 0;
         display: flex; justify-content: center; align-items: center; box-shadow: 0px 0px 5px #ccc; color: #606266"></div>
        <div style="padding: 2px; height: 75px;  background-color: #fff; box-shadow: 0px 0px 5px #ccc;
          word-break:break-all; display: flex; justify-content: center; align-items: center;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Graph, Shape, Addon  } from '@antv/x6';
import {GetAntBgcColor, GetAntColor} from "../methods/methods";
const { Stencil } = Addon;
const { Rect } = Shape;

export default {
  name: "strategyArrangement",

  data() {
    return {

      // 画布实例
      graph: null
    }
  },

  mounted() {
    this.graphInit();
  },

  methods: {

    /**
     * 画布初始化
     */
    graphInit() {
      const offerHeight = document.body.offsetHeight - 80;
      const offerWidth = document.body.offsetWidth - 450;
      const graph = new Graph({
        container: this.$refs.graph,
        width: offerWidth,
        height: offerHeight,
        background: {
          color: '#fffbe6', // 设置画布背景颜色
        },
        grid: {
          size: 10,      // 网格大小 10px
          visible: true, // 渲染网格背景
        },
        scroller: {
          enabled: true,
          pageVisible: false,
          pageBreak: false,
          pannable: true,
        }
      });
      this.graph = graph;
      this.dndInit();
    },

    /**
     * 拖拽节点初始化
     */
    dndInit() {

      const assemblyList = [
        { name: '流程控制', id: 'flowControl', children: [
            { name: '等待', id: 'wait' },
            { name: 'AB测试', id: 'ABTest' }
          ]
        },
        { name: '控制组件', id: 'controlComponents', children: [
            { name: '决策', id: 'policy' }
          ]
        },
        { name: '渠道组件-资源位', id: 'clientComponents', children: [
            { name: '弹窗-客户端首页', id: '1##1' },
            { name: '瀑布流-客户端首页', id: 'WATERFALLS_FLOW##1' }
          ]
        },
        { name: '渠道组件-营销', id: 'marketingComponents', children: [
            { name: '短信', id: 'channelSms' },
            { name: '客户端消息', id: 'channelClient' },
            { name: '代金券', id: 'channelCoupon' },
            { name: 'ivr', id: 'channelIvr' },
            { name: '权益包', id: 'channelRightsPkg' },
          ]
        },
      ];

      // 分组数据
      const groups = assemblyList.map(item => {
        return {
          name: item.id,
          title: item.name,
          graphHeight:  item.children.length * 70
        }
      })

      const stencil = new Stencil({
        title: '画板功能，折叠全部',
        placeholder: "根据组件名字搜索",
        notFoundText: "未查找到对应组件",
        target: this.graph,
        collapsable: true,
        stencilGraphWidth: 200,
        stencilGraphHeight: 180,
        layoutOptions: {
          columns: 1,
          columnWidth: 200,
          rowHeight: 60,
          center: true,
          resizeToFit: true,
        },
        groups: groups,
        search: (cell, keyword) => {
          if (keyword) {
            const cellName = cell.store.data.attrs.text.text; // 拿到组件的名字
            return cellName.includes(keyword);
          }
          return true;
        },
        getDropNode: this.getDropNode
      })

      // 生成拖拽结构Dom
      this.$refs.dnd.appendChild(stencil.container);

      // 拖拽列表
      assemblyList.forEach(item => {
        const stencilArr = item.children.map(childrenItem => {
          // 生成四边形节点
          return new Rect({
            width: 120,
            height: 30,
            attrs: {
              rect: {
                fill: GetAntBgcColor(item.id),
                stroke: null,
                rx: 10,
                ry: 10
              },
              text: {
                text: childrenItem.name,
                fill: GetAntColor(item.id),
                id: childrenItem.id
              },
            },
            data: {
              id: childrenItem.id,
            },
          });
        })
        // 生成节点Dom
        stencil.load(stencilArr, item.id);
      })

    },

    /**
     * 节点拖拽生成自定义节点
     */
    getDropNode(node) {
      const { rect, text } = node.attrs
      const { id } = text;
      const copyHtml = this.$refs.copyHtml;

      copyHtml.children[0].firstChild.style.backgroundColor = rect && rect.fill;

      copyHtml.children[0].firstChild.innerText = text && text.text;
      copyHtml.children[0].lastChild.innerText = "未命名";

      const newNode = {
        shape: "html",
        width: 110,
        height: 110,
        data: {
          id,
        },
        html: copyHtml.innerHTML,
      };

      newNode.ports = {
        groups: {
          // 输入链接桩群组定义
          in: {
            position: "top",
            attrs: {
              circle: {
                r: 5,
                magnet: true,
                stroke: "#ccc",
                strokeWidth: 1,
                fill: "#EBEBEB",
              },
            },
          },
          // 输出链接桩群组定义
          out: {
            position: "bottom",
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: "#1bbd9d",
                strokeWidth: 2,
                fill: "#fff",
              },
            },
          },
        },
        items: [
          {
            id: `${node.id}-in`,
            group: "in",
          },
          {
            id: `${node.id}-out`,
            group: "out",
          },
        ],
      };
      node.clone({ keepId: true })
      return this.graph.addNode(newNode);
    }
  }
}
</script>

<style scoped lang="scss">
  .strategy-arrangement {
    display: flex;
    .dnd {
      width: 250px;
      border: 1px solid #f0f0f0;
      position: relative;
    }
  }
</style>