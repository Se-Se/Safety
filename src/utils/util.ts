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

export const tableColumns = (columns: any) => {
  const allColumns = [
    {
      key: 'businessId',
      header: '业务ID',
    },
    {
      key: 'businessName',
      header: '业务名称',
    },
    {
      key: 'part',
      header: '所属部门',
    },
    {
      key: 'businessKinds',
      header: '业务分类',
    },
    {
      key: 'systemConId',
      header: '系统架构ID',
    },
    {
      key: 'configurationName',
      header: '架构名称',
    },
    {
      key: 'connectArea',
      header: '相关分区',
    },
    {
      key: 'conSystem',
      header: '相关系统',
    },
    {
      key: 'configurationPic',
      header: '架构图',
    },
    {
      key: 'addMen',
      header: '添加人',
    },
    {
      key: 'createdAt',
      header: '添加时间',
    },
    {
      key: 'action',
      header: '操作',
    },
  ];
  let arr = [];
  allColumns.map(item => {
    if (columns.indexOf(item.key) > -1) {
      arr.push(item);
    }
  });
  console.log(999, arr);
  return arr;
};
