import { BsX } from "react-icons/bs";

function Previews({ imageFiles, removeImage }) {
  return (
    <div className="center w-full pb-8">
      <div className="flex flex-col justify-center items-center  space-y-4 w-[90%] ">
        <h3 className="text-white text-center font-bold text-xl lg:text-2xl">
          {imageFiles
            ? "Previews are shown below."
            : "Previews will appear below."}
        </h3>
        {imageFiles && (
          <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-4 gap-8">
            {imageFiles.map((file, i) => (
              <div className="relative group border h-[150px] w-max" key={i}>
                <img
                  src={file.preview}
                  alt="Preview"
                  className=" w-full md:w-max  h-[200px] "
                />

                {/* Remove button for mobile view */}

                <button
                  onClick={removeImage(i)}
                  className="absolute md:hidden top-0 right-0 p-1 bg-black/80 text-white/80 rounded-bl-lg"
                >
                  <BsX className="text-xl" />
                </button>

                {/* overlay with cancel option on hover */}
                <div className="hidden md:flex justify-center items-center absolute   inset-0     bg-black/80 opacity-0  group-hover:opacity-80   w-full">
                  <button
                    onClick={removeImage(i)}
                    className="font-medium group-hover:block  text-sm p-6 text-center text-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Previews;
