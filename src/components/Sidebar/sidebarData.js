const sidebarData = [
  {
    id: 1,
    title: "Dashboard",
    path: "/dashboard",
    icon: "ri-dashboard-line", // Dashboard icon
    children: [],
  },
  {
    id: 2,
    title: "Products",
    path: "/products",
    icon: "ri-shopping-cart-line", // Shopping cart icon
    children: [
      {
        id: 21,
        title: "All Products",
        path: "/products/all",
        icon: "ri-list-check", // List icon
        children: [],
      },
      {
        id: 22,
        title: "Categories",
        path: "/products/categories",
        icon: "ri-stack-line", // Category/stack icon
        children: [
          {
            id: 221,
            title: "Electronics",
            path: "/products/categories/electronics",
            icon: "ri-flashlight-line", // Bolt/flashlight icon
            children: [],
          },
          {
            id: 222,
            title: "Clothing",
            path: "/products/categories/clothing",
            icon: "ri-t-shirt-line", // Shirt icon
            children: [],
          },
        ],
      },
      {
        id: 23,
        title: "Add Product",
        path: "/products/add",
        icon: "ri-add-circle-line", // Add circle icon
        children: [],
      },
    ],
  },
  {
    id: 3,
    title: "Users",
    path: "/users",
    icon: "ri-group-line", // People/group icon
    children: [
      {
        id: 31,
        title: "Customers",
        path: "/users/customers",
        icon: "ri-user-line", // Single person icon
        children: [],
      },
      {
        id: 32,
        title: "Admins",
        path: "/users/admins",
        icon: "ri-admin-line", // Admin icon
        children: [],
      },
    ],
  },
  {
    id: 4,
    title: "Settings",
    path: "/settings",
    icon: "ri-settings-5-line", // Settings icon
    children: [
      {
        id: 41,
        title: "Profile",
        path: "/settings/profile",
        icon: "ri-user-settings-line", // Profile/account icon
        children: [],
      },
      {
        id: 42,
        title: "Security",
        path: "/settings/security",
        icon: "ri-lock-line", // Lock icon
        children: [
          {
            id: 421,
            title: "Password",
            path: "/settings/security/password",
            icon: "ri-key-line", // Key icon
            children: [],
          },
          {
            id: 422,
            title: "2FA",
            path: "/settings/security/2fa",
            icon: "ri-shield-check-line", // Security/shield icon
            children: [],
          },
        ],
      },
    ],
  },
];
export default sidebarData;
