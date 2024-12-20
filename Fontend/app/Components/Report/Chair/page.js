"use client";
import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import "./ptk.css";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function index() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const Product = data ? JSON.parse(decodeURIComponent(data)) : {};
  const [productReport, setProductReport] = useState([]);
  const [printPDF, setPrintPDF] = useState(false);
  const [discount, setDiscount] = useState(10);
  const [modeldiscount, setModelDiscount] = useState(false);
  const [switchLock, setSwicthLock] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/Chairproductreport`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Product,
            }),
          }
        );

        const result = await res.json();

        setProductReport(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [data]);

  const btnbackpage = () => {
    router.back();
  };

  const keySwicthLock = () => {
    if (switchLock === false) {
      setSwicthLock(true);
      setDiscount(0);
    } else {
      setSwicthLock(false);
      setDiscount(10);
    }
  };

  const PrintPTK = () => {
    setModelDiscount(false);
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <>
      <div className="d-flex fixed-top mt-5">
        <button className="btn btn-danger mx-5" onClick={() => btnbackpage()}>
          ย้อนกลับ
        </button>
        <button
          className="btn btn-warning mx-5"
          onClick={() => setModelDiscount(true)}
        >
          Discount
        </button>
      </div>
      {modeldiscount && (
        <div className="model-discount">
          <div className="model-discount-content">
            <div className="row mx-4">
              <div className="col-12 mt-2" align="right">
                <span
                  className="times-danger h3"
                  onClick={() => setModelDiscount(false)}
                >
                  &times;
                </span>
              </div>
              <div className="col-3" align="center">
                <label className="mt-1">ส่วนลด</label>
              </div>
              <div className="col-5">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Discount (%)"
                  value={discount}
                  disabled={switchLock === false}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
              <div className="col-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Discount (%)"
                  value="%"
                  disabled
                />
              </div>
              <div className="col-1">
                {switchLock === false ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-lock-fill cs-pointer"
                    viewBox="0 0 16 16"
                    onClick={() => keySwicthLock(true)}
                  >
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-unlock-fill cs-pointer"
                    viewBox="0 0 16 16"
                    onClick={() => keySwicthLock(false)}
                  >
                    <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2" />
                  </svg>
                )}
              </div>
              <div className="col-12">
                <div className="row mx-3">
                  <div className="col-12" align="center">
                    <button
                      className="btn btn-danger"
                      onClick={() => PrintPTK()}
                    >
                      Print
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div id="pdf-content" className="width-print">
        <div className="row">
          <div className="col-12 ptk-font-header">
            เก้าอี้ {productReport?.[0]?.Product_name}/
            {productReport?.[0]?.Product_model}
          </div>
          <div className="col-12 ptk-border-fixed">
            <div className="row mt-3">
              <div className="col-4"></div>
              <div className="col-4">
                <Image
                  className="ptk-img-width"
                  src={`/${productReport?.[0]?.Product_img}/${productReport?.[0]?.Product_model}.jpg`}
                  width={10000}
                  height={10000}
                />
              </div>
              <div className="col-4"></div>
            </div>
          </div>
          <div className="col-12 ptk-font-description mt-3 ptk-line-header">
            FEATURES
          </div>
          {productReport.map((item, index) => (
            <div key={index} className="col-4 ptk-text-detail">
              {item.Access_name}
            </div>
          ))}
          <div className="ptk-line-header"></div>
          <div className="col-12 ptk-font-description margin-description ptk-line-header">
            DESCRIPTIONS
          </div>
          <div className="row ptk-line-description">
            <div className="col-3 ptk-text-description">ราคาเฟอร์นิเจอร์</div>
            <div className="col-1 ptk-text-detail"></div>
            <div className="col-6 ptk-text-detail">
              {`${
                productReport?.[0]?.Product_price
                  ? productReport?.[0]?.Product_price.toLocaleString()
                  : "0"
              }`}{" "}
              บาท
            </div>
          </div>
          <div className="row ptk-line-description">
            <div className="col-3 ptk-text-description">ภาษีมูลค่าเพิ่ม</div>
            <div className="col-1 ptk-text-detail"></div>
            <div className="col-6 ptk-text-detail">0</div>
          </div>
          <div className="row ptk-line-description">
            <div className="col-3 ptk-text-description">
              ราคาเสนอรวมทั้งสิ้น
            </div>
            <div className="col-1 ptk-text-detail"></div>
            <div className="col-6 ptk-text-detail">
              {`${
                productReport?.[0]?.Product_price
                  ? (
                      productReport?.[0]?.Product_price -
                      productReport?.[0]?.Product_price * (discount / 100)
                    ).toLocaleString()
                  : "0"
              }`}{" "}
              บาท
            </div>
          </div>
          <div className="row ptk-line-description">
            <div className="col-3 ptk-text-description">กำหนดยืนราคา</div>
            <div className="col-1 ptk-text-detail"></div>
            <div className="col-6 ptk-text-detail">XX / XX / XXXX</div>
          </div>
          <div className="line-space-1"></div>
          <div className="row ptk-line-description">
            <div className="col-3 ptk-text-description">พนักพิง</div>
            <div className="col-1 ptk-text-detail"></div>
            <div className="col-6 ptk-text-detail">XXXXXXXXXX</div>
          </div>
          <div className="row ptk-line-description">
            <div className="col-3 ptk-text-description">เบาะนั่ง</div>
            <div className="col-1 ptk-text-detail"></div>
            <div className="col-6 ptk-text-detail">XXXXXXXXXX</div>
          </div>
          <div className="line-space-2"></div>
        </div>
      </div>
    </>
  );
}

export default index;
