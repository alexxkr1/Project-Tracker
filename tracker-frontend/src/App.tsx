import { Routes, Route } from "react-router-dom";
import ProjectsPage from "./pages/ProjectsPage"; 
import ProjectDetailPage from "./pages/ProjectDetailsPage";

const AppContent = () => {

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Routes>
                    <Route path="/" element={<ProjectsPage />} />
                    <Route path="/projects/:id" element={<ProjectDetailPage />} />
                    <Route
                        path="*"
                        element={
                            <h1 className="text-center p-10 text-xl text-red-500">
                                404 Not Found
                            </h1>
                        }
                    />
                </Routes>
            </main>
        </div>
    );
};

export default AppContent;
