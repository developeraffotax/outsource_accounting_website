import React from "react";
import Link from "next/link";

const Services = () => {
  return (
    <ul className="font-light mt-4 lg:mt-8">
      <li className="mb-2">
        <Link href="/service/Annual-Accounts">Accounts</Link>
      </li>
      <li className="mb-2">
        <Link href="/service/vat-returns"> VAT Return</Link>
      </li>
      <li className="mb-2">
        <Link href="/service/Bookkeeping-Services"> Book Keeping</Link>
      </li>
      <li className="mb-2">
        <Link href="/service/Payroll-services"> Payroll Services</Link>
      </li>
      <li className="mb-2">
        <Link href="/service/Corporation-Tax"> Corporation Tax </Link>
      </li>
      <li className="mb-2">
        <Link href="/service/Self-Assessment-Tax"> Self Assessment</Link>
      </li>
      <li className="mb-2">
        <Link href="/service/company-formation"> Company Formation </Link>
      </li>
    </ul>
  );
};

export default Services;
