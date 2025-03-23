import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks";
import { 
  CreateCard, 
  CreateDeck, 
  DeckDetails, 
  MyDeckList, 
  DeleteDeck, 
  EditCard, 
  EditDeck, 
  PublicDeckList, 
  PublicDeckDetails, 
  PlayDeck 
} from "./decks";
import { SignUp, SignIn, Me } from "./auth";
import { NotFound } from "./errors";
import { Home } from "./home";
import { Layout } from "./shared";
import { User } from "./users";
import { ProtectedRoute } from "./components";

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Home */}
            <Route index element={<Home />} />

            {/* Decks */}
            <Route path="decks/all" element={<PublicDeckList /> } />
            <Route path="decks/:id/public" element={<PublicDeckDetails />} />
            <Route path="decks" element={<ProtectedRoute> <MyDeckList /> </ProtectedRoute>} />
            <Route path="decks/:id" element={<ProtectedRoute> <DeckDetails /> </ProtectedRoute>} />
            <Route path="decks/create" element={<ProtectedRoute> <CreateDeck /> </ProtectedRoute>} />
            <Route path="decks/:id/edit" element={<ProtectedRoute> <EditDeck /> </ProtectedRoute>} />
            <Route path="decks/:id/delete" element={<ProtectedRoute> <DeleteDeck /> </ProtectedRoute>} />
            <Route path="decks/:id/play" element={<PlayDeck /> } />

            {/* Decks/cards */}
            <Route path="decks/:id/cards/create" element={<ProtectedRoute> <CreateCard /> </ProtectedRoute>} />
            <Route path="decks/:id/cards/:cardId/edit" element={<ProtectedRoute> <EditCard /> </ProtectedRoute>} />

            {/* Users */}
            <Route path="users/:id" element={<User />} />

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