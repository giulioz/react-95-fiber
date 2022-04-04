import Reconciler from 'react-reconciler';
import { unstable_now as now } from 'scheduler';
import { GWL_EXSTYLE, GWL_STYLE, WM_SETFONT } from '../emulator95/constants';

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
      | {
          type: 'w95Font';
          handle: number;
          props: {
            width?: number;
            height?: number;
            weight?: number;
            italic?: boolean;
            underline?: boolean;
            strikeOut?: boolean;
            faceName?: string;
          };
        }
    ) & { root: RootNode; children?: NodeType[] };

let incremental = 3;
function getIncremental() {
  return incremental++;
}

async function appendChild(parentInstance: NodeType, child: NodeType) {
  // console.log('appendChild', { parentInstance, child });

  if (child.type === 'w95Window') {
    const menuId = child.props.menuId !== undefined ? child.props.menuId : child.id || 0;
    child.root.api.createWindow({
      id: child.id,
      type: child.props.windowType,
      text: child.props.text || '',
      params: child.props.params,
      x: child.props.x,
      y: child.props.y,
      w: child.props.w,
      h: child.props.h,
      parentId: parentInstance.type === 'w95Window' ? parentInstance.id : 0,
      menuId,
      extStyle: child.props.extStyle || 0,
    });
    if (child.props.onEvent) {
      if (!child.root.events.get(menuId)) child.root.events.set(menuId, []);
      child.root.events.get(menuId)?.push(child.props.onEvent);
    }
  }

  if (child.type === 'w95Font' && parentInstance.type === 'w95Window') {
    const fontHandle = await child.root.api.createFont({
      lfWidth: child.props.width || 0,
      lfHeight: child.props.height || 0,
      lfWeight: child.props.weight || 0,
      lfItalic: child.props.italic ? 1 : 0,
      lfUnderline: child.props.underline ? 1 : 0,
      lfStrikeOut: child.props.strikeOut ? 1 : 0,
      lfFaceName: child.props.faceName,
    });
    await child.root.api.sendMessage(parentInstance.id, WM_SETFONT, fontHandle, 1);
  }
}

function appendChildToContainer(parentInstance: NodeType, child: NodeType) {
  // console.log('appendChildToContainer', { parentInstance, child });

  appendChild(parentInstance, child);
  child.children?.forEach(c => appendChildToContainer(child, c));
}

function removeChild(parentInstance: NodeType, child: NodeType) {
  if (child.type === 'w95Window') {
    if (child.props.onEvent) {
      const eventChain = child.root.events.get(child.id);
      if (eventChain) {
        const newEventChain = eventChain.filter(e => e !== child.props.onEvent);
        if (newEventChain.length > 0) child.root.events.set(child.id, newEventChain);
        else child.root.events.delete(child.id);
      }
    }

    child.root.api.destroyWindow(child.id);
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
    if (type === 'w95Window') {
      return {
        type,
        props: { windowType, ...props },
        id: getIncremental(),
        root: rootContainer.root,
      };
    } else if (type === 'w95Font') {
      return {
        type,
        props,
        root: rootContainer.root,
      };
    }

    throw new Error('Unknown type!');
  },

  createTextInstance(newText: string) {
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
    // console.log('prepareUpdate', { instance, type, oldProps, newProps });
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

  commitUpdate(
    instance: NodeType,
    diff,
    type,
    oldProps: JSX.IntrinsicElements['w95Window'],
    newProps: JSX.IntrinsicElements['w95Window'],
    fiber: Reconciler.Fiber,
  ) {
    // console.log('commitUpdate', { instance, diff, type, oldProps, newProps, fiber });

    if (instance.type === 'w95Window') {
      if (typeof newProps.children === 'string' && newProps.children !== oldProps.children) {
        instance.root.api.setWindowText(instance.id, newProps.children);
      } else if (Array.isArray(newProps.children)) {
        const text = newProps.children.reduce((acc: string, child) => acc + (typeof child === 'string' ? child : ''), '');
        const oldText = Array.isArray(oldProps.children) && oldProps.children.reduce((acc, child) => (acc + typeof child === 'string' ? child : ''), '');
        if (text !== oldText) instance.root.api.setWindowText(instance.id, text);
      }
      if (typeof newProps.text === 'string' && newProps.text !== oldProps.text) {
        instance.root.api.setWindowText(instance.id, newProps.text);
      }
      if (newProps.x !== oldProps.x || newProps.y !== oldProps.y || newProps.w !== oldProps.w || newProps.h !== oldProps.h) {
        instance.root.api.setWindowPos(instance.id, newProps.x, newProps.y, newProps.w, newProps.h);
      }
      if (newProps.params !== oldProps.params) {
        instance.root.api.setWindowLong(instance.id, GWL_STYLE, newProps.params);
      }
      if (typeof newProps.extStyle === 'number' && newProps.extStyle !== oldProps.extStyle) {
        instance.root.api.setWindowLong(instance.id, GWL_EXSTYLE, newProps.extStyle);
      }
    }
  },

  insertBefore: appendChild,
  insertInContainerBefore: appendChild,

  removeChild,
  removeChildFromContainer: removeChild,

  resetTextContent: p => console.log('resetTextContent', p),
});

reconciler.injectIntoDevTools({
  bundleType: process.env.NODE_ENV === 'production' ? 0 : 1,
  rendererPackageName: 'react-95-fiber',
  version: '0.0.1',
});
