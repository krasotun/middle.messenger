import { Block, type BlockProps } from './Block.ts';
import { AppState, Store, StoreEvents } from './Store.ts';

type BlockCtor<P extends BlockProps = BlockProps> = new (props: P) => Block<P>;

export function connect<P extends BlockProps>(
  Component: BlockCtor<P>,
  mapStateToProps: (state: AppState) => Partial<P>,
) {
  const store = new Store();

  return class extends Component {
    constructor(props: P) {
      super({ ...props, ...mapStateToProps(store.getState()) });
      store.on(StoreEvents.Updated, () => {
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
}
