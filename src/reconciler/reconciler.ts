import Reconciler from 'react-reconciler';
import { unstable_now as now } from 'scheduler';

import { RootNode } from './Win95';

type NodeType =
  | (
      | RootNode
      | { type: 'text'; content: string }
      | {
          type: 'w95Window';
          id: number;
          props: {
            extStyle?: number;
            windowType: string;
            text?: string;
            params: number;
            x: number;
            y: number;
            w: number;
            h: number;
            menuId?: number;
            onEvent?: () => void;
          };
        }
    ) & { root: RootNode; children?: NodeType[] };

let incremental = 3;
function getIncremental() {
  return incremental++;
}

function appendChild(parentInstance: NodeType, child: NodeType) {
  // console.log('appendChild', { parentInstance, child });

  if (child.type === 'w95Window' && parentInstance.type !== 'text') {
    child.root.api.createWindow({
      id: child.id,
      type: child.props.windowType,
      text: child.props.text || '',
      params: child.props.params,
      x: child.props.x,
      y: child.props.y,
      w: child.props.w,
      h: child.props.h,
      parentId: parentInstance.id || 0,
      menuId: child.props.menuId !== undefined ? child.props.menuId : child.id || 0,
      extStyle: child.props.extStyle || 0,
    });
    if (child.props.onEvent) {
      child.root.events.set(child.id, child.props.onEvent);
    }
  }
}

function appendChildToContainer(parentInstance: NodeType, child: NodeType) {
  // console.log('appendChildToContainer', { parentInstance, child });

  appendChild(parentInstance, child);
  child.children?.forEach(c => appendChildToContainer(child, c));
}

function removeChild(parentInstance: NodeType, child: NodeType) {
  if (child.type === 'w95Window' && parentInstance.type !== 'text') {
    child.root.events.delete(child.id);
    parentInstance.root.api.destroyWindow(child.id);
  }
}

export const reconciler = Reconciler({
  getPublicInstance: i => i,
  getRootHostContext: () => ({}),
  getChildHostContext: () => ({}),
  prepareForCommit: () => null,
  resetAfterCommit: () => ({}),
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  noTimeout: -1,
  now,
  isPrimaryRenderer: false,
  supportsMutation: true,
  supportsPersistence: false,
  supportsHydration: false,
  preparePortalMount: () => {},
  hideInstance: () => {},
  hideTextInstance: () => {},
  unhideInstance: () => {},
  unhideTextInstance: () => {},
  clearContainer: () => false,

  createInstance(type: string, { type: windowType, ...props }: any, rootContainer: any) {
    return {
      type: type as any,
      props: { windowType, ...props },
      id: getIncremental(),
      root: rootContainer.root,
    };
  },
  createTextInstance(newText: string, rootContainerInstance: RootNode) {
    return { type: 'text', content: newText };
  },

  appendInitialChild(parentInstance: NodeType, child: NodeType) {
    // console.log('appendInitialChild', { parentInstance, child });
    if (child.type === 'text' && parentInstance.type === 'w95Window') {
      parentInstance.props.text = child.content;
    } else {
      parentInstance.children = parentInstance.children || [];
      parentInstance.children.push(child);
    }
  },

  // We can mutate objects once they're assembled into the scene graph here.
  // applyProps removes the need for this though
  finalizeInitialChildren(instance, type, props) {
    // console.log('finalizeInitialChildren', { instance, type, props });
    return false;
  },

  prepareUpdate: (instance: NodeType, type: string, oldProps: any, newProps: any) => {
    console.log('prepareUpdate', { instance, type, oldProps, newProps });
    return true;
  },

  shouldSetTextContent: (type: string, props: any) => {
    // console.log('shouldSetTextContent', { type, props });
    return false;
  },

  // -------------------
  //      Mutation
  //     (optional)
  // -------------------
  appendChild,
  appendChildToContainer,

  commitTextUpdate(instance: NodeType, oldText: string, newText: string) {
    // console.log('commitTextUpdate', { instance, oldText, newText });
  },

  commitMount: p => console.log('commitMount', p),

  commitUpdate(instance: NodeType, diff, type, oldProps: Record<string, unknown>, newProps: Record<string, unknown>, fiber: Reconciler.Fiber) {
    // console.log('commitUpdate', { instance, diff, type, oldProps, newProps, fiber });

    if (instance.type === 'w95Window') {
      if (typeof newProps.children === 'string' && newProps.children !== oldProps.children) {
        instance.root.api.setWindowText(instance.id, newProps.children);
      } else if (newProps.x !== oldProps.x || newProps.y !== oldProps.y || newProps.w !== oldProps.w || newProps.h !== oldProps.h) {
        instance.root.api.setWindowPos(instance.id, newProps.x, newProps.y, newProps.w, newProps.h);
      }
    }
  },

  insertBefore: p => console.log('insertBefore', p),
  insertInContainerBefore: (parentInstance, child, beforeChild) => console.log('insertInContainerBefore', { parentInstance, child, beforeChild }),

  removeChild: p => console.log('removeChild', p),
  removeChildFromContainer: p => console.log('removeChildFromContainer', p),

  resetTextContent: p => console.log('resetTextContent', p),
});
