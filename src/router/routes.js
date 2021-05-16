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
        path: "",
        name: "index",
        component: () => import("../layouts/Index.vue"),
      },

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
      {
        path: "/examination",
        name: "Exam",
        component: () => import("views/examination/index.vue"),
      },
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
      {
        path: "/review",
        component: () => import("views/review/Index"),
      },
    ],
  },
  {
    path: "/add-exam",
    component: () => import("views/addExam/AddExam"),
  },
  {
    path: "/test",
    component: () => import("views/test/index"),
  },
  {
    path: "/test",
    component: () => import("views/test/index"),
  },
  {
    path: "/mark-papers",
    name: "MarkPapers",
    component: () => import("views/review/childComponents/MarkingPapers.vue"),
  },
];

export default routes;
