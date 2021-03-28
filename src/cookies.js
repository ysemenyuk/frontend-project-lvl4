import faker from 'faker';
import Cookies from 'js-cookie';

export default () => {
  const nickname = Cookies.get('nickname') ? Cookies.get('nickname') : faker.name.findName();
  Cookies.set('nickname', nickname, { expires: 7 });
  return { nickname };
};
