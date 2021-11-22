import moment from 'moment';

// 判断是否为空值或空字符串
export const isNull = (v: any) => {
  return v === null || typeof v === 'undefined' || v === '';
};

// 格式化时间为指定格式
export const formatDate = (time: string | number | undefined, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!time) {
    return '';
  }
  // 时间戳
  if (isNumber(time)) {
    return moment(parseInt(time as string, 10)).format(format);
  }
  // 时间文本
  if (typeof time === 'string') {
    return moment(time).format(format);
  }
  return '';
};

// 判断字符串是否为 number
export const isNumber = (str: any) => {
  // 只有 string 和 number 才认为是数字 // fixed: Number(moment) 可以通过的问题
  if (isNull(str) || typeof str === 'object' || typeof str === 'boolean') {
    return false;
  }
  const num = Number(str);
  if (Number.isNaN(num)) {
    return false;
  }
  return true;
};
