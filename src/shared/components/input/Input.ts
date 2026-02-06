import { Block, type BlockProps } from '../../../core';
import { InputValidator } from '../../../types/input-validator.type.ts';

import template from './Input.hbs';
import './Input.css';

type ValueValidator = ReturnType<InputValidator>;

enum ValidatorMessage {
  MinLength = 'Минимальная длина',
  MaxLength = 'Максимальная длина',
  Email = 'Некорректный email',
  Login = 'Некорректный логин',
  Name = 'Некорректное имя',
  Password = 'Некорректный пароль',
  Phone = 'Некорректный телефон',
  Required = 'Обязательное поле',
  Default = 'Некорректное значение',
}

export type InputProps = BlockProps & {
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
  private _isFocused = false;
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
    const metaKeys: Array<keyof InputProps> = [
      'isValid',
      'errorMessage',
      'disabled',
      'placeholder',
      'label',
      'type',
      'name',
    ];

    const metaChanged = metaKeys.some((key) => oldProps[key] !== newProps[key]);
    const valueChanged = oldProps.value !== newProps.value;

    if (valueChanged && !metaChanged && this._isFocused) {
      return false;
    }

    return valueChanged || metaChanged;
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
    const map: Record<string, ValidatorMessage> = {
      minLength: ValidatorMessage.MinLength,
      maxLength: ValidatorMessage.MaxLength,
      email: ValidatorMessage.Email,
      login: ValidatorMessage.Login,
      name: ValidatorMessage.Name,
      password: ValidatorMessage.Password,
      phone: ValidatorMessage.Phone,
      required: ValidatorMessage.Required,
    };

    return map[name] ?? ValidatorMessage.Default;
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
    this._isFocused = false;
    const { value } = event.target as HTMLInputElement;
    this.setProps({ value });
    this.validate();
  };

  private _handleFocusEvents = (_event: Event) => {
    this._isFocused = true;
  };

  private _handleInputEvents = (event: Event) => {
    const { value } = event.target as HTMLInputElement;
    this.setProps({ value });
  };
}
