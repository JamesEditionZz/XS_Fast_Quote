"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import "./Product_list.css";

export default function page() {
  const router = useRouter();
  const [product, setProduct] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [product_model, setProduct_model] = useState("");
  const [lowPrice, setLowPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(0);
  const [depth, setDepth] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [swiftpage, setSwiftPage] = useState("");
  const [viewoption, setViewOption] = useState(0);
  const [dataCatalog, setDataCatalog] = useState([]);
  const [product_type, setProduct_type] = useState("");
  const [searchProduct_model, setSearchProduct_model] = useState("");
  const [product_Name, setProduct_name] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/equipment_list`
        );
        const fetchedData = await response.json();

        setData(fetchedData);

        setProduct_type(fetchedData?.[0]?.Product_type);
        setProduct_name(fetchedData?.[0]?.Product_type)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleprice = async (event) => {
    const price_rang = event.target.value;

    if (price_rang === "low") {
      const sortedDatalow = [...data].sort(
        (a, b) => a.Product_price - b.Product_price
      );
      setData(sortedDatalow);
    } else if (price_rang === "high") {
      const sortedDatahigh = [...data].sort(
        (a, b) => b.Product_price - a.Product_price
      );
      setData(sortedDatahigh);
    }
  };

  const handleSelected = async (Product_model, type) => {
    setProduct_type(type);
    setProduct_model(Product_model);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/model`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Product_model, type }),
      });

      const data = await res.json();

      setProduct(data);
      setProduct_name(data?.[0]?.Product_name)
    } catch (error) {
      console.log(error);
    }
  };

  const btnbackpage = () => {
    setSwiftPage(true);
    setTimeout(() => {
      router.push("../../");
    }, 1000);
  };

  const CheckSizeDepth = (depth) => {
    setDepth(depth);
    CheckSize(depth, width, height);
  };

  const CheckSizeWidth = (width) => {
    setWidth(width);
    CheckSize(depth, width, height);
  };

  const CheckSizeHeight = (height) => {
    setHeight(height);
    CheckSize(depth, width, height);
  };

  const CheckSize = async (depth, width, height) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/checksize`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            depth,
            width,
            height,
            product_model,
            product_type,
          }),
        }
      );

      const data = await res.json();

      setFilteredData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const checksearch = (e) => {
    setViewOption(e);
    setFilteredData([]);
    setSelectedProduct(null);
    setLowPrice(0);
    setHighPrice(0);
    setDepth(0);
    setWidth(0);
    setHeight(0);
  };

  const searchlowprice = (lowPrice) => {
    setLowPrice(lowPrice);
    searchprice(lowPrice, highPrice);
  };

  const searchhighprice = (highPrice) => {
    setHighPrice(highPrice);
    searchprice(lowPrice, highPrice);
  };

  const searchprice = async (lowPrice, highPrice) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/checkprice`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lowPrice,
            highPrice,
            product_model,
            product_type,
          }),
        }
      );

      const data = await res.json();

      setFilteredData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const selectitem = async (type) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/selectItem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type, product_model }),
        }
      );

      const data = await res.json();

      setFilteredData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (selectedProduct.type === "Chair") {
      const productData = encodeURIComponent(JSON.stringify(selectedProduct));
      router.push(`../Components/Report/Chair?data=${productData}`);
    } else {
      const productData = encodeURIComponent(JSON.stringify(selectedProduct));
      router.push(`../Components/Product/Table?data=${productData}`);
    }
  };

  console.log(selectedProduct);
  

  const cancelModel = () => {
    setProduct(0);
    setFilteredData([]);
    setViewOption(0);
    setSelectedProduct(null);
    setLowPrice(0);
    setHighPrice(0);
    setDepth(0);
    setWidth(0);
    setHeight(0);
  };

  const searchproductmodel = async (e) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/searchProductmodel`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ e, product_type, product_Name}),
        }
      );

      const result = await res.json();

      setFilteredData(result);
    } catch (error) {
      console.error("Error fetching product model:", error);
    }
  };

  console.log(filteredData);
  

  return (
    <div>
      {product > "" && (
        <div className="modal-select" style={{ display: "flex" }}>
          <div className="modal-option animation-modal">
            <div className="row">
              <div className="col-12">
                <select
                  className="form-select mb-2"
                  onChange={(e) => checksearch(e.target.value)}
                >
                  <option selected disabled>
                    เลือกประเภทค้นหา
                  </option>
                  <option value={1}>ค้นหารุ่น</option>
                  <option value={2}>ค้นหาตามขนาด</option>
                  <option value={3}>ค้นหาตามราคา</option>
                  <option value={4}>ค้นหาประเภท</option>
                </select>
              </div>
            </div>
            {viewoption == 1 && (
              <div>
                <input
                  className="form-control"
                  placeholder="ค้นหารุ่น"
                  onChange={(e) => searchproductmodel(e.target.value)}
                />
              </div>
            )}
            {viewoption == 2 && (
              <div className="row mb-3 mt-2">
                <div className="col-4">
                  <label>ความกว้าง/ยาว (W)</label>
                  <select
                    className="form-select"
                    onChange={(e) => CheckSizeWidth(e.target.value)}
                  >
                    <option value="" selected disabled>
                      เลือกความกว้าง
                    </option>
                    {[
                      ...new Set(product.map((item) => item.Product_width)),
                    ].map((width, index) => (
                      <option key={index}>{width}</option>
                    ))}
                  </select>
                </div>
                <div className="col-4">
                  <label>ความลึก (D)</label>
                  <select
                    className="form-select"
                    onChange={(e) => CheckSizeDepth(e.target.value)}
                  >
                    <option value="" selected disabled>
                      เลือกความลึก
                    </option>
                    {[
                      ...new Set(product.map((item) => item.Product_depth)),
                    ].map((depth, index) => (
                      <option key={index}>{depth}</option>
                    ))}
                  </select>
                </div>
                <div className="col-4">
                  <label>ความสูง (H)</label>
                  <select
                    className="form-select"
                    onChange={(e) => CheckSizeHeight(e.target.value)}
                  >
                    <option selected disabled>
                      เลือกความสูง
                    </option>
                    {[
                      ...new Set(product.map((item) => item.Product_height)),
                    ].map((height, index) => (
                      <option key={index}>{height}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            {viewoption == 3 && (
              <div className="row mb-3 mt-2">
                <div className="col-3">
                  <input
                    className="form-control"
                    placeholder="ราคาต่ำสุด"
                    onChange={(e) => searchlowprice(e.target.value)}
                  />
                </div>
                <div className="col-3">
                  <input
                    className="form-control"
                    placeholder="ราคาสูงสุด"
                    onChange={(e) => searchhighprice(e.target.value)}
                  />
                </div>
              </div>
            )}
            {viewoption == 4 && (
              <div className="row mb-3 mt-2">
                <div className="col-12">
                  <select
                    className="form-select mb-2"
                    onChange={(e) => selectitem(e.target.value)}
                  >
                    <option selected disabled>
                      เลือกประเภท
                    </option>
                    {[
                      ...new Set(product.map((item) => item.Product_category)),
                    ].map((type, index) => (
                      <option key={index}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            <div className="view-option row mt-2">
              {filteredData.length > 0
                ? filteredData.map(
                    (item, index) =>
                      item.Product_model != null && (
                        <div
                          className={`col-4`}
                          key={index}
                          onClick={() =>
                            setSelectedProduct({
                              Product_name: item.Product_name,
                              Product_model: item.Product_model,
                              category: item.Product_category,
                              type: item.Product_type,
                              img: item.Product_img,
                              depth: item.Product_depth,
                              width: item.Product_width,
                              height: item.Product_height,
                            })
                          }
                          style={{
                            border:
                              selectedProduct?.Product_name ===
                                item.Product_name &&
                              selectedProduct?.Product_model ===
                                item.Product_model &&
                              selectedProduct?.category ===
                                item.Product_category &&
                              selectedProduct?.type === item.Product_type &&
                              selectedProduct?.img === item.Product_img &&
                              selectedProduct?.depth === item.Product_depth &&
                              selectedProduct?.width === item.Product_width &&
                              selectedProduct?.height === item.Product_height
                                ? "2px solid rgb(136, 111, 111)"
                                : "none",
                          }}
                        >
                          <div className="row mb-3 select-pointer">
                            <div className="col-12 image-center">
                              <Image
                                className={`view-image`}
                                src={`/${item.Product_img}/${item.Product_Path_img}.jpg`}
                                width={1000}
                                height={1000}
                                alt={item.Product_name}
                                onError={(e) => {
                                  e.target.src =
                                    "/XS_Project/No_Image_Available.jpg";
                                }}
                              />
                            </div>
                            <div className="text-item">
                              <div className="col-12 text-center">
                                {item.Product_model}
                              </div>
                              <div className="col-12 text-center">
                                {item.Product_width} * {item.Product_depth} *{" "}
                                {item.Product_height}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                  )
                : lowPrice === 0 &&
                  highPrice === 0 &&
                  depth === 0 &&
                  width === 0 &&
                  height === 0 &&
                  product.map((item, index) => (
                    <>
                      {item.Product_model != null && (
                        <>
                          <div
                            className={`col-4`}
                            key={index}
                            onClick={() =>
                              setSelectedProduct({
                                Product_name: item.Product_name,
                                Product_model: item.Product_model,
                                category: item.Product_category,
                                type: item.Product_type,
                                img: item.Product_img,
                                depth: item.Product_depth,
                                width: item.Product_width,
                                height: item.Product_height,
                              })
                            }
                            style={{
                              border:
                                selectedProduct?.Product_name ===
                                  item.Product_name &&
                                selectedProduct?.Product_model ===
                                  item.Product_model &&
                                selectedProduct?.category ===
                                  item.Product_category &&
                                selectedProduct?.type === item.Product_type &&
                                selectedProduct?.img === item.Product_img &&
                                selectedProduct?.depth === item.Product_depth &&
                                selectedProduct?.width === item.Product_width &&
                                selectedProduct?.height === item.Product_height
                                  ? "2px solid rgb(136, 111, 111)"
                                  : "none",
                            }}
                          >
                            <div className="row mb-3 select-pointer mt-2">
                              <div className="col-12 image-center">
                                <Image
                                  className={`view-image`}
                                  src={`/${item.Product_img}/${item.Product_Path_img}.jpg`}
                                  width={1000}
                                  height={1000}
                                  alt={item.Product_name}
                                  onError={(e) => {
                                    e.target.src =
                                      "/XS_Project/No_Image_Available.jpg";
                                  }}
                                />
                              </div>
                              <div className="text-item">
                                <div className="col-12 text-center">
                                  {item.Product_model}
                                </div>
                                <div className="col-12 text-center">
                                  {item.Product_width} * {item.Product_depth} *{" "}
                                  {item.Product_height}
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  ))}
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button
                className="btn btn-danger mx-3"
                onClick={() => {
                  cancelModel();
                }}
              >
                <div>ยกเลิก</div>
              </button>
              <button className="btn btn-success" onClick={handleSubmit}>
                <div>ตกลง</div>
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className={`container animation-opacity ${
          swiftpage ? "animation-bottom-return" : ""
        }`}
      >
        <div className="frame-order">
          <div className="row animation-opacity">
            {[
              ...new Map(
                data.map((item) => [item.Product_name, item])
              ).values(),
            ].map((item, index) => (
              <div
                className="col-3 selector text-center"
                key={index}
                onClick={() =>
                  handleSelected(item.Product_name, item.Product_type)
                }
              >
                <div className="col-12 image-center">
                  <Image
                    className={`${
                      product_type == "Chair"
                        ? "view-image-group"
                        : "view-image-gruop-full"
                    }`}
                    src={`/${item.Product_img}/${item.Product_img_name}.jpg`}
                    width={1000}
                    height={1000}
                    alt={`${item.Product_name}`}
                  />
                </div>
                <div className="text-item">
                  <div className="col-12">{item.Product_name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {dataCatalog && (
          <div>
            <button className="btn btn-danger mt-3" onClick={btnbackpage}>
              <div>ย้อนกลับ</div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
