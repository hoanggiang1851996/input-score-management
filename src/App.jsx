import './App.css'
import {MainLayout} from "./Layout/mainLayout.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CourseManagement} from "./Pages/CourseManagement/index.jsx";
import {PageNotFound} from "./Pages/PageNotFound/index.jsx";
import {SubjectManagement} from "./Pages/SubjectManagement/index.jsx";
import {StudentManagement} from "./Pages/StudentManagement/index.jsx";
import {CourseUnitManagement} from "./Pages/CourseUnitManagement/index.jsx";
import {ImportScore} from "./Pages/ImportScore/index.jsx";
import {CategoryManagement} from "./Pages/CategoryManagement/index.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="category-management" element={<CategoryManagement />} />
          <Route path="course-management" element={<CourseManagement />} />
          <Route path="subject-management" element={<SubjectManagement />} />
          <Route path="student-management" element={<StudentManagement />} />
          <Route path="course-unit-management" element={<CourseUnitManagement />} />
          <Route path="import-score" element={<ImportScore />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
