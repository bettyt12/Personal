import React, { useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";
import loading from "./loading-icon-animated-gif-19.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CarList() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isopen, setIsOpen] = useState(false);
  const [numberOfitemsShown, setNumberOfItemsToShown] = useState(5);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    fetchCars(setData);
  }, []);

  const renderLoadingSpinner = () => {
    return (
      <div>
        <div>
          <img src={loading} alt="" />
        </div>
      </div>
    );
  };

  const fetchCars = (setisLoading, setdata) => {
    fetch("https://mocki.io/v1/4f7bf80f-e4c8-44c5-9be2-afc649a5af96", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(async (res) => {
        let data = await res.json();
        if (res.status === 200) {
          setData(data.cars);
          setIsLoading(false);
        } else if (res.status === 201) {
          alert(data.message);
        } else {
          alert("Something went wrong. Please retry again.");
        }
      })
      .catch((err) => alert(err.message), setIsLoading(false));
  };
  //fake API calling function to demonstrate
  const BookCars = (date, id) => {
    fetch(`/bookcars/${id}`, {
      method: "POST",
      body: JSON.stringify(date),
      headers: { "Content-Type": "application/json" }
    })
      .then(async (res) => {
        let data = await res.json();
        if (res.status === 200) {
          alert(data.message);
        } else if (res.status === 201) {
          alert(data.message);
        } else {
          alert("Something went wrong. Please retry again.");
        }
      })
      .catch((err) => alert(err.message));
  };

  const Book = () => {
    setIsOpen(!isopen);
  };

  const showMore = () => {
    if (numberOfitemsShown + 5 <= data.length) {
      setNumberOfItemsToShown(numberOfitemsShown + 3);
    } else {
      setNumberOfItemsToShown(data.length);
    }
  };
  return (
    <div className="bg-slate-300">
      {isLoading ? (
        <div className="w-full">{renderLoadingSpinner()}</div>
      ) : (
        <div className="m-10 w-fit">
          {data.slice(1, numberOfitemsShown).map((car, index) => {
            return (
              <div
                key={index}
                className="grid gird-cols gap-8 p-4 rounded-lg shadow-lg mb-8"
              >
                <div className="grid grid-cols-2 gab-4 ">
                  <ImageSlider slides={car.images} />
                  <div className="ml-4">
                    <p className="font-bold text-xl mb-2">{car.carName}</p>
                    <p className="text-sm justify-center mb-2">{car.detail}</p>
                    <div className="">
                      <p className="font-semibold text-xl mt-2">
                        ${car.carPrice}
                      </p>
                    </div>
                    <div className="flex">
                      <button
                        className="bg-indigo-300 rounded px-4 py-2 font-bold mt-4"
                        onClick={Book}
                      >
                        Book
                      </button>
                      {isopen ? (
                        <div className="absolute">
                          <DatePicker
                            className="bg-white p-2 rounded shadow"
                            selected={date}
                            onChange={() => {
                              setDate(date);
                              setIsOpen(!isopen);
                              BookCars(car.id, date);
                            }}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {numberOfitemsShown < data.length && (
            <button
              className="rounded shadow-md bg-blue-200 p-2"
              onClick={showMore}
            >
              Show More
            </button>
          )}
        </div>
      )}
    </div>
  );
}
export default CarList;
