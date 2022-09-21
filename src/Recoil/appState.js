import { atom } from "recoil";

import { recoilPersist } from 'recoil-persist'
//Recoil持久化存储，默认为localStroge
const { persistAtom } = recoilPersist()
//设置原始数据，atom派生出其他数据key-value形式存在
export const videoState = atom(
  {
    key: "videoState",
    default: [],
    effects_UNSTABLE: [persistAtom],
  }, {
  key: "classD",
  default: '123',
  effects_UNSTABLE: [persistAtom],
}
);
export const classState = atom(
  {
    key: "classState",
    default: '123',
    effects_UNSTABLE: [persistAtom],
  }
);

//依赖的 atom 发生变更时，selector 代表的值会自动更新(相当于getter)
/* export const powerState = selector({
    key: "powerState",
    get: ({ get }) => {
      const content = get(videoState);
      return content.data;
    },
  }); */