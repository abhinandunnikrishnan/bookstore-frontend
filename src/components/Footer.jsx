import React from 'react'
import { FaFacebookF, FaInstagram, FaXTwitter, FaEnvelope } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoIosArrowRoundForward } from 'react-icons/io';


function Footer() {
  return (
    <footer className="bg-black text-white px-6 sm:px-10 md:px-12 pt-12 pb-5">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">

        {/* About Us */}
        <div>
          <h3 className="text-xl font-bold mb-7">
            About US
          </h3>

          <p className="text-base sm:text-lg leading-7 text-justify">
            We believe books are more than just pages — they are windows
            into new worlds, teachers of wisdom, and companions for life.
            Our journey began with a passion for storytelling and a mission
            to make reading accessible, enjoyable, and inspiring for everyone.
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-bold mb-7">
            NEWS LETTER
          </h3>

          <p className="text-base sm:text-lg mb-7">
            Stay updated with our latest trends
          </p>

          <div className="flex w-full max-w-md">
            <input
              type="email"
              placeholder="E Mail"
              className=" min-w-0 px-4 py-3 text-black bg-white "
            />

            <button
              className="bg-yellow-500 hover:bg-yellow-600 px-5 py-3 
                         text-white text-2xl transition duration-300"
            >
              <IoIosArrowRoundForward />
            </button>
          </div>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-xl font-bold mb-7">
            FOLLOW US
          </h3>

          <p className="text-base sm:text-lg mb-7">
            Let us be social
          </p>

          <div className="flex gap-7 text-xl">
            <a href="#" className="hover:text-yellow-500 transition">
              <FaFacebookF />
            </a>

            <a href="#" className="hover:text-yellow-500 transition">
              <FaInstagram />
            </a>

            <a href="#" className="hover:text-yellow-500 transition">
              <FaXTwitter />
            </a>

            <a href="#" className="hover:text-yellow-500 transition">
              <FaEnvelope />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-16 pt-5 text-center">
        <p className="text-sm sm:text-base md:text-lg">
          Copyright &copy; 2026 All rights reserved | This website is made with  
          <FaHeart className="inline text-white mx-1" /> By Luminar Technolab
        </p>
      </div>

    </footer>
  )
}

export default Footer