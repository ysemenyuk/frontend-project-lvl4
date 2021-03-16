import faker from 'faker';
import Cookies from 'js-cookie';

export default () => {
  const existingNickname = Cookies.get('nickname');
  console.log({ existingNickname });

  if (existingNickname !== undefined) {
    return { nickname: existingNickname };
  }

  const newNickname = faker.name.findName();
  Cookies.set('nickname', newNickname);
  console.log({ newNickname });
  return { nickname: newNickname };
};
