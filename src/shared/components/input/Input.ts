import { Block, type BlockProps } from '../../../core/Block.ts';

import template from './Input.hbs';
import './Input.css';

type InputProps = BlockProps & {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'number' | 'file';
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  events?: {
    input?: (event: Event) => void;
    blur?: (event: Event) => void;
    focus?: (event: Event) => void;
  };
};

export class Input extends Block<InputProps> {
  render(): DocumentFragment {
    return this.renderTemplate(template);
  }
}




// Сделать общим можно внутри самого Input, чтобы родителям не писать
// обработчик каждый раз. Идея: если в пропсах есть validators, то Input
// сам добавляет blur‑хендлер и прокидывает результат в setProps.
//
// Концепт (внутри Input, условно):
//
// constructor(props: InputProps) {
//   super({
//     ...props,В
//     events: {
//       ...(props.events ?? {}),
//       'blur:input': (e) => {
//         const value = (e.target as HTMLInputElement).value;
//         const error = runValidation(value, props.validators);
//         this.setProps({ isInvalid: error || false });
//         props.events?.['blur:input']?.(e);
//       },
//     },
//   });
// }

// Так у всех Input будет общая валидация по blur, а если нужно — можно
// добавить свой blur дополнительно, не теряя стандартную логику.
//
//
// › const error = runValidation(value, props.validators);
// это же можно как метод класса сделать?
//
//
// • Да, лучше вынести в метод класса, чтобы не плодить функции в
// конструкторе.
//
//   Концепт:
//
// private runValidation(value: string): string {
//   const validators = this.props.validators ?? [];
//   for (const validate of validators) {
//     const error = validate(value);
//     if (error) return error;
//   }
//   return '';
// }
//
// И в обработчике:
//
//   const error = this.runValidation(value);
// this.setProps({ isInvalid: error || false });

