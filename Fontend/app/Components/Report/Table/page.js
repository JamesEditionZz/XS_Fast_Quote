"use client";
import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import "./ptk.css";
import html2pdf from "html2pdf.js";

function index() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const modesty = searchParams.get("modesty");
  const screen = searchParams.get("screen");
  const color = searchParams.get("color");
  const flip = searchParams.get("flip");
  const Flipposition = searchParams.get("positionflip");
  const Electric = searchParams.get("Electric");
  const value = searchParams.get("value");
  const Electricposition = searchParams.get("postionelectric");
  const Snake = searchParams.get("Snake");
  const Other = searchParams.get("other");
  const Product = data ? JSON.parse(decodeURIComponent(data)) : {};

  const [productReport, setProductReport] = useState([]);
  const [viewpresale, setViewPreSale] = useState(0);
  const [datamodesty, setDataModesty] = useState([]);
  const [datascreen, setDataScreen] = useState([]);
  const [dataflip, setDataFlip] = useState([]);
  const [datawireway, setDataWireway] = useState([]);
  const [dataelectric, setDataElectric] = useState([]);
  const [datavalue, setDataValue] = useState([]);
  const [switchLock, setSwicthLock] = useState(false);

  const nummodesty = searchParams.get("nummodesty");
  const numscreen = searchParams.get("numscreen");
  const numflip = searchParams.get("numflip");
  const numElectric = searchParams.get("numelectric");
  const numvertical = searchParams.get("numvertical");

  const Product_header = JSON.parse(Product);
  const contentRef = useRef(null);

  const [discount, setDiscount] = useState(10);
  const [modeldiscount, setModelDiscount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/ProductReport`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Product,
              color,
            }), // ใช้ data จาก query string
          }
        );

        const result = await res.json(); // ใช้ชื่อ 'result' แทน 'data' เพื่อหลีกเลี่ยงการซ้ำซ้อน

        setProductReport(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [data]); // useEffect จะทำงานเมื่อ selectedProduct มีการเปลี่ยนแปลง

  if (modesty) {
    useEffect(() => {
      const imgmodesty = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/Report/modesty`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ modesty }),
            }
          );

          const response = await res.json();

          setDataModesty(response);
        } catch (error) {
          console.error(error);
        }
      };
      imgmodesty();
    }, []);
  }

  if (screen) {
    useEffect(() => {
      const imgscreen = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/Report/Screen`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ screen }),
            }
          );

          const response = await res.json();

          setDataScreen(response);
        } catch (error) {
          console.error(error);
        }
      };
      imgscreen();
    }, []);
  }

  if (flip) {
    useEffect(() => {
      const imgFlip = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/Report/Flip`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ flip }),
            }
          );

          const response = await res.json();

          setDataFlip(response);
        } catch (error) {
          console.error(error);
        }
      };
      imgFlip();
    }, []);
  }

  if (Snake) {
    useEffect(() => {
      const imgWireway = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/Report/Wireway`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ Snake }),
            }
          );

          const response = await res.json();

          setDataWireway(response);
        } catch (error) {
          console.error(error);
        }
      };
      imgWireway();
    }, []);
  }

  if (Electric) {
    useEffect(() => {
      const imgElectric = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/Report/Electric`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ Electric }),
            }
          );

          const response = await res.json();

          setDataElectric(response);
        } catch (error) {
          console.error(error);
        }
      };
      imgElectric();
    }, []);
  }

  const btnviewsale = () => {
    setModelDiscount(1);
  };

  const btnbackpage = () => {
    router.back();
  };

  const windownreload = () => {
    window.location.reload();
  };

  const PrintPTK = () => {
    setModelDiscount(0);
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const btnloadpfd = () => {
    setViewPreSale(1);
    setModelDiscount(0);
    const element = contentRef.current;

    const options = {
      margin: [8, 17, 0, 13],
      filename: `${Product_header.Product_name}/${Product_header.type}/${Product_header.width}/${Product_header.depth}/${Product_header.height}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();

    setTimeout(() => {
      windownreload();
    }, 500);
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

  console.log(modeldiscount);

  return (
    <>
      <div className="d-flex fixed-top mt-5">
        <button className="btn btn-danger mx-5" onClick={() => btnbackpage()}>
          ย้อนกลับ
        </button>
        <button className="btn btn-warning mx-5" onClick={() => btnviewsale()}>
          Discount
        </button>
      </div>
      {modeldiscount == 1 && (
        <div className="model-discount">
          <div className="model-discount-content">
            <div className="row mx-4">
              <div className="col-12 mt-2" align="right">
                <span
                  className="times-danger h3"
                  onClick={() => setModelDiscount(0)}
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
                  <div className="col-6" align="center">
                    <button
                      className="btn btn-danger"
                      onClick={() => PrintPTK()}
                    >
                      Print PTK
                    </button>
                  </div>
                  <div className="col-6" align="center">
                    <button
                      className="btn btn-danger"
                      onClick={() => btnloadpfd()}
                    >
                      Print Sale
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {viewpresale == 0 && (
        <div className="width-print">
          {productReport.map((item) => (
            <div className="row">
              <div className="col-12 ptk-font-header">
                {Product_header.type} {Product_header.Product_name} /{" "}
                {productReport[0].Product_model}
              </div>
              <div className="col-12 ptk-border-fixed">
                <div className="row">
                  <div className="col-4"></div>
                  <div className="col-4">
                    <Image
                      className="ptk-img-width"
                      src={`/${item.Product_img}/${item.Product_Path_img}.jpg`}
                      width={10000}
                      height={10000}
                    />
                  </div>
                  <div className="col-4"></div>
                </div>
              </div>
              {(modesty !== "undefined" ||
                screen !== "undefined" ||
                flip !== "undefined" ||
                Electric !== "undefined" ||
                Snake !== "undefined") && (
                <div className="mb-4">
                  <div className="col-12 ptk-font-accessories">ACCESSORIES</div>
                  <div className="col-12">
                    <div className="row">
                      {modesty != "undefined" && (
                        <div className="ptk-col-2-accessories">
                          <div className="row">
                            <div className="col-12 accessories-border-top accessories-border ptk-font-text-accessories text-center accessories-left">
                              FG________
                            </div>
                            {datamodesty.map((item) => (
                              <>
                                <div className="col-12 accessories-border text-center accessories-left">
                                  <Image
                                    className="ptk-img-accessories"
                                    src={`/${item.Access_img}/${item.Access_img_name}.jpg`}
                                    width={1000}
                                    height={1000}
                                  />
                                </div>
                                <div className="col-12 accessories-border ptk-font-text-accessories text-center accessories-left">
                                  <div className="col-12" align="center">
                                    <label>Modesty</label>
                                  </div>
                                </div>
                              </>
                            ))}
                            <div className="col-12 accessories-border ptk-font-text-accessories text-center accessories-left">
                              <label>
                                {item.Product_width} x {item.Product_depth} x{" "}
                                {item.Product_height}
                              </label>
                            </div>
                            <div className="col-12 accessories-border ptk-font-text-accessories text-center accessories-left">
                              <label>{nummodesty > 1 ? nummodesty : "1"}</label>
                            </div>
                          </div>
                        </div>
                      )}
                      {screen != "undefined" && (
                        <div className="ptk-col-2-accessories">
                          <div className="row">
                            <div
                              className={`col-12 accessories-border-top accessories-border ptk-font-text-accessories text-center ${
                                modesty === "undefined"
                                  ? "accessories-left"
                                  : ""
                              }`}
                            >
                              FG________
                            </div>
                            {datascreen.map((item) => (
                              <>
                                <div
                                  className={`col-12 accessories-border text-center ${
                                    modesty === "undefined"
                                      ? "accessories-left"
                                      : ""
                                  }`}
                                >
                                  <Image
                                    className="ptk-img-accessories"
                                    src={`/${item.Access_img}/${item.Access_img_name}.jpg`}
                                    width={1000}
                                    height={1000}
                                  />
                                </div>
                                <div
                                  className={`col-12 accessories-border ptk-font-text-accessories text-center ${
                                    modesty === "undefined"
                                      ? "accessories-left"
                                      : ""
                                  }`}
                                >
                                  <div className="col-12" align="center">
                                    <label>Screen</label>
                                  </div>
                                </div>
                                <div
                                  className={`col-12 accessories-border ptk-font-text-accessories text-center ${
                                    modesty === "undefined"
                                      ? "accessories-left"
                                      : ""
                                  }`}
                                >
                                  <label>{item.Access_name}</label>
                                </div>
                              </>
                            ))}
                            <div
                              className={`col-12 accessories-border ptk-font-text-accessories text-center ${
                                modesty === "undefined"
                                  ? "accessories-left"
                                  : ""
                              }`}
                            >
                              <label>{numscreen > 1 ? numscreen : "1"}</label>
                            </div>
                          </div>
                        </div>
                      )}
                      {flip != "undefined" && (
                        <div className="ptk-col-2-accessories">
                          <div className="row">
                            <div
                              className={`col-12 accessories-border-top accessories-border ptk-font-text-accessories text-center ${
                                modesty === "undefined"
                                  ? "accessories-left"
                                  : ""
                              }`}
                            >
                              FG________
                            </div>
                            {dataflip.map((item) => (
                              <>
                                <div
                                  className={`col-12 accessories-border text-center ${
                                    modesty === "undefined"
                                      ? "accessories-left"
                                      : ""
                                  }`}
                                >
                                  <Image
                                    className="ptk-img-accessories"
                                    src={`/${item.Access_img}/${item.Access_img_name}.jpg`}
                                    width={1000}
                                    height={1000}
                                  />
                                </div>
                                <div
                                  className={`col-12 accessories-border ptk-font-text-accessories text-center ${
                                    modesty === "undefined"
                                      ? "accessories-left"
                                      : ""
                                  }`}
                                >
                                  <div className="col-12" align="center">
                                    <label>Flip Outlet</label>
                                  </div>
                                </div>
                                <div
                                  className={`col-12 accessories-border ptk-font-text-accessories text-center ${
                                    modesty === "undefined"
                                      ? "accessories-left"
                                      : ""
                                  }`}
                                >
                                  <label>{item.Access_name}</label>
                                </div>
                              </>
                            ))}
                            <div
                              className={`col-12 accessories-border ptk-font-text-accessories text-center ${
                                modesty === "undefined"
                                  ? "accessories-left"
                                  : ""
                              }`}
                            >
                              <label>{numflip > 1 ? numflip : "1"}</label>
                            </div>
                          </div>
                        </div>
                      )}
                      {Snake != "undefined" && (
                        <div className="ptk-col-2-accessories">
                          <div className="row">
                            <div
                              className={`col-12 accessories-border-top accessories-border ptk-font-text-accessories text-center ${
                                modesty === "undefined"
                                  ? "accessories-left"
                                  : ""
                              }`}
                            >
                              FG________
                            </div>
                            {datawireway.map((item) => (
                              <>
                                <div
                                  className={`col-12 accessories-border text-center ${
                                    modesty === "undefined"
                                      ? "accessories-left"
                                      : ""
                                  }`}
                                >
                                  <Image
                                    className="ptk-img-accessories"
                                    src={`/${item.Access_img}/${item.Access_img_name}.jpg`}
                                    width={1000}
                                    height={1000}
                                  />
                                </div>
                                <div
                                  className={`col-12 accessories-border ptk-font-text-accessories text-center ${
                                    modesty === "undefined"
                                      ? "accessories-left"
                                      : ""
                                  }`}
                                >
                                  <div className="col-12" align="center">
                                    <label>Vertical Wireway</label>
                                  </div>
                                </div>
                                <div
                                  className={`col-12 accessories-border ptk-font-text-accessories text-center ${
                                    modesty === "undefined"
                                      ? "accessories-left"
                                      : ""
                                  }`}
                                >
                                  <label>{item.Access_name}</label>
                                </div>
                              </>
                            ))}
                            <div
                              className={`col-12 accessories-border ptk-font-text-accessories text-center ${
                                modesty === "undefined"
                                  ? "accessories-left"
                                  : ""
                              }`}
                            >
                              <label>
                                {numElectric > 1 ? numElectric : "1"}
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                      {Electric != "undefined" && (
                        <div className="ptk-col-2-accessories">
                          <div className="row">
                            <div
                              className={`col-12 accessories-border-top accessories-border ptk-font-text-accessories text-center ${
                                modesty === "undefined"
                                  ? "accessories-left"
                                  : ""
                              }`}
                            >
                              FG________
                            </div>
                            {dataelectric.map((item) => (
                              <>
                                <div
                                  className={`col-12 accessories-border text-center ${
                                    modesty === "undefined"
                                      ? "accessories-left"
                                      : ""
                                  }`}
                                >
                                  <Image
                                    className="ptk-img-accessories"
                                    src={`/${item.Access_img}/${item.Access_img_name}.jpg`}
                                    width={1000}
                                    height={1000}
                                  />
                                </div>
                                <div
                                  className={`col-12 accessories-border ptk-font-text-accessories text-center ${
                                    modesty === "undefined"
                                      ? "accessories-left"
                                      : ""
                                  }`}
                                >
                                  <div className="col-12" align="center">
                                    <label>ช่องร้อยสายไฟ</label>
                                  </div>
                                </div>
                                <div
                                  className={`col-12 accessories-border ptk-font-text-accessories text-center ${
                                    modesty === "undefined"
                                      ? "accessories-left"
                                      : ""
                                  }`}
                                >
                                  <label>{item.Access_name}</label>
                                </div>
                              </>
                            ))}
                            <div
                              className={`col-12 accessories-border ptk-font-text-accessories text-center ${
                                modesty === "undefined"
                                  ? "accessories-left"
                                  : ""
                              }`}
                            >
                              <label>
                                {numvertical > 1 ? numvertical : "1"}
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <div className="col-12 ptk-font-description mt-3 ptk-line-header">
                DESCRIPTIONS
              </div>
              <div className="row ptk-line-description">
                <div className="col-3 ptk-text-description">
                  ราคาเฟอร์นิเจอร์
                </div>
                <div className="col-2 ptk-text-detail"></div>
                <div className="col-6 ptk-text-detail">
                  {productReport?.[0]?.Product_price != null
                    ? productReport?.[0]?.Product_price.toLocaleString()
                    : "0"}{" "}
                  บาท
                </div>
              </div>
              <div className="row ptk-line-description">
                <div className="col-3 ptk-text-description">ราคาอุปกรณ์</div>
                <div className="col-2 ptk-text-detail"></div>
                <div className="col-6 ptk-text-detail">000,000 บาท</div>
              </div>
              {/* <div className="line-description">
                <div className="row">
                  <div className="col-3 text-description">Discount</div>
                  <div className="col-2 text-detail"></div>
                  <div className="col-6 text-detail">
                    
                  </div>
                </div>
              </div> */}
              <div className="row ptk-line-description">
                <div className="col-3 ptk-text-description">
                  ราคาเสนอรวมทั้งสิ้น
                </div>
                <div className="col-2 ptk-text-detail"></div>
                <div className="col-6 ptk-text-detail">
                  {productReport?.[0]?.Product_price != null
                    ? (
                        productReport?.[0]?.Product_price -
                        productReport?.[0]?.Product_price * (discount / 100)
                      ).toLocaleString()
                    : "0"}{" "}
                  บาท
                </div>
              </div>
              <div className="row ptk-line-description">
                <div className="col-3 ptk-text-description">กำหนดยืนราคา</div>
                <div className="col-2 ptk-text-detail"></div>
                <div className="col-6 ptk-text-detail">XX / XX / XXXX</div>
              </div>
              <div className="line-space-1"></div>
              <div className="row ptk-line-description">
                <div className="col-3 ptk-text-description">ขนาด (มม.)</div>
                <div className="col-2 ptk-text-detail">กว้าง x ลึก x สูง</div>
                <div className="col-6 ptk-text-detail">
                  {item.Product_width} x {item.Product_depth} x{" "}
                  {item.Product_height}
                </div>
              </div>
              <div className="row ptk-line-description">
                <div className="col-3 ptk-text-description">TOP</div>
                <div className="col-2 ptk-text-detail"></div>
                <div className="col-6 ptk-text-detail">XXXXXXXXXX</div>
              </div>
              <div className="row ptk-line-description">
                <div className="col-3 ptk-text-description">ขา</div>
                <div className="col-2 ptk-text-detail"></div>
                <div className="col-6 ptk-text-detail">XXXXXXXXXX</div>
              </div>
              <div className="line-space-2"></div>
              {modesty != "undefined" && (
                <div className="row ptk-line-description">
                  <div className="col-3 ptk-text-description">Modesty</div>
                  <div className="col-2 ptk-text-detail"></div>
                  <div className="col-6 ptk-text-detail">
                    {modesty} {nummodesty > 1 ? "x" + nummodesty : ""}
                  </div>
                </div>
              )}
              {screen != "undefined" && (
                <div className="row ptk-line-description">
                  <div className="col-3 ptk-text-description">Screen</div>
                  <div className="col-2 ptk-text-detail"></div>
                  <div className="col-6 ptk-text-detail">
                    {screen} {numscreen > 1 ? "x" + numscreen : ""}
                  </div>
                </div>
              )}
              {flip != "undefined" && (
                <div className="row ptk-line-description">
                  <div className="col-3 ptk-text-description">Flip Outlet</div>
                  <div className="col-2 ptk-text-detail">{Flipposition}</div>
                  <div className="col-6 ptk-text-detail">
                    {flip} {numflip > 1 ? "x" + numflip : ""}
                  </div>
                </div>
              )}
              {Snake != "undefined" && (
                <div className="row ptk-line-description">
                  <div className="col-3 ptk-text-description">
                    Vertical Wireway
                  </div>
                  <div className="col-2 ptk-text-detail"></div>
                  <div className="col-6 ptk-text-detail">
                    {Snake} {numvertical > 1 ? "x" + numvertical : ""}
                  </div>
                </div>
              )}
              {Electric != "undefined" && (
                <div className="row ptk-line-description">
                  <div className="col-3 ptk-text-description">ช่องรอยสายไฟ</div>
                  <div className="col-2 ptk-text-detail">
                    {Electricposition}
                  </div>
                  <div className="col-6 ptk-text-detail">
                    {Electric} {numElectric > 1 ? "x" + numElectric : ""}
                  </div>
                </div>
              )}
              {Other != "undefined" && (
                <div className="line-description">
                  <div className="row">
                    <div className="col-3 text-description">
                      รายละเอียดเพิ่มเติม
                    </div>
                    <div className="col-2 text-detail"></div>
                    <div className="col-6 text-detail">{Other}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div ref={contentRef}>
        {viewpresale == 1 && (
          <div className="container">
            <div className="logo">
              <Image
                className="image-logo"
                src="/img/logo.png"
                width={120}
                height={70}
              />
            </div>

            {productReport.map((item) => (
              <div className="row">
                <div className="col-12 font-header">
                  {Product_header.type} {Product_header.Product_name}
                </div>
                <div className="col-12 border-fixed">
                  <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                      <Image
                        className="img-width"
                        src={`/${item.Product_img}/${item.Product_Path_img}.jpg`}
                        width={10000}
                        height={10000}
                      />
                    </div>
                    <div className="col-4"></div>
                  </div>
                </div>
                {(modesty !== "undefined" ||
                  screen !== "undefined" ||
                  flip !== "undefined" ||
                  Electric !== "undefined" ||
                  Snake !== "undefined") && (
                  <>
                    <div className="col-12 font-accessories">ACCESSORIES</div>
                    <div className="col-12">
                      <div className="row">
                        {modesty != "undefined" && (
                          <div className="col-2-accessories border-left border-box">
                            <div className="row">
                              {datamodesty.map((item) => (
                                <>
                                  <div className="col-12 text-center">
                                    <Image
                                      className="img-accessories"
                                      src={`/${item.Access_img}/${item.Access_img_name}.jpg`}
                                      width={10000}
                                      height={10000}
                                    />
                                  </div>
                                  <div className="col-12 text-center">
                                    <div className="col-12" align="center">
                                      <label className="text-accessories">
                                        {item.Access_name}
                                      </label>
                                    </div>
                                  </div>
                                </>
                              ))}
                            </div>
                          </div>
                        )}
                        {screen != "undefined" && (
                          <div className="col-2-accessories border-box">
                            <div className="row">
                              {datascreen.map((item) => (
                                <>
                                  <div className="col-12 text-center">
                                    <Image
                                      className="img-accessories"
                                      src={`/${item.Access_img}/${item.Access_img_name}.jpg`}
                                      width={1000}
                                      height={1000}
                                    />
                                  </div>
                                  <div className="col-12 text-center">
                                    <div className="col-12" align="center">
                                      <label className="text-accessories">
                                        {item.Access_name}
                                      </label>
                                    </div>
                                  </div>
                                </>
                              ))}
                            </div>
                          </div>
                        )}
                        {flip != "undefined" && (
                          <div className="col-2-accessories border-box">
                            <div className="row">
                              {dataflip.map((item) => (
                                <>
                                  <div className="col-12 text-center">
                                    <Image
                                      className="img-accessories"
                                      src={`/${item.Access_img}/${item.Access_img_name}.jpg`}
                                      width={1000}
                                      height={1000}
                                    />
                                  </div>
                                  <div className="col-12 text-center">
                                    <div className="col-12" align="center">
                                      <label className="text-accessories">
                                        {item.Access_name}
                                      </label>
                                    </div>
                                  </div>
                                </>
                              ))}
                            </div>
                          </div>
                        )}
                        {Snake != "undefined" && (
                          <div className="col-2-accessories border-box">
                            <div className="row">
                              {datawireway.map((item) => (
                                <>
                                  <div className="col-12 text-center">
                                    <Image
                                      className="img-accessories"
                                      src={`/${item.Access_img}/${item.Access_img_name}.jpg`}
                                      width={1000}
                                      height={1000}
                                    />
                                  </div>
                                  <div className="col-12 text-center">
                                    <div className="col-12" align="center">
                                      <label className="text-accessories">
                                        {item.Access_name}
                                      </label>
                                    </div>
                                  </div>
                                </>
                              ))}
                            </div>
                          </div>
                        )}
                        {Electric != "undefined" && (
                          <div className="col-2-accessories border-box">
                            <div className="row">
                              {dataelectric.map((item) => (
                                <>
                                  <div className="col-12 text-center">
                                    <Image
                                      className="img-accessories"
                                      src={`/${item.Access_img}/${item.Access_img_name}.jpg`}
                                      width={1000}
                                      height={1000}
                                    />
                                  </div>
                                  <div className="col-12 text-center">
                                    <div className="col-12" align="center">
                                      <label className="text-accessories">
                                        {item.Access_name}
                                      </label>
                                    </div>
                                  </div>
                                </>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
                <div className="col-12 font-description report-cm line-header">
                  DESCRIPTIONS
                </div>
                <div className="line-description">
                  <div className="row">
                    <div className="col-3 text-description">
                      ราคาเฟอร์นิเจอร์
                    </div>
                    <div className="col-2 text-detail"></div>
                    <div className="col-6 text-detail">
                      {productReport?.[0]?.Product_price != null
                        ? productReport?.[0]?.Product_price.toLocaleString()
                        : "0"}{" "}
                      บาท
                    </div>
                  </div>
                </div>
                <br />
                <div className="line-description">
                  <div className="row">
                    <div className="col-3 text-description">ราคาอุปกรณ์</div>
                    <div className="col-2 text-detail"></div>
                    <div className="col-6 text-detail">000,000 บาท</div>
                  </div>
                </div>
                <div className="line-description">
                  <div className="row">
                    <div className="col-3 text-description">Discount</div>
                    <div className="col-2 text-detail"></div>
                    <div className="col-6 text-detail">10%</div>
                  </div>
                </div>
                <div className="line-description">
                  <div className="row">
                    <div className="col-3 text-description">
                      ราคาเสนอรวมทั้งสิ้น
                    </div>
                    <div className="col-2 text-detail"></div>
                    <div className="col-6 text-detail">
                      {productReport?.[0]?.Product_price != null
                        ? (
                            productReport?.[0]?.Product_price -
                            productReport?.[0]?.Product_price * (discount / 100)
                          ).toLocaleString()
                        : "0"}{" "}
                      บาท
                    </div>
                  </div>
                </div>
                <div className="line-description">
                  <div className="row">
                    <div className="col-3 text-description">กำหนดยืนราคา</div>
                    <div className="col-2 text-detail"></div>
                    <div className="col-6 text-detail">XX / XX / XXXX</div>
                  </div>
                </div>
                <div className="line-space-1"></div>
                <div className="line-space-1"></div>
                <div className="line-description">
                  <div className="row">
                    <div className="col-3 text-description">ขนาด (มม.)</div>
                    <div className="col-2 text-detail">กว้าง x ลึก x สูง</div>
                    <div className="col-6 text-detail">
                      {item.Product_width} x {item.Product_depth} x{" "}
                      {item.Product_height}
                    </div>
                  </div>
                </div>
                <div className="line-description">
                  <div className="row">
                    <div className="col-3 text-description">TOP</div>
                    <div className="col-2 text-detail"></div>
                    <div className="col-6 text-detail">XXXXXXXXXX</div>
                  </div>
                </div>
                <div className="line-description">
                  <div className="row">
                    <div className="col-3 text-description">ขา</div>
                    <div className="col-2 text-detail"></div>
                    <div className="col-6 text-detail">XXXXXXXXXX</div>
                  </div>
                </div>
                <div className="line-space-2"></div>
                {modesty != "undefined" && (
                  <div className="line-description">
                    <div className="row">
                      <div className="col-3 text-description">Modesty</div>
                      <div className="col-2 text-detail"></div>
                      <div className="col-6 text-detail">
                        {modesty} {nummodesty > 1 ? "x" + nummodesty : "1"}
                      </div>
                    </div>
                  </div>
                )}
                {screen != "undefined" && (
                  <div className="line-description">
                    <div className="row">
                      <div className="col-3 text-description">Screen</div>
                      <div className="col-2 text-detail"></div>
                      <div className="col-6 text-detail">
                        {screen} {numscreen > 1 ? "x" + numscreen : "1"}
                      </div>
                    </div>
                  </div>
                )}
                {flip != "undefined" && (
                  <div className="line-description">
                    <div className="row">
                      <div className="col-3 text-description">Flip Outlet</div>
                      <div className="col-2 text-detail">{Flipposition}</div>
                      <div className="col-6 text-detail">
                        {flip} {numflip > 1 ? "x" + numflip : "1"}
                      </div>
                    </div>
                  </div>
                )}
                {Snake != "undefined" && (
                  <div className="line-description">
                    <div className="row">
                      <div className="col-3 text-description">
                        Vertical Wireway
                      </div>
                      <div className="col-2 text-detail"></div>
                      <div className="col-6 text-detail">
                        {Snake} {numvertical > 1 ? "x" + numvertical : "1"}
                      </div>
                    </div>
                  </div>
                )}
                {Electric != "undefined" && (
                  <div className="line-description">
                    <div className="row">
                      <div className="col-3 text-description">ช่องรอยสายไฟ</div>
                      <div className="col-2 text-detail">
                        {Electricposition}
                      </div>
                      <div className="col-6 text-detail">
                        {Electric} {numElectric > 1 ? "x" + numElectric : "1"}
                      </div>
                    </div>
                  </div>
                )}
                {Other != "undefined" && (
                  <div className="line-description">
                    <div className="row">
                      <div className="col-3 text-description">
                        รายละเอียดเพิ่มเติม
                      </div>
                      <div className="col-2 text-detail"></div>
                      <div className="col-6 text-detail">{Other}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default index;
