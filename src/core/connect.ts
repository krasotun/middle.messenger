import { Block, type BlockProps } from './Block.ts';
import { AppState, Store, StoreEvents } from './Store.ts';

type BlockCtor = new (props: BlockProps) => Block;

export function connect(
  Component: BlockCtor,
  mapStateToProps: (state: AppState) => Partial<BlockProps>,
) {
  const store = new Store();

  return class extends Component {
    constructor(props: BlockProps) {
      super({ ...props, ...mapStateToProps(store.getState()) });
      store.on(StoreEvents.Updated, () => {
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
}
