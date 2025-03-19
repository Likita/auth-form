import{w}from"./with-props-Ec_yEytb.js";import{q as x,r as j,l as s,t as u}from"./chunk-GNGMS2XR-CoPZddH2.js";import{u as S,M as b,F as g,s as v,z as r}from"./form-input-B0vj2nYP.js";import{u as y}from"./auth-DJSf7Eou.js";import{B as N}from"./button-Bqb_cXL3.js";import"./db-CDBC-hjf.js";const E=r.object({email:r.string().email("Please enter a valid email address").min(1,"Email is required"),password:r.string().min(1,"Password is required")});function I(){var l,m;const a=x(),{login:p}=y(),[i,o]=j.useState(!1),{register:n,handleSubmit:h,formState:{errors:e},setError:t}=S({resolver:v(E),mode:"onBlur"}),f=async c=>{try{o(!0),await p(c.email,c.password),a("/")}catch(d){d instanceof Error?t("root",{message:d.message}):t("root",{message:"An error occurred while signing in"})}finally{o(!1)}};return s.jsxs(s.Fragment,{children:[s.jsxs("header",{className:"sign-in-header",children:[s.jsx("h1",{className:"title",children:"Welcome back"}),s.jsxs("p",{className:"sign-in-subtitle",children:["Don't have an account?"," ",s.jsx(u,{to:"/sign-up",className:"login-link",children:"Sign up"})]})]}),s.jsxs("form",{className:"sign-in-form",onSubmit:h(f),noValidate:!0,children:[e.root&&s.jsx(b,{variant:"error",children:e.root.message}),s.jsx(g,{label:"Email",type:"email",id:"email",error:(l=e.email)==null?void 0:l.message,autoComplete:"email",...n("email")}),s.jsx("div",{className:"password-field",children:s.jsx(g,{label:"Password",type:"password",id:"password",error:(m=e.password)==null?void 0:m.message,showPassword:!0,autoComplete:"current-password",...n("password")})}),s.jsx("div",{className:"links-group",children:s.jsx(u,{to:"/forgot-password",className:"login-link",children:"Forgot password?"})}),s.jsx(N,{type:"submit",variant:"primary",disabled:i,fullWidth:!0,children:i?"Signing in...":"Sign in"})]})]})}function L({}){return[{title:"Sign in to your account"},{name:"description",content:"Sign in to access your account"}]}const A=w(function(){return s.jsx(I,{})});export{A as default,L as meta};
