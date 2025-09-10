import { useDropzone } from "react-dropzone";
import { FiTrash2, FiUpload } from "react-icons/fi";
import Card from "../layout/Card";
import { useStore } from "../../store/userStore";


export default function UploaderCard() {
const { images, addImages, removeImage } = useStore();
const { getRootProps, getInputProps } = useDropzone({ onDrop: addImages });


return (
<Card title="Happiness Gallery">
<div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50 transition">
<input {...getInputProps()} />
<FiUpload className="mx-auto text-2xl text-purple-600" />
<p className="text-gray-600 mt-2">Drag & drop or click to upload</p>
</div>
<div className="grid grid-cols-3 gap-4 mt-4">
{images.map((file, i) => (
<div key={i} className="relative group">
<img src={file.preview} alt="preview" className="w-full h-24 object-cover rounded-xl" />
<button
onClick={() => removeImage(i)}
className="absolute top-2 right-2 bg-white/80 p-1 rounded-full shadow hover:bg-red-500 hover:text-white"
>
<FiTrash2 />
</button>
</div>
))}
</div>
</Card>
);
}