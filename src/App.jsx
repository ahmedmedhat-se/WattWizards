import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layout
import MainLayout from "./components/layout/MainLayout.jsx";

// Importing Service Components
import Programs from "./components/services/Programs.jsx";
import OfflineWorkspace from "./components/services/OfflineWorkspace.jsx";
import OnlineWorkspace from "./components/services/OnlineWorkspace.jsx";
import WorkspaceArchive from "./components/services/WorkspaceArchive.jsx";
import ProjectManager from "./components/dev/ProjectManager.jsx";
import EditProject from "./components/dev/EditProject.jsx";

// Importing Other Components
import Homepage from "./components/main/Homepage.jsx";
import Achievments from "./components/services/Achievments.jsx";

// Importing Auth Components
import AuthForm from "./components/auth/AuthForm.jsx";
import Profile from "./components/auth/Profile.jsx";
import RequireAuth from "./components/auth/guard/RequireAuth.jsx";

// Importing Context & Store Components
import { ProductProvider } from "./components/store/context/ProductContext.jsx";
import ProductsLayout from "./components/store/views/ProductsLayout.jsx";
import Products from "./components/store/views/Products.jsx";
import Cart from "./components/store/views/Cart.jsx";
import PartnersPolicies from "./components/store/views/PartnersPolicies.jsx";

// Importing Fallback Components
import NotFound from "./components/main/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/wattwizards/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "wattwizards", element: <Homepage /> },
      { path: "homepage", element: <Homepage /> },
      { path: "programs", element: <Programs /> },
      { path: "achievments", element: <Achievments /> },
      {
        path: "workspace",
        children: [
          { path: "offline-sheets", element: <OfflineWorkspace /> },
          { path: "online-sheets", element: <OnlineWorkspace /> },
          { path: "archive", element: <WorkspaceArchive /> },
        ],
      },
      { path: "login", element: <AuthForm /> },
      { path: "profile", element: <Profile /> },
      { path: "project", element: <ProjectManager /> },
      { path: "edit-project", element: <EditProject /> },
      {
        path: "products",
        element: <ProductsLayout />,
        children: [
          { index: true, element: <Products /> },
          { path: "partners-policies", element: <PartnersPolicies /> },
          { path: "cart", element: (<RequireAuth><Cart /></RequireAuth>)},
        ],
      },
    ],
  },
]);

function App() {
  return (
    <ProductProvider>
      <RouterProvider router={router} />
    </ProductProvider>
  );
}

export default App;