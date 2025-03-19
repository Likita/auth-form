import { index, route, layout } from "@react-router/dev/routes";

export default [
  layout("routes/login.tsx", [
    route("sign-in", "routes/sign-in.tsx"),
    route("sign-up", "routes/sign-up.tsx"),
    route("forgot-password", "routes/forgot-password.tsx"),
  ]),
  layout("routes/auth.tsx", [
    index("routes/home.tsx")
  ])
];
