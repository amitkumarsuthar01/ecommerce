export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "REQUEST_GET_PRODUCTS" });

    const res = await fetch("/getproducts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    dispatch({ type: "SUCCESS_GET_PRODUCTS", payload: data });
  } catch (error) {
    dispatch({ type: "FAIL_GET_PRODUCTS", payload: error.message });
  }
};
