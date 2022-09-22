import { atom, selector } from "recoil";

import { recoilPersist } from 'recoil-persist'
//Recoil持久化存储，默认为localStroge
const { persistAtom } = recoilPersist()

import { getVideoClass } from '../api'
//设置原始数据，atom派生出其他数据key-value形式存在
export const videoState = atom(
  {
    key: "videoState",
    default: '',
    effects_UNSTABLE: [persistAtom],
  }
);
export const classState = atom(
  {
    key: "classState",
    default: '',
    effects_UNSTABLE: [persistAtom],
  }
);
export const classIndexState = atom(
  {
    key: "classIndex",
    default: '',
    effects_UNSTABLE: [persistAtom],
  }
);

//依赖的 atom 发生变更时，selector 代表的值会自动更新(相当于getter)
export const powerState = selector({
  key: 'powerState',
  get: async ({ get }) => {
    const res = await getVideoClass({
      userID: get(currentUserIDState),
    });
    return response.name;
  },
})