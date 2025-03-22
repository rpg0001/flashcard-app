import { BrowserRouter, Routes, Route } from "react-router-dom";
import DeckList from "./decks/DeckList";
import NotFound from "./errors/NotFound";
import Home from "./home/Home";
import Layout from "./shared/Layout";
import DeckDetails from "./decks/DeckDetails";
import { CreateDeck } from "./decks/CreateDeck";
import EditDeck from "./decks/EditDeck";
import { AuthProvider } from "./hooks/useAuth";
import SignUp from "./auth/signUp";
import SignIn from "./auth/signIn";
import Me from "./auth/me";
import { ProtectedRoute } from "./components/protectedRoute";
import CreateCard from "./decks/CreateCard";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Home */}
            <Route index element={<Home />} />

            {/* Decks */}
            <Route path="decks" element={<ProtectedRoute> <DeckList /> </ProtectedRoute>} />
            <Route path="decks/:id" element={<ProtectedRoute> <DeckDetails /> </ProtectedRoute>} />
            <Route path="decks/create" element={<ProtectedRoute> <CreateDeck /> </ProtectedRoute>} />
            <Route path="decks/:id/edit" element={<ProtectedRoute> <EditDeck /> </ProtectedRoute>} />

            {/* Decks/cards */}
            <Route path="decks/:id/cards/create" element={<ProtectedRoute> <CreateCard /> </ProtectedRoute>} />

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