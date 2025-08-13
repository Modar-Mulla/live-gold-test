import { MdClose } from "react-icons/md";

interface Props {
  items: [];
}
function Cart(props: Props) {
  return (
    <div className="dropdown">
      <div
        className="cart"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="cart-header">
          <h5 className="cart-title">Your Cart</h5>
          <button type="button" className="btn-close">
            <MdClose />
          </button>
        </div>
        <div className="cart-body">
          {props.items.length ? (
            props.items
          ) : (
            <div className="empty-state">
              <p>No items found</p>
              <button className="go-shopping-btn medium-button">
                Start shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
