const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("views/login/Login"),
  },

  {
    path: "/",
    name: "Layout",
    component: () => import("../layouts/Layout"),
    children: [
      {
        path: "/profile",
        name: "Profile",
        component: () => import("views/profile/Profile"),
      },
      {
        path: "/messages",
        name: "Messages",
        component: () => import("views/messages/Messages"),
      },
      // {
      //   // path: "/examination",
      //   // name: "Exam",
      //   // component: () => import(""),
      // },
      {
        path: "/grade",
        name: "Grade",
        component: () => import("views/course/Course"),
      },
      {
        path: "/addStudent",
        component: () => import("views/addStudent/AddStudent"),
      },
      {
        path: "/examManagement",
        component: () => import("views/examManagement/ExamManagement"),
      },
    ],
  },
  {
    path: "/add-exam",
    component: () => import("views/addExam/AddExam"),
  },
];

export default routes;
