import React from "react";
import Reconciler from "react-reconciler";
import { unstable_now as now } from "scheduler";

import { pascalCase, pruneKeys, shallowCompare } from "./utils";
import { RootNode } from "./Win95";

type NodeType = (
  | RootNode
  | { type: "text"; content: string }
  | {
      type: "w95Window";
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
        onCommand?: () => void;
      };
    }
) & { root: RootNode };

let incremental = 3;
function getIncremental() {
  return incremental++;
}

function createInstance(
  type: string,
  { type: windowType, ...props }: any,
  rootContainer
) {
  return {
    type: type,
    props: { windowType, ...props },
    id: getIncremental(),
    root: rootContainer.root,
  };
}

function createTextInstance(newText: string, rootContainerInstance: RootNode) {
  return { type: "text", content: newText };
}

function appendChild(parentInstance: NodeType, child: NodeType) {
  if (child.type === "w95Window" && parentInstance.type !== "text") {
    child.root.api.createWindow({
      id: child.id,
      type: child.props.windowType,
      text: child.props.text || "",
      params: child.props.params,
      x: child.props.x,
      y: child.props.y,
      w: child.props.w,
      h: child.props.h,
      parentId: parentInstance.id,
      menuId: child.id,
      extStyle: child.props.extStyle || 0,
    });
    if (child.props.onCommand) {
      child.root.events.set(child.id, child.props.onCommand);
    }
  }

  if (child.type === "text" && parentInstance.type === "w95Window") {
    parentInstance.props.text = child.content;
  }
}

function removeChild(parentInstance: NodeType, child: NodeType) {
  if (child.type === "w95Window" && parentInstance.type !== "text") {
    child.root.events.delete(child.id);
    parentInstance.root.api.destroyWindow(child.id);
  }
}

function insertBefore(
  parentInstance: NodeType,
  child: NodeType,
  beforeChild: NodeType
) {
  console.log("insertBefore", { parentInstance, child, beforeChild });
}

function applyProps(instance: NodeType, newProps, oldProps) {
  console.log("applyProps", { instance, newProps, oldProps });
}

export const reconciler = Reconciler({
  supportsMutation: true,

  // We set this to false because this can work on top of react-dom
  isPrimaryRenderer: false,

  // We can modify the ref here, but we return it instead (no-op)
  getPublicInstance: (instance) => instance,

  // This object that's passed into the reconciler is the host context.
  // We don't need to expose it though
  getRootHostContext: () => ({}),
  getChildHostContext: () => ({}),

  prepareUpdate(
    instance: NodeType,
    type: string,
    oldProps: any,
    newProps: any
  ) {
    return true;
  },

  // This lets us store stuff before React mutates our OL objects.
  // We don't do anything here but return an empty object
  prepareForCommit: () => null,
  resetAfterCommit: () => ({}),

  shouldSetTextContent: (type: string, props: any) => false,

  // We can mutate objects once they're assembled into the scene graph here.
  // applyProps removes the need for this though
  finalizeInitialChildren: () => false,

  // This can modify the container and clear children.
  // Might be useful for disposing on demand later
  clearContainer: () => false,

  // This is where we'll create an element from a React element
  createInstance,
  createTextInstance,

  // These methods add elements to the scene
  appendChild,
  appendInitialChild: appendChild,
  appendChildToContainer: appendChild,

  // These methods remove elements from the scene
  removeChild,
  removeChildFromContainer: removeChild,

  insertBefore,

  insertInContainerBefore: (parentInstance, child, beforeChild) =>
    insertBefore(parentInstance, child, beforeChild),

  // This is where we mutate OL objects in the render phase
  commitUpdate(
    instance: any,
    diff,
    type,
    oldProps: Record<string, unknown>,
    newProps: Record<string, unknown>,
    fiber: Reconciler.Fiber
  ) {
    applyProps(instance, newProps, oldProps);
  },

  hideInstance(instance: any) {},
  unhideInstance(instance: any, props: Record<string, unknown>) {},
  hideTextInstance() {},

  supportsPersistence: false,
  supportsHydration: false,
  preparePortalMount() {},
  now,
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  noTimeout: -1,
});
