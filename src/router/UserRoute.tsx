import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Hero from "../components/pages/Hero";

const LoadingFallback = () => <div>Loading...</div>;

const UserRoute = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <Suspense fallback={<LoadingFallback />}>
          <MainLayout>
            <Hero />
          </MainLayout>
        </Suspense>
      ),
    },
  ]);

  return routes;
};

export default UserRoute;
