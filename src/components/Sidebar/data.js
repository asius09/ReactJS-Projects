const sidebarData = [
  {
    id: 1,
    title: "Dashboard",
    icon: "home",
    path: "/dashboard",
    children: [],
  },
  {
    id: 2,
    title: "Profile",
    icon: "user",
    path: "/profile",
    children: [
      {
        id: 21,
        title: "Edit Profile",
        path: "/profile/edit",
        children: [],
      },
      {
        id: 22,
        title: "Change Password",
        path: "/profile/password",
        children: [],
      },
    ],
  },
  {
    id: 3,
    title: "Settings",
    icon: "cog",
    path: "/settings",
    children: [
      {
        id: 31,
        title: "Account Settings",
        path: "/settings/account",
        children: [],
      },
      {
        id: 32,
        title: "Privacy Settings",
        path: "/settings/privacy",
        children: [
          {
            id: 321,
            title: "Blocked Users",
            path: "/settings/privacy/blocked",
            children: [],
          },
          {
            id: 322,
            title: "Two-Factor Authentication",
            path: "/settings/privacy/2fa",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Messages",
    icon: "envelope",
    path: "/messages",
    children: [
      {
        id: 41,
        title: "Inbox",
        path: "/messages/inbox",
        children: [],
      },
      {
        id: 42,
        title: "Sent",
        path: "/messages/sent",
        children: [],
      },
    ],
  },
  {
    id: 5,
    title: "Notifications",
    icon: "bell",
    path: "/notifications",
    children: [],
  },
  {
    id: 6,
    title: "Logout",
    icon: "sign-out-alt",
    path: "/logout",
    children: [],
  },
];
export default sidebarData;
