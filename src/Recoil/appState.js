import { atom } from "recoil";

//设置原始数据，atom派生出其他数据key-value形式存在
export const videoState = atom({
    key: "videoState",
    default: '',
});

//依赖的 atom 发生变更时，selector 代表的值会自动更新(相当于getter)
/* export const powerState = selector({
    key: "powerState",
    get: ({ get }) => {
      const content = get(videoState);
      return content.data;
    },
  }); */