import { BsX } from "react-icons/bs";

function Previews({ imageFiles, removeImage }) {
  return (
    <div className="flex flex-col justify-center items-center w-full space-y-4">
      <h3 className="text-white text-center font-bold text-xl lg:text-2xl">
        {imageFiles
          ? "Previews are shown below."
          : "Previews will appear below."}
      </h3>
      {imageFiles && (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-4 gap-8">
          {imageFiles.map((file, i) => (
            <div className="relative group border border-white/10" key={i}>
              <img
                src={file.preview}
                alt="Preview"
                className="object-cover w-[150px] h-[150px] "
              />

              {/* Remove button for mobile view */}

              <button
                onClick={removeImage(i)}
                className="absolute md:hidden top-0 right-0 p-1 bg-black/80 text-white/80 rounded-bl-lg"
              >
                <BsX className="text-xl" />
              </button>

              {/* overlay with cancel option on hover */}
              <div className="absolute hidden md:flex top-0 left-0 w-full h-full bg-black/80 opacity-0  group-hover:opacity-80  justify-center items-center">
                <button
                  onClick={removeImage(i)}
                  className="hidden font-medium group-hover:block text-sm text-center text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Previews;