import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import OAuth from "../components/OAuth";

const BANKS = [
  "Vietcombank",
  "VietinBank",
  "BIDV",
  "Agribank",
  "Techcombank",
  "MB Bank",
  "ACB",
  "Sacombank",
  "VPBank",
  "TPBank",
];

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    hoVaTen: "",
    ngaySinh: "",
    gioiTinh: "",
    soDienThoai: "",
    queQuan: "",
    diaChiHienTai: "",
    soCMND: "",
    ngayCap: "",
    noiCap: "",
    soTkNganHang: "",
    nganHang: "",
    chiNhanhLamViec: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Validate từng trường
  function validateField(id, value) {
    let error = "";
    if (
      [
        "name",
        "email",
        "password",
        "hoVaTen",
        "ngaySinh",
        "gioiTinh",
        "soDienThoai",
        "queQuan",
        "diaChiHienTai",
        "soCMND",
        "ngayCap",
        "noiCap",
        "soTkNganHang",
        "nganHang",
        "chiNhanhLamViec",
      ].includes(id) &&
      !value
    ) {
      error = "Trường này là bắt buộc.";
    }
    if (id === "ngaySinh" && value) {
      const birth = new Date(value);
      const now = new Date();
      const age = now.getFullYear() - birth.getFullYear();
      if (age > 60) error = "Tuổi không được quá 60.";
    }
    if (id === "soDienThoai" && value && !/^\d{10}$/.test(value)) {
      error = "Số điện thoại phải có đúng 10 chữ số.";
    }
    if (id === "soCMND" && value && !/^\d{12}$/.test(value)) {
      error = "Số CMND phải có đúng 12 chữ số.";
    }
    if (id === "nganHang" && value && !BANKS.includes(value)) {
      error = "Vui lòng chọn ngân hàng hợp lệ.";
    }
    setErrors((prev) => ({ ...prev, [id]: error }));
    return error === "";
  }

  function onChange(e) {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    validateField(id, value);
  }

  function onBlur(e) {
    const { id, value } = e.target;
    validateField(id, value);
  }

  function validateAll() {
    let valid = true;
    Object.entries(formData).forEach(([id, value]) => {
      if (!validateField(id, value)) valid = false;
    });
    return valid;
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!validateAll()) {
      toast.error("Vui lòng kiểm tra lại các trường nhập!");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(userCredential.user, { displayName: formData.name });
      await setDoc(doc(db, "users", userCredential.user.uid), {
        ...formData,
        timestamp: new Date(),
      });
      toast.success("Đăng ký thành công!");
      navigate("/");
    } catch (error) {
      toast.error("Đăng ký thất bại: " + error.message);
    }
  }

  return (
    <section>
      <h1 className="text-3xl text-center font-bold py-5">Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center max-w-6xl mx-auto px-3">
        <div className="w-full md:w-2/3 lg:w-1/2">
          <img
            src="https://plus.unsplash.com/premium_photo-1663089688180-444ff0066e5d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2V5fGVufDB8fDB8fHww"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-2/3 lg:w-2/5 lg:ml-20 mt-6">
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  className="w-full px-4 py-2 text-xl rounded mt-4"
                  type="text"
                  id="name"
                  value={formData.name}
                  placeholder="Tên tài khoản"
                  required
                  onChange={onChange}
                  onBlur={onBlur}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
                <input
                  className="w-full px-4 py-2 text-xl rounded mt-4"
                  type="email"
                  id="email"
                  value={formData.email}
                  placeholder="Email"
                  required
                  onChange={onChange}
                  onBlur={onBlur}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
                <div className="relative mt-4">
                  <input
                    className="w-full px-4 py-2 text-xl rounded"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={formData.password}
                    placeholder="Password"
                    required
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2"
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
                <input
                  className="w-full px-4 py-2 text-xl rounded mt-4"
                  type="text"
                  id="hoVaTen"
                  value={formData.hoVaTen}
                  placeholder="Họ và tên"
                  required
                  onChange={onChange}
                  onBlur={onBlur}
                />
                {errors.hoVaTen && (
                  <p className="text-red-500 text-sm">{errors.hoVaTen}</p>
                )}
                <input
                  className="w-full px-4 py-2 text-xl rounded mt-4"
                  type="date"
                  id="ngaySinh"
                  value={formData.ngaySinh}
                  placeholder="Ngày sinh"
                  required
                  onChange={onChange}
                  onBlur={onBlur}
                />
                {errors.ngaySinh && (
                  <p className="text-red-500 text-sm">{errors.ngaySinh}</p>
                )}
                <select
                  className="w-full px-4 py-2 text-xl rounded mt-4"
                  id="gioiTinh"
                  value={formData.gioiTinh}
                  required
                  onChange={onChange}
                  onBlur={onBlur}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
                {errors.gioiTinh && (
                  <p className="text-red-500 text-sm">{errors.gioiTinh}</p>
                )}
              </div>
              <div>
                <input
                  className="w-full px-4 py-2 text-xl rounded mt-4"
                  type="text"
                  id="soDienThoai"
                  value={formData.soDienThoai}
                  placeholder="Số điện thoại"
                  required
                  onChange={onChange}
                  onBlur={onBlur}
                />
                {errors.soDienThoai && (
                  <p className="text-red-500 text-sm">{errors.soDienThoai}</p>
                )}
                <input
                  className="w-full px-4 py-2 text-xl rounded mt-4"
                  type="text"
                  id="queQuan"
                  value={formData.queQuan}
                  placeholder="Quê quán"
                  required
                  onChange={onChange}
                  onBlur={onBlur}
                />
                {errors.queQuan && (
                  <p className="text-red-500 text-sm">{errors.queQuan}</p>
                )}
                <input
                  className="w-full px-4 py-2 text-xl rounded mt-4"
                  type="text"
                  id="diaChiHienTai"
                  value={formData.diaChiHienTai}
                  placeholder="Địa chỉ hiện tại"
                  required
                  onChange={onChange}
                  onBlur={onBlur}
                />
                {errors.diaChiHienTai && (
                  <p className="text-red-500 text-sm">{errors.diaChiHienTai}</p>
                )}
                <input
                  className="w-full px-4 py-2 text-xl rounded mt-4"
                  type="text"
                  id="soCMND"
                  value={formData.soCMND}
                  placeholder="Số CMND"
                  required
                  onChange={onChange}
                  onBlur={onBlur}
                />
                {errors.soCMND && (
                  <p className="text-red-500 text-sm">{errors.soCMND}</p>
                )}
                <input
                  className="w-full px-4 py-2 text-xl rounded mt-4"
                  type="date"
                  id="ngayCap"
                  value={formData.ngayCap}
                  placeholder="Ngày cấp"
                  required
                  onChange={onChange}
                  onBlur={onBlur}
                />
                {errors.ngayCap && (
                  <p className="text-red-500 text-sm">{errors.ngayCap}</p>
                )}
                <input
                  className="w-full px-4 py-2 text-xl rounded mt-4"
                  type="text"
                  id="noiCap"
                  value={formData.noiCap}
                  placeholder="Nơi cấp"
                  required
                  onChange={onChange}
                  onBlur={onBlur}
                />
                {errors.noiCap && (
                  <p className="text-red-500 text-sm">{errors.noiCap}</p>
                )}
                <input
                  className="w-full px-4 py-2 text-xl rounded mt-4"
                  type="text"
                  id="soTkNganHang"
                  value={formData.soTkNganHang}
                  placeholder="Số tài khoản ngân hàng"
                  required
                  onChange={onChange}
                  onBlur={onBlur}
                />
                {errors.soTkNganHang && (
                  <p className="text-red-500 text-sm">{errors.soTkNganHang}</p>
                )}
                <select
                  className="w-full px-4 py-2 text-xl rounded mt-4"
                  id="nganHang"
                  value={formData.nganHang}
                  required
                  onChange={onChange}
                  onBlur={onBlur}
                >
                  <option value="">Chọn ngân hàng</option>
                  {BANKS.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
                {errors.nganHang && (
                  <p className="text-red-500 text-sm">{errors.nganHang}</p>
                )}
                <input
                  className="w-full px-4 py-2 text-xl rounded mt-4"
                  type="text"
                  id="chiNhanhLamViec"
                  value={formData.chiNhanhLamViec}
                  placeholder="Chi nhánh làm việc"
                  required
                  onChange={onChange}
                  onBlur={onBlur}
                />
                {errors.chiNhanhLamViec && (
                  <p className="text-red-500 text-sm">{errors.chiNhanhLamViec}</p>
                )}
              </div>
            </div>
            <div>
              <button
                className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div>
            <p className="mt-6">
              Have an account?{" "}
              <Link to="/signin" className="text-blue-500 hover:underline">
                Sign In
              </Link>
            </p>
            <p className="mt-2">
              Forgot your password?{" "}
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Reset Password
              </Link>
            </p>
          </div>
          <div className="mt-6">
            <OAuth />
          </div>
        </div>
      </div>
    </section>
  );
}
