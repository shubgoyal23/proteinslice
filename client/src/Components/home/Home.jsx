import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Corosal, InfoCard, StarRating } from "../index";
import TopProducts from "./TopProducts";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* main Section */}
      <main>
        <Corosal />
      </main>

      {/* Top Product Section */}
      <section>
        <TopProducts />
      </section>

      {/* Reivew Section */}
      <section className="w-[90%] mx-auto lg:h-[90vh] h-full relative mt-6 -mb-16 z-10 drop-shadow-xl shadow-gray-300/10 shadow-2xl">
        <div
          className="absolute top-0 left-0 w-full h-full bg-fixed bg-cover bg-center bg-blend-multiply brightness-[0.3]"
          style={{ backgroundImage: "url(./bg-section.jpg)" }}
        ></div>

        <div className="w-full h-full text-center flex flex-col items-start justify-between text-white brightness-100 md:p-16 p-6 py-16">
          <div>
            <h3 className="w-full md:text-start text-3xl font-cormorant italic font-bold text-red-600">
              What Our Customers Say
            </h3>
            <h4 className="w-full md:text-start text-6xl mt-4 mb-16 sm:mb-0 font-league">
              CUSTOMER TESTIMONIALS
            </h4>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2">
            <div className="w-[90%]">
              <div className="flex gap-1 mb-4">
                <StarRating rating={5} color={"yellow-500"} />
              </div>

              <p className="text-start md:text-xl ">
                "As a fitness enthusiast striving to achieve peak performance
                and build lean muscle mass, I've tried numerous whey protein
                supplements over the years. However, none have impressed me as
                much as ProteinSlice Whey Protein. This product truly stands out
                from the crowd."
              </p>
              <p className="text-start md:text-xl text-gray-500 mt-2 mb-6">
                Jacques Rodgers
              </p>
            </div>
            <div className="w-[90%]">
              <div className="flex gap-1 mb-4">
                <StarRating rating={5} color={"yellow-500"} />
              </div>

              <p className="text-start md:text-xl">
                "I've experimented with a myriad of whey protein supplements.
                Nevertheless, none have left me as impressed as ProteinSlice
                Whey Protein. This product unequivocally stands out amidst the
                competition, delivering remarkable results that redefine my
                fitness journey."
              </p>
              <p className="text-start md:text-xl text-gray-500 mt-2 mb-6">
                Kiran Donaldson
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section
        className="w-full mx-auto h-screen my-6 mt-0 pt-16 flex justify-center flex-col items-center"
        style={{ backgroundImage: "url(./bg-section-offer.jpg)" }}
      >
        <h2 className="text-3xl bg-gradient-to-r from-yellow-300 to-red-400 bg-clip-text text-transparent">
          Black Friday Sale
        </h2>
        <h3 className="text-6xl md:w-1/2 mb-6 mt-3 w-[90%] mx-auto text-center text-white font-league tracking-normal">
          SAVE BIG: UP TO{" "}
          <span className="bg-gradient-to-r from-cyan-500 to-violet-600 bg-clip-text text-transparent">
            60% OFF
          </span>{" "}
          ON ALL PRODUCTS
        </h3>
        <p className="md:w-1/2 w-[90%] text-sm text-center text-gray-400">
          Don’t miss this exclusive opportunity to embark on a journey of
          unbeatable savings and cutting-edge technology. It’s time to secure
          the best deals and upgrade your experience, so seize the moment and
          start shopping now!
        </p>
        <Link
          className="mt-10 px-6 bg-gray-300 text-black h-10 rounded-full flex justify-center items-center"
          to={"/shop"}
        >
          Shop Deal
        </Link>
      </section>

      {/* shipping details */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-16 md:mt-24">
        <div className="md:p-16 md:pr-36 md:ml-6 p-10 pt-16">
          <h2 className="text-4xl text-center md:text-start bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent font-cormorant italic mb-4">
            Why Choose ProteinSlice?
          </h2>
          <h2 className="text-7xl text-center md:text-start font-league md:w-3/4 text-gray-700 dark:text-gray-100">
            THE JOY OF SHOPPING AT ITS BEST
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            {
              title: "Free Shipping",
              img: "fa-truck",
              desc: "Delight in seamless free shipping, enhancing your shopping experience. Navigate our diverse collection, where cost savings meet product joy",
            },
            {
              title: "Security Payment",
              img: "fa-credit-card",
              desc: "Shop with confidence using our secure payment methods. Your transactions are protected, providing peace of mind for a worry-free shopping",
            },
            {
              title: "easy Return",
              img: "fa-rotate-left",
              desc: "Celebrate worry-free shopping with our hassle-free returns – because we're here to make your shopping experience as smooth as possible",
            },
            {
              title: "ORDER TRACKING",
              img: "fa-location-dot",
              desc: "Track your order effortlessly with our streamlined system. Stay informed and in control as your purchase makes its way to your doorstep",
            },
          ].map((item) => (
            <InfoCard key={uuidv4()} {...item} />
          ))}
        </div>
      </section>

      {/* single offer */}
      <section className="w-[90%] mx-auto min-h-screen h-full relative mt-20 z-10 drop-shadow-xl shadow-[0px_0px_178px_31px_rgba(194,179,179,0.33)] flex items-center justify-between">
        <div
          className="absolute top-0 left-0 w-full h-full bg-scroll bg-cover bg-center bg-blend-multiply brightness-[0.8]"
          style={{ backgroundImage: "url(./bg-single-offer.svg)" }}
        ></div>

        <div className="w-full h-full text-center flex flex-col items-center justify-between text-white brightness-100 md:p-16 p-6 py-16">
          <h2 className="text-5xl bg-gradient-to-r from-red-500 via-red-600 to-pink-600 bg-clip-text text-transparent font-bold font-poppins italic">
            Limited-Time Offer
          </h2>
          <h3 className="text-6xl mb-6 mt-3 w-[90%] mx-auto text-center text-white font-league tracking-normal">
            SAVE BIG: UP TO{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-violet-600 bg-clip-text text-transparent">
              60% OFF
            </span>{" "}
            ON ALL PRODUCTS
          </h3>
          <p className="text-lg text-center text-gray-400">
            ACT FAST BEFORE THEY'RE GONE
          </p>
          <Link
            className="mt-10 px-6 bg-gradient-to-r from-cyan-600 to-blue-400 h-10 rounded-full flex justify-center items-center"
            to={"/shop"}
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
