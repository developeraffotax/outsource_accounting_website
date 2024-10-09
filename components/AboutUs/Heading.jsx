const Heading = () => {
  return (
    <section className="w-full h-72 overflow-hidden flex justify-center items-center bg-gradient-to-b from-[#8780FF]/40 to-[#ffffff] relative ">
      <h1 className="w-full text-center text-5xl font-[400]  font-poppins z-50 ">
        About Us
      </h1>

      <div className="w-full  absolute -bottom-6">
        <svg className="w-full  " viewBox="0 0 1440 177" fill="none" xmlns="http://www.w3.org/2000/svg" > {" "} <path d="M-46.7137 90.1301C529.546 262.63 719.712 -106.37 1091.69 31.6301C1463.38 171.43 1463.38 160.63 1628.19 115.03C1791.84 69.4301 1779.45 42.1301 1901.62 19.3301C2078.24 -14.2699 2160.65 176.83 2160.65 176.83H-720.65C-720.65 176.83 -692.125 54.1301 -479.773 32.5301C-267.422 10.9301 -229.676 35.8301 -46.7137 90.1301Z" fill="white" />{" "} </svg>
      </div>

      <div className="w-full  absolute  -bottom-6">
        <svg className="w-full  " viewBox="0 0 1440 254" fill="none" xmlns="http://www.w3.org/2000/svg" > <path opacity="0.66" d="M45.7758 51.9301C176.875 51.9301 268.212 121.53 417.752 169.23C500.157 195.33 850.811 199.53 1149.6 51.9301C1448.39 -95.6699 1413.82 155.13 1579.49 51.9301C1827.28 -101.07 2160.65 134.43 2160.65 134.43V253.83H-720.65V144.33C-720.65 144.33 -639.397 199.83 -455.282 199.83C-173.779 199.53 -74.3744 51.9301 45.7758 51.9301Z" fill="white" /> </svg>
      </div>

      <div className="w-full  absolute  -bottom-6">
        <svg className="w-full  " viewBox="0 0 1440 301" fill="none" xmlns="http://www.w3.org/2000/svg" > <path opacity="0.33" d="M797.795 98.9301C1385.29 -165.97 1555.87 200.93 1720.68 98.9301C1970.48 -56.4699 2160.65 121.73 2160.65 121.73V300.83H-720.65V121.73C-720.65 121.73 -541.721 43.4301 -447.214 33.8301C-352.708 23.9301 -266.269 70.7301 -228.812 100.13C-161.678 152.03 13.2172 274.73 158.435 286.73C303.652 298.73 741.898 123.83 797.795 98.9301Z" fill="white" /> </svg>
      </div>
    </section>
  );
};

export default Heading;
