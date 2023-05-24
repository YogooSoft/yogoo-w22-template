import { ThemeEnum } from '../enums/appEnum';

export const prefixCls = process.env.VUE_APP_GLOB_APP_TITLE;

export const darkMode = ThemeEnum.LIGHT;

// app theme preset color
// 应用程序主题预设颜色 
export const APP_PRESET_COLOR_LIST: string[] = [
  '#0960bd',
  '#0084f4',
  '#009688',
  '#536dfe',
  '#ff5c93',
  '#ee4f12',
  '#0096c7',
  '#9c27b0',
  '#ff9800',
];

// header preset color
// 标题预设颜色
export const HEADER_PRESET_BG_COLOR_LIST: string[] = [
  '#ffffff',
  '#151515',
  '#009688',
  '#5172DC',
  '#018ffb',
  '#409eff',
  '#e74c3c',
  '#24292e',
  '#394664',
  '#001529',
  '#383f45',
];

// sider preset color
// 前景颜色页面预设颜色
export const SIDE_BAR_BG_COLOR_LIST: string[] = [
  '#001529',
  '#212121',
  '#273352',
  '#ffffff',
  '#191b24',
  '#191a23',
  '#304156',
  '#001628',
  '#28333E',
  '#344058',
  '#383f45',
];
