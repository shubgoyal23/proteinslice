import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import conf from "../../service/conf/conf";
import ImageGallery from "./ImageGallery";
import StarRating from "../StarRating/StarRating";
import { v4 as uuid } from "uuid";
import {
  currencyConvert,
  getUserCurrency,
} from "../../service/currencyConvertor/currencyConvert";
import { useDispatch, useSelector } from "react-redux";
import { addItem, changeQty } from "../../store/cartSlice";
import ProductReviews from "./ProductReviews";

function Product() {
  const userCurrency = getUserCurrency();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [productDetail, setProductDetails] = useState({});
  const [productQuantity, setProductQuantity] = useState(1);
  const [displayPrice, setDisplayPrice] = useState({
    amt: 0,
    symbol: "??",
  });
  const globalCart = useSelector((state) => state.cart.items);
  const [cardAdded, setCardAdded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function addtoCartHandler(e) {
    e.stopPropagation();
    if (!cardAdded) {
      dispatch(
        addItem({
          image: productDetail.images[0],
          name: productDetail.name,
          description: productDetail.description,
          price: displayPrice?.amt,
          _id: productDetail._id,
          discount: productDetail.discount,
          Qty: productQuantity,
          currency: displayPrice.symbol,
        })
      );
      setCardAdded(true);
    } else {
      navigate("/checkout");
    }
  }

  function changeQtyHandler(e) {
    setProductQuantity(Number(e.target.value));
    if (cardAdded) {
      dispatch(changeQty({ ...productDetail, Qty: e.target.value }));
    }
  }
  useEffect(() => {
    if (!id) return;
    axios
      .get(`${conf.URL}/api/v1/product/item/${id}`)
      .then(({ data }) => {
        setProductDetails(data?.data);
        getCurrency(userCurrency, data?.data?.currency, data?.data?.price);
        if (globalCart.some((item) => item._id === data?.data?._id)) {
          setCardAdded(true);
          const productQty = globalCart.find(
            (item) => item._id === data?.data?._id
          );
          setProductQuantity(productQty.Qty);
        }
      })
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getCurrency = async (userCurrency, currency, price) => {
    const data = await currencyConvert(userCurrency, currency, price);
    if (data) {
      setDisplayPrice(data);
    }
  };

  return !id ? (
    <div className="w-full h-[50vh] flex justify-center items-center text-3xl">
      No Product Found
      {/* make search bar for product */}
    </div>
  ) : (
    <>
      <div className="w-full flex flex-col md:flex-row md:items-start gap-4 py-6 relative overflow-hidden">
        <div className="flex-1 md:w-1/2 mt-6">
          <ImageGallery images={productDetail?.images || []} />
          <div className="md:w-[80%] w-full mx-auto md:my-10 flex justify-center gap-4 items-center fixed md:static bottom-0 left-0 p-3 md:p-0 bg-black/10 dark:bg-white/10 backdrop-blur-sm md:bg-transparent dark:md:bg-transparent">
            {productDetail?.availability ? (
              <>
                <button
                  className="p-2 w-1/2 h-12 bg-purple-700 text-white rounded-md hover:bg-purple-600"
                  onClick={addtoCartHandler}
                >
                  <i className="fa-solid fa-bag-shopping"></i>{" "}
                  {cardAdded ? "Checkout items" : "Add To Cart"}
                </button>
                <button className="p-2 w-1/2 h-12 bg-orange-600 text-white rounded-md hover:bg-orange-500">
                  Buy Now <i className="fa-solid fa-forward-fast"></i>
                </button>
              </>
            ) : (
              <span className=" w-1/2 h-12 bg-black/10 dark:bg-white/10 rounded-lg text-2xl flex justify-center items-center">
                Out of stock
              </span>
            )}
          </div>
        </div>
        <div className="flex-1 md:w-1/2 mt-6 text-center md:text-start p-6">
          <Link to={`/`} className="text-gray-500">
            # {productDetail?.category}
          </Link>
          <h1 className="text-3xl my-3 line-clamp-1 text-lime-500">
            {productDetail?.name}
          </h1>
          <div className="flex justify-center md:justify-start mt-3">
            <StarRating rating={productDetail?.rating} />
          </div>
          <div className="mt-4 mb-2 md:mb-0 text-green-600">
            {` Extra ${displayPrice?.symbol}${((displayPrice?.amt * productDetail?.discount) / 100).toFixed(0)} off`}
          </div>
          <div className="flex md:justify-start justify-center items-center gap-4">
            <span className="text-3xl">
              {`${displayPrice?.symbol} ${((displayPrice?.amt * (100 - productDetail?.discount)) / 100).toFixed(2)}`}
            </span>
            <span className="text-xl text-gray-500 dark:text-gray-400 line-through decoration-2 mt-2">
              {`${displayPrice?.symbol} ${(displayPrice?.amt).toFixed(2)}`}
            </span>
            <span className="text-green-600 text-xl">
              {productDetail?.discount}%{" "}
              <span className="text-green-500 text-lg">off</span>
            </span>
          </div>
          <div className="my-3 ">
            <span>Quantity Selected: </span>
            <select
              name="quantity"
              id="quantity"
              className="w-40 ml-2 text-center h-6 cursor-pointer dark:bg-white/10 bg-gray-300 mr-3 outline-none rounded-md"
              value={productQuantity}
              onChange={changeQtyHandler}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
                return (
                  <option
                    className="dark:bg-gray-800 hover:bg-lime-500 bg-gray-300 cursor-pointer"
                    value={i}
                    key={uuid()}
                  >
                    {i}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mt-10 md:mt-6">
            <h2 className="text-purple-700 text-2xl underline underline-offset-4 mb-2 md:mb-1">
              Product Details
            </h2>
            <div className="grid grid-cols-4 text-start">
              <span className="text-lg col-span-1 dark:text-gray-300 text-gray-700">
                Description
              </span>
              <p className="text-lg col-span-3  font-cormorant antialiased">
                : {productDetail?.description}
              </p>
              <span className="text-lg col-span-1 dark:text-gray-300 text-gray-700">
                Return Period
              </span>
              <p className="text-lg col-span-3  font-cormorant antialiased">
                :{" "}
                <span className="font-poppins text-lg">
                  {productDetail?.returnPeriod || 10}
                </span>{" "}
                Days
              </p>
              <span className="text-lg col-span-1 dark:text-gray-300 text-gray-700">
                Brand
              </span>
              <p className="text-lg col-span-3  font-cormorant antialiased">
                : {productDetail?.brand || "Not Available"}
              </p>
              <span className="text-lg col-span-1 dark:text-gray-300 text-gray-700">
                Category
              </span>
              <p className="text-lg col-span-3  font-cormorant antialiased">
                : {productDetail?.category || "Not Available"}
              </p>
              <span className="text-lg col-span-1 dark:text-gray-300 text-gray-700">
                weight
              </span>
              <p className="text-lg col-span-3  font-cormorant antialiased">
                : {productDetail?.weight || "Not Available"}
              </p>
              <span className="text-lg col-span-1 dark:text-gray-300 text-gray-700">
                length
              </span>
              <p className="text-lg col-span-3  font-cormorant antialiased">
                : {productDetail?.length || "Not Available"}
              </p>
              <span className="text-lg col-span-1 dark:text-gray-300 text-gray-700">
                width
              </span>
              <p className="text-lg col-span-3  font-cormorant antialiased">
                : {productDetail?.width || "Not Available"}
              </p>
              <span className="text-lg col-span-1 dark:text-gray-300 text-gray-700">
                height
              </span>
              <p className="text-lg col-span-3  font-cormorant antialiased">
                : {productDetail?.height || "Not Available"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-6 px-16">
        <ProductReviews id={productDetail?._id} />
      </div>
    </>
  );
}

export default Product;
