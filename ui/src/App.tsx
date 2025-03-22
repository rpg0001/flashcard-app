import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components";
import { AuthProvider } from "./hooks";
import { CreateCard, CreateDeck, DeckDetails, DeckList, EditCard, EditDeck } from "./decks";
import { SignUp, SignIn, Me } from "./auth";
import { NotFound } from "./errors";
import { Home } from "./home";
import { Layout } from "./shared";

export function App() {
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
            <Route path="decks/:id/cards/:cardId/edit" element={<ProtectedRoute> <EditCard /> </ProtectedRoute>} />

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