import { Block, type BlockProps } from './Block.ts';
import { AppState, Store } from './Store.ts';

export function connect<P extends BlockProps>(
  Component: typeof Block,
  mapStateToProps: (state: AppState) => Partial<P>,
) {
  const store = new Store();

  return class extends Component {
    constructor(props: P) {
      super({ ...props, ...mapStateToProps(store.getState()) } as P);
    }
  };
}
