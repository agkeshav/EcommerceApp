import { ModalPortal } from "react-native-modals";
import { Provider as CartProvider } from "./context/CartContext";
import {Provider as UserProvider} from "./context/UserContext"
import Navigation from "./navigation/Navigation";

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Navigation />
        <ModalPortal />
      </CartProvider>
    </UserProvider>
  );
}
