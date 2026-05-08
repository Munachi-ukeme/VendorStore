import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { createProduct, updateProduct, getCategories } from "../api/api";
import styles from "./ProductForm.module.css";

function ProductForm ({ editingProduct, onSaved, onCancel }) {
    const { seller } = useAuth();

    // figure out how many this plan allows
    let maxImages;
    if(seller?.plan === "basic") {
        maxImages = 1;
    } else if ( seller?.plan === "pro"){
        maxImages = 2;
    } else if ( seller?.plan === "premium"){
        maxImages = 3;
    } else{
        maxImages = 1;
    }

    const[name, setName] = useState("");

    const[price, setPrice] = useState("");

    const[description, setDescription] = useState("");

    const[categoryId, setCategoryId] = useState("")

    const[images, setImages] = useState([]);

    const[colors, setColors] = useState([]);

    const[sizes, setSizes] = useState([]);

    const[colorInput, setColorInput] = useState("");

    const[sizeInput, setSizeInput] = useState("");

    const[categories, setCategories] = useState([]);

    const[loading, setLoading] = useState(false);

    const[error, setError] = useState(null);

    //load categories for the dropdown
    useEffect(() =>{
        const loadCategories = async() =>{
            const data = await getCategories();
            if (!data.error){
                setCategories(data);
            }
        };
        loadCategories();
    }, []);

    // if editing, fill the form with existing product data
    useEffect(() =>{
        if (editingProduct) {
            setName(editingProduct.name || "");
            setPrice(editingProduct.price || "");
            setDescription(editingProduct.description || "");
            setCategoryId(editingProduct.categoryId || "");
            setColors(editingProduct.colors || [])
            setSizes(editingProduct.sizes || []);
        } else {
            //reset form when adding new product
            setName("");
            setPrice("");
            setDescription("");
            setCategoryId("");
            setImages([]);
            setColors([]);
            setSizes([]);
        }
    }, [editingProduct]);

    // add a color tag
    const handleAddColor = () =>{
        const trimmed = colorInput.trim();
        if (!trimmed) {
            return;
        }

        if (colors.includes(trimmed)) {
            return;
        }

        setColors([...colors, trimmed]);
        setColorInput("");
    };

    //remove a color tag
    const handleRemoveColor = (colorToRemove) =>{
        setColors(colors.filter((color) => color !== colorToRemove));
    };

    //add a size tag
    const handleAddSize = () =>{
        const trimmed = sizeInput.trim();
        if (!trimmed) {
            return;
        }

        if (sizes.includes(trimmed)){
            return;
        }
        setSizes([...sizes, trimmed]);
        setSizeInput("");
    };

    //remove a size tag
    const handleRemoveSize = (sizeToRemove) =>{
        setSizes(sizes.filter((size) => size !== sizeToRemove));
    };

    //handle image file selection
    const handleImageChange = (e) =>{
        const selectedFiles = Array.from(e.target.files);
        setImages(selectedFiles);
    };

    const handleSave = async () =>{
        setError(null);

        // basic validation
        if (!name) {
            setError("Product name is required.");
            return;
        }

        if(!price) {
            setError("Price is required.");
            return;
        }

        if(!categoryId){
            setError("Please select a category.");
            return;
        }

        if(!editingProduct && images.length === 0){
            setError("Please upload at least one image.");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("categoryId", categoryId);

        //append colors as JSON string
        formData.append("colors", JSON.stringify(colors));

        //append sizes as JSON string
        formData.append("sizes", JSON.stringify(sizes));

        //append each image file
        images.forEach((image) =>{
            formData.append("images", image);
        });

        let data;
        if(editingProduct){
            data = await updateProduct(editingProduct._id, formData);
        } else {
            data = await createProduct(formData);
        }

        setLoading(false);

        if(data.error){
            setError(data.error);
            return;
        }

        //tell productpage the save was successful
        onSaved(data);
    };

    return (
        <div>

        </div>
    );
}