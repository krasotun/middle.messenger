import { Block, type BlockProps } from '../../../core/Block.ts';
import { InputValidator } from '../../../types/input-validator.type.ts';

import template from './Input.hbs';
import './Input.css';

type ValueValidator = ReturnType<InputValidator>;

type InputProps = BlockProps & {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'number' | 'file';
  validators?: ValueValidator[];
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  isValid?: boolean;
  errorMessage?: string;
  events?: {
    input?: (event: Event) => void;
    blur?: (event: Event) => void;
    focus?: (event: Event) => void;
  };
};

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super({
      ...props,
      value: props.value ?? '',
      isValid: props.isValid ?? true,
      errorMessage: props.errorMessage ?? '',
      events: {
        ...(props.events ?? {}),
      },
    });

    this._setHandlers();
  }

  get name(): string {
    return this.props.name;
  }

  get value(): string | undefined {
    return this.props.value;
  }

  render(): DocumentFragment {
    return this.renderTemplate(template);
  }

  protected componentDidUpdate(oldProps: InputProps, newProps: InputProps): boolean {
    if (oldProps.value === newProps.value) {
      return true;
    }

    const metaKeys: Array<keyof InputProps> = [
      'isValid',
      'errorMessage',
      'disabled',
      'placeholder',
      'label',
      'type',
      'name',
    ];

    return metaKeys.some((key) => oldProps[key] !== newProps[key]);
  }

  public validate(): boolean {
    const value = this.props.value ?? '';
    const invalidValidators = this._collectInvalidValidators(value);
    const isValid = invalidValidators.length === 0;
    const message = this._buildErrorMessage(invalidValidators);
    this.setProps({ isValid, errorMessage: message });
    return isValid;
  }

  private _collectInvalidValidators(value: string): string[] {
    const { validators } = this.props;
    if (!validators || validators.length === 0) {
      return [];
    }

    const invalidValidators: string[] = [];
    for (const validator of validators) {
      if (!validator(value)) {
        invalidValidators.push(validator.name || 'invalid');
      }
    }

    return invalidValidators;
  }

  private _buildErrorMessage(invalidValidators: string[]): string {
    if (invalidValidators.length === 0) {
      return '';
    }

    return invalidValidators.map((name) => Input._messageFromValidatorName(name)).join(' ');
  }

  private static _messageFromValidatorName(name: string): string {
    switch (name) {
      case 'minLength':
        return 'Минимальная длина';
      case 'maxLength':
        return 'Максимальная длина';
      case 'email':
        return 'Некорректный email';
      case 'login':
        return 'Некорректный логин';
      case 'name':
        return 'Некорректное имя';
      case 'password':
        return 'Некорректный пароль';
      case 'emptyValue':
        return 'Поле должно быть пустым';
      default:
        return 'Некорректное значение';
    }
  }

  private _setHandlers(): void {
    this.setProps({
      events: {
        ...(this.props.events ?? {}),
        'focus:input': this._handleFocusEvents,
        'input:input': this._handleInputEvents,
        'blur:input': this._handleBlurEvents,
      },
    });
  }

  private _handleBlurEvents = (event: Event) => {
    const { value } = event.target as HTMLInputElement;
    this.setProps({ value });
    this.validate();
  };

  private _handleFocusEvents = (event: Event) => {
    console.log(event);
  };

  private _handleInputEvents = (event: Event) => {
    const { value } = event.target as HTMLInputElement;
    this.setProps({ value });
  };
}
