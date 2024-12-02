import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { CloudUploadIcon, Trash } from "lucide-react";
import axios from "axios";
import { URL } from "@/App";

const UploadImage = ({
  imageBase64,
  setImageBase64,
  formData,
  setFormData,
}) => {
  const [loadingImage, setLoadingImage] = useState(false);
  const Ref = useRef(null);

  const base64 = (file) => {
    const reader = new FileReader();
    if (file.type.startsWith("image")) {
      reader.onload = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      console.log("invalid image type");
    }
  };

  const imageHandler = (e) => {
    const file = e?.target?.files?.[0];
    base64(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedImage = e.dataTransfer.files?.[0];
    if (droppedImage) {
      base64(droppedImage);
    }
  };

  const uploadImageToCloudinary = async () => {
    try {
      setLoadingImage(true);
      const { data } = await axios.post(`${URL}/admin/products/upload-image`, {
        image: imageBase64,
      });
      setFormData({ ...formData, image: data.url });
    } catch (error) {
      console.log(error);
    }
    setImageBase64("");
    setLoadingImage(false);
  };

  const handleImageRemove = async () => {
    try {
      await axios.post(`${URL}/admin/products/remove-image`, {
        imageUrl: formData.image,
      });
      setFormData({ ...formData, image: "" });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (imageBase64?.length !== 0) {
      uploadImageToCloudinary();
    }
  }, [imageBase64]);

  return (
    <div className="flex flex-col gap-4 py-4">
      {loadingImage ? (
        <div className="h-48 w-full border-2 rounded-xl flex justify-center items-center">
          <p>...loading</p>
        </div>
      ) : (
        <>
          {formData?.image?.length !== 0 ? (
            <>
              <div className="w-full flex justify-between items-center">
                <h3 className="text-sm font-semibold">Remove Image</h3>
                <Button
                  onClick={handleImageRemove}
                  className="rounded-full w-8 h-8 flex justify-center items-center"
                >
                  <Trash size={10} />
                </Button>
              </div>
              <div className="h-48 w-full border-2 rounded-xl flex justify-center items-center gap-2 relative">
                <img
                  src={formData.image}
                  className="w-full h-full object-cover"
                />
              </div>
            </>
          ) : (
            <>
              <Label className="h-8 text-sm font-semibold flex justify-start items-center">
                Upload Image
              </Label>
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => Ref.current.click()}
                className="h-48 w-full border-2 rounded-xl flex flex-col justify-center items-center gap-2"
              >
                <CloudUploadIcon size={50} className="text-primary" />
                <p className="font-semibold">Upload Image</p>
              </div>
              <Input
                ref={Ref}
                type="file"
                onChange={imageHandler}
                className="hidden"
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UploadImage;
