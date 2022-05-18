import Realm from 'realm';
import {MovieSchema} from '../shemas/Movie';

const openConection = () => {
  const realm = Realm.open({
    schema: [MovieSchema],
  });
  return realm;
};

const closeConection = (realm: any) => {
  realm.close();
};

export default {
  openConection,
  closeConection,
};
