export const registerFormControls = [
  {
    name: "username",
    placeholder: "Enter your username",
    label: "Username",
    htmlType: "input",
    type: "text",
  },

  {
    name: "email",
    placeholder: "Enter your email",
    label: "Email",
    htmlType: "input",
    type: "text",
  },

  {
    name: "password",
    placeholder: "Enter your password",
    label: "Password",
    htmlType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    placeholder: "Enter your email",
    label: "Email",
    htmlType: "input",
    type: "text",
  },

  {
    name: "password",
    placeholder: "Enter your password",
    label: "Password",
    htmlType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    name: "title",
    label: "Title",
    htmlType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    name: "description",
    label: "Description",
    htmlType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    htmlType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    htmlType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Price",
    name: "price",
    htmlType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    htmlType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    htmlType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];
