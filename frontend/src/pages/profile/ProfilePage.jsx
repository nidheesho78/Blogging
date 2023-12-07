import React, { useEffect, useMemo } from "react";
import MainLayout from "../../components/MainLayout";
import {  useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {  useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {getUserProfile, updateProfile } from '../../services/index/users.js'
import ProfilePicture from "../../components/ProfilePicture.jsx";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { userActions } from "../../store/reducers/userReducers.js";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {data: profileData, isLoading: profileIsLoading,  } = useQuery({
    queryFn: () => {
        return getUserProfile({token: userState.userInfo.token})
    },
    queryKey: ['profile']
  });

  const { mutate, isLoading: updateProfileIsLoading } = useMutation({
    mutationFn: ({ name, email, mobile, password }) => {
      return updateProfile({
        token: userState.userInfo.token,
        userData: {name, email, mobile, password},
      });
    },
    onSuccess: (data) => {
      console.log("Data :", data);
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(['profile'])
      toast.success("Profile updated successfully");

    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  
  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
    },
    values: useMemo(() => {
      return {
        name: profileIsLoading ? " " : profileData.name,
        email: profileIsLoading ? " " : profileData.email,
        mobile: profileIsLoading ? " " : profileData.mobile,
      };
    }, [
      profileData?.name,
      profileData?.email,
      profileData?.mobile,
      profileIsLoading,
    ]),
    mode: "onChange",
  });
  
  const submitHandler = (data) => {
    const {name, email, mobile, password} = data;
    mutate({name, email, mobile, password});
  };
  

  return (
    <MainLayout>
      <section className=" container mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto">
         
          <ProfilePicture avatar={profileData?.avatar} />

          <form onSubmit={handleSubmit(submitHandler)}>
            <div className=" flex flex-col mb-6 w-full">
              <label
                htmlFor="name"
                className="text-[#5a7184] font-semibold block"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  validate: (value) =>
                    value.trim().length > 0 || "Name is required",
                  minLength: {
                    value: 1,
                    message: "Name length must be at least 1 character",
                  },

                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                placeholder="Enter your name"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 
                        rounded-lg px-5 py-4 
                        font-semibold block outline-none border ${
                          errors.name ? "border-red-500" : "border-[#c3cad9]"
                        }`}
              />
              {errors.name?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className=" flex flex-col mb-6 w-full">
              <label
                htmlFor="email"
                className="text-[#5a7184] font-semibold block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Enter a valid email",
                  },
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                })}
                placeholder="Enter your email"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 
                        rounded-lg px-5 py-4 
                        font-semibold block outline-none border ${
                          errors.email ? "border-red-500" : "border-[#c3cad9]"
                        }`}
              />
              {errors.email?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className=" flex flex-col mb-6 w-full">
              <label
                htmlFor="mobile"
                className="text-[#5a7184] font-semibold block"
              >
                Mobile
              </label>
              <input
                type="number"
                id="mobile"
                {...register("mobile", {
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid mobile number",
                  },
                  required: {
                    value: true,
                    message: "Mobile Number is required",
                  },
                })}
                placeholder="Enter your number"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 
                        rounded-lg px-5 py-4 
                        font-semibold block outline-none border ${
                          errors.mobile ? "border-red-500" : "border-[#c3cad9]"
                        }`}
              />
              {errors.mobile?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.mobile?.message}
                </p>
              )}
            </div>
            <div className=" flex flex-col mb-6 w-full">
              <label
                htmlFor="password"
                className="text-[#5a7184] font-semibold block"
              >
                New Password (optional)
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                placeholder="Enter new password"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 
                        rounded-lg px-5 py-4 
                        font-semibold block outline-none border ${
                          errors.password
                            ? "border-red-500"
                            : "border-[#c3cad9]"
                        }`}
              />
              {errors.password?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid || profileIsLoading || updateProfileIsLoading}
              className="bg-orange-400 text-white font-bold text-lg 
              py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Update Profile
            </button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProfilePage;
