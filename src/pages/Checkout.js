import DefaultLayout from "../layouts/DefaultLayout";
import ShoppingCart from "../components/ShoppingCart";

function Checkout() {

  return <DefaultLayout>
    <ShoppingCart big/>
  </DefaultLayout>;
}

export default Checkout;