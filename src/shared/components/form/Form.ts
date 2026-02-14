import { Block, BlockProps } from '../../../core';
import { Input } from '../input';

export abstract class Form<T> extends Block {
  constructor(props: BlockProps) {
    super(props);

    this._setSubmit();
  }

  get rawValue(): T {
    return Object.fromEntries(this._inputs.map((input) => [input.name, input.value])) as T;
  }

  private get _inputs() {
    return Object.values(this.children).filter((child) => child instanceof Input);
  }

  protected get inputs() {
    return this._inputs;
  }

  protected abstract _handleSubmit(event: Event): void;

  private _setSubmit() {
    this.setProps({
      events: {
        submit: this._handleSubmit.bind(this),
      },
    });
  }

  protected _validateForm(): boolean {
    let isValid = true;

    for (const input of this._inputs) {
      if (!input.validate()) {
        isValid = false;
      }
    }

    if (!isValid) {
      console.log('Данные не валидны');
    }

    return isValid;
  }

  protected _toggleFormDisabled(disabled: boolean) {
    this._toggleFormInputsDisabled(disabled);
    this._toggleFormSubmitButtonDisabled(disabled);
  }

  protected _toggleFormInputsDisabled(disabled: boolean) {
    for (const input of this._inputs) {
      input.setProps({ disabled });
    }
  }

  protected _toggleFormSubmitButtonDisabled(disabled: boolean) {
    const { submitButton } = this.children;

    submitButton.setProps({ disabled });
  }

  protected _clearAllInputs() {
    this._inputs.forEach((input) => {
      input.setProps({
        value: '',
      });
    });
  }
}
