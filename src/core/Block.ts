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

  abstract render(): DocumentFragment;

  setProps = (nextProps: Partial<P>) => {
    Object.assign(this.props, nextProps);
  };

  dispatchComponentDidMount() {
    this._eventBus.emit(Block_Events.FLOW_CDM);
  }

  protected renderTemplate(
    template: (context?: Record<string, unknown>) => string,
    props: Record<string, unknown> = this.props,
  ): DocumentFragment {
    return this._compile(template, props);
  }

  protected componentDidMount() {}

  protected componentDidUpdate(_oldProps: P, _newProps: P): boolean {
    return true;
  }

  private _init() {
    this._eventBus.emit(Block_Events.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    const shouldRender = this.componentDidUpdate(oldProps, newProps);
    if (shouldRender) {
      this._eventBus.emit(Block_Events.FLOW_RENDER);
    }
  }

  private _registerEvents() {
    this._eventBus.on(Block_Events.INIT, this._init.bind(this));
    this._eventBus.on(Block_Events.FLOW_CDM, this._componentDidMount.bind(this));
    this._eventBus.on(Block_Events.FLOW_CDU, (...args) => {
      const [oldProps, newProps] = args as [P, P];
      this._componentDidUpdate(oldProps, newProps);
    });
    this._eventBus.on(Block_Events.FLOW_RENDER, this._render.bind(this));
  }

  private _render() {
    const fragment = this.render();
    const nextElement = fragment.firstElementChild;
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

        const oldProps = { ...(target as Record<string, unknown>) } as P;
        // eslint-disable-next-line no-param-reassign
        (target as Record<string, unknown>)[key] = value;
        this._eventBus.emit(Block_Events.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error('нет доступа');
      },
    });
  }

  private _getPropsAndStubs(props: Record<string, unknown>): Record<string, unknown> {
    const propsAndStubs: Record<string, unknown> = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (!child._id) {
        throw new Error(`Child component "${key}" must have settings.withInternalID = true`);
      }
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    return propsAndStubs;
  }

  private _compile(
    template: (context?: Record<string, unknown>) => string,
    props: Record<string, unknown>,
  ): DocumentFragment {
    const propsAndStubs = this._getPropsAndStubs(props);
    const fragment = document.createElement('template');
    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      if (!child._id) {
        return;
      }
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (!stub) {
        return;
      }
      stub.replaceWith(child.element);
    });

    return fragment.content;
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
