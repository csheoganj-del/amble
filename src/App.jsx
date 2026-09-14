import { CartProvider } from "./context/CartContext"
import Hero from "./components/Hero"
import Collection from "./components/Collection"
import Story from "./components/Story"
import Journal from "./components/Journal"
import Footer from "./components/Footer"
import CartDrawer from "./components/CartDrawer"

export default function App() {
  return (
    <CartProvider>
      <Hero />
      <Collection />
      <Story />
      <Journal />
      <Footer />
      <CartDrawer />
    </CartProvider>
  )
}
