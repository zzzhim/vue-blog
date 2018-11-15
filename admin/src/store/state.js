import { getToken, setToken, removeToken } from "../utils/auth";

const state =  {
  //全局变量
  token: getToken(), // 登录的凭证
  // removeToken: removeToken(),
  username:'', // 当前登录的用户名称
  // 正在编辑的文章的id
  id: '',
  // 编辑文章的标题
  title: '',
  // 编辑文章的标签列表
  tags: '',
  // 编辑文章的内容
  content: '',
  // 文章是否发布
  isPublished: '',

  toggleDelete: false
}

export default state