// 统一url地址

let apiUrl = {
    // 后台系统用户登录
    login: "/user/login",
    logout: "/user/logout",

    // xoj用户部分
    getAllXOJUser: "/xoj/user/getAll",
    getXOJUserByUsername: "/xoj/user/getByUsername",
    insertXOJUser: "/xoj/user/insertUser",
    updateXOJUser: "/xoj/user/updateUserById",
    removeXOJUser: "/xoj/user/removeUserById",

    // 讨论区数据
    getAllDiscussion: "/xoj/discussion/getAll",
    getDiscussionByContent: "/xoj/discussion/getDiscussionByContent",
    removeDiscussion: "/xoj/discussion/remove",
    updateDiscussion: "/xoj/discussion/update",

    // 判题机数据
    getAlljudgeServer: "/judge/getAll",
    insertJudgeServe: "/judge/insert",
    removeJudgeServe: "/judge/remove",
    updateJudgeServe: "/judge/update",

    // 题目控制器
    getAllProblem: "/xoj/problem/getAll",
    getProblemByContent: "/xoj/problem/getProblemByContent",
    insertProblem: "/xoj/problem/insert",
    removeProblem: "/xoj/problem/remove",
    updateProblem: "/xoj/problem/update",
    
    // 系统控制部分
    getCPUInfo: "/sys/getCPUInfo",
    getDiskInfo: "/sys/getDiskInfo",
    getJavaAndOSConfig: "/sys/getJavaAndOSConfig",
    getMemoryInfo: "/sys/getMemoryInfo",
}

// 在实际开发中，项目中可能有好几个阶段，如下，每一个阶段都需要配置环境，
// 配置环境通过.env文件配置 在根路径下

// 开发阶段 npm run serve运行时读取这个配置文件
// .env.development

// 测试阶段

// 上线阶段  以npm run build启动项目时，会读取这个文件
// .env.production

export default apiUrl