import * as ElIcons from '@element-plus/icons-vue'

const elementIcons:string[] = [];

for (const name in ElIcons){
  elementIcons.push(name);
}

export default elementIcons;
