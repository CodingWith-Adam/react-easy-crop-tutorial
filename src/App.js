import "./App.css";
import { useState } from "react";
import ImageCropDialog from "./ImageCropDialog";

const initData = [
  {
    id: 1,
    imageUrl: "images/car1.png",
    croppedImageUrl: null,
  },
  {
    id: 2,
    imageUrl: "images/car2.png",
    croppedImageUrl: null,
  },
  {
    id: 3,
    imageUrl: "images/car3.png",
    croppedImageUrl: null,
  },
  {
    id: 4,
    imageUrl: "images/car4.png",
    croppedImageUrl: null,
  },
];

function App() {
  const [cars, setCars] = useState(initData);
  const [selectedCar, setSelectedCar] = useState(null);

  const onCancel = () => {
    setSelectedCar(null);
  };

  const setCroppedImageFor = (id, crop, zoom, aspect, croppedImageUrl) => {
    const newCarsList = [...cars];
    const carIndex = cars.findIndex((x) => x.id === id);
    const car = cars[carIndex];
    const newCar = { ...car, croppedImageUrl, crop, zoom, aspect };
    newCarsList[carIndex] = newCar;
    setCars(newCarsList);
    setSelectedCar(null);
  };

  const resetImage = (id) => {
    setCroppedImageFor(id);
  };

  return (
    <div>
      {selectedCar ? (
        <ImageCropDialog
          id={selectedCar.id}
          imageUrl={selectedCar.imageUrl}
          cropInit={selectedCar.crop}
          zoomInit={selectedCar.zoom}
          aspectInit={selectedCar.aspect}
          onCancel={onCancel}
          setCroppedImageFor={setCroppedImageFor}
          resetImage={resetImage}
        />
      ) : null}
      {cars.map((car) => (
        <div className="imageCard" key={car.id}>
          <img
            src={car.croppedImageUrl ? car.croppedImageUrl : car.imageUrl}
            alt=""
            onClick={() => {
              console.log(car);
              setSelectedCar(car);
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
