import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteList from "./notes/NoteList";
import NotFound from "./errors/NotFound";
import Home from "./home/Home";
import Layout from "./shared/Layout";
import NoteDetails from "./notes/NoteDetails";
import { CreateNote } from "./notes/CreateNote";
import EditNote from "./notes/EditNote";
import { AuthProvider } from "./hooks/useAuth";
import SignUp from "./auth/signUp";
import SignIn from "./auth/signIn";
import Me from "./auth/me";
import { ProtectedRoute } from "./components/protectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Home */}
            <Route index element={<Home />} />

            {/* Notes */}
            <Route path="notes" element={<ProtectedRoute> <NoteList /> </ProtectedRoute>} />
            <Route path="notes/:id" element={<ProtectedRoute> <NoteDetails /> </ProtectedRoute>} />
            <Route path="notes/create" element={<ProtectedRoute> <CreateNote /> </ProtectedRoute>} />
            <Route path="notes/:id/edit" element={<ProtectedRoute> <EditNote /> </ProtectedRoute>} />

            {/* Auth */}
            <Route path="auth/signup" element={<SignUp />} />
            <Route path="auth/signin" element={<SignIn />} />
            <Route path="auth/me" element={<ProtectedRoute> <Me /> </ProtectedRoute>} />

            {/* Default */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}