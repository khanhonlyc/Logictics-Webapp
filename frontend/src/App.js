import React from "react";
import "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import ScrollOnTopBtn from "./components/ScrollOnTopBtn";
import MainProvider from "./context/MainContext";
import CustomerRoute from "./layouts/CustomerRoute";
import DriverRoute from "./layouts/DriverRoute";
import ProtectedRoute from "./layouts/ProtectLayout";
import StaffRoute from "./layouts/StaffLayout";
import {
  About,
  AdminAbout,
  AdminApplicant,
  AdminBill,
  AdminCar,
  AdminCareer,
  AdminCommitment,
  AdminContactMessage,
  AdminContactUs,
  AdminCustomer,
  AdminDeliveryService,
  AdminDepartment,
  AdminMaintenance,
  AdminOrder,
  AdminPage,
  AdminPartner,
  AdminProhibitProduct,
  AdminRoad,
  AdminSchedule,
  AdminStaff,
  AdminTurnover,
  AdminWarehouse,
  Bills,
  CareerOpportunities,
  ChangePassword,
  Commit,
  Contact,
  CreateOrder,
  DefaultLayout,
  DetailOpportunites,
  ForgetPass,
  Home,
  Inventory,
  InventoryDetail,
  LayerStorekeeper,
  Life,
  ListOpportunities,
  Login,
  NotificationCustomer,
  NotificationDriver,
  NotiStorekeeper,
  OrderDetail,
  OrderTrip,
  PageNotFound,
  PagePdf,
  Policy,
  PolicyDriver,
  Profile,
  ProfileDriver,
  ProfileStorekeeper,
  Purchase,
  PurchaseDetail,
  PurchaseDriver,
  PurchaseStage,
  RecruitmentDetails,
  Register,
  Register_OTP,
  Service,
  ServiceAll,
  ServiceDetail,
  SignUpAdvice,
  StaffLogin,
  StaffRegister,
  Track,
  Turnover,
  TurnoverStorekeeper,
  TinTucNoiBat,
  Magazine,
  NewsDetailBlog,
  IndustryNews
} from "./pages/pageExport";
import Metadata from "./SEO/Metadata";

import BillManagement from "./pages/Storekeeper/BillManagement";
import ImportExport from "./pages/Storekeeper/ImportExport";
import Revenue from "./pages/Storekeeper/Revenue";
import AdminPostBlog from "./pages/Admin/AdminPostBlog";

const App = () => {
  return (
    <MainProvider>
      <Metadata>
        <BrowserRouter>
          <div className="wrapper overflow-hidden">
            <ScrollToTop />
            <ScrollOnTopBtn />
            <Routes>
              <Route path="/uploads/*" element={<PagePdf />} />
              <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Home />}></Route>
                <Route path="ve-chung-toi" element={<About />} />
                <Route path="cam-ket" element={<Commit />} />
                {/* -----------------------Tra cứu---------------------- */}
                <Route
                  path="tra-cuu"
                  element={<Track number="cuoc-van-chuyen" />}
                ></Route>
                <Route
                  path="tra-cuu/cuoc-van-chuyen"
                  element={<Track number="cuoc-van-chuyen" />}
                />
                <Route
                  path="tra-cuu/van-don"
                  element={<Track number="van-don" />}
                />
                <Route
                  path="tra-cuu/buu-cuc"
                  element={<Track number="buu-cuc" />}
                />
                <Route
                  path="tra-cuu/bang-gia"
                  element={<Track number="bang-gia" />}
                />
                <Route
                  path="tra-cuu/hang-cam-gui"
                  element={<Track number="hang-cam-gui" />}
                />

                {/* ------------------------Tuyển dụng------------------- */}
                <Route
                  path="danh-sach-tuyen-dung"
                  element={<ListOpportunities />}
                />
                <Route path="tuyen-dung/:id" element={<DetailOpportunites />} />
                <Route path="tuyen-dung" element={<CareerOpportunities />}>
                  <Route
                    path="chi-tiet-viec-lam-noi-bat"
                    element={<RecruitmentDetails />}
                  />
                  <Route
                    path="chi-tiet-viec-lam-moi"
                    element={<RecruitmentDetails />}
                  />
                </Route>
                <Route path="cuoc-song" element={<Life />} />
                {/* ------------------------Dịch vụ---------------------- */}
                <Route path="dich-vu" element={<Service />} />
                <Route path="dich-vu/:id" element={<ServiceAll />} />
                <Route
                  path="dich-vu-chuyen-phat-tieu-chuan"
                  element={
                    <ServiceDetail
                      serviceTitle="Dịch vụ chuyển phát tiêu chuẩn"
                      serviceSubtitle="TKT Express"
                    />
                  }
                />
                <Route
                  path="dich-vu-nhanh"
                  element={
                    <ServiceDetail
                      serviceTitle="Dịch vụ Nhanh"
                      serviceSubtitle="TKT Fast"
                    />
                  }
                />
                <Route
                  path="sieu-dich-vu-giao-hang"
                  element={
                    <ServiceDetail
                      serviceTitle="Siêu dịch vụ giao hàng"
                      serviceSubtitle="TKT Super"
                    />
                  }
                />
                <Route
                  path="dich-vu-tuoi-song"
                  element={
                    <ServiceDetail
                      serviceTitle="Dịch vụ tươi sống"
                      serviceSubtitle="TKT Fresh"
                    />
                  }
                />
                <Route
                  path="tuyen-van-chuyen-quoc-te"
                  element={
                    <ServiceDetail
                      serviceTitle="Tuyến vận chuyển quốc tế"
                      serviceSubtitle="TKT International"
                    />
                  }
                />
                {/* ----------------------Blog------------------ */}

                <Route element={<TinTucNoiBat />} path="tin-tuc-noi-bat" />
                {/* <Route path= 'tin-tuc-noi-bat/:NewId' element={<NewsDetailBlog />} /> */}
                <Route path= 'chi-tiet-Blog/:BlogId' element={<NewsDetailBlog />} />
                <Route element={<Magazine />} path="J-Magazine" />
                <Route element={<IndustryNews />} path="IndustryNews" />
                {/* ----------------------Profile------------------ */}
                <Route element={<CustomerRoute />}>
                  <Route
                    path="khach-hang/trang-ca-nhan"
                    element={<Profile />}
                  />
                  <Route
                    path="khach-hang/lich-su-dat-hang"
                    element={<Purchase />}
                  />
                  <Route
                    path="khach-hang/thay-doi-mat-khau"
                    element={<ChangePassword />}
                  />
                  <Route
                    path="khach-hang/dat-hang/:id"
                    element={<PurchaseDetail />}
                  />
                  <Route
                    path="khach-hang/don-dat-hang"
                    element={<CreateOrder />}
                  />
                  <Route
                    path="khach-hang/lich-su-dat-hang/don-hang/:id"
                    element={<PurchaseStage />}
                  />
                  <Route
                    path="khach-hang/thong-bao/don-hang"
                    element={<NotificationCustomer />}
                  />
                  <Route path="khach-hang/chinh-sach" element={<Policy />} />
                  <Route path="khach-hang/doanh-thu" element={<Turnover />} />
                </Route>

                {/* -------------------------Đăng kí/Đăng nhập------------- */}
                <Route element={<ProtectedRoute />}>
                  <Route path="dang-ki" element={<Register />} />
                  <Route path="dang-nhap" element={<Login />} />
                  <Route path="quen-mat-khau" element={<ForgetPass />} />
                  <Route path="xac-thuc-otp" element={<Register_OTP />} />
                </Route>
                {/* -----------------------Tư vấn----------------------- */}
                <Route path="tu-van/lien-he" element={<Contact />} />
                <Route
                  path="tu-van/dang-ki-tu-van"
                  element={<SignUpAdvice />}
                />
                <Route path="*" element={<PageNotFound />} />
              </Route>
              {/* -----------------------Nhân viên----------------------- */}
              <Route element={<StaffRoute />}>
                <Route path="/" element={<DefaultLayout />}>
                  <Route element={<DriverRoute />}>
                    <Route
                      path="tai-xe/trang-ca-nhan"
                      element={<ProfileDriver />}
                    />
                    <Route
                      path="tai-xe/dat-hang"
                      element={<PurchaseDriver />}
                    />
                    <Route
                      path="tai-xe/dat-hang/:id"
                      element={<OrderDetail />}
                    />
                    <Route
                      path="tai-xe/thong-bao"
                      element={<NotificationDriver />}
                    />
                    <Route
                      path="tai-xe/chinh-sach"
                      element={<PolicyDriver />}
                    />
                    <Route
                      path="tai-xe/chi-tiet-don-hang"
                      element={<OrderDetail />}
                    />
                    <Route
                      path="tai-xe/hanh-trinh-don-hang/:ID"
                      element={<OrderTrip />}
                    />
                  </Route>
                  <Route path="dang-nhap-nhan-vien" element={<StaffLogin />} />
                </Route>
                <Route path="dang-ki-nhan-vien" element={<StaffRegister />} />

                <Route path="thu-kho" element={<LayerStorekeeper />}>
                  <Route index element={<ProfileStorekeeper />} />
                  <Route
                    path="trang-ca-nhan"
                    element={<ProfileStorekeeper />}
                  />
                  <Route path="hang-ton-kho" element={<Inventory />} />
                  <Route path="van-don" element={<Bills />} />
                  <Route path="hang-ton-kho" element={<InventoryDetail />} />
                  <Route
                    path="quan-ly-hoa-don"
                    element={<BillManagement />}
                  ></Route>
                  <Route path="xuat-nhap" element={<ImportExport />}></Route>
                  <Route path="doanh-thu-kho" element={<Revenue />}></Route>

                  {/* <Route path="hang-ton-kho/:id" element={<InventoryDetail />} /> */}
                  <Route path="thong-bao" element={<NotiStorekeeper />} />
                  <Route path="doanh-thu" element={<TurnoverStorekeeper />} />
                </Route>
                <Route path="quan-tri" element={<AdminPage />}>
                  <Route path="ve_chung_toi" element={<AdminAbout />}></Route>
                  <Route path="lien_he" element={<AdminContactUs />}></Route>
                  <Route
                    path="commitment"
                    element={<AdminCommitment />}
                  ></Route>
                  <Route
                    path="tin_nhan"
                    element={<AdminContactMessage />}
                  ></Route>
                  <Route
                    path="dich-vu"
                    element={<AdminDeliveryService />}
                  ></Route>
                  <Route path="dang-tai-blog" element={<AdminPostBlog />} />
                  <Route path="partner" element={<AdminPartner />}></Route>
                  <Route path="viec-lam" element={<AdminCareer />}></Route>
                  <Route path="ung-vien" element={<AdminApplicant />}></Route>
                  <Route path="phong-ban" element={<AdminDepartment />}></Route>
                  <Route path="kho" element={<AdminWarehouse />}></Route>
                  <Route path="phuong-tien" element={<AdminCar />}></Route>
                  <Route path="hanh-trinh" element={<AdminRoad />}></Route>
                  <Route path="nhan_vien" element={<AdminStaff />}></Route>
                  <Route path="khach_hang" element={<AdminCustomer />}></Route>
                  <Route path="don_hang" element={<AdminOrder />}></Route>
                  <Route path="hoa_don" element={<AdminBill />}></Route>
                  <Route path="doanh_so" element={<AdminTurnover />}></Route>
                  <Route
                    path="them-nhan-vien"
                    element={<StaffRegister />}
                  ></Route>
                  <Route
                    path="phi-bao-tri"
                    element={<AdminMaintenance />}
                  ></Route>
                  <Route
                    path="hang_cam_gui"
                    element={<AdminProhibitProduct />}
                  ></Route>
                  <Route path="lich_trinh" element={<AdminSchedule />}></Route>
                </Route>
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </Metadata>
    </MainProvider>
  );
};

export default App;
