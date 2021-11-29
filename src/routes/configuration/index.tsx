import _ from 'lodash';
import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class DragFromOutsideLayout extends React.Component {
  static defaultProps = {
    className: 'layout',
    rowHeight: 30,
    onLayoutChange: function () {},
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  };

  state = {
    currentBreakpoint: 'lg',
    compactType: 'vertical',
    mounted: false,
    layouts: { lg: generateLayout() },
  };

  componentDidMount() {
    this.setState({ mounted: true });
  }

  generateDOM() {
    return _.map(this.state.layouts.lg, function (l, i) {
      return (
        <div key={i} className={l.static ? 'static my-grid-group' : 'my-grid-group'}>
          {l.static ? (
            <span className="text" title="This item is static and cannot be removed or resized.">
              Static - {i}
            </span>
          ) : (
            <span className="text">{i}</span>
          )}
        </div>
      );
    });
  }

  onBreakpointChange = breakpoint => {
    this.setState({
      currentBreakpoint: breakpoint,
    });
  };

  onCompactTypeChange = () => {
    const { compactType: oldCompactType } = this.state;
    const compactType =
      oldCompactType === 'horizontal' ? 'vertical' : oldCompactType === 'vertical' ? null : 'horizontal';
    this.setState({ compactType });
  };

  onLayoutChange = (layout, layouts) => {
    (this.props as any).onLayoutChange(layout, layouts);
  };

  onNewLayout = () => {
    this.setState({
      layouts: { lg: generateLayout() },
    });
  };

  onDrop = (layout, layoutItem, _event) => {
    alert(`Dropped element props:\n${JSON.stringify(layoutItem, ['x', 'y', 'w', 'h'], 2)}`);
    layoutItem.h = 7;
    layoutItem.w = 4;
    layout.map(item => {
      if (item.i === '__dropping-elem__') {
        item.h = 6;
        item.w = 5;
      }
    });
    console.log(111, this.state.layouts);
    console.log(_event);
    this.setState({
      layouts: { lg: addLayout(layout) },
    });
  };

  render() {
    return (
      <div>
        <div>
          Current Breakpoint: {this.state.currentBreakpoint} ({(this.props as any).cols[this.state.currentBreakpoint]}{' '}
          columns)
        </div>
        <div>Compaction type: {_.capitalize(this.state.compactType) || 'No Compaction'}</div>
        <button onClick={this.onNewLayout}>Generate New Layout</button>
        <button onClick={this.onCompactTypeChange}>Change Compaction Type</button>
        <div
          className="droppable-element"
          draggable={true}
          unselectable="on"
          // this is a hack for firefox
          // Firefox requires some kind of initialization
          // which we can do by adding this attribute
          // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
          onDragStart={e => e.dataTransfer.setData('text/plain', '')}
        >
          Droppable Element (Drag me!)
        </div>
        <ResponsiveReactGridLayout
          {...this.props}
          layouts={this.state.layouts}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          onDrop={this.onDrop}
          // WidthProvider option
          measureBeforeMount={false}
          // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
          // and set `measureBeforeMount={true}`.
          useCSSTransforms={this.state.mounted}
          compactType={this.state.compactType}
          preventCollision={!this.state.compactType}
          isDroppable={true}
        >
          {this.generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

function generateLayout() {
  return _.map(_.range(0, 5), function (item, i) {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: Math.round(Math.random() * 5) * 2,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: false, //Math.random() < 0.05,
    };
  });
}
function addLayout(arr: any) {
  return _.map(arr, function (item, i) {
    if (item.i === '__dropping-elem__') {
      return {
        x: Math.round(Math.random() * 5) * 2,
        y: 2,
        w: 6,
        h: 3,
        i: i.toString(),
        static: false, //Math.random() < 0.05,
      };
    }
    return item;
  });
}

// if (process.env.STATIC_EXAMPLES === 'true') {
//   import("../test-hook.jsx").then(fn => fn.default(DragFromOutsideLayout));
// }

// import { DBTableName } from '@src/services';
// import { Card, Layout } from '@tencent/tea-component';
// import React, { useEffect, useRef, useState } from 'react';
// import GridLayout from 'react-grid-layout';
// import { useIndexedDB } from 'react-indexed-db';

// const { Body, Content } = Layout;
// const layout_test = [
//   { i: 'a', x: 0, y: 0, w: 2, h: 2 },
//   { i: 'b', x: 1, y: 0, w: 3, h: 2 },
// ];
// const dataTest = [
//   { id: 'id1', items: [{ name: 'name1-1' }, { name: 'name1-2' }, { name: 'name1-3' }, { name: 'name1-4' }] },
//   { id: 'id2', items: [{ name: 'name2-1' }, { name: 'name2-2' }] },
//   { id: 'id3', items: [{ name: 'name3-1' }, { name: 'name3-2' }, { name: 'name3-3' }, { name: 'name3-4' }] },
// ];
// let items = [1, 2, 3];
// const Configuration: React.FC = props => {
//   const [dataList, setDataList] = useState<any[]>([]);
//   const { add, getAll, update, deleteRecord } = useIndexedDB(DBTableName.business);
//   const [layout, setLayout] = useState([]);

//   let refContainer = useRef(null);

//   // 拉取数据
//   const fetchList = () => {
//     getAll()
//       .then(data => {
//         console.log(data, 123);
//         setDataList(dataTest);
//       })
//       .catch(() => {});
//   };

//   // 首次打开页面加载 第二个参数需要是空数组保证只加载一次
//   useEffect(() => {
//     fetchList();
//   }, []);

//   const handleWidthChange = (ev?: any) => {
//     console.log(333, ev);
//     let innerDiv = document.getElementsByClassName('grid-inner');
//     let groupDiv = document.getElementsByClassName('my-grid-group');
//     console.log(innerDiv);
//     if (!innerDiv) {
//       return;
//     }
//     ev.map((item, index) => {
//       const maxHeight = (50 + 40) * dataList[index].items.length;
//       const maxWidth = (50 + 40) * dataList[index].items.length;
//       const innerHeight = (innerDiv[index] as any).offsetHeight;
//       const innerWidth = (innerDiv[index] as any).offsetWidth;
//       const groupHeight = (groupDiv[index] as any).offsetHeight;
//       const groupWidth = (groupDiv[index] as any).offsetWidth;
//       if (groupHeight >= maxHeight && groupHeight > innerHeight) {
//         console.log('1');
//         item.h = Math.ceil((maxHeight / 110) * 3);
//       } else {
//         console.log('2');
//         item.h = Math.ceil((innerHeight / 110) * 3);
//       }
//       if (groupWidth >= maxWidth) {
//         console.log('3');
//         item.w = Math.ceil((maxWidth / 783) * 8);
//         item.h = Math.ceil((innerHeight / 110) * 3);
//       } else if (groupWidth < 50 + 40) {
//         console.log('4');
//         item.w = Math.ceil((90 / 783) * 8);
//       } else {
//         if (groupWidth > innerWidth) {
//           console.log('5');
//           item.w = Math.ceil((innerWidth / 783) * 8);
//           item.h = Math.ceil((innerHeight / 110) * 3);
//         }
//       }
//     });
//   };
//   const formatterLayout = data => {
//     if (!data) {
//       return;
//     }
//     let arr = [];
//     let innerDiv = document.getElementsByClassName('grid-inner');

//     data.map((itm: any, index: string | number) => {
//       let obj = { i: 'id' + index, x: index, y: 0, w: 2, h: 2 };
//       let heightInit = 1;
//       let widhtInit = 1;
//       let len = itm.items.length;
//       if (len >= 2) {
//         widhtInit = Math.ceil((((50 + 40) * 2) / 783) * 8);
//         heightInit = Math.ceil((((50 + 40) * (len / 2)) / 110) * 3);
//       }
//       obj.h = heightInit;
//       obj.w = widhtInit;
//       console.log('arr::11111', arr);
//       arr.push(obj);
//     });
//     return arr;
//   };
//   // const handle = ev => {
//   //   console.log(999, ev);
//   //   handleWidthChange(ev);
//   // };
//   useEffect(() => {
//     let arr = formatterLayout(dataList);
//     console.log('arr:::', arr);
//     setLayout((): any => {
//       return [...arr];
//     });
//     console.log(layout);
//   }, [dataList]);

//   return (
//     <Body>
//       <Content>
//         <Content.Header title="架构图"></Content.Header>
//         <Content.Body>
//           <Card>
//             <Card.Body style={{ height: '600px' }}>
//               <GridLayout
//                 className="layout"
//                 layout={[]}
//                 cols={12}
//                 rowHeight={30}
//                 width={1200}
//                 onResizeStop={handleWidthChange}
//                 // compactType={'horizontal'}
//                 // onLayoutChange={handle}
//                 useCSSTransforms={true}
//                 innerRef={refContainer}
//               >
//                 {dataList.map(dlist => {
//                   return (
//                     <div className="my-grid-group" key={dlist.id}>
//                       <div className="grid-inner">
//                         {dlist.items.map((item, index) => {
//                           return (
//                             <div className="my-grid-item" style={{}} key={index}>
//                               {item.name}
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </GridLayout>
//             </Card.Body>
//           </Card>
//         </Content.Body>
//       </Content>
//     </Body>
//   );
// };

// export default Configuration;
