const {AntColorList} = require("../modal/smart-operation");

/**
 * 获取背景色
 */
export const GetAntBgcColor = (code) => {
  const nameItem = AntColorList.find(item => item.code === code);
  if (nameItem) {
    return nameItem.backColor;
  } else {
    return  '--';
  }
}
export const GetAntColor = (code) => {
  const nameItem = AntColorList.find(item => item.code === code);
  if (nameItem) {
    return nameItem.color;
  } else {
    return  '--';
  }
}