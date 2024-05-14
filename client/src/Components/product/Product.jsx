import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import conf from "../../service/conf/conf";
import ImageGallery from "./ImageGallery";
import StarRating from "../StarRating/StarRating";
import {
  currencyConvert,
  getUserCurrency,
} from "../../service/currencyConvertor/currencyConvert";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../store/cartSlice";

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
  const [cardAdded, setCardAdded] = useState(
    globalCart.some((item) => item._id === productDetail._id)
  );
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

  const data = {
    _id: "65e9b039f0a294a52ab16cb1",
    name: "Omega-3 Fish Oil Capsules",
    description: "Essential fatty acids for joint health",
    category: "Supplements",
    price: 14.99,
    currency: "USD",
    discount: 5,
    availability: true,
    images: [
      "https://cdn.pixabay.com/photo/2015/12/06/18/28/capsules-1079838_1280.jpg",
      "https://cdn.pixabay.com/photo/2016/12/18/10/57/fish-oil-1915423_1280.jpg",
      "https://cdn.pixabay.com/photo/2016/12/18/10/57/fish-oil-1915425_1280.jpg",
      "https://cdn.pixabay.com/photo/2018/02/13/17/08/pills-3151089_1280.jpg",
    ],
    reviews: [],
    relatedProducts: [],
    createdAt: "2024-03-07T12:16:57.787Z",
    updatedAt: "2024-03-10T12:23:34.004Z",
    __v: 0,
    rating: "5.0",
  };

  useEffect(() => {
    if (!id) return;
    axios
      .get(`${conf.URL}/api/v1/product/item/${id}`)
      .then(({ data }) => {
        setProductDetails(data?.data);
        getCurrency(userCurrency, data?.data?.currency, data?.data?.price);
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

  return (
    <div className="w-full flex flex-col md:flex-row md:items-start gap-4 py-6 relative overflow-hidden">
      <div className="flex-1 md:w-1/2 mt-6">
        <ImageGallery images={productDetail?.images || []} />
        <div className="md:w-[80%] w-full mx-auto md:my-10 flex justify-center gap-4 items-center fixed md:static bottom-0 left-0 p-3 md:p-0 bg-white/10 backdrop-blur-sm md:bg-transparent">
          <button
            className="p-2 w-1/2 h-12 bg-purple-700 text-white rounded-md hover:bg-purple-600"
            onClick={addtoCartHandler}
          >
            <i className="fa-solid fa-bag-shopping"></i>{" "}
            {cardAdded ? "Checkout" : "Add To Cart"}
          </button>
          <button className="p-2 w-1/2 h-12 bg-orange-600 text-white rounded-md hover:bg-orange-500">
            Buy Now <i className="fa-solid fa-forward-fast"></i>
          </button>
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
        <div className="mt-4 text-green-600">
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
      </div>
    </div>
  );
}

export default Product;
