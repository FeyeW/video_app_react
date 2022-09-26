import { atom, selector } from "recoil";

import { recoilPersist } from 'recoil-persist'
//Recoil持久化存储，默认为localStroge
const { persistAtom } = recoilPersist()

import { getVideoClass } from '../api'
//视频推荐拿到的推荐列表
export const videoState = atom(
  {
    key: "videoState",
    default: '',
    effects_UNSTABLE: [persistAtom],
  }
);
//点击推荐列表拿到的类似列表
export const classState = atom(
  {
    key: "classState",
    default: '',
    effects_UNSTABLE: [persistAtom],
  }
);
//点击视频列表拿到的视频详情
export const clickVideoState = atom(
  {
    key: "clickVideoState",
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