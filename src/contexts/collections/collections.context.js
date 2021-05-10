import { createContext } from 'react';

import SHOP_DATE from './shop.data';

const CollectionsContext = createContext(SHOP_DATE);

export default CollectionsContext;