import React, { useState } from "react";

export default function CreateListing() {
    const [formData, setFormData] = useState({
        type: "rent",
        name: "34 Thượng Đình",
        beds: 1,
        baths: 1,
        parking: false,
        furnished: false,
        address: "34 Thượng Đình, Thanh Xuân, Hà Nội",
        description: "Nhà đẹp, đầy đủ tiện nghi",
        offer: true,
        regularPrice: "100000000",
        discount: "10000000",
        images: [],
    });
    const [displayPrice, setDisplayPrice] = useState("");
    const [displayDiscount, setDisplayDiscount] = useState("");

    function onChange(e) {
        let { id, value, files, type } = e.target;
        if (id === "sell" || id === "rent") {
            setFormData((prev) => ({
                ...prev,
                type: id,
            }));
        } else if (id === "parking" || id === "furnished" || id === "offer") {
            setFormData((prev) => ({
                ...prev,
                [id]: value === "yes",
            }));
        } else if (id === "images") {
            // Chỉ nhận file jpg, jpeg, png và tối đa 6 file
            const validFiles = Array.from(files).filter(
                (file) =>
                    ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
            );
            if (validFiles.length > 6) {
                alert("Chỉ được chọn tối đa 6 hình!");
                return;
            }
            setFormData((prev) => ({
                ...prev,
                images: validFiles,
            }));
        } else if (id === "regularPrice") {
            // Chỉ nhận số, loại bỏ ký tự không phải số
            const raw = value.replace(/\D/g, "");
            setFormData((prev) => ({
                ...prev,
                regularPrice: raw,
            }));
            setDisplayPrice(raw ? Number(raw).toLocaleString("vi-VN") : "");
        } else if (id === "discount") {
            const raw = value.replace(/\D/g, "");
            setFormData((prev) => ({
                ...prev,
                discount: raw,
            }));
            setDisplayDiscount(raw ? Number(raw).toLocaleString("vi-VN") : "");
        } else {
            setFormData((prev) => ({
                ...prev,
                [id]: type === "number" ? Number(value) : value,
            }));
        }
        console.log("Form data updated:", formData);
    }

    function onSubmit(e) {
        e.preventDefault();
        // Xử lý lưu dữ liệu ở đây
        alert("Đã gửi thông tin (demo)");
    }

    return (
        <section className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Tạo thông tin nhà cho thuê/bán
            </h1>
            <form onSubmit={onSubmit}>
                {/* Sell/Rent */}
                <div className="mb-4 flex gap-4 items-center">
                    <span className="font-medium">Loại:</span>
                    <button
                        type="button"
                        id="sell"
                        className={`px-4 py-2 rounded ${formData.type === "sell"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                            }`}
                        onClick={onChange}
                    >
                        Bán
                    </button>
                    <button
                        type="button"
                        id="rent"
                        className={`px-4 py-2 rounded ${formData.type === "rent"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                            }`}
                        onClick={onChange}
                    >
                        Thuê
                    </button>
                </div>
                {/* Name */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium" htmlFor="name">
                        Tên nhà <span className="text-red-500">*</span>
                    </label>
                    <input
                        className="w-full px-4 py-2 border rounded"
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={onChange}
                        required
                    />
                </div>
                {/* Beds & Baths */}
                <div className="mb-4 flex gap-4">
                    <div className="flex-1">
                        <label className="block mb-1 font-medium" htmlFor="beds">
                            Số phòng ngủ <span className="text-red-500">*</span>
                        </label>
                        <input
                            className="w-full px-4 py-2 border rounded"
                            type="number"
                            id="beds"
                            min="1"
                            value={formData.beds}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 font-medium" htmlFor="baths">
                            Số phòng tắm <span className="text-red-500">*</span>
                        </label>
                        <input
                            className="w-full px-4 py-2 border rounded"
                            type="number"
                            id="baths"
                            min="1"
                            value={formData.baths}
                            onChange={onChange}
                            required
                        />
                    </div>
                </div>
                {/* Parking spot */}
                <div className="mb-4 flex gap-4 items-center">
                    <span className="font-medium">Chỗ đậu xe:</span>
                    <button
                        type="button"
                        id="parking"
                        value="yes"
                        className={`px-4 py-2 rounded ${formData.parking ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                        onClick={onChange}
                    >
                        Có
                    </button>
                    <button
                        type="button"
                        id="parking"
                        value="no"
                        className={`px-4 py-2 rounded ${!formData.parking ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                        onClick={onChange}
                    >
                        Không
                    </button>
                </div>
                {/* Furnished */}
                <div className="mb-4 flex gap-4 items-center">
                    <span className="font-medium">Nội thất:</span>
                    <button
                        type="button"
                        id="furnished"
                        value="yes"
                        className={`px-4 py-2 rounded ${formData.furnished ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                        onClick={onChange}
                    >
                        Có
                    </button>
                    <button
                        type="button"
                        id="furnished"
                        value="no"
                        className={`px-4 py-2 rounded ${!formData.furnished ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                        onClick={onChange}
                    >
                        Không
                    </button>
                </div>
                {/* Address */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium" htmlFor="address">
                        Địa chỉ <span className="text-red-500">*</span>
                    </label>
                    <input
                        className="w-full px-4 py-2 border rounded"
                        type="text"
                        id="address"
                        value={formData.address}
                        onChange={onChange}
                        required
                    />
                </div>
                {/* Description */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium" htmlFor="description">
                        Mô tả <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        className="w-full px-4 py-2 border rounded"
                        id="description"
                        value={formData.description}
                        onChange={onChange}
                        rows={3}
                        required
                    />
                </div>
                {/* Offers */}
                <div className="mb-4 flex gap-4 items-center">
                    <span className="font-medium">Ưu đãi:</span>
                    <button
                        type="button"
                        id="offer"
                        value="yes"
                        className={`px-4 py-2 rounded ${formData.offer ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                        onClick={onChange}
                    >
                        Có
                    </button>
                    <button
                        type="button"
                        id="offer"
                        value="no"
                        className={`px-4 py-2 rounded ${!formData.offer ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                        onClick={onChange}
                    >
                        Không
                    </button>
                </div>
                {/* Regular Price */}
                <div className="mb-4">
                    <label className="block mb-1 font-medium" htmlFor="regularPrice">
                        Giá {formData.type === "sell" ? "bán" : "thuê"} <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                        <input
                            className="w-full px-4 py-2 border rounded"
                            type="text"
                            id="regularPrice"
                            inputMode="numeric"
                            value={displayPrice}
                            onChange={onChange}
                            required
                        />
                        {formData.type === "rent" && (
                            <div className="ml-2 flex items-center whitespace-nowrap">$ / tháng</div>
                        )}
                    </div>
                </div>

                {/* Discount Price */}
                {formData.offer && (
                    <div className="mb-4">
                        <label className="block mb-1 font-medium" htmlFor="discount">
                            Giá ưu đãi <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                className="w-full px-4 py-2 border rounded"
                                type="text"
                                id="discount"
                                inputMode="numeric"
                                value={displayDiscount}
                                onChange={onChange}
                                required={formData.offer}
                            />
                            {formData.type === "rent" && (
                                <div className="ml-2 flex items-center whitespace-nowrap">$ / tháng</div>
                            )}
                        </div>
                    </div>
                )}
                {/* Images */}
                <div className="mb-6">
                    <label className="block mb-1 font-medium" htmlFor="images">
                        Hình ảnh (tối đa 6, jpg/jpeg/png)
                    </label>
                    <input
                        className="w-full"
                        type="file"
                        id="images"
                        accept=".jpg,.jpeg,.png"
                        multiple
                        onChange={onChange}

                    />
                    {formData.images.length > 0 && (
                        <div className="mt-2 text-sm text-gray-600">
                            Đã chọn {formData.images.length} hình
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                    Tạo mới
                </button>
            </form>
        </section>
    );
}
