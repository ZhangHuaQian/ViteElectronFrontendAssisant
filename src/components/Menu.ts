interface MenuItem {
  name: string,
  to: string,
  icon: any,
}

import { ProjectOutlined, ReadOutlined, ToolOutlined, IssuesCloseOutlined, CodeOutlined } from "@ant-design/icons-vue";
export const MenuItem: MenuItem[] = [
  {
    name: '项目管理',
    to: '/Program',
    icon: ProjectOutlined,

  },
  {
    name: '政采云前端小报',
    to: '/Zoom',
    icon: ReadOutlined
  },
  {
    name: '技术类文章管理',
    to: '/TechnicalArticles',
    icon: ToolOutlined
  },
  {
    name: '问题集锦',
    to: '/Issue',
    icon: IssuesCloseOutlined
  },
  {
    name: '代码片段',
    to: '/Code',
    icon: CodeOutlined
  }
]
