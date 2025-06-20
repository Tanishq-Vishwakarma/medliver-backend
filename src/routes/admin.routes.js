const express = require("express");
const indexController = require("../controllers/indexController");
const { verifyAdminToken } = require("../utils/jsonWebToken");
const {
    validate,
    validateQuery,
    createPharmacy,
    changeStatusPharmacyValidation,
    getAndDeletePharmacyById,
    getAllPharmacy,
    searchBestFeatureProducts,
    updatePharmacy,
    createPathologyCenter,
    getAndDeletePathologyCenterById,
    updatePathologyCenter,
    searchPathologyCenter,
    createFeature,
    searchTestCategoryValidation,
    getOrDeleteFeatureById,
    updateFeatureStatus,
    getAllFeatures,
    registerDeliveryPartner,
    getOrDeleteDeliveryPartner,
    updateDeliveryPartner,
    updateDeliveryPartnerStatus,
    getAllDeliveryPartners,
    blockUnblockDeliveryPartner,
    getAllCustomersValidation,
    getCustomerByIdValidation,
    createTestValidation,
    getTestdeleteAndById,
    getAllApiValidation,
    searchTestValidation,
    updateTestValidation,
    loginValidation,
    forgetPasswordValidation,
    resetPasswordValidation,
    changePasswordValidation,
    updateAdminProfileValidation,
    createBestSelling,
    UpdateAndDeleteBestSelling,
    getAllSellingProductValidation,
    createDoctorProfileValidation,
    getDoctoreByIdAndChangeStatusValidation,
    getAllDoctoreProfile,
    createMedicineValidation,
    updateMedicineValidation,
    getMedicineByIdValidation,
    deleteMedicineValidation,
    searchMedicineValidation,
    approveRejectDeliveryPartnerValidation,
    getAllDoctoreLeadValidation,
    getAnddeleteDoctoreLeadByIdValidation,
    updateDoctorLeadValidation,
    createDoctorCategoryValidation,
    getAndDeleteDoctorCategoryByIdValidation,
    updateDoctorCategoryValidation,
    getAllDoctorCategoryValidation,
    getAllInsuranceLeadsValidation,
    getInsuranceByIdValidation,
    archiveInsuranceByIdValidation,
    createSpecialOfferValidation,
    getAllSpecialOffersValidation,
    updateSpecialOfferValidation,
    specialOfferIdQueryValidation,
    activeDeactiveSpecialOfferValidation,
    createTestCategory,
    updateTestCategory,
    getOrDeleteTestCategory,
    removeTestFromCategory,
    getAllTestCatgValidation,
    getAllVehicleRequestsValidation,
    getVehicleRequestByIdValidation,
    updateVehicleRequestValidation,
    archiveVehicleRequestValidation,
    setDeliveryRateValidation,
    rateIdValidation,
    editRateValidation,
    initiateRefundValidation,
    getAndDeleteCommissionById,
    getAllCommissionValidation,
    updateCommissionValidation,
    updateNotificationStatus,
    manuallyAssignOrderToPharmacy,
    getNearbyDeliveryToPharmacy,
    manuallyAssignOrderToDeliveryPartner,
    sendGlobalNotification,
    getBestSellingProductById,
    searchBestSellingProducts,
    getPrivacyPolicyAndTACValidation,
    createPolicyValidation,
    getPolicyByIdValidation,
    getNotificatioByIdValidation
} = require("../middleware/validation");
const router = express.Router();
const {
    uploadAdminProfile,
    uploadLicenceImagePharmacy,
    uploadMedicineImages,
    uploadTestCatgPic,
    uploadDoctoreCatgImg,
} = require("../services/multer");
const {
    updateTest,
} = require("../controllers/AdminController/adminTestController");
const {
    getAllBestSellingProduct,
} = require("../controllers/AdminController/adminBestSellingProdudct");
const {
    getDoctorLeadById,
} = require("../controllers/AdminController/adminDoctoreLeadController");

/** Super Admin Auth Routes */

router.post(
    "/admin-login",
    validate(loginValidation),
    indexController.adminAuthController.login
);
router.get(
    "/get-admin-details",
    verifyAdminToken(),
    indexController.adminAuthController.getAdminDetails
);
router.post(
    "/forget-password",
    validate(forgetPasswordValidation),
    indexController.adminAuthController.forgetPassword
);
router.post(
    "/reset-password",
    validate(resetPasswordValidation),
    indexController.adminAuthController.resetPassword
);
router.post(
    "/changed-password",
    validate(changePasswordValidation),
    verifyAdminToken(),
    indexController.adminAuthController.changedPassword
);
router.patch(
    "/update-admin-profile",
    validate(updateAdminProfileValidation),
    verifyAdminToken(),
    indexController.adminAuthController.updateAdminProfile
);

/** Upload files */
router.post(
    "/upload-image",
    uploadAdminProfile,
    verifyAdminToken(),
    indexController.adminAuthController.uploadAdminAvatar
);

router.post(
    "/send-notification",
    indexController.adminAuthController.sendNotification
);

/** Super Admin Pathology Routes */

router.post(
    "/create-pathology",
    validate(createPathologyCenter),
    verifyAdminToken("superadmin"),
    indexController.adminPathologyController.createPathologyCenter
);
router.get(
    "/get-pathology-by-id",
    validateQuery(getAndDeletePathologyCenterById),
    verifyAdminToken("superadmin"),
    indexController.adminPathologyController.getPathologyCenterById
);
router.get(
    "/get-all-pathology",
    verifyAdminToken("superadmin"),
    indexController.adminPathologyController.getAllPathologyCenters
);
router.put(
    "/update-pathology",
    validate(updatePathologyCenter),
    verifyAdminToken("superadmin"),
    indexController.adminPathologyController.updatePathologyCenter
);
router.delete(
    "/delete-pathology",
    validateQuery(getAndDeletePathologyCenterById),
    verifyAdminToken("superadmin"),
    indexController.adminPathologyController.deletePathologyCenter
);
router.get(
    "/search-pathology",
    validateQuery(searchPathologyCenter),
    verifyAdminToken("superadmin"),
    indexController.adminPathologyController.searchPathology
);
/** Super Admin Pharmacy Routes */

router.post(
    "/create-pharmacy",
    verifyAdminToken("superadmin"),
    validate(createPharmacy),
    indexController.adminPharmacyController.createPharmacy
);
router.get(
    "/get-pharmacy-by-id",
    validateQuery(getAndDeletePharmacyById),
    verifyAdminToken("superadmin"),
    indexController.adminPharmacyController.getPharmacyById
);
router.put(
    "/update-pharmacy",
    validate(updatePharmacy),
    verifyAdminToken("superadmin"),
    indexController.adminPharmacyController.updatePharmacy
);
router.delete(
    "/delete-pharmacy",
    validateQuery(getAndDeletePharmacyById),
    verifyAdminToken("superadmin"),
    indexController.adminPharmacyController.deletePharmacy
);
router.get(
    "/get-all-pharmacy",
    validateQuery(getAllPharmacy),
    verifyAdminToken("superadmin"),
    indexController.adminPharmacyController.getAllPharmacy
);
router.get(
    "/search-pharmacy",
    verifyAdminToken("superadmin"),
    indexController.adminPharmacyController.searchPharmacy
);
router.post(
    "/upload-pharmacy-licence",
    uploadLicenceImagePharmacy,
    verifyAdminToken("superadmin"),
    indexController.adminPharmacyController.uploadPharmacyDocument
);
router.put(
    "/change-pharmacy-status", validate(changeStatusPharmacyValidation),
    verifyAdminToken("superadmin"),
    indexController.adminPharmacyController.changeStatus
);

/** Super Admin Delivery Partner Routes */

router.put(
    "/approve-delivery-partner",
    validate(approveRejectDeliveryPartnerValidation),
    verifyAdminToken("superadmin"),
    indexController.adminDeliveryPartnerController.approveRejectDeliveryPartner
);
router.get(
    "/get-all-delivery-partner",
    validateQuery(getAllDeliveryPartners),
    verifyAdminToken("superadmin"),
    indexController.adminDeliveryPartnerController.getAllDeliveryPartners
);
router.get(
    "/get-delivery-partner-by-id",
    validateQuery(getOrDeleteDeliveryPartner),
    verifyAdminToken("superadmin"),
    indexController.adminDeliveryPartnerController.getDeliveryPartnerById
);
router.put(
    "/update-delivery-partner",
    validate(updateDeliveryPartner),
    verifyAdminToken("superadmin"),
    indexController.adminDeliveryPartnerController.updateDeliveryPartner
);
router.put(
    "/update-availability-status",
    validate(updateDeliveryPartnerStatus),
    verifyAdminToken("superadmin"),
    indexController.adminDeliveryPartnerController.updateAvailabilityStatus
);
router.delete(
    "/delete-delivery-patner",
    validateQuery(getOrDeleteDeliveryPartner),
    verifyAdminToken("superadmin"),
    indexController.adminDeliveryPartnerController.deleteDeliveryPartner
);
router.put(
    "/block-unblock-delivery-partner",
    validate(blockUnblockDeliveryPartner),
    verifyAdminToken("superadmin"),
    indexController.adminDeliveryPartnerController.BlockUnblockDeliveryPartner
);
router.get(
    "/search-delivery-partner",
    verifyAdminToken("superadmin"),
    indexController.adminDeliveryPartnerController.searchDeliveryPartner
);
router.get(
    "/get-all-delivery-partner-not-approved",
    verifyAdminToken("superadmin"),
    indexController.adminDeliveryPartnerController
        .getAllDeliveryPartnersNotApproved
);

/** Medicines Routes Superadmin */
router.post(
    "/create-medicine",
    validate(createMedicineValidation),
    verifyAdminToken("superadmin"),
    indexController.medicineController.createMedicine
);
router.put(
    "/update-medicine",
    validate(updateMedicineValidation),
    verifyAdminToken("superadmin"),
    indexController.medicineController.updateMedicine
);
router.get(
    "/get-all-medicines",
    validateQuery(getAllApiValidation),
    verifyAdminToken("superadmin"),
    indexController.medicineController.getAllMedicines
);
router.get(
    "/get-medicine-by-id",
    validateQuery(getMedicineByIdValidation),
    verifyAdminToken("superadmin"),
    indexController.medicineController.getMedicineById
);
router.get(
    "/search-medicine",
    validateQuery(searchMedicineValidation),
    verifyAdminToken("superadmin"),
    indexController.medicineController.searchMedicine
);
router.delete(
    "/delete-medicine",
    validateQuery(deleteMedicineValidation),
    verifyAdminToken("superadmin"),
    indexController.medicineController.deleteMedicine
);
router.post(
    "/upload-medicine-images",
    verifyAdminToken("superadmin"),
    uploadMedicineImages,
    indexController.medicineController.uploadMedicineImages
);

//customer routes
router.get(
    "/get-all-customer",
    validateQuery(getAllCustomersValidation),
    verifyAdminToken("superadmin"),
    indexController.adminCustomerController.getAllCustomers
);
router.get(
    "/search-customer",
    verifyAdminToken("superadmin"),
    indexController.adminCustomerController.searchCustomer
);
router.get(
    "/get-customer-by-id",
    validateQuery(getCustomerByIdValidation),
    verifyAdminToken("superadmin"),
    indexController.adminCustomerController.getCustomerById
);
router.put(
    "/block-unblock-customer",
    validate(getCustomerByIdValidation),
    verifyAdminToken("superadmin"),
    indexController.adminCustomerController.BlockUnblockCustomer
);

//** Special Offer Routes */

router.post(
    "/create-special-offer",
    validate(createSpecialOfferValidation),
    verifyAdminToken("superadmin"),
    indexController.adminSpecialOfferController.createSpecialOffer
);
router.get(
    "/get-special-offer-by-id",
    validateQuery(specialOfferIdQueryValidation),
    verifyAdminToken("superadmin"),
    indexController.adminSpecialOfferController.getSpecialOfferById
);
router.get(
    "/get-all-special-offer",
    validateQuery(getAllSpecialOffersValidation),
    verifyAdminToken("superadmin"),
    indexController.adminSpecialOfferController.getAllSpecialOffers
);
router.put(
    "/update-special-offer",
    validate(updateSpecialOfferValidation),
    verifyAdminToken("superadmin"),
    indexController.adminSpecialOfferController.updateSpecialOffer
);
router.delete(
    "/delete-special-offer",
    validateQuery(specialOfferIdQueryValidation),
    verifyAdminToken("superadmin"),
    indexController.adminSpecialOfferController.deleteSpecialOffer
);
router.put(
    "/update-special-offer-status",
    validate(activeDeactiveSpecialOfferValidation),
    verifyAdminToken("superadmin"),
    indexController.adminSpecialOfferController.activeDeactiveSpecialOffer
);
router.get('/search-special-offer', verifyAdminToken("superadmin"), indexController.adminSpecialOfferController.searchSpecialOffers);

/** Best Selling Product */

router.post(
    "/create-best-selling-product",
    validate(createBestSelling),
    verifyAdminToken("superadmin"),
    indexController.adminBestSellingController.createBestSellingProduct
);
router.get(
    "/get-all-best-selling-product",
    validateQuery(getAllSellingProductValidation),
    verifyAdminToken("superadmin"),
    indexController.adminBestSellingController.getAllBestSellingProduct
);
router.put(
    "/change-active-non-active-best-selling",
    validate(UpdateAndDeleteBestSelling),
    verifyAdminToken("superadmin"),
    indexController.adminBestSellingController.updateStatus
);
router.delete(
    "/delete-best-selling-product",
    validateQuery(UpdateAndDeleteBestSelling),
    verifyAdminToken("superadmin"),
    indexController.adminBestSellingController.deleteBestSellingProduct
);
router.get('/get-best-selling-product-by-id', validateQuery(getBestSellingProductById), verifyAdminToken("superadmin"), indexController.adminBestSellingController.getBestSellingProductById);

router.get('/search-best-selling-product', validateQuery(searchBestSellingProducts), verifyAdminToken("superadmin"), indexController.adminBestSellingController.searchBestSellingProducts);

//** Feature Product Routes */
router.post(
    "/create-feature-product",
    validate(createFeature),
    verifyAdminToken("superadmin"),
    indexController.adminFeatureProductController.createFeaturedProduct
);
router.get(
    "/get-all-feature-product",
    validateQuery(getAllFeatures),
    verifyAdminToken("superadmin"),
    indexController.adminFeatureProductController.getAllFeaturedProducts
);
router.delete(
    "/delete-feature-product",
    validateQuery(getOrDeleteFeatureById),
    verifyAdminToken("superadmin"),
    indexController.adminFeatureProductController.deleteFeaturedProduct
);
router.get(
    "/get-feature-product-by-id",
    validateQuery(getOrDeleteFeatureById),
    verifyAdminToken("superadmin"),
    indexController.adminFeatureProductController.getFeatureProductById
);
router.put(
    "/update-feature-product-status",
    validate(updateFeatureStatus),
    verifyAdminToken("superadmin"),
    indexController.adminFeatureProductController.updateFeaturedProductStatus
);

router.get('/search-feature-product', validateQuery(searchBestFeatureProducts), verifyAdminToken("superadmin"), indexController.adminFeatureProductController.searchFeaturedProducts);

//Test Routes
router.post(
    "/create-test",
    validate(createTestValidation),
    verifyAdminToken("superadmin"),
    indexController.adminTestController.createTest
);
router.get(
    "/get-all-test",
    validateQuery(getAllApiValidation),
    verifyAdminToken("superadmin"),
    indexController.adminTestController.getAllTests
);
router.get(
    "/get-test-by-id",
    validateQuery(getTestdeleteAndById),
    verifyAdminToken("superadmin"),
    indexController.adminTestController.getTestById
);
router.delete(
    "/delete-test",
    validateQuery(getTestdeleteAndById),
    verifyAdminToken("superadmin"),
    indexController.adminTestController.deleteTest
);
router.get(
    "/search-test",
    validateQuery(searchTestValidation),
    verifyAdminToken("superadmin"),
    indexController.adminTestController.searchTest
);
router.put(
    "/update-test",
    validate(updateTestValidation),
    verifyAdminToken("superadmin"),
    indexController.adminTestController.updateTest
);

//Test Catg Routes
router.post(
    "/create-test-Category",
    validate(createTestCategory),
    verifyAdminToken("superadmin"),
    indexController.adminTestCatgController.createTestCategory
);
router.get(
    "/get-all-test-Category",
    validateQuery(getAllTestCatgValidation),
    verifyAdminToken("superadmin"),
    indexController.adminTestCatgController.getAllTestCategories
);
router.get(
    "/get-test-Category-by-id",
    validateQuery(getOrDeleteTestCategory),
    verifyAdminToken("superadmin"),
    indexController.adminTestCatgController.getTestCategoryById
);
router.delete(
    "/delete-test-Category",
    validateQuery(getOrDeleteTestCategory),
    verifyAdminToken("superadmin"),
    indexController.adminTestCatgController.deleteTestCategoryById
);
router.put(
    "/update-test-Category",
    validate(updateTestCategory),
    verifyAdminToken("superadmin"),
    indexController.adminTestCatgController.updateTestCategory
);
router.post(
    "/upload-test-category",
    verifyAdminToken("superadmin"),
    uploadTestCatgPic,
    indexController.adminTestCatgController.uploadTestCatgImg
);
router.put(
    "/remove-test-from-category",
    validate(removeTestFromCategory),
    verifyAdminToken("superadmin"),
    indexController.adminTestCatgController.removeTestFromCategory
);
router.get(
    "/search-test-category",
    validateQuery(searchTestCategoryValidation),
    verifyAdminToken("superadmin"),
    indexController.adminTestCatgController.searchTestCategory
);

// Insurance routes
router.get(
    "/get-all-insurance",
    validateQuery(getAllInsuranceLeadsValidation),
    verifyAdminToken("superadmin"),
    indexController.adminInsuranceController.getAllInsuranceLeads
);
router.get(
    "/get-insurance-by-id",
    validateQuery(getInsuranceByIdValidation),
    verifyAdminToken("superadmin"),
    indexController.adminInsuranceController.getInsuranceById
);
router.put(
    "/archieve-insurence-by-id",
    validate(archiveInsuranceByIdValidation),
    verifyAdminToken("superadmin"),
    indexController.adminInsuranceController.archiveInsuranceById
);
router.get(
    "/search-insurance",
    indexController.adminInsuranceController.searchInsuranceLead
);

//vehicle Route
router.get(
    "/get-all-vehicle-request",
    validateQuery(getAllVehicleRequestsValidation),
    verifyAdminToken("superadmin"),
    indexController.adminVehicleController.getAllVehicleRequests
);
router.get(
    "/get-vehicle-by-id",
    validateQuery(getVehicleRequestByIdValidation),
    verifyAdminToken("superadmin"),
    indexController.adminVehicleController.getVehicleRequestById
);
router.put(
    "/update-vehicle-request",
    validate(updateVehicleRequestValidation),
    verifyAdminToken("superadmin"),
    indexController.adminVehicleController.updateVehicleRequest
);
router.put(
    "/archieve-vehicle-request-by-id",
    validateQuery(archiveVehicleRequestValidation),
    verifyAdminToken("superadmin"),
    indexController.adminVehicleController.archiveVehicleRequest
);

//doctor category route
router.post(
    "/create-doctore-category",
    validate(createDoctorCategoryValidation),
    verifyAdminToken("superadmin"),
    indexController.adminDoctoreCategoryController.createDoctoreCatgegory
);
router.get(
    "/get-all-doctore-category",
    validateQuery(getAllDoctorCategoryValidation),
    verifyAdminToken("superadmin"),
    indexController.adminDoctoreCategoryController.getAllDoctoreCategory
);
router.get(
    "/get-doctore-category-by-id",
    validateQuery(getAndDeleteDoctorCategoryByIdValidation),
    verifyAdminToken("superadmin"),
    indexController.adminDoctoreCategoryController.getDoctoresCategoryById
);
router.delete(
    "/delete-doctore-category",
    validateQuery(getAndDeleteDoctorCategoryByIdValidation),
    verifyAdminToken("superadmin"),
    indexController.adminDoctoreCategoryController.deleteDoctoresCategoryById
);
router.put(
    "/update-doctore-category",
    validate(updateDoctorCategoryValidation), indexController.adminDoctoreCategoryController.updateDoctoresCatg
);
router.post(
    "/upload-doctore-image",
    uploadDoctoreCatgImg,
    verifyAdminToken("superadmin"),
    indexController.adminDoctoreCategoryController.uploadDoctoresCatgImage
);
router.get('/search-doctore-category', verifyAdminToken("superadmin"),
    indexController.adminDoctoreCategoryController.searchDoctoreCatg);

/** Doctor's Route */

router.post(
    "/create-doctor-profile",
    validate(createDoctorProfileValidation),
    verifyAdminToken("superadmin"),
    indexController.adminDoctorController.createDoctorProfile
);
router.get(
    "/get-all-doctor-profile",
    validateQuery(getAllDoctoreProfile),
    verifyAdminToken("superadmin"),
    indexController.adminDoctorController.getAllDoctorsList
);
router.get(
    "/get-doctor-profile-by-id",
    validateQuery(getDoctoreByIdAndChangeStatusValidation),
    verifyAdminToken("superadmin"),
    indexController.adminDoctorController.getDoctorById
);
router.put(
    "/change-status",
    validate(getDoctoreByIdAndChangeStatusValidation),
    verifyAdminToken("superadmin"),
    indexController.adminDoctorController.changeDoctorStatus
);
router.get('/search-doctore-profile', verifyAdminToken("superadmin"), indexController.adminDoctorController.searchDoctor);

/** Payment Routes */
router.post(
    "/initiate-refund", validate(initiateRefundValidation),
    indexController.adminPaymentController.initiateRefund
);

/** Delivery Rate Management */

router.post(
    "/create-delivery-rate",
    validate(setDeliveryRateValidation),
    verifyAdminToken("superadmin"),
    indexController.adminDeliveryPartnerController.setDeliveryRate
);
router.get(
    "/get-delivery-rate",
    verifyAdminToken("superadmin"),
    indexController.adminDeliveryPartnerController.getDeliveryRates
);
router.put(
    "/update-delivery-rate",
    validate(editRateValidation),
    verifyAdminToken("superadmin"),
    indexController.adminDeliveryPartnerController.editPerKilometerPrice
);
router.put(
    "/activate-delivery-rate",
    validate(rateIdValidation),
    verifyAdminToken("superadmin"),
    indexController.adminDeliveryPartnerController.activateParticularRate
);
router.delete(
    "/delete-delivery-rate",
    validate(rateIdValidation),
    verifyAdminToken("superadmin"),
    indexController.adminDeliveryPartnerController.deleteDeliveryRate
);

/**DoctoreLead Routes */
router.get(
    "/get-all-doctoreLead", validateQuery(getAllDoctoreLeadValidation),
    verifyAdminToken("superadmin"),
    indexController.adminDoctoreLeadController.getAllDoctoreLead
);
router.get(
    "/get-doctoreLead-by-id", validateQuery(getAnddeleteDoctoreLeadByIdValidation),
    verifyAdminToken("superadmin"),
    indexController.adminDoctoreLeadController.getDoctorLeadById
);
router.put(
    "/update-doctore-lead", validate(updateDoctorLeadValidation),
    verifyAdminToken("superadmin"),
    indexController.adminDoctoreLeadController.updateDoctorLead
);
router.delete(
    "/delete-doctore-lead", validateQuery(getAnddeleteDoctoreLeadByIdValidation),
    verifyAdminToken("superadmin"),
    indexController.adminDoctoreLeadController.deleteDoctorLeadById
);
router.get("/search-doctore-lead", verifyAdminToken("superadmin"), indexController.adminDoctoreLeadController.searchDoctorLead);


//commission Routes for pathology 
router.get("/get-commission-by-id", validateQuery(getAndDeleteCommissionById), verifyAdminToken("superadmin"), indexController.adminPathologyController.getCommissionByID);
router.delete("/delete-commission-by-id", validateQuery(getAndDeleteCommissionById), verifyAdminToken("superadmin"), indexController.adminPathologyController.deleteCommissionByID);
router.put("/update-commission-by-id", validate(updateCommissionValidation), verifyAdminToken("superadmin"), indexController.adminPathologyController.updateCommissionById);
router.get('/get-all-commission', validateQuery(getAllCommissionValidation), verifyAdminToken("superadmin"), indexController.adminPathologyController.getAllCommission);

// get notification routes for admin
router.get('/get-notification-by-recipientId', verifyAdminToken(), indexController.commonController.getNotifications);
router.put('/update-notification-status', verifyAdminToken(), validate(updateNotificationStatus), indexController.commonController.updateNotificationStatus);

/** Manual Order Assignment */
router.get('/get-all-manual-assignment', verifyAdminToken("superadmin"), indexController.adminOrderManagementController.getAllManualOrderAssignment);
router.get('/get-all-nearby-pharmacy-to-customer', validateQuery(getNearbyDeliveryToPharmacy), verifyAdminToken("superadmin"), indexController.adminOrderManagementController.getNearByPharmacyToCustomer);
router.post('/assign-manual-order-to-pharmacy', validate(manuallyAssignOrderToPharmacy), verifyAdminToken("superadmin"), indexController.adminOrderManagementController.manuallyAssignOrderToPhramacy);
router.get('/get-all-nearby-partner-to-pharmacy', validateQuery(getNearbyDeliveryToPharmacy), verifyAdminToken("superadmin"), indexController.adminOrderManagementController.getNearyByDeliveryToPharmacy);
router.post('/assign-manual-order-to-partner', verifyAdminToken("superadmin"), indexController.adminOrderManagementController.manuallyAssignOrderToDeliveryPartner);


/** Send Global Notification */

router.post(
    "/send-global-notification", validate(sendGlobalNotification),
    verifyAdminToken("superadmin"),
    indexController.adminNotificationController.sendGlobalNotification
);


// privacy and terms routes
router.get("/get-privacy-policy",
    indexController.commonPPAndTCContorller.getPrivacyPolicy);
router.get("/get-terms-and-conditions", indexController.commonPPAndTCContorller.getTermsAndConditions);//validateQuery(getPrivacyPolicyAndTACValidation) ,

router.post("/add-policy", validate(createPolicyValidation), verifyAdminToken("superadmin"), indexController.commonPPAndTCContorller.createPolicy);
router.put("/update-policy", verifyAdminToken("superadmin"), indexController.commonPPAndTCContorller.createOrUpdatePolicy);
router.get("/get-all-policies", verifyAdminToken("superadmin"), indexController.commonPPAndTCContorller.getAllPolicies);
router.get("/get-policy-by-id", validateQuery(getPolicyByIdValidation), verifyAdminToken("superadmin"), indexController.commonPPAndTCContorller.getPolicyById);
router.delete("/delete-policy", verifyAdminToken("superadmin"), indexController.commonPPAndTCContorller.deletePolicyById);
/** promo banner */
router.post("/create-promo-banner", verifyAdminToken("superadmin"), indexController.promoBannerController.createPromoBanner);
router.get("/get-all-promo-banner", verifyAdminToken("superadmin"), indexController.promoBannerController.getAllPromoBanners);
router.get('/search-banner', verifyAdminToken("superadmin"), indexController.promoBannerController.searchBanner);


/** Specila Test Offer */

router.post("/create-special-test-offer", verifyAdminToken("superadmin"), indexController.specialTestOfferController.createTestSpecialOffer);
router.put("/update-special-test-offer-status", verifyAdminToken("superadmin"), indexController.specialTestOfferController.updateSpecialTestOfferStatus);
router.get("/get-all-special-test-offer", verifyAdminToken("superadmin"), indexController.specialTestOfferController.getSpecialTestOfferAdmin);
router.get("/get-special-test-offer-by-id", verifyAdminToken("superadmin"), indexController.specialTestOfferController.getSpecialTestOfferById);
router.delete("/delete-special-test-offer", verifyAdminToken("superadmin"), indexController.specialTestOfferController.deleteSpecialTestOffer);

/** Delivery Partner Payment Management */

router.get('/get-all-delivery-partner-payment', verifyAdminToken("superadmin"), indexController.adminPaymentManagementController.getDeliveryPartnerPayment);
router.post('/pay-delivery-partner', verifyAdminToken("superadmin"), indexController.adminPaymentManagementController.payDeliveryPartner);

/** Pharmacy Payment Management */

// router.get('/get-all-pharmacy-payment', verifyAdminToken("superadmin"), indexController.adminPaymentManagementController.);
router.get('/get-all-pharmacy-payment', verifyAdminToken("superadmin"), indexController.adminPharmacyPayController.getPharmacyAllPayments);

module.exports = router;
