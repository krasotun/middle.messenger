import { v4 as makeUUID } from 'uuid';

import { EventBus } from './EventBus.ts';

const enum Block_Events {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}

export type BlockProps = Record<string, unknown> & {
  events?: Record<string, EventListenerOrEventListenerObject>;
  settings?: { withInternalID?: boolean };
  __id?: string;
};

export abstract class Block<P extends BlockProps = BlockProps> {
  private readonly _eventBus = new EventBus();

  private _element: HTMLElement | null = null;

  private readonly _id: string | null;

  protected props: P;

  protected children: Record<string, Block> = {};

  get element(): HTMLElement {
    if (!this._element) {
      throw new Error('Element is not initialized');
    }
    return this._element;
  }

  constructor(propsAndChildren = {} as P) {
    const { children, props } = this._getChildren(propsAndChildren);

    this.children = children;

    const withId = props.settings?.withInternalID;

    this._id = withId ? makeUUID() : null;
    this.props = this._makePropsProxy({
      ...props,
      ...(withId ? { __id: this._id } : {}),
    } as P);

    this._registerEvents();
    this._eventBus.emit(Block_Events.INIT);
  }

  abstract render(): string;

  setProps = (nextProps: P) => {
    Object.assign(this.props, nextProps);
  };

  dispatchComponentDidMount() {
    this._eventBus.emit(Block_Events.FLOW_CDM);
  }

  private _init() {
    this._eventBus.emit(Block_Events.FLOW_RENDER);
  }

  private _componentDidMount() {}

  private _componentDidUpdate() {
    this._eventBus.emit(Block_Events.FLOW_RENDER);
  }

  private _registerEvents() {
    this._eventBus.on(Block_Events.INIT, this._init.bind(this));
    this._eventBus.on(Block_Events.FLOW_CDM, this._componentDidMount.bind(this));
    this._eventBus.on(Block_Events.FLOW_CDU, this._componentDidUpdate.bind(this));
    this._eventBus.on(Block_Events.FLOW_RENDER, this._render.bind(this));
  }

  private _render() {
    const template = document.createElement('template');
    template.innerHTML = this.render().trim();

    const nextElement = template.content.firstElementChild;
    if (!nextElement) {
      throw new Error('Render returned empty template');
    }

    if (this._element) {
      this._removeEventListeners();
      this._element.replaceWith(nextElement);
    }

    this._element = nextElement as HTMLElement;
    if (this._id) {
      this._element.setAttribute('data-block-id', this._id);
    }

    this._addEventListeners();
  }

  private _addEventListeners(): void {
    const { events } = this.props;
    if (!events) {
      return;
    }

    Object.entries(events).forEach(([eventName, handler]) => {
      this._element?.addEventListener(eventName, handler);
    });
  }

  private _removeEventListeners(): void {
    const { events } = this.props;
    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([eventName, handler]) => {
      this._element?.removeEventListener(eventName, handler);
    });
  }

  private _makePropsProxy(props: P): P {
    return new Proxy(props, {
      set: (target, key: string, value: unknown) => {
        if (!(key in target)) {
          throw new Error('Cannot set property');
        }

        // eslint-disable-next-line no-param-reassign
        (target as Record<string, unknown>)[key] = value;
        this._eventBus.emit(Block_Events.FLOW_CDU);
        return true;
      },
      deleteProperty: () => {
        throw new Error('нет доступа');
      },
    });
  }

  private _getChildren(propsAndChildren: P): {
    children: Record<string, Block>;
    props: P;
  } {
    const children: Record<string, Block> = {};

    const props: Record<string, unknown> = {};

    const isBlock = (value: unknown): value is Block => value instanceof Block;

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (isBlock(value)) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props: props as P };
  }
}
